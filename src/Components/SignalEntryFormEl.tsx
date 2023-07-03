/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Select, Popconfirm } from 'antd';
import axios, { AxiosResponse } from 'axios';
import sortBy from 'lodash.sortby';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { API_ACCESS_TOKEN } from '../Constants';
import { NewSignalDataType, SignalDataType, TrendDataType } from '../Types';
import { AddTrendsModal } from './AddTrendsModal';
import Context from '../Context/Context';

interface Props {
  updateSignal?: SignalDataType;
  draft: boolean;
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

const FileAttachmentButton = styled.input`
  display: none;
`;

export function isSignalInvalid(
  signal: SignalDataType | NewSignalDataType,
  keyWords: [string | undefined, string | undefined, string | undefined],
) {
  if (
    signal.headline &&
    signal.created_unit &&
    signal.description &&
    signal.description.length > 30 &&
    keyWords.filter(d => d !== undefined).length > 0 &&
    signal.location &&
    signal.steep_primary &&
    signal.signature_primary &&
    signal.sdgs &&
    signal.sdgs?.length > 0 &&
    signal.relevance &&
    signal.url
  ) {
    return false;
  }
  return true;
}

export function SignalEntryFormEl(props: Props) {
  const { updateSignal, draft } = props;
  const { userName, role, accessToken, updateNotificationText, choices, unit } =
    useContext(Context);

  const [signalData, updateSignalData] = useState<
    SignalDataType | NewSignalDataType
  >(
    updateSignal || {
      status: 'New',
      created_by: userName,
      headline: undefined,
      description: undefined,
      attachment: undefined,
      steep_primary: undefined,
      steep_secondary: [],
      signature_primary: undefined,
      signature_secondary: [],
      sdgs: [],
      created_unit: unit,
      url: undefined,
      relevance: undefined,
      keywords: [],
      location: undefined,
      score: undefined,
      connected_trends: [],
      created_for: undefined,
    },
  );
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [trendsList, setTrendsList] = useState<undefined | TrendDataType[]>(
    undefined,
  );
  const [trendModal, setTrendModal] = useState(false);
  const [selectedTrendsList, setSelectedTrendsList] = useState<number[]>(
    updateSignal?.connected_trends || [],
  );
  const [submittingError, setSubmittingError] = useState<undefined | string>(
    undefined,
  );
  const [keyword1, setKeyword1] = useState<string | undefined>(
    updateSignal?.keywords ? updateSignal?.keywords[0] || undefined : undefined,
  );
  const [keyword2, setKeyword2] = useState<string | undefined>(
    updateSignal?.keywords ? updateSignal?.keywords[1] || undefined : undefined,
  );
  const [keyword3, setKeyword3] = useState<string | undefined>(
    updateSignal?.keywords ? updateSignal?.keywords[2] || undefined : undefined,
  );
  const confirmDelete = (id: number, navigatePath: string) => {
    axios({
      method: 'delete',
      url: `https://signals-and-trends-api.azurewebsites.net/v1/signals/delete?ids=${id}`,
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
    if (selectedTrendsList.length > 0) {
      axios
        .get(
          `https://signals-and-trends-api.azurewebsites.net/v1/trends/fetch?ids=${selectedTrendsList.join(
            '&ids=',
          )}`,
          {
            headers: {
              access_token: accessToken || API_ACCESS_TOKEN,
            },
          },
        )
        .then((response: AxiosResponse) => {
          setTrendsList(
            sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
          );
        });
    } else {
      setTrendsList([]);
    }
  }, [selectedTrendsList]);
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
          updateSignalData({
            ...signalData,
            attachment: `${event.target.files[0].type};base64,${base64String}`,
          });
        };
      }
      setSelectedFileName(event.target.files[0].name);
    }
  };
  return (
    <div className='undp-container max-width padding-top-00 padding-bottom-00'>
      <p className='undp-typography'>
        A Signal is defined as a single piece of evidence or indicator that
        points to, relates to, or otherwise supports a trend. A signal can also
        stand alone as a potential indicator of future change in one or more
        trends.
      </p>
      <div className='margin-bottom-07'>
        <p className='undp-typography margin-bottom-01'>Signal Title*</p>
        <Input
          className='undp-input'
          placeholder='Enter signal title (max 100 characters)'
          value={signalData.headline}
          maxLength={100}
          onChange={d => {
            updateSignalData({
              ...signalData,
              headline: d.target.value,
            });
          }}
        />
        <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
          Useful titles are clear, concise and can stand alone as a simple
          description of the signal.{' '}
          {signalData.headline ? 100 - signalData.headline.length : 100}{' '}
          characters left
        </p>
      </div>
      <div className='margin-bottom-07'>
        <p className='undp-typography margin-bottom-01'>Signal Description*</p>
        <Input.TextArea
          className='undp-input'
          placeholder='Enter signal description (max 200 characters)'
          maxLength={200}
          status={
            signalData.description
              ? signalData.description.length > 30
                ? ''
                : 'error'
              : ''
          }
          onChange={e => {
            updateSignalData({
              ...signalData,
              description: e.target.value,
            });
          }}
          value={signalData.description}
        />
        <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
          What is the Signal about? Keep this description concise and think
          about using commonly used terms and clear language. This should be
          your summarised description, not cut-and-paste from article. Min 30
          characters required.{' '}
          {signalData.description ? 200 - signalData.description.length : 200}{' '}
          characters left
        </p>
      </div>
      <div className='flex-div'>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <p className='undp-typography margin-bottom-01'>Signal Source*</p>
          <Input
            className='undp-input'
            placeholder='Enter signal source'
            onChange={d => {
              updateSignalData({
                ...signalData,
                url: d.target.value,
              });
            }}
            value={signalData.url}
          />
          <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
            If no URL is available, provide description of source - e.g., in a
            meeting with Minister X; or taxi in country X
          </p>
        </div>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <p className='undp-typography margin-bottom-01'>
            Location of the signal*
          </p>
          <Select
            className='undp-select'
            placeholder='Select location'
            onChange={(e: string) => {
              updateSignalData({
                ...signalData,
                location: e,
              });
            }}
            value={signalData.location}
          >
            {choices?.locations.map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
          <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
            Region and/or country for which this signal has greatest relevance
          </p>
        </div>
      </div>
      <div className='margin-bottom-07'>
        <p className='undp-typography margin-bottom-01'>Signal Relevance*</p>
        <Input.TextArea
          className='undp-input'
          placeholder='Enter signal relevance'
          onChange={e => {
            updateSignalData({
              ...signalData,
              relevance: e.target.value,
            });
          }}
          value={signalData.relevance}
        />
        <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
          What is the significance of this Signal to UNDP? Consider both the
          near term and longer term futures of development.
        </p>
      </div>
      <div className='margin-bottom-07'>
        <div className='flex-div flex-wrap margin-bottom-00'>
          <div style={{ width: 'calc(50% - 0.5rem)' }}>
            <p className='undp-typography margin-bottom-01'>Primary STEEP+V*</p>
            <Select
              className='undp-select'
              placeholder='Select STEEP+V'
              onChange={e => {
                updateSignalData({
                  ...signalData,
                  steep_primary: e,
                });
              }}
              value={signalData.steep_primary}
            >
              {choices?.steepv.map((d, i) => (
                <Select.Option className='undp-select-option' key={i} value={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ width: 'calc(50% - 0.5rem)' }}>
            <p className='undp-typography margin-bottom-01'>
              Secondary STEEP+V
            </p>
            <Select
              className='undp-select'
              placeholder='Select STEEP+V'
              mode='multiple'
              onChange={e => {
                if (e.length > 1) {
                  updateSignalData({
                    ...signalData,
                    steep_secondary: [e[0], e[e.length - 1]],
                  });
                } else {
                  updateSignalData({
                    ...signalData,
                    steep_secondary: e.length === 0 || !e ? [] : e,
                  });
                }
              }}
              value={signalData.steep_secondary}
            >
              {choices?.steepv.map((d, i) => (
                <Select.Option className='undp-select-option' key={i} value={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
          STEEP+V analysis methodology stands for Social, Technological,
          Economic, Environmental (or Ecological), Political and Values
        </p>
      </div>
      <div className='margin-bottom-07'>
        <p className='undp-typography margin-bottom-01'>Cover Image</p>
        {signalData.attachment ? (
          <div className='flex-div padding-bottom-05'>
            <UploadedImgEl bgImage={signalData.attachment} />
            <button
              type='button'
              className='undp-button button-tertiary flex'
              onClick={() => {
                setSelectedFileName('');
                updateSignalData({
                  ...signalData,
                  attachment: undefined,
                });
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
        <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
          {signalData.attachment
            ? 'Uploading file with replace the already uploaded image shown above. '
            : ''}
          Attach an image here to illustrate this Signal, if available. Use only
          images that are non-copyright or license-free/Creative Commons. File
          must be maximum 1 MBs. Compress larger images, if applicable.
        </p>
      </div>
      <div className='margin-bottom-07'>
        <p className='undp-typography margin-bottom-01'>Keywords*</p>
        <div className='flex-div'>
          <Input
            className='undp-input'
            placeholder='Enter Keyword#1'
            onChange={e => {
              setKeyword1(e.target.value);
            }}
            value={keyword1 || undefined}
          />
          <Input
            className='undp-input'
            placeholder='Enter Keyword#2'
            onChange={e => {
              setKeyword2(e.target.value);
            }}
            value={keyword2 || undefined}
          />
          <Input
            className='undp-input'
            placeholder='Enter Keyword#3'
            onChange={e => {
              setKeyword3(e.target.value);
            }}
            value={keyword3 || undefined}
          />
        </div>
        <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
          Use clear, simple keywords for ease of searchability.
        </p>
      </div>
      <div className='flex-div flex-wrap margin-bottom-07'>
        <div style={{ width: 'calc(50% - 1rem)' }}>
          <p className='undp-typography margin-bottom-01'>
            Primary Signature Solution/Enabler*
          </p>
          <Select
            className='undp-select'
            placeholder='Select Signature Solution'
            onChange={e => {
              updateSignalData({
                ...signalData,
                signature_primary: e,
              });
            }}
            value={signalData.signature_primary}
          >
            {choices?.signatures.map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ width: 'calc(50% - 1rem)' }}>
          <p className='undp-typography margin-bottom-01'>
            Secondary Signature Solution/Enabler
          </p>
          <Select
            className='undp-select'
            placeholder='Select Signature Solution'
            onChange={e => {
              if (e.length > 1) {
                updateSignalData({
                  ...signalData,
                  signature_secondary: [e[0], e[e.length - 1]],
                });
              } else {
                updateSignalData({
                  ...signalData,
                  signature_secondary: e.length === 0 || !e ? [] : e,
                });
              }
            }}
            mode='multiple'
            value={signalData.signature_secondary}
            clearIcon={<div className='clearIcon' />}
            allowClear
          >
            {choices?.signatures.map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className='margin-bottom-07' style={{ width: '100%' }}>
        <p className='undp-typography margin-bottom-01'>SDGs*</p>
        <Select
          className='undp-select'
          mode='multiple'
          placeholder='Select SDG'
          maxTagCount='responsive'
          onChange={e => {
            if (e.length > 1) {
              updateSignalData({
                ...signalData,
                sdgs: [e[0], e[e.length - 1]],
              });
            } else {
              updateSignalData({
                ...signalData,
                sdgs: e.length === 0 || !e ? [] : e,
              });
            }
          }}
          clearIcon={<div className='clearIcon' />}
          allowClear
          value={signalData.sdgs}
        >
          {choices?.sdgs.map((d, i) => (
            <Select.Option className='undp-select-option' key={i} value={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
        <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
          Which SDG is it most closely connected to? Select relevant SDGs. Max 2
          SDGs allowed.
        </p>
      </div>
      {role === 'Curator' || role === 'Admin' ? (
        <div className='margin-bottom-07' style={{ width: '100%' }}>
          <p className='undp-typography margin-bottom-01'>Signal Score</p>
          <Select
            className='undp-select'
            placeholder='Select Score'
            onChange={e => {
              updateSignalData({
                ...signalData,
                score: e,
              });
            }}
            value={signalData.score}
          >
            {choices?.scores.map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
          <p className='undp-typography margin-top-02 margin-bottom-00 small-font'>
            Signal score can only be seen by the curators and admins
          </p>
        </div>
      ) : null}
      {role === 'Curator' || role === 'Admin' ? (
        <div className='margin-bottom-07'>
          <p className='undp-typography bold'>Link signal to trend(s)</p>
          {trendsList ? (
            <>
              {trendsList?.map((d, i) => (
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
                  <div>
                    <p className='undp-typography margin-bottom-01'>
                      {d.headline}
                    </p>
                    <p className='undp-typography small-font'>
                      {d.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const arr = [...trendsList.filter(el => el.id !== d.id)];
                      setTrendsList(arr);
                      setSelectedTrendsList(arr.map(k => k.id));
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
                  setTrendModal(true);
                }}
                style={{
                  backgroundColor: 'var(--gray-300)',
                  padding: 'var(--spacing-05)',
                }}
              >
                Select trends
              </button>
            </>
          ) : (
            <p className='undp-typography'>Loading trends...</p>
          )}
        </div>
      ) : null}
      <div className='margin-bottom-07'>
        <p className='undp-typography margin-bottom-01'>Created For</p>
        <Select
          className='undp-select'
          placeholder='Created For'
          onChange={e => {
            updateSignalData({
              ...signalData,
              created_for: e,
            });
          }}
          value={signalData.created_for}
        >
          {choices?.created_for.map((d, i) => (
            <Select.Option className='undp-select-option' key={i} value={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className='margin-bottom-07'>
        <p className='undp-typography margin-bottom-01'>Unit</p>
        <Select
          className='undp-select'
          placeholder='Select Status'
          onChange={e => {
            updateSignalData({
              ...signalData,
              created_unit: e,
            });
          }}
          value={signalData.created_unit}
        >
          {choices?.unit_names.map((d, i) => (
            <Select.Option className='undp-select-option' key={i} value={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
      </div>
      {updateSignal && !draft ? (
        <div className='margin-bottom-07'>
          <p className='undp-typography margin-bottom-01'>
            Status of the signal
          </p>
          <Select
            className='undp-select'
            placeholder='Select Status'
            onChange={e => {
              updateSignalData({
                ...signalData,
                status: e === 'Awaiting Approval' ? 'New' : e,
              });
            }}
            value={
              signalData.status === 'New'
                ? 'Awaiting Approval'
                : signalData.status
            }
          >
            {['Approved', 'Archived', 'Awaiting Approval'].map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
      ) : null}
      <div className='flex-div flex-vert-align-center margin-top-09'>
        {updateSignal ? (
          updateSignal.status === 'Draft' ? (
            <div className='flex-div'>
              <button
                className={`${
                  isSignalInvalid(signalData, [keyword1, keyword2, keyword3]) ||
                  buttonDisabled
                    ? 'disabled '
                    : ''
                }undp-button button-secondary button-arrow`}
                type='button'
                disabled={
                  isSignalInvalid(signalData, [keyword1, keyword2, keyword3]) ||
                  buttonDisabled
                }
                onClick={() => {
                  // submit signal
                  setButtonDisabled(true);
                  setSubmittingError(undefined);
                  axios({
                    method: 'put',
                    url: `https://signals-and-trends-api.azurewebsites.net/v1/signals/update`,
                    data: {
                      ...signalData,
                      connected_trends: selectedTrendsList,
                      keywords: [keyword1, keyword2, keyword3].filter(
                        d => d !== null && d !== undefined,
                      ),
                    },
                    headers: {
                      'Content-Type': 'application/json',
                      access_token: accessToken,
                    },
                  })
                    .then(() => {
                      setButtonDisabled(false);
                      navigate('/signals');
                      updateNotificationText(
                        'Successfully submitted the signal for review',
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
                Submit Signal
              </button>
              <button
                className='undp-button button-secondary button-arrow'
                type='button'
                onClick={() => {
                  // save as draft
                  setButtonDisabled(true);
                  setSubmittingError(undefined);
                  axios({
                    method: 'put',
                    url: `https://signals-and-trends-api.azurewebsites.net/v1/signals/update`,
                    data: {
                      ...signalData,
                      connected_trends: selectedTrendsList,
                      status: 'Draft',
                    },
                    headers: {
                      'Content-Type': 'application/json',
                      access_token: accessToken,
                    },
                  })
                    .then(() => {
                      setButtonDisabled(false);
                      navigate('/my-drafts');
                      updateNotificationText(
                        'Successfully saved the signal to draft',
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
                Save Signal as Draft
              </button>
              <Popconfirm
                title='Delete Signal'
                description='Are you sure to delete this signal?'
                onConfirm={() => confirmDelete(updateSignal.id, '/my-drafts')}
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
                  Delete Draft Signal
                </button>
              </Popconfirm>
            </div>
          ) : (
            <button
              className={`${
                isSignalInvalid(signalData, [keyword1, keyword2, keyword3]) ||
                buttonDisabled
                  ? 'disabled '
                  : ''
              }undp-button button-secondary button-arrow`}
              type='button'
              disabled={
                isSignalInvalid(signalData, [keyword1, keyword2, keyword3]) ||
                buttonDisabled
              }
              title={
                isSignalInvalid(signalData, [keyword1, keyword2, keyword3]) ||
                buttonDisabled
                  ? 'All fields are required to update a signal. Descriptions should be > 30 letters'
                  : 'Click to update a signal'
              }
              onClick={() => {
                // update signal
                setButtonDisabled(true);
                setSubmittingError(undefined);
                axios({
                  method: 'put',
                  url: `https://signals-and-trends-api.azurewebsites.net/v1/signals/update`,
                  data: {
                    ...signalData,
                    connected_trends: selectedTrendsList,
                    keywords: [keyword1, keyword2, keyword3].filter(
                      d => d !== null && d !== undefined,
                    ),
                  },
                  headers: {
                    'Content-Type': 'application/json',
                    access_token: accessToken,
                  },
                })
                  .then(() => {
                    setButtonDisabled(false);
                    navigate(`/signals/${updateSignal.id}`);
                    updateNotificationText('Successfully updated the signal');
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
              Update Signal
            </button>
          )
        ) : (
          <div className='flex-div'>
            <button
              className={`${
                isSignalInvalid(signalData, [keyword1, keyword2, keyword3]) ||
                buttonDisabled
                  ? 'disabled '
                  : ''
              }undp-button button-secondary button-arrow`}
              type='button'
              disabled={
                isSignalInvalid(signalData, [keyword1, keyword2, keyword3]) ||
                buttonDisabled
              }
              title={
                isSignalInvalid(signalData, [keyword1, keyword2, keyword3]) ||
                buttonDisabled
                  ? 'All fields are required to submit a signal. Descriptions should be > 30 letters'
                  : 'Click to submit a signal'
              }
              onClick={() => {
                setButtonDisabled(true);
                setSubmittingError(undefined);
                axios({
                  method: 'post',
                  url: `https://signals-and-trends-api.azurewebsites.net/v1/signals/submit`,
                  data: {
                    ...signalData,
                    connected_trends: selectedTrendsList,
                    status: 'New',
                    keywords: [keyword1, keyword2, keyword3].filter(
                      d => d !== null && d !== undefined,
                    ),
                  },
                  headers: {
                    'Content-Type': 'application/json',
                    access_token: accessToken,
                  },
                })
                  .then(() => {
                    setButtonDisabled(false);
                    navigate('/signals');
                    updateNotificationText(
                      'Successfully submitted the signal for review',
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
              Submit Signal
            </button>
            <button
              className='undp-button button-secondary button-arrow'
              type='button'
              onClick={() => {
                setButtonDisabled(true);
                setSubmittingError(undefined);
                axios({
                  method: 'post',
                  url: `https://signals-and-trends-api.azurewebsites.net/v1/signals/submit`,
                  data: {
                    ...signalData,
                    connected_trends: selectedTrendsList,
                    status: 'Draft',
                    keywords: [keyword1, keyword2, keyword3].filter(
                      d => d !== null && d !== undefined,
                    ),
                  },
                  headers: {
                    'Content-Type': 'application/json',
                    access_token: accessToken,
                  },
                })
                  .then(() => {
                    setButtonDisabled(false);
                    navigate('/my-drafts');
                    updateNotificationText(
                      'Successfully saved the signal to draft',
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
              Save Signal as Draft
            </button>
          </div>
        )}
        {updateSignal &&
        updateSignal.status === 'Archived' &&
        (role === 'Curator' || role === 'Admin') ? (
          <Popconfirm
            title='Delete Signal'
            description='Are you sure to delete this signal?'
            onConfirm={() =>
              confirmDelete(updateSignal.id, '../../../archived-signals')
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
              Delete Archived Signal
            </button>
          </Popconfirm>
        ) : null}
        {buttonDisabled ? <div className='undp-loader' /> : null}
        {submittingError ? (
          <p
            className='margin-top-00 margin-bottom-00'
            style={{ color: 'var(--dark-red)' }}
          >
            {submittingError}
          </p>
        ) : null}
      </div>
      {trendModal ? (
        <AddTrendsModal
          setTrendModal={setTrendModal}
          selectedTrendsList={selectedTrendsList}
          setSelectedTrendsList={setSelectedTrendsList}
        />
      ) : null}
    </div>
  );
}
