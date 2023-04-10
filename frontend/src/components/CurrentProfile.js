import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CurrentProfile({ name, position, visa }) {
    return (
        <Card sx={{ minWidth: 380}}>
            <CardContent>
                <Typography align='left'>
                    Current Profile:
                </Typography>
                <Typography align='left'>
                    Name: {name}
                </Typography>
                <Typography align='left'>
                    Position Applied: {position}
                </Typography>
                <Typography align='left'>
                    Visa status: {visa}
                </Typography>
            </CardContent>
        </Card>
    );
}