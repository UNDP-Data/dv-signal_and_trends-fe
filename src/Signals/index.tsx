/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import sortBy from 'lodash.sortby';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Input, Radio, Select } from 'antd';
import Background from '../assets/UNDP-hero-image.png';
import { SignalDataType } from '../Types';
import { CardLayout } from './CardsListingView';
import { SDGCOLOR, SSCOLOR, STEEP_V } from '../Constants';
import Context from '../Context/Context';

const HeroImageEl = styled.div`
  background: url(${Background}) no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;

export function SignalsListing() {
  const [signalList, setSignalList] = useState<undefined | SignalDataType[]>(
    undefined,
  );
  const { role } = useContext(Context);
  const [viewType, setViewType] = useState<'cardView' | 'listView'>('cardView');
  const [filteredSteep, setFilteredSteep] = useState<string>('All STEEP+V');
  const [filteredSDG, setFilteredSDG] = useState<string>('All SDGs');
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [filteredSS, setFilteredSS] = useState<string>(
    'All Signature Solutions/Enabler',
  );
  const [filteredStatus, setFilteredStatus] = useState<string>('All Status');
  useEffect(() => {
    axios
      .get(
        role === 'Curator' || role === 'Admin'
          ? `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=100&statuses=Approved&statuses=New`
          : `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=100&statuses=Approved`,
        {
          headers: {
            access_token: import.meta.env.VITE_ACCESS_CODE,
          },
        },
      )
      .then((response: any) => {
        setSignalList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
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
      <div
        className='flex-div margin-top-07 margin-bottom-05 flex-wrap flex-vert-align-center'
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <h4 className='undp-typography margin-bottom-00'>All Signals</h4>
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
          style={{
            width: 'calc(25% - 0.75rem)',
            flexGrow: 1,
            minWidth: '15rem',
          }}
          placeholder='Please select'
          defaultValue='All STEEP+V'
          value={filteredSteep}
          showSearch
          allowClear
          onChange={values => {
            setFilteredSteep(values || 'All STEEP+V');
          }}
          clearIcon={<div className='clearIcon' />}
        >
          <Select.Option className='undp-select-option' key='All STEEP+V'>
            All STEEP+V
          </Select.Option>
          {STEEP_V.map(d => (
            <Select.Option className='undp-select-option' key={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
        <Select
          className='undp-select'
          style={{
            width: 'calc(25% - 0.75rem)',
            flexGrow: 1,
            minWidth: '15rem',
          }}
          placeholder='Please select'
          defaultValue='All Signature Solutions/Enabler'
          value={filteredSS}
          showSearch
          allowClear
          onChange={values => {
            setFilteredSS(values || 'All Signature Solutions/Enabler');
          }}
          clearIcon={<div className='clearIcon' />}
        >
          <Select.Option
            className='undp-select-option'
            key='All Signature Solutions/Enabler'
          >
            All Signature Solutions/Enabler
          </Select.Option>
          {SSCOLOR.map(d => (
            <Select.Option className='undp-select-option' key={d.value}>
              {d.value}
            </Select.Option>
          ))}
        </Select>
        <Select
          className='undp-select'
          style={{
            width: 'calc(25% - 0.75rem)',
            flexGrow: 1,
            minWidth: '15rem',
          }}
          placeholder='Please select'
          defaultValue='All SDGs'
          value={filteredSDG}
          showSearch
          allowClear
          onChange={values => {
            setFilteredSDG(values || 'All SDGs');
          }}
          clearIcon={<div className='clearIcon' />}
        >
          <Select.Option className='undp-select-option' key='All SDGs'>
            All SDGs
          </Select.Option>
          {SDGCOLOR.map(d => (
            <Select.Option className='undp-select-option' key={d.value}>
              {d.value}
            </Select.Option>
          ))}
        </Select>
        {role === 'Admin' || role === 'Curator' ? (
          <Select
            className='undp-select'
            style={{
              width: 'calc(25% - 0.75rem)',
              flexGrow: 1,
              minWidth: '15rem',
            }}
            placeholder='Please select'
            defaultValue='All Status'
            value={filteredStatus}
            showSearch
            allowClear
            onChange={values => {
              setFilteredStatus(values || 'All SDGs');
            }}
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' key='All SDGs'>
              All Status
            </Select.Option>
            {['New', 'Approved'].map(d => (
              <Select.Option className='undp-select-option' key={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        ) : null}
        <Input
          className='undp-input'
          placeholder='Search a signal'
          style={{ width: 'calc(25% - 0.75rem)', flexGrow: 1 }}
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {signalList ? (
        <CardLayout
          filteredSDG={filteredSDG}
          filteredSS={filteredSS}
          filteredSteep={filteredSteep}
          filteredStatus={filteredStatus}
          search={search}
          data={signalList}
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
