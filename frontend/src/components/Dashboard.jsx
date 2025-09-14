import React, { useState, useEffect } from "react";
import { useUser, UserButton, useAuth } from "@clerk/clerk-react";
import { Flame, Target, TrendingUp, CheckCircle } from "lucide-react";

import LinkedInGenerator from "./LinkedInGenerator";
import { StatCard } from "./StatCard";
import { TaskItem } from "./TaskItem";
import { AddTaskForm } from "./AddTaskForm";
import { InteractiveCalendar } from "./InteractiveCalendar";
import { Button } from "@/components/ui/button";
import { deleteSingleTask } from "../services/tasks";
import { toast } from "react-hot-toast";
// 🔌 import backend services
import { getStreak, doCheckin } from "../services/streak";
import {
  getTodayTasks,
  updateTaskStatus,
  deleteAllTodayTasks,
} from "../services/tasks"

const Dashboard = () => {
  const { user } = useUser();
  const [userStats, setUserStats] = useState(null);
    const { getToken } = useAuth(); 
  // unified state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showSummaryLinkedInGenerator, setShowSummaryLinkedInGenerator] =
    useState(false);

  useEffect(() => {
    loadTasks();
    loadStreak();
  }, []);
  async function loadStreak() {
  try {
    const data = await getStreak(getToken);
    setUserStats((prev) => ({
      ...prev,
      currentStreak: data.currentStreak,
      longestStreak: data.longestStreak,
      lastCheckin: data.lastCheckin, // ✅ keep last check-in
    }));
  } catch (err) {
    console.error("Error loading streak:", err);
  }
}

const handleCheckin = async () => {
  try {
    const lastCheckinDate = userStats?.lastCheckin
      ? new Date(userStats.lastCheckin).toDateString()
      : null;
    const today = new Date().toDateString();

    if (lastCheckinDate === today) {
      toast.error("🔥 Already checked in today!");
      return;
    }

    // Call API
    const data = await doCheckin();

    setUserStats((prev) => ({
      ...prev,
      currentStreak: data.currentStreak,
      longestStreak: data.longestStreak,
      lastCheckin: data.lastCheckin, // ✅ update lastCheckin
    }));

    toast.success("✅ Check-in successful!");
  } catch (error) {
    console.error("Error during checkin:", error);
    toast.error("Something went wrong. Try again!");
  }
};
async function handleDeleteTask(taskId) {
  try {
    await deleteSingleTask(getToken, taskId);
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    toast.success("🗑️ Task deleted");
  } catch (err) {
    console.error("Error deleting task:", err);
    toast.error("Failed to delete task");
  }}

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTodayTasks(getToken);
      
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleTaskAdded(newTask) {
    setTasks((prev) => [...prev, newTask]);
  }

  async function handleToggle(taskId) {
    try {
      const target = tasks.find((t) => t._id === taskId);
      if (!target) return;
      const updated = await updateTaskStatus(getToken,taskId, !target.completed);
      setTasks((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }

  async function handleDeleteAll() {
    try {
      await deleteAllTodayTasks(getToken);
      setTasks([]);
    } catch (err) {
      console.error("Error deleting all tasks:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TI</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">TrackedIn</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.firstName}!</span>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Section */}
        <div className="cursor-default grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Current Streak"
            value={userStats?.currentStreak || 0}
            description={
              userStats?.currentStreak === 1 ? "day in a row" : "days in a row"
            }
            icon={<Flame />}
            variant={userStats?.currentStreak > 0 ? "zen" : "default"}
          />
          <Button
  onClick={handleCheckin}
  disabled={
    new Date(userStats?.lastCheckin).toDateString() === new Date().toDateString()
  }
  className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-full mt-4 disabled:opacity-50"
>
  🔥 Daily Check-in
</Button>


          <StatCard
            title="Total Tasks"
            value={userStats?.totalTasks || 0}
            description="tasks created"
            icon={<Target />}
            variant="default"
          />
          <StatCard
            title="Completed"
            value={userStats?.completedTasks || 0}
            description="tasks finished"
            icon={<CheckCircle />}
            variant={userStats?.completedTasks > 0 ? "success" : "default"}
          />
          <StatCard
            title="Success Rate"
            value={`${userStats?.completionRate || 0}%`}
            description="completion rate"
            icon={<TrendingUp />}
          />
        </div>

        {/* Tasks + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div className="space-y-6 max-h-screen overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Today&apos;s Focus
                </h2>

                {tasks.length > 0 && (
                  <button
                    onClick={() => setShowSummaryLinkedInGenerator(true)}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <span>Create linkedIn Post</span>
                  </button>
                )}
              </div>

              <AddTaskForm onTaskAdded={handleTaskAdded} />

          {loading ? (
  <p>Loading...</p>
) : tasks.length === 0 ? (
  <p>No tasks today 🚀</p>
) : (
  tasks.map((task) => (
    <TaskItem
      key={task._id}
      id={task._id}
      task={task.task}
      completed={task.completed}
      onToggle={handleToggle}
      onDelete={() => console.log("TODO: add delete single task route")}
    />
  ))
)}


              {tasks.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={handleDeleteAll}
                  className="w-full mt-4"
                >
                  Delete All Today’s Tasks
                </Button>
              )}
            </div>
          </div>

          {/* Interactive Calendar */}
          <div className="w-full bg-white rounded-xl shadow-lg p-6">
            <InteractiveCalendar allTasks={tasks} onAddTask={handleTaskAdded} />
          </div>
        </div>
      </main>

      {/* Modals */}
      {showSummaryLinkedInGenerator && (
        <LinkedInGenerator
          tasks={tasks}
          userStats={userStats}
          onClose={() => setShowSummaryLinkedInGenerator(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
