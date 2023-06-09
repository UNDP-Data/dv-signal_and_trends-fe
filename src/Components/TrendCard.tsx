import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { TrendDataType } from '../Types';
import Background from '../assets/UNDP-hero-image.png';
import { HORIZONVALUES } from '../Constants';
import Context from '../Context/Context';

import '../styles.css';
import { ChipEl } from './ChipEl';
import { ImpactCircleEl } from './ImpactRatingEl';

interface Props {
  data: TrendDataType;
}
interface HeroImageProps {
  bgImage?: string;
}

const HeroImageEl = styled.div<HeroImageProps>`
  background: ${props =>
      props.bgImage ? `url(data:${props.bgImage})` : `url(${Background})`}
    no-repeat center;
  background-size: cover;
  width: 33.33%;
  height: 0;
  padding-bottom: 45%;
`;

const CardEl = styled.div`
  flex-grow: 1;
  font-size: 1.4rem;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DescriptionEl = styled.p`
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
`;

export function TrendCard(props: Props) {
  const { data } = props;
  const { role, choices, cardsToPrint, updateCardsToPrint } =
    useContext(Context);
  return (
    <div className='trend-card'>
      <CardEl>
        <div
          className='flex-div'
          style={{ alignItems: 'stretch', flexGrow: 1 }}
        >
          <HeroImageEl bgImage={data.attachment}>
            {role === 'Admin' || role === 'Curator' ? (
              <div
                className={`undp-chip margin-bottom-07 ${
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
          <div
            style={{
              padding: '0 0 1rem 0',
              width: 'calc(66.667% - 2rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
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
            </div>
            <div>
              <div className='flex-div margin-bottom-03 gap-05 flex-wrap'>
                {data.time_horizon ? (
                  <div>
                    <p className='bold small-font undp-typography margin-bottom-02'>
                      Time Horizon
                    </p>
                    <ChipEl
                      text={data.time_horizon}
                      circleColor={
                        !choices
                          ? 'var(--black)'
                          : HORIZONVALUES[
                              choices?.horizons.findIndex(
                                el => el === data.time_horizon,
                              )
                            ].textColor
                      }
                    />
                  </div>
                ) : null}
                {data.impact_rating ? (
                  <div>
                    <p className='bold small-font undp-typography margin-bottom-04'>
                      Impact Rating
                    </p>
                    <ImpactCircleEl impact={data.impact_rating} />
                  </div>
                ) : null}
              </div>
              <div
                className='flex-div'
                style={{
                  justifyContent: 'space-between',
                  padding: '0 1.5rem 0 0',
                }}
              >
                <NavLink
                  to={
                    data.status === 'Archived'
                      ? `/archived-trends/${data.id}`
                      : `/trends/${data.id}`
                  }
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <button
                    className='undp-button button-tertiary button-arrow padding-bottom-00'
                    type='button'
                  >
                    Read More
                  </button>
                </NavLink>
                <button
                  className='undp-button button-tertiary button-arrow padding-bottom-00'
                  type='button'
                  onClick={e => {
                    e.stopPropagation();
                    const cardToPrintTemp = [...cardsToPrint];
                    cardToPrintTemp.push({
                      type: 'trend',
                      id: `${data.id}`,
                    });
                    updateCardsToPrint(cardToPrintTemp);
                  }}
                >
                  Add to print
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardEl>
    </div>
  );
}
