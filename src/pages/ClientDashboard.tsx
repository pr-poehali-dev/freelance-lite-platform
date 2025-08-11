import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/icon';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'client') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<ClientDashboardHome />} />
      <Route path="/tasks" element={<ClientTasks />} />
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/profile" element={<ClientProfile />} />
    </Routes>
  );
};

const ClientDashboardHome: React.FC = () => {
  const { user } = useAuth();

  const mockTasks = [
    {
      id: '1',
      title: 'Дизайн лендинга для стартапа',
      status: 'in_progress',
      freelancer: 'Анна Дизайнер',
      deadline: '2024-08-20',
      budget: 25000
    },
    {
      id: '2', 
      title: 'Настройка рекламы в Google Ads',
      status: 'awaiting_confirmation',
      freelancer: 'Михаил Маркетолог',
      deadline: '2024-08-15',
      budget: 15000
    },
    {
      id: '3',
      title: 'Написание статей для блога',
      status: 'in_progress',
      freelancer: 'Елена Копирайтер',
      deadline: '2024-08-25',
      budget: 12000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'awaiting_confirmation':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'В работе';
      case 'awaiting_confirmation':
        return 'Ожидает подтверждения';
      case 'completed':
        return 'Завершено';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Приветствие */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Добрый день, {user?.name || user?.email.split('@')[0]}!
        </h1>
        <p className="text-slate-600">Управляйте своими проектами и находите лучших исполнителей</p>
      </div>

      {/* Статистика */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активных задач</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Clock" className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Завершено</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" className="text-green-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ожидают подтверждения</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Icon name="AlertCircle" className="text-yellow-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Быстрые действия */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Быстрые действия</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/dashboard/client/create-task">
            <Button size="lg" className="w-full sm:w-auto">
              <Icon name="Plus" className="mr-2" />
              Создать задачу
            </Button>
          </Link>
          <Link to="/dashboard/client/tasks">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Icon name="List" className="mr-2" />
              Все задачи
            </Button>
          </Link>
        </div>
      </div>

      {/* Активные задачи */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Активные задачи</h2>
          <Link to="/dashboard/client/tasks">
            <Button variant="ghost" size="sm">
              Показать все
              <Icon name="ArrowRight" className="ml-1" size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          {mockTasks.slice(0, 3).map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-800">{task.title}</h3>
                      <Badge className={`${getStatusColor(task.status)} text-xs`}>
                        {getStatusText(task.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Исполнитель: {task.freelancer}</p>
                      <p>Дедлайн: {new Date(task.deadline).toLocaleDateString('ru-RU')}</p>
                      <p>Бюджет: {task.budget.toLocaleString('ru-RU')} ₽</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm">
                      <Icon name="MessageSquare" className="mr-1" size={16} />
                      Открыть чат
                    </Button>
                    {task.status === 'awaiting_confirmation' && (
                      <Button size="sm" variant="outline" className="text-green-600 border-green-200">
                        <Icon name="Check" className="mr-1" size={16} />
                        Подтвердить
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {mockTasks.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="Briefcase" className="mx-auto mb-4 text-muted-foreground" size={48} />
                <p className="text-muted-foreground mb-4">У вас пока нет активных задач</p>
                <Link to="/dashboard/client/create-task">
                  <Button>
                    <Icon name="Plus" className="mr-2" />
                    Создать первую задачу
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const ClientTasks: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">Мои задачи</h1>
    <p className="text-muted-foreground">Страница со всеми задачами в разработке...</p>
  </div>
);

const CreateTask: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">Создать новую задачу</h1>
    <p className="text-muted-foreground">Форма создания задачи в разработке...</p>
  </div>
);

const ClientProfile: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">Профиль</h1>
    <p className="text-muted-foreground">Страница профиля в разработке...</p>
  </div>
);

export default ClientDashboard;