import React from 'react';
import { Icons } from '../constants';

type Tab = 'staff' | 'supply-chain' | 'assets';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-lg w-full transition-colors duration-200 ${
      isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-base-300 hover:text-neutral'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="bg-base-200 border-r border-base-300 p-2 flex flex-col items-center space-y-4">
      <div className="text-primary p-2">
        <Icons.robot className="w-8 h-8"/>
      </div>
      <nav className="flex flex-col items-center space-y-4 w-full">
        <NavItem
          icon={<Icons.users className="w-6 h-6" />}
          label="Staff"
          isActive={activeTab === 'staff'}
          onClick={() => setActiveTab('staff')}
        />
        <NavItem
          icon={<Icons.truck className="w-6 h-6" />}
          label="Supply"
          isActive={activeTab === 'supply-chain'}
          onClick={() => setActiveTab('supply-chain')}
        />
        <NavItem
          icon={<Icons.cog className="w-6 h-6" />}
          label="Assets"
          isActive={activeTab === 'assets'}
          onClick={() => setActiveTab('assets')}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
