import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';

export function Header() {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <NavLink to='/add-new-signal'>Signal</NavLink>,
    },
    {
      key: '2',
      label: <NavLink to='/add-new-trend'>Trend</NavLink>,
    },
  ];
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
          <Dropdown
            menu={{ items }}
            placement='bottomRight'
            className='undp-button-dropdown'
            overlayClassName='undp-dropdown-menu'
          >
            <div>Add A New</div>
          </Dropdown>
        </div>
      </header>
    </div>
  );
}
