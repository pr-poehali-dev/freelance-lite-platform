import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const HomePage: React.FC = () => {
  const categories = [
    { name: 'Дизайн', icon: 'Palette', count: '230+' },
    { name: 'Разработка', icon: 'Code', count: '180+' },
    { name: 'Тексты', icon: 'FileText', count: '150+' },
    { name: 'Маркетинг', icon: 'Target', count: '120+' },
    { name: 'Консультации', icon: 'MessageSquare', count: '90+' },
    { name: 'Переводы', icon: 'Languages', count: '80+' }
  ];

  const benefits = [
    {
      icon: 'Shield',
      title: 'Безопасная сделка',
      description: 'Гарантированная оплата после выполнения'
    },
    {
      icon: 'MessageCircle',
      title: 'Прямой чат',
      description: 'Общение напрямую с исполнителем'
    },
    {
      icon: 'CheckCircle',
      title: 'Простое подтверждение',
      description: 'Одна кнопка для завершения проекта'
    },
    {
      icon: 'Star',
      title: 'Рейтинги исполнителей',
      description: 'Система отзывов и оценок'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Публикация задачи',
      description: 'Заказчик описывает техзадание и бюджет'
    },
    {
      number: '2',
      title: 'Выбор исполнителя',
      description: 'Исполнители откликаются, заказчик выбирает'
    },
    {
      number: '3',
      title: 'Работа и оплата',
      description: 'Общение в чате, сдача работы, подтверждение'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Найди исполнителя<br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                или работу легко!
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Платформа для связи заказчиков и исполнителей. Безопасные сделки, прямое общение, быстрые результаты.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard/client">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
                >
                  <Icon name="User" className="mr-2" />
                  Я Заказчик
                </Button>
              </Link>
              <Link to="/signup?role=freelancer">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg border-blue-200 hover:bg-blue-50"
                >
                  <Icon name="Users" className="mr-2" />
                  Я Исполнитель
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white" id="how">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Как это работает?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Простой и понятный процесс от публикации задачи до получения результата
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center group animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" id="categories">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Категории услуг</h2>
            <p className="text-lg text-slate-600">Найдите специалистов в любой области</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/90 backdrop-blur-sm hover:bg-white hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Icon name={category.icon as any} className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{category.name}</h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {category.count} заказов
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Преимущества платформы</h2>
            <p className="text-lg text-slate-600">Почему тысячи пользователей выбирают нас</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Icon name={benefit.icon as any} className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Начни прямо сейчас!</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Присоединяйся к тысячам заказчиков и исполнителей, которые уже работают на нашей платформе
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup?role=client">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              >
                Зарегистрироваться как Заказчик
              </Button>
            </Link>
            <Link to="/signup?role=freelancer">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600"
              >
                Зарегистрироваться как Исполнитель
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;