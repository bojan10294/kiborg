import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import useAuthContext from '../../hooks/useAuthContext';

const Navbar = () => {
  const { authTokens } = useAuthContext();
  const location = useLocation();
  const routes = [
    { title: 'Dashboard', icon: 'dashboard', path: '/' },
    { title: 'Kiflice', icon: 'baguette', path: '/kiflice' },
    { title: 'Booking', icon: 'hotel', path: '/booking' },
  ];
  console.log('authTokens', authTokens);
  return (
    <nav className="py-10 px-8 flex flex-col gap-8 w-64 bg-gray-100 h-screen">
      <div>
        <img src="src/assets/logo.svg" alt="logo" className="w-36" />
      </div>
      <ul className="flex flex-col border-t border-t-gray-200 pt-8 h-full">
        {routes.map((route) => (
          <NavItem key={route.path} title={route.title} icon={route.icon} route={route.path} active={location.pathname === route.path} />
        ))}
        {authTokens ? (
          <li className="flex items-center gap-4 p-3 pb-0 rounded-2xl cursor-pointer mt-auto">
            <div className="rounded-lg w-8 h-8 flex items-center justify-center">
              <i className="bx bxs-user text-xl text-primary"></i>
            </div>
            <span className={`text-slate-500 font-medium text-sm`}>{authTokens.name}</span>
          </li>
        ) : (
          <NavItem
            key="/login"
            title="Login"
            icon="user"
            route="/login"
            active={location.pathname === '/login'}
            additionalClasses="mt-auto"
          />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
