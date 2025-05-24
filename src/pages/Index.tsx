
import { useState, useEffect } from "react";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { ExpenseCategories } from "@/components/ExpenseCategories";
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
          <div className="h-full flex">
            <div className="w-1/2 p-6 border-r border-slate-600">
              <ExpenseTracker 
                expenses={expenses} 
                onAddExpense={addExpense}
                onDeleteExpense={deleteExpense}
              />
            </div>
            <div className="w-1/2 p-6">
              <ExpenseCategories 
                expenses={expenses}
                onDeleteExpense={deleteExpense}
              />
            </div>
          </div>
        );
      case "report":
        return (
          <div className="h-full p-8 overflow-hidden">
            <ExpenseReport expenses={expenses} />
          </div>
        );
      case "ai-chat":
        return (
          <div className="h-full p-8 overflow-hidden">
            <AIChat expenses={expenses} apiKey={apiKey} />
          </div>
        );
      case "settings":
        return (
          <div className="h-full p-8 overflow-hidden">
            <Settings apiKey={apiKey} onSaveApiKey={saveApiKey} />
          </div>
        );
      default:
        return <Dashboard expenses={expenses} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 flex flex-col overflow-hidden">
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 bg-slate-800 overflow-hidden">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
