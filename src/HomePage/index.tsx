/* eslint-disable no-underscore-dangle */
import axios, { AxiosResponse } from 'axios';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../assets/UNDP-hero-image.png';
import { API_ACCESS_TOKEN } from '../Constants';
import { SignalDataType, TrendDataType } from '../Types';

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

const DescriptionEl = styled.p`
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
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
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=5&statuses=Approved`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        if (response) {
          setSignalList(
            sortBy(response.data, d => Date.parse(d.created_at))
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
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?offset=0&limit=5&statuses=Approved`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        if (response) {
          setTrendList(
            sortBy(response.data, d => Date.parse(d.created_at))
              .reverse()
              .filter((_d, i) => i < 5),
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
            The Future Trends and Signals System is a participatory foresight
            tool that captures signals of change noticed across UNDP, and
            identifies the trends emerging – helping us all make stronger, more
            future-aware decisions.
          </h5>
        </div>
      </HeroImageEl>
      <div
        className='margin-top-05 margin-bottom-05 max-width'
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {trendListing ? (
          <div
            className='flex-div flex-wrap margin-bottom-09'
            style={{ alignItems: 'stretch' }}
          >
            <div style={{ width: 'calc(33.33% - 1.33rem)' }}>
              <h2 className='undp-typography margin-top-05 gap-07'>
                Most Recent Trends
              </h2>
              <NavLink to='./trends' style={{ textDecoration: 'auto' }}>
                <div className='flex-div'>
                  <button
                    type='button'
                    className='undp-button button-tertiary button-arrow'
                  >
                    Explore All Trends
                  </button>
                </div>
              </NavLink>
            </div>
            {trendListing.map((d, i) => (
              <NavLink
                key={i}
                to={`/trends/${d._id}`}
                style={{
                  width: 'calc(33.33% - 1.33rem)',
                  alignItems: 'stretch',
                  backgroundColor: 'var(--gray-200)',
                  textDecoration: 'none',
                  color: 'var(--black)',
                }}
              >
                <CardEl>
                  <h3 className='undp-typography'>{d.headline}</h3>
                  <DescriptionEl className='undp-typography'>
                    {d.description}
                  </DescriptionEl>
                </CardEl>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className='undp-loader-container'>
            <div className='undp-loader' />
          </div>
        )}
        {signalListing ? (
          <div
            className='flex-div flex-wrap margin-bottom-11'
            style={{ alignItems: 'stretch' }}
          >
            <div style={{ width: 'calc(33.33% - 1.33rem)' }}>
              <h2 className='undp-typography margin-top-05 gap-07'>
                Most Recent Signals
              </h2>
              <NavLink to='./signals' style={{ textDecoration: 'auto' }}>
                <div className='flex-div'>
                  <button
                    type='button'
                    className='undp-button button-tertiary button-arrow'
                  >
                    Explore All Signals
                  </button>
                </div>
              </NavLink>
            </div>
            {signalListing.map((d, i) => (
              <NavLink
                to={`/signals/${d._id}`}
                key={i}
                style={{
                  width: 'calc(33.33% - 1.33rem)',
                  alignItems: 'stretch',
                  backgroundColor: 'var(--gray-200)',
                  textDecoration: 'none',
                  color: 'var(--black)',
                }}
              >
                <CardEl>
                  <h3 className='undp-typography'>{d.headline}</h3>
                  <DescriptionEl className='undp-typography'>
                    {d.description}
                  </DescriptionEl>
                </CardEl>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className='undp-loader-container'>
            <div className='undp-loader' />
          </div>
        )}
      </div>
    </>
  );
}
