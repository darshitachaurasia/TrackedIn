'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  description,
  icon,
  variant = "default",
  className,
  showHint = false,
  hintText
}) {
  return (
    <Card
      style={{
        backgroundImage:
          variant === "zen"
            ? "var(--gradient-zen)/3"
            : variant === "success"
            ? "var(--gradient-success)"
            : undefined,
      }}
      className={cn(
        "relative overflow-hidden transition-zen",
        variant === "zen" && "bg-primary shadow-zen animate-zen-pulse",
        variant === "success" && "bg-gradient-zen shadow-success",
        variant === "error" && "border-destructive bg-destructive/5",
        variant === "default" && "shadow-card hover:shadow-zen",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className={cn(
            "text-sm font-medium",
            variant === "zen" && "text-primary-foreground",
            variant === "success" && "text-success-foreground",
            variant === "error" && "text-destructive",
            variant === "default" && "text-muted-foreground"
          )}
        >
          {title}
        </CardTitle>
        {icon && (
          <div
            className={cn(
              "h-4 w-4",
              variant === "zen" && "text-primary-foreground/80",
              variant === "success" && "text-success-foreground/80",
              variant === "error" && "text-destructive",
              variant === "default" && "text-muted-foreground"
            )}
          >
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "text-2xl font-bold",
            variant === "zen" && "text-primary-foreground",
            variant === "success" && "text-success-foreground",
            variant === "error" && "text-destructive",
            variant === "default" && "text-foreground"
          )}
        >
          {value}
        </div>
        {description && (
          <p
            className={cn(
              "text-xs mt-1",
              variant === "zen" && "text-primary-foreground/70",
              variant === "success" && "text-success-foreground/70",
              variant === "error" && "text-destructive/70",
              variant === "default" && "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
        {showHint && hintText && (
          <p className="text-xs mt-2 text-destructive font-medium">
            💡 {hintText}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
