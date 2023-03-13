import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SignalEntryFormEl } from '../Components/SignalEntryFormEl';
import { SignalDataType } from '../Types';

export function EditSignal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [signal, setSignal] = useState<SignalDataType | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [err, setError] = useState<any>(undefined);
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/fetch?ids=${id}`,
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        setError(error.toJSON());
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setSignal(response.data[0]);
      });
  }, [id]);
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
      <h3 className='undp-typography margin-top-05'>
        Edit Signal{signal ? `: ${signal.headline}` : null}
      </h3>
      {err ? (
        <p
          className='undp-typography margin-top-07 padding-top-07 padding-bottom-07'
          style={{
            textAlign: 'center',
            backgroundColor: 'var(--gray-200)',
            color: 'var(--dark-red)',
          }}
        >
          Error {err.status}: There is an error loading the signal please try
          again
        </p>
      ) : null}
      {!err && !signal ? (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      ) : signal ? (
        <SignalEntryFormEl updateSignal={signal} />
      ) : null}
    </div>
  );
}
