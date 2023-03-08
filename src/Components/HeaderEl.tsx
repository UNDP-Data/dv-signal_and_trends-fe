import { useState } from 'react';
import { Modal, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import { SignalEntryFormEl } from './SignalEntryFormEl';
import { TrendEntryFormEl } from './TrendEntryFormEl';

export function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [addNewType, setAddNewType] = useState<'Signal' | 'Trends'>('Signal');
  return (
    <div>
      <header className='undp-country-header'>
        <div className='undp-header-bg flex-space-between flex-div flex-vert-align-center'>
          <div className='flex-div flex-vert-align-center'>
            <img
              src='https://design.undp.org/static/media/undp-logo-blue.4f32e17f.svg'
              alt='UNDP Logo'
              width='60'
              height='122'
            />
            <div className='undp-site-title'>
              <span style={{ marginBottom: 'var(--spacing-04)' }}>
                <a
                  href='https://data.undp.org/'
                  target='_blank'
                  rel='noreferrer'
                >
                  Data Futures Platform
                </a>
              </span>
              <br />
              <NavLink
                to='./'
                style={{
                  textDecoration: 'none',
                  color: 'var(--black)',
                }}
              >
                Signal and Trends
              </NavLink>
            </div>
          </div>
          <div className='undp-nav-div'>
            <NavLink
              to='./signals'
              className={({ isActive }) =>
                isActive ? 'header-link-active' : 'header-link'
              }
            >
              All Signals
            </NavLink>
            <NavLink
              to='./trends'
              className={({ isActive }) =>
                isActive ? 'header-link-active' : 'header-link'
              }
            >
              All Trends
            </NavLink>
          </div>
          <button
            className='undp-button button-primary button-arrow'
            style={{
              justifyContent: 'flex-end',
              textAlign: 'right',
            }}
            onClick={() => {
              setOpenModal(true);
            }}
            type='button'
          >
            Add A New
          </button>
        </div>
      </header>{' '}
      <Modal
        className='undp-modal'
        onCancel={() => {
          setOpenModal(false);
        }}
        onOk={() => {
          setOpenModal(false);
        }}
        title='Add A New'
        open={openModal}
      >
        <div className='flex-wrap margin-bottom-03'>
          <Radio.Group
            value={addNewType}
            onChange={e => {
              setAddNewType(e.target.value);
            }}
          >
            <Radio className='undp-radio' value='Signal'>
              Signal
            </Radio>
            <Radio className='undp-radio' value='Trends'>
              Trend
            </Radio>
          </Radio.Group>
          <hr className='undp-style margin-top-07 margin-bottom-07' />
          {addNewType === 'Signal' ? (
            <SignalEntryFormEl setOpenModal={setOpenModal} />
          ) : (
            <TrendEntryFormEl setOpenModal={setOpenModal} />
          )}
        </div>
      </Modal>
    </div>
  );
}
