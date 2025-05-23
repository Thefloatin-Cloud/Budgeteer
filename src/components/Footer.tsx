
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-white py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-xl font-semibold mb-2">Budgeteer</p>
          <p className="text-slate-300 text-sm">&copy; 2025 Apoorv Mane. All rights reserved.</p>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <p className="mb-4 text-sm text-slate-300">Contact me</p>
          <div className="flex gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="mailto:apoorvmane001@gmail.com" 
                  aria-label="Email"
                  className="transition-transform hover:scale-110"
                >
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
                    <Mail className="h-5 w-5" />
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
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
                    <Instagram className="h-5 w-5" />
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
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="mt-4 text-xs text-slate-400">Made by Apoorv Mane</p>
        </div>
      </div>
    </footer>
  );
};
