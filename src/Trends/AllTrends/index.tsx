import { useContext, useEffect, useState } from 'react';
import { Modal, Pagination, PaginationProps } from 'antd';
import sortBy from 'lodash.sortby';
import axios, { AxiosResponse } from 'axios';
import { TrendDataType, TrendFiltersDataType } from '../../Types';
import { CardList } from './GridView';
import { ListView } from './ListView';
import { API_ACCESS_TOKEN } from '../../Constants';
import Context from '../../Context/Context';

interface Props {
  filters: TrendFiltersDataType;
  view: 'cardView' | 'listView';
  trendsOrderBy: string;
}

export function AllTrends(props: Props) {
  const { filters, view, trendsOrderBy } = props;
  const { role, accessToken } = useContext(Context);
  const [paginationValue, setPaginationValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState<undefined | number>(undefined);
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
  const GetURL = (isExportLink: boolean) => {
    const steepPrimaryQueryParameter =
      filters.steep_primary === 'All Primary STEEP+V'
        ? ''
        : `&steep_primary=${filters.steep_primary}`;
    const steepSecondaryQueryParameter =
      filters.steep_secondary === 'All Secondary STEEP+V'
        ? ''
        : `&steep_secondary=${filters.steep_secondary}`;
    const ss1QueryParameter =
      filters.signature_primary === 'All Primary Signature Solutions/Enabler'
        ? ''
        : `&signature_primary=${filters.signature_primary.replaceAll(
            ' ',
            '%20',
          )}`;
    const ss2QueryParameter =
      filters.signature_secondary ===
      'All Secondary Signature Solutions/Enabler'
        ? ''
        : `&signature_secondary=${filters.signature_secondary.replaceAll(
            ' ',
            '%20',
          )}`;
    const sdgQueryParameter =
      filters.sdg === 'All SDGs'
        ? ''
        : `&sdgs=${filters.sdg.replaceAll(' ', '%20')}`;
    const createdForQueryParameter =
      filters.created_for === 'All Options'
        ? ''
        : `&created_for=${filters.created_for.replaceAll(' ', '%20')}`;
    const horizonQueryParameter =
      filters.horizon === 'All Horizons'
        ? ''
        : `&time_horizon=${filters.horizon.replace('+', '%2B')}`;
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
    const orderByQueryParameter = `&order_by_field=${trendsOrderBy}&order_by_direction=${
      trendsOrderBy === 'created_at' || trendsOrderBy === 'modified_at'
        ? 'desc'
        : 'asc'
    }`;
    const urlForExport = `https://signals-and-trends-api.azurewebsites.net/v1/export/trends?${statusQueryParameter}${steepPrimaryQueryParameter}${steepSecondaryQueryParameter}${sdgQueryParameter}${ss1QueryParameter}${ss2QueryParameter}${createdForQueryParameter}${horizonQueryParameter}${ratingQueryParameter}${searchQueryParameter}${orderByQueryParameter}`;
    const urlForListing = `https://signals-and-trends-api.azurewebsites.net/v1/trends/list?page=${paginationValue}&per_page=${pageSize}&${statusQueryParameter}${steepPrimaryQueryParameter}${steepSecondaryQueryParameter}${sdgQueryParameter}${ss1QueryParameter}${ss2QueryParameter}${createdForQueryParameter}${horizonQueryParameter}${ratingQueryParameter}${searchQueryParameter}${orderByQueryParameter}`;
    return isExportLink ? urlForExport : urlForListing;
  };
  useEffect(() => {
    setTrendsList(undefined);
    setError(undefined);
    axios
      .get(GetURL(false), {
        headers: {
          access_token: accessToken || API_ACCESS_TOKEN,
        },
      })
      .then((response: AxiosResponse) => {
        setTrendsList(
          sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
        );
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setTrendsList([]);
          setTotalCount(0);
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
    axios
      .get(GetURL(false), {
        headers: {
          access_token: accessToken || API_ACCESS_TOKEN,
        },
      })
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
          setTotalCount(0);
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
  }, [filters, pageSize, trendsOrderBy]);
  return (
    <div style={{ padding: '0 1rem' }} className='margin-bottom-09'>
      {trendsList && totalCount !== undefined ? (
        <div>
          <div
            className='margin-bottom-05 flex-div'
            style={{
              padding: '1rem',
              backgroundColor: 'var(--gray-200)',
              justifyContent: 'center',
              width: 'calc(100% - 2rem)',
              alignItems: 'center',
            }}
          >
            <div className='bold'>
              {totalCount}{' '}
              {totalCount > 1 ? 'trends available' : 'trend available'}
            </div>
            {role === 'Admin' || role === 'Curator' ? (
              <button
                type='button'
                className='undp-button button-primary'
                onClick={() => {
                  setLoading(true);
                  axios
                    .get(GetURL(true), {
                      headers: {
                        access_token: accessToken,
                      },
                      responseType: 'blob',
                    })
                    .then((response: AxiosResponse) => {
                      const url = window.URL.createObjectURL(
                        new Blob([response.data]),
                      );
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute(
                        'download',
                        `FTSS_trends_${new Date(Date.now()).getFullYear()}-${
                          new Date(Date.now()).getMonth() + 1
                        }-${new Date(Date.now()).getDate()}.xlsx`,
                      );
                      document.body.appendChild(link);
                      link.click();
                      setLoading(false);
                    });
                }}
              >
                Download Excel
              </button>
            ) : null}
          </div>
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
          {trendsList.length > 0 ? (
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
          ) : null}
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
      <Modal className='undp-modal undp-loading-modal' title='' open={loading}>
        <div style={{ margin: 'auto' }}>
          <div className='undp-loader' style={{ margin: 'auto' }} />
        </div>
      </Modal>
    </div>
  );
}
