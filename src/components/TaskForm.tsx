import React, { useEffect, useState } from "react";
import type { Task } from "../types/Task";

interface Props{
        onAddTask: (title: string, description: string) => void;

        onUpdateTask?: (id: string, title: string, description: string) => void;

        editingTask?: Task | null;

        success?: string;
        error?: string;
    }

const TaskForm = ({ onAddTask, success, error, onUpdateTask, editingTask }: Props) => {  
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(editingTask){

            setTitle(editingTask.title);

            setDescription(editingTask.description);
        }
    }, [editingTask]);

    const handleSubmit = (e: React.SubmitEvent) => {

        e.preventDefault();

        if(!title.trim()) return;

        if(editingTask && onUpdateTask){
            onUpdateTask(editingTask._id, title, description);
        }else{
            onAddTask(title, description);
        }        

        setTitle("");
        setDescription("");
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">

                <div className="flex justify-between">

                    <h2 className="text-xl font-semibold mb-4">{editingTask ? "Edit Task" : "Add Task"}</h2>

                    <div>
                        {success && (
                            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded">
                                {success}
                            </span>
                        )}

                        {error && (
                            <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded">
                                {error}
                            </span>
                        )}
                    </div>
                </div>

                <input type="text" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} 
                    className="w-full border border-gray-400 p-2 rounded mb-3" />

                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}
                    className="w-full border border-gray-400 p-2 rounded mb-3" ></textarea>

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">{editingTask ? "Update Task" : "Add Task"}</button>

            </form>           

        </>

        
    );
};

export default TaskForm;
