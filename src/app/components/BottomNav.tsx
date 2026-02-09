import { Home, Package, Search, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'requests', icon: Package, label: 'Заявки' },
    { id: 'matches', icon: Search, label: 'Поиск' },
    { id: 'profile', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pb-safe">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 gap-1"
            >
              <Icon
                className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}
                strokeWidth={1.5}
              />
              <span
                className={`text-xs ${isActive ? 'text-blue-500' : 'text-gray-400'}`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
