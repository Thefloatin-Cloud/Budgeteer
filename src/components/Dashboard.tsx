
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, BarChart3, FileText, Save, StickyNote, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Expense } from "@/pages/Index";

interface DashboardProps {
  expenses: Expense[];
  onTabChange: (tab: string, initialPrompt?: string) => void;
}

export const Dashboard = ({ expenses, onTabChange }: DashboardProps) => {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedNoteText = localStorage.getItem("budgeteer-note");
    if (savedNoteText) {
      setSavedNote(savedNoteText);
    }
  }, []);

  const handleSaveNote = () => {
    localStorage.setItem("budgeteer-note", note);
    setSavedNote(note);
    setNote("");
    setIsEditingNote(false);
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully!",
    });
  };

  const handleEditNote = () => {
    setNote(savedNote);
    setIsEditingNote(true);
  };

  const quickActions = [
    {
      label: "New expense",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
      action: () => onTabChange("expenses")
    },
    {
      label: "Check expenses",
      icon: FileText,
      color: "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700",
      action: () => onTabChange("expenses")
    },
    {
      label: "Create report",
      icon: BarChart3,
      color: "bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700",
      action: () => onTabChange("ai-chat", "Give me a detailed report on my expenses including spending patterns, top categories, and financial recommendations.")
    }
  ];

  const totalBalance = 5430;
  const income = 3200;
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="h-full p-4 bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Balance</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalBalance.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Income</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">${income.toLocaleString()}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">↑ 1,120.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalExpenses.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-220px)]">
          {/* Notes Section */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                Personal Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 h-[calc(100%-80px)] overflow-hidden">
              {!isEditingNote && savedNote ? (
                <div
                  onClick={handleEditNote}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 min-h-[100px] group overflow-y-auto max-h-[200px]"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{savedNote}</p>
                    <Edit className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <Textarea
                    placeholder="Add your personal finance notes, reminders, or goals here..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none flex-1 min-h-[100px]"
                  />
                  <Button 
                    onClick={handleSaveNote}
                    className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white mt-3 transition-colors duration-200"
                    disabled={!note.trim()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Note
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] overflow-hidden">
              {expenses.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No expenses recorded yet.</p>
                  <Button
                    onClick={() => onTabChange("expenses")}
                    className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors duration-200"
                  >
                    Add your first expense
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 h-full overflow-y-auto">
                  {expenses.slice(-5).reverse().map((expense) => (
                    <div 
                      key={expense.id}
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{expense.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{expense.category}</p>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">${expense.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] overflow-hidden">
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      onClick={action.action}
                      className={`${action.color} text-white justify-start h-12 transition-all duration-200 hover:scale-105`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{action.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Spending Overview */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Spending Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center h-[calc(100%-80px)]">
              {expenses.length === 0 ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">No spending data available yet.</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ${totalExpenses.toFixed(2)}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Total spent this period</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {expenses.length} transaction{expenses.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
