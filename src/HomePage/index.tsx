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
  background-color: var(--gray-200);
  color: var(--black);
  padding: var(--spacing-07);
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
            sortBy(response.data.data, d => Date.parse(d.created_at))
              .reverse()
              .filter((_d, i) => i < 5),
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
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?page=1&per_page=3&statuses=Approved`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        if (response) {
          setTrendList(
            sortBy(response.data.data, d => Date.parse(d.created_at))
              .reverse()
              .filter((_d, i) => i < 3),
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
        className='margin-top-08 margin-bottom-05 max-width home'
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {signalListing ? (
          <div
            className='flex-div flex-wrap margin-bottom-08'
            style={{ alignItems: 'stretch' }}
          >
            <div
              style={{
                flexBasis: '33rem',
                flexGrow: 2,
                flexShrink: 1,
              }}
            >
              <h2 className='undp-typography margin-top-05 gap-07'>
                Most Recent Signals
              </h2>
              <NavLink to='./signals' style={{ textDecoration: 'auto' }}>
                <div className='flex-div margin-bottom-05'>
                  <button
                    type='button'
                    className='undp-button button-tertiary button-arrow'
                  >
                    Explore All Signals
                  </button>
                </div>
              </NavLink>
            </div>
            <div
              className='flex-div flex-wrap'
              style={{
                flexBasis: '66rem',
                flexGrow: 3,
                flexShrink: 1,
              }}
            >
              {signalListing.map((d, i) => (
                <NavLink
                  to={`/signals/${d.id}`}
                  key={i}
                  style={{
                    flexBasis: '12rem',
                    flexGrow: 1,
                    flexShrink: 1,
                    backgroundColor: 'var(--gray-200)',
                    textDecoration: 'none',
                    color: 'var(--black)',
                  }}
                >
                  <CardEl>
                    <p className='undp-typography'>{d.headline}</p>
                  </CardEl>
                </NavLink>
              ))}
            </div>
          </div>
        ) : (
          <div className='undp-loader-container'>
            <div className='undp-loader' />
          </div>
        )}
        {trendListing ? (
          <div
            className='flex-div flex-wrap margin-bottom-09'
            style={{ alignItems: 'stretch' }}
          >
            <div
              style={{
                flexBasis: '33rem',
                flexGrow: 2,
                flexShrink: 1,
              }}
            >
              <h2 className='undp-typography margin-top-05 gap-07'>
                Most Recent Trends
              </h2>
              <NavLink to='./trends' style={{ textDecoration: 'auto' }}>
                <div className='flex-div margin-bottom-05'>
                  <button
                    type='button'
                    className='undp-button button-tertiary button-arrow'
                  >
                    Explore All Trends
                  </button>
                </div>
              </NavLink>
            </div>
            <div
              className='flex-div flex-wrap'
              style={{
                flexBasis: '66rem',
                flexGrow: 3,
                flexShrink: 1,
              }}
            >
              {trendListing.map((d, i) => (
                <TrendCard key={i} data={d} />
              ))}
            </div>
          </div>
        ) : (
          <div className='undp-loader-container'>
            <div className='undp-loader' />
          </div>
        )}
        <h2 className='undp-typography margin-top-05 gap-07'>
          Trends visualized
        </h2>
        <TrendsVis />
      </div>
    </>
  );
}
