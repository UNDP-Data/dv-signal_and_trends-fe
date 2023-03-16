/* eslint-disable no-underscore-dangle */
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
        'https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=5',
      )
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
      .get(
        'https://signals-and-trends-api.azurewebsites.net/v1/trends/list?offset=0&limit=5',
      )
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
