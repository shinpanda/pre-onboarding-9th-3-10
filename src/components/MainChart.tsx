import React, { useEffect, useState } from 'react';
import {
  Bar,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
  Area,
  ComposedChart,
  Cell,
  Brush,
  BarProps,
} from 'recharts';
import { Data } from 'types/types';
import CustomTooltip from './CustomTooltip';

interface MainChartProps {
  datas: Data[];
  idSelect: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const MainChart = ({ datas, idSelect, onChange }: MainChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number[] | undefined>([]);

  useEffect(() => {
    setActiveIndex(
      datas.reduce<number[]>((acc, cur, idx, arr) => {
        if (idSelect.includes(cur.id)) acc.push(idx);
        return acc;
      }, []),
    );
  }, [idSelect]);

  const handleBarClick = (data: BarProps) => {
    if (data.id !== undefined) onChange([data.id]);
  };

  return (
    <ComposedChart
      width={2000}
      height={400}
      data={datas}
      margin={{
        top: 40,
        right: 80,
        bottom: 20,
        left: 80,
      }}
    >
      <Legend verticalAlign='bottom' height={36} />
      <Tooltip position={{ y: -10 }} content={CustomTooltip} wrapperStyle={{ outline: 'none' }} />

      <XAxis
        dataKey='date'
        label={{ value: 'time', position: 'left', offset: 6 }}
        scale='auto'
        minTickGap={30}
      />
      <XAxis hide={true} dataKey='id' />
      <YAxis
        yAxisId='value_bar'
        dataKey='value_bar'
        orientation='left'
        label={{ value: 'value_bar, Unit : K', position: 'top', offset: 15 }}
      />
      <YAxis
        yAxisId='value_area'
        dataKey='value_area'
        orientation='right'
        label={{ value: `value_area`, position: 'top', offset: 15 }}
      />

      <Area
        yAxisId='value_area'
        dataKey='value_area'
        type='monotone'
        fill='url(#color1)'
        fillOpacity={1}
        stroke='#ffb700'
      />
      <Bar
        yAxisId='value_bar'
        dataKey='value_bar'
        onClick={handleBarClick}
        fill={'#5388D899'}
        radius={[3, 3, 0, 0]}
        animationEasing={'ease-in-out'}
      >
        {datas.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={activeIndex?.includes(index) ? '#F4BE37' : 'url(#color2)'}
          />
        ))}
      </Bar>

      <Brush dataKey='date' height={30} stroke='#5388D899' />

      <defs>
        <linearGradient id='color1' x1='0' y1='1.5' x2='0' y2='0'>
          <stop offset='30%' stopColor='#f5f6f8' stopOpacity={0.5} />
          <stop offset='95%' stopColor='#ecae11' stopOpacity={0.5} />
        </linearGradient>
        <linearGradient id='color2' x1='0' y1='1.5' x2='0' y2='0'>
          <stop offset='30%' stopColor='#ffffff2d' stopOpacity={0.5} />
          <stop offset='95%' stopColor='#5388D899' stopOpacity={0.5} />
        </linearGradient>
      </defs>
    </ComposedChart>
  );
};

export default MainChart;
