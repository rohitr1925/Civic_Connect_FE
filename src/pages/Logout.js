import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

  return (
    <LogoutOuter>
      <LogoutContainer role="dialog" aria-labelledby="logout-title" aria-describedby="logout-desc">
        <Heading id="logout-title">{currentUser?.name || 'Account'}</Heading>
        <SubHeading id="logout-desc">Are you sure you want to log out?</SubHeading>
        <ButtonRow>
          <LogoutButtonCancel type="button" onClick={handleCancel} aria-label="Cancel logout">Cancel</LogoutButtonCancel>
          <LogoutButtonLogout type="button" onClick={handleLogout} aria-label="Confirm logout">Log Out</LogoutButtonLogout>
        </ButtonRow>
      </LogoutContainer>
    </LogoutOuter>
  );
};

export default Logout;

const LogoutOuter = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  background: linear-gradient(135deg,#f0f7ff 0%, #e8f4ff 50%, #f3f9ff 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const LogoutContainer = styled.div`
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 22px;
  padding: 2.2rem 2rem 1.9rem;
  box-shadow: 0 12px 34px -10px rgba(25,40,60,0.22);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 240px;
    height: 240px;
    background: radial-gradient(circle at center, rgba(10,120,255,0.08), transparent 70%);
    pointer-events: none;
  }
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 1.9rem;
  font-weight: 900;
  letter-spacing: -0.8px;
  color: #1a202c;
`;

const SubHeading = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: #4a5568;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.9rem;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 0.3rem;
`;

const BaseButton = styled.button`
  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-size: 0.85rem;
  padding: 0.85rem 1.4rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all .25s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 4px 14px -4px rgba(0,0,0,0.15);
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(10,120,255,0.35);
  }
`;

const LogoutButtonLogout = styled(BaseButton)`
  background: linear-gradient(135deg,#dc2626 0%, #b91c1c 100%);
  color: #ffffff;
  box-shadow: 0 6px 18px -6px rgba(220,38,38,0.45);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px -6px rgba(220,38,38,0.55);
    filter: brightness(1.05);
  }
  &:active { transform: translateY(-1px); }
`;

const LogoutButtonCancel = styled(BaseButton)`
  background: linear-gradient(135deg,#f0f7ff 0%, #e8f4ff 100%);
  color: #065dca;
  border: 2px solid #0a78ff;
  box-shadow: 0 4px 14px -6px rgba(10,120,255,0.35);
  &:hover {
    background: linear-gradient(135deg,#e8f4ff 0%, #f5fbff 100%);
    transform: translateY(-3px);
    box-shadow: 0 10px 28px -8px rgba(10,120,255,0.4);
  }
  &:active { transform: translateY(-1px); }
`;
