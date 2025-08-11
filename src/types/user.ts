export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'client' | 'freelancer';
  avatar?: string;
  rating?: number;
  completedTasks?: number;
  isOnline?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: 'open' | 'in_progress' | 'awaiting_confirmation' | 'completed' | 'cancelled';
  clientId: string;
  freelancerId?: string;
  createdAt: string;
  deadline?: string;
  tags?: string[];
  attachments?: string[];
}

export interface Message {
  id: string;
  taskId: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
  attachment?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  role: 'client' | 'freelancer';
  agreeToTerms: boolean;
  subscribeToNews?: boolean;
}