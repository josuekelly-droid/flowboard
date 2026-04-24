import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | null;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  dragHandleProps?: any;
  isDragging?: boolean;
}

const priorityColors: Record<string, string> = {
  LOW: "bg-slate-200 text-slate-700",
  MEDIUM: "bg-yellow-200 text-yellow-800",
  HIGH: "bg-red-200 text-red-800",
};

const priorityLabels: Record<string, string> = {
  LOW: "Basse",
  MEDIUM: "Moyenne",
  HIGH: "Haute",
};

export function TaskCard({ task, onDelete, dragHandleProps, isDragging }: TaskCardProps) {
  return (
    <Card
      className={`bg-white dark:bg-slate-950 cursor-grab active:cursor-grabbing ${
        isDragging ? "shadow-lg ring-2 ring-primary" : "shadow-sm"
      }`}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-2">
          <div {...dragHandleProps} className="mt-0.5 shrink-0 text-muted-foreground">
            <GripVertical className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{task.title}</p>
            {task.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge className={`text-xs ${priorityColors[task.priority]}`}>
                {priorityLabels[task.priority]}
              </Badge>
              {task.dueDate && (
                <span className="text-xs text-muted-foreground">
                  {new Date(task.dueDate).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-muted-foreground hover:text-red-500"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}