import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, Minimize2, Copy, CheckCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Message, MathStep } from '@/data/types';
import { getGoldgamaResponse } from '@/lib/goldgamaEngine';
import { cn } from '@/lib/utils';

export function GoldgamaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm **Goldgama**, your intelligent mathematics companion.\n\nI can help you:\n• Solve equations step-by-step\n• Explain complex concepts\n• Find derivatives and integrals\n• Work through practice problems\n\nWhat would you like to explore today?`,
      timestamp: new Date()
    }
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getGoldgamaResponse(input);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        steps: response.steps
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an issue processing your request. Please try again or rephrase your question.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyMessage = (message: Message) => {
    let text = message.content;
    if (message.steps && message.steps.length > 0) {
      text += '\n\nSteps:\n';
      message.steps.forEach((step, i) => {
        text += `${i + 1}. ${step.expression}\n   ${step.explanation}`;
        if (step.rule) text += ` (${step.rule})`;
        text += '\n';
      });
    }
    handleCopy(text, message.id);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

          {/* Button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl shadow-primary/30">
            <Sparkles className="w-8 h-8 text-primary-foreground" />

            {/* Pulse indicator */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </div>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[420px]"
    >
      <Card className="overflow-hidden shadow-2xl border-2 border-primary/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/90 to-primary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-primary-foreground">Goldgama</h3>
              <p className="text-xs text-primary-foreground/80">AI Mathematics Tutor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:text-white hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Messages */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-muted/30">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onCopy={() => copyMessage(message)}
                    copied={copiedId === message.id}
                  />
                ))}

                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
                      <div className="typing-indicator">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-card border-t border-border">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Goldgama anything..."
                    className="min-h-[60px] max-h-[120px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="self-end"
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10" onClick={() => setInput('Explain derivatives')}>
                    derivatives
                  </Badge>
                  <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10" onClick={() => setInput('solve x^2 + 5x + 6 = 0')}>
                    equations
                  </Badge>
                  <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10" onClick={() => setInput('simplify (x+1)^2')}>
                    simplify
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

interface MessageBubbleProps {
  message: Message;
  onCopy: () => void;
  copied: boolean;
}

function MessageBubble({ message, onCopy, copied }: MessageBubbleProps) {
  const [showSteps, setShowSteps] = useState(false);
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn('flex items-start gap-3', isUser && 'flex-row-reverse')}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-secondary-foreground">U</span>
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
      )}

      {/* Content */}
      <div className={cn('max-w-[80%] space-y-2', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-md',
            isUser
              ? 'bg-secondary text-secondary-foreground rounded-tr-sm'
              : 'bg-card border border-border rounded-tl-sm'
          )}
        >
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>

          {/* Math Steps */}
          {message.steps && message.steps.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <ChevronDown
                  className={cn(
                    'w-3 h-3 transition-transform',
                    showSteps && 'rotate-180'
                  )}
                />
                {showSteps ? 'Hide steps' : `Show ${message.steps.length} steps`}
              </button>

              <AnimatePresence>
                {showSteps && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 space-y-2"
                  >
                    {message.steps.map((step, index) => (
                      <div
                        key={index}
                        className="bg-muted/50 rounded-lg p-2 text-xs"
                      >
                        <div className="font-mono text-primary font-medium">
                          {step.expression}
                        </div>
                        <div className="text-muted-foreground mt-1">
                          {step.explanation}
                        </div>
                        {step.rule && (
                          <div className="text-muted-foreground/70 italic mt-1">
                            Rule: {step.rule}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isUser && (
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default GoldgamaChat;