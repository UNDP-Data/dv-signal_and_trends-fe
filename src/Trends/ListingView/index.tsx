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
  const [pageSize, setPageSize] = useState(24);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<undefined | string>(undefined);
  const [trendsList, setTrendsList] = useState<undefined | TrendDataType[]>(
    undefined,
  );
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _current,
    size,
  ) => {
    setPageSize(size);
  };
  useEffect(() => {
    setTrendsList(undefined);
    setError(undefined);
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
    const searchQueryParameter = filters.search
      ? `&query=${filters.search}`
      : '';
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?page=${paginationValue}&per_page=${pageSize}&${statusQueryParameter}${horizonQueryParameter}${ratingQueryParameter}${searchQueryParameter}`,
        {
          headers: {
            access_token: accessToken || API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setTrendsList(
          sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
        );
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setTrendsList([]);
        } else {
          setError(
            `Error code ${err.response?.status}: ${err.response?.data}. ${
              err.response?.status === 500
                ? 'Please try again in some time'
                : ''
            }`,
          );
        }
      });
  }, [paginationValue]);
  useEffect(() => {
    setTrendsList(undefined);
    setError(undefined);
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
    const searchQueryParameter = filters.search
      ? `&query=${filters.search}`
      : '';
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?page=1&per_page=${pageSize}&${statusQueryParameter}${horizonQueryParameter}${ratingQueryParameter}${searchQueryParameter}`,
        {
          headers: {
            access_token: accessToken || API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setTrendsList(
          sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
        );
        setTotalCount(response.data.total_count);
        setPaginationValue(1);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setTrendsList([]);
        } else {
          setError(
            `Error code ${err.response?.status}: ${err.response?.data}. ${
              err.response?.status === 500
                ? 'Please try again in some time'
                : ''
            }`,
          );
        }
      });
  }, [filters, pageSize]);
  return (
    <div style={{ padding: '0 1rem' }}>
      {trendsList ? (
        <div>
          <div className='flex-div flex-wrap'>
            {trendsList.length > 0 ? (
              view === 'cardView' ? (
                <CardList data={trendsList} />
              ) : (
                <ListView data={trendsList} />
              )
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
              total={totalCount}
              pageSize={pageSize}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </div>
      ) : error ? (
        <p
          className='margin-top-00 margin-bottom-00'
          style={{ color: 'var(--dark-red)' }}
        >
          {error}
        </p>
      ) : (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
