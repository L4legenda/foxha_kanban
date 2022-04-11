import { TaskStateType } from "./types";
import { TaskInputType } from "./types";


const state: TaskStateType = {
    select_task: {
        id_board: 0,
        id_task: 0,
    },
    is_modal: false,
}

const getters = {
    select_task(state: TaskStateType): TaskStateType['select_task'] {
        return state.select_task;
    },
    is_modal(state: TaskStateType): boolean {
        return state.is_modal;
    }
}

const mutations = {
    select_task(state: TaskStateType, { key_board, key_task }: TaskInputType) {
        state.select_task = {
            id_board: key_board,
            id_task: key_task,
        }
    },

    open_modal(state: TaskStateType) {
        state.is_modal = true;
    },

    close_modal(state: TaskStateType) {
        state.is_modal = false;
    },
}

const actions = {
    select_task({ commit }: { commit: any }, { key_board, key_task }: TaskInputType) {
        commit("select_task", { key_board, key_task });
    },

    open_modal({ commit }: { commit: any }) {
        commit("open_modal");
    },

    close_modal({ commit }: { commit: any }) {
        commit("close_modal");
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}