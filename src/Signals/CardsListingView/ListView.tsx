import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SDGCOLOR, SSCOLOR, STEEPVCOLOR } from '../../Constants';
import { SignalDataType } from '../../Types';

interface Props {
  data: SignalDataType[];
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
      style={{ width: '100%', overflow: 'auto', maxHeight: '70vh' }}
      className='undp-scrollbar'
    >
      <div
        className='undp-table-head undp-table-head-sticky'
        style={{ minWidth: 'fit-content' }}
      >
        <div
          style={{ minWidth: '40%', width: '30rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Signal</CellDiv>
        </div>
        <div
          style={{ minWidth: '20%', width: '20rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Keywords</CellDiv>
        </div>
        <div
          style={{ minWidth: '10%', width: '10rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>STEEPV</CellDiv>
        </div>
        <div
          style={{ minWidth: '20%', width: '20rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>Signature solutions</CellDiv>
        </div>
        <div
          style={{ minWidth: '20%', width: '20rem' }}
          className='undp-table-head-cell'
        >
          <CellDiv>SDG</CellDiv>
        </div>
      </div>
      {data.map((d, i) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <TableRowEl
          className='undp-table-row'
          key={i}
          onClick={() => {
            // eslint-disable-next-line no-underscore-dangle
            navigate(`/signals/${d.id}`);
          }}
          style={{ width: 'fit-content' }}
        >
          <div
            style={{ minWidth: '40%', width: '30rem' }}
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
            style={{ minWidth: '20%', width: '20rem' }}
            className='undp-table-row-cell'
          >
            <CellDiv>
              <div className='flex-div flex-wrap'>
                {d.keywords?.map((el, j) => (
                  <div className='undp-chip' key={`chip-${j}`}>
                    {el}
                  </div>
                ))}
              </div>
            </CellDiv>
          </div>
          <div
            style={{ minWidth: '10%', width: '10rem' }}
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
            style={{ minWidth: '20%', width: '20rem' }}
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
            style={{ minWidth: '20%', width: '20rem' }}
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
        </TableRowEl>
      ))}
    </div>
  );
}
