import React from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  steps?: MathStep[];
}

export interface MathStep {
  expression: string;
  explanation: string;
  rule?: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  weakAreas: string[];
  strongAreas: string[];
  completedLessons: string[];
  currentLesson?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'foundations' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  content: string;
  examples: Example[];
  exercises: Exercise[];
  duration: number;
}

export interface Example {
  problem: string;
  solution: string;
  steps: MathStep[];
}

export interface Exercise {
  problem: string;
  answer: string;
  hints: string[];
}

export interface GraphFunction {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}