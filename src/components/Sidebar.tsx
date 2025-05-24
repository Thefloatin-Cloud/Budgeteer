
import { Home, DollarSign, MessageSquare, Settings as SettingsIcon, Camera, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
    { id: "home", label: "Home", icon: Home },
    { id: "expenses", label: "Expenses", icon: DollarSign },
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
    <div className="w-64 bg-slate-900 text-white h-full p-6 flex flex-col animate-fade-in">
      <div className="mb-8">
        <div className="relative mb-4 group">
          <Avatar className="w-12 h-12 cursor-pointer transition-all duration-200 hover:scale-105">
            {profilePic ? (
              <AvatarImage src={profilePic} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-teal-500 text-white font-bold text-lg">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <Button
            variant="ghost"
            size="sm"
            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-teal-500 hover:bg-teal-600 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-3 w-3" />
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
            className="text-xl font-semibold bg-slate-800 border-slate-600 text-white"
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
            <h2 className="text-xl font-semibold text-white">{userName}</h2>
            <Edit className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        )}
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
