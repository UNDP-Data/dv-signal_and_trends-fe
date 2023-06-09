import styled from 'styled-components';
import { useContext, useState } from 'react';
import { Modal, Radio, Select, Input } from 'antd';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import Background from '../assets/UNDP-hero-image.png';
import { CardLayout } from './ListingView';
import Context from '../Context/Context';
import {
  SDGList,
  SignalFiltersDataType,
  SSList,
  StatusList,
  STEEPVList,
  LocationList,
} from '../Types';
import { SignInButton } from '../Components/SignInButton';

const HeroImageEl = styled.div`
  background: url(${Background}) no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;

export function SignalsListing() {
  const { role, choices } = useContext(Context);
  const [viewType, setViewType] = useState<'cardView' | 'listView'>('cardView');
  const [noOfFilter, setNoOfFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState<undefined | string>(undefined);

  const [filters, setFilters] = useState<SignalFiltersDataType>({
    steep: 'All STEEP+V',
    sdg: 'All SDGs',
    ss: 'All Signature Solutions/Enabler',
    status: 'All Status',
    location: 'All Locations',
    search: undefined,
  });
  const [tempFilters, setTempFilters] = useState<SignalFiltersDataType>({
    steep: 'All STEEP+V',
    sdg: 'All SDGs',
    ss: 'All Signature Solutions/Enabler',
    status: 'All Status',
    location: 'All Locations',
    search: undefined,
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
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
        <h4 className='undp-typography margin-bottom-00'>All Signals</h4>
        <div
          className='flex-div flex-vert-align-center'
          style={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
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
          <div
            style={{ maxWidth: '25rem', width: '100%' }}
            className='flex-div gap-00'
          >
            <Input
              placeholder='Search for a signal'
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
          className='flex-div flex-wrap margin-top-02 margin-bottom-02'
          style={{
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          {filters.steep !== 'All STEEP+V' ? (
            <div className='undp-chip undp-chip-blue'>
              STEEP+V: {filters.steep.split('–')[0]}
            </div>
          ) : null}
          {filters.sdg !== 'All SDGs' ? (
            <div className='undp-chip undp-chip-blue'>{filters.sdg}</div>
          ) : null}
          {filters.ss !== 'All Signature Solutions/Enabler' ? (
            <div className='undp-chip undp-chip-blue'>
              Signature Solutions/Enabler: {filters.ss}
            </div>
          ) : null}
          {filters.location !== 'All Locations' ? (
            <div className='undp-chip undp-chip-blue'>{filters.location}</div>
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
                steep: 'All STEEP+V',
                sdg: 'All SDGs',
                ss: 'All Signature Solutions/Enabler',
                status: 'All Status',
                location: 'All Locations',
                search: undefined,
              });
            }}
          >
            Clear Filter(s)
          </button>
        </div>
      ) : null}
      <CardLayout filters={filters} view={viewType} />
      <Modal
        className='undp-modal'
        open={showFilterModal}
        onCancel={() => {
          setTempFilters(filters);
          setShowFilterModal(false);
        }}
      >
        <h2 className='undp-typography'>Filter Signals</h2>
        <div className='margin-bottom-07'>
          <div className='margin-top-07'>
            <p className='undp-typography label'>Filter by STEEP+V</p>
            <Select
              className='undp-select'
              style={{
                flexGrow: 1,
                minWidth: '15rem',
              }}
              placeholder='Please select'
              defaultValue='All STEEP+V'
              value={tempFilters.steep}
              showSearch
              allowClear
              onChange={values => {
                setTempFilters({
                  ...tempFilters,
                  steep: (values as STEEPVList) || 'All STEEP+V',
                });
              }}
              clearIcon={<div className='clearIcon' />}
            >
              <Select.Option className='undp-select-option' key='All STEEP+V'>
                All STEEP+V
              </Select.Option>
              {choices?.steepv.map(d => (
                <Select.Option className='undp-select-option' key={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className='margin-top-07'>
            <p className='undp-typography label'>
              Filter by Signature Solutions/Enabler
            </p>
            <Select
              className='undp-select'
              style={{
                flexGrow: 1,
                minWidth: '15rem',
              }}
              placeholder='Please select'
              defaultValue='All Signature Solutions/Enabler'
              value={tempFilters.ss}
              showSearch
              allowClear
              onChange={values => {
                setTempFilters({
                  ...tempFilters,
                  ss: (values as SSList) || 'All Signature Solutions/Enabler',
                });
              }}
              clearIcon={<div className='clearIcon' />}
            >
              <Select.Option
                className='undp-select-option'
                key='All Signature Solutions/Enabler'
              >
                All Signature Solutions/Enabler
              </Select.Option>
              {choices?.signatures.map(d => (
                <Select.Option className='undp-select-option' key={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className='margin-top-07'>
            <p className='undp-typography label'>Filter by SDGs</p>
            <Select
              className='undp-select'
              style={{
                flexGrow: 1,
                minWidth: '15rem',
              }}
              placeholder='Please select'
              defaultValue='All SDGs'
              value={tempFilters.sdg}
              showSearch
              allowClear
              onChange={values => {
                setTempFilters({
                  ...tempFilters,
                  sdg: (values as SDGList) || 'All SDGs',
                });
              }}
              clearIcon={<div className='clearIcon' />}
            >
              <Select.Option className='undp-select-option' key='All SDGs'>
                All SDGs
              </Select.Option>
              {choices?.sdgs.map(d => (
                <Select.Option className='undp-select-option' key={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className='margin-top-07'>
            <p className='undp-typography label'>Filter by Location</p>
            <Select
              className='undp-select'
              style={{
                flexGrow: 1,
                minWidth: '15rem',
              }}
              placeholder='Please select'
              defaultValue='All Locations'
              value={tempFilters.location}
              showSearch
              allowClear
              onChange={values => {
                setTempFilters({
                  ...tempFilters,
                  location: (values as LocationList) || 'All Locations',
                });
              }}
              clearIcon={<div className='clearIcon' />}
            >
              {choices?.locations.map(d => (
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
                  width: '100%',
                  flexGrow: 1,
                  minWidth: '15rem',
                }}
                placeholder='Please select'
                defaultValue='All Status'
                value={tempFilters.status}
                showSearch
                allowClear
                onChange={values => {
                  setTempFilters({
                    ...tempFilters,
                    status: (values as StatusList) || 'All Status',
                  });
                }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option className='undp-select-option' key='All Status'>
                  All Status
                </Select.Option>
                {['New', 'Approved'].map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d === 'New' ? 'Awaiting Approval' : d}
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
            if (tempFilters.sdg !== 'All SDGs') {
              i += 1;
            }
            if (tempFilters.ss !== 'All Signature Solutions/Enabler') {
              i += 1;
            }
            if (tempFilters.status !== 'All Status') {
              i += 1;
            }
            if (tempFilters.steep !== 'All STEEP+V') {
              i += 1;
            }
            if (tempFilters.location !== 'All Locations') {
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

export function ArchivedSignalsListing() {
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
          All Archived Signals
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
          <CardLayout
            filters={{
              steep: 'All STEEP+V',
              sdg: 'All SDGs',
              ss: 'All Signature Solutions/Enabler',
              location: 'All Locations',
              status: 'Archived',
            }}
            view={viewType}
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
