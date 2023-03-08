/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { useState } from 'react';
import UNDPColorModule from 'undp-viz-colors';
import { TrendDataType } from '../../Types';
import { HORIZONVALUES } from '../../Constants';
import { ModalEl } from './ModalEl';

interface Props {
  data: TrendDataType[];
}

const CardEl = styled.div`
  border-radius: 0.4rem;
  width: calc(33.33% - 4.67rem);
  flex-grow: 1;
  font-size: 1.4rem;
  padding: 2rem;
  background-color: var(--gray-100);
  word-wrap: break-word;
  cursor: pointer;
`;

const DescriptionEl = styled.p`
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
`;

export function CardList(props: Props) {
  const { data } = props;
  const [mouseClickData, setMouseClickData] = useState<TrendDataType | null>(
    null,
  );
  return (
    <>
      {data.map((d, i) => (
        <CardEl
          onClick={() => {
            setMouseClickData(d);
          }}
          key={i}
        >
          <h5 className='bold undp-typography'>{d.headline}</h5>
          <DescriptionEl className='undp-typography small-font margin-bottom-05'>
            {d.description}
          </DescriptionEl>
          <div className='flex-div flex-wrap'>
            <div
              className='undp-chip'
              style={{
                color:
                  HORIZONVALUES.findIndex(el => el.value === d.time_horizon) ===
                  -1
                    ? 'var(--black)'
                    : HORIZONVALUES[
                        HORIZONVALUES.findIndex(
                          el => el.value === d.time_horizon,
                        )
                      ].textColor,
                fontWeight: 'bold',
              }}
            >
              {d.time_horizon}
            </div>
          </div>
          <div>
            <hr className='undp-style light margin-top-07 margin-bottom-07' />
            <h6 className='margin-bottom-00 margin-top-00'>Impact Rating</h6>
            <div className='margin-top-03'>
              <div
                className='undp-chip'
                style={{
                  color: d.impact_rating < 3 ? 'var(--black)' : 'var(--white)',
                  backgroundColor:
                    UNDPColorModule.sequentialColors.neutralColorsx05[
                      d.impact_rating - 1
                    ],
                  fontWeight: 'bold',
                }}
              >
                {d.impact_rating}
              </div>
            </div>
          </div>
        </CardEl>
      ))}
      {mouseClickData ? (
        <ModalEl data={mouseClickData} setMouseClickData={setMouseClickData} />
      ) : null}
    </>
  );
}
