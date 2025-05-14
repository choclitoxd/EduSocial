import React from 'react';
import { FaUserAstronaut, FaUserPlus, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const UserCard = ({ hasProfile, name, username }) => {
  const profileImage = hasProfile ? <FaUserAstronaut className="user-icon" /> : <FaUserPlus className="user-icon" />;

  const displayName = hasProfile ? name : 'Crear perfil';
  const userTag = hasProfile ? `@${username}` : 'Haz clic para comenzar';

  const Container = hasProfile ? 'button' : Link;
  const containerProps = hasProfile
    ? { type: 'button', role: 'button', className: 'transition-action btn' }
    : { to: '/crear-perfil', role: 'button', className: 'transition-action btn' };

  return (
    <div className="div-user">
      <Container {...containerProps}>
        <div className="profile-image">
          {profileImage}
        </div>

        <div className="profile-info">
          <div className="display-name">
            <span>{displayName}</span>
          </div>
          <div className="username">
            <span>{userTag}</span>
          </div>
        </div>

        <div className="more-options">
          <FaEllipsisH />
        </div>
      </Container>
    </div>
  );
};
