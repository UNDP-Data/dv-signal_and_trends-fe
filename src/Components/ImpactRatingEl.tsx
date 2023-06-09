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
  return (
    <div>
      <div className='flex-div gap-03 flex-vert-align-center'>
        {[0, 1, 2].map(d => (
          <ImpactCircle
            key={d - 1}
            fill={
              d < parseInt(impact.split(' — ')[0], 10)
                ? 'var(--blue-600)'
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
