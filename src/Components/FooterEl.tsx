import UNDPLogo from '../assets/logo.png';

export function Footer() {
  return (
    <div>
      <footer>
        <div className='undp-footer'>
          <div
            className='flex-div flex-space-between margin-bottom-07'
            style={{
              padding: '0 0.75rem var(--spacing-09) 0.75rem',
              borderBottom: '1px solid var(--white)',
            }}
          >
            <div
              className='flex-div flex-vert-align-center'
              style={{ margin: 0 }}
            >
              <a href='https://www.undp.org/' target='_blank' rel='noreferrer'>
                <img alt='undp logo' src={UNDPLogo} style={{ width: '72px' }} />
              </a>
              <h5 className='undp-typography margin-bottom-00'>
                United Nations Development Programme
                <br />
                Data Futures Platform
              </h5>
            </div>
            <div>
              <div className='margin-bottom-03 '>
                <a
                  className='undp-footer-link undp-footer-right-link'
                  href='mailto:data@undp.org'
                  target='_blank'
                  rel='noreferrer'
                >
                  Contact Us
                </a>
              </div>
              <div className='margin-bottom-03'>
                <a
                  className='undp-footer-link undp-footer-right-link'
                  href='https://data.undp.org/'
                  target='_blank'
                  rel='noreferrer'
                >
                  Data Futures Platform
                </a>
              </div>
            </div>
          </div>
          <div className='flex-div flex-space-between'>
            <p
              className='small-font undp-typography margin-top-05'
              style={{ padding: '0 0.75rem' }}
            >
              © 2023 United Nations Development Programme
            </p>
            <a
              href='https://www.undp.org/copyright-terms-use'
              target='_blank'
              rel='noreferrer'
            >
              <p
                className='small-font undp-typography margin-top-05'
                style={{
                  padding: '0 0.75rem',
                  color: 'var(--white)',
                  textDecoration: 'none',
                }}
              >
                Terms Of Use
              </p>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
