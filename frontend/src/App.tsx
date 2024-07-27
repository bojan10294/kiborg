import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Kiflice from './pages/kiflice';
import Booking from './pages/booking';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <main className="flex-1 py-10 px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kiflice" element={<Kiflice />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
