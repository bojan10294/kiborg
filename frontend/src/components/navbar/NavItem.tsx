import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavItemProps {
  title: string;
  icon: string;
  active?: boolean;
  route: string;
  additionalClasses?: string;
}

const NavItem: FC<NavItemProps> = ({ title, icon, active = false, route, additionalClasses = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <li
      className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer ${active ? 'bg-white shadow-sm' : ''} ${additionalClasses}`}
      onClick={handleClick}>
      <div className={`rounded-lg w-8 h-8 flex items-center justify-center ${active ? 'bg-primary' : 'bg-white shadow-sm'}`}>
        <i className={`bx bxs-${icon} text-xl ${active ? 'text-white' : 'text-primary'}`}></i>
      </div>
      <span className={`text-slate-500 font-medium text-sm ${active ? 'text-gray-950' : 'text-slate-500'}`}>{title}</span>
    </li>
  );
};

export default NavItem;
