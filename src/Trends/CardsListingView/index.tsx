import { useState } from 'react';
import { Pagination } from 'antd';
import { TrendDataType } from '../../Types';
import { ModalEl } from './ModalEl';
import { CardList } from './CardsList';

interface Props {
  data: TrendDataType[];
  filteredHorizons: string;
  filteredImpactRating: string;
  search?: string;
}

export function CardLayout(props: Props) {
  const { data, filteredHorizons, filteredImpactRating, search } = props;
  const [paginationValue, setPaginationValue] = useState(1);
  const [mouseClickData, setMouseClickData] = useState<TrendDataType | null>(
    null,
  );
  const DataFilterByHorizon =
    filteredHorizons === 'All Horizons'
      ? data
      : data.filter(d => d.time_horizon === filteredHorizons);
  const DataFilterByIR =
    filteredImpactRating === 'All Impact Ratings'
      ? DataFilterByHorizon
      : DataFilterByHorizon.filter(
          d => `${d.impact_rating}` === filteredImpactRating,
        );
  const DataFilteredBySearch = !search
    ? DataFilterByIR
    : DataFilterByIR.filter(d =>
        d.headline.toLowerCase().includes(search.toLowerCase()),
      );
  return (
    <>
      <div className='flex-div flex-wrap'>
        <CardList
          data={
            DataFilteredBySearch.length <= 9
              ? DataFilteredBySearch
              : DataFilteredBySearch.filter(
                  (_d, i) =>
                    i >= (paginationValue - 1) * 9 && i < paginationValue * 9,
                )
          }
        />
      </div>
      {DataFilteredBySearch.length <= 9 ? null : (
        <div className='flex-div flex-hor-align-center margin-top-07'>
          <Pagination
            className='undp-pagination'
            onChange={e => {
              setPaginationValue(e);
            }}
            defaultCurrent={1}
            total={data.length}
            pageSize={9}
          />
        </div>
      )}
      {mouseClickData ? (
        <ModalEl data={mouseClickData} setMouseClickData={setMouseClickData} />
      ) : null}
    </>
  );
}
