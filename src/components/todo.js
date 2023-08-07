import React from "react";
import {BsTrash } from 'react-icons/bs'


const Todo = ({ todo, togleComplete, deleteTodo }) => {
  const style = { 
    li: `flex justify-between bg-slate-400 w-[460px] p-2 my-2 hover:cursor-pointer`,
    liCompleted: `ml-2 line-through`,
  };
  return (
    <div >
      <ul>
        <li className={style.li} >
          <div className="flex items-center gap-2  ">
            <input
              type="checkbox"
              checked={todo.completed ? "checked" : ""}
              name=""
              id=""
              onChange={() => togleComplete(todo)}
            />
            <p
              onClick={() => togleComplete(todo)}
              className={todo.completed ? style.liCompleted : ""}
            >
              {todo.text}
            </p>
          </div>

          <button onClick={()=> deleteTodo(todo.id)} className=" bg-blue-600 text-black p-2 text-xl rounded-lg hover:bg-blue-500 focus:ring-2">
            <BsTrash/>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Todo;
