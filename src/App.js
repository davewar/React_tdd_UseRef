import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";


const { v4: uuidv4 } = require("uuid");

function App() {
	const [todos, setTodos] = useState([]); //all todos items
	const [task, setTask] = useState(""); //input task
	const [filter, setFilter] = useState("all"); //control filter of todos
	const [delItem, setDelItem] = useState(false); /// if all items are to be deleted
	const [editCount, setEditCount] = useState(0); // only 1 item to be amended at a time.

	const searchRef = useRef(null);

	const addTodo = (e) => {
		e.preventDefault();

		if (!task) {
			// no items
			return;
		}

		let id = uuidv4();
		const addNew = { id, task, completed: false, editMode: false };

		// console.log(addNew);
		setTodos([...todos, addNew]); // add
		setTask(""); // clear input field
	}; 

	//remove item
	const deleteTodo = (id) => {
		const newlist = todos.filter((item) => item.id !== id);
		setTodos(newlist);
	};

	//update task completion status
	const updateCompleted = (id, value) => {
		// console.log(id,value);
		const newlist = todos.map((item) => {
			if (item.id === id) {
				item.completed = !item.completed;
			}
			return item;
		});
		// console.log("update",newlist);
		setTodos(newlist);
		setEditCount(0);
	};

	//edit task
	const editStatus = (id) => {
		// console.log("edit status",id);

		if (editCount === 0) {
			setEditCount(1);

			const newlist = todos.map((item) => {
				if (item.id === id) {
					item.editMode = !item.editMode;
				}
				return item;
			});
			// console.log("edit",newlist);
			setTodos(newlist);
		}
	};

	const updateTask = (id, val) => {
		// console.log("EDIT todo vlue", id, val);
		const newlist = todos.map((item) => {
			if (item.id === id) {
				item.task = val;
				item.editMode = false;
			}
			return item;
		});
		setTodos(newlist);
		setEditCount(0);
		searchRef.current.focus();
	};

	//user clicked to edit > then went to add. Remove edit status on all. DONT leave EDIT status open !
	const itemNotEdited = (id) => {
		const newlist = todos.map((item) => {
			if (item.editMode === true) {
				item.editMode = false;
			}
			return item;
		});
		setTodos(newlist);
		setEditCount(0);
	};

	useEffect(() => {
		searchRef.current.focus();
		setEditCount(0);
	}, [task, filter, delItem]);

	// delete all todos
	useEffect(() => {
		if (delItem) {
			setTodos([]);
			setFilter("all");
			setTask("");
		}
		// console.log("delete all");
		return () => setDelItem(false);
	}, [delItem]);

	//Change "todos" > "newTodos" in order to filter the form
	let newTodos = [];
	if (filter === "all") {
		newTodos = todos;
	} else if (filter === "completed") {
		newTodos = todos.filter(item => item.completed);
	} else {
		newTodos = todos.filter(item => !item.completed);
	}

	return (
		<>
			<div className="App">
				<div className="filter">
					<label>Filter</label>
					<select
						value={filter}
						onChange={(e) =>setFilter(e.target.value)}
					>
						<option value="all">All</option>
						<option value="completed">Completed	</option>
						<option value="uncompleted">Un-Completed</option>
					</select>

					<button
						onClick={(e) =>	setDelItem(true)}
					>
						Delete All items
					</button>
				</div>

				<form className="todo-form">
					<label>Add Task</label>
					<input
						type="text"
						name="name"
						value={task}
						onChange={(e) =>setTask(e.target.value)}
						placeholder="Add task"
						autoComplete="off"
						ref={searchRef}
						onFocus={itemNotEdited}
					/>

					<button
						className="form-btn"
						type="submit"
						onClick={addTodo}
					>
						Add
					</button>
				</form>

				<TodoList
					// todos={todos}
					todos={newTodos}
					deleteTodo={deleteTodo}
					updateCompleted={updateCompleted}
					editStatus={editStatus}
					updateTask={updateTask}
					itemNotEdited={itemNotEdited}
				/>
			</div>
		</>
	);
}

export default App;
