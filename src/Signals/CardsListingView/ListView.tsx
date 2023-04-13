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
          style={{ width: '20%', minWidth: '30rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          Description
        </div>
        <div
          style={{ width: '15%', minWidth: '10rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          Keywords
        </div>
        <div
          style={{ width: '10%', minWidth: '10rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          STEEPV
        </div>
        <div
          style={{ width: '10%', minWidth: '10rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          Signature solutions
        </div>
        <div
          style={{ width: '15%', minWidth: '10rem' }}
          className='undp-table-head-cell undp-sticky-head-column'
        >
          SDG
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
            style={{ width: '20%', minWidth: '30rem' }}
            className='undp-table-row-cell'
          >
            <DescriptionEl>{d.description}</DescriptionEl>
          </div>
          <div
            style={{ width: '15%', minWidth: '10rem' }}
            className='undp-table-row-cell'
          >
            <div className='flex-div flex-wrap'>
              {d.keywords?.map((el, j) => (
                <div className='undp-chip' key={`chip-${j}`}>
                  {el}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ width: '10%', minWidth: '10rem' }}
            className='undp-table-row-cell'
          >
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
          </div>
          <div
            style={{ width: '10%', minWidth: '10rem' }}
            className='undp-table-row-cell'
          >
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
          </div>
          <div
            style={{ width: '15%', minWidth: '10rem' }}
            className='undp-table-row-cell'
          >
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
          </div>
        </TableRowEl>
      ))}
    </div>
  );
}
