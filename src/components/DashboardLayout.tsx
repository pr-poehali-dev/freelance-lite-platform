import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/icon';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    {
      label: 'Задачи',
      path: '/dashboard/client/tasks',
      icon: 'List'
    },
    {
      label: 'Создать',
      path: '/dashboard/client/create-task',
      icon: 'Plus'
    },
    {
      label: 'Сообщения',
      path: '/dashboard/client/messages',
      icon: 'MessageSquare',
      hasNotifications: true,
      notificationCount: 3
    },
    {
      label: 'Профиль',
      path: '/dashboard/client/profile',
      icon: 'User'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-slate-800">WorkHub</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={item.icon as any} size={16} />
                    <span>{item.label}</span>
                    {item.hasNotifications && item.notificationCount && item.notificationCount > 0 && (
                      <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
                        {item.notificationCount}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-slate-800">
                  {user?.name || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-slate-500">Заказчик</p>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-slate-600 hover:text-slate-800"
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Выход
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-slate-200 py-2">
            <nav className="flex items-center space-x-1 overflow-x-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Icon name={item.icon as any} size={14} />
                    <span>{item.label}</span>
                    {item.hasNotifications && item.notificationCount && item.notificationCount > 0 && (
                      <Badge variant="destructive" className="h-4 w-4 p-0 text-xs flex items-center justify-center">
                        {item.notificationCount}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Icon name="Briefcase" className="text-white" size={14} />
              </div>
              <span className="text-sm text-slate-600">© 2024 WorkHub. Все права защищены.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <Link to="/help" className="hover:text-slate-700 transition-colors">
                Помощь
              </Link>
              <Link to="/privacy" className="hover:text-slate-700 transition-colors">
                Конфиденциальность
              </Link>
              <Link to="/terms" className="hover:text-slate-700 transition-colors">
                Условия
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;