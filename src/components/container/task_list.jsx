import React, { useState, useEffect } from 'react';
import { LEVELS } from '../../models/levels.enum';
import { Tarea } from '../../models/tarea.class'
import TaskComponent from '../pure/task';

import Taskform from '../pure/forms/taskForm';

const TaskListComponent = () => {

    const defaultTask1 = new Tarea('Example1', 'Description1', true, LEVELS.NORMAL);
    const defaultTask2 = new Tarea('Example2', 'Description 2', false, LEVELS.URGENT);
    const defaultTask3 = new Tarea('Example3', 'Description 3', false, LEVELS.BLOCKING);


    // Estado del componente
    const [tareas, setTareas] = useState([defaultTask1, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);

    // Control del ciclo de vida del componente
    useEffect(() => {
        console.log('Task State has been modified');
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => {
            console.log('TaskList component is going to unmount...')
        }
    }, [tareas])


    function completeTask(tarea){
        console.log('Complete this Task:', tarea);
        const index = tareas.indexOf(tarea);
        const tempTasks = [...tareas];
        tempTasks[index].completed = !tempTasks[index].completed;
        // We update the state of the component with the new list of tasks and it will update the
        // Iteration of the tasks in order to show the task updated
        setTareas(tempTasks);
    }

    function deleteTask(tarea){
        console.log('Detele this Task:', tarea);
        const index = tareas.indexOf(tarea);
        const tempTasks = [...tareas];
        tempTasks.splice(index,1);
        setTareas(tempTasks);
    }

    function addTask(tarea){
        console.log('Detele this Task:', tarea);
        const tempTasks = [...tareas];
        tempTasks.push(tarea);
        setTareas(tempTasks);
    }

    const Table = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { tareas.map((tarea, index) => {
                        return (
                                <TaskComponent 
                                    key={index} 
                                    tarea={tarea}
                                    complete={completeTask}
                                    remove = {deleteTask}
                                >
                                </TaskComponent>
                            )
                        }
                    )}
                </tbody>
            </table>
        )
    }

    let tasksTable;

    if(tareas.length > 0){
        tasksTable = <Table></Table>
    }else{
        tasksTable = (
        <div>
            <h3> There are no tasks to show</h3>
            <h4>Please, create one</h4>
        </div>
        )
    }

    const loadingStyle = {
        color: 'grey',
        fontSize: '30px',
        fontWeight: 'bold'
    }

    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                    {/* Card Header (title) */}
                    <div className='card-header p-3'>
                        <h5>
                            Your Tasks:
                        </h5>
                    </div>
                    {/* Card Body (content) */}
                    <div className='card-body' data-mdb-perfect-scrollbar='true' style={ {position: 'relative', height: '400px'} }>
                        {/* TODO: Add Loading Spinner */}
                        {loading ? (<p style={loadingStyle}>Loading tasks...</p>) : tasksTable}
                    </div>
                </div>
            </div>
            <Taskform add={addTask} length={tareas.length}></Taskform>
        </div>
    );
};


export default TaskListComponent;
