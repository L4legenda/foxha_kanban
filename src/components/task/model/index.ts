import { TaskStateType } from "./types";
import { TaskType } from "./types";
import { BoardType } from '../../board/model/types';
import Api from "../api";

const api = new Api();


const state: TaskStateType = {
    selected_task: undefined,
    is_modal: false,
}

const getters = {
    selected_task(state: TaskStateType): TaskStateType['selected_task'] {
        return state.selected_task;
    },
    is_modal(state: TaskStateType): boolean {
        return state.is_modal;
    }
}

const mutations = {

    /* CRUD */

    createTask(state: TaskStateType) {

    },

    readTask(state: TaskStateType, data: any) {

    },

    updateTask(state: TaskStateType) {

    },

    deleteTask(state: TaskStateType) {

    },

    select_task(state: TaskStateType, task: TaskType) {
        state.selected_task = task;
    },

    open_modal(state: TaskStateType) {
        state.is_modal = true;
    },

    close_modal(state: TaskStateType) {
        state.is_modal = false;
    },
}

const actions = {
    /* CRUD */

    async createTask({ dispatch, rootState }: any, { id_board, index_board }: { id_board: number, index_board: number }) {
        const board: BoardType = rootState.Board.Boards[index_board];
        console.log(board);

        const tasks = board.Tasks;
        let max_position = 0;
        for (let task of tasks) {
            if (task.position > max_position) {
                max_position = task.position;
            }
        }

        max_position += 1;
        await api.createTaskFetch(id_board, max_position);

        await dispatch("Board/readBoard", '', { root: true });
    },

    async updateTaskTitle({ dispatch }: { dispatch: any }, { id, name }: { id: number, name: string }) {
        await api.updateTaskTitleFetch(id, name);
    },

    async updateTaskContent({ dispatch }: { dispatch: any }, { id, name }: { id: number, name: string }) {
        await api.updateTaskContentFetch(id, name);
    },

    async deleteTask({ dispatch }: { dispatch: any }, id_task: number){
        await api.deleteTaskFetch(id_task);
        await dispatch("Board/readBoard", '', { root: true });
        await dispatch("close_modal");
    },

    async select_task({ commit }: { commit: any }, { id_task }: {id_task: number}) {
        console.log(id_task);
        await api.readTaskFetch(id_task);
        const task = await api.data?.data?.Task?.[0];
        commit("select_task", task);
    },

    async open_modal({ commit }: { commit: any }) {
        commit("open_modal");
    },

    async close_modal({ commit, dispatch }: { commit: any, dispatch: any }) {
        await dispatch("Board/readBoard", '', { root: true });
        commit("close_modal");
    },

    async updateTaskMove({ dispatch, rootState }: { dispatch: any, rootState: any },
        { indexBoard, indexTask }: { indexBoard: number, indexTask: number }) {
        const board = rootState.Board.Boards[indexBoard];

        const task_left = board.Tasks?.[indexTask - 1];
        const task_main = board.Tasks[indexTask];
        const task_right = board.Tasks?.[indexTask + 1];

        let position_left = 0;
        let position_right = 0;

        if (!task_left && task_right) {
            position_left = 0;
            position_right = task_right.position;
        } else if (task_left && !task_right) {
            position_left = task_left.position;

            const tasks = board.Tasks;
            let max_position = 0;
            for (let task of tasks) {
                if (task.position > max_position) {
                    max_position = task.position;
                }
            }

            position_right = max_position + 0.001;
        } else if (!task_left && !task_right) {
            position_right = 1;
        } else if (task_left && task_right) {
            position_left = task_left.position;
            position_right = task_right.position;
        }

        const newPosition = position_right - ((position_right - position_left) / 1000);
        await api.updateTaskMove(board.id, task_main.id, newPosition);
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}