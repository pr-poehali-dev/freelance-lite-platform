import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/icon';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.email, formData.password);
      // Редирект будет выполнен в AuthContext после успешной авторизации
    } catch (err) {
      setError('Неверный email или пароль');
    }
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Вход в аккаунт</CardTitle>
          <CardDescription>
            Войдите в свой аккаунт для продолжения работы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-sm text-destructive flex items-center gap-2">
                  <Icon name="AlertCircle" size={16} />
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Введите пароль"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </Button>

            <div className="text-center space-y-2">
              <Link 
                to="/signup" 
                className="text-sm text-primary hover:underline block"
              >
                Нет аккаунта? Зарегистрироваться
              </Link>
              <Link 
                to="/forgot-password" 
                className="text-sm text-muted-foreground hover:text-primary hover:underline block"
              >
                Забыли пароль?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;