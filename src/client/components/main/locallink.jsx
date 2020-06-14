import React from 'react';
import Draggable from 'react-draggable';
import DescriptionIcon from '@material-ui/icons/Description';
import styles from './style.scss';
import { IconButton, Typography, Link} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

class LocalLink extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            activeDrags: false,
            controlledPosition: this.props.position
        };
        this.onControlledDrag = this.onControlledDrag.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onControlledDragStop = this.onControlledDragStop.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
    }

    onStart() {
      this.setState({activeDrags: true});
    };

    onStop(){
        this.setState({activeDrags: false});
        //push the controlled position up to state in board
        this.props.updateLocalLinkPosition(this.props.id, this.state.controlledPosition)
    };
  
    onControlledDrag(e, position){
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    };
    
    onControlledDragStop(e, position){
        this.onControlledDrag(e, position);
        this.onStop();
    };

    deleteButton(){
        console.log("delete!")
        this.props.deleteLocalLink(this.props.id)
    }
    
    preventDefault(event){
        event.preventDefault();
    }


    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onControlledDragStop, onDrag: this.onControlledDrag};
        const controlledPosition = this.state.controlledPosition;
        const show = this.props.show? styles.show : styles.hidden;

        return (
            <Draggable position={controlledPosition} bounds="parent" {...dragHandlers} >
                <div className={styles.icon}>
                <div className={show}>
                    <ClearIcon className={styles.deleteButton} onClick={this.deleteButton}/>  
                </div>
                    <IconButton style={{paddingBottom: '5px'}}>
                    <DescriptionIcon fontSize="large"/>
                    <DesktopWindowsIcon fontSize="small" style={{position: 'absolute', top: 5, right: 5}}/>
                    </IconButton>
                    <Typography variant="caption" display="block" className={styles.filenames} style={{lineHeight: 1}}>
                      <Link href={this.props.link} target="_blank" className={styles.filenames}>
                       {this.props.fileName}
                       </Link>
                    </Typography>
                </div>
            </Draggable>            
        );
    }
}

export default LocalLink;
//consider using something called react resizable