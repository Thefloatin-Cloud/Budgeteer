
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Expense } from "@/pages/Index";

interface ExpenseTrackerProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, "id" | "createdAt">) => void;
  onDeleteExpense: (id: string) => void;
}

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Education",
  "Groceries",
  "Other"
];

export const ExpenseTracker = ({ expenses, onAddExpense }: ExpenseTrackerProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddExpense({
      amount: parseFloat(amount),
      description,
      category,
      date,
    });

    // Reset form
    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date().toISOString().split('T')[0]);

    toast({
      title: "Success",
      description: "Expense added successfully!",
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="h-full flex flex-col bg-gray-50 p-4">
      <Card className="bg-white border-0 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Plus className="h-5 w-5 text-blue-500" />
            Add New Expense
          </CardTitle>
          <CardDescription className="text-gray-600">
            Track your daily expenses with ease
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-700">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-gray-900 hover:bg-gray-50">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700">Description</Label>
                <Input
                  id="description"
                  placeholder="What did you spend on?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-700">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white border-0 shadow-sm flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-gray-900">Quick Summary</CardTitle>
          <CardDescription className="text-gray-600">
            Total: ${totalExpenses.toFixed(2)} • {expenses.length} expense{expenses.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          {expenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500 h-full flex items-center justify-center">
              <div>
                <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No expenses added yet. Start tracking your spending!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto h-full">
              {expenses
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((expense) => (
                  <div 
                    key={expense.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div>
                      <p className="text-gray-900 font-medium">{expense.description}</p>
                      <p className="text-gray-500 text-sm">{expense.category}</p>
                    </div>
                    <span className="text-gray-900 font-semibold">${expense.amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
