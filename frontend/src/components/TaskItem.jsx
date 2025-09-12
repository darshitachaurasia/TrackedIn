'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Check, Trash2 } from "lucide-react";

export function TaskItem({ id, task, completed, onToggle, onDelete }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!completed) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
    onToggle(id);
  };

  return (
    <Card
      className={cn(
        "p-4 transition-zen hover:shadow-card group",
        completed && "bg-success/10 border-success/20",
        isAnimating && "animate-task-complete"
      )}
    >
      <div className="flex items-center space-x-3">
        <div onClick={handleToggle} className="cursor-pointer">
          <Checkbox
            checked={completed}
            className={cn(
              "data-[state=checked]:bg-gradient-success data-[state=checked]:border-success",
              "transition-zen"
            )}
          />
        </div>

        <span
          className={cn(
            "flex-1 transition-zen",
            completed && "line-through text-muted-foreground"
          )}
        >
          {task}
        </span>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-zen">
          {completed && (
            <div className="flex items-center text-success text-sm">
              <Check className="h-4 w-4 mr-1" />
              Done
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
