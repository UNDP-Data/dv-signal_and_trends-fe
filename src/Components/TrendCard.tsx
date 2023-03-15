import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import UNDPColorModule from 'undp-viz-colors';
import { TrendDataType } from '../Types';
import { HORIZONVALUES } from '../Constants';

interface Props {
  data: TrendDataType;
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

export function TrendCard(props: Props) {
  const { data } = props;
  return (
    <NavLink
      // eslint-disable-next-line no-underscore-dangle
      to={`/trends/${data._id}`}
      style={{
        color: 'var(--black)',
        textDecoration: 'none',
        width: 'calc(33.33% - 0.67rem)',
        backgroundColor: 'var(--gray-100)',
        flexGrow: 1,
        flexBasis: '26.25rem',
      }}
    >
      <CardEl>
        <h5 className='bold undp-typography'>{data.headline}</h5>
        <DescriptionEl className='undp-typography small-font margin-bottom-05'>
          {data.description}
        </DescriptionEl>
        <div className='flex-div flex-wrap'>
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
        <div>
          <hr className='undp-style light margin-top-07 margin-bottom-07' />
          <h6 className='margin-bottom-00 margin-top-00'>Impact Rating</h6>
          <div className='margin-top-03'>
            <div
              className='undp-chip'
              style={{
                color: data.impact_rating < 3 ? 'var(--black)' : 'var(--white)',
                backgroundColor:
                  UNDPColorModule.sequentialColors.neutralColorsx05[
                    data.impact_rating - 1
                  ],
                fontWeight: 'bold',
              }}
            >
              {data.impact_rating}
            </div>
          </div>
        </div>
      </CardEl>
    </NavLink>
  );
}
