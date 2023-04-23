import { useContext, useEffect, useState } from 'react';
import { Pagination, PaginationProps } from 'antd';
import axios, { AxiosResponse } from 'axios';
import sortBy from 'lodash.sortby';
import { SignalDataType, SignalFiltersDataType } from '../../Types';
import { CardList } from './CardsList';
import { ListView } from './ListView';
import { API_ACCESS_TOKEN } from '../../Constants';
import Context from '../../Context/Context';

interface Props {
  filters: SignalFiltersDataType;
  view: 'cardView' | 'listView';
}

export function CardLayout(props: Props) {
  const { filters, view } = props;
  const { accessToken } = useContext(Context);
  const [paginationValue, setPaginationValue] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalNo, setTotalNo] = useState(0);
  const { role } = useContext(Context);
  const [signalList, setSignalList] = useState<undefined | SignalDataType[]>(
    undefined,
  );
  useEffect(() => {
    setSignalList(undefined);
    const steepQueryParameter =
      filters.steep === 'All STEEP+V' ? '' : `&steep=${filters.steep}`;
    const ssQueryParameter =
      filters.ss === 'All Signature Solutions/Enabler'
        ? ''
        : `&signature_primary=${filters.ss.replaceAll(' ', '%20')}`;
    const statusQueryParameter =
      role === 'Curator' || role === 'Admin'
        ? filters.status === 'All Status'
          ? '&statuses=Approved&statuses=New'
          : `&statuses=${filters.status}`
        : '&statuses=Approved';
    const sdgQueryParameter =
      filters.sdg === 'All SDGs' ? '' : `&sdgs=${filters.sdg}`;
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=${
          pageSize * (paginationValue - 1)
        }&limit=${pageSize}${statusQueryParameter}${steepQueryParameter}${sdgQueryParameter}${ssQueryParameter}`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setSignalList(
          sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
        );
      });
  }, [paginationValue, pageSize]);
  useEffect(() => {
    setSignalList(undefined);
    const steepQueryParameter =
      filters.steep === 'All STEEP+V' ? '' : `&steep=${filters.steep}`;
    const ssQueryParameter =
      filters.ss === 'All Signature Solutions/Enabler'
        ? ''
        : `&signature_primary=${filters.ss}`;
    const statusQueryParameter =
      role === 'Curator' || role === 'Admin'
        ? filters.status === 'All Status'
          ? 'statuses=Approved&statuses=New'
          : `statuses=${filters.status}`
        : 'statuses=Approved';
    const sdgQueryParameter =
      filters.sdg === 'All SDGs' ? '' : `&sdgs=${filters.sdg}`;
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/count?${statusQueryParameter}${steepQueryParameter}${sdgQueryParameter}${ssQueryParameter}`,
        {
          headers: {
            access_token: API_ACCESS_TOKEN,
          },
        },
      )
      .then((countResponse: AxiosResponse) => {
        setTotalNo(countResponse.data);
        if (countResponse.data === 0) {
          setPaginationValue(1);
          setSignalList([]);
        } else if (role === 'Admin') {
          axios
            .get(
              `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=${pageSize}&${statusQueryParameter}${steepQueryParameter}${sdgQueryParameter}${ssQueryParameter}`,
              {
                headers: {
                  access_token: accessToken,
                },
              },
            )
            .then((response: AxiosResponse) => {
              setPaginationValue(1);
              setSignalList(
                sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
              );
            });
        } else {
          axios
            .get(
              `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=0&limit=${pageSize}&${statusQueryParameter}${steepQueryParameter}${sdgQueryParameter}${ssQueryParameter}`,
              {
                headers: {
                  access_token: API_ACCESS_TOKEN,
                },
              },
            )
            .then((response: AxiosResponse) => {
              setPaginationValue(1);
              setSignalList(
                sortBy(response.data, d => Date.parse(d.created_at)).reverse(),
              );
            });
        }
      });
  }, [role, filters, accessToken]);
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _current,
    size,
  ) => {
    setPageSize(size);
    setPaginationValue(1);
  };

  return (
    <div style={{ padding: '0 1rem' }}>
      {signalList ? (
        <div>
          {view === 'cardView' ? (
            <>
              <div className='flex-div flex-wrap'>
                {signalList.length > 0 ? (
                  <CardList data={signalList} />
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
                    No signals available matching your criteria
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
            <ListView data={signalList} />
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
