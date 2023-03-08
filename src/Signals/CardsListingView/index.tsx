/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Pagination } from 'antd';
import { SignalDataType } from '../../Types';
import { ModalEl } from './ModalEl';
import { CardList } from './CardsList';

interface Props {
  data: SignalDataType[];
  filteredSDG: string;
  filteredSteep: string;
  filteredSS: string;
  search?: string;
}

export function CardLayout(props: Props) {
  const { data, filteredSDG, filteredSS, filteredSteep, search } = props;
  const [paginationValue, setPaginationValue] = useState(1);
  const [mouseClickData, setMouseClickData] = useState<SignalDataType | null>(
    null,
  );
  const DataFilterBySDG =
    filteredSDG === 'All SDGs'
      ? data
      : data.filter(d => d.sdgs.indexOf(filteredSDG) !== -1);
  const DataFilterBySteep =
    filteredSteep === 'All STEEP+V'
      ? DataFilterBySDG
      : DataFilterBySDG.filter(
          d => d.steep && d.steep?.split(' – ').indexOf(filteredSteep) !== -1,
        );
  const DataFilteredBySS =
    filteredSS === 'All Signature Solutions/Enabler'
      ? DataFilterBySteep
      : DataFilterBySteep.filter(
          d =>
            d.signature_primary === filteredSS ||
            d.signature_secondary === filteredSS,
        );
  const DataFilteredBySearch = !search
    ? DataFilteredBySS
    : DataFilteredBySS.filter(d =>
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
