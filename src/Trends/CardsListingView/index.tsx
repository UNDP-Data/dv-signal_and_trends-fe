import { useContext, useEffect, useState } from 'react';
import { Pagination, PaginationProps } from 'antd';
import sortBy from 'lodash.sortby';
import axios, { AxiosResponse } from 'axios';
import { TrendDataType, TrendFiltersDataType } from '../../Types';
import { CardList } from './CardsList';
import { ListView } from './ListView';
import { API_ACCESS_TOKEN } from '../../Constants';
import Context from '../../Context/Context';

interface Props {
  filters: TrendFiltersDataType;
  view: 'cardView' | 'listView';
}

export function CardLayout(props: Props) {
  const { filters, view } = props;
  const { role, accessToken } = useContext(Context);
  const [paginationValue, setPaginationValue] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalNo, setTotalNo] = useState(0);
  const [trendsList, setTrendsList] = useState<undefined | TrendDataType[]>(
    undefined,
  );
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _current,
    size,
  ) => {
    setPageSize(size);
    setPaginationValue(1);
  };
  useEffect(() => {
    setTrendsList(undefined);
    const horizonQueryParameter =
      filters.horizon === 'All Horizons' ? '' : `&horizon=${filters.horizon}`;
    const ratingQueryParameter =
      filters.impact === 'All Ratings'
        ? ''
        : `&impact_rating=${filters.impact}`;
    const statusQueryParameter =
      filters.status === 'All Status'
        ? role === 'Admin' || role === 'Curator'
          ? 'statuses=Approved&statuses=New'
          : 'statuses=Approved'
        : `statuses=${filters.status}`;
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?offset=${
          pageSize * (paginationValue - 1)
        }&limit=${pageSize}&${statusQueryParameter}${horizonQueryParameter}${ratingQueryParameter}`,
        {
          headers: {
            access_token: accessToken || API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setTrendsList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
      });
  }, [paginationValue, pageSize]);
  useEffect(() => {
    setTrendsList(undefined);
    const horizonQueryParameter =
      filters.horizon === 'All Horizons' ? '' : `&horizon=${filters.horizon}`;
    const ratingQueryParameter =
      filters.impact === 'All Ratings'
        ? ''
        : `&impact_rating=${filters.impact}`;
    const statusQueryParameter =
      filters.status === 'All Status'
        ? role === 'Admin' || role === 'Curator'
          ? 'statuses=Approved&statuses=New'
          : 'statuses=Approved'
        : `statuses=${filters.status}`;
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/count?${statusQueryParameter}${horizonQueryParameter}${ratingQueryParameter}`,
        {
          headers: {
            access_token: accessToken || API_ACCESS_TOKEN,
          },
        },
      )
      .then((countResponse: AxiosResponse) => {
        setTotalNo(countResponse.data);
        if (countResponse.data === 0) {
          setPaginationValue(1);
          setTrendsList([]);
        } else {
          axios
            .get(
              `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?offset=0&limit=${pageSize}&${statusQueryParameter}${horizonQueryParameter}${ratingQueryParameter}`,
              {
                headers: {
                  access_token: accessToken || API_ACCESS_TOKEN,
                },
              },
            )
            .then((response: AxiosResponse) => {
              setPaginationValue(1);
              setTrendsList(
                sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
              );
            });
        }
      });
  }, [filters]);
  return (
    <div style={{ padding: '0 1rem' }}>
      {trendsList ? (
        <div>
          {view === 'cardView' ? (
            <>
              <div className='flex-div flex-wrap'>
                {trendsList.length > 0 ? (
                  <CardList data={trendsList} />
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
              <div className='flex-div flex-hor-align-center margin-top-07'>
                <Pagination
                  className='undp-pagination'
                  onChange={e => {
                    setPaginationValue(e);
                  }}
                  defaultCurrent={1}
                  current={paginationValue}
                  total={totalNo}
                  pageSize={pageSize}
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                />
              </div>
            </>
          ) : (
            <ListView data={trendsList} />
          )}
        </div>
      ) : (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
