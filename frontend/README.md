# 🚀 TrackedIn : Daily Tracker App – Build Habits. Track Progress. Share Growth.

A modern, AI-powered daily productivity tracker that helps users build strong routines, stay consistent with streaks, and generate LinkedIn posts based on their completed tasks.

---

## 🧠 Features & User Flow

**1. 🔐 Login / Signup**  
Secure authentication using `Clerk`. Users can sign up or log in with their credentials or social accounts.

**2. 🔁 Streak Update**  
Track daily login streaks with MongoDB. The system automatically updates streaks on each check-in and shows current/longest streaks.

**3. 📊 Dashboard**  
A clean and dynamic overview of the user's daily status:
- Current streaks
- Today's task
- Progress meter
- Upcoming tasks

**4. 📝 Update Today’s Task**  
Users can add or update their daily task including:
- Task title & description
- Tags (like #learning, #coding, etc.)

**5. ✅ Implement Task**  
Mark tasks as `in-progress` or `completed` to keep your workflow focused and organized.

**6. ⏭️ Next Task**  
Set the next goal or task for tomorrow. Helps maintain momentum.

**7. 🤖 LinkedIn Post Recommendation**  
After task completion, the app uses the **OpenAI API** to generate a professional LinkedIn post based on the user's work — ready to copy-paste and share.

---