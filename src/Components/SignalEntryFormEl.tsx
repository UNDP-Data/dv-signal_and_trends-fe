/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Select, Popconfirm } from 'antd';
import axios, { AxiosResponse } from 'axios';
import sortBy from 'lodash.sortby';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  API_ACCESS_TOKEN,
  LOCATION,
  SDG,
  SIGNATURE_SOLUTION,
  STEEP_V,
} from '../Constants';
import { SignalDataType, TrendDataType } from '../Types';
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

export function SignalEntryFormEl(props: Props) {
  const { updateSignal, draft } = props;
  const { userName, role, accessToken, updateNotificationText } =
    useContext(Context);
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
  const [headline, setHeadline] = useState<undefined | string>(
    updateSignal?.headline || undefined,
  );
  const [sourceLink, setSourceLink] = useState<undefined | string>(
    updateSignal?.url || undefined,
  );
  const [description, setDescription] = useState<undefined | string>(
    updateSignal?.description || undefined,
  );
  const [steep, setSteep] = useState<undefined | string>(
    updateSignal?.steep || undefined,
  );
  const [sdg, setSdg] = useState<string[]>(updateSignal?.sdgs || []);
  const [location, setLocation] = useState<undefined | string>(
    updateSignal?.location || undefined,
  );
  const [relevance, setRelevance] = useState<undefined | string>(
    updateSignal?.relevance || undefined,
  );
  const [selectedFile, setSelectedFile] = useState<undefined | string>(
    updateSignal?.attachment || undefined,
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
  const [primarySS, setPrimarySS] = useState<string | undefined>(
    updateSignal?.signature_primary || undefined,
  );
  const [secondarySS, setSecondarySS] = useState<string | undefined>(
    updateSignal?.signature_secondary || undefined,
  );
  const [signalStatus, setSignalStatus] = useState<string>(
    updateSignal?.status || 'New',
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
              access_token: API_ACCESS_TOKEN,
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
        <h5 className='undp-typography'>Signal Headline*</h5>
        <Input
          className='undp-input'
          placeholder='Enter signal headline (max 100 characters)'
          value={headline}
          maxLength={100}
          onChange={d => {
            setHeadline(d.target.value);
          }}
        />
        <p
          className='undp-typography margin-top-02 margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          Useful headlines are clear, concise and can stand alone as a simple
          description of the signal. {headline ? 100 - headline.length : 100}{' '}
          characters left
        </p>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Signal Description*</h5>
        <Input.TextArea
          className='undp-input'
          placeholder='Enter signal description (max 200 characters)'
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
      <div className='flex-div'>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography'>Signal Source*</h5>
          <Input
            className='undp-input'
            placeholder='Enter signal source'
            onChange={d => {
              setSourceLink(d.target.value);
            }}
            value={sourceLink}
          />
          <p
            className='undp-typography margin-top-02 margin-bottom-00'
            style={{ color: 'var(--gray-500)' }}
          >
            If no URL is available, provide description of source - e.g., in a
            meeting with Minister X; or taxi in country X
          </p>
        </div>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography'>Location of the signal*</h5>
          <Select
            className='undp-select'
            placeholder='Select location'
            onChange={e => {
              setLocation(e);
            }}
            value={location}
          >
            {LOCATION.map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
          <p
            className='undp-typography margin-top-02 margin-bottom-00'
            style={{ color: 'var(--gray-500)' }}
          >
            Region and/or country for which this signal has greatest relevance
          </p>
        </div>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Signal Relevance*</h5>
        <Input.TextArea
          className='undp-input'
          placeholder='Enter signal relevance'
          onChange={e => {
            setRelevance(e.target.value);
          }}
          value={relevance}
        />
        <p
          className='undp-typography margin-top-02 margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          Consider both the near term and longer term futures of development.
        </p>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>STEEP+V*</h5>
        <Select
          className='undp-select'
          placeholder='Select STEEP+V'
          onChange={e => {
            setSteep(e);
          }}
          value={steep}
        >
          {STEEP_V.map((d, i) => (
            <Select.Option className='undp-select-option' key={i} value={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
        <p
          className='undp-typography margin-top-02 margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          STEEP+V analysis methodology stands for Social, Technological,
          Economic, Environmental (or Ecological), Political and Values
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
          Attach an image here to illustrate this Signal, if available. Only use
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
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Keywords*</h5>
        <p className='label'>
          Add relevant keywords for this signal. Max 3 keywords allowed.
        </p>
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
      </div>
      <div className='flex-div flex-wrap'>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography'>
            Primary Signature Solution/Enabler*
          </h5>
          <Select
            className='undp-select'
            placeholder='Select Signature Solution'
            onChange={e => {
              setPrimarySS(e);
            }}
            value={primarySS}
          >
            {SIGNATURE_SOLUTION.map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography'>
            Secondary Signature Solution/Enabler
          </h5>
          <Select
            className='undp-select'
            placeholder='Select Signature Solution'
            onChange={e => {
              setSecondarySS(e);
            }}
            value={secondarySS}
            clearIcon={<div className='clearIcon' />}
            allowClear
          >
            {SIGNATURE_SOLUTION.map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className='margin-bottom-07' style={{ width: '100%' }}>
          <h5 className='undp-typography'>SDGs</h5>
          <p className='label'>Select relevant SDGs. Max 2 SDGs allowed.</p>
          <Select
            className='undp-select'
            mode='multiple'
            placeholder='Select SDG'
            maxTagCount='responsive'
            onChange={e => {
              setSdg(e.length === 0 || !e ? [] : e);
            }}
            clearIcon={<div className='clearIcon' />}
            allowClear
            value={sdg}
          >
            {SDG.map((d, i) => (
              <Select.Option
                className='undp-select-option'
                key={i}
                value={d}
                disabled={sdg.length > 1}
              >
                {d}
              </Select.Option>
            ))}
          </Select>
          <p
            className='undp-typography margin-top-02 margin-bottom-00'
            style={{ color: 'var(--gray-500)' }}
          >
            Which SDG is it most closely connected to?
          </p>
        </div>
      </div>
      {role === 'Curator' || role === 'Admin' ? (
        <div className='margin-bottom-07'>
          <h5 className='undp-typography'>Link signal to trend(s)</h5>
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
                  <p className='undp-typography margin-bottom-00'>
                    {d.headline}
                  </p>
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
                Add trends
              </button>
            </>
          ) : (
            <p className='undp-typography'>Loading trends...</p>
          )}
        </div>
      ) : null}
      {updateSignal && !draft ? (
        <div className='margin-bottom-07'>
          <h5 className='undp-typography'>Status of the signal</h5>
          <Select
            className='undp-select'
            placeholder='Select Status'
            onChange={e => {
              setSignalStatus(e === 'Awaiting Approval' ? 'New' : e);
            }}
            value={signalStatus === 'New' ? 'Awaiting Approval' : signalStatus}
          >
            {['Approved', 'Archived', 'Awaiting Approval'].map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
      ) : null}
      <div className='flex-div flex-vert-align-center margin-top-05'>
        {updateSignal ? (
          updateSignal.status === 'Draft' ? (
            <div className='flex-div'>
              <button
                className={`${
                  !headline ||
                  !sourceLink ||
                  !description ||
                  description?.length < 30 ||
                  !steep ||
                  !sdg ||
                  !location ||
                  !relevance ||
                  !keyword1 ||
                  !primarySS ||
                  buttonDisabled
                    ? 'disabled '
                    : ''
                }undp-button button-secondary button-arrow`}
                type='button'
                disabled={
                  !headline ||
                  !sourceLink ||
                  !description ||
                  description?.length < 30 ||
                  !steep ||
                  !sdg ||
                  !location ||
                  !relevance ||
                  !keyword1 ||
                  !primarySS ||
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
                      attachment: selectedFile,
                      created_by: userName,
                      status: 'New',
                      description,
                      headline,
                      keywords: [keyword1, keyword2, keyword3].filter(
                        d => d !== null && d !== undefined,
                      ),
                      location,
                      relevance,
                      sdgs: sdg || [],
                      signature_primary: primarySS,
                      signature_secondary: secondarySS,
                      steep,
                      url: sourceLink,
                      id: updateSignal.id,
                      connected_trends: selectedTrendsList,
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
                      attachment: selectedFile,
                      created_by: userName,
                      status: 'Draft',
                      description,
                      headline,
                      keywords: [keyword1, keyword2, keyword3].filter(
                        d => d !== null && d !== undefined,
                      ),
                      location,
                      relevance,
                      sdgs: sdg || [],
                      signature_primary: primarySS,
                      signature_secondary: secondarySS,
                      steep,
                      url: sourceLink,
                      connected_trends: selectedTrendsList,
                      id: updateSignal.id,
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
                !headline ||
                !sourceLink ||
                !description ||
                description?.length < 30 ||
                !steep ||
                !sdg ||
                !location ||
                !relevance ||
                !keyword1 ||
                !primarySS ||
                buttonDisabled
                  ? 'disabled '
                  : ''
              }undp-button button-secondary button-arrow`}
              type='button'
              disabled={
                !headline ||
                !sourceLink ||
                !description ||
                description?.length < 30 ||
                !steep ||
                !sdg ||
                !location ||
                !relevance ||
                !keyword1 ||
                !primarySS ||
                buttonDisabled
              }
              title={
                !headline ||
                !sourceLink ||
                !description ||
                description?.length < 30 ||
                !steep ||
                !sdg ||
                !location ||
                !relevance ||
                !keyword1 ||
                !primarySS ||
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
                    attachment: selectedFile,
                    created_by: updateSignal.created_by,
                    description,
                    headline,
                    keywords: [keyword1, keyword2, keyword3].filter(
                      d => d !== null && d !== undefined,
                    ),
                    location,
                    relevance,
                    status: signalStatus,
                    sdgs: sdg || [],
                    signature_primary: primarySS,
                    signature_secondary: secondarySS,
                    steep,
                    url: sourceLink,
                    connected_trends: selectedTrendsList,
                    id: updateSignal.id,
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
                !headline ||
                !sourceLink ||
                !description ||
                description?.length < 30 ||
                !steep ||
                !sdg ||
                !location ||
                !relevance ||
                !keyword1 ||
                !primarySS ||
                buttonDisabled
                  ? 'disabled '
                  : ''
              }undp-button button-secondary button-arrow`}
              type='button'
              disabled={
                !headline ||
                !sourceLink ||
                !description ||
                description?.length < 30 ||
                !steep ||
                !sdg ||
                !location ||
                !relevance ||
                !keyword1 ||
                !primarySS ||
                buttonDisabled
              }
              title={
                !headline ||
                !sourceLink ||
                !description ||
                description?.length < 30 ||
                !steep ||
                !sdg ||
                !location ||
                !relevance ||
                !keyword1 ||
                !primarySS ||
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
                    attachment: selectedFile,
                    created_by: userName,
                    status: 'New',
                    description,
                    headline,
                    keywords: [keyword1, keyword2, keyword3].filter(
                      d => d !== null && d !== undefined,
                    ),
                    location,
                    relevance,
                    sdgs: sdg || [],
                    signature_primary: primarySS,
                    signature_secondary: secondarySS,
                    steep,
                    url: sourceLink,
                    connected_trends: selectedTrendsList,
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
                    attachment: selectedFile,
                    created_by: userName,
                    status: 'Draft',
                    description,
                    headline,
                    keywords: [keyword1, keyword2, keyword3].filter(
                      d => d !== null && d !== undefined,
                    ),
                    location,
                    relevance,
                    sdgs: sdg || [],
                    signature_primary: primarySS,
                    signature_secondary: secondarySS,
                    steep,
                    url: sourceLink,
                    connected_trends: selectedTrendsList,
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
