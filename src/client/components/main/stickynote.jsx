import React from 'react';
import Draggable from 'react-draggable';
import { FormControl, Input } from '@material-ui/core';
import styles from './style.scss';
import { grey } from '@material-ui/core/colors';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ClearIcon from '@material-ui/icons/Clear';

class StickyNote extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            activeDrags: false,
            controlledPosition: this.props.position
        };
        console.log("position on construction", this.state.controlledPosition)
        this.onControlledDrag = this.onControlledDrag.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onControlledDragStop = this.onControlledDragStop.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);

    }

    onStart() {
        this.setState({activeDrags: true});
    };

    onStop(){
        this.setState({activeDrags: false});
        //push the controlled position up to state in board
        this.props.updatePosition(this.props.id, this.state.controlledPosition)
    };
  
    onControlledDrag(e, position){
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    };
    
    onControlledDragStop(e, position){
        e.preventDefault();
        e.stopPropagation();
        this.onControlledDrag(e, position);
        this.onStop();
    };

    deleteButton(){
        console.log("delete!")
        this.props.deleteStickyNote(this.props.id)
    }

    handleContentChange(event){
        this.props.handleContentChange(this.props.id, event.target.value)
    }
    
    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onControlledDragStop, onDrag: this.onControlledDrag};
        const controlledPosition = this.state.controlledPosition;
        const show = this.props.show? styles.show : styles.hidden;
        const dragger = `dragger ${show}`
        return (
            <Draggable position={controlledPosition} bounds="parent" handle=".dragger" {...dragHandlers} >
                <div className={styles.box}>
                <div className={dragger}>
                    <DragHandleIcon />
                    <ClearIcon className={styles.deleteButton} onClick={this.deleteButton}/>
                </div>
                <textarea className={styles.textbox} 
                          rows="4"
                          onChange={this.handleContentChange}
                          value={this.props.content}/>
                </div>
            </Draggable>            
        );
    }
}

export default StickyNote;
//consider using something called react resizable