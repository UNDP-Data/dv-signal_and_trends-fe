/* eslint-disable no-underscore-dangle */
import axios, { AxiosResponse } from 'axios';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../assets/UNDP-hero-image.png';
import { API_ACCESS_TOKEN } from '../Constants';
import { SignalDataType, TrendDataType } from '../Types';
import { TrendCard } from '../Components/TrendCard';
import { TrendsVis } from '../Components/TrendsVis';

const HeroImageEl = styled.div`
  background: url(${Background}) no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;

const CardEl = styled.div`
  background-color: var(--gray-300);
  color: var(--black);
  padding: var(--spacing-07);
  flex-grow: 1;
  width: calc(20% - 5.8rem);
  min-width: 20rem;
`;

export function HomePage() {
  const [signalListing, setSignalList] = useState<undefined | SignalDataType[]>(
    undefined,
  );
  const [trendListing, setTrendList] = useState<undefined | TrendDataType[]>(
    undefined,
  );
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?page=1&per_page=5&statuses=Approved`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        if (response) {
          setSignalList(
            sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
          );
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        if (err.response?.data.detail === 'No signal matches the parameters.') {
          setSignalList([]);
        }
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?page=1&per_page=4&statuses=Approved`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        if (response) {
          setTrendList(
            sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
          );
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        if (err.response?.data.detail === 'No trend matches the parameters.') {
          setTrendList([]);
        }
      });
  }, []);
  return (
    <>
      <HeroImageEl className='undp-hero-image'>
        <div className='max-width'>
          <h1 className='undp-typography'>
            UNDP Future Trends and Signals System
          </h1>
          <h5 className='undp-typography'>
            The Future Trends and Signals System captures signals of change
            noticed across UNDP, and identifies the trends emerging – helping us
            all make stronger, more future-aware decisions.
          </h5>
        </div>
      </HeroImageEl>
      <div
        className='margin-top-08 margin-bottom-05'
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {signalListing ? (
          <>
            <div>
              <h2 className='undp-typography margin-top-05 margin-bottom-05'>
                Most Recent Signals
              </h2>
            </div>
            <div className='flex-div flex-wrap margin-bottom-05'>
              {signalListing.map((d, i) => (
                <CardEl key={i}>
                  <h6
                    className='undp-typography margin-bottom-00'
                    style={{ color: 'var(--blue-600)' }}
                  >
                    {d.headline}
                  </h6>
                  <NavLink
                    to={`/signals/${d.id}`}
                    style={{ textDecoration: 'auto' }}
                  >
                    <button
                      type='button'
                      className='undp-button button-tertiary button-arrow padding-bottom-00'
                    >
                      Read More
                    </button>
                  </NavLink>
                </CardEl>
              ))}
            </div>
            <NavLink to='./signals' style={{ textDecoration: 'auto' }}>
              <div className='flex-div margin-bottom-05'>
                <button
                  type='button'
                  className='undp-button button-primary button-arrow'
                >
                  Explore All Signals
                </button>
              </div>
            </NavLink>
          </>
        ) : (
          <div className='undp-loader-container'>
            <div className='undp-loader' />
          </div>
        )}
        {trendListing ? (
          <>
            <div className='margin-top-11'>
              <h2 className='undp-typography margin-top-07 margin-bottom-05'>
                Most Recent Trends
              </h2>
            </div>
            <div className='flex-div flex-wrap margin-bottom-05'>
              {trendListing.map((d, i) => (
                <TrendCard key={i} data={d} />
              ))}
            </div>
            <NavLink to='./trends' style={{ textDecoration: 'auto' }}>
              <div className='flex-div margin-bottom-05'>
                <button
                  type='button'
                  className='undp-button button-primary button-arrow'
                >
                  Explore All Trends
                </button>
              </div>
            </NavLink>
          </>
        ) : (
          <div className='undp-loader-container'>
            <div className='undp-loader' />
          </div>
        )}
        <h2 className='undp-typography margin-top-10 margin-bottom-08 gap-07'>
          Trends visualized
        </h2>
        <TrendsVis />
      </div>
    </>
  );
}
