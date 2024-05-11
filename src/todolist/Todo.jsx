import React from "react";
import ReactDOM from 'react-dom';
//  import { Link } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<todos />);



const AddTodo = ({ addTodo }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const todo_text = e.target.elements.todo.value;
        if (todo_text !== '') {
            let todo = {
                text: todo_text,
                completed: false,
            };
            addTodo(todo);
            e.target.reset();
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex justify-center ">
            <input type="text" name="todo" placeholder="Enter Todo" className="text-xl text-gray-700 placeholder-gray-400 py-2 px-5 bg-gray-200 rounded-l-full outline-gray-300"/>
            <button type="submit" className="text-xl text-orange-100 placeholder-gray-400 py-2 pr-5 pl-4 bg-gray-700 rounded-r-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </form>
    )
}

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <table id="todo_table" className="table w-full">
            <thead>
                <tr>
                    <th className="text-center px-1 py-2 bg-gray-500 text-gray-100 rounded-tl-xl">#</th>
                    <th className="text-left px-1 py-2 bg-gray-500 text-gray-100">Details</th>
                    <th className=" px-1 py-2 bg-gray-500 text-gray-100 rounded-tr-xl">Action</th>
                </tr>
            </thead>
            <tbody >
                {(todos.length <= 0)?
                <tr className="odd:bg-gray-100 even:bg-gray-50">
                    <td className="text-center  px-1 py-2 text-gray-800" colSpan="3">No Todos found. Add a few to begin.</td>
                </tr>:''}
                {todos.map((todo, index) => {
                    return (
                        <TodoItem key={index} todo={todo} index={index} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                    );
                })}
            </tbody>
        </table>
    );
}

const TodoItem = ({ todo, index, toggleTodo, deleteTodo }) => {
    return (
        <tr key={index} className={'transition duration-300' + (!todo.completed?' odd:bg-gray-200 even:bg-gray-300 ':' bg-green-100 line-through ')}>
            <td className="text-center  px-1 py-2 text-gray-800">{ index +1 }</td>
            <td className=" px-1 py-2 text-gray-800">{ todo.text }</td>
            <td className="text-center  px-1 py-2 text-gray-800 flex gap-3 justify-start">
                {(!todo.completed)?
                <button onClick={(e) => toggleTodo(index, true)}  className="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </button>:''}
                {(todo.completed)?
                <button onClick={(e) => toggleTodo(index, false)} className="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>:''}
                {(todo.completed)?
                <button onClick={(e) => deleteTodo(index)} className="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>:''}
            </td>
        </tr>
    );
}

const TodoStats = ({stats}) => {
    return (
        <small id="todo_stats" className="block mb-5 mt-0 text-xs text-gray-500">{stats.remaining} Todos pending, {stats.completed} Completed.</small>
    );
}


class todos extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {
                    text: 'Learn React',
                    completed: true,
                },
                {
                    text: 'Learn Vue',
                    completed: false,
                },
                {
                    text: 'Learn Angular',
                    completed: false,
                },
            ],
        };
    }

    addTodo = (todo) => {
        this.setState({
            todos: [...this.state.todos, todo],
        });
    }

    deleteTodo = (index) => {
        let todos = [...this.state.todos];
        todos.splice(index, 1);
        this.setState({
            todos: todos,
        });
    }

    toggleTodo = (index, value) => {
        let todos = [...this.state.todos];
        todos[index].completed = value;
        this.setState({
            todos: todos,
        });
    }

    calculateStats = () => {
        let todos = [...this.state.todos];
        let completed = todos.filter(todo => todo.completed).length;
        let remaining = todos.filter(todo => !todo.completed).length;
        return {
            completed: completed,
            remaining: remaining,
        };
    }

    render() {
        return (
            <div className="container w-full max-w-2xl" >
                <div className="text-3xl text-center font-bold mb-3 uppercase">Todo List</div>
                <div>
                    <AddTodo addTodo={this.addTodo}  />
                </div>
                <div className="bg-gray-100 mt-5 p-5 rounded-xl shadow-lg text-gray-700">
                    <h1 className="font-bold text-xl italic block mb-0 leading-none">Todo's</h1>
                    <TodoStats stats={this.calculateStats()} />
                    <div className="max-h-80 overflow-y-auto">
                        <TodoList todos={this.state.todos} toggleTodo={this.toggleTodo} deleteTodo={this.deleteTodo} />
                    </div>
                </div>
            </div>
        );
    }
}

export default todos;