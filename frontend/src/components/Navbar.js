

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import {
    AccessTimeOutlined,
    AddCircle,
    Work,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Progress" icon={<AccessTimeOutlined />} component={Link} to='/progress'/>
                    <BottomNavigationAction label="Profile" icon={<AddCircle />} component={Link} to='/profile'/>
                    <BottomNavigationAction label="Jobs" icon={<Work />} component={Link} to='/jobs'/>
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
