import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

const Navbar = () => {
  const location = useLocation();
  const routes = [
    { title: 'Dashboard', icon: 'dashboard', path: '/' },
    { title: 'Kiflice', icon: 'baguette', path: '/kiflice' },
    { title: 'Booking', icon: 'hotel', path: '/booking' },
  ];

  return (
    <nav className="py-10 px-8 flex flex-col gap-8 w-64 bg-gray-100 h-screen">
      <div>
        <img src="src/assets/logo.svg" alt="logo" className="w-36" />
      </div>
      <ul className="flex flex-col border-t border-t-gray-200 pt-8">
        {routes.map((route) => (
          <NavItem key={route.path} title={route.title} icon={route.icon} route={route.path} active={location.pathname === route.path} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
