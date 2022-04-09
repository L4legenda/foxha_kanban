interface TaskType {
    name: string;
}
interface TaskStateType {
    select_task: {
        id_board?: number;
        id_task?: number;
    },
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