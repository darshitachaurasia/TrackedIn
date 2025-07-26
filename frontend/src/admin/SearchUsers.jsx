import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SearchUsers() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const queryTerm = formData.get('search');
    // Build query string
    navigate({
      pathname,
      search: queryTerm ? `?search=${encodeURIComponent(queryTerm)}` : '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search for users</label>
        <input id="search" name="search" type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
