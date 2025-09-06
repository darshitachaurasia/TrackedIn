import React, { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import {
  Flame,
  Target,
  TrendingUp,
  Calendar,
  Plus,
  Check,
} from "lucide-react";
import TaskForm from "./TaskForm";
import NextTaskForm from "./NextTaskForm";
import LinkedInGenerator from "./LinkedInGenerator";

// ✅ streak helper
export function getStreak() {
  const savedStreak = parseInt(localStorage.getItem("streak") || "0", 10);
  const lastDate = localStorage.getItem("lastDate");
  const today = new Date().toDateString();

  if (lastDate === today) return savedStreak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDate === yesterday.toDateString()) return savedStreak;

  return 0; // reset if gap
}

const Dashboard = () => {
  const { user } = useUser();
  const [userStats, setUserStats] = useState(null);

  // ✅ always arrays
  const [todayTasks, setTodayTasks] = useState([]);
  const [nextTasks, setNextTasks] = useState([]);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showNextTaskForm, setShowNextTaskForm] = useState(false);
  const [showLinkedInGenerator, setShowLinkedInGenerator] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserStats();
      fetchTodayTasks();
      fetchNextTasks();
    }
  }, [user]);

  // --- API fetchers ---
  const fetchUserStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${user.id}`
      );
      const data = await response.json();
      setUserStats(data);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const fetchTodayTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${user.id}/today`
      );
      const data = await response.json();
      setTodayTasks(Array.isArray(data) ? data : []); // ✅ guarantee array
    } catch (error) {
      console.error("Error fetching today tasks:", error);
      setTodayTasks([]); // fallback
    }
  };

  const fetchNextTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${user.id}/next`
      );
      const data = await response.json();
      setNextTasks(Array.isArray(data) ? data : []); // ✅ guarantee array
    } catch (error) {
      console.error("Error fetching next tasks:", error);
      setNextTasks([]); // fallback
    }
  };

  // --- task actions ---
 const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tasks/${user.id}/${taskId}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task status");
    }

    const updatedTask = await response.json();

    // ✅ Correct state update
    setTodayTasks((prev = []) =>
      (prev || []).map((t) =>
        t._id === updatedTask._id ? updatedTask : t
      )
    );
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};


  const handleTaskCreated = (task) => {
   setTodayTasks((prev) => [...(prev || []), task]);

 // ✅ safe default
    setShowTaskForm(false);
  };

  const handleNextTaskCreated = (task) => {
setNextTasks((prev) => [...(prev || []), task]);// ✅ safe default
    setShowNextTaskForm(false);
  };

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
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <Flame className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-gray-600">Current Streak</p>
                <p className="text-3xl font-bold text-gray-900">
                  {userStats?.currentStreak || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-gray-600">Longest Streak</p>
                <p className="text-3xl font-bold text-gray-900">
                  {userStats?.longestStreak || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-gray-600">Days Active</p>
                <p className="text-3xl font-bold text-gray-900">
                  {userStats?.daysActive || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Today's Focus
                </h2>
              </div>

              {todayTasks.length > 0 ? (
                <div className="space-y-6">
                  {todayTasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between border-b pb-4"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {task.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {task.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {task.tags?.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {task.status === "completed" ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <Check className="w-5 h-5" />
                            <span className="font-medium">Completed</span>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              updateTaskStatus(task._id, "completed")
                            }
                            className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            <Check className="w-4 h-4" />
                            <span>Complete task</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No task set for today
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create your daily goal to get started
                  </p>
                  <button
                    onClick={() => setShowTaskForm(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Today's Task</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tomorrow */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tomorrow's Plan
              </h3>
              {nextTasks.length > 0 ? (
                <div className="space-y-4">
                  {nextTasks.map((task) => (
                    <div key={task._id} className="border-b pb-3">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {task.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {task.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {task.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-3">
                    Plan your next day's goals
                  </p>
                  <button
                    onClick={() => setShowNextTaskForm(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Set Tomorrow's Tasks
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Update Today's Tasks</span>
                </button>
                <button
                  onClick={() => setShowNextTaskForm(true)}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Plan Tomorrow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={handleTaskCreated}
          userId={user.id}
        />
      )}

      {showNextTaskForm && (
        <NextTaskForm
          onClose={() => setShowNextTaskForm(false)}
          onTaskCreated={handleNextTaskCreated}
          userId={user.id}
        />
      )}

      {showLinkedInGenerator && todayTasks.length > 0 && (
        <LinkedInGenerator
          tasks={todayTasks}
          userStats={userStats}
          onClose={() => setShowLinkedInGenerator(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
