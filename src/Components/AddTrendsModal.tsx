/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unstable-nested-components */
import { Collapse, Input, Modal, Select } from 'antd';
import axios from 'axios';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HORIZON } from '../Constants';
import { TrendDataType } from '../Types';

interface Props {
  setTrendModal: (_d: boolean) => void;
  selectedTrendsList: string[];
  setSelectedTrendsList: (_d: string[]) => void;
}

const RadioOutline = styled.div`
  border: 1px solid var(--gray-400);
  border-radius: 2px;
  font-size: 0.75rem;
  padding: 0.5rem;
  background-color: var(--gray-300);
  font-weight: bold;
  text-transform: uppercase !important;
  width: 56px;
  text-align: center;
`;

export function AddTrendsModal(props: Props) {
  const { setTrendModal, selectedTrendsList, setSelectedTrendsList } = props;
  const [filteredHorizons, setFilteredHorizons] =
    useState<string>('All Horizons');
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [filteredImpactRating, setFilteredImpactRating] =
    useState<string>('All Impact Ratings');
  const [trendsList, setTrendsList] = useState<TrendDataType[]>([]);
  const [filteredTrendsList, setFilteredTrendsList] = useState<TrendDataType[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        'https://signals-and-trends-api.azurewebsites.net/v1/trends/list?offset=0&limit=100',
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setTrendsList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const DataFilterByHorizon =
      filteredHorizons === 'All Horizons'
        ? trendsList
        : trendsList.filter(d => d.time_horizon === filteredHorizons);
    const DataFilterByIR =
      filteredImpactRating === 'All Impact Ratings'
        ? DataFilterByHorizon
        : DataFilterByHorizon.filter(
            d => `${d.impact_rating}` === filteredImpactRating,
          );
    const DataFilteredBySearch = !search
      ? DataFilterByIR
      : DataFilterByIR.filter(d =>
          d.headline.toLowerCase().includes(search.toLowerCase()),
        );
    setFilteredTrendsList(DataFilteredBySearch);
    setLoading(false);
  }, [filteredHorizons, search, filteredImpactRating, trendsList]);
  return (
    <Modal
      className='undp-modal'
      open
      title='Select Trends'
      onOk={() => {
        setTrendModal(false);
      }}
      onCancel={() => {
        setTrendModal(false);
      }}
      width={960}
    >
      <p className='undp-typography italics margin-bottom-07'>
        Trends are connected or decoupled when you click on the trends
      </p>
      <div className='flex-div margin-top-07 margin-bottom-05 flex-wrap'>
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
      {loading ? (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      ) : (
        <div className='margin-bottom-09'>
          <Collapse
            expandIconPosition='start'
            className='undp-accordion-with-bg'
            expandIcon={({ isActive }) => (
              <img
                src='https://design.undp.org/icons/chevron-right.svg'
                alt='chevron-left-icon'
                style={{ rotate: `${isActive ? '90deg' : '0deg'}` }}
              />
            )}
          >
            {filteredTrendsList?.map((d, i) => (
              <Collapse.Panel
                key={i}
                header={d.headline}
                className='undp-accordion-with-bg-item'
                extra={
                  <RadioOutline
                    onClick={e => {
                      e.stopPropagation();
                      if (
                        selectedTrendsList.findIndex(el => el === d._id) === -1
                      ) {
                        const arr = [...selectedTrendsList];
                        arr.push(d._id);
                        setSelectedTrendsList(arr);
                      } else {
                        setSelectedTrendsList([
                          ...selectedTrendsList.filter(el => el !== d._id),
                        ]);
                      }
                    }}
                  >
                    {selectedTrendsList ? (
                      selectedTrendsList.findIndex(
                        selTrend => selTrend === d._id,
                      ) === -1 ? (
                        <div style={{ color: 'var(--blue-600)' }}>+ Add</div>
                      ) : (
                        <div style={{ color: 'var(--dark-red)' }}>- Remove</div>
                      )
                    ) : (
                      <div style={{ color: 'var(--blue-600)' }}>+ Add</div>
                    )}
                  </RadioOutline>
                }
              >
                <p
                  className='undp-typography margin-bottom-00 small-font'
                  style={{ textAlign: 'left' }}
                >
                  {d.description}
                </p>
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
      )}
      <button
        className='undp-button button-secondary button-arrow'
        type='button'
        onClick={() => {
          setTrendModal(false);
        }}
      >
        Done
      </button>
    </Modal>
  );
}
