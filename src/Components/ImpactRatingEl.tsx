import styled from 'styled-components';

interface Props {
  impact: string;
  showText?: boolean;
}

interface ImpactCircleProps {
  fill: string;
}

const ImpactCircle = styled.div<ImpactCircleProps>`
  width: 1rem;
  height: 1rem;
  background-color: ${props => props.fill};
  border-radius: 1rem;
`;

export function ImpactCircleEl(props: Props) {
  const { impact, showText } = props;
  const color =
    parseInt(impact.split(' — ')[0], 10) === 1
      ? 'var(--blue-200)'
      : parseInt(impact.split(' — ')[0], 10) === 2
      ? 'var(--blue-500)'
      : 'var(--blue-700)';
  return (
    <div>
      <div className='flex-div gap-03 flex-vert-align-center'>
        {[0, 1, 2].map(d => (
          <ImpactCircle
            key={d - 1}
            fill={
              d < parseInt(impact.split(' — ')[0], 10)
                ? color
                : 'var(--gray-300)'
            }
          />
        ))}
      </div>
      {showText === false ? null : (
        <p
          className='undp-typography small-font italics margin-top-03'
          style={{ color: 'var(--gray-500)' }}
        >
          {impact.split(' — ')[1]}
        </p>
      )}
    </div>
  );
}
