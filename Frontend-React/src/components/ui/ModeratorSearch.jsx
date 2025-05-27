import React from 'react';
import { Search } from 'lucide-react';
import '../ui/css/ModeratorPanel.css';

export const ModeratorSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="moderator-search">
      <div className="moderator-search-container">
        <label className="moderator-input-label">Search</label>
        <div className="moderator-input-wrapper">
          <input
            className="moderator-input"
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="moderator-input-icon" />
        </div>
      </div>
    </div>
  );
}; 