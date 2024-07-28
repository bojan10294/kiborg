import { FC, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ExpenseItem {
  label: string;
  value: number;
}

const data: ExpenseItem[] = [
  { label: 'Milan', value: 32000 },
  { label: 'Family032', value: 23000 },
  { label: 'Piletina', value: 11000 },
  { label: 'Cvarci', value: 29000 },
  { label: 'Susam', value: 74000 },
  { label: 'Pek papir', value: 41000 },
  { label: 'Ulje', value: 18000 },
  { label: 'Kese', value: 29000 },
  { label: 'Jaja', value: 15000 },
];

const labels = data.map((d) => d.label);
const values = data.map((d) => d.value);

const ExpenseChart: FC = () => {
  const chartRef = useRef<ChartJS<'bar'>>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Values',
        data: values,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(255, 255, 255, .8)',
        borderWidth: 1,
        barThickness: 16,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, .1)',
        },
        ticks: {
          color: 'white',
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div
      style={{ width: '100%', height: '400px' }}
      className="flex h-80 gap-6 bg-gradient-to-tr from-[#313860] to-[#151928] p-8 font-medium rounded-xl text-white">
      <Bar ref={chartRef} data={chartData} options={options} height={400} />
    </div>
  );
};

export default ExpenseChart;
