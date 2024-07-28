import ExpenceChart from '../../components/ExpenceChart';
import MonthlyIncome from '../../components/MonthlyIncome.tsx';
import MonthsTrackerCharts from '../../components/MonthsTrackerChart';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-7">Dasboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-4">
          <ExpenceChart />
          <MonthlyIncome />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <MonthsTrackerCharts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
