/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Modal, Select } from 'antd';
import axios from 'axios';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import styled from 'styled-components';
import { HORIZON, LOCATION } from '../Constants';
import { TrendDataType, SignalDataType } from '../Types';

interface Props {
  updateTrend?: TrendDataType;
}

const RadioOutline = styled.div`
  border: 1px solid var(--blue-600);
  border-radius: 1rem;
  width: 1rem;
  height: 1rem;
  margin-top: 4px;
  background-color: var(--white);
`;

const RadioSolid = styled.div`
  background-color: var(--blue-600);
  border-radius: 1rem;
  width: 0.75rem;
  height: 0.75rem;
  margin: 2px;
`;

const ListEl = styled.button`
  background-color: var(--gray-200);
  border: 1px solid var(--gray-400);
  border-radius: 4px;
  padding: var(--spacing-05);
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  margin-right: 0;
`;

export function TrendEntryFormEl(props: Props) {
  const { updateTrend } = props;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [submittingError, setSubmittingError] = useState<undefined | string>(
    undefined,
  );
  const [updateBy, setUpdateBy] = useState<string | null>(null);
  const [signalModal, setSignalModal] = useState(false);
  const [headline, setHeadline] = useState<undefined | string>(
    updateTrend ? updateTrend.headline : undefined,
  );
  const [description, setDescription] = useState<undefined | string>(
    updateTrend ? updateTrend.description : undefined,
  );
  const [timeHorizon, setTimeHorizon] = useState<
    undefined | 'Horizon 1 (0-3Y)' | 'Horizon 2 (4-6Y)' | 'Horizon 3 (7+Y)'
  >(updateTrend ? updateTrend.time_horizon : undefined);
  const [creatorEmail, setCreatorEmail] = useState<string | null>(
    updateTrend ? updateTrend.created_by.email : null,
  );
  const [creator, setCreator] = useState<string | null>(
    updateTrend ? updateTrend.created_by.name : null,
  );
  const [creatorOffice, setCreatorOffice] = useState<string | null>(
    updateTrend ? updateTrend.created_by.unit : null,
  );
  const [impactRating, setImpactRating] = useState<number | null>(
    updateTrend ? updateTrend.impact_rating : null,
  );
  const [impactDescription, setImpactDescription] = useState<string | null>(
    updateTrend ? updateTrend.impact_description : null,
  );
  const [signalList, setSignalList] = useState<SignalDataType[] | null>(null);
  const [trendsSignal, setTrendsSignal] = useState<string[]>(
    updateTrend ? updateTrend.connected_signals : [],
  );
  useEffect(() => {
    axios
      .get(
        'https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=99999',
      )
      .then((response: any) => {
        setSignalList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
      });
  }, []);
  return (
    <div className='undp-container max-width padding-top-00 padding-bottom-00'>
      <h3 className='undp-typography margin-top-05'>
        {!updateTrend ? 'Add New Trend' : 'Update Trend'}
      </h3>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Trend headline*</h5>
        <Input
          className='undp-input'
          placeholder='Enter trend headline (max 50 characters)'
          maxLength={100}
          onChange={d => {
            setHeadline(d.target.value);
          }}
          value={updateTrend?.headline}
        />
        <p
          className='undp-typography margin-top-02 margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          Useful headlines are clear, concise and can stand alone as a simple
          description of the Signal. {headline ? 100 - headline.length : 100}{' '}
          characters left
        </p>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Trend Description*</h5>
        <Input.TextArea
          className='undp-input'
          placeholder='Trend description'
          status={description ? (description.length > 30 ? '' : 'error') : ''}
          onChange={e => {
            setDescription(e.target.value);
          }}
          value={updateTrend?.description}
        />
        <p
          className='undp-typography margin-top-02 margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          Keep this description concise and think about using commonly used
          terms and clear language. Min 30 characters required
        </p>
      </div>
      <div className='margin-bottom-09'>
        <h5 className='undp-typography'>Signals related to the trend</h5>
        {signalList ? (
          <>
            {trendsSignal?.map((d, i) => (
              <div
                className='flex-div flex-space-between flex-vert-align-center'
                key={i}
                style={{
                  width: 'calc(100% - 2rem)',
                  padding: 'var(--spacing-05)',
                  backgroundColor: 'var(--gray-200)',
                  border: '1px solid var(--gray-400)',
                  marginBottom: 'var(--spacing-05)',
                }}
              >
                <p className='undp-typography margin-bottom-00'>
                  {
                    // eslint-disable-next-line no-underscore-dangle
                    signalList[signalList.findIndex(el => el._id === d)]
                      .headline
                  }
                </p>
                <button
                  onClick={() => {
                    const arr = [...trendsSignal.filter(el => el !== d)];
                    setTrendsSignal(arr);
                  }}
                  type='button'
                  className='undp-button button-tertiary padding-bottom-00 padding-top-00'
                >
                  <img
                    src='https://design.undp.org/icons/times.svg'
                    alt='close-icon'
                  />
                </button>
              </div>
            ))}
            <button
              className='undp-button button-tertiary'
              type='button'
              onClick={() => {
                setSignalModal(true);
              }}
              style={{
                backgroundColor: 'var(--gray-300)',
                padding: 'var(--spacing-05)',
              }}
            >
              Add signals
            </button>
          </>
        ) : (
          <p className='undp-typography'>Loading signals...</p>
        )}
      </div>
      <div className='flex-div'>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography'>Time Horizon*</h5>
          <Select
            className='undp-select'
            placeholder='Select time horizon'
            onChange={e => {
              setTimeHorizon(e);
            }}
            value={updateTrend?.time_horizon}
          >
            {HORIZON.map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography'>Impact Rating*</h5>
          <Select
            className='undp-select'
            placeholder='Select impact rating'
            onChange={e => {
              setImpactRating(e);
            }}
            value={updateTrend?.impact_rating}
          >
            {[1, 2, 3, 4, 5].map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Impact Description*</h5>
        <Input.TextArea
          className='undp-input'
          placeholder='Impact description'
          status={
            impactDescription
              ? impactDescription.length > 30
                ? ''
                : 'error'
              : ''
          }
          value={updateTrend?.impact_description}
          onChange={e => {
            setImpactDescription(e.target.value);
          }}
        />
        <p
          className='undp-typography margin-top-02 margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          Keep this description concise and think about using commonly used
          terms and clear language. Min 30 characters required
        </p>
      </div>
      {!updateTrend ? (
        <div>
          <hr className='undp-style margin-top-07 margin-bottom-07' />
          <h4 className='undp-typography'>Scanner Information</h4>
          <div className='flex-div'>
            <div style={{ width: 'calc(50% - 1rem)' }}>
              <p className='label'>Full Name*</p>
              <Input
                className='undp-input'
                placeholder='Enter name here'
                onChange={e => {
                  setCreator(e.target.value);
                }}
              />
            </div>
            <div style={{ width: 'calc(50% - 1rem)' }}>
              <p className='label'>Email id*</p>
              <Input
                className='undp-input'
                placeholder='Enter email here'
                onChange={e => {
                  setCreatorEmail(e.target.value);
                }}
              />
              <p
                className='undp-typography margin-top-02'
                style={{ color: 'var(--gray-500)' }}
              >
                Your email must end with @undp.org
              </p>
            </div>
          </div>
          <div className='margin-bottom-07'>
            <p className='label'>Country Office / Unit*</p>
            <Select
              className='undp-select'
              placeholder='Select Office'
              onChange={e => {
                setCreatorOffice(e);
              }}
            >
              {LOCATION.map((d, i) => (
                <Select.Option className='undp-select-option' key={i} value={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      ) : (
        <div
          className='margin-top-07 margin-bottom-09'
          style={{ width: '100%' }}
        >
          <h5 className='undp-typography'>Modified by*</h5>
          <Input
            className='undp-input'
            placeholder='Enter Nave'
            onChange={e => {
              setUpdateBy(e.target.value);
            }}
          />
        </div>
      )}
      {!updateTrend ? (
        <div className='flex-div flex-vert-align-center'>
          <button
            className={`${
              !headline ||
              !description ||
              description?.length < 30 ||
              !impactDescription ||
              impactDescription?.length < 30 ||
              !impactRating ||
              !timeHorizon ||
              !creatorEmail ||
              !creator ||
              !creatorOffice ||
              buttonDisabled
                ? 'disabled '
                : ''
            }undp-button button-secondary button-arrow`}
            type='button'
            disabled={
              !headline ||
              !description ||
              description?.length < 30 ||
              !impactDescription ||
              impactDescription?.length < 30 ||
              !impactRating ||
              !timeHorizon ||
              !creatorEmail ||
              !creator ||
              !creatorOffice ||
              buttonDisabled
            }
            onClick={() => {
              setButtonDisabled(true);
              setSubmittingError(undefined);
              axios({
                method: 'post',
                url: 'https://signals-and-trends-api.azurewebsites.net/v1/trends/submit',
                data: {
                  created_by: {
                    name: creator,
                    email: creatorEmail,
                    unit: creatorOffice,
                  },
                  description,
                  headline,
                  impact_description: impactDescription,
                  time_horizon: timeHorizon,
                  impact_rating: impactRating,
                  connected_signals: trendsSignal,
                },
                headers: { 'Content-Type': 'application/json' },
              })
                .then(() => {
                  setButtonDisabled(false);
                  redirect('/trends');
                })
                .catch(err => {
                  setButtonDisabled(false);
                  setSubmittingError(err.message);
                });
            }}
          >
            Submit Trend
          </button>
          {buttonDisabled ? <div className='undp-loader' /> : null}
          {submittingError ? (
            <p
              className='margin-top-00 margin-bottom-00'
              style={{ color: 'var(--dark-red)' }}
            >
              Error submitting trend please try again
            </p>
          ) : null}
        </div>
      ) : (
        <div className='flex-div flex-vert-align-center'>
          <button
            className={`${
              !headline ||
              !description ||
              description?.length < 30 ||
              !impactDescription ||
              impactDescription?.length < 30 ||
              !impactRating ||
              !timeHorizon ||
              !creatorEmail ||
              !creator ||
              !creatorOffice ||
              buttonDisabled
                ? 'disabled '
                : ''
            }undp-button button-secondary button-arrow`}
            type='button'
            disabled={
              !headline ||
              !description ||
              description?.length < 30 ||
              !impactDescription ||
              impactDescription?.length < 30 ||
              !impactRating ||
              !timeHorizon ||
              !creatorEmail ||
              !creator ||
              !creatorOffice ||
              buttonDisabled
            }
            onClick={() => {
              setButtonDisabled(true);
              setSubmittingError(undefined);
              axios({
                method: 'put',
                url: `https://signals-and-trends-api.azurewebsites.net/v1/trends/update?modified_by=${updateBy}`,
                data: {
                  created_by: {
                    name: creator,
                    email: creatorEmail,
                    unit: creatorOffice,
                  },
                  description,
                  headline,
                  impact_description: impactDescription,
                  time_horizon: timeHorizon,
                  impact_rating: impactRating,
                  connected_signals: trendsSignal,
                  _id: updateTrend._id,
                },
                headers: { 'Content-Type': 'application/json' },
              })
                .then(() => {
                  setButtonDisabled(false);
                  redirect(`/trends/${updateTrend._id}`);
                })
                .catch(err => {
                  setButtonDisabled(false);
                  setSubmittingError(err.message);
                });
            }}
          >
            Update Trend
          </button>
          {buttonDisabled ? <div className='undp-loader' /> : null}
          {submittingError ? (
            <p
              className='margin-top-00 margin-bottom-00'
              style={{ color: 'var(--dark-red)' }}
            >
              Error submitting trend please try again
            </p>
          ) : null}
        </div>
      )}
      {signalModal ? (
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
          <div className='margin-bottom-09'>
            {signalList?.map((d, i) => (
              <ListEl
                key={i}
                className='flex-div flex-space-between'
                onClick={() => {
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
                <p className='undp-typography margin-bottom-00'>{d.headline}</p>
                <RadioOutline>
                  {trendsSignal ? (
                    trendsSignal.findIndex(selTrend => selTrend === d._id) ===
                    -1 ? null : (
                      <RadioSolid />
                    )
                  ) : null}
                </RadioOutline>
              </ListEl>
            ))}
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
      ) : null}
    </div>
  );
}
