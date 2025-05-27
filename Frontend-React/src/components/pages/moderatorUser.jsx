import React, { useState } from 'react';
import { ModeratorSidebar } from '../ui/ModeratorSidebar';
import { ModeratorSearch } from '../ui/ModeratorSearch';
import { ModeratorStudentList } from '../ui/ModeratorStudentList';
import '../ui/css/ModeratorPanel.css';

export const ModeratorUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      registrationDate: '2024-03-12',
      avatar: 'AJ'
    },
    {
      id: 2,
      name: 'Brian Lee',
      email: 'brian.lee@email.com',
      registrationDate: '2024-02-28',
      avatar: 'BL'
    },
    {
      id: 3,
      name: 'Carmen Diaz',
      email: 'carmen.diaz@email.com',
      registrationDate: '2024-01-15',
      avatar: 'CD'
    }
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#3b82f6',
      '#10b981',
      '#8b5cf6',
      '#ec4899',
      '#f59e0b',
      '#6366f1'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="moderator-container">
      <ModeratorSidebar />
      
      <div className="moderator-main">
        <div className="moderator-breadcrumb">
          <span>Dashboard</span>
          <span className="moderator-breadcrumb-separator">›</span>
          <span className="moderator-breadcrumb-active">User Management</span>
        </div>

        <div className="moderator-header">
          <h1 className="moderator-title">Registered Students</h1>
        </div>

        <ModeratorSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ModeratorStudentList
          students={filteredStudents}
          onDelete={handleDeleteStudent}
          getAvatarColor={getAvatarColor}
        />
      </div>
    </div>
  );
};
