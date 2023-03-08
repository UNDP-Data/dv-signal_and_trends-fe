import { Modal } from 'antd';
import { TrendDataType } from '../../Types';
import { HORIZONVALUES, MONTHS } from '../../Constants';

interface Props {
  data: TrendDataType;
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
        <div
          className='undp-chip'
          style={{
            color:
              HORIZONVALUES.findIndex(el => el.value === data.time_horizon) ===
              -1
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
      <p className='undp-typography'>{data.description}</p>
      <hr className='undp-style light margin-top-07 margin-bottom-07' />
      <h6 className='undp-typography margin-bottom-00 margin-top-00'>Impact</h6>
      <div className='flex-div flex-wrap margin-top-03'>
        <p>
          <span className='bold'>Impact Rating: {data.impact_rating}</span>
          <br />
          <br />
          {data.impact_description}
        </p>
      </div>
      <hr className='undp-style light margin-top-07 margin-bottom-07' />
      <h6 className='undp-typography margin-top-00 margin-bottom-00'>
        Created On
      </h6>
      <p className='undp-typography margin-top-05'>
        {`${new Date(data.created_at).getDate()}-${
          MONTHS[new Date(data.created_at).getMonth()]
        }-${new Date(data.created_at).getFullYear()}`}
      </p>
    </Modal>
  );
}
