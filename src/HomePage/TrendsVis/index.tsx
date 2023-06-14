import { useEffect, useState, useContext, useRef } from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import Context from '../../Context/Context';
import { Viz } from './Viz';

const LegendCircleEl = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9px;
  margin: 0;
`;

export function TrendsVis() {
  const { choices } = useContext(Context);
  const [showGroups, setShowGroups] = useState(true);

  const [svgWidth, setSvgWidth] = useState(0);

  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgWidth(
        graphDiv.current.clientWidth < 800 ? 800 : graphDiv.current.clientWidth,
      );
    }
  }, [graphDiv?.current]);
  return (
    <div>
      {choices ? (
        <div
          className='margin-top-13'
          style={{
            margin: '0 -1rem',
            backgroundColor: 'var(--gray-200)',
            padding: 'var(--spacing-13) var(--spacing-07)',
          }}
        >
          <div className='max-width'>
            <h2 className='undp-typography' style={{ textAlign: 'center' }}>
              Trends Visualized
            </h2>
            <div
              className='flex-div flex-space-between flex-wrap margin-top-13 margin-bottom-07'
              style={{ alignItems: 'flex-end' }}
            >
              <div>
                <h6 className='undp-typography'>Impact</h6>
                <div className='flex-div'>
                  <div className='flex-div gap-02 flex-vert-align-center'>
                    <LegendCircleEl
                      style={{
                        backgroundColor: 'var(--blue-200)',
                      }}
                    />
                    <p
                      className='margin-top-00 margin-bottom-00'
                      style={{ fontSize: '1rem' }}
                    >
                      1: Notable but not significant
                    </p>
                  </div>
                  <div className='flex-div gap-02 flex-vert-align-center'>
                    <LegendCircleEl
                      style={{
                        backgroundColor: 'var(--blue-500)',
                      }}
                    />
                    <p
                      className='margin-top-00 margin-bottom-00'
                      style={{ fontSize: '1rem' }}
                    >
                      2: Moderate
                    </p>
                  </div>
                  <div className='flex-div gap-02 flex-vert-align-center'>
                    <LegendCircleEl
                      style={{
                        backgroundColor: 'var(--blue-700)',
                      }}
                    />
                    <p
                      className='margin-top-00 margin-bottom-00'
                      style={{ fontSize: '1rem' }}
                    >
                      3: Significant
                    </p>
                  </div>
                </div>
              </div>
              <Checkbox
                className='undp-checkbox'
                onChange={e => {
                  setShowGroups(e.target.checked);
                }}
                checked={showGroups}
              >
                <div className='label'>Group Trends by Impact</div>
              </Checkbox>
            </div>
            <div
              style={{
                flexGrow: 1,
                width: '100%',
                backgroundColor: 'var(--white)',
                maxWidth: '100rem',
              }}
              ref={graphDiv}
            >
              {svgWidth ? (
                <Viz
                  svgWidth={svgWidth}
                  svgHeight={(svgWidth * 9) / 16}
                  showGroups={showGroups}
                />
              ) : (
                <div className='undp-loader-container'>
                  <div className='undp-loader' />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
