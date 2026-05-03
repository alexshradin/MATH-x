import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Brain,
  BookOpen,
  Calculator,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
  Play,
  CheckCircle2,
  Star,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { lessons, levels, categories } from '@/data/lessons';
import { getGoldgamaResponse } from '@/lib/goldgamaEngine';

export function HomePage() {
  const [demoInput, setDemoInput] = useState('');
  const [demoOutput, setDemoOutput] = useState('');
  const [isDemoTyping, setIsDemoTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleDemo = async () => {
    if (!demoInput.trim()) return;
    setIsDemoTyping(true);
    setDemoOutput('');

    try {
      const response = await getGoldgamaResponse(demoInput);
      setDemoOutput(response.content);
    } catch (e) {
      setDemoOutput('I encountered an issue. Please try again.');
    } finally {
      setIsDemoTyping(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-4">
        <motion.div
          style={{ y, opacity }}
          className="container-responsive text-center relative z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Badge variant="default" className="px-4 py-2 text-sm gap-2">
              <Sparkles className="w-4 h-4" />
              Powered by Advanced AI
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Understand Mathematics.
            <br />
            <span className="goldgama-text-gradient">From Zero to Infinity.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Powered by Goldgama — your intelligent guide through the world of mathematics.
            From basic arithmetic to advanced calculus, we adapt to your learning style.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/learn">
              <Button size="xl" className="gap-2 group">
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="backdrop-blur-xl bg-card/80 border-2 border-primary/20 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  Try Goldgama Now
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask anything... e.g., 'solve x^2 + 5x + 6 = 0'"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDemo()}
                    className="flex-1"
                  />
                  <Button onClick={handleDemo} disabled={isDemoTyping || !demoInput.trim()}>
                    Ask
                  </Button>
                </div>

                <AnimatePresence>
                  {isDemoTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-muted/50 rounded-lg p-4"
                    >
                      <div className="typing-indicator">
                        <span />
                        <span />
                        <span />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {demoOutput && !isDemoTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-muted/50 rounded-lg p-4 text-sm whitespace-pre-wrap"
                    >
                      {demoOutput}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="goldgama-text-gradient"> Excel in Math</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with proven pedagogical methods
              to create the ultimate mathematics learning experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-24 px-4 relative bg-muted/30">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">Learning Path</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your Journey from
              <span className="goldgama-text-gradient"> Zero to Expert</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow our structured curriculum designed to take you from basic concepts
              to advanced mathematical mastery.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-yellow-500 -translate-y-1/2 z-0 rounded-full" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {levels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <Card
                    hover
                    className={cn(
                      'text-center group cursor-pointer',
                      'hover:border-primary/50'
                    )}
                  >
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: level.color }}
                    >
                      {level.lessons} Lessons
                    </div>
                    <CardHeader className="pt-8">
                      <h3 className="text-xl font-bold">{level.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {level.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/learn?level=${level.id}`}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                          Explore
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 relative">
        <div className="container-responsive">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold goldgama-text-gradient mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4 relative bg-muted/30">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">Categories</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Explore
              <span className="goldgama-text-gradient"> Mathematical Topics</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/learn?category=${category.name}`}>
                  <Card hover className="flex items-center justify-between p-4 group">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{category.icon}</div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.count} lessons
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
            <div className="absolute inset-0 backdrop-blur-3xl" />

            <div className="relative p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Transform Your
                <br />
                <span className="goldgama-text-gradient">Mathematical Journey?</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of learners who have already discovered the power of
                intelligent, adaptive mathematics education.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/learn">
                  <Button size="xl" className="gap-2">
                    Start for Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl">
                  View Syllabus
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Helper Components
function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const equations = [
    'x² + y² = r²',
    'e = mc²',
    '∫f(x)dx',
    'd/dx(sin x)',
    '√(a² + b²)',
    'πr²',
    'a² + b² = c²',
    'log₂(8) = 3',
    '∑xᵢ',
    '∂f/∂x'
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="dark:hidden absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Floating Equations */}
      {equations.map((eq, i) => (
        <motion.div
          key={eq}
          className="absolute text-primary/10 font-mono text-lg pointer-events-none select-none"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            rotate: Math.random() * 360
          }}
          animate={{
            y: [null, `${Math.random() * 20 - 10}%`],
            rotate: [null, Math.random() * 20 - 10]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          style={{ left: `${(i / equations.length) * 100}%` }}
        >
          {eq}
        </motion.div>
      ))}

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Data
const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Goldgama adapts to your learning style, providing personalized explanations and hints when you need them most.'
  },
  {
    icon: Calculator,
    title: 'Interactive Tools',
    description: 'Graph visualizers, equation solvers, and step-by-step calculators help you understand complex concepts visually.'
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'From basic arithmetic to advanced calculus, our structured lessons cover every level of mathematical proficiency.'
  },
  {
    icon: TrendingUp,
    title: 'Adaptive Difficulty',
    description: 'Problems automatically adjust to your skill level, ensuring you\'re always challenged but never overwhelmed.'
  },
  {
    icon: Users,
    title: 'Progress Tracking',
    description: 'Visualize your learning journey with detailed analytics and track your improvement over time.'
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Get immediate feedback on your work with detailed explanations for both correct and incorrect answers.'
  }
];

const stats = [
  { value: '45+', label: 'Interactive Lessons' },
  { value: '10K+', label: 'Students Helped' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '4.9', label: 'Average Rating' }
];

export default HomePage;