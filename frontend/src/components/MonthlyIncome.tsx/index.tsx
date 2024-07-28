import { FC } from 'react';
import IncomeCard, { IncomeItem } from './IncomeCard';

const MonthlyIncome: FC = () => {
  const incomeData: IncomeItem[] = [
    { icon: 'bx-money', label: 'Stampa', amount: 35215 },
    { icon: 'bxs-wallet', label: 'Gotovina', amount: 55215 },
    { icon: 'bxs-car', label: 'Wolt', amount: 15010 },
  ];

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Last Month</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {incomeData.map((item, index) => (
          <IncomeCard key={index} {...item} totalIncome={totalIncome} />
        ))}
        <IncomeCard icon="bxs-bank" label="Total" amount={totalIncome} totalIncome={totalIncome} />
      </div>
    </div>
  );
};

export default MonthlyIncome;
