import { MarkerStateType } from "./types";
import { MarkerType } from "./types";
import { MarkerColor } from "./types";
import Api from "../api";

const api = new Api();


const state: MarkerStateType = {
    is_modal: false,
    is_modal_create: false,
    color_list: [],
    markers: [],
}

const getters = {
    is_modal(state: MarkerStateType): boolean {
        return state.is_modal;
    },
    is_modal_create(state: MarkerStateType): boolean {
        return state.is_modal_create;
    },
    color_list(state: MarkerStateType): Array<MarkerColor> {
        return state.color_list;
    },
    markers(state: MarkerStateType): Array<MarkerType>{
        return state.markers;
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

    open_modal_create(state: MarkerStateType) {
        state.is_modal_create = true;
    },

    close_modal_create(state: MarkerStateType) {
        state.is_modal_create = false;
    },

    readMarker(state: MarkerStateType, data: Array<MarkerType>){
        state.markers = data;
    },

    readMarkerColor(state: MarkerStateType, data: Array<MarkerColor>) {
        state.color_list = data;
    }
}

const actions = {
    /* CRUD */

    async open_modal({ commit, dispatch }: { commit: any, dispatch: any}) {
        await dispatch("readMarker");
        commit("open_modal");
    },

    async close_modal({ commit }: { commit: any }) {
        commit("close_modal");
    },

    async open_modal_create({ commit }: { commit: any }) {
        commit("open_modal_create");
    },

    async close_modal_create({ commit, dispatch }: { commit: any, dispatch: any}) {
        await dispatch("readMarker");
        commit("close_modal_create");
    },

    async createMarker({ rootState }: { rootState: any }, { name, color }: { name: string, color: string }) {
        const task_id = rootState.Task.selected_task.id;
        await api.createMarkerFetch(name, color, task_id);
    },

    async readMarker({commit, rootState}: {commit: any, rootState: any}){
        const task_id = rootState.Task.selected_task.id;
        await api.readMarkerFetch(task_id);
        const data = await api.data?.data.Marker;
        commit("readMarker", data);
    },

    async readMarkerColor({ commit }: { commit: any }) {
        await api.readMarkerColorFetch();
        const data = await api.data?.data.MarkerColor;
        commit("readMarkerColor", data)
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}