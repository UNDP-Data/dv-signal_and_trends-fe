import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TrendEntryFormEl } from '../Components/TrendEntryFormEl';
import { TrendDataType } from '../Types';

export function EditTrend() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trend, setTrend] = useState<TrendDataType | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [err, setError] = useState<any>(undefined);
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/fetch?ids=${id}`,
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        setError(error.toJSON());
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setTrend(response.data[0]);
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
        Edit Trend{trend ? `: ${trend.headline}` : null}
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
          Error {err.status}: There is an error loading the trend please try
          again
        </p>
      ) : null}
      {!err && !trend ? (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      ) : trend ? (
        <TrendEntryFormEl updateTrend={trend} />
      ) : null}
    </div>
  );
}
