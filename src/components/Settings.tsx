
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Key, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const Settings = ({ apiKey, onSaveApiKey }: SettingsProps) => {
  const [newApiKey, setNewApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSaveApiKey(newApiKey);
    toast({
      title: "Settings Saved",
      description: "Your API key has been saved successfully.",
    });
  };

  const clearData = () => {
    if (confirm("Are you sure you want to clear all expense data? This action cannot be undone.")) {
      localStorage.removeItem("budgeteer-expenses");
      localStorage.removeItem("budgeteer-api-key");
      onSaveApiKey("");
      setNewApiKey("");
      toast({
        title: "Data Cleared",
        description: "All expense data has been cleared.",
      });
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-teal-600/10 to-blue-600/10 dark:from-teal-400/10 dark:to-blue-400/10">
          <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
            <SettingsIcon className="h-5 w-5" />
            Settings
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Configure your Budgeteer preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Key className="h-4 w-4" />
                Google Gemini API Key
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    placeholder="Enter your Google Gemini API key"
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                    className="pr-10 focus-visible:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent dark:hover:bg-transparent"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700">Save</Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get your API key from{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-rose-600/10 to-orange-600/10 dark:from-rose-400/10 dark:to-orange-400/10">
          <CardTitle className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
            <AlertTriangle className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Manage your expense data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Button variant="destructive" onClick={clearData} className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
            Clear All Data
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            This will permanently delete all your expense data.
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-400/10 dark:to-indigo-400/10">
          <CardTitle className="text-blue-700 dark:text-blue-400">About Budgeteer</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Budgeteer is an AI-powered expense tracking application that helps you manage your finances intelligently.
            Track your expenses, get AI insights, and make better financial decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
