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
  const [paginationValue, setPaginationValue] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalNoOfPages, setTotalNoOfPages] = useState(0);
  const { role, accessToken } = useContext(Context);
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
          ? '&statuses=New&statuses=Approved'
          : `&statuses=${filters.status}`
        : '&statuses=Approved';
    const sdgQueryParameter =
      filters.sdg === 'All SDGs' ? '' : `&sdg=${filters.sdg}`;
    const searchQueryParameter = filters.search
      ? `&query=${filters.search}`
      : '';
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?page=${paginationValue}&per_page=${pageSize}${statusQueryParameter}${steepQueryParameter}${sdgQueryParameter}${ssQueryParameter}${searchQueryParameter}`,
        {
          headers: {
            access_token: accessToken || API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setSignalList(
          sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
        );
      });
  }, [paginationValue]);
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
          ? 'statuses=New&statuses=Approved'
          : `statuses=${filters.status}`
        : 'statuses=Approved';
    const sdgQueryParameter =
      filters.sdg === 'All SDGs' ? '' : `&sdg=${filters.sdg}`;
    const searchQueryParameter = filters.search
      ? `&query=${filters.search}`
      : '';
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?page=1&per_page=${pageSize}&${statusQueryParameter}${steepQueryParameter}${sdgQueryParameter}${ssQueryParameter}${searchQueryParameter}`,
        {
          headers: {
            access_token: accessToken || API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setSignalList(
          sortBy(response.data.data, d => Date.parse(d.created_at)).reverse(),
        );
        setTotalNoOfPages(response.data.total_pages);
        setPaginationValue(1);
      });
  }, [role, filters, accessToken, pageSize]);
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _current,
    size,
  ) => {
    setPageSize(size);
  };

  return (
    <div style={{ padding: '0 1rem' }}>
      {signalList ? (
        <div>
          <div className='flex-div flex-wrap'>
            {signalList.length > 0 ? (
              view === 'cardView' ? (
                <CardList data={signalList} />
              ) : (
                <ListView data={signalList} />
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
              total={pageSize * totalNoOfPages}
              pageSize={pageSize}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </div>
      ) : (
        <div className='undp-loader-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
