import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Icon name="Briefcase" className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">FreelanceLite</span>
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  if (isDashboard && user) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Icon name="Briefcase" className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">FreelanceLite</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to={`/dashboard/${user.role}`} 
                className="text-foreground hover:text-primary transition-colors"
              >
                Главная
              </Link>
              <Link 
                to={`/dashboard/${user.role}/tasks`} 
                className="text-foreground hover:text-primary transition-colors"
              >
                {user.role === 'client' ? 'Мои задачи' : 'Задачи'}
              </Link>
              {user.role === 'client' && (
                <Link 
                  to="/dashboard/client/create-task" 
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Создать
                </Link>
              )}
              <Link 
                to={`/dashboard/${user.role}/profile`} 
                className="text-foreground hover:text-primary transition-colors"
              >
                Профиль
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                {user.name || user.email}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Выход
              </Button>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Briefcase" className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">FreelanceLite</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Главная
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
              Категории
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              О нас
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to={`/dashboard/${user.role}`}>
                  <Button variant="outline">
                    Кабинет
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Выход
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">
                    Войти
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button>
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main>{children}</main>
      
      <footer className="bg-muted/50 border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Briefcase" className="h-6 w-6 text-primary" />
                <span className="font-bold">FreelanceLite</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Платформа для связи заказчиков и исполнителей
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <div className="space-y-2 text-sm">
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  О нас
                </Link>
                <Link to="/rules" className="block text-muted-foreground hover:text-primary transition-colors">
                  Правила
                </Link>
                <Link to="/contacts" className="block text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <div className="space-y-2 text-sm">
                <Link to="/support" className="block text-muted-foreground hover:text-primary transition-colors">
                  Помощь
                </Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                  Конфиденциальность
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <p className="text-sm text-muted-foreground">
                support@freelancelite.com
              </p>
            </div>
          </div>
          
          <div className="border-t pt-8 mt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 FreelanceLite. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;