// 📁 src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user } = useUser();
  const [checkedIn, setCheckedIn] = useState(false);
  const [streak, setStreak] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  // 🟢 Fetch streak and tasks on load
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/api/user/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setCheckedIn(data.checkedInToday);
        setStreak(data.streak);
        setTasks(data.tasks || []);
      });
  }, [user]);

  const handleCheckIn = async () => {
    const res = await fetch('http://localhost:3000/api/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await res.json();
    if (res.ok) {
      setCheckedIn(true);
      setStreak(data.newStreak);
      setMessage(' Checked in successfully!');
    } else {
      setMessage(data.error || ' Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">🌟 Daily Tracker Dashboard</h1>

      <div className="bg-white shadow-md p-6 rounded-xl mb-4">
        <p className="text-lg font-medium">Welcome, {user?.fullName}</p>
        <p className="text-sm text-gray-600">Streak: 🔥 {streak} days</p>

        {!checkedIn ? (
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            onClick={handleCheckIn}
          >
            ✅ Check In
          </button>
        ) : (
          <p className="text-green-600 mt-4">Already Checked In Today</p>
        )}

        {message && <p className="mt-2 text-sm text-gray-800">{message}</p>}
      </div>

      <div className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">📋 Your Tasks</h2>
        <ul className="list-disc pl-6">
          {tasks.length === 0 ? (
            <li className="text-gray-500">No tasks available</li>
          ) : (
            tasks.map((task, index) => <li key={index}>{task}</li>)
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
