import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  ChevronRight,
  CheckCircle2,
  Play,
  BarChart3,
  Sparkles,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { lessons, levels, categories, getLessonById, getLessonsByLevel, getLessonsByCategory } from '@/data/lessons';
import { cn } from '@/lib/utils';

export function LearnPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const filteredLessons = useMemo(() => {
    let result = lessons;

    if (selectedLevel !== 'all') {
      result = result.filter(l => l.level === selectedLevel);
    }

    if (selectedCategory !== 'all') {
      result = result.filter(l => l.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(l =>
        l.title.toLowerCase().includes(query) ||
        l.description.toLowerCase().includes(query) ||
        l.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedLevel, selectedCategory, searchQuery]);

  const currentLesson = selectedLesson ? getLessonById(selectedLesson) : null;

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
              <GraduationCap className="w-4 h-4 mr-1" />
              Learning Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Master Mathematics
              <span className="goldgama-text-gradient"> Step by Step</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              From basic concepts to advanced theories, our structured curriculum
              guides you through every mathematical topic.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-responsive py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Lesson List */}
          <div className="lg:w-1/2 xl:w-2/5">
            {/* Search and Filters */}
            <div className="sticky top-24 space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Level Filter */}
              <Tabs value={selectedLevel} onValueChange={setSelectedLevel}>
                <TabsList className="w-full flex-wrap h-auto gap-1">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  {levels.map(level => (
                    <TabsTrigger key={level.id} value={level.id} className="flex-1 text-xs">
                      {level.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories
                </Button>
                {categories.map(cat => (
                  <Button
                    key={cat.name}
                    variant={selectedCategory === cat.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.icon} {cat.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Lesson List */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      hover
                      className={cn(
                        'cursor-pointer transition-all',
                        selectedLesson === lesson.id && 'border-primary ring-2 ring-primary/20'
                      )}
                      onClick={() => setSelectedLesson(lesson.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs">
                                {lesson.category}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs"
                                style={{
                                  borderColor: levels.find(l => l.id === lesson.level)?.color,
                                  color: levels.find(l => l.id === lesson.level)?.color
                                }}
                              >
                                {levels.find(l => l.id === lesson.level)?.name}
                              </Badge>
                            </div>
                            <h3 className="font-semibold truncate">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {lesson.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {lesson.duration} min
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {lesson.exercises.length} exercises
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredLessons.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No lessons found matching your criteria.</p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedLevel('all');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Lesson Detail */}
          <div className="lg:w-1/2 xl:w-3/5">
            <AnimatePresence mode="wait">
              {currentLesson ? (
                <LessonDetail key={currentLesson.id} lesson={currentLesson} />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="sticky top-24"
                >
                  <Card className="h-[600px] flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                      <h3 className="text-xl font-semibold mb-2">Select a Lesson</h3>
                      <p className="text-muted-foreground max-w-md">
                        Choose a lesson from the list to view its content, examples, and exercises.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonDetail({ lesson }: { lesson: typeof lessons[0] }) {
  const [activeTab, setActiveTab] = useState('content');
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [currentExample, setCurrentExample] = useState(0);
  const [showSolution, setShowSolution] = useState<string | null>(null);

  const levelInfo = levels.find(l => l.id === lesson.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Lesson Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{lesson.category}</Badge>
            <Badge
              variant="outline"
              style={{
                borderColor: levelInfo?.color,
                color: levelInfo?.color
              }}
            >
              {levelInfo?.name}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{lesson.title}</CardTitle>
          <p className="text-muted-foreground">{lesson.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {lesson.duration} minutes
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {lesson.exercises.length} exercises
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)} level
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="content" className="flex-1 gap-2">
            <BookOpen className="w-4 h-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex-1 gap-2">
            <Sparkles className="w-4 h-4" />
            Examples
          </TabsTrigger>
          <TabsTrigger value="exercises" className="flex-1 gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Exercises
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {lesson.content}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          <div className="space-y-4">
            {lesson.examples.map((example, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Example {index + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentExample(index)}
                    >
                      {currentExample === index ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  <div className="font-mono bg-muted px-4 py-2 rounded-lg">
                    {example.problem}
                  </div>
                </CardHeader>
                <AnimatePresence>
                  {currentExample === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <CardContent>
                        <div className="space-y-3">
                          <div className="font-semibold text-primary">
                            Solution: {example.solution}
                          </div>
                          <div className="space-y-2">
                            {example.steps.map((step, stepIndex) => (
                              <div
                                key={stepIndex}
                                className="flex gap-4 p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                                  {stepIndex + 1}
                                </div>
                                <div>
                                  <div className="font-mono text-sm">{step.expression}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {step.explanation}
                                    {step.rule && (
                                      <span className="ml-2 italic">({step.rule})</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="mt-6">
          <div className="space-y-4">
            {lesson.exercises.map((exercise, index) => {
              const isCompleted = completedExercises.includes(exercise.problem);
              const isShowingSolution = showSolution === exercise.problem;

              return (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        Exercise {index + 1}
                        {isCompleted && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSolution(isShowingSolution ? null : exercise.problem)}
                        >
                          {isShowingSolution ? 'Hide' : 'Show'} Solution
                        </Button>
                        {!isCompleted && (
                          <Button
                            size="sm"
                            onClick={() => setCompletedExercises([...completedExercises, exercise.problem])}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="font-mono bg-muted px-4 py-2 rounded-lg">
                      {exercise.problem}
                    </div>
                  </CardHeader>
                  <AnimatePresence>
                    {isShowingSolution && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <CardContent>
                          <div className="space-y-4">
                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                              <div className="text-sm text-muted-foreground mb-1">Answer</div>
                              <div className="font-mono font-semibold text-primary">
                                {exercise.answer}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium mb-2">Hints</div>
                              <ul className="space-y-1">
                                {exercise.hints.map((hint, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs flex-shrink-0">
                                      {i + 1}
                                    </span>
                                    {hint}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

export default LearnPage;