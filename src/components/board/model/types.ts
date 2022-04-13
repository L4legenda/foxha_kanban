import {TaskType} from "@/components/task/model/types";


interface BoardType {
    name: string;
    id: number;
    position: number;
    Tasks: TaskType;
}
interface BoardStateType {
    Boards: Array<BoardType>;
}

interface BoardInputType {
    key_board?: number;
    key_task?: number;
}

export {
    BoardType,
    BoardStateType,
    BoardInputType,
}