import { useState } from 'react';
import { Pagination } from 'antd';
import { TrendDataType } from '../../Types';
import { CardList } from './CardsList';
import { ListView } from './ListView';

interface Props {
  data: TrendDataType[];
  filteredHorizons: string;
  filteredImpactRating: string;
  search?: string;
  view: 'cardView' | 'listView';
}

export function CardLayout(props: Props) {
  const { data, filteredHorizons, filteredImpactRating, search, view } = props;
  const [paginationValue, setPaginationValue] = useState(1);
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
    <div style={{ padding: '0 1rem' }}>
      {view === 'cardView' ? (
        <>
          <div className='flex-div flex-wrap'>
            {DataFilteredBySearch.length > 0 ? (
              <CardList
                data={
                  DataFilteredBySearch.length <= 9
                    ? DataFilteredBySearch
                    : DataFilteredBySearch.filter(
                        (_d, i) =>
                          i >= (paginationValue - 1) * 9 &&
                          i < paginationValue * 9,
                      )
                }
              />
            ) : (
              <h5
                className='undp-typography bold'
                style={{
                  backgroundColor: 'var(--gray-200)',
                  textAlign: 'center',
                  padding: 'var(--spacing-07)',
                  width: 'calc(100% - 4rem)',
                  border: '1px solid var(--gray-400)',
                }}
              >
                No trends available matching your criteria
              </h5>
            )}
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
        </>
      ) : (
        <ListView data={DataFilteredBySearch} />
      )}
    </div>
  );
}
