import { createStore } from 'vuex';

export default createStore({
  state: {
    _DEFAULT_BOARD: {
      name: "Board #1",
      tasks: []
    },

    _DEFAULT_TASK: {
      name: "Task #1"
    },

    boards: [
      {
        name: "Board #1",
        tasks: [
          {
            name: "Task #1"
          },
          {
            name: "Task #2"
          },
          {
            name: "Task #3"
          },
          {
            name: "Task #4"
          }
        ]
      },
      {
        name: "Board #2",
        tasks: [
          {
            name: "Task #1"
          },
          {
            name: "Task #2"
          },
          {
            name: "Task #3"
          },
          {
            name: "Task #4"
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
        name: "Task #1"
      });
    },
    deleteBoard(state, keyBoard){      
      state.boards.splice(keyBoard, 1);
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
    }
  },
  modules: {
  },
});
