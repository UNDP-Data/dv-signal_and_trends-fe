import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { SignalDataType } from '../Types';
import Background from '../assets/UNDP-hero-image.png';
import { STEEPVCOLOR } from '../Constants';
import Context from '../Context/Context';

import '../styles.css';
import { ChipEl } from './ChipEl';

interface Props {
  data: SignalDataType;
  isDraft?: boolean;
}

interface HeroImageProps {
  bgImage?: string;
}

const HeroImageEl = styled.div<HeroImageProps>`
  background: ${props =>
      props.bgImage ? `url(data:${props.bgImage})` : `url(${Background})`}
    no-repeat center;
  background-size: cover;
  width: 100%;
  height: 20rem;
`;

const CardEl = styled.div`
  flex-grow: 1;
  font-size: 1.4rem;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1rem;
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
  const { data, isDraft } = props;
  const { role, choices, updateCardsToPrint, cardsToPrint } =
    useContext(Context);
  return (
    <div
      className='signal-trend-card'
      style={{
        color: 'var(--black)',
        textDecoration: 'none',
        flexGrow: 1,
        flexBasis: '26.25rem',
        backgroundColor: 'var(--gray-300)',
        alignItems: 'stretch',
        display: 'flex',
      }}
    >
      <CardEl>
        <div>
          <HeroImageEl bgImage={data.attachment}>
            {role === 'Admin' || role === 'Curator' ? (
              <div
                className={`undp-chip margin-bottom-05 ${
                  data.status === 'Approved'
                    ? 'undp-chip-green'
                    : data.status === 'New'
                    ? 'undp-chip-yellow'
                    : 'undp-chip-red'
                }`}
                style={{
                  borderRadius: '0 0.5rem 0.5rem 0',
                  marginTop: '1.5rem',
                }}
              >
                {data.status === 'New' ? 'Awaiting Approval' : data.status}
              </div>
            ) : null}
          </HeroImageEl>
          <div style={{ padding: '1rem 1rem 0 1rem' }}>
            <ChipEl
              text={data.steep ? data.steep?.split(' – ')[0] : 'No tags'}
              circleColor={
                data.steep
                  ? !choices
                    ? 'var(--black)'
                    : STEEPVCOLOR[
                        choices?.steepv.findIndex(el => el === data.steep)
                      ].textColor
                  : 'var(--gray-600)'
              }
            />
            <p className='bold undp-typography margin-top-05 margin-bottom-03'>
              {data.headline}{' '}
              <span
                style={{
                  fontSize: '1rem',
                  color: 'var(--gray-600)',
                  fontWeight: 'normal',
                }}
              >
                (ID: {data.id})
              </span>
            </p>
            <DescriptionEl className='undp-typography small-font margin-bottom-04'>
              {data.description}
            </DescriptionEl>
            <p className='small-font undp-typography bold margin-bottom-03 margin-top-03'>
              Keywords
            </p>
            <div className='flex-div flex-wrap margin-bottom-07'>
              {data.keywords?.map((el, j) =>
                el !== '' ? (
                  <div className='undp-chip' key={`chip-${j}`}>
                    {el}
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>
        <div>
          <div
            className='flex-div'
            style={{
              justifyContent: 'space-between',
              padding: '1rem 1rem 0 1rem',
            }}
          >
            <NavLink
              to={
                isDraft
                  ? `/signals/${data.id}/edit`
                  : data.status === 'Archived'
                  ? `/archived-signals/${data.id}`
                  : `/signals/${data.id}`
              }
              style={{
                textDecoration: 'none',
              }}
            >
              <button
                className='undp-button button-tertiary button-arrow'
                type='button'
              >
                Read More
              </button>
            </NavLink>
            <button
              className='undp-button button-tertiary button-arrow'
              type='button'
              onClick={e => {
                e.stopPropagation();
                const cardToPrintTemp = [...cardsToPrint];
                cardToPrintTemp.push({
                  type: 'signal',
                  id: `${data.id}`,
                });
                updateCardsToPrint(cardToPrintTemp);
              }}
            >
              Add to print
            </button>
          </div>
        </div>
      </CardEl>
    </div>
  );
}
