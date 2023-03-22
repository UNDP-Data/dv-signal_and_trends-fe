/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Collapse, Input, Modal, Select } from 'antd';
import axios from 'axios';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_ACCESS_TOKEN, SDGCOLOR, SSCOLOR, STEEP_V } from '../Constants';
import { SignalDataType } from '../Types';

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
  const [signalList, setSignalList] = useState<SignalDataType[]>([]);
  const [filteredSignalList, setFilteredSignalList] = useState<
    SignalDataType[]
  >([]);
  const [filteredSteep, setFilteredSteep] = useState<string>('All STEEP+V');
  const [filteredSDG, setFilteredSDG] = useState<string>('All SDGs');
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [filteredSS, setFilteredSS] = useState<string>(
    'All Signature Solutions/Enabler',
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=100&statuses=Approved`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: any) => {
        setSignalList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
      });
  }, []);
  useEffect(() => {
    const DataFilterBySDG =
      filteredSDG === 'All SDGs'
        ? signalList
        : signalList.filter(d => d.sdgs && d.sdgs?.indexOf(filteredSDG) !== -1);
    const DataFilterBySteep =
      filteredSteep === 'All STEEP+V'
        ? DataFilterBySDG
        : DataFilterBySDG.filter(
            d => d.steep && d.steep?.split(' – ').indexOf(filteredSteep) !== -1,
          );
    const DataFilteredBySS =
      filteredSS === 'All Signature Solutions/Enabler'
        ? DataFilterBySteep
        : DataFilterBySteep.filter(
            d =>
              d.signature_primary === filteredSS ||
              d.signature_secondary === filteredSS,
          );
    const DataFilteredBySearch = !search
      ? DataFilteredBySS
      : DataFilteredBySS.filter(d =>
          d.headline.toLowerCase().includes(search.toLowerCase()),
        );
    setFilteredSignalList(DataFilteredBySearch);
    setLoading(false);
  }, [filteredSteep, search, filteredSDG, filteredSS, signalList]);
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
          style={{ width: 'calc(25% - 0.75rem)' }}
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
          style={{ width: 'calc(25% - 0.75rem)' }}
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
          style={{ width: 'calc(25% - 0.75rem)' }}
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
        <Input
          className='undp-input'
          placeholder='Search a signal'
          style={{ width: 'calc(25% - 0.75rem)' }}
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
            {filteredSignalList.map((d, i) => (
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
      )}
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
