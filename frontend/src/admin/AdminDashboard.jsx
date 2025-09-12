// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react"; // 🔑 import Clerk auth
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const { getToken } = useAuth(); // 🔑 get Clerk token
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(null);
  const [signUpId, setSignUpId] = useState("");
  const [approving, setApproving] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const token = await getToken(); // ✅ Clerk token
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
        },
      });

      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]); // fallback to empty
    } finally {
      setLoadingUsers(false);
    }
  };

  const updateRole = async (userId, role) => {
    try {
      setUpdatingUser(userId);
      const token = await getToken();
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
          body: JSON.stringify({ role }),
        }
      );

      if (!res.ok) throw new Error("Failed to update role");
      await fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err);
    } finally {
      setUpdatingUser(null);
    }
  };

  const approveSignup = async () => {
    if (!signUpId) return;
    try {
      setApproving(true);
      const token = await getToken();
      const res = await fetch(
        `http://localhost:5000/api/admin/signups/${signUpId}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        }
      );
      if (!res.ok) throw new Error("Failed to approve signup");
      await res.json();
      alert("Signup approved ✅");
      setSignUpId("");
    } catch (err) {
      console.error("Error approving signup:", err);
      alert("Failed to approve signup ❌");
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Users Section */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingUsers ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.emailAddresses?.[0]?.emailAddress}
                    </p>
                    <p className="text-xs text-gray-400">
                      Role: {user.publicMetadata?.role || "user"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      defaultValue={user.publicMetadata?.role || "user"}
                      onValueChange={(value) => updateRole(user.id, value)}
                      disabled={updatingUser === user.id}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>

                    {updatingUser === user.id && (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approve Signup Section */}
      <Card>
        <CardHeader>
          <CardTitle>Approve Signups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter SignUp ID"
              value={signUpId}
              onChange={(e) => setSignUpId(e.target.value)}
            />
            <Button onClick={approveSignup} disabled={approving}>
              {approving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Approve"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
