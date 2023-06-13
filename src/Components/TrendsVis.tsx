/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState, useContext } from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import {
  forceCollide,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from 'd3-force';
import { scaleSqrt, scaleOrdinal } from 'd3-scale';
import { max } from 'd3-array';
import axios, { AxiosResponse } from 'axios';
import Context from '../Context/Context';
import { VisTrendDataType, TrendDataType } from '../Types';
import { CHOICES, API_ACCESS_TOKEN } from '../Constants';

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
  const [error, setError] = useState<undefined | string>(undefined);
  const [maxSignals, setMaxSignals] = useState(0);
  const { choices, accessToken } = useContext(Context);
  const groupByImpact = (e: CheckboxChangeEvent) => {
    setShowGroups(e.target.checked);
  };

  const visHeight = 650;
  const colorScale = scaleOrdinal()
    .domain(choices?.horizons || CHOICES.horizons)
    .range(['#B5D5F5', '#4F95DD', '#1F5A95']);
  const sqrtScale = scaleSqrt().range([4, 8]);
  const xCenter = scaleOrdinal()
    .domain(choices?.horizons || CHOICES.horizons)
    .range([250, 750, 1250]);
  const yCenter = scaleOrdinal()
    .domain(choices?.ratings || CHOICES.ratings)
    .range([500, 300, 100]);

  useEffect(() => {
    setShowGroups(false);
    setTrendsList([]);
    setMaxSignals(0);
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
        setTrendsList(response.data.data);
        const maxConnected = max(response.data, (d: TrendDataType) =>
          d.connected_signals === undefined || d.connected_signals === null
            ? 0
            : d.connected_signals.length,
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setMaxSignals(maxConnected as any);
        sqrtScale.domain([0, maxSignals]);
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
    const simulation = forceSimulation(trendsList)
      .force('charge', forceManyBody().strength(5))
      .force(
        'x',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        forceX().x((d: any) => xCenter(d.time_horizon) as any),
      );
    if (showGroups) {
      simulation.force(
        'y',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        forceY().y((d: any) => yCenter(d.impact_rating) as any),
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
    simulation.alpha(0.5);
  }, [showGroups, trendsList]);
  return (
    <div>
      {choices ? (
        <>
          <div className='flex-div'>
            <div>
              <h6 className='undp-typography margin-bottom-02'>Impact</h6>
              <div className='legend-container'>
                <div
                  style={{
                    backgroundColor: `${colorScale(choices.ratings[0])}`,
                  }}
                  className='legend-circle'
                >
                  &nbsp;
                </div>
                <div className='legend-label'>
                  1: Notable but not significant
                </div>
                <div
                  style={{
                    backgroundColor: `${colorScale(choices.ratings[1])}`,
                  }}
                  className='legend-circle'
                >
                  &nbsp;
                </div>
                <div className='legend-label'>2: Moderate</div>
                <div
                  style={{
                    backgroundColor: `${colorScale(choices.ratings[2])}`,
                  }}
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
                    style={{
                      backgroundColor: '#CCC',
                      width: '8px',
                      height: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    &nbsp;
                  </div>
                  <div className='legend-label'>1 signal</div>
                  <div
                    style={{
                      backgroundColor: '#CCC',
                      width: '16px',
                      height: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    &nbsp;
                  </div>
                  <div className='legend-label'>{`${maxSignals} signals`}</div>
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
                      key={i}
                      r={sqrtScale(
                        d.connected_signals !== null
                          ? d.connected_signals.length
                          : 0,
                      )}
                      cx={d.x}
                      cy={d.y}
                      fill={colorScale(d.impact_rating) as string}
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
                  {choices.horizons.map((d, i) => (
                    <text
                      key={i}
                      x={xCenter(d) as number}
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
        </>
      ) : null}
    </div>
  );
}
