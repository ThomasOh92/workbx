import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

const useStyles = makeStyles((theme) => ({
  board: {
    border: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(2, 2),
    flexGrow: 1,
    backgroundColor: theme.palette.board,
    position: 'relative'
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    }
  }
}));


const Board = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const newStickyNote = () => {
    console.log("hello!");
  }

  const actions = [
    { icon: <FileCopyIcon />, name: `Sticky Note`, click: newStickyNote },
    { icon: <FileCopyIcon />, name: 'Cloud Files', click: newStickyNote },
    { icon: <FileCopyIcon />, name: 'Web Links', click: newStickyNote },
    { icon: <FileCopyIcon />, name: 'Upload Files', click: newStickyNote }
  ];
  //White Space - No Wrap


  return <Box className={classes.board} >
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                hidden={false}
                icon={<SpeedDialIcon />}
                onClose={() => {setOpen(false)}}
                onClick={() => {setOpen(!open)}}
                open={open}
                direction="up"
                >
                {actions.map((action) => (
                    <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    onClick={action.click}
                    />
                ))}
        </SpeedDial>

         </Box>
}

export default Board;
