
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { AIChat } from "@/components/AIChat";
import { Settings } from "@/components/Settings";
import { ExpenseReport } from "@/components/ExpenseReport";
import { DollarSign, MessageSquare, Settings as SettingsIcon, BarChart3 } from "lucide-react";

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = localStorage.getItem("monee-expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    // Load API key from localStorage
    const savedApiKey = localStorage.getItem("monee-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const addExpense = (expense: Omit<Expense, "id" | "createdAt">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem("monee-expenses", JSON.stringify(updatedExpenses));
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("monee-expenses", JSON.stringify(updatedExpenses));
  };

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("monee-api-key", key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-indigo-700">
              💰 Monee Manager
            </CardTitle>
            <CardDescription className="text-lg">
              AI-Powered Expense Tracking & Financial Insights
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Report
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses">
            <ExpenseTracker 
              expenses={expenses} 
              onAddExpense={addExpense}
              onDeleteExpense={deleteExpense}
            />
          </TabsContent>

          <TabsContent value="report">
            <ExpenseReport expenses={expenses} />
          </TabsContent>

          <TabsContent value="ai-chat">
            <AIChat expenses={expenses} apiKey={apiKey} />
          </TabsContent>

          <TabsContent value="settings">
            <Settings apiKey={apiKey} onSaveApiKey={saveApiKey} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
