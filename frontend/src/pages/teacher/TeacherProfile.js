import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <Container>
      <ProfileCard elevation={6}>
        <ProfileCardContent>
          <ProfileTitle variant="h4">Teacher Profile</ProfileTitle>
          <AvatarCircle>
            {currentUser.name.charAt(0)}
          </AvatarCircle>
          <ProfileText variant="h6">Name: {currentUser.name}</ProfileText>
          <ProfileText variant="h6">Email: {currentUser.email}</ProfileText>
          <ProfileText variant="h6">Class: {teachSclass.sclassName}</ProfileText>
          <ProfileText variant="h6">Subject: {teachSubject.subName}</ProfileText>
          <ProfileText variant="h6">School: {teachSchool.schoolName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </Container>
  )
}

export default TeacherProfile

const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 min-height: 80vh;
 background-color: #f5f5f5;
`;
const ProfileCard = styled(Card)`
 margin: 20px;
 width: 500px;
 border-radius: 15px;
 box-shadow: 0 8px 16px rgba(0,0,0,0.1);
 transition: transform 0.3s ease;
 
 &:hover {
   transform: translateY(-5px);
 }
`;
const ProfileCardContent = styled(CardContent)`
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 30px;
 background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
`;
const ProfileTitle = styled(Typography)`
 margin-bottom: 20px;
 color: #2c3e50;
 font-weight: bold;
`;
const AvatarCircle = styled.div`
 width: 100px;
 height: 100px;
 border-radius: 50%;
 background-color: #3498db;
 display: flex;
 justify-content: center;
 align-items: center;
 margin-bottom: 20px;
 color: white;
 font-size: 40px;
 font-weight: bold;
 box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;
const ProfileText = styled(Typography)`
 margin: 10px;
 color: #34495e;
 width: 100%;
 padding: 10px;
 border-bottom: 1px solid #ecf0f1;
 
 &:last-child {
   border-bottom: none;
 }
`;