import React from 'react';
import Draggable from 'react-draggable';
import { FormControl, Input } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ClearIcon from '@material-ui/icons/Clear';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

        return (
            <Draggable position={controlledPosition} bounds="parent" cancel=".linkypart" {...dragHandlers} >
                <div className={styles.box}>

                <Card>
                    <ClearIcon className={styles.deleteButton} onClick={this.deleteButton}/>
                    <CardActionArea onClick={()=>{window.open(this.props.title, '_blank')}} >
                        <CardContent className="linkypart">
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.title}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                </div>
            </Draggable>            
        );
    }
}

export default WebLink;
//consider using something called react resizable