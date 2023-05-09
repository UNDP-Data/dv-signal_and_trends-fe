/* eslint-disable react/no-unstable-nested-components */
import {
  Collapse,
  Input,
  Modal,
  Pagination,
  PaginationProps,
  Select,
} from 'antd';
import axios, { AxiosResponse } from 'axios';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_ACCESS_TOKEN, HORIZON } from '../Constants';
import {
  HorizonList,
  RatingList,
  TrendDataType,
  TrendFiltersDataType,
} from '../Types';

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
  const [paginationValue, setPaginationValue] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalNo, setTotalNo] = useState(0);
  const [trendsList, setTrendsList] = useState<TrendDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<undefined | string>(undefined);
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _current,
    size,
  ) => {
    setPageSize(size);
    setPaginationValue(1);
  };
  const [filters, setFilters] = useState<TrendFiltersDataType>({
    impact: 'All Ratings',
    horizon: 'All Horizons',
    status: 'All Status',
    search: undefined,
  });
  useEffect(() => {
    setLoading(true);
    const horizonQueryParameter =
      filters.horizon === 'All Horizons' ? '' : `&horizon=${filters.horizon}`;
    const ratingQueryParameter =
      filters.impact === 'All Ratings'
        ? ''
        : `&impact_rating=${filters.impact}`;
    const searchQueryParameter = filters.search
      ? `&query=${filters.search}`
      : '';
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?offset=${
          pageSize * (paginationValue - 1)
        }&limit=${pageSize}&statuses=Approved${horizonQueryParameter}${ratingQueryParameter}${searchQueryParameter}`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setTrendsList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
        setLoading(false);
      });
  }, [paginationValue, pageSize]);
  useEffect(() => {
    setLoading(true);
    const horizonQueryParameter =
      filters.horizon === 'All Horizons' ? '' : `&horizon=${filters.horizon}`;
    const ratingQueryParameter =
      filters.impact === 'All Ratings'
        ? ''
        : `&impact_rating=${filters.impact}`;
    const searchQueryParameter = filters.search
      ? `&query=${filters.search}`
      : '';
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/count?statuses=Approved${horizonQueryParameter}${ratingQueryParameter}${searchQueryParameter}`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((countResponse: AxiosResponse) => {
        setTotalNo(countResponse.data);
        if (countResponse.data === 0) {
          setPaginationValue(1);
          setTrendsList([]);
        } else {
          axios
            .get(
              `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?offset=0&limit=${pageSize}&statuses=Approved${horizonQueryParameter}${ratingQueryParameter}`,
              {
                headers: {
                  access_token: API_ACCESS_TOKEN,
                },
              },
            )
            .then((response: AxiosResponse) => {
              setPaginationValue(1);
              setTrendsList(
                sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
              );
              setLoading(false);
            });
        }
      });
  }, [filters]);
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
          style={{ width: 'calc(50% - 0.667rem)' }}
          placeholder='Please select'
          defaultValue='All Horizons'
          value={filters.horizon}
          showSearch
          allowClear
          disabled={loading}
          onChange={values => {
            const val = values ? (`${values}` as HorizonList) : 'All Horizons';
            setFilters({
              ...filters,
              horizon: val,
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
        <Select
          className='undp-select'
          style={{ width: 'calc(50% - 0.667rem)' }}
          placeholder='Please select'
          defaultValue='All Ratings'
          value={filters.impact}
          showSearch
          disabled={loading}
          allowClear
          onChange={values => {
            const val = values ? (`${values}` as RatingList) : 'All Ratings';
            setFilters({
              ...filters,
              impact: val,
            });
          }}
          clearIcon={<div className='clearIcon' />}
        >
          <Select.Option className='undp-select-option' key='All Ratings'>
            All Ratings
          </Select.Option>
          {['1', '2', '3', '4', '5'].map(d => (
            <Select.Option className='undp-select-option' key={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div
        style={{ width: '100%' }}
        className='flex-div gap-00 margin-bottom-05'
      >
        <Input
          placeholder='Search a signal'
          className='undp-input'
          size='large'
          value={searchQuery}
          onChange={d => {
            setSearchQuery(d.target.value);
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
      {loading ? (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      ) : trendsList.length > 0 ? (
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
            {trendsList.map((d, i) => (
              <Collapse.Panel
                key={i}
                header={d.headline}
                className='undp-accordion-with-bg-item'
                extra={
                  <RadioOutline
                    onClick={e => {
                      e.stopPropagation();
                      if (
                        selectedTrendsList.findIndex(el => el === d.id) === -1
                      ) {
                        const arr = [...selectedTrendsList];
                        arr.push(d.id);
                        setSelectedTrendsList(arr);
                      } else {
                        setSelectedTrendsList([
                          ...selectedTrendsList.filter(el => el !== d.id),
                        ]);
                      }
                    }}
                  >
                    {selectedTrendsList ? (
                      selectedTrendsList.findIndex(
                        selTrend => selTrend === d.id,
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
      ) : (
        <h5
          className='undp-typography bold'
          style={{
            backgroundColor: 'var(--gray-200)',
            textAlign: 'center',
            padding: 'var(--spacing-07)',
            width: 'calc(100% - 4rem)',
            border: '1px solid var(--gray-400)',
          }}
        >
          No signals available matching your criteria
        </h5>
      )}
      <div className='flex-div flex-hor-align-center margin-bottom-07'>
        <Pagination
          className='undp-pagination'
          onChange={e => {
            setPaginationValue(e);
          }}
          defaultCurrent={1}
          current={paginationValue}
          total={totalNo}
          pageSize={pageSize}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
        />
      </div>
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
