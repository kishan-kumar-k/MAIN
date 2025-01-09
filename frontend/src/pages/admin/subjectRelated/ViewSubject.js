import React, { useEffect, useState } from 'react'
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styled from 'styled-components';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const ViewSubject = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);
  const { classID, subjectID } = params

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error)
  }

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ]

  const studentRows = sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  })

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <ButtonContainer>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
          }
        >
          Take Attendance
        </PurpleButton>
      </ButtonContainer>
    );
  }
   const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <ButtonContainer>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton 
          variant="contained"
          onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
        >
          Provide Marks
        </PurpleButton>
      </ButtonContainer>
    );
  }
  const SubjectStudentsSection = () => {
    return (
      <>
        {getresponse ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton
                variant="contained"
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
              >
                Add Students
              </GreenButton>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Students List:
            </Typography>

            {selectedSection === 'attendance' &&
              <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
            }
            {selectedSection === 'marks' &&
              <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
            }

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                <BottomNavigationAction
                  label="Attendance"
                  value="attendance"
                  icon={selectedSection === 'attendance' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                />
                <BottomNavigationAction
                  label="Marks"
                  value="marks"
                  icon={selectedSection === 'marks' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                />
              </BottomNavigation>
            </Paper>

          </>
        )}
      </>
    )
  }

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;
    return (
     <DetailsContainer>
       <DetailTitle variant="h4" align="center" gutterBottom>
         Subject Details
       </DetailTitle>
       
       <DetailRow variant="h6">
         <DetailLabel>Subject Name:</DetailLabel>
         <DetailValue>{subjectDetails && subjectDetails.subName}</DetailValue>
       </DetailRow>
       
       <DetailRow variant="h6">
         <DetailLabel>Subject Code:</DetailLabel>
         <DetailValue>{subjectDetails && subjectDetails.subCode}</DetailValue>
       </DetailRow>
       
       <DetailRow variant="h6">
         <DetailLabel>Subject Sessions:</DetailLabel>
         <DetailValue>{subjectDetails && subjectDetails.sessions}</DetailValue>
       </DetailRow>
       
       <DetailRow variant="h6">
         <DetailLabel>Number of Students:</DetailLabel>
         <DetailValue>{numberOfStudents}</DetailValue>
       </DetailRow>
       
       <DetailRow variant="h6">
         <DetailLabel>Class Name:</DetailLabel>
         <DetailValue>
           {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
         </DetailValue>
       </DetailRow>
       
       {subjectDetails && subjectDetails.teacher ? (
         <DetailRow variant="h6">
           <DetailLabel>Teacher Name:</DetailLabel>
           <DetailValue>{subjectDetails.teacher.name}</DetailValue>
         </DetailRow>
       ) : (
         <AddTeacherButton
           variant="contained"
           onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
         >
           Add Subject Teacher
         </AddTeacherButton>
       )}
     </DetailsContainer>
   );
  }

  return (
    <>
      {subloading ?
        < div > Loading...</div >
        :
        <>
          <Box sx={{ width: '100%', typography: 'body1', }} >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                  <Tab label="Details" value="1" />
                  <Tab label="Students" value="2" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <SubjectDetailsSection />
                </TabPanel>
                <TabPanel value="2">
                  <SubjectStudentsSection />
                </TabPanel>
              </Container>
            </TabContext>
          </Box>
        </>
      }
    </>
  )
}

export default ViewSubject

const DetailsContainer = styled.div`
 padding: 2rem;
 background-color: white;
 border-radius: 10px;
 box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
 max-width: 800px;
 margin: 0 auto;
`;
const DetailTitle = styled(Typography)`
 && {
   color: #1a237e;
   margin-bottom: 2rem;
   font-weight: 600;
 }
`;
const DetailRow = styled(Typography)`
 && {
   display: flex;
   align-items: center;
   padding: 1rem;
   margin: 0.5rem 0;
   background-color: #f5f5f5;
   border-radius: 8px;
   
   &:hover {
     background-color: #e3f2fd;
     transition: background-color 0.3s ease;
   }
 }
`;
const DetailLabel = styled.span`
 font-weight: 600;
 min-width: 180px;
 color: #555;
`;
const DetailValue = styled.span`
 color: #333;
`;
const AddTeacherButton = styled(GreenButton)`
 && {
   margin-top: 1rem;
   width: 100%;
   padding: 1rem;
   font-size: 1rem;
 }
`;

const ButtonContainer = styled.div`
 display: flex;
 gap: 1rem;
 align-items: center;
`;