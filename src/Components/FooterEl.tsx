import styled from 'styled-components';
import UNDPLogo from '../assets/logo.png';

const FooterP = styled.p`
  padding: 0 0.75rem;
  color: var(--white);
  text-decoration: none;
  font-size: 1rem !important;
  &:hover {
    opacity: 0.7;
  }
`;

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
                United Nations
                <br />
                Development Programme
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
                  Data Futures Exchange
                </a>
              </div>
            </div>
          </div>
          <div className='flex-div flex-space-between'>
            <div>
              <p
                className='undp-typography margin-top-05 margin-bottom-00'
                style={{ padding: '0 0.75rem', fontSize: '1rem' }}
              >
                © 2023 United Nations Development Programme
              </p>
              <p
                className='undp-typography margin-top-03 margin-bottom-00'
                style={{
                  padding: '0 0.75rem',
                  fontSize: '1rem',
                }}
              >
                Disclaimer: Signals and trends are individuals&apos;
                observations and do not represent the official views of UNDP
              </p>
            </div>
            <a
              href='https://www.undp.org/copyright-terms-use'
              target='_blank'
              rel='noreferrer'
              style={{ textDecoration: 'none' }}
            >
              <FooterP className='undp-typography margin-top-05'>
                Terms Of Use
              </FooterP>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
