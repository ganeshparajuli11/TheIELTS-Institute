"use client";

import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type AdminAction =
  | { separator: true }
  | {
      label: string;
      onClick?: () => void;
      href?: string;
      destructive?: boolean;
      disabled?: boolean;
      separator?: false;
    };

interface AdminActionMenuProps {
  actions: AdminAction[];
  label?: string;
}

export function AdminActionMenu({ actions, label = "Open actions" }: AdminActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}
        aria-label={label}
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {actions.map((action, index) => {
          if (action.separator) {
            return <DropdownMenuSeparator key={`sep-${index}`} />;
          }
          return (
            <DropdownMenuItem
              key={action.label}
              onClick={action.onClick}
              disabled={action.disabled}
              className={action.destructive ? "text-destructive focus:text-destructive" : ""}
            >
              {action.label}
              {action.disabled && (
                <span className="text-muted-foreground ml-auto text-[10px]">Soon</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
