import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import StickyNote from './stickynote';
import SaveIcon from '@material-ui/icons/Save';


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
  },
  saveButton: {
    position: 'absolute',
    backgroundColor: '#3f51b5',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    color: 'white'
  }
}));


const Board = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [stickyNotes, setStickyNotes] = React.useState([]);
  const [stickyNoteIds, setStickyNoteIds] = React.useState([]);

  const newStickyNote = () => {
    let id = stickyNoteIds.length + 1;
    let note = {
      id,
      content: "",
      position: {x: 0, y: 0},
      accountName: props.accountName
    }
    
    setStickyNoteIds([...stickyNoteIds, id])
    setStickyNotes([...stickyNotes, note])
  }

  const deleteStickyNote = (noteid) => {
    for (let i = 0; i < stickyNotes.length; i++){
      if (stickyNotes[i].id === noteid){
        stickyNotes.splice(i,1)
      }
    }
    setStickyNotes([...stickyNotes])
  }

  const updateStickyNotePosition = (noteid, posObj) => {
    console.log("PosObj", posObj)
    console.log("noteid", noteid)
    for (let i = 0; i < stickyNotes.length; i++){
      if (stickyNotes[i].id === noteid){
        stickyNotes[i].position = posObj;
      }
    }
    setStickyNotes([...stickyNotes])
  }

  const updateStickyNoteContent = (noteid, text) => {
    console.log("text", text)
    console.log("noteid", noteid)
    for (let i = 0; i < stickyNotes.length; i++){
      if (stickyNotes[i].id === noteid){
        stickyNotes[i].content = text;
      }
    }
    setStickyNotes([...stickyNotes])
  }

  const saveAll = () => {
    console.log("saving")
    console.log(stickyNotes)
    //axios post stickynotes
    axios.post('/stickynotes', {
      stickyNotes: stickyNotes
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const actions = [
    { icon: <FileCopyIcon />, name: `Sticky Note`, click: newStickyNote },
    { icon: <FileCopyIcon />, name: 'Cloud Files', click: newStickyNote },
    { icon: <FileCopyIcon />, name: 'Web Links', click: newStickyNote },
    { icon: <FileCopyIcon />, name: 'Upload Files', click: newStickyNote }
  ];


  return <Box className={classes.board}>
            {stickyNotes.map((note) => ( 
                <StickyNote key={note.id} 
                            id={note.id} 
                            content={note.content} 
                            xPos={note.xPos} 
                            yPos={note.yPos}
                            deleteStickyNote={(noteid)=>{deleteStickyNote(noteid)}}
                            updatePosition={(movingNoteId, positionObj)=>{updateStickyNotePosition(movingNoteId, positionObj)}}
                            handleContentChange={(textChangeNoteId, text)=>{updateStickyNoteContent(textChangeNoteId, text)}}
                            />
            ))}
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
            <Button
              variant="contained"
              className={classes.saveButton}
              size="small"
              startIcon={<SaveIcon />}
              onClick={()=>{saveAll()}}
            >
              Save All
            </Button>
         </Box>
}

export default Board;
