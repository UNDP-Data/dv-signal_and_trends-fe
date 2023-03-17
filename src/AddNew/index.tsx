import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';
import { SignalEntryFormEl } from '../Components/SignalEntryFormEl';
import { TrendEntryFormEl } from '../Components/TrendEntryFormEl';
import { SignInButton } from '../Components/SignInButton';

export function AddNewSignalEl() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  return (
    <div
      className='undp-container flex-wrap margin-bottom-13'
      style={{ maxWidth: '64rem', padding: '0 2rem', marginTop: '10rem' }}
    >
      {isAuthenticated ? (
        <>
          <button
            className='undp-button button-tertiary'
            type='button'
            onClick={() => {
              navigate(-1);
            }}
          >
            ← Back
          </button>
          <h3 className='undp-typography margin-top-05'>Add New Signal</h3>
          <SignalEntryFormEl />
        </>
      ) : (
        <div
          className='flex-div flex-wrap flex-hor-align-center'
          style={{ flexDirection: 'column' }}
        >
          <h6 className='undp-typography margin-bottom-03'>
            Please login to add a new a signal
          </h6>
          <SignInButton />
        </div>
      )}
    </div>
  );
}

export function AddNewTrendEl() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  return (
    <div
      className='undp-container flex-wrap margin-bottom-13'
      style={{ maxWidth: '64rem', padding: '0 2rem', marginTop: '10rem' }}
    >
      {isAuthenticated ? (
        <>
          <button
            className='undp-button button-tertiary'
            type='button'
            onClick={() => {
              navigate(-1);
            }}
          >
            ← Back
          </button>
          <h3 className='undp-typography margin-top-05'>Add New Trend</h3>
          <TrendEntryFormEl />
        </>
      ) : (
        <div
          className='flex-div flex-wrap flex-hor-align-center'
          style={{ flexDirection: 'column' }}
        >
          <h6 className='undp-typography margin-bottom-03'>
            Please login to add a new a trend
          </h6>
          <SignInButton />
        </div>
      )}
    </div>
  );
}
