import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Pagination, PaginationProps } from 'antd';
import sortBy from 'lodash.sortby';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { SignInButton } from '../Components/SignInButton';
import Context from '../Context/Context';
import { SignalDataType } from '../Types';
import { CardList } from '../Signals/CardsListingView/CardsList';

export function MyDrafts() {
  const { accessToken, userName } = useContext(Context);
  const [paginationValue, setPaginationValue] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [signalList, setSignalList] = useState<SignalDataType[] | undefined>(
    undefined,
  );
  const [totalNo, setTotalNo] = useState(0);
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/count?statuses=Draft&created_by=${userName}`,
        {
          headers: {
            access_token: accessToken,
          },
        },
      )
      .then((countResponse: AxiosResponse) => {
        setTotalNo(countResponse.data);
        if (countResponse.data === 0) {
          setPaginationValue(1);
          setSignalList([]);
        } else {
          axios
            .get(
              `https://signals-and-trends-api.azurewebsites.net/v1/signals/list?offset=${
                pageSize * (paginationValue - 1)
              }&limit=${pageSize}&statuses=Draft&created_by=${userName}`,
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
        }
      });
  }, [accessToken, userName, pageSize, paginationValue]);
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _current,
    size,
  ) => {
    setPageSize(size);
    setPaginationValue(1);
  };

  return (
    <div
      className='margin-top-13 padding-top-09'
      style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
    >
      <AuthenticatedTemplate>
        {signalList ? (
          <div>
            <h3 className='undp-typography margin-top-05'>My Drafts</h3>
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
          </div>
        ) : (
          <div className='undp-loader-container'>
            <div className='undp-loader' />
          </div>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton buttonText='Sign In to View Admin Panel' />
      </UnauthenticatedTemplate>
    </div>
  );
}
