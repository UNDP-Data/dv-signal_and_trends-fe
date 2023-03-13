import { SignalDataType } from '../../Types';
import { SignalCard } from '../../Components/SignalCard';

interface Props {
  data: SignalDataType[];
}

export function CardList(props: Props) {
  const { data } = props;
  return (
    <>
      {data.map((d, i) => (
        <SignalCard data={d} key={i} />
      ))}
    </>
  );
}
