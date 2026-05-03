import { Message, MathStep } from '@/data/types';
import { evaluate, parse, derivative } from 'mathjs';

// Mathematical knowledge base for Goldgama
const mathPatterns = {
  algebra: {
    keywords: ['solve', 'equation', 'factor', 'simplify', 'polynomial', 'quadratic'],
    examples: [
      '2x + 5 = 15',
      'x^2 - 5x + 6 = 0',
      '(x + 3)(x - 2) = 0'
    ]
  },
  calculus: {
    keywords: ['derivative', 'integral', 'limit', 'differentiate', 'antiderivative'],
    examples: [
      'd/dx(x^2 + 3x)',
      '∫x^2 dx',
      'lim x→0 (sin x)/x'
    ]
  },
  geometry: {
    keywords: ['area', 'perimeter', 'volume', 'circle', 'triangle', 'sphere'],
    examples: [
      'area of a circle with radius 5',
      'volume of a sphere with radius 3'
    ]
  },
  trigonometry: {
    keywords: ['sin', 'cos', 'tan', 'angle', 'radian', 'degree'],
    examples: [
      'sin(π/4)',
      'cos(60°)',
      'tan(π/3)'
    ]
  }
};

interface ParsedInput {
  type: 'solve' | 'simplify' | 'derivative' | 'integral' | 'explain' | 'general';
  expression?: string;
  topic?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

function parseInput(input: string): ParsedInput {
  const lowerInput = input.toLowerCase();

  // Check for derivative requests
  if (lowerInput.includes('derivative') || lowerInput.includes('differentiate') || lowerInput.includes('d/dx')) {
    const exprMatch = input.match(/(?:d\/dx\()?([^)]+)\)?$/i) || input.match(/of\s+(.+)/i);
    return {
      type: 'derivative',
      expression: exprMatch ? exprMatch[1] : '',
      level: lowerInput.includes('advanced') ? 'advanced' : 'intermediate'
    };
  }

  // Check for integral requests
  if (lowerInput.includes('integral') || lowerInput.includes('antiderivative') || lowerInput.includes('∫')) {
    const exprMatch = input.match(/∫\s*(.+?)(?:\s*dx)/i) || input.match(/integral\s+(?:of\s+)?(.+)/i);
    return {
      type: 'integral',
      expression: exprMatch ? exprMatch[1] : '',
      level: 'advanced'
    };
  }

  // Check for solve requests
  if (lowerInput.includes('solve') || lowerInput.includes('find x') || lowerInput.includes('find the')) {
    return {
      type: 'solve',
      expression: input.replace(/solve\s*(?:for\s*x\s*)?[:=]?\s*/i, '').replace(/find\s+(?:the\s+)?(?:value\s+of\s+)?x\s*(?:where\s*)?/i, ''),
      level: lowerInput.includes('advanced') ? 'advanced' : 'intermediate'
    };
  }

  // Check for simplify requests
  if (lowerInput.includes('simplify') || lowerInput.includes('expand') || lowerInput.includes('factor')) {
    return {
      type: 'simplify',
      expression: input.replace(/simplify\s*:?\s*/i, '').replace(/expand\s+:?\s*/i, '').replace(/factor\s+:?\s*/i, ''),
      level: 'beginner'
    };
  }

  // Check for explanation requests
  if (lowerInput.includes('explain') || lowerInput.includes('what is') || lowerInput.includes('what are') || lowerInput.includes('how')) {
    return {
      type: 'explain',
      topic: input.replace(/explain\s*:?\s*/i, '').replace(/what\s+(?:is|are)\s+/i, ''),
      level: lowerInput.includes('advanced') ? 'advanced' : 'beginner'
    };
  }

  return {
    type: 'general',
    expression: input,
    level: 'intermediate'
  };
}

function detectTopic(input: string): string {
  const lowerInput = input.toLowerCase();

  for (const [topic, data] of Object.entries(mathPatterns)) {
    for (const keyword of data.keywords) {
      if (lowerInput.includes(keyword)) {
        return topic;
      }
    }
  }

  return 'general';
}

function generateSteps(expression: string, type: string): MathStep[] {
  const steps: MathStep[] = [];

  try {
    const parsed = parse(expression);

    if (type === 'solve') {
      // Generate solving steps
      steps.push({
        expression: expression,
        explanation: 'Start with the original equation',
        rule: 'Given'
      });

      // Try to solve simple equations
      if (expression.includes('=')) {
        const [left, right] = expression.split('=').map(s => s.trim());
        steps.push({
          expression: left,
          explanation: 'Left side of equation',
          rule: 'Equation structure'
        });
        steps.push({
          expression: right,
          explanation: 'Right side of equation',
          rule: 'Equation structure'
        });
      }

      // Evaluate if possible
      try {
        const result = evaluate(expression);
        steps.push({
          expression: `x = ${result}`,
          explanation: 'Solution found by evaluation',
          rule: 'Algebraic evaluation'
        });
      } catch (e) {
        steps.push({
          expression: 'x = ?',
          explanation: 'Cannot evaluate directly - requires algebraic manipulation',
          rule: 'Linear/Quadratic solution'
        });
      }
    } else if (type === 'derivative') {
      steps.push({
        expression: expression,
        explanation: 'Original function to differentiate',
        rule: 'Given'
      });

      try {
        const derivativeResult = derivative(expression, 'x');
        steps.push({
          expression: `d/dx[${expression}]`,
          explanation: 'Applying the derivative operator',
          rule: 'Differentiation'
        });
        steps.push({
          expression: derivativeResult.toString(),
          explanation: 'Using power rule and chain rule',
          rule: 'Power rule: d/dx(x^n) = nx^(n-1)'
        });
      } catch (e) {
        steps.push({
          expression: 'Unable to compute derivative',
          explanation: 'Check the expression format',
          rule: 'Valid mathematical expression required'
        });
      }
    } else if (type === 'simplify') {
      steps.push({
        expression: expression,
        explanation: 'Original expression',
        rule: 'Given'
      });

      try {
        const simplified = evaluate(`simplify(${expression})`);
        steps.push({
          expression: simplified.toString(),
          explanation: 'Combined like terms and applied algebraic rules',
          rule: 'Algebraic simplification'
        });
      } catch (e) {
        steps.push({
          expression: expression,
          explanation: 'Expression may already be in simplest form',
          rule: 'Simplification rules'
        });
      }
    }
  } catch (e) {
    steps.push({
      expression: expression,
      explanation: 'Expression could not be parsed',
      rule: 'Valid mathematical syntax required'
    });
  }

  return steps;
}

function getTopicExplanation(topic: string, level: 'beginner' | 'intermediate' | 'advanced'): string {
  const explanations: Record<string, { beginner: string; intermediate: string; advanced: string }> = {
    algebra: {
      beginner: 'Algebra is the branch of mathematics that uses letters and symbols to represent values and their relations. Think of it as a puzzle where we find missing numbers!',
      intermediate: 'Algebra involves working with variables (like x and y) and constants to form equations and expressions. We use rules like the distributive property to manipulate these.',
      advanced: 'Algebra extends to groups, rings, and fields in abstract algebra. It provides the foundation for understanding mathematical structures and their properties.'
    },
    calculus: {
      beginner: 'Calculus studies how things change. It has two main ideas: derivatives (rates of change) and integrals (areas under curves).',
      intermediate: 'Calculus connects differentiation and integration through the Fundamental Theorem. Derivatives measure instantaneous rates of change, while integrals accumulate quantities.',
      advanced: 'Advanced calculus includes real analysis, dealing with limits, continuity, differentiability, and integrability in rigorous mathematical detail.'
    },
    geometry: {
      beginner: 'Geometry is about shapes - circles, triangles, squares - and their properties like area and perimeter.',
      intermediate: 'Geometry explores the relationships between shapes, angles, and spaces using proofs and coordinate systems.',
      advanced: 'Advanced geometry includes topology, differential geometry, and algebraic geometry, studying spaces and their properties at a fundamental level.'
    },
    trigonometry: {
      beginner: 'Trigonometry is about triangles, especially right triangles, and relationships between their angles and sides using sin, cos, and tan.',
      intermediate: 'Trigonometry extends to circular functions, identities, and solving triangles using Laws of Sines and Cosines.',
      advanced: 'Advanced trigonometry includes Fourier series, complex exponentials (e^ix = cos x + i sin x), and applications in signal processing.'
    }
  };

  return explanations[topic]?.[level] || explanations.algebra[level];
}

function generateResponse(userMessage: string): { content: string; steps: MathStep[] } {
  const parsed = parseInput(userMessage);
  const topic = detectTopic(userMessage);

  switch (parsed.type) {
    case 'derivative':
      const derivSteps = generateSteps(parsed.expression || '', 'derivative');
      return {
        content: `Great question! Let me help you find the derivative of "${parsed.expression}".\n\nLet me work through this step by step...`,
        steps: derivSteps
      };

    case 'solve':
      const solveSteps = generateSteps(parsed.expression || '', 'solve');
      return {
        content: `Let's solve this equation together! I'll break it down into clear steps.\n\nFirst, let me identify what we're working with...`,
        steps: solveSteps
      };

    case 'simplify':
      const simpSteps = generateSteps(parsed.expression || '', 'simplify');
      return {
        content: `Let's simplify this expression! Simplification helps us write things in their simplest, most useful form.\n\nHere's my approach...`,
        steps: simpSteps
      };

    case 'explain':
      return {
        content: `${getTopicExplanation(topic, parsed.level || 'intermediate')}\n\nWould you like me to dive deeper into any specific aspect?`,
        steps: []
      };

    default:
      // Try to evaluate the expression
      try {
        const result = evaluate(userMessage);
        if (typeof result === 'number' || typeof result === 'object') {
          return {
            content: `Interesting! You can calculate "${userMessage}" = ${typeof result === 'object' ? result.toString() : result}.\n\nWould you like me to explain how to solve problems like this step by step?`,
            steps: [{
              expression: userMessage,
              explanation: `The result is ${typeof result === 'object' ? result.toString() : result}`,
              rule: 'Direct evaluation'
            }]
          };
        }
      } catch (e) {
        // Not a direct calculation
      }

      return {
        content: `I'm here to help with mathematics! I can assist with:\n\n• **Solving equations** - Try: "solve 2x + 5 = 15"\n• **Finding derivatives** - Try: "derivative of x^2 + 3x"\n• **Simplifying expressions** - Try: "simplify (x + 2)^2"\n• **Explaining concepts** - Try: "explain derivatives"\n\nWhat would you like to explore?`,
        steps: []
      };
  }
}

// Goldgama AI response generator
export async function getGoldgamaResponse(userMessage: string): Promise<{ content: string; steps: MathStep[] }> {
  // Simulate processing delay for natural feel
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

  return generateResponse(userMessage);
}

export { parseInput, detectTopic, generateSteps };