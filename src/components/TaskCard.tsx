import type { Task } from "../types/Task";

interface Props {
    task: Task;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onEdit: (task: Task) => void;

}

const TaskCard = ({task, onDelete, onToggle, onEdit}: Props) => {
    
    return (
        <div className="bg-white p-4 rounded-xl shadow">

            <div className="flex justify-between items-start gap-3">

                <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>      

                    <p className="text-gray-600">{task.description}</p>          
                </div>

                <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap
                    ${task.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {task.status}
                </span>

            </div>

            <div className="mt-4 flex gap-2">

                <button onClick={() => onEdit(task)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition duration-200 cursor-pointer">Edit</button>

                <button onClick={() => onToggle(task._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200 cursor-pointer">Toggle</button>                

                <button onClick={() => onDelete(task._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200 cursor-pointer">Delete</button>
                
            </div>            
        
        </div>
    );
};

export default TaskCard;
