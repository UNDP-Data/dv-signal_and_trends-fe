import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SignalDataType, TrendDataType } from '../Types';
import { MONTHS, SDGCOLOR, SSCOLOR, STEEPVCOLOR } from '../Constants';
import { TrendCard } from '../Components/TrendCard';

export function SignalDetail() {
  const [data, setData] = useState<SignalDataType | undefined>(undefined);
  const [connectedTrends, setConnectedTrends] = useState<
    TrendDataType[] | undefined
  >(undefined);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/fetch?ids=${id}`,
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
              `https://signals-and-trends-api.azurewebsites.net/v1/trends/fetch?ids=${trendsIds}`,
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: any) => {
              setConnectedTrends(res.data);
            });
        } else {
          setConnectedTrends([]);
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
              to='/signals'
              style={{
                textDecoration: 'none',
                color: 'var(--dark-red)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              All Signals
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
            {data.steep ? (
              <div
                className='undp-chip'
                style={{
                  color:
                    STEEPVCOLOR.findIndex(
                      el => el.value === data.steep?.split(' – ')[0],
                    ) === -1
                      ? 'var(--black)'
                      : STEEPVCOLOR[
                          STEEPVCOLOR.findIndex(
                            el => el.value === data.steep?.split(' – ')[0],
                          )
                        ].textColor,
                  fontWeight: 'bold',
                }}
              >
                {data.steep?.split(' – ')[0]}
              </div>
            ) : null}
            {data.keywords?.map((el, j) => (
              <div className='undp-chip' key={j}>
                {el}
              </div>
            ))}
          </div>
          <p className='undp-typography'>{data.description}</p>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-top-00'>Signature Solutions</h6>
          <div className='flex-div flex-wrap margin-top-03'>
            {data.signature_primary !== '' && data.signature_primary ? (
              <div
                className='undp-chip'
                style={{
                  color:
                    SSCOLOR.findIndex(
                      el => el.value === data.signature_primary,
                    ) !== -1
                      ? SSCOLOR[
                          SSCOLOR.findIndex(
                            el => el.value === data.signature_primary,
                          )
                        ].textColor
                      : 'var(--black)',
                  fontWeight: 'bold',
                }}
              >
                {data.signature_primary}
              </div>
            ) : null}
            {data.signature_secondary !== '' && data.signature_secondary ? (
              <div
                className='undp-chip'
                style={{
                  color:
                    SSCOLOR.findIndex(
                      el => el.value === data.signature_secondary,
                    ) !== -1
                      ? SSCOLOR[
                          SSCOLOR.findIndex(
                            el => el.value === data.signature_secondary,
                          )
                        ].textColor
                      : 'var(--black)',
                  fontWeight: 'bold',
                }}
              >
                {data.signature_secondary}
              </div>
            ) : null}
          </div>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-top-00'>SDGs</h6>
          <div className='flex-div flex-wrap margin-top-03'>
            {data.sdgs ? (
              <>
                {data.sdgs.map((sdg, j) => (
                  <div
                    key={j}
                    className='undp-chip'
                    style={{
                      color:
                        SDGCOLOR[SDGCOLOR.findIndex(el => el.value === sdg)]
                          .textColor,
                      fontWeight: 'bold',
                    }}
                  >
                    {sdg}
                  </div>
                ))}
              </>
            ) : (
              'NA'
            )}
          </div>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-top-00'>Relevance</h6>
          <p className='undp-typography margin-top-05'>{data.relevance}</p>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-top-00'>Source</h6>
          <a
            href={data.url}
            target='_blank'
            rel='noreferrer'
            className='undp-style'
          >
            {data.url}
          </a>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-top-00'>Connected Trends</h6>
          {connectedTrends ? (
            <div className='flex-div'>
              {connectedTrends.length > 0 ? (
                <>
                  {connectedTrends.map((d, i) => (
                    <TrendCard key={i} data={d} />
                  ))}
                </>
              ) : (
                <p className='undp-typography'>No connected trends</p>
              )}
            </div>
          ) : (
            <div className='undp-loader-container'>
              <div className='undp-loader' />
            </div>
          )}
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='undp-typography margin-top-00'>Created by</h6>
          <p className='undp-typography margin-top-05 margin-bottom-09'>
            {`${data.created_by.name} on ${new Date(
              data.created_at,
            ).getDate()}-${
              MONTHS[new Date(data.created_at).getMonth()]
            }-${new Date(data.created_at).getFullYear()}`}
          </p>
          <NavLink to={`/edit-signal/${id}`} style={{ textDecoration: 'none' }}>
            <button
              className='undp-button button-primary button-arrow'
              type='button'
            >
              Edit Signal
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
