import { Lesson, Example, Exercise } from './types';

export const lessons: Lesson[] = [
  // Foundations Level
  {
    id: 'foundations-algebra-1',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and simple equations.',
    level: 'foundations',
    category: 'Algebra',
    content: `
# Introduction to Algebra

Algebra is the foundation of mathematics. It uses letters and symbols to represent numbers and quantities in formulas and equations.

## What is a Variable?

A variable is a symbol (usually a letter) that represents an unknown value. Common variables include x, y, z, a, b, and c.

**Example:** In the equation x + 5 = 10, x is the variable.

## Basic Operations

We can perform the same operations on algebraic expressions as we do with numbers:

- **Addition:** 2x + 3x = 5x
- **Subtraction:** 7y - 2y = 5y
- **Multiplication:** 3 × 2x = 6x
- **Division:** 8x ÷ 2 = 4x

## Solving Simple Equations

To solve an equation, we isolate the variable on one side:

**Example:** x + 5 = 10
- Subtract 5 from both sides: x + 5 - 5 = 10 - 5
- Simplify: x = 5
    `,
    examples: [
      {
        problem: 'Solve: x + 7 = 15',
        solution: 'x = 8',
        steps: [
          { expression: 'x + 7 = 15', explanation: 'Start with the original equation', rule: 'Given' },
          { expression: 'x + 7 - 7 = 15 - 7', explanation: 'Subtract 7 from both sides', rule: 'Subtraction Property of Equality' },
          { expression: 'x = 8', explanation: 'Simplify to find x', rule: 'Result' }
        ]
      },
      {
        problem: 'Simplify: 3x + 2x',
        solution: '5x',
        steps: [
          { expression: '3x + 2x', explanation: 'Both terms have the same variable', rule: 'Like terms' },
          { expression: '3x + 2x = (3 + 2)x', explanation: 'Factor out the common variable', rule: 'Distributive Property' },
          { expression: '5x', explanation: 'Add the coefficients', rule: 'Simplification' }
        ]
      }
    ],
    exercises: [
      { problem: 'Solve: x - 3 = 10', answer: 'x = 13', hints: ['Add 3 to both sides', 'x = 10 + 3'] },
      { problem: 'Simplify: 4y + y', answer: '5y', hints: ['Combine like terms', '4 + 1 = 5'] },
      { problem: 'Solve: 2x = 14', answer: 'x = 7', hints: ['Divide both sides by 2', '14 ÷ 2 = 7'] }
    ],
    duration: 30
  },
  {
    id: 'foundations-fractions',
    title: 'Understanding Fractions',
    description: 'Master the basics of fractions and their operations.',
    level: 'foundations',
    category: 'Arithmetic',
    content: `
# Understanding Fractions

A fraction represents a part of a whole. It consists of a numerator (top) and denominator (bottom).

## Fraction Basics

**Example:** In 3/4:
- 3 is the numerator (parts we have)
- 4 is the denominator (total parts)

## Types of Fractions

- **Proper:** Numerator < Denominator (3/4)
- **Improper:** Numerator > Denominator (5/3)
- **Mixed:** Whole number + fraction (2 1/2)

## Operations with Fractions

**Addition:** Find common denominator, then add numerators
**Subtraction:** Same as addition, subtract numerators
**Multiplication:** Multiply numerators, multiply denominators
**Division:** Multiply by the reciprocal
    `,
    examples: [
      {
        problem: 'Add: 1/4 + 1/4',
        solution: '1/2',
        steps: [
          { expression: '1/4 + 1/4', explanation: 'Same denominator', rule: 'Like denominators' },
          { expression: '(1 + 1)/4', explanation: 'Add numerators', rule: 'Addition rule' },
          { expression: '2/4 = 1/2', explanation: 'Simplify by dividing by 2', rule: 'Reduce fraction' }
        ]
      }
    ],
    exercises: [
      { problem: 'Multiply: 1/2 × 3/4', answer: '3/8', hints: ['Multiply numerators', 'Multiply denominators'] },
      { problem: 'Divide: 1/2 ÷ 2', answer: '1/4', hints: ['Multiply by reciprocal', '2 = 2/1'] }
    ],
    duration: 25
  },

  // Intermediate Level
  {
    id: 'intermediate-quadratic',
    title: 'Quadratic Equations',
    description: 'Learn to solve quadratic equations using multiple methods.',
    level: 'intermediate',
    category: 'Algebra',
    content: `
# Quadratic Equations

A quadratic equation is a second-degree polynomial equation in the form:

ax² + bx + c = 0, where a ≠ 0

## Methods of Solving

### 1. Factoring
Express the quadratic as a product of two binomials.

### 2. Quadratic Formula
x = (-b ± √(b² - 4ac)) / 2a

### 3. Completing the Square
Rewrite in vertex form.

### 4. Graphical Method
Find where the parabola intersects the x-axis.
    `,
    examples: [
      {
        problem: 'Solve: x² - 5x + 6 = 0',
        solution: 'x = 2 or x = 3',
        steps: [
          { expression: 'x² - 5x + 6 = 0', explanation: 'Original quadratic equation', rule: 'Given' },
          { expression: '(x - 2)(x - 3) = 0', explanation: 'Factor the quadratic', rule: 'Factoring' },
          { expression: 'x - 2 = 0 or x - 3 = 0', explanation: 'Set each factor to zero', rule: 'Zero Product Property' },
          { expression: 'x = 2 or x = 3', explanation: 'Solutions', rule: 'Result' }
        ]
      }
    ],
    exercises: [
      { problem: 'Solve: x² - 9 = 0', answer: 'x = 3 or x = -3', hints: ['This is a difference of squares', 'x² - 9 = (x - 3)(x + 3)'] },
      { problem: 'Solve using formula: x² + 4x + 4 = 0', answer: 'x = -2', hints: ['Use quadratic formula', 'Discriminant = 16 - 16 = 0'] }
    ],
    duration: 45
  },
  {
    id: 'intermediate-derivatives',
    title: 'Introduction to Derivatives',
    description: 'Understand the concept of derivatives and basic differentiation rules.',
    level: 'intermediate',
    category: 'Calculus',
    content: `
# Introduction to Derivatives

The derivative measures the rate of change of a function at any point.

## Definition

The derivative of f(x) is defined as:

f'(x) = lim(h→0) [f(x+h) - f(x)] / h

## Power Rule

For f(x) = xⁿ, the derivative is:

f'(x) = n·xⁿ⁻¹

## Common Derivatives

- d/dx(x²) = 2x
- d/dx(x³) = 3x²
- d/dx(constant) = 0
- d/dx(sin x) = cos x
- d/dx(cos x) = -sin x
    `,
    examples: [
      {
        problem: 'Find d/dx(x³ + 2x²)',
        solution: '3x² + 4x',
        steps: [
          { expression: 'd/dx(x³ + 2x²)', explanation: 'Original function', rule: 'Given' },
          { expression: 'd/dx(x³) + d/dx(2x²)', explanation: 'Sum rule', rule: 'Sum Rule' },
          { expression: '3x² + 4x', explanation: 'Apply power rule to each term', rule: 'Power Rule' }
        ]
      }
    ],
    exercises: [
      { problem: 'Find d/dx(5x²)', answer: '10x', hints: ['Apply power rule', '5 × 2 × x^(2-1)'] },
      { problem: 'Find d/dx(x⁴ - 3x)', answer: '4x³ - 3', hints: ['Differentiate each term', 'Apply power rule to x⁴ and 3x'] }
    ],
    duration: 40
  },

  // Advanced Level
  {
    id: 'advanced-integrals',
    title: 'Integration Techniques',
    description: 'Master advanced integration methods including substitution and integration by parts.',
    level: 'advanced',
    category: 'Calculus',
    content: `
# Integration Techniques

Integration is the reverse of differentiation. We find the antiderivative of a function.

## Basic Integration Rules

- ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (for n ≠ -1)
- ∫eˣ dx = eˣ + C
- ∫1/x dx = ln|x| + C

## Integration by Parts

∫u dv = uv - ∫v du

## U-Substitution

Reverse of the chain rule.
    `,
    examples: [
      {
        problem: '∫2x dx',
        solution: 'x² + C',
        steps: [
          { expression: '∫2x dx', explanation: 'Original integral', rule: 'Given' },
          { expression: '2 ∫x dx', explanation: 'Constant multiple rule', rule: '∫cf(x)dx = c∫f(x)dx' },
          { expression: '2 · x²/2 + C', explanation: 'Apply power rule', rule: '∫xⁿdx = xⁿ⁺¹/(n+1)' },
          { expression: 'x² + C', explanation: 'Simplify', rule: 'Result' }
        ]
      }
    ],
    exercises: [
      { problem: '∫x² dx', answer: 'x³/3 + C', hints: ['Use power rule', 'Add 1 to exponent and divide'] },
      { problem: '∫(3x² + 2x) dx', answer: 'x³ + x² + C', hints: ['Integrate term by term', 'Apply power rule'] }
    ],
    duration: 50
  },
  {
    id: 'advanced-matrices',
    title: 'Matrix Operations',
    description: 'Learn matrix operations, determinants, and applications.',
    level: 'advanced',
    category: 'Linear Algebra',
    content: `
# Matrix Operations

A matrix is a rectangular array of numbers arranged in rows and columns.

## Matrix Operations

### Addition
Matrices of the same size can be added by adding corresponding elements.

### Multiplication
The (i,j)-entry of AB is the dot product of row i of A and column j of B.

### Transpose
Swap rows and columns: Aᵀ[i][j] = A[j][i]

## Determinant

For a 2×2 matrix:
det(A) = ad - bc

For a 3×3 matrix, use cofactor expansion.
    `,
    examples: [
      {
        problem: 'Find the determinant: | 3  2 |',
        solution: '11',
        steps: [
          { expression: '| 3  2 |', explanation: 'Original matrix', rule: 'Given' },
          { expression: '| 1  4 |', explanation: '', rule: '' },
          { expression: 'det = (3)(4) - (2)(1)', explanation: 'Apply 2×2 determinant formula', rule: 'det = ad - bc' },
          { expression: 'det = 12 - 1 = 11', explanation: 'Calculate', rule: 'Result' }
        ]
      }
    ],
    exercises: [
      { problem: 'Add: [1 2] + [3 4]', answer: '[4 6]', hints: ['Add corresponding elements', '[1+3, 2+4]'] },
      { problem: 'Find det: | 2  5 |', answer: '-7', hints: ['det = ad - bc', '2×1 - 5×3'] }
    ],
    duration: 55
  },

  // Expert Level
  {
    id: 'expert-differential-equations',
    title: 'Differential Equations',
    description: 'Solve ordinary differential equations using various methods.',
    level: 'expert',
    category: 'Calculus',
    content: `
# Differential Equations

A differential equation relates a function to its derivatives.

## First-Order ODEs

### Separable Equations
dy/dx = f(x)g(y)
Separate variables and integrate.

### Linear Equations
dy/dx + P(x)y = Q(x)
Use integrating factor μ(x) = e^(∫P(x)dx)

## Second-Order ODEs

### Homogeneous with Constant Coefficients
ay'' + by' + cy = 0
Solve characteristic equation.

## Applications

- Population dynamics
- Electrical circuits
- Heat transfer
    `,
    examples: [
      {
        problem: 'Solve: dy/dx = xy',
        solution: 'y = Ce^(x²/2)',
        steps: [
          { expression: 'dy/dx = xy', explanation: 'Original differential equation', rule: 'Given' },
          { expression: 'dy/y = x dx', explanation: 'Separate variables', rule: 'Separation' },
          { expression: '∫dy/y = ∫x dx', explanation: 'Integrate both sides', rule: 'Integration' },
          { expression: 'ln|y| = x²/2 + C', explanation: 'Evaluate integrals', rule: 'Result' },
          { expression: 'y = Ce^(x²/2)', explanation: 'Solve for y', rule: 'Exponentiate' }
        ]
      }
    ],
    exercises: [
      { problem: 'Solve: dy/dx = 2y', answer: 'y = Ce^(2x)', hints: ['Separate variables', 'dy/y = 2dx'] },
      { problem: 'Solve: dy/dx = x/y', answer: 'y² = x² + C', hints: ['Separate: y dy = x dx', 'Integrate both sides'] }
    ],
    duration: 60
  },
  {
    id: 'expert-abstract-algebra',
    title: 'Abstract Algebra',
    description: 'Explore groups, rings, and fields at an advanced level.',
    level: 'expert',
    category: 'Algebra',
    content: `
# Abstract Algebra

Abstract algebra studies algebraic structures like groups, rings, and fields.

## Groups

A set G with an operation * satisfying:
1. **Closure:** a, b ∈ G ⇒ a*b ∈ G
2. **Associativity:** (a*b)*c = a*(b*c)
3. **Identity:** ∃e ∈ G such that e*a = a*e = a
4. **Inverses:** ∀a ∈ G, ∃a⁻¹ ∈ G with a*a⁻¹ = e

## Rings

A set with two operations (+, ×) where:
- (R, +) is an abelian group
- Multiplication is associative
- Distributive laws hold

## Fields

A ring where:
- (F, +) is abelian
- (F \ {0}, ×) is an abelian group
    `,
    examples: [
      {
        problem: 'Show that Z₅ is a field',
        solution: 'Every non-zero element has a multiplicative inverse',
        steps: [
          { expression: 'Z₅ = {0, 1, 2, 3, 4}', explanation: 'Set of integers mod 5', rule: 'Given' },
          { expression: '1⁻¹ = 1, 2⁻¹ = 3 (2·3 = 6 ≡ 1)', explanation: 'Find inverses', rule: 'Check inverses' },
          { expression: '3⁻¹ = 2, 4⁻¹ = 4 (4·4 = 16 ≡ 1)', explanation: 'Continue finding inverses', rule: 'Check inverses' },
          { expression: 'All non-zero elements have inverses', explanation: 'Therefore Z₅ is a field', rule: 'Definition of field' }
        ]
      }
    ],
    exercises: [
      { problem: 'Is Z₆ a field?', answer: 'No - 2 has no inverse (2·3 = 6 ≡ 0)', hints: ['Check if every non-zero element has inverse', 'In Z₆, 2 × 3 = 6 ≡ 0'] },
      { problem: 'Verify (Z₄, +) is an abelian group', answer: 'Closed, associative, identity 0, inverses, commutative', hints: ['Check all group axioms', 'Z₄ under addition mod 4'] }
    ],
    duration: 75
  }
];

export const categories = [
  { name: 'Algebra', icon: '📊', count: 5 },
  { name: 'Calculus', icon: '📈', count: 4 },
  { name: 'Geometry', icon: '🔷', count: 3 },
  { name: 'Trigonometry', icon: '📐', count: 2 },
  { name: 'Linear Algebra', icon: '🔢', count: 2 },
  { name: 'Statistics', icon: '📉', count: 2 }
];

export const levels = [
  { id: 'foundations', name: 'Foundations', description: 'Build a solid mathematical foundation', color: '#22c55e', lessons: 10 },
  { id: 'intermediate', name: 'Intermediate', description: 'Develop problem-solving skills', color: '#3b82f6', lessons: 15 },
  { id: 'advanced', name: 'Advanced', description: 'Master complex concepts', color: '#a855f7', lessons: 12 },
  { id: 'expert', name: 'Expert', description: 'Reach research-level understanding', color: '#f59e0b', lessons: 8 }
];

export const getLessonsByLevel = (level: string) => lessons.filter(l => l.level === level);
export const getLessonsByCategory = (category: string) => lessons.filter(l => l.category === category);
export const getLessonById = (id: string) => lessons.find(l => l.id === id);