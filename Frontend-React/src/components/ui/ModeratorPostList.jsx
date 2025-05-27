import React from 'react';
import { Edit2, Trash2, Video, FileText, Link } from 'lucide-react';
import '../ui/css/ModeratorPanel.css';

export const ModeratorPostList = ({ posts, onDelete }) => {
  const getTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'video':
        return <Video size={20} />;
      case 'article':
        return <FileText size={20} />;
      default:
        return <Link size={20} />;
    }
  };

  return (
    <>
      <div className="moderator-posts">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="moderator-post-item"
          >
            <div className="moderator-post-content">
              <div className="moderator-post-left">
                <div 
                  className="moderator-post-avatar"
                  style={{ backgroundColor: post.avatarColor }}
                >
                  {post.avatarText}
                </div>
                
                <div className="moderator-post-info">
                  <div className="moderator-post-header">
                    <h3 className="moderator-post-title">{post.titulo}</h3>
                    <span className="moderator-post-topic">{post.topic}</span>
                  </div>
                  <p className="moderator-post-description">{post.descripcion}</p>
                  <div className="moderator-post-details">
                    <span className="moderator-post-author">
                      <span className="label">Autor:</span> {post.autor}
                    </span>
                    <span className="moderator-post-type">
                      <span className="label">Tipo:</span> 
                      <span className="type-icon">{getTypeIcon(post.type)}</span>
                      {post.type}
                    </span>
                    <span className="moderator-post-likes">
                      <span className="label">Likes:</span> {post.likes.length}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="moderator-actions">
                <button className="moderator-action-btn edit">
                  <Edit2 size={16} />
                </button>
                <button 
                  className="moderator-action-btn delete"
                  onClick={() => onDelete(post.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="moderator-tip">
        <p>Tip: Click edit to update post details or delete to remove a post.</p>
      </div>
    </>
  );
}; 