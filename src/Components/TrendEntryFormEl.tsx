/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Select } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { HORIZON } from '../Constants';

interface Props {
  setOpenModal: (_d: boolean) => void;
}

export function TrendEntryFormEl(props: Props) {
  const { setOpenModal } = props;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [submittingError, setSubmittingError] = useState<undefined | string>(
    undefined,
  );
  const [headline, setHeadline] = useState<undefined | string>(undefined);
  const [description, setDescription] = useState<undefined | string>(undefined);
  const [timeHorizon, setTimeHorizon] = useState<
    undefined | 'Horizon 1 (0-3Y)' | 'Horizon 2 (4-6Y)' | 'Horizon 3 (7+Y)'
  >(undefined);
  const [creatorEmail, setCreatorEmail] = useState<string | null>(null);
  const [impactRating, setImpactRating] = useState<number | null>(null);
  const [impactDescription, setImpactDescription] = useState<string | null>(
    null,
  );
  return (
    <div className='undp-container max-width padding-top-00 padding-bottom-00'>
      <h3 className='undp-typography'>Trends Entry Form</h3>
      <h4 className='undp-typography'>Trend Information</h4>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography bold'>Trend headline</h5>
        <Input
          className='undp-input'
          placeholder='Enter trend headline (max 50 characters)'
          maxLength={50}
          onChange={d => {
            setHeadline(d.target.value);
          }}
        />
        <p
          className='undp-typography margin-top-02 margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          Useful headlines are clear, concise and can stand alone as a simple
          description of the Signal. {headline ? 50 - headline.length : 50}{' '}
          characters left
        </p>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography bold'>Trend Description</h5>
        <Input.TextArea
          className='undp-input'
          placeholder='Trend description'
          status={description ? (description.length > 30 ? '' : 'error') : ''}
          onChange={e => {
            setDescription(e.target.value);
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
      <div className='flex-div'>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography bold'>Time Horizon</h5>
          <Select
            className='undp-select'
            placeholder='Select time horizon'
            onChange={e => {
              setTimeHorizon(e);
            }}
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
            Time horizon
          </p>
        </div>
        <div className='margin-bottom-07' style={{ width: 'calc(50% - 1rem)' }}>
          <h5 className='undp-typography bold'>Impact Rating</h5>
          <Select
            className='undp-select'
            placeholder='Select Signature Solution'
            onChange={e => {
              setImpactRating(e);
            }}
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
            Consider both the near term and longer term futures of development.
          </p>
        </div>
      </div>
      <div className='margin-bottom-07'>
        <h5 className='undp-typography bold'>Impact Description</h5>
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
      <hr className='undp-style margin-top-07 margin-bottom-07' />
      <h4 className='undp-typography'>Scanner Information</h4>
      <div className='margin-bottom-07'>
        <p className='label'>Email id</p>
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
              url: 'https://signals-and-trends-api.azurewebsites.net//v1/signals/submit',
              data: {
                created_by: {
                  email: creatorEmail,
                },
                description,
                headline,
                impact_description: impactDescription,
                time_horizon: timeHorizon,
                impact_rating: impactRating,
              },
              headers: { 'Content-Type': 'application/json' },
            })
              .then(() => {
                setButtonDisabled(false);
                setOpenModal(false);
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
    </div>
  );
}
