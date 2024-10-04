"use client";
import React, { useState } from "react";
import {
  FaTrashAlt,
  FaCheckCircle,
  FaPlusCircle,
  FaPen,
  FaChevronDown,
  FaChevronUp,
  FaBrain,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "@/../../public/style/todo.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [points, setPoints] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [subtaskText, setSubtaskText] = useState("");
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [editSubtaskText, setEditSubtaskText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          subtasks: [],
          showSubtasks: false,
        },
      ]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
    setPoints(points + 1); // Añadir 1 punto por tarea completada
  };

  const handleEditTask = (id) => {
    setEditingTaskId(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTaskText(taskToEdit.text);
  };

  const handleSaveEditTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditTaskText("");
  };

  const handleCancelEditTask = () => {
    setEditingTaskId(null);
    setEditTaskText("");
  };

  const handleToggleSubtasks = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, showSubtasks: !task.showSubtasks } : task
      )
    );
  };

  const handleAddSubtask = (id) => {
    if (subtaskText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                subtasks: [
                  ...task.subtasks,
                  { id: Date.now(), text: subtaskText, completed: false },
                ],
              }
            : task
        )
      );
      setSubtaskText("");
    }
  };

  const handleCompleteSubtask = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: true }
                  : subtask
              ),
            }
          : task
      )
    );
    setPoints(points + 0.5); // Añadir 0.5 puntos por sub-tarea completada
  };

  const handleDeleteSubtask = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.id !== subtaskId
              ),
            }
          : task
      )
    );
  };

  const handleEditSubtask = (taskId, subtaskId) => {
    setEditingSubtask({ taskId, subtaskId });
    const taskToEdit = tasks.find((task) => task.id === taskId);
    const subtaskToEdit = taskToEdit.subtasks.find(
      (subtask) => subtask.id === subtaskId
    );
    setEditSubtaskText(subtaskToEdit.text);
  };

  const handleSaveEditSubtask = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, text: editSubtaskText }
                  : subtask
              ),
            }
          : task
      )
    );
    setEditingSubtask(null);
    setEditSubtaskText("");
  };

  const handleCancelEditSubtask = () => {
    setEditingSubtask(null);
    setEditSubtaskText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.name === "taskInput") {
        handleAddTask();
      } else if (e.target.name === "subtaskInput") {
        const taskId = e.target.dataset.taskId;
        handleAddSubtask(parseInt(taskId, 10));
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 space-y-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-4xl relative">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 mt-1 text-blue-600">
          Cosas por hacer
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6 w-full">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyPress}
            name="taskInput"
            className="flex-1 p-2 sm:p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
            placeholder="Nueva tarea..."
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white p-2 sm:p-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center text-lg sm:text-xl">
            <FaPlusCircle />
          </button>
        </div>
        <div className="w-full">
          {tasks.length === 0 && (
            <p className="text-gray-600 text-base sm:text-lg">
              No hay tareas pendientes.
            </p>
          )}
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 rounded-lg border shadow-md ${
                  task.completed
                    ? "bg-green-100 border-green-400 line-through"
                    : "bg-white border-gray-300"
                }`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6">
                  {editingTaskId === task.id ? (
                    <div className="flex-1">
                      <input
                        type="text"
                        value={editTaskText}
                        onChange={(e) => setEditTaskText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={handleSaveEditTask}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                          Guardar
                        </button>
                        <button
                          onClick={handleCancelEditTask}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="text-base sm:text-lg flex items-center gap-2">
                        <FaBrain className="text-skin-tone" />
                        {task.text}
                      </span>
                      <div className="flex gap-3 mt-2 sm:mt-0">
                        {!task.completed && (
                          <button
                            onClick={() => handleCompleteTask(task.id)}
                            className="text-green-600 hover:text-green-800 transition duration-300">
                            <FaCheckCircle />
                          </button>
                        )}
                        <button
                          onClick={() => handleEditTask(task.id)}
                          className="text-blue-600 hover:text-blue-800 transition duration-300">
                          <FaPen />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-800 transition duration-300">
                          <FaTrashAlt />
                        </button>
                        <button
                          onClick={() => handleToggleSubtasks(task.id)}
                          className="text-gray-600 hover:text-gray-800 transition duration-300">
                          {task.showSubtasks ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {task.showSubtasks && (
                  <div className="border-t border-gray-300 pt-4 px-6">
                    <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
                      <input
                        type="text"
                        value={subtaskText}
                        onChange={(e) => setSubtaskText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        data-task-id={task.id}
                        name="subtaskInput"
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                        placeholder="Nueva sub-tarea..."
                      />
                      <button
                        onClick={() => handleAddSubtask(task.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center text-lg sm:text-xl">
                        <FaPlusCircle />
                      </button>
                    </div>
                    {task.subtasks.length === 0 && (
                      <p className="text-gray-600 text-sm sm:text-base">
                        No hay subtareas.
                      </p>
                    )}
                    {task.subtasks.map((subtask) => (
                      <motion.div
                        key={subtask.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center justify-between p-2 mb-2 rounded-lg border ${
                          subtask.completed
                            ? "bg-green-100 border-green-400 line-through"
                            : "bg-white border-gray-300"
                        }`}>
                        {editingSubtask &&
                        editingSubtask.subtaskId === subtask.id &&
                        editingSubtask.taskId === task.id ? (
                          <div className="flex-1">
                            <input
                              type="text"
                              value={editSubtaskText}
                              onChange={(e) =>
                                setEditSubtaskText(e.target.value)
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() =>
                                  handleSaveEditSubtask(task.id, subtask.id)
                                }
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                                Guardar
                              </button>
                              <button
                                onClick={handleCancelEditSubtask}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className="flex-1 text-sm sm:text-base">
                              {subtask.text}
                            </span>
                            <div className="flex gap-2">
                              {!subtask.completed && (
                                <button
                                  onClick={() =>
                                    handleCompleteSubtask(task.id, subtask.id)
                                  }
                                  className="text-green-600 hover:text-green-800 transition duration-300">
                                  <FaCheckCircle />
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  handleEditSubtask(task.id, subtask.id)
                                }
                                className="text-blue-600 hover:text-blue-800 transition duration-300">
                                <FaPen />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteSubtask(task.id, subtask.id)
                                }
                                className="text-red-600 hover:text-red-800 transition duration-300">
                                <FaTrashAlt />
                              </button>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="absolute bottom-1 right-2">
          <span className="text-gray-600 text-sm sm:text-base">
            Puntos: {points}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
