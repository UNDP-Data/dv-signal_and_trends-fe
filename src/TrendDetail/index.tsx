import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SignalDataType, TrendDataType } from '../Types';
import { HORIZONVALUES, MONTHS } from '../Constants';
import { SignalCard } from '../Components/SignalCard';

export function TrendDetail() {
  const [data, setData] = useState<TrendDataType | undefined>(undefined);
  const [connectedSignals, setConnectedSignal] = useState<
    SignalDataType[] | undefined
  >(undefined);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/fetch?ids=${id}`,
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setData(response.data[0]);
        if (response.data[0].connected_trends?.length) {
          const trendsIds = response.data[0].connected_trends
            .toString()
            .replaceAll(',', '&ids=');
          axios
            .get(
              `https://signals-and-trends-api.azurewebsites.net/v1/signals/fetch?ids=${trendsIds}`,
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: any) => {
              setConnectedSignal(res.data);
            });
        } else {
          setConnectedSignal([]);
        }
      });
  }, [id]);
  return (
    <div
      className='margin-top-13 padding-top-09'
      style={{ maxWidth: '60rem', marginLeft: 'auto', marginRight: 'auto' }}
    >
      {data ? (
        <>
          <div className='flex-div margin-top-07 margin-bottom-09'>
            <NavLink
              to='/'
              style={{
                textDecoration: 'none',
                color: 'var(--dark-red)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              Home
            </NavLink>
            <div
              style={{
                textDecoration: 'none',
                color: 'var(--dark-red)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              /
            </div>
            <NavLink
              to='/trends'
              style={{
                textDecoration: 'none',
                color: 'var(--dark-red)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              All Trends
            </NavLink>
            <div
              style={{
                textDecoration: 'none',
                color: 'var(--dark-red)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              /
            </div>
            <div
              style={{
                textDecoration: 'none',
                color: 'var(--black)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                maxWidth: '5rem',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {data.headline}
            </div>
          </div>
          <h3 className='undp-typography'>{data.headline}</h3>
          <div className='flex-div flex-wrap margin-bottom-07'>
            <div
              className='undp-chip'
              style={{
                color:
                  HORIZONVALUES.findIndex(
                    el => el.value === data.time_horizon,
                  ) === -1
                    ? 'var(--black)'
                    : HORIZONVALUES[
                        HORIZONVALUES.findIndex(
                          el => el.value === data.time_horizon,
                        )
                      ].textColor,
                fontWeight: 'bold',
              }}
            >
              {data.time_horizon}
            </div>
          </div>
          <p className='undp-typography'>{data.description}</p>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-top-00'>Connected Trends</h6>
          {connectedSignals ? (
            <div className='flex-div'>
              {connectedSignals.length > 0 ? (
                <>
                  {connectedSignals.map((d, i) => (
                    <SignalCard key={i} data={d} />
                  ))}
                </>
              ) : (
                <p className='undp-typography'>No connected signals</p>
              )}
            </div>
          ) : (
            <div className='undp-loader-container'>
              <div className='undp-loader' />
            </div>
          )}
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-bottom-00 margin-top-00'>
            Impact
          </h6>
          <p>
            <span className='bold'>Impact Rating: {data.impact_rating}</span>
            {data.impact_description ? (
              <>
                <br />
                <br />
                {data.impact_description}
              </>
            ) : null}
          </p>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-top-00 margin-bottom-00'>
            Created On
          </h6>
          <p className='undp-typography margin-top-05'>
            {`${new Date(data.created_at).getDate()}-${
              MONTHS[new Date(data.created_at).getMonth()]
            }-${new Date(data.created_at).getFullYear()}`}
          </p>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-top-00 margin-bottom-00'>
            Created by
          </h6>
          <p className='undp-typography margin-top-05 margin-bottom-09'>
            {`${data.created_by.email} on ${new Date(
              data.created_at,
            ).getDate()}-${
              MONTHS[new Date(data.created_at).getMonth()]
            }-${new Date(data.created_at).getFullYear()}`}
          </p>
          <NavLink to={`/edit-trend/${id}`} style={{ textDecoration: 'none' }}>
            <button
              className='undp-button button-primary button-arrow'
              type='button'
            >
              Edit Trend
            </button>
          </NavLink>
        </>
      ) : (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
