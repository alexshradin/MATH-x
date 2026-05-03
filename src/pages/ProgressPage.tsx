import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Calendar,
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  Flame,
  Trophy,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { lessons, levels } from '@/data/lessons';
import { cn } from '@/lib/utils';

export function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  // Mock user data
  const userStats = {
    totalLessons: 15,
    completedLessons: 7,
    totalExercises: 45,
    completedExercises: 28,
    totalTime: 180, // minutes
    streak: 5,
    longestStreak: 12,
    rank: 'Rising Star',
    xp: 1250,
    level: 5
  };

  const recentActivity = [
    { type: 'lesson', title: 'Quadratic Equations', date: '2 hours ago', xp: 50 },
    { type: 'exercise', title: 'Derivatives Practice', date: '4 hours ago', xp: 25 },
    { type: 'lesson', title: 'Introduction to Derivatives', date: 'Yesterday', xp: 75 },
    { type: 'exercise', title: 'Integration Basics', date: '2 days ago', xp: 30 },
    { type: 'lesson', title: 'Matrix Operations', date: '3 days ago', xp: 60 }
  ];

  const levelProgress = {
    current: userStats.xp % 500,
    required: 500,
    percentage: (userStats.xp % 500) / 500 * 100
  };

  const achievements = [
    { icon: Flame, title: '5 Day Streak', description: 'Complete lessons 5 days in a row', unlocked: true, color: '#f59e0b' },
    { icon: Trophy, title: 'First Steps', description: 'Complete your first lesson', unlocked: true, color: '#22c55e' },
    { icon: Star, title: 'Quick Learner', description: 'Complete 10 lessons', unlocked: true, color: '#6366f1' },
    { icon: Award, title: 'Math Master', description: 'Complete all advanced lessons', unlocked: false, color: '#D4AF37' },
    { icon: Target, title: 'Perfect Score', description: 'Get 100% on 5 exercises', unlocked: false, color: '#ef4444' },
    { icon: BookOpen, title: 'Bookworm', description: 'Spend 10 hours learning', unlocked: false, color: '#8b5cf6' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container-responsive py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <Badge variant="default" className="mb-4">
              <BarChart3 className="w-4 h-4 mr-1" />
              Your Progress
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Track Your
              <span className="goldgama-text-gradient"> Learning Journey</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitor your progress, celebrate achievements, and see how far you've come.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-responsive py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{userStats.completedLessons}/{userStats.totalLessons}</div>
                    <div className="text-sm text-muted-foreground">Lessons Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{userStats.completedExercises}/{userStats.totalExercises}</div>
                    <div className="text-sm text-muted-foreground">Exercises Done</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{userStats.streak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{userStats.xp}</div>
                    <div className="text-sm text-muted-foreground">Total XP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Level {userStats.level}
                  </CardTitle>
                  <Badge variant="secondary">{userStats.rank}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress to Level {userStats.level + 1}</span>
                    <span className="text-sm font-mono">{levelProgress.current}/{levelProgress.required} XP</span>
                  </div>
                  <Progress value={levelProgress.percentage} variant="default" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-2xl font-bold text-primary">{userStats.xp}</div>
                    <div className="text-sm text-muted-foreground">Total XP Earned</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{userStats.longestStreak}</div>
                    <div className="text-sm text-muted-foreground">Longest Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Path */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Learning Path Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {levels.map((level, index) => {
                    const levelLessons = lessons.filter(l => l.level === level.id);
                    const completedCount = Math.floor(Math.random() * levelLessons.length); // Mock data

                    return (
                      <div key={level.id} className="relative">
                        {/* Connection Line */}
                        {index < levels.length - 1 && (
                          <div
                            className="absolute left-4 top-12 bottom-0 w-0.5"
                            style={{
                              background: `linear-gradient(to bottom, ${level.color}, ${levels[index + 1].color})`
                            }}
                          />
                        )}

                        <div className="flex items-start gap-4">
                          {/* Level Icon */}
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold z-10"
                            style={{ backgroundColor: level.color }}
                          >
                            {index + 1}
                          </div>

                          {/* Level Content */}
                          <div className="flex-1 pb-6">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{level.name}</h4>
                              <span className="text-sm text-muted-foreground">
                                {completedCount}/{levelLessons.length} lessons
                              </span>
                            </div>
                            <Progress
                              value={(completedCount / levelLessons.length) * 100}
                              variant="default"
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        activity.type === 'lesson' ? 'bg-primary/20 text-primary' : 'bg-green-500/20 text-green-500'
                      )}>
                        {activity.type === 'lesson' ? (
                          <BookOpen className="w-5 h-5" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.date}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      +{activity.xp} XP
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className={cn(
                      'relative p-4 rounded-xl border transition-all',
                      achievement.unlocked
                        ? 'bg-muted/50 border-border'
                        : 'bg-muted/20 border-border/50 opacity-60'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center',
                          achievement.unlocked
                            ? 'text-white'
                            : 'bg-muted text-muted-foreground'
                        )}
                        style={achievement.unlocked ? { backgroundColor: achievement.color } : {}}
                      >
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className={cn(
                          'font-semibold',
                          !achievement.unlocked && 'text-muted-foreground'
                        )}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default ProgressPage;