import { BoardType } from "@/components/board/model/types";
import { MarkerType } from "@/components/marker/model/types";
interface TaskType {
    id: number;
    name: string;
    position: number;
    Board: BoardType;
    Markers: Array<MarkerType>;
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