import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeForm, setActiveForm] = useState<'client' | 'freelancer' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeTerms: false,
    newsletter: false
  });

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
      title: 'Рейтинги',
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" size={20} className="text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-800">FreelancePro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Главная</a>
              <a href="#categories" className="text-slate-600 hover:text-blue-600 transition-colors">Категории</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">О нас</a>
              <Button variant="outline" size="sm">Войти</Button>
            </nav>
          </div>
        </div>
      </header>

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
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
                onClick={() => setActiveForm('client')}
              >
                <Icon name="User" className="mr-2" />
                Я Заказчик
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg border-blue-200 hover:bg-blue-50"
                onClick={() => setActiveForm('freelancer')}
              >
                <Icon name="Users" className="mr-2" />
                Я Исполнитель
              </Button>
            </div>
          </div>

          {/* Registration Forms */}
          {activeForm && (
            <div className="max-w-md mx-auto animate-fade-in">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-slate-800">
                    Регистрация {activeForm === 'client' ? 'Заказчика' : 'Исполнителя'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="password"
                        placeholder="Подтверждение пароля"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreeTerms}
                        onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                        className="w-4 h-4 text-blue-600"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-slate-600">
                        Я согласен с <a href="#" className="text-blue-600 hover:underline">Правилами</a> и{' '}
                        <a href="#" className="text-blue-600 hover:underline">Политикой конфиденциальности</a>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={formData.newsletter}
                        onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="newsletter" className="text-sm text-slate-600">
                        Получать новости и спецпредложения
                      </label>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Зарегистрироваться
                    </Button>
                    
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setActiveForm(null)}
                        className="text-sm text-slate-500 hover:text-slate-700"
                      >
                        ← Назад к выбору роли
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
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
              <div key={index} className="text-center group">
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
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/90 backdrop-blur-sm hover:bg-white">
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
              <div key={index} className="text-center group">
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
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              onClick={() => setActiveForm('client')}
            >
              Зарегистрироваться как Заказчик
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => setActiveForm('freelancer')}
            >
              Зарегистрироваться как Исполнитель
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="Briefcase" size={20} className="text-white" />
                </div>
                <span className="text-xl font-semibold text-white">FreelancePro</span>
              </div>
              <p className="text-slate-400">
                Платформа для профессионального взаимодействия заказчиков и исполнителей
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Правила</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Безопасность</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Юридическое</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Пользовательское соглашение</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-slate-700 mb-8" />
          
          <div className="text-center text-slate-400">
            <p>&copy; 2024 FreelancePro. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;