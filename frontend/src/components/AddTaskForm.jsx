import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { addTask } from "../services/tasks"; // ✅ import service

export function AddTaskForm({ onTaskAdded, placeholder = "Add a new task..." }) {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth(); // ✅ get Clerk token provider

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      setLoading(true);

      // ✅ use service instead of raw fetch
      const newTask = await addTask(getToken, task);

      // clear input
      setTask("");

      // notify parent if provided
      if (onTaskAdded) {
        onTaskAdded(newTask);
      }
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 shadow-card">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          disabled={loading}
        />
        <Button
          type="submit"
          className="bg-green-500 transition"
          disabled={!task.trim() || loading}
        >
          <Plus className="h-4 w-4 cursor-pointer" />
        </Button>
      </form>
    </Card>
  );
}
