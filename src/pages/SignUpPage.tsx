import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/icon';

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  agreeToTerms?: string;
}

const SignUpPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: (searchParams.get('role') as 'client' | 'freelancer') || '',
    agreeToTerms: false,
    subscribeToNews: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email обязателен';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Неверный формат email';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Пароль обязателен';
    if (password.length < 8) return 'Пароль слишком короткий (мин. 8 символов)';
    if (!/\d/.test(password)) return 'Пароль должен содержать цифру';
    if (!/[A-Z]/.test(password)) return 'Пароль должен содержать заглавную букву';
    return undefined;
  };

  const validateConfirmPassword = (confirmPassword: string, password: string): string | undefined => {
    if (!confirmPassword) return 'Подтверждение пароля обязательно';
    if (confirmPassword !== password) return 'Пароли не совпадают';
    return undefined;
  };

  const validateRole = (role: string): string | undefined => {
    if (!role) return 'Пожалуйста, выберите вашу роль';
    return undefined;
  };

  const validateAgreeToTerms = (agreeToTerms: boolean): string | undefined => {
    if (!agreeToTerms) return 'Необходимо принять условия';
    return undefined;
  };

  const validateField = (fieldName: string, value: any): string | undefined => {
    switch (fieldName) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return validateConfirmPassword(value, formData.password);
      case 'role':
        return validateRole(value);
      case 'agreeToTerms':
        return validateAgreeToTerms(value);
      default:
        return undefined;
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
    const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    if (touchedFields.has(fieldName)) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем все поля
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
      if (error) newErrors[fieldName as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    setTouchedFields(new Set(Object.keys(formData)));

    if (Object.keys(newErrors).length === 0) {
      try {
        await register({
          email: formData.email,
          password: formData.password,
          role: formData.role as 'client' | 'freelancer',
          agreeToTerms: formData.agreeToTerms,
          subscribeToNews: formData.subscribeToNews
        });
        navigate(`/dashboard/${formData.role}`);
      } catch (error) {
        setErrors({ email: 'Ошибка регистрации. Попробуйте позже.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Регистрация</CardTitle>
          <CardDescription>
            Создайте аккаунт для работы на платформе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={errors.email ? 'border-destructive' : ''}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={16} />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                className={errors.password ? 'border-destructive' : ''}
                placeholder="Минимум 8 символов"
              />
              {errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={16} />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтверждение пароля *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                className={errors.confirmPassword ? 'border-destructive' : ''}
                placeholder="Повторите пароль"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={16} />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Выберите вашу роль *</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="client"
                    name="role"
                    value="client"
                    checked={formData.role === 'client'}
                    onChange={(e) => handleChange('role', e.target.value)}
                    onBlur={() => handleBlur('role')}
                    className="text-primary"
                  />
                  <Label htmlFor="client" className="cursor-pointer">
                    Я Заказчик
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="freelancer"
                    name="role"
                    value="freelancer"
                    checked={formData.role === 'freelancer'}
                    onChange={(e) => handleChange('role', e.target.value)}
                    onBlur={() => handleBlur('role')}
                    className="text-primary"
                  />
                  <Label htmlFor="freelancer" className="cursor-pointer">
                    Я Исполнитель
                  </Label>
                </div>
              </div>
              {errors.role && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={16} />
                  {errors.role}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleChange('agreeToTerms', checked)}
                  onBlur={() => handleBlur('agreeToTerms')}
                  className="mt-1"
                />
                <Label htmlFor="agreeToTerms" className="text-sm leading-5">
                  Я согласен с{' '}
                  <Link to="/rules" target="_blank" className="text-primary hover:underline">
                    Правилами платформы
                  </Link>{' '}
                  и{' '}
                  <Link to="/privacy" target="_blank" className="text-primary hover:underline">
                    Политикой конфиденциальности
                  </Link>
                  {' *'}
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={16} />
                  {errors.agreeToTerms}
                </p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="subscribeToNews"
                  checked={formData.subscribeToNews}
                  onCheckedChange={(checked) => handleChange('subscribeToNews', checked)}
                  className="mt-1"
                />
                <Label htmlFor="subscribeToNews" className="text-sm leading-5">
                  Я хочу получать новости и спецпредложения
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Регистрация...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </Button>

            <div className="text-center">
              <Link 
                to="/login" 
                className="text-sm text-primary hover:underline"
              >
                Уже есть аккаунт? Войти
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;