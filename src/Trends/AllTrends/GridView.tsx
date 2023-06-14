import { TrendDataType } from '../../Types';
import { TrendCard } from '../../Components/TrendCard';

interface Props {
  data: TrendDataType[];
}

export function CardList(props: Props) {
  const { data } = props;
  return (
    <>
      {data.map((d, i) => (
        <TrendCard key={i} data={d} />
      ))}
    </>
  );
}
