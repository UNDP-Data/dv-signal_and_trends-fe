import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HORIZONVALUES } from '../../Constants';
import { TrendDataType } from '../../Types';

interface Props {
  data: TrendDataType[];
}

const TableRowEl = styled.div`
  cursor: pointer;
  width: fit-content;
`;

const DescriptionEl = styled.div`
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
`;

const CellDiv = styled.div`
  padding: 0 2.5rem 0 0.75rem;
`;

export function ListView(props: Props) {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <div
      style={{ overflow: 'auto', maxHeight: '70vh' }}
      className='undp-scrollbar'
    >
      <div
        className='undp-table-head undp-table-head-sticky'
        style={{ minWidth: 'fit-content' }}
      >
        <div
          style={{ width: '37.5%', minWidth: '30rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Trends</CellDiv>
        </div>
        <div
          style={{ width: '15%', minWidth: '10rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Time Horizon</CellDiv>
        </div>
        <div
          style={{ width: '15%', minWidth: '10rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Impact Rating</CellDiv>
        </div>
        <div
          style={{ width: '32.5%', minWidth: '20rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Impact Description</CellDiv>
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
            style={{ width: '37.5%', minWidth: '30rem' }}
            className='undp-table-row-cell'
          >
            <CellDiv>
              <h6 className='undp-typography margin-bottom-02'>{d.headline}</h6>
              <DescriptionEl className='small-font'>
                {d.description}
              </DescriptionEl>
            </CellDiv>
          </div>
          <div
            style={{ width: '15%', minWidth: '10rem' }}
            className='undp-table-row-cell'
          >
            <CellDiv>
              <div
                className='undp-chip'
                style={{
                  color:
                    HORIZONVALUES.findIndex(
                      el => el.value === d.time_horizon,
                    ) === -1
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
            </CellDiv>
          </div>
          <div
            style={{ width: '15%', minWidth: '10rem' }}
            className='undp-table-row-cell'
          >
            <CellDiv>{d.impact_rating}</CellDiv>
          </div>
          <div
            style={{ width: '32.5%', minWidth: '20rem' }}
            className='undp-table-row-cell small-font'
          >
            <CellDiv>{d.impact_description}</CellDiv>
          </div>
        </TableRowEl>
      ))}
    </div>
  );
}
