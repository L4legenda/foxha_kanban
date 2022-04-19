import { createStore } from 'vuex';
import Task from "@/components/task/model";
import Board from "@/components/board/model";
import Marker from "@/components/marker/model";

export default createStore({
  state: {
    _DEFAULT_BOARD: {
      name: "Board #1",
      tasks: []
    },

    _DEFAULT_TASK: {
      name: "Task #1",
      description: "",
    },

    boards: [
      {
        name: "Board #1",
        tasks: [
          {
            name: "Task #1",
            description: "",
          },
          {
            name: "Task #2",
            description: "",
          },
          {
            name: "Task #3",
            description: "",
          },
          {
            name: "Task #4",
            description: "",
          }
        ]
      }
    ]
  },
  getters: {
    boards(state){
      return state.boards;
    } 
  },
  mutations: {
    insertBoard(state){      
      state.boards.push({
        name: "Board #1",
        tasks: []
      });
    },
    insertTask(state, keyBoard){
      state.boards[keyBoard].tasks.push({
        name: "Task #1",
        description: "",
      });
    },
    deleteBoard(state, keyBoard){
      state.boards.splice(keyBoard, 1);
    },
    editTitleBoard(state, {$event, keyBoard}){
      const name = $event.target.textContent;
      state.boards[keyBoard].name = name; 
    }
  },
  actions: {
    insertBoard(context){
      context.commit("insertBoard");
    },
    insertTask(context, keyBoard){       
      context.commit("insertTask", keyBoard);
    },
    deleteBoard(context, keyBoard){
      context.commit("deleteBoard", keyBoard);
    },
    editTitleBoard(context, {$event, keyBoard}){
      context.commit("editTitleBoard", {$event, keyBoard});
    },
    deleteTask(context, keyBoard){
      context.commit("deleteTask", keyBoard);
    },
  },
  modules: {
    Task,
    Board,
    Marker,
  },
});
