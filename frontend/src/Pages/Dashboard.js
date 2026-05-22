import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TodoList from '../components/Todo/TodoList';
import { logoutUser } from '../Services/api';
import { clearUser } from '../Store/userSlice';
import styled from 'styled-components';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user); // user email
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <div className="mt-4 py-3">
      <Header className="d-flex justify-content-between align-items-center px-3 mb-2">
        <UserInfo>
          <span className="fw-semibold">{user}</span>
        </UserInfo>
        <button className="btn btn-sm btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </Header>
      <TodoList />
    </div>
  );
};

export default Dashboard;

const Header = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  font-size: 0.9rem;
  opacity: 0.85;
`;
