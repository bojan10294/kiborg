import { FC } from 'react';

export interface IncomeItem {
  icon: string;
  label: string;
  amount: number;
}

const ProgressBar: FC<{ percentage: number }> = ({ percentage }) => (
  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
    <div className="bg-primary h-1 rounded-full" style={{ width: `${percentage}%` }}></div>
  </div>
);

const IncomeCard: FC<IncomeItem & { totalIncome: number }> = ({ icon, label, amount, totalIncome }) => {
  const percentage = (amount / totalIncome) * 100;

  return (
    <div>
      <div className="flex items-center gap-4 rounded-2xl cursor-pointer mt-auto mb-2">
        <div className="rounded-lg w-8 h-8 flex items-center bg-primary justify-center">
          <i className={`bx ${icon} text-xl text-white`}></i>
        </div>
        <span className="text-slate-500 font-medium text-sm">{label}</span>
      </div>
      <span className="text-2xl font-semibold">{amount.toLocaleString()}</span>
      <ProgressBar percentage={label === 'Total' ? 100 : percentage} />
    </div>
  );
};

export default IncomeCard;
