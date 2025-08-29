import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";

export interface TabItem {
  id: string;
  label: string;
  shortLabel?: string;
  count?: number | null;
  content: React.ReactNode;
}

interface ResponsiveTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
  onTabChange?: (tabId: string) => void;
  showCounts?: boolean;
  mobileBreakpoint?: number;
  isMobile?: boolean; // Allow external control of mobile state
}

// Simple mobile detection hook
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useState(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  });
  
  return isMobile;
};

export function ResponsiveTabs({
  tabs,
  defaultTab,
  className,
  onTabChange,
  showCounts = true,
  mobileBreakpoint = 4,
  isMobile: externalIsMobile
}: ResponsiveTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");
  const internalIsMobile = useMobile();
  const isMobile = externalIsMobile !== undefined ? externalIsMobile : internalIsMobile;

  // Use dropdown on mobile when more than mobileBreakpoint tabs, otherwise use shortened labels
  const shouldUseDropdown = isMobile && tabs.length > mobileBreakpoint;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const getActiveTabLabel = () => {
    return tabs.find(tab => tab.id === activeTab)?.label || "Select Tab";
  };

  const getActiveTabContent = () => {
    return tabs.find(tab => tab.id === activeTab)?.content || null;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Tab Navigation */}
      <div className="border-b bg-background relative">
        {/* Mobile Dropdown (when more than mobileBreakpoint tabs on mobile) */}
        {shouldUseDropdown ? (
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="w-full justify-between h-10 text-left px-3 py-2 border rounded-md hover:bg-accent"
                >
                  <span className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="truncate">{getActiveTabLabel()}</span>
                    {showCounts && tabs.find(tab => tab.id === activeTab)?.count && (
                      <span className="text-xs bg-secondary px-2 py-1 rounded shrink-0">
                        {tabs.find(tab => tab.id === activeTab)?.count}
                      </span>
                    )}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 ml-2" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] z-50 bg-background border rounded-md shadow-lg p-1"
                sideOffset={4}
              >
                {tabs.map((tab) => (
                  <DropdownMenuItem
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "flex items-center justify-between cursor-pointer px-3 py-2 rounded text-sm",
                      activeTab === tab.id && "bg-accent text-accent-foreground"
                    )}
                  >
                    <span className="flex-1">{tab.label}</span>
                    {showCounts && tab.count && (
                      <span className="text-xs bg-secondary px-2 py-1 rounded ml-2 shrink-0">
                        {tab.count}
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          /* Standard tab navigation with responsive labels */
          <div className="overflow-x-auto">
            <nav className="flex min-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "whitespace-nowrap py-4 px-2 sm:px-4 border-b-2 font-medium text-sm transition-colors flex-shrink-0 min-w-0",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    {/* Use short label on mobile, full label on desktop */}
                    <span className="sm:hidden truncate max-w-[70px] text-xs">
                      {tab.shortLabel || tab.label}
                    </span>
                    <span className="hidden sm:inline truncate">
                      {tab.label}
                    </span>
                    {showCounts && tab.count && (
                      <span className="text-[10px] sm:text-xs bg-secondary px-1 sm:px-2 py-0.5 rounded shrink-0 h-4 sm:h-5 min-w-[16px] sm:min-w-[20px]">
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div>
        {getActiveTabContent()}
      </div>
    </div>
  );
}
