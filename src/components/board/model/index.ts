import { BoardStateType } from "./types";
import { BoardInputType } from "./types";
import Api from "../api";

const api = new Api();

const state: BoardStateType = {
    Boards: [],
}

const getters = {
    Boards(state: BoardStateType): BoardStateType['Boards'] {
        return state.Boards;
    },
}

const mutations = {
    /* CRUD BOARD */

    createBoard(state: BoardStateType, data: any) {
    },

    readBoard(state: BoardStateType, data: any) {
        state.Boards = data.data.Board;
    },

    updateBoard(state: BoardStateType) {

    },

    deleteBoard(state: BoardStateType) {

    }
}

const actions = {
    /* CRUD BOARD */

    async createBoard({ commit, dispatch }: { commit: any, dispatch: any }) {
        await api.createBoardFetch();
        const data = api.data;
        commit("createBoard", data);
        await dispatch("readBoard");
    },
    async readBoard({ commit }: { commit: any }) {
        await api.readBoardFetch();
        const data = api.data;
        commit("readBoard", data);
    },
    async updateBoardTitle({ commit, dispatch }: { commit: any, dispatch: any }, { id, name }: { id: number, name: string }) {
        await api.updateBoardTitleFetch(id, name);
        await dispatch("readBoard");

    },
    async updateBoardMove({ dispatch, state }: { dispatch: any, state: BoardStateType }, index: number,) {
        const board_left = state.Boards?.[index - 1];
        const board_main = state.Boards[index];
        const board_right = state.Boards?.[index + 1];

        let position_left = 0;
        let position_right = 0;

        if (!board_left && board_right) {
            position_left = 0;
            position_right = board_right.position;
        } else if (board_left && !board_right) {
            position_left = board_left.position;
            position_right = board_left.position + board_main.position + 1;
        } else if (!board_left && !board_right) {
            return;
        } else if (board_left && board_right) {
            position_left = board_left.position;
            position_right = board_right.position;
        }

        const newIndex = position_right - ((position_right - position_left) / 1000);
        await api.updateBoardMove(board_main.id, newIndex);
        await dispatch("readBoard");

    },

    async deleteBoard({ commit, dispatch }: { commit: any, dispatch: any }, id: number) {
        console.log(id);

        await api.deleteBoardFetch(id);
        const data = api.data;
        commit("deleteBoard", data);
        await dispatch("readBoard");
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}