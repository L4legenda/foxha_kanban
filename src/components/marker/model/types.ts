import { TaskType } from "@/components/task/model/types";

interface MarkerType {
    id: number;
    name: string;
    color: string;
    Task: TaskType;
}
interface MarkerStateType {
    is_modal: boolean;
}

export {
    MarkerType,
    MarkerStateType,
}