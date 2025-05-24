
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, BarChart3, FileText, Save, StickyNote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Expense } from "@/pages/Index";

interface DashboardProps {
  expenses: Expense[];
  onTabChange: (tab: string) => void;
}

export const Dashboard = ({ expenses, onTabChange }: DashboardProps) => {
  const [note, setNote] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load saved note on component mount
    const savedNote = localStorage.getItem("budgeteer-note");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleSaveNote = () => {
    localStorage.setItem("budgeteer-note", note);
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully!",
    });
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
    <div className="h-full overflow-hidden">
      <div className="h-full p-8 space-y-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-1/2">
          {/* Note Section */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-700 border-slate-600 animate-scale-in h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <StickyNote className="h-5 w-5 text-teal-400" />
                  Personal Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-4">
                <Textarea
                  placeholder="Add your personal finance notes, reminders, or goals here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 flex-1 transition-all duration-200 focus:ring-2 focus:ring-teal-400 resize-none"
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
          <Card className="bg-slate-700 border-slate-600 animate-scale-in delay-100 h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-white">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              {expenses.length === 0 ? (
                <div className="text-center py-8 h-full flex flex-col justify-center">
                  <p className="text-slate-400 mb-4">No expenses recorded yet.</p>
                  <Button
                    onClick={() => onTabChange("expenses")}
                    className="bg-teal-600 hover:bg-teal-700 text-white transition-all duration-200 hover:scale-105"
                  >
                    Add your first expense
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto h-full">
                  {expenses.slice(-5).reverse().map((expense, index) => (
                    <div 
                      key={expense.id}
                      className="flex justify-between items-center p-3 bg-slate-600 rounded-lg transition-all duration-200 hover:bg-slate-500 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div>
                        <p className="text-white font-medium truncate">{expense.description}</p>
                        <p className="text-slate-400 text-sm">{expense.category}</p>
                      </div>
                      <span className="text-teal-400 font-bold">${expense.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-1/2">
          {/* Quick Access */}
          <Card className="bg-slate-700 border-slate-600 animate-scale-in delay-200 h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-white">Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-1 gap-4 h-full">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      onClick={action.action}
                      className={`${action.color} text-white p-6 h-auto flex items-center gap-3 transition-all duration-200 hover:scale-105 animate-fade-in`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="font-medium">{action.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Spending Overview */}
          <Card className="bg-slate-700 border-slate-600 animate-scale-in delay-300 h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-white">Spending Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              {expenses.length === 0 ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-400">No spending data available yet.</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-3xl font-bold text-teal-400 mb-2">
                    ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                  </p>
                  <p className="text-slate-400 mb-4">Total spent this period</p>
                  <p className="text-lg text-white">
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
