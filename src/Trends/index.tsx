import styled from 'styled-components';
import { useState } from 'react';
import { Modal, Radio, Select } from 'antd';
import Background from '../assets/UNDP-hero-image.png';
import { HorizonList, RatingList, TrendFiltersDataType } from '../Types';
import { CardLayout } from './CardsListingView';
import { HORIZON } from '../Constants';

const HeroImageEl = styled.div`
  background: url(${Background}) no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;

export function TrendsListing() {
  const [viewType, setViewType] = useState<'cardView' | 'listView'>('cardView');
  const [noOfFilter, setNoOfFilter] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<TrendFiltersDataType>({
    impact: 'All Ratings',
    horizon: 'All Horizons',
  });
  const [tempFilters, setTempFilters] = useState<TrendFiltersDataType>({
    impact: 'All Ratings',
    horizon: 'All Horizons',
  });
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
        className='flex-div margin-top-07 margin-bottom-05 flex-wrap flex-vert-align-center'
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <h4 className='undp-typography margin-bottom-00'>All Trends</h4>
        <div className='flex-div flex-vert-align-center'>
          {noOfFilter > 0 ? (
            <button
              type='button'
              className='undp-chip'
              onClick={() => {
                setNoOfFilter(0);
                setFilters({
                  impact: 'All Ratings',
                  horizon: 'All Horizons',
                });
              }}
            >
              Clear Filter
            </button>
          ) : null}
          <button
            type='button'
            className='undp-button button-secondary'
            onClick={() => {
              setTempFilters(filters);
              setShowFilterModal(true);
            }}
          >
            Filters{noOfFilter ? ` (${noOfFilter})` : ''}
          </button>
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
      </div>
      <CardLayout filters={filters} view={viewType} />
      <Modal
        className='undp-modal'
        open={showFilterModal}
        onCancel={() => {
          setTempFilters(filters);
          setShowFilterModal(false);
        }}
      >
        <h2 className='undp-typography'>Filter Trends</h2>
        <div className='margin-top-07'>
          <p className='undp-typography label'>Filter by Rating</p>
          <Select
            className='undp-select'
            style={{
              flexGrow: 1,
              minWidth: '15rem',
            }}
            placeholder='Please select'
            defaultValue='All Ratings'
            value={tempFilters.impact}
            showSearch
            allowClear
            onChange={values => {
              setTempFilters({
                ...tempFilters,
                impact: (values as RatingList) || 'All Ratings',
              });
            }}
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' key='All Ratings'>
              All Ratings
            </Select.Option>
            {[1, 2, 3, 4, 5].map(d => (
              <Select.Option className='undp-select-option' key={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className='margin-top-07'>
          <p className='undp-typography label'>Filter by Horizon</p>
          <Select
            className='undp-select'
            style={{
              flexGrow: 1,
              minWidth: '15rem',
            }}
            placeholder='Please select'
            defaultValue='All Horizons'
            value={tempFilters.horizon}
            showSearch
            allowClear
            onChange={values => {
              setTempFilters({
                ...tempFilters,
                horizon: (values as HorizonList) || 'All Horizons',
              });
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
        </div>
        <button
          type='button'
          className='undp-button button-secondary margin-top-07'
          onClick={() => {
            let i = 0;
            if (tempFilters.horizon !== 'All Horizons') {
              i += 1;
            }
            if (tempFilters.impact !== 'All Ratings') {
              i += 1;
            }
            setFilters(tempFilters);
            setNoOfFilter(i);
            setShowFilterModal(false);
          }}
        >
          Apply Filters
        </button>
      </Modal>
    </>
  );
}
