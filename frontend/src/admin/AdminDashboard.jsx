import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchUsers from "./SearchUsers";
import { setRole, removeRole } from "./RoleActions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(location.search).get("search") || "");
  const [users, setUsers] = useState([]);

  // Redirect non-admin users
  useEffect(() => {
    if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, user, navigate]);

  //if admin , navigate to /admin
  useEffect(() => {
    if (isSignedIn && user?.publicMetadata?.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [isSignedIn, user, navigate]);

  // Fetch users from backend
  useEffect(() => {
    async function fetchUsers() {
      if (query) {
        const res = await fetch(`/api/admin/users?search=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    }
    fetchUsers();
  }, [query]);

  const handleSearch = (q) => {
    setQuery(q);
    navigate(`?search=${encodeURIComponent(q)}`, { replace: true });
  };

  if (!isSignedIn) return <div className="text-center mt-10">Please sign in to access admin dashboard.</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
          <p className="text-muted-foreground">
            Restricted to users with the <code className="bg-muted px-1 rounded">admin</code> role.
          </p>
        </CardHeader>
        <CardContent>
          <SearchUsers onSearch={handleSearch} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-muted-foreground text-center">No users found. Try searching.</p>
        ) : (
          users.map((u) => (
            <Card key={u.id} className="shadow-sm hover:shadow-md transition rounded-2xl">
              <CardContent className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <p className="font-medium text-lg">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {u.emailAddresses.find((e) => e.id === u.primaryEmailAddressId)?.emailAddress}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={u.publicMetadata?.role ? "default" : "secondary"}>
                    {u.publicMetadata?.role ?? "no role"}
                  </Badge>

                  <Separator orientation="vertical" className="h-6" />

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setRole(u.id, "admin")}>
                      Make Admin
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setRole(u.id, "moderator")}>
                      Make Moderator
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => removeRole(u.id)}>
                      Remove Role
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
