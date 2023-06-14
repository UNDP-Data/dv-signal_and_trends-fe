import styled from 'styled-components';
import { useContext, useState } from 'react';
import { Input, Modal, Radio, Select } from 'antd';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import Background from '../assets/UNDP-hero-image.jpg';
import { HorizonList, RatingList, TrendFiltersDataType } from '../Types';
import { AllTrends } from './AllTrends';
import Context from '../Context/Context';
import { SignInButton } from '../Components/SignInButton';
import { TREND_ORDER_BY_OPTIONS } from '../Constants';

const HeroImageEl = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url(${Background}) no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;
export function TrendsListing() {
  const { role, choices } = useContext(Context);
  const [viewType, setViewType] = useState<'cardView' | 'listView'>('cardView');
  const [noOfFilter, setNoOfFilter] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<undefined | string>(undefined);
  const [trendSortBy, setTrendSortBy] = useState('created_at');
  const [filters, setFilters] = useState<TrendFiltersDataType>({
    impact: 'All Ratings',
    horizon: 'All Horizons',
    status: 'All Status',
    search: undefined,
  });
  const [tempFilters, setTempFilters] = useState<TrendFiltersDataType>({
    impact: 'All Ratings',
    horizon: 'All Horizons',
    status: 'All Status',
    search: undefined,
  });
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
        className='flex-div margin-top-07 margin-bottom-05 flex-wrap flex-vert-align-center'
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <h4
          className='undp-typography margin-bottom-00'
          style={{ flexGrow: 1 }}
        >
          All Trends
        </h4>
        <div
          className='flex-div flex-vert-align-center flex-wrap'
          style={{ flexGrow: 1 }}
        >
          <Select
            className='undp-select'
            style={{
              width: '15rem',
            }}
            placeholder='Sort by'
            value={trendSortBy}
            onChange={value => {
              setTrendSortBy(value);
            }}
          >
            {TREND_ORDER_BY_OPTIONS.map(d => (
              <Select.Option className='undp-select-option' key={d.key}>
                Sort by: {d.value}
              </Select.Option>
            ))}
          </Select>
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
          <div className='flex-div gap-00' style={{ flexGrow: 1 }}>
            <Input
              placeholder='Search for a trend'
              className='undp-input'
              size='large'
              value={searchQuery}
              onChange={d => {
                setSearchQuery(d.target.value);
              }}
              onPressEnter={() => {
                setFilters({ ...filters, search: searchQuery });
              }}
            />
            <button
              type='button'
              className='undp-button button-secondary'
              onClick={() => {
                setFilters({ ...filters, search: searchQuery });
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {noOfFilter > 0 ? (
        <div
          className='flex-div flex-wrap margin-top-02 margin-bottom-05'
          style={{
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          {filters.impact !== 'All Ratings' ? (
            <div className='undp-chip undp-chip-blue'>
              Rating: {filters.impact}
            </div>
          ) : null}
          {filters.horizon !== 'All Horizons' ? (
            <div className='undp-chip undp-chip-blue'>{filters.horizon}</div>
          ) : null}
          {filters.status !== 'All Status' ? (
            <div className='undp-chip undp-chip-blue'>
              {filters.status === 'New' ? 'Awaiting Approval' : filters.status}
            </div>
          ) : null}
          <button
            type='button'
            className='undp-chip'
            onClick={() => {
              setNoOfFilter(0);
              setSearchQuery(undefined);
              setFilters({
                impact: 'All Ratings',
                horizon: 'All Horizons',
                status: 'All Status',
                search: undefined,
              });
            }}
          >
            Clear Filter(s)
          </button>
        </div>
      ) : null}
      <AllTrends
        filters={filters}
        view={viewType}
        trendsOrderBy={trendSortBy}
      />
      <Modal
        className='undp-modal'
        open={showFilterModal}
        onCancel={() => {
          setTempFilters(filters);
          setShowFilterModal(false);
        }}
      >
        <h2 className='undp-typography'>Filter Trends</h2>
        <div className='margin-bottom-07'>
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
              {choices?.ratings.map(d => (
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
              {choices?.horizons.map(d => (
                <Select.Option className='undp-select-option' key={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
          {role === 'Admin' || role === 'Curator' ? (
            <div className='margin-top-07'>
              <p className='undp-typography label'>Filter by Status</p>
              <Select
                className='undp-select'
                style={{
                  flexGrow: 1,
                  minWidth: '15rem',
                }}
                placeholder='Please select'
                defaultValue='All Status'
                value={
                  tempFilters.status === 'New'
                    ? 'Awaiting Approval'
                    : tempFilters.status
                }
                showSearch
                onChange={values => {
                  setTempFilters({
                    ...tempFilters,
                    status:
                      values === 'Awaiting Approval'
                        ? 'New'
                        : (values as 'Approved' | 'All Status'),
                  });
                }}
                clearIcon={<div className='clearIcon' />}
              >
                {['All Status', 'Approved', 'Awaiting Approval'].map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
          ) : null}
        </div>
        <button
          type='button'
          className='undp-button button-secondary'
          onClick={() => {
            let i = 0;
            if (tempFilters.horizon !== 'All Horizons') {
              i += 1;
            }
            if (tempFilters.impact !== 'All Ratings') {
              i += 1;
            }
            if (tempFilters.status !== 'All Status') {
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
export function ArchivedTrendsListing() {
  const { role } = useContext(Context);
  const [viewType, setViewType] = useState<'cardView' | 'listView'>('cardView');
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
        className='flex-div margin-top-07 margin-bottom-05 flex-wrap flex-vert-align-center'
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <h4 className='undp-typography margin-bottom-00'>
          All Archived Trends
        </h4>
        <div className='flex-div flex-vert-align-center'>
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
      <AuthenticatedTemplate>
        {role === 'Admin' || role === 'Curator' ? (
          <AllTrends
            filters={{
              impact: 'All Ratings',
              horizon: 'All Horizons',
              status: 'Archived',
            }}
            view={viewType}
            trendsOrderBy='modified_at'
          />
        ) : (
          <p className='undp-typography' style={{ color: 'var(--dark-red)' }}>
            Admin rights required to view this page
          </p>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton buttonText='Sign In to View This Page' />
      </UnauthenticatedTemplate>
    </>
  );
}
