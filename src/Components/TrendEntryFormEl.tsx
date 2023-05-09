import { Input, Select } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import sortBy from 'lodash.sortby';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ACCESS_TOKEN, HORIZON } from '../Constants';
import { TrendDataType, SignalDataType } from '../Types';
import { AddSignalsModal } from './AddSignalsModal';
import Context from '../Context/Context';

interface Props {
  updateTrend?: TrendDataType;
}

export function TrendEntryFormEl(props: Props) {
  const { updateTrend } = props;
  const { accessToken } = useContext(Context);
  const navigate = useNavigate();
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

  const [impactRating, setImpactRating] = useState<number | null>(
    updateTrend ? updateTrend.impact_rating : null,
  );
  const [impactDescription, setImpactDescription] = useState<string | null>(
    updateTrend ? updateTrend.impact_description : null,
  );
  const [signalList, setSignalList] = useState<SignalDataType[] | null>(null);
  const [trendsSignal, setTrendsSignal] = useState<string[]>(
    updateTrend ? updateTrend.connected_signals || [] : [],
  );
  const [connectedSignal, setConnectedSignals] = useState<
    SignalDataType[] | null
  >(null);
  const [trendStatus, setTrendStatus] = useState<string>(
    updateTrend?.status || 'New',
  );
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
      .then((response: AxiosResponse) => {
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
          {
            headers: {
              access_token: API_ACCESS_TOKEN,
            },
          },
        )
        .then((res: AxiosResponse) => {
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
          value={headline}
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
          maxLength={200}
          status={description ? (description.length > 30 ? '' : 'error') : ''}
          onChange={e => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <p
          className='undp-typography margin-top-02 margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          Keep this description concise and think about using commonly used
          terms and clear language. Min 30 characters required.{' '}
          {description ? 200 - description.length : 200} characters left
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
                    signalList[signalList.findIndex(el => el.id === d.id)]
                      .headline
                  }
                </p>
                <button
                  onClick={() => {
                    const arr = [...trendsSignal.filter(el => el !== d.id)];
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
            value={timeHorizon}
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
            value={impactRating || undefined}
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
          value={impactDescription || undefined}
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
      {updateTrend ? (
        <div className='margin-bottom-07'>
          <h5 className='undp-typography'>Status of the trend</h5>
          <Select
            className='undp-select'
            placeholder='Select Status'
            onChange={e => {
              setTrendStatus(e === 'Awaiting Approval' ? 'New' : e);
            }}
            value={trendStatus === 'New' ? 'Awaiting Approval' : trendStatus}
          >
            {['Approved', 'Awaiting Approval'].map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
      ) : null}
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
              buttonDisabled
            }
            onClick={() => {
              setButtonDisabled(true);
              setSubmittingError(undefined);
              axios({
                method: 'post',
                url: `https://signals-and-trends-api.azurewebsites.net/v1/trends/submit`,
                data: {
                  description,
                  headline,
                  status: 'New',
                  impact_description: impactDescription,
                  time_horizon: timeHorizon,
                  impact_rating: impactRating,
                  connected_signals: trendsSignal,
                },
                headers: {
                  'Content-Type': 'application/json',
                  access_token: accessToken,
                },
              })
                .then(() => {
                  setButtonDisabled(false);
                  navigate('/trends');
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
              buttonDisabled
            }
            onClick={() => {
              setButtonDisabled(true);
              setSubmittingError(undefined);
              axios({
                method: 'put',
                url: 'https://signals-and-trends-api.azurewebsites.net/v1/trends/update',
                data: {
                  created_by: updateTrend.created_by,
                  description,
                  headline,
                  status: trendStatus,
                  impact_description: impactDescription,
                  time_horizon: timeHorizon,
                  impact_rating: impactRating,
                  connected_signals: trendsSignal,
                  id: updateTrend.id,
                },
                headers: {
                  'Content-Type': 'application/json',
                  access_token: accessToken,
                },
              })
                .then(() => {
                  setButtonDisabled(false);
                  navigate(`/trends/${updateTrend.id}`);
                })
                .catch((err: AxiosError) => {
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
