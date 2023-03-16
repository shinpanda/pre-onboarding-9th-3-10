import React, { useState, useEffect } from 'react';
import { Box, Heading, Stack } from '@chakra-ui/react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Data, OriginData } from 'types/types';
import MainChart from 'components/MainChart';
import MainLayout from 'components/common/MainLayout';
import FilterButtons from 'components/FilterButtons';

const MainPage = () => {
  const orginData = useLoaderData() as OriginData;
  const [query, setQuery] = useSearchParams();

  const [datas, setDatas] = useState<Data[]>([]);
  const [idRange, setIdRange] = useState<string[]>([]);
  const [idSelect, setIdSelect] = useState<string[]>([]);

  const keys = Object.keys(orginData);
  const val = Object.values(orginData);
  const [date, _] = keys[0].split(' ');

  useEffect(() => {
    setDatas(
      val.map((e, idx) => {
        const [_, time] = keys[idx].split(' ');
        return {
          ...e,
          date: time,
          value_bar: val[idx].value_bar / 100, //Data Normalization
        };
      }),
    );
  }, []);

  useEffect(() => {
    const arr = query.get('check')?.split('_');
    arr?.pop();
    if (arr !== undefined) {
      setIdSelect([...arr]);
    }
  }, [query]);

  useEffect(() => {
    const deduplID = datas.reduce<string[]>((acc, cur) => {
      acc.includes(cur.id) ? acc : acc.push(cur.id);
      return acc;
    }, []);
    setIdRange(deduplID);
  }, [datas]);

  return (
    <MainLayout>
      <Heading>{date}</Heading>
      <Box borderRadius='lg' borderWidth='1px' p='2'>
        <Stack spacing={5} direction='row'>
          <FilterButtons idRange={idRange} onChange={setIdSelect} idSelect={idSelect} />
        </Stack>
      </Box>
      <MainChart datas={datas} idSelect={idSelect} />
    </MainLayout>
  );
};

export default MainPage;
