import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import UNDPColorModule from 'undp-viz-colors';
import { useContext } from 'react';
import { TrendDataType } from '../Types';
import Background from '../assets/UNDP-hero-image.png';
import { HORIZONVALUES } from '../Constants';
import Context from '../Context/Context';

import '../styles.css';

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
  width: 100%;
  height: 20rem;
`;

const CardEl = styled.div`
  flex-grow: 1;
  font-size: 1.4rem;
  word-wrap: break-word;
  cursor: pointer;
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
  padding: 0 1.5rem;
`;

export function TrendCard(props: Props) {
  const { data } = props;
  const { role } = useContext(Context);
  return (
    <NavLink
      className='signal-trend-card'
      to={
        data.status === 'Archived'
          ? `/archived-trends/${data.id}`
          : `/trends/${data.id}`
      }
      style={{
        color: 'var(--black)',
        textDecoration: 'none',
        flexGrow: 1,
        flexBasis: '26.25rem',
        backgroundColor: 'var(--gray-200)',
        border: '1px solid var(--gray-400)',
        borderRadius: '0.5rem',
        alignItems: 'stretch',
        display: 'flex',
      }}
    >
      <CardEl>
        <div>
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
          <h5
            className='bold undp-typography'
            style={{ padding: '2rem 1.5rem 0 1.5rem' }}
          >
            {data.headline}
          </h5>
          <DescriptionEl className='undp-typography small-font margin-bottom-05'>
            {data.description}
          </DescriptionEl>
          {data.time_horizon ? (
            <div className='flex-div flex-wrap' style={{ padding: '0 1.5rem' }}>
              <div
                className='undp-chip'
                style={{
                  color:
                    HORIZONVALUES.findIndex(
                      el => el.value === data.time_horizon,
                    ) === -1
                      ? 'var(--black)'
                      : HORIZONVALUES[
                          HORIZONVALUES.findIndex(
                            el => el.value === data.time_horizon,
                          )
                        ].textColor,
                  fontWeight: 'bold',
                }}
              >
                {data.time_horizon}
              </div>
            </div>
          ) : null}
        </div>
        <div style={{ padding: '0 1.5rem 2rem 1.5rem' }}>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='margin-bottom-00 margin-top-00'>Impact Rating</h6>
          <div className='margin-top-03'>
            {data.impact_rating ? (
              <div
                className='undp-chip'
                style={{
                  color:
                    data.impact_rating < 3 ? 'var(--black)' : 'var(--white)',
                  backgroundColor:
                    UNDPColorModule.sequentialColors.neutralColorsx05[
                      data.impact_rating - 1
                    ],
                  fontWeight: 'bold',
                }}
              >
                {data.impact_rating}
              </div>
            ) : (
              <div
                className='undp-chip'
                style={{
                  color: 'var(--black)',
                  backgroundColor: 'var(--gray-300)',
                  fontWeight: 'bold',
                }}
              >
                Not available
              </div>
            )}
          </div>
        </div>
      </CardEl>
    </NavLink>
  );
}
