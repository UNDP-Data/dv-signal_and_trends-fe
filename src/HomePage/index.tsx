/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../assets/UNDP-hero-image.png';
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

export function HomePage() {
  const [signalListing, setSignalList] = useState<undefined | SignalDataType[]>(
    undefined,
  );
  const [trendListing, setTrendList] = useState<undefined | TrendDataType[]>(
    undefined,
  );
  useEffect(() => {
    axios
      .get('https://signals-and-trends-api.azurewebsites.net/v1/signals/list')
      .then((response: any) => {
        setSignalList(
          sortBy(response.data, d => Date.parse(d.created_at))
            .reverse()
            .filter((_d, i) => i < 5),
        );
      });
  }, []);
  useEffect(() => {
    axios
      .get('https://signals-and-trends-api.azurewebsites.net/v1/trends/list')
      .then((response: any) => {
        setTrendList(
          sortBy(response.data, d => Date.parse(d.created_at))
            .reverse()
            .filter((_d, i) => i < 5),
        );
      });
  }, []);
  return (
    <>
      <HeroImageEl className='undp-hero-image'>
        <div className='max-width'>
          <h1 className='undp-typography'>UNDP Signals Spotlight</h1>
          <h5 className='undp-typography'>
            This Signals Spotlight – the first of its kind for UNDP – is part of
            our effort to become more agile and anticipatory. It draws on our
            prototype Future Trends and Signals System, a growing network of
            UNDP staff who are continuously scanning their horizons for signals
            of change. The Spotlight highlights some of their most interesting
            observations, sketches connections and patterns, and asks what these
            might mean for the future of development.
          </h5>
        </div>
      </HeroImageEl>
      <div className='margin-top-05 margin-bottom-05 max-width'>
        {signalListing ? (
          <div
            className='flex-div flex-wrap margin-bottom-11'
            style={{ alignItems: 'stretch' }}
          >
            <div style={{ width: 'calc(33.33% - 1.33rem)' }}>
              <h2 className='undp-typography margin-top-05 gap-07'>
                Most Recent Signals
              </h2>
              <NavLink
                to='./signals'
                style={{ textDecoration: 'none !important' }}
              >
                <div className='flex-div'>
                  <button
                    type='button'
                    className='undp-button button-tertiary button-arrow'
                    style={{ textDecoration: 'none !important' }}
                  >
                    Explore All Signals
                  </button>
                </div>
              </NavLink>
            </div>
            {signalListing.map((d, i) => (
              <div
                key={i}
                style={{
                  width: 'calc(33.33% - 1.33rem)',
                  alignItems: 'stretch',
                  backgroundColor: 'var(--gray-200)',
                }}
              >
                <CardEl>
                  <h3 className='undp-typography'>{d.headline}</h3>
                  <p className='undp-typography'>{d.description}</p>
                </CardEl>
              </div>
            ))}
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
            <div style={{ width: 'calc(33.33% - 1.33rem)' }}>
              <h2 className='undp-typography margin-top-05 gap-07'>
                Most Recent Trends
              </h2>
              <NavLink
                to='./trends'
                style={{ textDecoration: 'none !important' }}
              >
                <div className='flex-div'>
                  <button
                    type='button'
                    className='undp-button button-tertiary button-arrow'
                    style={{ textDecoration: 'none !important' }}
                  >
                    Explore All Trends
                  </button>
                </div>
              </NavLink>
            </div>
            {trendListing.map((d, i) => (
              <div
                key={i}
                style={{
                  width: 'calc(33.33% - 1.33rem)',
                  alignItems: 'stretch',
                  backgroundColor: 'var(--gray-200)',
                }}
              >
                <CardEl>
                  <h3 className='undp-typography'>{d.headline}</h3>
                  <p className='undp-typography'>{d.description}</p>
                </CardEl>
              </div>
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
