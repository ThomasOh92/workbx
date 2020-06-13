import React from 'react';
import Draggable from 'react-draggable';
import DescriptionIcon from '@material-ui/icons/Description';
import styles from './style.scss';
import { IconButton, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';


class CloudLink extends React.Component {
   
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
        this.props.updateCloudLinkPosition(this.props.id, this.state.controlledPosition)
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
        this.props.deleteCloudLink(this.props.id)
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

                <IconButton aria-label="cloudDocument" onDoubleClick={() => {window.open(this.props.link, '_blank')}}>
                    <DescriptionIcon />
                    <Typography variant="caption" display="block" className={styles.filenames}>
                       {this.props.fileName}
                    </Typography>
                </IconButton>
                </div>
            </Draggable>            
        );
    }
}

export default CloudLink;
//consider using something called react resizable