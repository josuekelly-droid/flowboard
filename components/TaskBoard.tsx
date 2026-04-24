"use client";

import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { TaskCard } from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | null;
}

interface TaskBoardProps {
  todoTasks: Task[];
  inProgressTasks: Task[];
  doneTasks: Task[];
}

const columns = [
  { id: "TODO", title: "À faire", color: "bg-slate-100 dark:bg-slate-800" },
  { id: "IN_PROGRESS", title: "En cours", color: "bg-blue-50 dark:bg-blue-950" },
  { id: "DONE", title: "Terminé", color: "bg-green-50 dark:bg-green-950" },
];

export function TaskBoard({ todoTasks, inProgressTasks, doneTasks }: TaskBoardProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState({
    TODO: todoTasks,
    IN_PROGRESS: inProgressTasks,
    DONE: doneTasks,
  });
  const [newTitle, setNewTitle] = useState("");
  const [addingTo, setAddingTo] = useState<string | null>(null);

  const refreshData = useCallback(() => {
    fetch("/api/tasks/list")
      .then((res) => res.json())
      .then((data) => {
        setTasks({
          TODO: data.filter((t: Task) => t.status === "TODO"),
          IN_PROGRESS: data.filter((t: Task) => t.status === "IN_PROGRESS"),
          DONE: data.filter((t: Task) => t.status === "DONE"),
        });
      });
    router.refresh();
  }, [router]);

  async function handleDragEnd(result: any) {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;
    const sourceTasks = Array.from(tasks[sourceCol as keyof typeof tasks]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks({ ...tasks, [sourceCol]: sourceTasks });
    } else {
      const destTasks = Array.from(tasks[destCol as keyof typeof tasks]);
      destTasks.splice(destination.index, 0, { ...movedTask, status: destCol });
      setTasks({ ...tasks, [sourceCol]: sourceTasks, [destCol]: destTasks });
    }

    await fetch("/api/tasks/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: movedTask.id, status: destCol, order: destination.index }),
    });
    refreshData();
  }

  async function addTask(status: string) {
    if (!newTitle.trim()) return;
    await fetch("/api/tasks/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, status }),
    });
    setNewTitle("");
    setAddingTo(null);
    refreshData();
  }

  async function deleteTask(id: string) {
    await fetch("/api/tasks/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTasks((prev) => ({
      TODO: prev.TODO.filter((t) => t.id !== id),
      IN_PROGRESS: prev.IN_PROGRESS.filter((t) => t.id !== id),
      DONE: prev.DONE.filter((t) => t.id !== id),
    }));
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* Mobile : accordéon / Desktop : colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {columns.map((column) => (
          <div key={column.id} className={`rounded-xl p-3 sm:p-4 ${column.color}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm sm:text-base">{column.title}</h3>
              <span className="text-xs text-muted-foreground bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-full">
                {tasks[column.id as keyof typeof tasks].length}
              </span>
            </div>

            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2 min-h-[60px]"
                >
                  {tasks[column.id as keyof typeof tasks].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps}>
                          <TaskCard
                            task={task}
                            onDelete={deleteTask}
                            dragHandleProps={provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {addingTo === column.id ? (
              <div className="mt-3 space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Titre de la tâche..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addTask(column.id);
                      if (e.key === "Escape") {
                        setAddingTo(null);
                        setNewTitle("");
                      }
                    }}
                    autoFocus
                    className="h-9 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => {
                      setAddingTo(null);
                      setNewTitle("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="sm" onClick={() => addTask(column.id)} className="w-full">
                  Ajouter
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
                onClick={() => setAddingTo(column.id)}
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Ajouter
              </Button>
            )}
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}