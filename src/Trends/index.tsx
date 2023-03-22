/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import sortBy from 'lodash.sortby';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Input, Radio, Select } from 'antd';
import Background from '../assets/UNDP-hero-image.png';
import { TrendDataType } from '../Types';
import { CardLayout } from './CardsListingView';
import { API_ACCESS_TOKEN, HORIZON } from '../Constants';

const HeroImageEl = styled.div`
  background: url(${Background}) no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;

export function TrendsListing() {
  const [trendsList, setTrendsList] = useState<undefined | TrendDataType[]>(
    undefined,
  );
  const [filteredHorizons, setFilteredHorizons] =
    useState<string>('All Horizons');
  const [viewType, setViewType] = useState<'cardView' | 'listView'>('cardView');
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [filteredImpactRating, setFilteredImpactRating] =
    useState<string>('All Impact Ratings');
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?offset=0&limit=100&statuses=New&statuses=Approved`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: any) => {
        setTrendsList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
      });
  }, []);
  return (
    <>
      <HeroImageEl className='undp-hero-image'>
        <div className='max-width'>
          <h1 className='undp-typography'>UNDP Trends Spotlight</h1>
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
      <div
        className='flex-div margin-top-07 margin-bottom-05 flex-wrap flex-vert-align-center'
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <h4 className='undp-typography margin-bottom-00'>All Trends</h4>
        <Radio.Group
          defaultValue='cardView'
          onChange={e => {
            setViewType(e.target.value as 'cardView' | 'listView');
          }}
          className='undp-button-radio'
        >
          <Radio.Button value='cardView'>Card View</Radio.Button>
          <Radio.Button value='listView'>List View</Radio.Button>
        </Radio.Group>
      </div>
      <div
        className='flex-div margin-top-07 margin-bottom-05 flex-wrap'
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        <Select
          className='undp-select'
          style={{ width: 'calc(33.33% - 0.667rem)' }}
          placeholder='Please select'
          defaultValue='All Horizons'
          value={filteredHorizons}
          showSearch
          allowClear
          onChange={values => {
            setFilteredHorizons(values || 'All Horizons');
          }}
          clearIcon={<div className='clearIcon' />}
        >
          <Select.Option className='undp-select-option' key='All Horizons'>
            All Horizons
          </Select.Option>
          {HORIZON.map(d => (
            <Select.Option className='undp-select-option' key={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
        <Select
          className='undp-select'
          style={{ width: 'calc(33.33% - 0.667rem)' }}
          placeholder='Please select'
          defaultValue='All Impact Ratings'
          value={filteredImpactRating}
          showSearch
          allowClear
          onChange={values => {
            const val = values ? `${values}` : undefined;
            setFilteredImpactRating(val || 'All Impact Ratings');
          }}
          clearIcon={<div className='clearIcon' />}
        >
          <Select.Option
            className='undp-select-option'
            key='All Impact Ratings'
          >
            All Impact Ratings
          </Select.Option>
          {[1, 2, 3, 4, 5].map(d => (
            <Select.Option className='undp-select-option' key={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
        <Input
          className='undp-input'
          placeholder='Search a signal'
          style={{ width: 'calc(33.33% - 0.667rem)' }}
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {trendsList ? (
        <CardLayout
          filteredImpactRating={filteredImpactRating}
          filteredHorizons={filteredHorizons}
          search={search}
          data={trendsList}
          view={viewType}
        />
      ) : (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      )}
    </>
  );
}
