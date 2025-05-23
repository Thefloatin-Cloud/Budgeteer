
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { AIChat } from "@/components/AIChat";
import { Settings } from "@/components/Settings";
import { ExpenseReport } from "@/components/ExpenseReport";
import { DollarSign, MessageSquare, Settings as SettingsIcon, BarChart3 } from "lucide-react";
import { Footer } from "@/components/Footer";

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
    const savedExpenses = localStorage.getItem("budgeteer-expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    // Load API key from localStorage
    const savedApiKey = localStorage.getItem("budgeteer-api-key");
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
    localStorage.setItem("budgeteer-expenses", JSON.stringify(updatedExpenses));
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("budgeteer-expenses", JSON.stringify(updatedExpenses));
  };

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("budgeteer-api-key", key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col">
      <div className="flex-1 px-4 py-8 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <Card className="mb-8 overflow-hidden border-none shadow-lg animate-fade-in">
          <CardHeader className="text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white py-6">
            <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
              Budgeteer
            </CardTitle>
            <CardDescription className="text-lg text-teal-50">
              Smart Financial Planning & Insights
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="expenses" className="w-full animate-fade-in">
          <TabsList className="grid w-full grid-cols-4 mb-8 shadow-md">
            <TabsTrigger value="expenses" className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white transition-all duration-200">
              <DollarSign className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white transition-all duration-200">
              <BarChart3 className="h-4 w-4" />
              Report
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white transition-all duration-200">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white transition-all duration-200">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="p-1 md:p-2">
            <TabsContent value="expenses" className="mt-0">
              <ExpenseTracker 
                expenses={expenses} 
                onAddExpense={addExpense}
                onDeleteExpense={deleteExpense}
              />
            </TabsContent>

            <TabsContent value="report" className="mt-0">
              <ExpenseReport expenses={expenses} />
            </TabsContent>

            <TabsContent value="ai-chat" className="mt-0">
              <AIChat expenses={expenses} apiKey={apiKey} />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <Settings apiKey={apiKey} onSaveApiKey={saveApiKey} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
