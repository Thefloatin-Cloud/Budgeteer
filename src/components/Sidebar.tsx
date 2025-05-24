
import { Home, DollarSign, MessageSquare, Settings as SettingsIcon, Camera, Edit, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("budgeteer-user-name") || "You";
  });
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem("budgeteer-profile-pic") || "";
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigation = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "expenses", label: "Expenses", icon: DollarSign },
    { id: "report", label: "Reports", icon: BarChart3 },
    { id: "ai-chat", label: "AI Assistant", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const handleNameSave = (newName: string) => {
    const trimmedName = newName.trim() || "You";
    setUserName(trimmedName);
    localStorage.setItem("budgeteer-user-name", trimmedName);
    setIsEditingName(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setProfilePic(imageData);
        localStorage.setItem("budgeteer-profile-pic", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-72 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 h-full p-6 flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Budgeteer</h1>
          <ThemeToggle />
        </div>
        
        <div className="relative mb-4 group">
          <Avatar className="w-16 h-16 cursor-pointer transition-all duration-200 hover:scale-105">
            {profilePic ? (
              <AvatarImage src={profilePic} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-blue-500 dark:bg-blue-600 text-white font-bold text-xl transition-colors duration-300">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <Button
            variant="ghost"
            size="sm"
            className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 border border-gray-300 dark:border-gray-600"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-3 w-3 text-gray-600 dark:text-gray-400" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {isEditingName ? (
          <Input
            defaultValue={userName}
            className="text-lg font-semibold bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            onBlur={(e) => handleNameSave(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNameSave(e.currentTarget.value);
              }
              if (e.key === "Escape") {
                setIsEditingName(false);
              }
            }}
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingName(true)}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">{userName}</h2>
            <Edit className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 dark:text-gray-400" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start text-left h-12 transition-all duration-200 ${
                isActive 
                  ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
