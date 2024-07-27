import ExpenceChart from '../../components/ExpenceChart';
import MonthsTrackerCharts from '../../components/MonthsTrackerChart';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-7">Dasboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <ExpenceChart />
        <MonthsTrackerCharts />
      </div>
    </div>
  );
};

export default Dashboard;
