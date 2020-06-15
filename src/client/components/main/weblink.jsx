import React from 'react';
import Draggable from 'react-draggable';
import { FormControl, Input } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ClearIcon from '@material-ui/icons/Clear';
import LanguageIcon from '@material-ui/icons/Language';
import { IconButton, Typography, Link} from '@material-ui/core';
import styles from './style.scss';

class WebLink extends React.Component {
   
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
        this.props.updateWebLinkPosition(this.props.id, this.state.controlledPosition)
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
        this.props.deleteWebLink(this.props.id)
    }
    
    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onControlledDragStop, onDrag: this.onControlledDrag};
        const controlledPosition = this.state.controlledPosition;
        if (Number.isNaN(controlledPosition.x) || controlledPosition.x > 1500 || controlledPosition.x < -1000){
            controlledPosition.x = 0;
        }
        if (Number.isNaN(controlledPosition.y) || controlledPosition.y > 1000 || controlledPosition.x < -1000){
            controlledPosition.y = 0;
        }
        const show = this.props.show? styles.show : styles.hidden;
        
        return (
            <Draggable position={controlledPosition} bounds="parent" cancel=".linkypart" {...dragHandlers} >
                <div className={styles.icon}>
                    <div className={show}>
                    <ClearIcon className={styles.deleteButton} onClick={this.deleteButton}/>
                    </div>
                    <IconButton style={{paddingBottom: '5px'}}>
                    <LanguageIcon fontSize="large"/>
                    </IconButton>
                    <Typography variant="caption" display="block" className={styles.filenames} style={{lineHeight: 1}}>
                      <Link href={this.props.link} target="_blank" className={styles.filenames}>
                       {this.props.linkName}
                       </Link>
                    </Typography>

                </div>
            </Draggable>            
        );
    }
}

export default WebLink;
//consider using something called react resizable