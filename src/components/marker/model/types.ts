import { TaskType } from "@/components/task/model/types";

interface MarkerType {
    id: number;
    name: string;
    color: string;
    Task: TaskType;
}
interface MarkerColor {
    color: string
}
interface MarkerStateType {
    is_modal: boolean;
    is_modal_create: boolean;
    color_list: Array<MarkerColor>;
    markers: Array<MarkerType>;
}

export {
    MarkerType,
    MarkerColor,
    MarkerStateType,
}