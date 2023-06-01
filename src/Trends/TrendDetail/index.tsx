import { NavLink, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import styled from 'styled-components';
import Background from '../../assets/UNDP-hero-image.png';
import { SignalDataType, TrendDataType } from '../../Types';
import { API_ACCESS_TOKEN, HORIZONVALUES, MONTHS } from '../../Constants';
import { SignalCard } from '../../Components/SignalCard';
import { SignInButton } from '../../Components/SignInButton';
import Context from '../../Context/Context';

interface HeroImageProps {
  bgImage?: string;
}

const HeroImageEl = styled.div<HeroImageProps>`
  background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url(${props => (props.bgImage ? `data:${props.bgImage}` : Background)})
      no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;

export function TrendDetail() {
  const [data, setData] = useState<TrendDataType | undefined>(undefined);
  const [connectedSignals, setConnectedSignal] = useState<
    SignalDataType[] | undefined
  >(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const { id } = useParams();
  const { role, accessToken } = useContext(Context);
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/fetch?ids=${id}`,
        {
          headers: {
            access_token: accessToken || API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setData(response.data[0]);
        if (response.data[0].connected_signals?.length) {
          const signalIds = response.data[0].connected_signals
            .toString()
            .replaceAll(',', '&ids=');
          axios
            .get(
              `https://signals-and-trends-api.azurewebsites.net/v1/signals/fetch?ids=${signalIds}`,
              {
                headers: {
                  access_token: accessToken || API_ACCESS_TOKEN,
                },
              },
            )
            .then((res: AxiosResponse) => {
              setConnectedSignal(res.data);
            })
            .catch(err => {
              setError(
                `Error code ${err.response?.status}: ${
                  err.response?.status === 404
                    ? 'No trend available with the selected IDs'
                    : err.response?.data
                }. ${
                  err.response?.status === 500
                    ? 'Please try again in some time'
                    : ''
                }`,
              );
            });
        } else {
          setConnectedSignal([]);
        }
      });
  }, [id]);
  return (
    <div>
      {data ? (
        <div className='margin-bottom-13'>
          <HeroImageEl className='undp-hero-image' bgImage={data.attachment}>
            <div className='max-width'>
              <div className='flex-div margin-top-00 margin-bottom-09'>
                <NavLink
                  to='/'
                  style={{
                    textDecoration: 'none',
                    color: 'var(--white)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Home
                </NavLink>
                <div
                  style={{
                    textDecoration: 'none',
                    color: 'var(--white)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  /
                </div>
                <NavLink
                  to={
                    data.status === 'Archived' ? '/archived-trends' : '/trends'
                  }
                  style={{
                    textDecoration: 'none',
                    color: 'var(--white)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {data.status === 'Archived'
                    ? 'All Archived Trends'
                    : 'All Trends'}
                </NavLink>
                <div
                  style={{
                    textDecoration: 'none',
                    color: 'var(--white)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  /
                </div>
                <div
                  style={{
                    textDecoration: 'none',
                    color: 'var(--white)',
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
              <h2 className='undp-typography'>{data.headline}</h2>
              {role === 'Admin' || role === 'Curator' ? (
                <div
                  className={`undp-chip margin-bottom-07 ${
                    data.status === 'Approved'
                      ? 'undp-chip-green'
                      : data.status === 'New'
                      ? 'undp-chip-yellow'
                      : 'undp-chip-red'
                  }`}
                  style={{ color: 'var(--black)' }}
                >
                  {data.status === 'New' ? 'Awaiting Approval' : data.status}
                </div>
              ) : null}
              <h5 className='undp-typography'>{data.description}</h5>
            </div>
          </HeroImageEl>
          <div
            className='margin-top-09'
            style={{
              maxWidth: '60rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            <h6 className='undp-typography margin-top-00'>Time Horizon</h6>
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
            <hr className='undp-style light margin-top-07 margin-bottom-07' />
            <h6 className='undp-typography margin-top-00'>Impact</h6>
            <p className='undp-typography'>
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
            <h6 className='undp-typography margin-top-00'>Connected Signals</h6>
            {connectedSignals ? (
              <div className='flex-div flex-wrap'>
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
            ) : error ? (
              <p
                className='margin-top-00 margin-bottom-00 undp-typography'
                style={{ color: 'var(--dark-red)' }}
              >
                {error}
              </p>
            ) : (
              <div className='undp-loader-container'>
                <div className='undp-loader' />
              </div>
            )}
            {role === 'Admin' || role === 'Curator' ? (
              <div>
                <hr className='undp-style light margin-top-07 margin-bottom-07' />
                <h6 className='undp-typography margin-top-00 margin-bottom-00'>
                  Created by
                </h6>
                <p className='undp-typography margin-top-05'>
                  {`${data.created_by} on ${new Date(
                    data.created_at,
                  ).getDate()}-${
                    MONTHS[new Date(data.created_at).getMonth()]
                  }-${new Date(data.created_at).getFullYear()}`}
                </p>
              </div>
            ) : null}
            <div className='margin-top-09'>
              <AuthenticatedTemplate>
                {role === 'User' ? (
                  <p
                    className='undp-typography'
                    style={{ color: 'var(--dark-red)' }}
                  >
                    Admin or curator rights required to edit a trend
                  </p>
                ) : (
                  <NavLink
                    to={
                      data.status === 'Archived'
                        ? `/archived-trends/${id}/edit`
                        : `/trends/${id}/edit`
                    }
                    style={{ textDecoration: 'none' }}
                  >
                    <button
                      className='undp-button button-secondary button-arrow'
                      type='button'
                    >
                      Edit Trend
                    </button>
                  </NavLink>
                )}
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <SignInButton buttonText='Sign In to Edit Trends' />
              </UnauthenticatedTemplate>
            </div>
          </div>
        </div>
      ) : (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
