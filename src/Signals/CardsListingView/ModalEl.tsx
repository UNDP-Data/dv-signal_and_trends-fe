import { Modal } from 'antd';
import { SignalDataType } from '../../Types';
import { MONTHS, SDGCOLOR, SSCOLOR, STEEPVCOLOR } from '../../Constants';

interface Props {
  data: SignalDataType;
  setMouseClickData: (_d: null) => void;
}

export function ModalEl(props: Props) {
  const { data, setMouseClickData } = props;
  return (
    <Modal
      className='undp-modal'
      open
      title={data.headline}
      onOk={() => {
        setMouseClickData(null);
      }}
      onCancel={() => {
        setMouseClickData(null);
      }}
      width={960}
    >
      <div className='flex-div flex-wrap margin-bottom-07'>
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
          <div className='undp-chip' key={j}>
            {el}
          </div>
        ))}
      </div>
      <p className='undp-typography'>{data.description}</p>
      <hr className='undp-style light margin-top-07 margin-bottom-07' />
      <h6 className='undp-typography margin-bottom-00 margin-top-00'>
        Signature Solutions
      </h6>
      <div className='flex-div flex-wrap margin-top-03'>
        {data.signature_primary !== '' && data.signature_primary ? (
          <div
            className='undp-chip'
            style={{
              color:
                SSCOLOR.findIndex(el => el.value === data.signature_primary) !==
                -1
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
      <h6 className='undp-typography margin-bottom-00 margin-top-00'>SDGs</h6>
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
      <hr className='undp-style light margin-top-07 margin-bottom-07' />
      <h6 className='undp-typography margin-top-00 margin-bottom-00'>
        Relevance
      </h6>
      <p className='undp-typography margin-top-05'>{data.relevance}</p>
      <hr className='undp-style light margin-top-07 margin-bottom-07' />
      <h6 className='undp-typography margin-top-00 margin-bottom-00'>Source</h6>
      <a
        href={data.url}
        target='_blank'
        rel='noreferrer'
        className='undp-style'
      >
        {data.url}
      </a>
      <hr className='undp-style light margin-top-07 margin-bottom-07' />
      <h6 className='undp-typography margin-top-00 margin-bottom-00'>
        Created by
      </h6>
      <p className='undp-typography margin-top-05'>
        {`${data.created_by.name} on ${new Date(data.created_at).getDate()}-${
          MONTHS[new Date(data.created_at).getMonth()]
        }-${new Date(data.created_at).getFullYear()}`}
      </p>
    </Modal>
  );
}
