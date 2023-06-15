import styled from 'styled-components';
import Background from '../assets/UNDP-hero-image.jpg';
import { SignInButton } from '../Components/SignInButton';

const HeroImageEl = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url(${Background}) no-repeat center;
  background-size: cover;
  margin-top: 7.1875rem;
`;

export function SignedOutHomePage() {
  return (
    <>
      <HeroImageEl className='undp-hero-image'>
        <div className='max-width'>
          <h1 className='undp-typography'>
            UNDP Future Trends and Signals System
          </h1>
          <h5 className='undp-typography'>
            The Future Trends and Signals System captures signals of change
            noticed across UNDP, and identifies the trends emerging – helping us
            all make stronger, more future-aware decisions.
          </h5>
        </div>
      </HeroImageEl>
      <div
        className='margin-top-08 margin-bottom-05'
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        <h2 className='undp-typography'>
          Sign In with your UNDP account to see the page
        </h2>
        <SignInButton />
      </div>
    </>
  );
}
