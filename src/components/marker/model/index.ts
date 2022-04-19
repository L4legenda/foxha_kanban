import { MarkerStateType } from "./types";
import { MarkerType } from "./types";
// import Api from "../api";

// const api = new Api();


const state: MarkerStateType = {
    is_modal: false,
}

const getters = {
    is_modal(state: MarkerStateType): boolean {
        return state.is_modal;
    }
}

const mutations = {

    /* CRUD */

    open_modal(state: MarkerStateType) {
        state.is_modal = true;
    },

    close_modal(state: MarkerStateType) {
        state.is_modal = false;
    },
}

const actions = {
    /* CRUD */

    async open_modal({ commit }: { commit: any }) {
        commit("open_modal");
    },

    async close_modal({ commit }: { commit: any }) {
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