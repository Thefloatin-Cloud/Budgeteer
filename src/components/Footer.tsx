
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-left">
          <p className="text-sm text-gray-500">&copy; 2025 Apoorv Mane. All rights reserved.</p>
          <p className="text-xs text-gray-400 mt-1">Made by Apoorv Mane</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 mr-2">Contact me</p>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="mailto:apoorvmane001@gmail.com" 
                aria-label="Email"
                className="transition-transform hover:scale-110"
              >
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>apoorvmane001@gmail.com</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="transition-transform hover:scale-110"
              >
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Instagram</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="transition-transform hover:scale-110"
              >
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};
