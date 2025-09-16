import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useAuth } from "@clerk/clerk-react";   // <-- 🔑 import this

const LinkedInGenerator = ({ tasks = [], userStats, onClose }) => {
  const [generatedPost, setGeneratedPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

 

const { getToken } = useAuth();

async function generateSummaryPost() {
  try {
    setLoading(true);
    setGeneratedPost("");

    const token = await getToken();

    // Build userProgress from props (stats + tasks)
    const userProgress = {
      streak: userStats?.currentStreak || 0,
      totalTasks: userStats?.totalTasks || 0,
      completedTasks: userStats?.completedTasks || 0,
      completionRate: userStats?.completionRate || 0,
      taskList: tasks.map((t) => t.task), // flatten tasks into simple array
    };

    const res = await fetch("http://localhost:5000/api/generate-linkedin-post/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ userProgress }),
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    setGeneratedPost(data.post || "No post generated.");
  } catch (err) {
    console.error("Error generating LinkedIn post:", err);
    setGeneratedPost("⚠️ Failed to generate post. Check console.");
  } finally {
    setLoading(false);
  }
}



  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  // Default: generate a normal post on mount
  useEffect(() => {
    generateSummaryPost();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">LinkedIn Post Generator</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Generating your LinkedIn post...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Generated Post:</h3>
              <div className="bg-white rounded-lg p-4 border whitespace-pre-wrap min-h-[100px]">
                {generatedPost}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
             <button
  onClick={generateSummaryPost}
  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
>
  Regenerate Daily Post
</button>

              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInGenerator;
