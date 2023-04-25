import styled from 'styled-components';
import { useContext, useState } from 'react';
import { Modal, Radio, Select } from 'antd';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import Background from '../assets/UNDP-hero-image.png';
import { CardLayout } from './CardsListingView';
import { SDGCOLOR, SSCOLOR, STEEP_V } from '../Constants';
import Context from '../Context/Context';
import {
  SDGList,
  SignalFiltersDataType,
  SSList,
  StatusList,
  STEEPVList,
} from '../Types';
import { SignInButton } from '../Components/SignInButton';

const HeroImageEl = styled.div`
  background: url(${Background}) no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;

export function SignalsListing() {
  const { role } = useContext(Context);
  const [viewType, setViewType] = useState<'cardView' | 'listView'>('cardView');
  const [noOfFilter, setNoOfFilter] = useState(0);

  const [filters, setFilters] = useState<SignalFiltersDataType>({
    steep: 'All STEEP+V',
    sdg: 'All SDGs',
    ss: 'All Signature Solutions/Enabler',
    status: 'All Status',
  });
  const [tempFilters, setTempFilters] = useState<SignalFiltersDataType>({
    steep: 'All STEEP+V',
    sdg: 'All SDGs',
    ss: 'All Signature Solutions/Enabler',
    status: 'All Status',
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
        <h4 className='undp-typography margin-bottom-00'>All Signals</h4>
        <div className='flex-div flex-vert-align-center'>
          {noOfFilter > 0 ? (
            <button
              type='button'
              className='undp-chip'
              onClick={() => {
                setNoOfFilter(0);
                setFilters({
                  steep: 'All STEEP+V',
                  sdg: 'All SDGs',
                  ss: 'All Signature Solutions/Enabler',
                  status: 'All Status',
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
              {STEEP_V.map(d => (
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
              {SSCOLOR.map(d => (
                <Select.Option className='undp-select-option' key={d.value}>
                  {d.value}
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
              {SDGCOLOR.map(d => (
                <Select.Option className='undp-select-option' key={d.value}>
                  {d.value}
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
              status: 'Archived',
            }}
            view={viewType}
          />
        ) : (
          <p className='undp-typography' style={{ color: 'var(--dark-red)' }}>
            You don&apos;t have enough right to edit a trend
          </p>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton buttonText='Sign In to View This Page' />
      </UnauthenticatedTemplate>
    </>
  );
}
