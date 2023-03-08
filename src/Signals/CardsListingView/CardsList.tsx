/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { useState } from 'react';
import { SignalDataType } from '../../Types';
import { SDGCOLOR, SSCOLOR, STEEPVCOLOR } from '../../Constants';
import { ModalEl } from './ModalEl';

interface Props {
  data: SignalDataType[];
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
  const [mouseClickData, setMouseClickData] = useState<SignalDataType | null>(
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
            {d.steep ? (
              <div
                className='undp-chip'
                style={{
                  color:
                    STEEPVCOLOR.findIndex(
                      el => el.value === d.steep?.split(' – ')[0],
                    ) === -1
                      ? 'var(--black)'
                      : STEEPVCOLOR[
                          STEEPVCOLOR.findIndex(
                            el => el.value === d.steep?.split(' – ')[0],
                          )
                        ].textColor,
                  fontWeight: 'bold',
                }}
              >
                {d.steep?.split(' – ')[0]}
              </div>
            ) : null}
            {d.keywords?.map((el, j) => (
              <div className='undp-chip' key={`chip-${j}`}>
                {el}
              </div>
            ))}
          </div>
          <div>
            <hr className='undp-style light margin-top-07 margin-bottom-07' />
            <h6 className='margin-bottom-00 margin-top-00'>
              Signature Solutions
            </h6>
            <div className='flex-div flex-wrap margin-top-03'>
              {d.signature_primary !== '' && d.signature_primary ? (
                <div
                  className='undp-chip'
                  style={{
                    color:
                      SSCOLOR.findIndex(
                        el => el.value === d.signature_primary,
                      ) !== -1
                        ? SSCOLOR[
                            SSCOLOR.findIndex(
                              el => el.value === d.signature_primary,
                            )
                          ].textColor
                        : 'var(--black)',
                    fontWeight: 'bold',
                  }}
                >
                  {d.signature_primary}
                </div>
              ) : null}
              {d.signature_secondary !== '' && d.signature_secondary ? (
                <div
                  className='undp-chip'
                  style={{
                    color:
                      SSCOLOR.findIndex(
                        el => el.value === d.signature_secondary,
                      ) !== -1
                        ? SSCOLOR[
                            SSCOLOR.findIndex(
                              el => el.value === d.signature_secondary,
                            )
                          ].textColor
                        : 'var(--black)',
                    fontWeight: 'bold',
                  }}
                >
                  {d.signature_secondary}
                </div>
              ) : null}
            </div>
            <hr className='undp-style light margin-top-07 margin-bottom-07' />
            <h6 className='margin-bottom-00 margin-top-00'>SDGs</h6>
            <div className='flex-div flex-wrap margin-top-03'>
              {d.sdgs ? (
                <>
                  {d.sdgs.map((sdg, j) => (
                    <div
                      key={j}
                      className='undp-chip'
                      style={{
                        color:
                          SDGCOLOR[SDGCOLOR.findIndex(el => el.value === sdg)]
                            .textColor,
                        fontWeight: 'bold',
                      }}
                    >
                      {sdg}
                    </div>
                  ))}
                </>
              ) : (
                'NA'
              )}
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
