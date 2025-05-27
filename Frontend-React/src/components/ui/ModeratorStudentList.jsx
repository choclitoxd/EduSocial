import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import '../ui/css/ModeratorPanel.css';

export const ModeratorStudentList = ({ students, onDelete, onEdit, getAvatarColor }) => {
  return (
    <>
      <div className="moderator-students">
        {students.map((student) => (
          <div 
            key={student.id} 
            className="moderator-student-item"
          >
            <div className="moderator-student-content">
              <div className="moderator-student-left">
                <div 
                  className="moderator-student-avatar"
                  style={{ backgroundColor: getAvatarColor(student.name) }}
                >
                  {student.avatar}
                </div>
                
                <div className="moderator-student-info">
                  <div className="moderator-student-name">{student.name}</div>
                  <div className="moderator-student-email">{student.email}</div>
                </div>
              </div>
              
              <div className="moderator-actions">
                <button 
                  className="moderator-action-btn edit"
                  onClick={() => onEdit(student)}
                  aria-label="Editar usuario"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  className="moderator-action-btn delete"
                  onClick={() => onDelete(student)}
                  aria-label="Eliminar usuario"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="moderator-tip">
        <p>Tip: Click edit to update student details or delete to remove a user.</p>
      </div>
    </>
  );
}; 