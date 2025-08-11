import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from '@/types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Мокаем авторизацию
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'client',
        rating: 4.8,
        completedTasks: 12
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      // Мокаем регистрацию
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.email.split('@')[0],
        role: userData.role,
        rating: 0,
        completedTasks: 0
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Ошибка регистрации. Попробуйте позже');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Восстановление сессии при загрузке
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};