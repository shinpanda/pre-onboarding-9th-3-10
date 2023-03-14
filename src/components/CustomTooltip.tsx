import { Box, Flex } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Text, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import img from 'assets/tooltipBox.png';
import styled from '@emotion/styled';
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const {
      payload: { id, value_area, value_bar },
    } = payload[0];
    return (
      <Content>
        <Flex direction={'column'}>
          <Text className='label'>{`id : ${id}`}</Text>
          <Text className='label'>{`value_area : ${value_area}`}</Text>
          <Text className='label'>{`value_bar : ${value_bar}K`}</Text>
        </Flex>
      </Content>
    );
  }
};

export default CustomTooltip;

const Content = styled.div`
  padding: 10px;
  width: 160px;
  height: 110px;
  background-image: url(${img});
  background-size: 100% 100%;
`;
