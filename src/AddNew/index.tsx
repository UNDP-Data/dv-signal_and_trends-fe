import { useNavigate } from 'react-router-dom';
import { SignalEntryFormEl } from '../Components/SignalEntryFormEl';
import { TrendEntryFormEl } from '../Components/TrendEntryFormEl';

export function AddNewSignalEl() {
  const navigate = useNavigate();
  return (
    <div
      className='undp-container flex-wrap margin-bottom-13'
      style={{ maxWidth: '64rem', padding: '0 2rem', marginTop: '10rem' }}
    >
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
    </div>
  );
}

export function AddNewTrendEl() {
  const navigate = useNavigate();
  return (
    <div
      className='undp-container flex-wrap margin-bottom-13'
      style={{ maxWidth: '64rem', padding: '0 2rem', marginTop: '10rem' }}
    >
      <button
        className='undp-button button-tertiary'
        type='button'
        onClick={() => {
          navigate(-1);
        }}
      >
        ← Back
      </button>
      <TrendEntryFormEl />
    </div>
  );
}
