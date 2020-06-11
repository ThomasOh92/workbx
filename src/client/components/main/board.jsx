import React, {useState, useEffect, useRef} from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import LinkIcon from '@material-ui/icons/Link';
import StickyNote from './stickynote';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import WebLink from './weblink'

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
  },
  modal: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center'
  }
}));


const Board = props => {
  const classes = useStyles();
  //Floating Action Button
  const [open, setOpen] = React.useState(false);
  //Sticky Notes
  const [stickyNotes, setStickyNotes] = React.useState([]);
  const [stickyNoteIds, setStickyNoteIds] = React.useState([]);
  //Web Links
  const [openWebLinkModal, setOpenWebLinkModal] = React.useState(false);
  const [webLinks, setWebLinks] = React.useState([]);
  const [webLinkIds, setWebLinkIds] = React.useState([]);

  const getStickyNotes = () => {
    return axios.get('./stickynotes')
  }

  const getWebLinks = () => {
    return axios.get('./weblinks')
  }

  useEffect(() => {

    Promise.all([getStickyNotes(), getWebLinks()])
    .then((response) => {
      //Sticky Notes
      console.log(response[0].data)
      for (let el of response[0].data){
        let newNote = {
          id: el.id,
          content: el.content,
          position: {x: el.xpos, y: el.ypos},
          accountName: props.accountName
        }
        stickyNoteIds.push(el.id)
        stickyNotes.push(newNote)
      }
      //Weblinks
      console.log(response[1].data)
      for (let el of response[1].data){
        let newWebLink = {
          id: el.id,
          link: el.link,
          position: {x: el.xpos, y: el.ypos},
          accountName: props.accountName
        }
        webLinkIds.push(el.id)
        webLinks.push(newWebLink)
      }

      setWebLinkIds([...webLinkIds])
      setWebLinks([...webLinks])
      setStickyNoteIds([...stickyNoteIds])
      setStickyNotes([...stickyNotes])

    }).catch((error)=>{
      console.log(error);
      })
  }, [])


  const newWebLink = () => {
    console.log("web");
    handleOpenWebLinkModal()
  }  
  
  const handleOpenWebLinkModal = () => {
    setOpenWebLinkModal(true);
  };

  const handleCloseWebLinkModal = () => {
    setOpenWebLinkModal(false);
  };
  const webLinkFormInput = useRef(null)
  const webLinkModalBody = (
    <div className={classes.modal} >
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined" color="primary">Web Link</InputLabel>
        <OutlinedInput id="component-outlined" color="primary" label="Web Link" ref={webLinkFormInput} />
        <Button type="submit" onClick={()=>{handleNewWebLink()}}>Submit</Button>
      </FormControl>
    </div>
  );
  
  const handleNewWebLink = () => {
    console.log(webLinkFormInput.current.firstChild.value)
    let id = webLinkIds.length + 1;
    
    for (let el of webLinkIds){
      if (el === id){
        id = id * 2;
      }
    }
    //Need to implement idchecker to ensure id is unique
    let link = {
      id,
      position: {x: 0, y: 0},
      link: webLinkFormInput.current.firstChild.value,
      accountName: props.accountName
    }
    webLinks.push(link)
    webLinkIds.push(id)
    setWebLinks([...webLinks]);
    setWebLinkIds([...webLinkIds]);
    setOpenWebLinkModal(false);
  }

  const updateWebLinkPosition = (linkid, posObj) => {
    for (let i = 0; i < webLinks.length; i++){
      if (webLinks[i].id === linkid){
        webLinks[i].position = posObj;
      }
    }
    setWebLinks([...webLinks])
  }

  const deleteWebLink = (linkid) => {
    for (let i = 0; i < webLinks.length; i++){
      if (webLinks[i].id === linkid){
        webLinks.splice(i,1)
      }
    }
    setWebLinks([...webLinks])
  }

  // Cloud Functions
  const newCloudLink = () => {
    console.log("cloud")
  }

  const newLocalLink = () => {
    console.log("local")
  }

  //Sticky Note Functions
  const newStickyNote = () => {
    let id = stickyNoteIds.length + 1;
    
    for (let el of stickyNoteIds){
      if (el === id){
        id = id * 2;
      }
    }
    //Need to implement idchecker to ensure id is unique
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

  //Save everything

  const saveStickyNotes = () => {
    axios.post('/stickynotes', {
      stickyNotes: stickyNotes
    }, {withCredentials: true})
  }

  const saveWebLinks= () => {
    axios.post('/weblinks', {
      webLinks: webLinks
    }, {withCredentials: true})
  }

  const saveAll = () => {
    console.log("saving")
    Promise.all([saveStickyNotes(), saveWebLinks()])
      .then(function (results) {
        console.log(results[0])
        console.log(results[1]);
      })
      .catch(error => { 
        console.error(error.message)
      });
  }

  const actions = [
    { icon: <NoteAddIcon />, name: `Sticky Note`, click: newStickyNote },
    { icon: <CloudQueueIcon />, name: 'Cloud Files', click: newCloudLink },
    { icon: <LinkIcon />, name: 'Web Links', click: newWebLink },
    { icon: <DesktopWindowsIcon />, name: 'Local Files', click: newLocalLink }
  ];


  return <Box className={classes.board}>
            {webLinks.map((link) => (
              <WebLink key={"weblink" + link.id} 
                       id={link.id} 
                       position={link.position} 
                       title={link.link}
                       deleteWebLink={(linkid)=>{deleteWebLink(linkid)}}
                       updateWebLinkPosition={(movingLinkId, positionObj)=>{updateWebLinkPosition(movingLinkId, positionObj)}}
              />
            ))}
            {stickyNotes.map((note) => ( 
                <StickyNote key={"note" + note.id} 
                            id={note.id} 
                            content={note.content} 
                            position={note.position} 
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
            <Modal
              open={openWebLinkModal}
              onClose={handleCloseWebLinkModal}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {webLinkModalBody}
            </Modal>
         </Box>
}

export default Board;
