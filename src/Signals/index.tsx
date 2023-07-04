import styled from 'styled-components';
import { useContext, useState } from 'react';
import { Modal, Radio, Select, Input } from 'antd';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import Background from '../assets/UNDP-hero-image.jpg';
import { AllSignals } from './AllSignals';
import Context from '../Context/Context';
import { SignalFiltersDataType, StatusList } from '../Types';
import { SignInButton } from '../Components/SignInButton';
import { SIGNAL_ORDER_BY_OPTIONS } from '../Constants';

const HeroImageEl = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url(${Background}) no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;

export function SignalsListing() {
  const { role, choices } = useContext(Context);
  const [viewType, setViewType] = useState<'cardView' | 'listView'>('cardView');
  const [noOfFilter, setNoOfFilter] = useState(0);
  const [signalSortBy, setSignalSortBy] = useState('created_at');
  const [searchQuery, setSearchQuery] = useState<undefined | string>(undefined);

  const [filters, setFilters] = useState<SignalFiltersDataType>({
    steep_primary: 'All Primary STEEP+V',
    steep_secondary: 'All Secondary STEEP+V',
    sdg: 'All SDGs',
    signature_primary: 'All Primary Signature Solutions/Enabler',
    signature_secondary: 'All Secondary Signature Solutions/Enabler',
    status: 'All Status',
    location: 'All Locations',
    score: 'All Scores',
    created_for: 'All Options',
    created_by: undefined,
    unit_region: 'All Units',
    search: undefined,
  });
  const [tempFilters, setTempFilters] = useState<SignalFiltersDataType>({
    steep_primary: 'All Primary STEEP+V',
    steep_secondary: 'All Secondary STEEP+V',
    sdg: 'All SDGs',
    signature_primary: 'All Primary Signature Solutions/Enabler',
    signature_secondary: 'All Secondary Signature Solutions/Enabler',
    status: 'All Status',
    location: 'All Locations',
    score: 'All Scores',
    created_for: 'All Options',
    created_by: undefined,
    unit_region: 'All Units',
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
        className='flex-div margin-top-07 margin-bottom-09 flex-wrap flex-vert-align-center'
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <h4
          className='undp-typography margin-bottom-00'
          style={{ flexGrow: 1 }}
        >
          All Signals
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
            value={signalSortBy}
            onChange={value => {
              setSignalSortBy(value);
            }}
          >
            {SIGNAL_ORDER_BY_OPTIONS.map(d => (
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
          className='flex-div flex-wrap margin-top-02 margin-bottom-05'
          style={{
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          {filters.steep_primary !== 'All Primary STEEP+V' ? (
            <div className='undp-chip undp-chip-blue'>
              Primary STEEP+V: {filters.steep_primary.split('–')[0]}
            </div>
          ) : null}
          {filters.steep_secondary !== 'All Secondary STEEP+V' ? (
            <div className='undp-chip undp-chip-blue'>
              Secondary STEEP+V: {filters.steep_secondary.split('–')[0]}
            </div>
          ) : null}
          {filters.sdg !== 'All SDGs' ? (
            <div className='undp-chip undp-chip-blue'>{filters.sdg}</div>
          ) : null}
          {filters.signature_primary !==
          'All Primary Signature Solutions/Enabler' ? (
            <div className='undp-chip undp-chip-blue'>
              Primary Signature Solutions/Enabler: {filters.signature_primary}
            </div>
          ) : null}
          {filters.signature_secondary !==
          'All Secondary Signature Solutions/Enabler' ? (
            <div className='undp-chip undp-chip-blue'>
              Secondary Signature Solutions/Enabler:{' '}
              {filters.signature_secondary}
            </div>
          ) : null}
          {filters.location !== 'All Locations' ? (
            <div className='undp-chip undp-chip-blue'>{filters.location}</div>
          ) : null}
          {filters.unit_region !== 'All Units' ? (
            <div className='undp-chip undp-chip-blue'>
              {filters.unit_region}
            </div>
          ) : null}
          {filters.created_for !== 'All Options' ? (
            <div className='undp-chip undp-chip-blue'>
              {filters.created_for}
            </div>
          ) : null}
          {filters.status !== 'All Status' ? (
            <div className='undp-chip undp-chip-blue'>
              {filters.status === 'New' ? 'Awaiting Approval' : filters.status}
            </div>
          ) : null}
          {filters.score !== 'All Scores' ? (
            <div className='undp-chip undp-chip-blue'>
              Score: {filters.score}
            </div>
          ) : null}
          {filters.created_by !== undefined ? (
            <div className='undp-chip undp-chip-blue'>{filters.created_by}</div>
          ) : null}
          <button
            type='button'
            className='undp-chip'
            onClick={() => {
              setNoOfFilter(0);
              setSearchQuery(undefined);
              setFilters({
                steep_primary: 'All Primary STEEP+V',
                steep_secondary: 'All Secondary STEEP+V',
                sdg: 'All SDGs',
                signature_primary: 'All Primary Signature Solutions/Enabler',
                signature_secondary:
                  'All Secondary Signature Solutions/Enabler',
                status: 'All Status',
                location: 'All Locations',
                score: 'All Scores',
                created_for: 'All Options',
                created_by: undefined,
                unit_region: 'All Units',
                search: undefined,
              });
            }}
          >
            Clear Filter(s)
          </button>
        </div>
      ) : null}
      <AllSignals
        filters={filters}
        view={viewType}
        signalOrderBy={signalSortBy}
      />
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
          <div className='flex-div margin-top-07'>
            <div
              style={{
                flexGrow: 1,
                width: 'calc(50% - 0.667rem)',
              }}
            >
              <p className='undp-typography label'>Filter by Primary STEEP+V</p>
              <Select
                className='undp-select'
                style={{
                  flexGrow: 1,
                  minWidth: '15rem',
                }}
                placeholder='Please select'
                defaultValue='All Primary STEEP+V'
                value={tempFilters.steep_primary}
                showSearch
                allowClear
                onChange={values => {
                  setTempFilters({
                    ...tempFilters,
                    steep_primary: values || 'All Primary STEEP+V',
                  });
                }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option
                  className='undp-select-option'
                  key='All Primary STEEP+V'
                >
                  All Primary STEEP+V
                </Select.Option>
                {choices?.steepv.map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div
              style={{
                flexGrow: 1,
                width: 'calc(50% - 0.667rem)',
              }}
            >
              <p className='undp-typography label'>
                Filter by Secondary STEEP+V
              </p>
              <Select
                className='undp-select'
                style={{
                  flexGrow: 1,
                  minWidth: '15rem',
                }}
                placeholder='Please select'
                defaultValue='All Secondary STEEP+V'
                value={tempFilters.steep_secondary}
                showSearch
                allowClear
                onChange={values => {
                  setTempFilters({
                    ...tempFilters,
                    steep_secondary: values || 'All Secondary STEEP+V',
                  });
                }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option
                  className='undp-select-option'
                  key='All Secondary STEEP+V'
                >
                  All Secondary STEEP+V
                </Select.Option>
                {choices?.steepv.map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='flex-div margin-top-07'>
            <div
              style={{
                flexGrow: 1,
                width: 'calc(50% - 0.667rem)',
              }}
            >
              <p className='undp-typography label'>
                Filter by Primary Signature Solutions/Enabler
              </p>
              <Select
                className='undp-select'
                style={{
                  flexGrow: 1,
                  minWidth: '15rem',
                }}
                placeholder='Please select'
                defaultValue='All Primary Signature Solutions/Enabler'
                value={tempFilters.signature_primary}
                showSearch
                allowClear
                onChange={values => {
                  setTempFilters({
                    ...tempFilters,
                    signature_primary:
                      values || 'All Primary Signature Solutions/Enabler',
                  });
                }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option
                  className='undp-select-option'
                  key='All Primary Signature Solutions/Enabler'
                >
                  All Primary Signature Solutions/Enabler
                </Select.Option>
                {choices?.signatures.map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div
              style={{
                flexGrow: 1,
                width: 'calc(50% - 0.667rem)',
              }}
            >
              <p className='undp-typography label'>
                Filter by Secondary Signature Solutions/Enabler
              </p>
              <Select
                className='undp-select'
                style={{
                  flexGrow: 1,
                  minWidth: '15rem',
                }}
                placeholder='Please select'
                defaultValue='All Secondary Signature Solutions/Enabler'
                value={tempFilters.signature_secondary}
                showSearch
                allowClear
                onChange={values => {
                  setTempFilters({
                    ...tempFilters,
                    signature_secondary:
                      values || 'All Secondary Signature Solutions/Enabler',
                  });
                }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option
                  className='undp-select-option'
                  key='All Secondary Signature Solutions/Enabler'
                >
                  All Secondary Signature Solutions/Enabler
                </Select.Option>
                {choices?.signatures.map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
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
                  sdg: values || 'All SDGs',
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
          <div className='flex-div margin-top-07'>
            <div
              style={{
                flexGrow: 1,
                width: 'calc(50% - 0.667rem)',
              }}
            >
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
                    location: values || 'All Locations',
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
            <div
              style={{
                flexGrow: 1,
                width: 'calc(50% - 0.667rem)',
              }}
            >
              <p className='undp-typography label'>Filter by Unit</p>
              <Select
                className='undp-select'
                style={{
                  flexGrow: 1,
                  minWidth: '15rem',
                }}
                placeholder='Please select'
                defaultValue='All Units'
                value={tempFilters.unit_region}
                showSearch
                allowClear
                onChange={values => {
                  setTempFilters({
                    ...tempFilters,
                    unit_region: values || 'All Units',
                  });
                }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option className='undp-select-option' key='All Units'>
                  All Units
                </Select.Option>
                {choices?.unit_regions.map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='margin-top-07'>
            <p className='undp-typography label'>Filter by Created for</p>
            <Select
              className='undp-select'
              style={{
                flexGrow: 1,
                minWidth: '15rem',
              }}
              placeholder='Please select'
              defaultValue='All Options'
              value={tempFilters.created_for}
              showSearch
              allowClear
              onChange={values => {
                setTempFilters({
                  ...tempFilters,
                  created_for: values || 'All Options',
                });
              }}
              clearIcon={<div className='clearIcon' />}
            >
              <Select.Option className='undp-select-option' key='All SDGs'>
                All Options
              </Select.Option>
              {choices?.created_for.map(d => (
                <Select.Option className='undp-select-option' key={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
          {role === 'Admin' || role === 'Curator' ? (
            <>
              <div className='margin-top-07'>
                <p className='undp-typography label'>Filter by Score</p>
                <Select
                  className='undp-select'
                  style={{
                    width: '100%',
                    flexGrow: 1,
                    minWidth: '15rem',
                  }}
                  placeholder='Please select'
                  defaultValue='All Scores'
                  value={tempFilters.score}
                  showSearch
                  allowClear
                  onChange={values => {
                    setTempFilters({
                      ...tempFilters,
                      score: values || 'All Scores',
                    });
                  }}
                  clearIcon={<div className='clearIcon' />}
                >
                  <Select.Option
                    className='undp-select-option'
                    key='All Scores'
                  >
                    All Scores
                  </Select.Option>
                  {choices?.scores.map(d => (
                    <Select.Option className='undp-select-option' key={d}>
                      {d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
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
                  <Select.Option
                    className='undp-select-option'
                    key='All Status'
                  >
                    All Status
                  </Select.Option>
                  {['New', 'Approved'].map(d => (
                    <Select.Option className='undp-select-option' key={d}>
                      {d === 'New' ? 'Awaiting Approval' : d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className='margin-top-07'>
                <p className='label'>Created by (email address)</p>
                <div
                  style={{ width: '100%' }}
                  className='flex-div margin-bottom-06'
                >
                  <div
                    className='gap-00 flex-div'
                    style={{
                      flexGrow: 1,
                      width: 'calc(50% - 0.667rem)',
                    }}
                  >
                    <Input
                      placeholder='Created by'
                      className='undp-input'
                      size='large'
                    />
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <button
          type='button'
          className='undp-button button-secondary'
          onClick={() => {
            let i = 0;
            if (
              tempFilters.signature_primary !==
              'All Primary Signature Solutions/Enabler'
            ) {
              i += 1;
            }
            if (
              tempFilters.signature_secondary !==
              'All Secondary Signature Solutions/Enabler'
            ) {
              i += 1;
            }
            if (tempFilters.steep_primary !== 'All Primary STEEP+V') {
              i += 1;
            }
            if (tempFilters.steep_secondary !== 'All Secondary STEEP+V') {
              i += 1;
            }
            if (tempFilters.sdg !== 'All SDGs') {
              i += 1;
            }
            if (tempFilters.location !== 'All Locations') {
              i += 1;
            }
            if (tempFilters.score !== 'All Scores') {
              i += 1;
            }
            if (tempFilters.unit_region !== 'All Units') {
              i += 1;
            }
            if (tempFilters.created_for !== 'All Options') {
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
        className='flex-div margin-top-07 margin-bottom-09 flex-wrap flex-vert-align-center'
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
          <AllSignals
            filters={{
              sdg: 'All SDGs',
              location: 'All Locations',
              score: 'All Scores',
              status: 'Archived',
              unit_region: 'All Units',
              steep_primary: 'All Primary STEEP+V',
              steep_secondary: 'All Secondary STEEP+V',
              signature_primary: 'All Primary Signature Solutions/Enabler',
              signature_secondary: 'All Secondary Signature Solutions/Enabler',
              created_for: 'All Options',
              created_by: 'All',
            }}
            view={viewType}
            signalOrderBy='modified_at'
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
