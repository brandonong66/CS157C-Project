import * as React from 'react';
import JobItem from './JobItem';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

export default function JobList({ jobs }) {
    const jobItems = jobs.map(job => <JobItem key={job.id} job={job} />);
    return (
        <div>
            <Paper>
                <List
                    sx={{ width: '100%', minWidth: 380, maxHeight: '450px', overflow: 'auto'}}
                >
                    {jobItems}
                </List>
            </Paper>
        </div>
    );
}