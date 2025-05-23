
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Expense } from "@/pages/Index";

interface AIChatProps {
  expenses: Expense[];
  apiKey: string;
}

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

export const AIChat = ({ expenses, apiKey }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateExpenseContext = () => {
    if (expenses.length === 0) {
      return "No expenses have been recorded yet.";
    }

    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categories = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const recentExpenses = expenses
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    return `
Expense Summary:
- Total expenses: $${totalSpent.toFixed(2)}
- Number of transactions: ${expenses.length}
- Categories breakdown: ${JSON.stringify(categories, null, 2)}
- Recent expenses: ${JSON.stringify(recentExpenses, null, 2)}
`;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Google Gemini API key in Settings first.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful financial assistant for Monee Manager, an expense tracking app. You help users analyze their spending patterns, provide budgeting advice, and answer questions about their expenses.

Current user's expense data:
${generateExpenseContext()}

User question: ${input}

Be helpful, concise, and provide actionable financial advice. If asked about expenses, refer to the actual data provided above.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.candidates[0].content.parts[0].text,
        role: "assistant",
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Financial Assistant
        </CardTitle>
        <CardDescription>
          Ask me anything about your expenses, budgeting, or financial advice
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 mb-4 p-4 border rounded-md">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation with your AI assistant!</p>
              <p className="text-sm mt-2">
                Try asking: "Give me a report on my spending this month" or "How can I reduce my expenses?"
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Bot className="h-6 w-6 mt-1 text-blue-500" />
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <User className="h-6 w-6 mt-1 text-gray-500" />
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Bot className="h-6 w-6 mt-1 text-blue-500" />
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p>Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        
        <div className="flex gap-2">
          <Textarea
            placeholder="Ask me about your expenses..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
            rows={2}
          />
          <Button onClick={sendMessage} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
