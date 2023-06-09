/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
// import sortBy from 'lodash.sortby';
import {
  forceCollide,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from 'd3-force';
import { scaleSqrt } from 'd3-scale';
// import { max } from 'd3-array';
import axios, { AxiosResponse } from 'axios';
import { VisTrendDataType } from '../Types';
import { API_ACCESS_TOKEN } from '../Constants';
import Context from '../Context/Context';

const horizons = ['Horizon 1 (0-3Y)', 'Horizon 2 (4-6Y)', 'Horizon 3 (7+Y)'];
const xCenter = [250, 750, 1250];
const yCenter = [100, 200, 300, 400, 500];
const visHeight = 600;
const colorScale = ['#FAD285', '#E7752D', '#891002'];
const sqrtScale = scaleSqrt().domain([0, 7]).range([5, 20]);

export function TrendsVis() {
  const [trendsList, setTrendsList] = useState<undefined | VisTrendDataType[]>(
    undefined,
  );
  const [nodesList, setNodesList] = useState<undefined | VisTrendDataType[]>(
    undefined,
  );
  const { accessToken } = useContext(Context);
  const [error, setError] = useState<undefined | string>(undefined);

  useEffect(() => {
    setTrendsList([]);
    setError(undefined);
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?per_page=500`,
        {
          headers: {
            access_token: accessToken || API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        const array = [];
        // const responseData = [];
        for (let i = 0; i < 3; i += 1) {
          let responseData = [...response.data.data];
          // eslint-disable-next-line no-console
          console.log('i', i);
          responseData.forEach(d => {
            // eslint-disable-next-line no-param-reassign
            d.id = i * 1000 + d.id;
          });
          array.push(...responseData);
          responseData = [];
        }
        setTrendsList(array);
        /* setTrendsList(
          sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
        ); */
        // eslint-disable-next-line no-console
        console.log('trendsList', array);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setTrendsList([]);
        } else {
          setError(
            `Error code ${err.response?.status}: ${err.response?.data}. ${
              err.response?.status === 500
                ? 'Please try again in some time'
                : ''
            }`,
          );
        }
      });
  }, []);
  useEffect(() => {
    forceSimulation(trendsList)
      .force('charge', forceManyBody().strength(5))
      .force(
        'x',
        forceX().x(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (d: any) =>
            xCenter[
              horizons.indexOf(
                d.time_horizon !== null ? d.time_horizon : 'Horizon 1 (0-3Y)',
              )
            ],
        ),
      )
      .force(
        'y',
        forceY().y(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (d: any) =>
            yCenter[Number(d.impact_rating !== null ? d.impact_rating : 1) - 1],
        ),
      )
      .force(
        'collision',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        forceCollide().radius((d: any) =>
          sqrtScale(
            d.connected_signals !== null ? d.connected_signals.length : 0,
          ),
        ),
      )
      .tick(100)
      .on('end', () => {
        setNodesList(trendsList);
      });
    // eslint-disable-next-line no-console
    console.log('nodesList', nodesList);
  }, [trendsList]);
  return (
    <div style={{ padding: '0 1rem' }}>
      <div className='flex-div'>
        <div>
          <h6 className='undp-typography margin-bottom-01'>Impact</h6>
          <div className='legend-container'>
            <div
              style={{ backgroundColor: `${colorScale[0]}` }}
              className='legend-circle'
            >
              &nbsp;
            </div>
            <div className='legend-label'>1: Not significant</div>
            <div
              style={{ backgroundColor: `${colorScale[1]}` }}
              className='legend-circle'
            >
              &nbsp;
            </div>
            <div className='legend-label'>2: Moderate</div>
            <div
              style={{ backgroundColor: `${colorScale[2]}` }}
              className='legend-circle'
            >
              &nbsp;
            </div>
            <div className='legend-label'>3: Significant</div>
          </div>
        </div>
        <div>
          <h6 className='undp-typography margin-bottom-01'>
            Number of Signals connected to the Trend
          </h6>
          <div>
            <div className='legend-container'>
              <div
                style={{ backgroundColor: '#CCC' }}
                className='legend-circle-small'
              >
                &nbsp;
              </div>
              <div className='legend-label'>1 signal</div>
              <div
                style={{ backgroundColor: '#CCC' }}
                className='legend-circle-big'
              >
                &nbsp;
              </div>
              <div className='legend-label'>7 signals</div>
            </div>
          </div>
        </div>
      </div>
      {nodesList ? (
        <div id='visContainer' style={{ backgroundColor: '#F7F7F7' }}>
          <svg width='calc(100% - 20px)' viewBox={`0 0 1500 ${visHeight}`}>
            <g transform={`translate(10,${40})`}>
              {nodesList.map((d, i) => (
                <circle
                  className={`circle-${i}`}
                  key={i}
                  r={sqrtScale(
                    d.connected_signals !== null
                      ? d.connected_signals.length
                      : 0,
                  )}
                  cx={d.x}
                  cy={d.y}
                  fill={
                    colorScale[
                      Number(d.impact_rating !== null ? d.impact_rating : 1) - 1
                    ]
                  }
                />
              ))}
            </g>
            <g transform='translate(10,40)'>
              {horizons.map((d, i) => (
                <text
                  key={i}
                  x={xCenter[i]}
                  textAnchor='middle'
                  style={{ textTransform: 'uppercase' }}
                >
                  {d}
                </text>
              ))}
            </g>
          </svg>
        </div>
      ) : error ? (
        <p
          className='margin-top-00 margin-bottom-00'
          style={{ color: 'var(--dark-red)' }}
        >
          {error}
        </p>
      ) : (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
