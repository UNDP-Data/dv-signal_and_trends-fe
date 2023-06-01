/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Select, Popconfirm } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_ACCESS_TOKEN, HORIZON } from '../Constants';
import { TrendDataType, SignalDataType } from '../Types';
import { AddSignalsModal } from './AddSignalsModal';
import Context from '../Context/Context';

interface Props {
  updateTrend?: TrendDataType;
}

const UploadEl = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  border: 2px solid var(--gray-700);
  background-color: var(--white);
`;

const SelectedEl = styled.div`
  font-size: 1rem;
  background-color: var(--gray-100);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface HeroImageProps {
  bgImage: string;
}

const UploadedImgEl = styled.div<HeroImageProps>`
  background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
    ${props => `url(data:${props.bgImage})`} no-repeat center;
  background-size: cover;
  width: 7.5rem;
  height: 7.5rem;
  margin-top: var(--spacing-03);
  border-radius: 0.25rem;
  border: 1px solid var(--gray-400);
`;

const UploadButtonEl = styled.div`
  color: var(--black);
  text-transform: uppercase;
  cursor: pointer;
  justify-content: center;
  padding: 1rem 0.75rem;
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  line-height: 1;
  width: fit-content;
  background-color: var(--gray-200);
  font-weight: bold;
  border-right: 2px solid var(--gray-400);
  &:hover {
    background-color: var(--gray-300);
  }
`;
const FileAttachmentButton = styled.input`
  display: none;
`;
export function TrendEntryFormEl(props: Props) {
  const { updateTrend } = props;
  const { accessToken, updateNotificationText } = useContext(Context);
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
  const [trendsSignal, setTrendsSignal] = useState<number[]>(
    updateTrend ? updateTrend.connected_signals || [] : [],
  );
  const [connectedSignal, setConnectedSignals] = useState<
    SignalDataType[] | null
  >(null);
  const [trendStatus, setTrendStatus] = useState<string>(
    updateTrend?.status || 'New',
  );
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    updateTrend?.attachment || undefined,
  );
  const confirmDelete = (id: number, navigatePath: string) => {
    axios({
      method: 'delete',
      url: `https://signals-and-trends-api.azurewebsites.net/v1/trends/delete?ids=${id}`,
      data: {},
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    })
      .then(() => {
        setButtonDisabled(false);
        navigate(navigatePath);
        updateNotificationText('Successfully deleted the signal');
      })
      .catch(err => {
        setButtonDisabled(false);
        setSubmittingError(
          `Error code ${err.response?.status}: ${err.response?.data}. ${
            err.response?.status === 500 ? 'Please try again in some time' : ''
          }`,
        );
      });
  };
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInputRef = useRef<any>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileSelect = (event: any) => {
    if (event.target.files) {
      if (event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsBinaryString(event.target.files[0]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.onloadend = (e: any) => {
          const base64String = btoa(e.target.result);
          setSelectedFile(
            `${event.target.files[0].type};base64,${base64String}`,
          );
        };
      }
      setSelectedFileName(event.target.files[0].name);
    }
  };
  return (
    <div className='undp-container max-width padding-top-00 padding-bottom-00'>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Trend Headline*</h5>
        <Input
          className='undp-input'
          placeholder='Enter trend headline (max 100 characters)'
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
          A concise, self-sufficient headline that conveys the essence of the
          trend without needing further explanation.{' '}
          {headline ? 100 - headline.length : 100} characters left
        </p>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Trend Description*</h5>
        <Input.TextArea
          className='undp-input'
          placeholder='Enter trend description (max 400 characters)'
          maxLength={400}
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
          A concise definition of the trend that makes it easy to decide which
          signals link to it. Min 30 characters required.{' '}
          {description ? 400 - description.length : 400} characters left
        </p>
      </div>
      <div className='margin-bottom-09'>
        <h5 className='undp-typography'>Signals related to the trend</h5>
        {connectedSignal ? (
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
                <p className='undp-typography margin-bottom-00'>{d.headline}</p>
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
          <p
            className='undp-typography margin-top-02 margin-bottom-00'
            style={{ color: 'var(--gray-500)' }}
          >
            Timeframe/period during which this trend might apply
          </p>
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
          <p
            className='undp-typography margin-top-02 margin-bottom-00'
            style={{ color: 'var(--gray-500)' }}
          >
            How great of an impact might this trend make on development on the
            selected time horizon?
          </p>
        </div>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Impact Description*</h5>
        <Input.TextArea
          className='undp-input'
          placeholder='Enter impact description'
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
          A concise description of the impact/s of this trend on development.
          Min 30 characters required
        </p>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Attachment</h5>
        {selectedFile ? (
          <div className='flex-div padding-bottom-05'>
            <UploadedImgEl bgImage={selectedFile} />
            <button
              type='button'
              className='undp-button button-tertiary flex'
              onClick={() => {
                setSelectedFileName('');
                setSelectedFile('');
              }}
              style={{
                backgroundColor: 'var(--gray-300)',
                padding: 'var(--spacing-05)',
                alignSelf: 'flex-end',
              }}
            >
              Remove Image
            </button>
          </div>
        ) : null}
        <p className='label'>
          {selectedFile
            ? 'Uploading file with replace the already uploaded image shown above. '
            : ''}
          Attach an image here to illustrate this Trend, if available. Only use
          images that are licensed or license-free/Creative Commons. File must
          be maximum 1 MBs. Compress larger images, if applicable.
        </p>
        <UploadEl>
          <label htmlFor='file-upload-analyze' className='custom-file-upload'>
            <UploadButtonEl style={{ width: '177.55px' }}>
              Upload a Image
            </UploadButtonEl>
          </label>
          {selectedFileName !== '' ? (
            <SelectedEl>
              Selected <span className='bold'>{selectedFileName}</span>
            </SelectedEl>
          ) : (
            <SelectedEl style={{ opacity: '0.6' }}>No file selected</SelectedEl>
          )}
          <FileAttachmentButton
            ref={fileInputRef}
            id='file-upload-analyze'
            accept='image/png, image/jpeg, image/jpg, image/gif, image/svg'
            type='file'
            onChange={handleFileSelect}
          />
        </UploadEl>
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
            {['Approved', 'Archived', 'Awaiting Approval'].map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
      ) : null}
      {!updateTrend ? ( // new trend
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
                  attachment: selectedFile,
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
                  updateNotificationText(
                    'Successfully submitted the trend for review',
                  );
                })
                .catch(err => {
                  setButtonDisabled(false);
                  setSubmittingError(
                    `Error code ${err.response?.status}: ${
                      err.response?.data
                    }. ${
                      err.response?.status === 500
                        ? 'Please try again in some time'
                        : ''
                    }`,
                  );
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
                  attachment: selectedFile,
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
                  updateNotificationText('Successfully updated the trend');
                })
                .catch((err: AxiosError) => {
                  setButtonDisabled(false);
                  setSubmittingError(
                    `Error code ${err.response?.status}: ${
                      err.response?.data
                    }. ${
                      err.response?.status === 500
                        ? 'Please try again in some time'
                        : ''
                    }`,
                  );
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
              {submittingError}
            </p>
          ) : null}
          {updateTrend.status === 'Archived' ? (
            <Popconfirm
              title='Delete Trend'
              description='Are you sure to delete this trend?'
              onConfirm={() =>
                confirmDelete(updateTrend.id, '../../../archived-trends')
              }
              onCancel={() => {
                updateNotificationText('Delete canceled');
              }}
              okText='Yes'
              cancelText='No'
            >
              <button
                className='undp-button button-secondary button-arrow'
                type='button'
              >
                Delete Archived Trend
              </button>
            </Popconfirm>
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
