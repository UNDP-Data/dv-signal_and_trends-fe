/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Select } from 'antd';
import axios from 'axios';
import sortBy from 'lodash.sortby';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMsal } from '@azure/msal-react';
import { LOCATION, SDG, SIGNATURE_SOLUTION, STEEP_V } from '../Constants';
import { SignalDataType, TrendDataType } from '../Types';
import { AddTrendsModal } from './AddTrendsModal';

interface Props {
  updateSignal?: SignalDataType;
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

const FileAttachmentButton = styled.input`
  display: none;
`;

export function SignalEntryFormEl(props: Props) {
  const { updateSignal } = props;
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [trendsList, setTrendsList] = useState<undefined | TrendDataType[]>(
    undefined,
  );
  const [trendModal, setTrendModal] = useState(false);
  const [selectedTrendsList, setSelectedTrendsList] = useState<string[]>(
    updateSignal ? updateSignal.connected_trends || [] : [],
  );
  const [submittingError, setSubmittingError] = useState<undefined | string>(
    undefined,
  );
  const [headline, setHeadline] = useState<undefined | string>(
    updateSignal ? updateSignal.headline : undefined,
  );
  const [sourceLink, setSourceLink] = useState<undefined | string>(
    updateSignal ? updateSignal.url : undefined,
  );
  const [description, setDescription] = useState<undefined | string>(
    updateSignal ? updateSignal.description : undefined,
  );
  const [steep, setSteep] = useState<undefined | string>(
    updateSignal ? updateSignal.steep : undefined,
  );
  const [sdg, setSdg] = useState<string[]>(
    updateSignal ? updateSignal.sdgs : [],
  );
  const [location, setLocation] = useState<undefined | string | null>(
    updateSignal ? updateSignal.location : undefined,
  );
  const [relevance, setRelevance] = useState<undefined | string>(
    updateSignal ? updateSignal.relevance : undefined,
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(
    updateSignal ? updateSignal.attachments : null,
  );
  const [keyword1, setKeyword1] = useState<string | null>(
    updateSignal ? updateSignal.keywords[0] : null,
  );
  const [keyword2, setKeyword2] = useState<string | null>(
    updateSignal ? updateSignal.keywords[1] : null,
  );
  const [keyword3, setKeyword3] = useState<string | null>(
    updateSignal ? updateSignal.keywords[2] : null,
  );
  const [primarySS, setPrimarySS] = useState<string | null>(
    updateSignal ? updateSignal.signature_primary : null,
  );
  const [secondarySS, setSecondarySS] = useState<string | null>(
    updateSignal ? updateSignal.signature_secondary : null,
  );
  const creatorEmail = updateSignal
    ? updateSignal.created_by.email
    : accounts[0].username;
  const creator = updateSignal
    ? updateSignal.created_by.name
    : accounts[0].name || '';
  const [creatorOffice, setCreatorOffice] = useState<string | null>(
    updateSignal ? updateSignal.created_by.unit : null,
  );
  const updateBy = accounts[0].username;
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?offset=0&limit=100`,
      )
      .then((response: any) => {
        setTrendsList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
      });
  }, []);
  function isValidUrl(url?: string) {
    if (!url) return false;
    try {
      // eslint-disable-next-line no-new
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  const fileInputRef = useRef<any>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const handleFileSelect = (event: any) => {
    if (event.target.files) {
      if (event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsBinaryString(event.target.files[0]);
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
        <h5 className='undp-typography'>Signal headline*</h5>
        <Input
          className='undp-input'
          placeholder='Enter signal headline (max 50 characters)'
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
          description of the Signal. {headline ? 100 - headline.length : 100}{' '}
          characters left
        </p>
      </div>
      <div className='flex-div'>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography'>Link to Source Material*</h5>
          <Input
            className='undp-input'
            placeholder='Enter source url'
            status={sourceLink ? (isValidUrl(sourceLink) ? '' : 'error') : ''}
            onChange={d => {
              setSourceLink(d.target.value);
            }}
            value={sourceLink}
          />
          <p
            className='undp-typography margin-top-02 margin-bottom-00'
            style={{ color: 'var(--gray-500)' }}
          >
            Primary source URL for this signal.
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
        </div>
      </div>
      <div className='flex-div'>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography'>Signal Description*</h5>
          <Input.TextArea
            className='undp-input'
            placeholder='Signal description'
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
            terms and clear language. Min 30 characters required
          </p>
        </div>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography'>Signal Relevance*</h5>
          <Input.TextArea
            className='undp-input'
            placeholder='Signal relevance'
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
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>STEEP+V Category*</h5>
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
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography'>Attachments</h5>
        <p className='label'>
          Attach an image here to illustrate this Signal, if available. Only use
          images that are licensed or license-free/Creative Commons. You can
          attach up to 2 images. Each file must be maximum 4 MBs. Compress
          larger images, if applicable
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
          Add keywords for this signal. Max 3 keywords allowed.
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
          <h5 className='undp-typography'>Primary Signature Solution*</h5>
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
          <h5 className='undp-typography'>Secondary Signature Solution</h5>
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
          <h5 className='undp-typography'>SDG</h5>
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
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
          <p
            className='undp-typography margin-top-02 margin-bottom-00'
            style={{ color: 'var(--gray-500)' }}
          >
            Which SDG does this signal most align with
          </p>
        </div>
      </div>
      <div className='margin-bottom-09'>
        <h5 className='undp-typography'>Add signal to trends</h5>
        {trendsList ? (
          <>
            {selectedTrendsList?.map((d, i) => (
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
                    trendsList[trendsList.findIndex(el => el._id === d)]
                      .headline
                  }
                </p>
                <button
                  onClick={() => {
                    const arr = [...selectedTrendsList.filter(el => el !== d)];
                    setSelectedTrendsList(arr);
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
              Add trend
            </button>
          </>
        ) : (
          <p className='undp-typography'>Loading trends...</p>
        )}
      </div>
      {!updateSignal ? (
        <div>
          <hr className='undp-style margin-top-07 margin-bottom-07' />
          <h4 className='undp-typography'>Scanner Information</h4>
          <div className='flex-div margin-bottom-07'>
            <div style={{ width: 'calc(50% - 1rem)' }}>
              <p className='label'>Full Name*</p>
              <Input
                className='undp-input'
                placeholder='Enter name here'
                disabled
                value={creator}
              />
            </div>
            <div style={{ width: 'calc(50% - 1rem)' }}>
              <p className='label'>Email id*</p>
              <Input
                className='undp-input'
                placeholder='Enter email here'
                disabled
                value={creatorEmail}
              />
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
            placeholder='Enter email'
            value={updateBy}
            disabled
          />
        </div>
      )}
      <div className='flex-div flex-vert-align-center'>
        {updateSignal ? (
          <button
            className={`${
              !headline ||
              !isValidUrl(sourceLink) ||
              !description ||
              description?.length < 30 ||
              !steep ||
              !sdg ||
              !location ||
              !relevance ||
              !keyword1 ||
              !primarySS ||
              !updateBy ||
              buttonDisabled
                ? 'disabled '
                : ''
            }undp-button button-secondary button-arrow`}
            type='button'
            disabled={
              !headline ||
              !isValidUrl(sourceLink) ||
              !description ||
              description?.length < 30 ||
              !steep ||
              !sdg ||
              !location ||
              !relevance ||
              !keyword1 ||
              !primarySS ||
              !updateBy ||
              buttonDisabled
            }
            onClick={() => {
              setButtonDisabled(true);
              setSubmittingError(undefined);
              axios({
                method: 'put',
                url: `https://signals-and-trends-api.azurewebsites.net/v1/signals/update?modified_by=${updateBy}`,
                data: {
                  attachments: selectedFile,
                  created_by: {
                    email: creatorEmail,
                    name: creator,
                    unit: creatorOffice,
                  },
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
                  _id: updateSignal._id,
                },
                headers: { 'Content-Type': 'application/json' },
              })
                .then(() => {
                  setButtonDisabled(false);
                  navigate(`/signals/${updateSignal._id}`);
                })
                .catch(err => {
                  setButtonDisabled(false);
                  setSubmittingError(err.message);
                });
            }}
          >
            Update Signal
          </button>
        ) : (
          <button
            className={`${
              !headline ||
              !isValidUrl(sourceLink) ||
              !description ||
              description?.length < 30 ||
              !steep ||
              !sdg ||
              !location ||
              !relevance ||
              !keyword1 ||
              !primarySS ||
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
              !isValidUrl(sourceLink) ||
              !description ||
              description?.length < 30 ||
              !steep ||
              !sdg ||
              !location ||
              !relevance ||
              !keyword1 ||
              !primarySS ||
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
                url: `https://signals-and-trends-api.azurewebsites.net/v1/signals/submit`,
                data: {
                  attachments: selectedFile,
                  created_by: {
                    email: creatorEmail,
                    name: creator,
                    unit: creatorOffice,
                  },
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
                headers: { 'Content-Type': 'application/json' },
              })
                .then(() => {
                  setButtonDisabled(false);
                  navigate('/signals');
                })
                .catch(err => {
                  setButtonDisabled(false);
                  setSubmittingError(err.message);
                });
            }}
          >
            Submit Signal
          </button>
        )}
        {buttonDisabled ? <div className='undp-loader' /> : null}
        {submittingError ? (
          <p
            className='margin-top-00 margin-bottom-00'
            style={{ color: 'var(--dark-red)' }}
          >
            Error submitting signal please try again
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
