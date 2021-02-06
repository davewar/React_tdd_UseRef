import React, {useRef} from 'react'

import {TiTick, TiTimes} from 'react-icons/ti';
import {MdDelete} from 'react-icons/md';
import {FaRegEdit} from 'react-icons/fa';

const TodoList = ({todos,deleteTodo,updateCompleted,editStatus,updateTask,itemNotEdited}) => {

    const inputRef = useRef(null);
          

    return (
        <div className="todo-container">
           {
                todos.map(item=>{

                return   <div  key={item.id} className="todo">
                <div className="todo-mode">      
                    { 
                    item.editMode  ? 
                    <>   
                    <input id="txt-amd" type="text"
                    defaultValue={item.task}
                    ref={inputRef}
                    autoComplete="off"
                    type="text"
                    autoFocus="autofocus"
                    />

                    <TiTick id="icon1"   onClick={()=> updateTask(item.id,inputRef.current.value)}/>          
                    <TiTimes id="icon2"  onClick={()=>itemNotEdited(item.id)}/>  
                    </>

                    :  <p style={{textDecoration: item.completed ? "line-through": ""}} className="title">{item.task}</p> 
            }                                                 
                </div>                  

                <div className="icons">

                    <label >Completed</label>   
                    <input  className="icon" type="checkbox"
                        onClick={()=>updateCompleted(item.id, item.completed)}  value={item.completed}
                   /> 
                                                                         
                    <FaRegEdit className="icon" onClick={()=>editStatus(item.id)} />
                    <MdDelete className="icon" onClick={()=>deleteTodo(item.id)}  />

                </div>

        </div>



        })  
        }
        </div>
        )
}


export default TodoList
