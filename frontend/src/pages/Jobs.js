import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CurrentProfile from '../components/CurrentProfile';
import JobList from '../components/JobList';
import Navbar from '../components/Navbar';

export default function Jobs() {
    const testProfile = 
        {
            name: "John Smith",
            position: "Software Engineer",
            visa: "F1 - Requires H1B sponsoring",
        };

    const testJobs = [
        {
            id: 1,
            company: "Company 1",
            position: "Software Engineer",
            location: "Remote"
        },
        {
            id: 2,
            company: "Company 2",
            position: "Software Engineer",
            location: "San Jose, CA"
        },
        {
            id: 3,
            company: "Company 2",
            position: "Software Engineer",
            location: "San Jose, CA"
        },
        {
            id: 4,
            company: "Company 2",
            position: "Software Engineer",
            location: "San Jose, CA"
        },
        {
            id: 5,
            company: "Company 2",
            position: "Software Engineer",
            location: "San Jose, CA"
        },
    ]

    function jobList() {
        return (
            <JobList jobs={testJobs} />
        );
    }
    return (
        <Box
            component="main"
        >
            <Box
                component="div"
                sx={{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', flexDirection: 'column'}}
            >
                <Typography variant='h4'>Jobs</Typography>
                <CurrentProfile {...testProfile} />
            </Box>
    
            <Box
                component="div"
                sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}    
            >
                <Typography variant='h6'>Search Results</Typography>
                {jobList()}
            </Box>
            <Navbar />
        </Box>
    );
}