import { FC } from 'react';

interface ExpenseItem {
  name: string;
  value: number;
}

const data: ExpenseItem[] = [
  { name: 'Milan', value: 32000 },
  { name: 'Family032', value: 23000 },
  { name: 'Piletina', value: 11000 },
  { name: 'Cvarci', value: 29000 },
  { name: 'Susam', value: 60000 },
  { name: 'Pek papir', value: 41000 },
  { name: 'Ulje', value: 18000 },
  { name: 'Kese', value: 29000 },
  { name: 'Jaja', value: 15000 },
];

const ExpenseChart: FC = () => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const roundedMax = Math.ceil(maxValue / 10000) * 10000;

  const intervalCount = Math.min(6, roundedMax / 10000 + 1);
  const interval = roundedMax / (intervalCount - 1);

  return (
    <div className="flex h-80 gap-6 bg-gradient-to-tr from-[#313860] to-[#151928] p-10 pb-16 font-medium rounded-xl text-white">
      <ul className="flex flex-col justify-between">
        {Array.from({ length: intervalCount }).map((_, index) => (
          <li key={index} className="text-sm">
            {((intervalCount - 1 - index) * interval).toLocaleString()}
          </li>
        ))}
      </ul>
      <div className="flex justify-around flex-1">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col gap-3 items-center justify-end relative">
            <div style={{ height: `${(item.value / roundedMax) * 100}%` }} className="w-3 rounded-md bg-white relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-[#313860] px-1.5 py-0.5 rounded text-[11px] whitespace-nowrap">
                {item.value.toLocaleString()}
              </div>
            </div>
            <span className="absolute -bottom-8 w-max max-w-24 text-xs">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;
