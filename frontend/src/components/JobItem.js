import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function JobItem({job}) {
    const [isClicked, setIsClicked] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('Apply');

    const handleApply = () => {
        if (!isClicked) setIsClicked(true);
        setButtonText('Applied');
        console.log(job.id)
    };

    return (
        <ListItem>
            <ListItemText
                primary={job.company}
                secondary={
                    <React.Fragment>
                        <Typography
                            variant='body1'
                            component="span"
                        >
                            {job.position}
                        </Typography>
                        <Typography
                            variant='body1'
                            component="span"
                            display="block"
                        >
                            {job.location}
                        </Typography>
                    </React.Fragment>
                }
            />
            <Button
                variant='outlined'
                disabled={isClicked}
                onClick={handleApply}
            >
                {buttonText}
            </Button>
        </ListItem>
    );
}