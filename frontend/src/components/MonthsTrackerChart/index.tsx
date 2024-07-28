import { FC, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import type { ChartData, ChartOptions, Chart } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = [
  { month: 'Jan', value1: 20, value2: 24 },
  { month: 'Feb', value1: 20, value2: 22 },
  { month: 'Mar', value1: 18, value2: 25 },
  { month: 'Apr', value1: 28, value2: 37 },
  { month: 'May', value1: 23, value2: 38 },
  { month: 'Jun', value1: 25, value2: 48 },
  { month: 'Jul', value1: 25, value2: 40 },
  { month: 'Aug', value1: 20, value2: 30 },
  { month: 'Sep', value1: 12, value2: 37 },
  { month: 'Oct', value1: 18, value2: 24 },
  { month: 'Nov', value1: 15, value2: 43 },
  { month: 'Dec', value1: 14, value2: 45 },
];

const labels = data.map((d) => d.month);
const value1 = data.map((d) => d.value1);
const value2 = data.map((d) => d.value2);

const CustomAreaChart: FC = () => {
  const chartRef = useRef<Chart<'line'> | null>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
      gradient1.addColorStop(0, 'rgba(45, 55, 72, 0.8)');
      gradient1.addColorStop(1, 'rgba(45, 55, 72, 0.2)');

      const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
      gradient2.addColorStop(0, 'rgba(79, 209, 197, 0.8)');
      gradient2.addColorStop(1, 'rgba(79, 209, 197, 0.2)');

      chart.data.datasets[0].backgroundColor = gradient1;
      chart.data.datasets[1].backgroundColor = gradient2;
      chart.update();
    }
  }, []);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Rashodi',
        data: value1,
        borderColor: 'rgba(45, 55, 72, 1)',
        backgroundColor: 'rgba(45, 55, 72, 0.4)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Prihodi',
        data: value2,
        borderColor: 'rgba(79, 209, 197, 1)',
        backgroundColor: 'rgba(79, 209, 197, 0.4)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
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
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(196, 196, 196, 0.2)',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '460px' }}>
      <Line ref={chartRef} data={chartData} options={options} height={460} />
    </div>
  );
};

export default CustomAreaChart;
