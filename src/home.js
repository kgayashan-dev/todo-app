import { useEffect, useState } from "react";
import Navbar from "./components/nav-bar";
import Todo from "./components/todo";
import { db } from "./components/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import PersonList from "./components/assign";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a task");
      return;
    }
    await addDoc(collection(db, "todo"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // update todos
  const togleComplete = async (todo) => {
    await updateDoc(doc(db, "todo", todo.id), {
      completed: !todo.completed,
    });
  };

  // read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todo"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      todosArr.reverse();
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);
  // console.log(todos);

  // delete toodo from db
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todo", id));
  };

  return (
    <div className=" w-screen min-h-screen  bg-gradient-to-r from-slate-100 to-slate-500">
      <div className="w-full">
        <Navbar></Navbar>
      </div>
      <div className="m-auto my-8  justify-center bg-slate-200 h-[80vh] overflow-scroll rounded-lg w-[500px] py-4 pl-4">
        <h3 className="text-black font-bold text-xl">Todo App</h3>
        <div>
          <form action="" onSubmit={createTodo}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter todos.."
              className="p-2 rounded-lg w-[400px]"
            />
            <button className="m-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 focus:ring-2">
              Add
            </button>
          </form>

          {todos.map((todo, key) => (
            <Todo
              key={key}
              todo={todo}
              togleComplete={togleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>

        {todos.length < 1 ? null : (
          <h2 className=" text-center items-center">
            {" "}
            You have {todos.length} todos{" "}
          </h2>
        )}
      </div>

      <PersonList />
    </div>
  );
};
export default Home;
