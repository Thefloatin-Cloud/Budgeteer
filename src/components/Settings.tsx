
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Key, Eye, EyeOff } from "lucide-react";
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
      localStorage.removeItem("monee-expenses");
      localStorage.removeItem("monee-api-key");
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Settings
          </CardTitle>
          <CardDescription>
            Configure your Monee Manager preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                OpenAI API Key
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    placeholder="Enter your OpenAI API key"
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button onClick={handleSave}>Save</Button>
              </div>
              <p className="text-sm text-gray-600">
                Get your API key from{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  OpenAI Platform
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Manage your expense data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={clearData}>
            Clear All Data
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            This will permanently delete all your expense data.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Monee Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Monee Manager is an AI-powered expense tracking application that helps you manage your finances intelligently.
            Track your expenses, get AI insights, and make better financial decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
