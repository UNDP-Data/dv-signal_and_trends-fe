/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { useContext, useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
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
import { json } from 'd3-fetch';
// import axios, { AxiosResponse } from 'axios';
import { VisTrendDataType } from '../Types';
// import { API_ACCESS_TOKEN } from '../Constants';
// import Context from '../Context/Context';

const horizons = ['Horizon 1 (0-3Y)', 'Horizon 2 (4-6Y)', 'Horizon 3 (7+Y)'];
const xCenter = [250, 750, 1250];
const yCenter = [500, 300, 100];
const visHeight = 650;
// const colorScale = ['#FAD285', '#E7752D', '#891002'];
const colorScale = ['#B5D5F5', '#4F95DD', '#1F5A95'];
const sqrtScale = scaleSqrt().domain([0, 7]).range([5, 20]);

interface DotHoveredProps {
  title: string;
  xPosition: number;
  yPosition: number;
}

interface TooltipElProps {
  x: number;
  y: number;
}

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 1000;
  font-size: 1rem;
  background-color: var(--gray-300);
  word-wrap: break-word;
  top: ${props => props.y - 17}px;
  left: ${props => props.x}px;
  transform: translate(-50%, -100%);
  padding: 1rem;
`;

export function TrendsVis() {
  const [trendsList, setTrendsList] = useState<undefined | VisTrendDataType[]>(
    undefined,
  );
  const [nodesList, setNodesList] = useState<undefined | VisTrendDataType[]>(
    undefined,
  );
  const [showGroups, setShowGroups] = useState<boolean>(false);
  const [hoveredDot, setHoveredDot] = useState<null | DotHoveredProps>(null);
  // const { accessToken } = useContext(Context);
  const [error, setError] = useState<undefined | string>(undefined);
  const groupByImpact = (e: CheckboxChangeEvent) => {
    setShowGroups(e.target.checked);
  };
  useEffect(() => {
    setShowGroups(false);
    setTrendsList([]);
    setError(undefined);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json('../../public/testdata/response.json').then((response: any) => {
      setTrendsList(response.data);
    });
    /* axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?per_page=500`,
        {
          headers: {
            access_token: accessToken || API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setTrendsList(response.data.data);
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
      }); */
  }, []);
  useEffect(() => {
    const simulation = forceSimulation(trendsList)
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
      );
    if (showGroups) {
      // const simulation = forceSimulation(trendsList)
      simulation.force(
        'y',
        forceY().y(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (d: any) =>
            yCenter[Number(d.impact_rating !== null ? d.impact_rating : 1) - 1],
        ),
      );
    } else {
      simulation.force('y', forceY().y(visHeight / 2));
    }
    simulation
      .force(
        'collision',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        forceCollide().radius((d: any) =>
          sqrtScale(
            d.connected_signals !== null ? d.connected_signals.length : 0,
          ),
        ),
      )
      .tick(100);
    simulation.on('tick', () => {
      setNodesList([...simulation.nodes()]);
    });
    simulation.nodes([...simulation.nodes()]);
    simulation.alpha(0.1).restart();
    // return () => simulation.stop();
  }, [showGroups, trendsList]);
  return (
    <div>
      <div className='flex-div'>
        <div>
          <h6 className='undp-typography margin-bottom-02'>Impact</h6>
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
        <div className='margin-left-06'>
          <h6 className='undp-typography margin-bottom-02'>
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
      <Checkbox className='undp-checkbox' onChange={groupByImpact}>
        <div className='undp-typography margin-bottom-06'>
          Group Trends by Impact
        </div>
      </Checkbox>
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
                  onMouseEnter={event => {
                    setHoveredDot({
                      title: d.headline,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredDot(null);
                  }}
                />
              ))}
            </g>
            <g transform='translate(10,50)'>
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
      {hoveredDot ? (
        <TooltipEl x={hoveredDot.xPosition} y={hoveredDot.yPosition}>
          <h6 className='undp-typography margin-bottom-01'>
            {hoveredDot.title}
          </h6>
        </TooltipEl>
      ) : null}
    </div>
  );
}
