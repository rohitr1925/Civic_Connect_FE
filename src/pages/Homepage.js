
import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
        return (
                <BgWrap>
                        <CenterCard>
                                <LeftSection>
                                        <img src={Students} alt="students" style={{ width: '100%', maxWidth: 420, borderRadius: '24px', boxShadow: '0 8px 32px rgba(79,70,229,0.10)' }} />
                                </LeftSection>
                                <RightSection>
                                        <LogoText>
                                                <span className="logo-gradient">Civic Connect</span>
                                        </LogoText>
                                        <Tagline>Empowering Communities, Effortlessly</Tagline>
                                        <DescText>
                                                <ul>
                                                        <li>Streamline platform management and organize locations</li>
                                                        <li>Add citizens and community managers with ease</li>
                                                        <li>Track participation, assess engagement, and provide feedback</li>
                                                        <li>Access records, view insights, and communicate effortlessly</li>
                                                </ul>
                                        </DescText>
                                        <ActionBox>
                                                <StyledLink to="/choose">
                                                        <LightPurpleButton variant="contained" fullWidth sx={{ fontWeight: 700, fontSize: '1.1rem', py: 1.5, borderRadius: '12px', boxShadow: '0 8px 24px rgba(127,86,218,0.18)' }}>
                                                                Login
                                                        </LightPurpleButton>
                                                </StyledLink>
                                                <StyledText>
                                                        Don't have an account?{' '}
                                                        <Link to="/Adminregister" style={{color:"#7f56da", fontWeight:600}}>
                                                                Sign up
                                                        </Link>
                                                </StyledText>
                                        </ActionBox>
                                </RightSection>
                        </CenterCard>
                </BgWrap>
        );
};

export default Homepage;


const BgWrap = styled.div`
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(135deg, #f3f6fa 0%, #e8eafc 60%, #f8f9ff 100%);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CenterCard = styled.div`
    display: flex;
    flex-direction: row;
    background: #fff;
    border-radius: 48px;
    box-shadow: 0 16px 64px rgba(79,70,229,0.16);
    padding: 64px 48px;
    max-width: 1200px;
    width: 100%;
    align-items: center;
    gap: 56px;
    @media (max-width: 1200px) {
        max-width: 98vw;
        gap: 32px;
        padding: 40px 12px;
        border-radius: 32px;
    }
    @media (max-width: 900px) {
        flex-direction: column;
        gap: 24px;
        padding: 32px 8px;
        border-radius: 24px;
    }
`;

const LeftSection = styled.div`
    flex: 1.1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RightSection = styled.div`
    flex: 1.5;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 28px;
`;

const LogoText = styled.h1`
    font-size: 4.2rem;
    font-weight: 900;
    margin-bottom: 1.2rem;
    letter-spacing: -2px;
    line-height: 1.1;
    .logo-gradient {
        background: linear-gradient(90deg, #7f56da 0%, #0a78ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
    }
    @media (max-width: 900px) {
        font-size: 2.6rem;
        margin-bottom: 0.7rem;
    }
`;


const Tagline = styled.p`
    font-size: 1.7rem;
    font-weight: 700;
    color: #7f56da;
    margin-bottom: 1.2rem;
    @media (max-width: 900px) {
        font-size: 1.1rem;
        margin-bottom: 0.7rem;
    }
`;


const DescText = styled.div`
    font-size: 1.25rem;
    color: #4a5568;
    margin-bottom: 2.2rem;
    ul {
        padding-left: 1.6rem;
        margin: 0;
        list-style: disc;
    }
    li {
        margin-bottom: 0.7rem;
        font-weight: 500;
        font-size: 1.18rem;
    }
    @media (max-width: 900px) {
        font-size: 1rem;
        margin-bottom: 1.2rem;
        li { font-size: 1rem; }
    }
`;


const ActionBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    margin-top: 2.2rem;
`;


const StyledText = styled.p`
    margin-top: 16px;
    margin-bottom: 0px;
    font-size: 1.13rem;
    color: #4a5568;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;
