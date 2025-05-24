
import { Home, DollarSign, MessageSquare, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const navigation = [
    { id: "home", label: "Home", icon: Home },
    { id: "expenses", label: "Expenses", icon: DollarSign },
    { id: "ai-chat", label: "AI Assistant", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col animate-fade-in">
      <div className="mb-8">
        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mb-4 animate-scale-in">
          <span className="text-white font-bold text-lg">Y</span>
        </div>
        <h2 className="text-xl font-semibold text-white">You</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start text-left transition-all duration-200 hover:bg-slate-800 ${
                isActive 
                  ? "bg-slate-800 text-teal-400 border-r-2 border-teal-400" 
                  : "text-slate-300 hover:text-white"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-700">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800">
          <div className="text-2xl font-bold text-teal-400">BUDGETEER</div>
        </div>
      </div>
    </div>
  );
};
