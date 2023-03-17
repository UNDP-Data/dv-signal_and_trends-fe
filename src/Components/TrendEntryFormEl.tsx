/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMsal } from '@azure/msal-react';
import { Input, Select } from 'antd';
import axios from 'axios';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { HORIZON, LOCATION } from '../Constants';
import { TrendDataType, SignalDataType } from '../Types';
import { AddSignalsModal } from './AddSignalsModal';

interface Props {
  updateTrend?: TrendDataType;
}

export function TrendEntryFormEl(props: Props) {
  const { updateTrend } = props;
  const { accounts } = useMsal();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [submittingError, setSubmittingError] = useState<undefined | string>(
    undefined,
  );
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

  const creatorEmail = updateTrend
    ? updateTrend.created_by.email
    : accounts[0].username;
  const creator = updateTrend
    ? updateTrend.created_by.name
    : accounts[0].name || '';
  const [creatorOffice, setCreatorOffice] = useState<string | null>(
    updateTrend ? updateTrend.created_by.unit : null,
  );
  const updateBy = accounts[0].username;
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
  const [connectedSignal, setConnectedSignals] = useState<
    SignalDataType[] | null
  >(null);
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=100`,
      )
      .then((response: any) => {
        setSignalList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
      });
  }, []);
  useEffect(() => {
    if (trendsSignal.length > 0) {
      const signalIds = trendsSignal.toString().replaceAll(',', '&ids=');
      axios
        .get(
          `https://signals-and-trends-api.azurewebsites.net/v1/signals/fetch?ids=${signalIds}`,
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          setConnectedSignals(res.data);
        });
    } else {
      setConnectedSignals([]);
    }
  }, [trendsSignal]);
  return (
    <div className='undp-container max-width padding-top-00 padding-bottom-00'>
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
            {connectedSignal?.map((d, i) => (
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
                    signalList[signalList.findIndex(el => el._id === d._id)]
                      .headline
                  }
                </p>
                <button
                  onClick={() => {
                    const arr = [...trendsSignal.filter(el => el !== d._id)];
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
          <div className='flex-div margin-bottom-07'>
            <div style={{ width: 'calc(50% - 1rem)' }}>
              <p className='label'>Full Name*</p>
              <Input className='undp-input' disabled value={creator} />
            </div>
            <div style={{ width: 'calc(50% - 1rem)' }}>
              <p className='label'>Email id*</p>
              <Input className='undp-input' disabled value={creatorEmail} />
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
          <Input className='undp-input' disabled value={updateBy} />
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
                url: `https://signals-and-trends-api.azurewebsites.net/v1/trends/submit`,
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
        <AddSignalsModal
          setSignalModal={setSignalModal}
          trendsSignal={trendsSignal}
          setTrendsSignal={setTrendsSignal}
        />
      ) : null}
    </div>
  );
}
