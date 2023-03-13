import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { SignalDataType } from '../Types';
import { SDGCOLOR, SSCOLOR, STEEPVCOLOR } from '../Constants';

interface Props {
  data: SignalDataType;
}

const CardEl = styled.div`
  border-radius: 0.4rem;
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

export function SignalCard(props: Props) {
  const { data } = props;
  return (
    <NavLink
      // eslint-disable-next-line no-underscore-dangle
      to={`/signals/${data._id}`}
      style={{
        color: 'var(--black)',
        textDecoration: 'none',
        width: 'calc(33.33% - 0.67rem)',
        backgroundColor: 'var(--gray-100)',
      }}
    >
      <CardEl>
        <h5 className='bold undp-typography'>{data.headline}</h5>
        <DescriptionEl className='undp-typography small-font margin-bottom-05'>
          {data.description}
        </DescriptionEl>
        <div className='flex-div flex-wrap'>
          {data.steep ? (
            <div
              className='undp-chip'
              style={{
                color:
                  STEEPVCOLOR.findIndex(
                    el => el.value === data.steep?.split(' – ')[0],
                  ) === -1
                    ? 'var(--black)'
                    : STEEPVCOLOR[
                        STEEPVCOLOR.findIndex(
                          el => el.value === data.steep?.split(' – ')[0],
                        )
                      ].textColor,
                fontWeight: 'bold',
              }}
            >
              {data.steep?.split(' – ')[0]}
            </div>
          ) : null}
          {data.keywords?.map((el, j) => (
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
            {data.signature_primary !== '' && data.signature_primary ? (
              <div
                className='undp-chip'
                style={{
                  color:
                    SSCOLOR.findIndex(
                      el => el.value === data.signature_primary,
                    ) !== -1
                      ? SSCOLOR[
                          SSCOLOR.findIndex(
                            el => el.value === data.signature_primary,
                          )
                        ].textColor
                      : 'var(--black)',
                  fontWeight: 'bold',
                }}
              >
                {data.signature_primary}
              </div>
            ) : null}
            {data.signature_secondary !== '' && data.signature_secondary ? (
              <div
                className='undp-chip'
                style={{
                  color:
                    SSCOLOR.findIndex(
                      el => el.value === data.signature_secondary,
                    ) !== -1
                      ? SSCOLOR[
                          SSCOLOR.findIndex(
                            el => el.value === data.signature_secondary,
                          )
                        ].textColor
                      : 'var(--black)',
                  fontWeight: 'bold',
                }}
              >
                {data.signature_secondary}
              </div>
            ) : null}
          </div>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='margin-bottom-00 margin-top-00'>SDGs</h6>
          <div className='flex-div flex-wrap margin-top-03'>
            {data.sdgs ? (
              <>
                {data.sdgs.map((sdg, j) => (
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
    </NavLink>
  );
}
