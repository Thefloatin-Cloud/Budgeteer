
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { AIChat } from "@/components/AIChat";
import { Settings } from "@/components/Settings";
import { ExpenseReport } from "@/components/ExpenseReport";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
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
  const [activeTab, setActiveTab] = useState<string>("home");

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

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard expenses={expenses} onTabChange={setActiveTab} />;
      case "expenses":
        return (
          <div className="flex-1 bg-slate-800 p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <ExpenseTracker 
                expenses={expenses} 
                onAddExpense={addExpense}
                onDeleteExpense={deleteExpense}
              />
            </div>
          </div>
        );
      case "report":
        return (
          <div className="flex-1 bg-slate-800 p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <ExpenseReport expenses={expenses} />
            </div>
          </div>
        );
      case "ai-chat":
        return (
          <div className="flex-1 bg-slate-800 p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <AIChat expenses={expenses} apiKey={apiKey} />
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="flex-1 bg-slate-800 p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <Settings apiKey={apiKey} onSaveApiKey={saveApiKey} />
            </div>
          </div>
        );
      default:
        return <Dashboard expenses={expenses} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 flex flex-col">
      <div className="flex flex-1 w-full">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
