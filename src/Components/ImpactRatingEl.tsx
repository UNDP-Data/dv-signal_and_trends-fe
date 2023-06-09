import styled from 'styled-components';

interface Props {
  impact: string;
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
  const { impact } = props;
  return (
    <div className='flex-div gap-03 flex-vert-align-center'>
      {[0, 1, 2, 3, 4].map(d => (
        <ImpactCircle
          key={d - 1}
          fill={
            d < parseInt(impact, 10) ? 'var(--blue-600)' : 'var(--gray-300)'
          }
        />
      ))}
    </div>
  );
}
