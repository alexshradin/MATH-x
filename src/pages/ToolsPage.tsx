import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  LineChart,
  Sigma,
  Trash2,
  Plus,
  ZoomIn,
  ZoomOut,
  Move,
  Copy,
  Check,
  AlertCircle,
  Info,
  RefreshCw,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { evaluate, parse, derivative, simplify } from 'mathjs';
import { cn } from '@/lib/utils';

export function ToolsPage() {
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
              <Calculator className="w-4 h-4 mr-1" />
              Math Tools
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Interactive
              <span className="goldgama-text-gradient"> Mathematics Tools</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Visualize functions, solve equations, and calculate step-by-step solutions
              with our powerful mathematical tools.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-responsive py-8">
        <Tabs defaultValue="graph" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="graph" className="gap-2">
              <LineChart className="w-4 h-4" />
              Graph Visualizer
            </TabsTrigger>
            <TabsTrigger value="solver" className="gap-2">
              <Sigma className="w-4 h-4" />
              Equation Solver
            </TabsTrigger>
            <TabsTrigger value="calculator" className="gap-2">
              <Calculator className="w-4 h-4" />
              Step Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="graph">
            <GraphVisualizer />
          </TabsContent>

          <TabsContent value="solver">
            <EquationSolver />
          </TabsContent>

          <TabsContent value="calculator">
            <StepCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Graph Visualizer Component
function GraphVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [functions, setFunctions] = useState([
    { id: '1', expression: 'x^2', color: '#D4AF37', visible: true },
    { id: '2', expression: 'sin(x)', color: '#6366f1', visible: true }
  ]);
  const [newExpression, setNewExpression] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const colors = ['#D4AF37', '#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#ec4899'];

  const addFunction = () => {
    if (!newExpression.trim()) return;
    const newFunc = {
      id: Date.now().toString(),
      expression: newExpression,
      color: colors[functions.length % colors.length],
      visible: true
    };
    setFunctions([...functions, newFunc]);
    setNewExpression('');
  };

  const removeFunction = (id: string) => {
    setFunctions(functions.filter(f => f.id !== id));
  };

  const toggleVisibility = (id: string) => {
    setFunctions(functions.map(f =>
      f.id === id ? { ...f, visible: !f.visible } : f
    ));
  };

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2 + pan.x * zoom;
    const centerY = height / 2 + pan.y * zoom;
    const unitSize = 50 * zoom;

    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue('--background').trim() || '#09090b';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
    ctx.lineWidth = 1;

    const gridSpacing = unitSize;
    const startX = (-centerX % gridSpacing);
    const startY = (-centerY % gridSpacing);

    for (let x = startX; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = startY; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(128, 128, 128, 0.6)';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = 'rgba(128, 128, 128, 0.8)';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';

    const labelCount = Math.floor(width / gridSpacing / 2);
    for (let i = -labelCount; i <= labelCount; i++) {
      if (i === 0) continue;
      const x = centerX + i * gridSpacing;
      ctx.fillText(i.toString(), x, centerY + 15);
    }

    ctx.textAlign = 'right';
    for (let i = -labelCount; i <= labelCount; i++) {
      if (i === 0) continue;
      const y = centerY - i * gridSpacing;
      ctx.fillText(i.toString(), centerX - 5, y + 4);
    }

    // Draw functions
    functions.filter(f => f.visible).forEach(func => {
      ctx.strokeStyle = func.color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      let firstPoint = true;
      const xRange = [-width / 2 / unitSize, width / 2 / unitSize];

      for (let px = 0; px < width; px++) {
        const x = (px - centerX) / unitSize;
        try {
          const y = evaluate(func.expression, { x });
          if (isFinite(y) && !isNaN(y)) {
            const screenY = centerY - y * unitSize;
            if (firstPoint) {
              ctx.moveTo(px, screenY);
              firstPoint = false;
            } else {
              ctx.lineTo(px, screenY);
            }
          } else {
            firstPoint = true;
          }
        } catch (e) {
          firstPoint = true;
        }
      }

      ctx.stroke();
    });
  }, [functions, zoom, pan]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = 500;
        drawGraph();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawGraph]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Graph Canvas */}
      <div className="lg:col-span-2">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-primary" />
              Function Graph
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoom(z => Math.min(z * 1.5, 5))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoom(z => Math.max(z / 1.5, 0.2))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="relative bg-muted/50 rounded-lg overflow-hidden cursor-move"
              style={{ height: 500 }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                <span className="text-muted-foreground">Zoom: </span>
                <span className="font-mono">{Math.round(zoom * 100)}%</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                <Move className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Drag to pan</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Function List */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Function</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g., x^2, sin(x), e^x"
                value={newExpression}
                onChange={(e) => setNewExpression(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addFunction()}
              />
              <Button onClick={addFunction} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Supported: +, -, *, /, ^, sqrt, sin, cos, tan, log, exp, pi, e
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Functions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {functions.map((func) => (
              <div
                key={func.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg transition-colors',
                  func.visible ? 'bg-muted/50' : 'opacity-50'
                )}
              >
                <div
                  className="w-4 h-4 rounded-full cursor-pointer"
                  style={{ backgroundColor: func.color }}
                  onClick={() => toggleVisibility(func.id)}
                />
                <span className="flex-1 font-mono text-sm">{func.expression}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => removeFunction(func.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {functions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No functions added yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Equation Solver Component
function EquationSolver() {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [history, setHistory] = useState<{ eq: string; result: string }[]>([]);

  const solveEquation = () => {
    if (!equation.trim()) {
      setResult({ type: 'error', message: 'Please enter an equation' });
      return;
    }

    try {
      // Try to solve the equation
      let solution: string;

      if (equation.includes('=')) {
        // Solve equation
        const [left, right] = equation.split('=').map(s => s.trim());
        const expr = `${left} - (${right})`;

        // Check if it's a polynomial we can solve
        if (equation.includes('x^2') || equation.includes('x²')) {
          // Quadratic formula for ax² + bx + c = 0
          setResult({
            type: 'info',
            message: 'This appears to be a quadratic equation. For ax² + bx + c = 0, the solutions are: x = (-b ± √(b² - 4ac)) / 2a'
          });
        } else {
          const simplified = simplify(expr).toString();
          const evalResult = evaluate(simplified);

          if (simplified === '0') {
            solution = 'All real numbers (identity)';
          } else if (evalResult.toString() === simplified) {
            solution = `x = ${evalResult}`;
          } else {
            solution = `x = ${simplified === 'x' ? 'any' : simplified}`;
          }

          setResult({ type: 'success', message: solution });
          setHistory([{ eq: equation, result: solution }, ...history.slice(0, 9)]);
        }
      } else {
        // Just evaluate expression
        const evalResult = evaluate(equation);
        setResult({ type: 'success', message: `= ${evalResult}` });
        setHistory([{ eq: equation, result: String(evalResult) }, ...history.slice(0, 9)]);
      }
    } catch (e) {
      setResult({ type: 'error', message: 'Could not solve this equation. Please check the syntax.' });
    }
  };

  const solveFor = (variable: string) => {
    setEquation(`${variable} = `);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sigma className="w-5 h-5 text-primary" />
            Equation Solver
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter Equation</label>
            <Input
              placeholder="e.g., 2x + 5 = 15 or x^2 - 4 = 0"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && solveEquation()}
              className="font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => solveFor('x')}>Solve for x</Button>
            <Button variant="outline" size="sm" onClick={() => solveFor('y')}>Solve for y</Button>
            <Button variant="outline" size="sm" onClick={() => setEquation('ax^2 + bx + c = 0')}>Quadratic</Button>
          </div>

          <Button onClick={solveEquation} className="w-full" size="lg">
            <Play className="w-4 h-4 mr-2" />
            Solve
          </Button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  'p-4 rounded-lg border',
                  result.type === 'success' && 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400',
                  result.type === 'error' && 'bg-destructive/10 border-destructive/30 text-destructive',
                  result.type === 'info' && 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                )}
              >
                <div className="flex items-start gap-3">
                  {result.type === 'success' && <Check className="w-5 h-5 mt-0.5" />}
                  {result.type === 'error' && <AlertCircle className="w-5 h-5 mt-0.5" />}
                  {result.type === 'info' && <Info className="w-5 h-5 mt-0.5" />}
                  <span className="font-mono">{result.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Solves</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => setEquation(item.eq)}
                >
                  <span className="font-mono text-sm">{item.eq}</span>
                  <Badge variant="secondary">{item.result}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Sigma className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your solved equations will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Examples */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Quick Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { eq: '2x + 5 = 15', label: 'Linear Equation' },
              { eq: 'x^2 - 9 = 0', label: 'Quadratic' },
              { eq: '3x + 7 = 2x + 12', label: 'Solve for x' },
              { eq: 'x^2 + 5x + 6 = 0', label: 'Factorable Quadratic' },
              { eq: 'sqrt(x) = 4', label: 'Radical Equation' },
              { eq: '2^x = 16', label: 'Exponential' }
            ].map((example) => (
              <Button
                key={example.eq}
                variant="outline"
                className="justify-start h-auto py-3"
                onClick={() => setEquation(example.eq)}
              >
                <div className="text-left">
                  <div className="font-mono text-sm">{example.eq}</div>
                  <div className="text-xs text-muted-foreground">{example.label}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Step Calculator Component
function StepCalculator() {
  const [expression, setExpression] = useState('');
  const [steps, setSteps] = useState<{ step: string; explanation: string; rule?: string }[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    if (!expression.trim()) {
      setError('Please enter an expression');
      return;
    }

    setSteps([]);
    setError(null);

    try {
      const parsed = parse(expression);
      const simplified = simplify(expression);

      // Add original expression
      setSteps([{
        step: expression,
        explanation: 'Original expression',
        rule: 'Given'
      }]);

      // Add simplification step
      if (simplified.toString() !== expression) {
        setSteps(steps => [...steps, {
          step: simplified.toString(),
          explanation: 'Simplified expression',
          rule: 'Algebraic simplification'
        }]);
      }

      // Try to evaluate
      const evalResult = evaluate(expression);
      setResult(String(evalResult));

      setSteps(steps => [...steps, {
        step: `= ${evalResult}`,
        explanation: `Final result: ${evalResult}`,
        rule: 'Evaluation'
      }]);

    } catch (e) {
      setError('Could not evaluate this expression. Please check the syntax.');
    }
  };

  const differentiate = () => {
    if (!expression.trim()) {
      setError('Please enter an expression');
      return;
    }

    setSteps([]);
    setError(null);

    try {
      const deriv = derivative(expression, 'x');

      setSteps([{
        step: expression,
        explanation: 'Original function',
        rule: 'Given'
      }]);

      setSteps(steps => [...steps, {
        step: `d/dx[${expression}]`,
        explanation: 'Applying the derivative operator',
        rule: 'Differentiation'
      }]);

      const derivStr = deriv.toString();
      setSteps(steps => [...steps, {
        step: derivStr,
        explanation: 'Using power rule and chain rule',
        rule: 'Power rule: d/dx(x^n) = nx^(n-1)'
      }]);

      setResult(derivStr);

    } catch (e) {
      setError('Could not differentiate this expression.');
    }
  };

  const clearAll = () => {
    setExpression('');
    setSteps([]);
    setResult(null);
    setError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Step-by-Step Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Enter Expression</label>
          <Input
            placeholder="e.g., (x + 2)^2 or sin(x) + cos(x)"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && calculate()}
            className="font-mono text-lg"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate} className="gap-2">
            <Calculator className="w-4 h-4" />
            Calculate
          </Button>
          <Button variant="outline" onClick={differentiate} className="gap-2">
            <Sigma className="w-4 h-4" />
            Differentiate
          </Button>
          <Button variant="ghost" onClick={clearAll} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Clear
          </Button>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps */}
        {steps.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Solution Steps</h3>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-lg text-primary">{step.step}</div>
                  <div className="text-sm text-muted-foreground mt-1">{step.explanation}</div>
                  {step.rule && (
                    <div className="text-xs text-muted-foreground/70 italic mt-1">
                      Rule: {step.rule}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Examples */}
        <div className="space-y-3">
          <h3 className="font-semibold">Try These</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '(x + 2)^2',
              'x^3 + 2x^2 - 5x + 1',
              'sin(x) + cos(x)',
              'sqrt(x + 1)',
              'ln(x^2)',
              'e^x * e^(-x)'
            ].map((expr) => (
              <Button
                key={expr}
                variant="outline"
                size="sm"
                className="font-mono"
                onClick={() => setExpression(expr)}
              >
                {expr}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ToolsPage;