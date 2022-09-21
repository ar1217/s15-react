import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Models
import { Tarea } from '../../models/tarea.class';
import { LEVELS } from '../../models/levels.enum';



const TaskComponent = ({ tarea, complete, remove }) => {

    useEffect(() => {
        console.log('Created Task')
        return () => {
            console.log(`Task: ${tarea.name} is going to unmount`);
        }
    }, [tarea]);

    function taskLevelBadge(){
        switch (tarea.level) {
            case LEVELS.NORMAL:
                return(
                <h6 className='mb-0'>
                    <span className='badge bg-primary'>
                        {tarea.level}
                    </span>
                </h6>)
            case LEVELS.URGENT:
                return(
                <h6 className='mb-0'>
                    <span className='badge bg-warning'>
                        {tarea.level}
                    </span>
                </h6>)
            case LEVELS.BLOCKING:
                return(
                <h6 className='mb-0'>
                    <span className='badge bg-danger'>
                        {tarea.level}
                    </span>
                </h6>)
            default:
                break;
        }
    }

    
    function taskCompletedIcon(){
        if(tarea.completed){
            return (<i onClick={() => complete(tarea)} className='bi-toggle-on task-action' style={{color: 'green'}}></i>)
        }else{
            return (<i onClick={() => complete(tarea)} className='bi-toggle-off task-action' style={{color: 'grey'}}></i>)
        }
    }

    const taskCompleted = {
        color: 'gray',
        fontWeight: 'bold',
        textDecoration: 'line-through'
    }

    const taskPending = {
        fontWeight: 'bold',
        color: 'tomato'
    }

    return (
        <tr className='fw-normal' style={tarea.completed ? taskCompleted : taskPending}>
            <th>
                <span className='ms-2'>{tarea.name}</span>
            </th>
            <td className='align-middle'>
                <span>{tarea.description}</span>
            </td>
            <td className='align-middle'>
                {/* Execution of function to return badge element */}
                {taskLevelBadge()}
            </td>
            <td className='align-middle'>
                {/* Execution of function to return icon depending on completion */}
                {taskCompletedIcon()}
                <i className='bi-trash task-action' style={{color: 'tomato'}} onClick={() => remove(tarea)}></i>
            </td>
        </tr>
    );
};


TaskComponent.propTypes = {
    tarea: PropTypes.instanceOf(Tarea).isRequired,
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};


export default TaskComponent;
