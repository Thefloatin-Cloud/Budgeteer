
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, BarChart3, FileText, Save } from "lucide-react";
import { Expense } from "@/pages/Index";

interface DashboardProps {
  expenses: Expense[];
  onTabChange: (tab: string) => void;
}

export const Dashboard = ({ expenses, onTabChange }: DashboardProps) => {
  const [note, setNote] = useState("");

  const handleSaveNote = () => {
    localStorage.setItem("budgeteer-note", note);
    // Could add a toast here for feedback
  };

  const quickActions = [
    {
      label: "New expense",
      icon: Plus,
      color: "bg-purple-600 hover:bg-purple-700",
      action: () => onTabChange("expenses")
    },
    {
      label: "Check expenses",
      icon: FileText,
      color: "bg-blue-600 hover:bg-blue-700",
      action: () => onTabChange("expenses")
    },
    {
      label: "Create report",
      icon: BarChart3,
      color: "bg-teal-600 hover:bg-teal-700",
      action: () => onTabChange("report")
    }
  ];

  return (
    <div className="flex-1 bg-slate-800 p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Note Section */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-700 border-slate-600 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-white">Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add your personal finance notes here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-teal-400"
                />
                <Button 
                  onClick={handleSaveNote}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-all duration-200 hover:scale-105"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Expenses */}
          <Card className="bg-slate-700 border-slate-600 animate-scale-in delay-100">
            <CardHeader>
              <CardTitle className="text-white">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400 mb-4">No expenses recorded yet.</p>
                  <Button
                    onClick={() => onTabChange("expenses")}
                    className="bg-teal-600 hover:bg-teal-700 text-white transition-all duration-200 hover:scale-105"
                  >
                    Add your first expense
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {expenses.slice(-3).reverse().map((expense, index) => (
                    <div 
                      key={expense.id}
                      className="flex justify-between items-center p-3 bg-slate-600 rounded-lg transition-all duration-200 hover:bg-slate-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div>
                        <p className="text-white font-medium">{expense.description}</p>
                        <p className="text-slate-400 text-sm">{expense.category}</p>
                      </div>
                      <span className="text-teal-400 font-bold">${expense.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <Card className="bg-slate-700 border-slate-600 animate-scale-in delay-200">
          <CardHeader>
            <CardTitle className="text-white">Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    onClick={action.action}
                    className={`${action.color} text-white p-6 h-auto flex flex-col items-center gap-3 transition-all duration-200 hover:scale-105`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="h-8 w-8" />
                    <span className="font-medium">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Spending Overview */}
        <Card className="bg-slate-700 border-slate-600 animate-scale-in delay-300">
          <CardHeader>
            <CardTitle className="text-white">Monthly Spending Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-400">No spending data available yet. Start adding expenses to see your monthly overview.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center text-slate-300">
                  <p className="text-3xl font-bold text-teal-400">
                    ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                  </p>
                  <p className="text-slate-400">Total spent this period</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {/* Category breakdown could go here */}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
