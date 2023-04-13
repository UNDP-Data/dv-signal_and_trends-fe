/* eslint-disable react/no-unstable-nested-components */
import { Collapse, Modal, Pagination, PaginationProps, Select } from 'antd';
import axios, { AxiosResponse } from 'axios';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_ACCESS_TOKEN, SDGCOLOR, SSCOLOR, STEEP_V } from '../Constants';
import {
  SDGList,
  SignalDataType,
  SignalFiltersDataType,
  SSList,
  STEEPVList,
} from '../Types';

interface Props {
  setSignalModal: (_d: boolean) => void;
  trendsSignal: string[];
  setTrendsSignal: (_d: string[]) => void;
}

const RadioOutline = styled.div`
  border: 1px solid var(--gray-400);
  border-radius: 2px;
  font-size: 0.75rem;
  padding: 0.5rem;
  background-color: var(--gray-300);
  font-weight: bold;
  text-transform: uppercase !important;
  flex-shrink: 0;
  width: 56px;
  text-align: center;
`;

export function AddSignalsModal(props: Props) {
  const { setSignalModal, trendsSignal, setTrendsSignal } = props;
  const [paginationValue, setPaginationValue] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalNo, setTotalNo] = useState(0);
  const [signalList, setSignalList] = useState<SignalDataType[]>([]);

  const [filters, setFilters] = useState<SignalFiltersDataType>({
    steep: 'All STEEP+V',
    sdg: 'All SDGs',
    ss: 'All Signature Solutions/Enabler',
    status: 'All Status',
  });
  const [loading, setLoading] = useState(true);
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _current,
    size,
  ) => {
    setPageSize(size);
    setPaginationValue(1);
  };
  useEffect(() => {
    setLoading(true);
    setSignalList([]);
    const steepQueryParameter =
      filters.steep === 'All STEEP+V' ? '' : `&steep=${filters.steep}`;
    const ssQueryParameter =
      filters.ss === 'All Signature Solutions/Enabler'
        ? ''
        : `&signature_primary=${filters.ss.replaceAll(' ', '%20')}`;
    const statusQueryParameter = '&statuses=Approved';
    const sdgQueryParameter =
      filters.sdg === 'All SDGs' ? '' : `&sdgs=${filters.sdg}`;
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=${
          pageSize * (paginationValue - 1)
        }&limit=${pageSize}${statusQueryParameter}${steepQueryParameter}${sdgQueryParameter}${ssQueryParameter}`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setSignalList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
        setLoading(false);
      });
  }, [paginationValue, pageSize]);
  useEffect(() => {
    setSignalList([]);
    setLoading(true);
    const steepQueryParameter =
      filters.steep === 'All STEEP+V' ? '' : `&steep=${filters.steep}`;
    const ssQueryParameter =
      filters.ss === 'All Signature Solutions/Enabler'
        ? ''
        : `&signature_primary=${filters.ss}`;
    const statusQueryParameter = 'statuses=Approved';
    const sdgQueryParameter =
      filters.sdg === 'All SDGs' ? '' : `&sdgs=${filters.sdg}`;
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/count?${statusQueryParameter}${steepQueryParameter}${sdgQueryParameter}${ssQueryParameter}`,
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
          setSignalList([]);
        } else {
          axios
            .get(
              `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=${pageSize}&${statusQueryParameter}${steepQueryParameter}${sdgQueryParameter}${ssQueryParameter}`,
              {
                headers: {
                  access_token: API_ACCESS_TOKEN,
                },
              },
            )
            .then((response: AxiosResponse) => {
              setPaginationValue(1);
              setLoading(false);
              setSignalList(
                sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
              );
            });
        }
      });
  }, [filters]);
  return (
    <Modal
      className='undp-modal'
      open
      title='Select Signals'
      onOk={() => {
        setSignalModal(false);
      }}
      onCancel={() => {
        setSignalModal(false);
      }}
      width={960}
    >
      <p className='undp-typography italics margin-bottom-07'>
        Signals are connected or decoupled when you click on the signal
      </p>
      <div className='flex-div margin-top-07 margin-bottom-05 flex-wrap'>
        <Select
          className='undp-select'
          style={{ width: 'calc(33.33% - 0.667rem)' }}
          placeholder='Please select'
          defaultValue='All STEEP+V'
          value={filters.steep}
          showSearch
          allowClear
          disabled={loading}
          onChange={values => {
            const val = values ? (`${values}` as STEEPVList) : 'All STEEP+V';
            setFilters({
              ...filters,
              steep: val,
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
        <Select
          className='undp-select'
          style={{ width: 'calc(33.33% - 0.667rem)' }}
          placeholder='Please select'
          defaultValue='All Signature Solutions/Enabler'
          value={filters.ss}
          showSearch
          allowClear
          disabled={loading}
          onChange={values => {
            const val = values
              ? (`${values}` as SSList)
              : 'All Signature Solutions/Enabler';
            setFilters({
              ...filters,
              ss: val,
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
        <Select
          className='undp-select'
          style={{ width: 'calc(33.33% - 0.667rem)' }}
          placeholder='Please select'
          defaultValue='All SDGs'
          value={filters.sdg}
          showSearch
          allowClear
          disabled={loading}
          onChange={values => {
            const val = values ? (`${values}` as SDGList) : 'All SDGs';
            setFilters({
              ...filters,
              sdg: val,
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

      {loading ? (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      ) : signalList.length > 0 ? (
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
            {signalList.map((d, i) => (
              <Collapse.Panel
                key={i}
                header={d.headline}
                className='undp-accordion-with-bg-item'
                extra={
                  <RadioOutline
                    onClick={e => {
                      e.stopPropagation();
                      if (trendsSignal.findIndex(el => el === d._id) === -1) {
                        const arr = [...trendsSignal];
                        arr.push(d._id);
                        setTrendsSignal(arr);
                      } else {
                        setTrendsSignal([
                          ...trendsSignal.filter(el => el !== d._id),
                        ]);
                      }
                    }}
                  >
                    {trendsSignal ? (
                      trendsSignal.findIndex(selTrend => selTrend === d._id) ===
                      -1 ? (
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
          setSignalModal(false);
        }}
      >
        Done
      </button>
    </Modal>
  );
}
