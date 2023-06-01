import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SDGCOLOR, SSCOLOR, STEEPVCOLOR } from '../../Constants';
import { SignalDataType } from '../../Types';

interface Props {
  data: SignalDataType[];
}

const TableRowEl = styled.div`
  cursor: pointer;
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

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate().toString()}-${d.toLocaleString('en-US', {
    month: 'short',
  })}-${d.getFullYear().toString()}`;
}

export function ListView(props: Props) {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <div
      style={{ width: '100%', overflow: 'auto', maxHeight: '70vh' }}
      className='undp-scrollbar'
    >
      <div className='undp-table-head undp-table-head-sticky'>
        <div
          style={{ width: '25%', minWidth: '20rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Signal</CellDiv>
        </div>
        <div
          style={{ width: '15%', minWidth: '15rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Keywords</CellDiv>
        </div>
        <div
          style={{ width: '15%', minWidth: '10rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>STEEP+V</CellDiv>
        </div>
        <div
          style={{ width: '15%', minWidth: '12rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Signature solutions</CellDiv>
        </div>
        <div
          style={{ width: '15%', minWidth: '15rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>SDG</CellDiv>
        </div>
        <div
          style={{ width: '10%', minWidth: '6rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Date created</CellDiv>
        </div>
        <div
          style={{ width: '5%', minWidth: '3rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>ID</CellDiv>
        </div>
      </div>
      {data.map((d, i) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <TableRowEl
          className='undp-table-row'
          key={i}
          onClick={() => {
            // eslint-disable-next-line no-underscore-dangle
            navigate(
              d.status === 'Archived'
                ? `/archived-signals/${d.id}`
                : `/signals/${d.id}`,
            );
          }}
        >
          <div
            style={{ width: '25%', minWidth: '20rem' }}
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
            style={{ width: '15%', minWidth: '15rem' }}
            className='undp-table-row-cell'
          >
            <CellDiv>
              <div className='flex-div flex-wrap'>
                {d.keywords?.map((el, j) =>
                  el !== '' ? (
                    <div className='undp-chip' key={`chip-${j}`}>
                      {el}
                    </div>
                  ) : null,
                )}
              </div>
            </CellDiv>
          </div>
          <div
            style={{ width: '15%', minWidth: '10rem' }}
            className='undp-table-row-cell'
          >
            {d.steep ? (
              <CellDiv>
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
              </CellDiv>
            ) : null}
          </div>
          <div
            style={{ width: '15%', minWidth: '12rem' }}
            className='undp-table-row-cell'
          >
            <CellDiv>
              <div className='flex-div flex-wrap'>
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
                {d.signature_secondary !== '' &&
                d.signature_secondary &&
                d.signature_secondary !== d.signature_primary ? (
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
            </CellDiv>
          </div>
          <div
            style={{ width: '15%', minWidth: '15rem' }}
            className='undp-table-row-cell'
          >
            <CellDiv>
              <div className='flex-div flex-wrap'>
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
                ) : null}
              </div>
            </CellDiv>
          </div>
          <div
            style={{ width: '10%', minWidth: '6rem' }}
            className='undp-table-row-cell'
          >
            <CellDiv>
              <p className='small-font'>{formatDate(d.created_at)}</p>
            </CellDiv>
          </div>
          <div
            style={{ width: '5%', minWidth: '3rem' }}
            className='undp-table-row-cell'
          >
            <CellDiv>
              <p className='small-font'>{d.id}</p>
            </CellDiv>
          </div>
        </TableRowEl>
      ))}
    </div>
  );
}
