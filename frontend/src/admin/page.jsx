import React, { useEffect, useState } from 'react';
import { useAuth, useUser, clerkClient } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchUsers from './SearchUsers';
import { setRole, removeRole } from './roleActions';

export default function AdminDashboard() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('search') || '');
  const [users, setUsers] = useState([]);

  // Redirect non-admin users
  useEffect(() => {
    if (!isSignedIn || user?.publicMetadata?.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [isSignedIn, user, navigate]);

  useEffect(() => {
    async function fetchUsers() {
      if (query) {
        const res = await clerkClient.users.getUserList({ query });
        setUsers(res.data);
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

  if (!isSignedIn) return <div>Loading...</div>;

  return (
    <div>
      <p>
        This is the protected admin dashboard restricted to users with the <code>admin</code> role.
      </p>
      <SearchUsers onSearch={handleSearch} />

      {users.map((u) => (
        <div key={u.id} className="user-entry">
          <div>{u.firstName} {u.lastName}</div>
          <div>
            {u.emailAddresses.find(e => e.id === u.primaryEmailAddressId)?.emailAddress}
          </div>
          <div>{u.publicMetadata?.role ?? 'no role'}</div>

          <button onClick={() => setRole(u.id, 'admin')}>Make Admin</button>
          <button onClick={() => setRole(u.id, 'moderator')}>Make Moderator</button>
          <button onClick={() => removeRole(u.id)}>Remove Role</button>
        </div>
      ))}
    </div>
  );
}
