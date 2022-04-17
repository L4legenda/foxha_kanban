import { BoardType } from "../../board/model/types";
interface TaskType {
    id: number;
    name: string;
    position: number;
    Board: BoardType;
}
interface TaskStateType {
    selected_task?: TaskType,
    is_modal: boolean;
}

interface TaskInputType {
    key_board?: number;
    key_task?: number;
}

export {
    TaskType,
    TaskStateType,
    TaskInputType,
}