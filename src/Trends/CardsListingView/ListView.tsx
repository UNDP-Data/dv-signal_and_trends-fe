import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HORIZONVALUES } from '../../Constants';
import { TrendDataType } from '../../Types';

interface Props {
  data: TrendDataType[];
}

const TableRowEl = styled.div`
  cursor: pointer;
`;

export function ListView(props: Props) {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <div
      style={{ width: '100%', overflow: 'auto', maxHeight: '70vh' }}
      className='undp-scrollbar undp-table-head-sticky'
    >
      <div className='undp-table-head'>
        <div
          style={{ width: '20%', minWidth: '12.5rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          Title
        </div>
        <div
          style={{ width: '17.5%', minWidth: '30rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          Description
        </div>
        <div
          style={{ width: '10%', minWidth: '10rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          Time Horizon
        </div>
        <div
          style={{ width: '10%', minWidth: '10rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          Impact Rating
        </div>
        <div
          style={{ width: '17.5%', minWidth: '30rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          Impact Description
        </div>
      </div>
      {data.map((d, i) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <TableRowEl
          className='undp-table-row'
          key={i}
          onClick={() => {
            // eslint-disable-next-line no-underscore-dangle
            navigate(`/trends/${d._id}`);
          }}
        >
          <div
            style={{
              width: '20%',
              minWidth: '12.5rem',
              fontWeight: 'bold',
            }}
            className='undp-table-row-cell'
          >
            {d.headline}
          </div>
          <div
            style={{ width: '17.5%', minWidth: '30rem' }}
            className='undp-table-row-cell'
          >
            {d.description}
          </div>
          <div
            style={{ width: '10%', minWidth: '10rem' }}
            className='undp-table-row-cell'
          >
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
          <div
            style={{ width: '10%', minWidth: '10rem' }}
            className='undp-table-row-cell'
          >
            {d.impact_rating}
          </div>
          <div
            style={{ width: '17.5%', minWidth: '30rem' }}
            className='undp-table-row-cell'
          >
            {d.impact_description}
          </div>
        </TableRowEl>
      ))}
    </div>
  );
}
