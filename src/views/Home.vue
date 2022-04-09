<template>
  <div class="home">
    <h2 class="title">Название Бокса</h2>
    <p class="description">Описание Бокса</p>
    <div class="board__body">
      <draggable class="board__list" :list="boards" item-key="id" group="board">
        <template #item="board">
          <div class="board__item">
            <h3 class="board__title">
              <span
                contenteditable="true"
                class="board__title--text"
                @input="editTitleBoard({ $event, keyBoard: board.index })"
              >{{ board.element?.name }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-icon class="edit_point">
                    <more-filled />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Action</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item
                      divided
                      style="color: red"
                      @click="deleteBoard(board.index)"
                    >Удалить</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </h3>

            <draggable class="draggable" :list="board.element.tasks" item-key="id" group="tasks">
              <template #item="task">
                <Task :task="task.element" />
              </template>
            </draggable>



            <div class="board__bottom">
              <button @click="insertTask(board.index)" class="board__link">Добавить задачу</button>
            </div>
          </div>
        </template>
      </draggable>
      <div class="box__right">
        <div class="box__add" @click="insertBoard()">+ Добавить доску</div>
      </div>
    </div>

    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex'
import { MoreFilled, Management } from "@element-plus/icons-vue";
import draggable from 'vuedraggable';
import Task from "@/components/task/view/Task.vue";

export default defineComponent({
  name: 'Home',
  data: () => ({
    selecTask: {
      name: "",
      description: "",
    },
  }),
  methods: {
    ...mapActions([
      'insertBoard',
      'insertTask',
      'deleteBoard',
      'deleteTask',
      'editTitleBoard',
    ]),
  },
  computed: {
    ...mapGetters([
      'boards',
    ])
  },
  mounted() {
  },
  components: {
    draggable: draggable,
    MoreFilled,
    Management,
    Task,
  },
});
</script>
<style lang="scss">
.board {
  &__body{
    display: flex;
    gap: 40px;
    padding: 20px 40px;
    width: 100%;
    height: calc(100vh - 120px);
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
  }
  &__title {
    display: flex;
    align-items: center;
    margin: 10px 0;

    &--text {
      width: 100%;
      padding: 6px 8px;
      border-radius: 4px;
      box-sizing: border-box;
      &:focus {
        background: #fff;
        border: 2px solid rgb(12, 4, 162);
        outline: none;
      }
    }
  }
  &__list {
    display: flex;
    align-items: flex-start;
    gap: 40px;
    height: 100%;
  }
  &__item {
    width: 300px;
    max-height: 100vh;
    padding: 16px;
    background: #f6f8fc;
    box-shadow: 0 0 5px #0005;
    flex-shrink: 0;
    flex-basis: 300px;
    position: relative;
    overflow: hidden;
    border-radius: 5px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(to right, #00b4db, #0083b0);
    }
  }
  &__bottom {
    padding-top: 10px;
    text-align: center;
  }
  &__link {
    text-decoration: none;
    color: #2a2a2a;
    font-weight: 600;
    font-size: 14px;
    background: none;
    border: none;
    cursor: pointer;
    user-select: none;
  }
}

.box {
  &__right {
    width: 300px;
    flex-shrink: 0;
    flex-basis: 300px;
  }
  &__add {
    $color_bg: #e8e9ed;

    background: $color_bg;
    padding: 10px 20px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    color: #2c2c2c;
    font-weight: 400;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: darken($color_bg, 10%);
    }
    &:active {
      box-shadow: 0 0 3px #0004;
    }
  }
}
.draggable {
  max-height: calc(100% - 120px);
  min-height: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 4px;
}
.edit_point {
  width: 16px;
  padding: 8px;
  border-radius: 4px;
  height: 16px;
  margin-left: auto;
  cursor: pointer;
  &:hover {
    background: #d7d7d7;
  }
}
.modal {
  &--bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #0004;
  }
  &__title {
    display: flex;
    align-items: center;
    &--icon {
      height: 38px;
    }
    &--text {
      width: 100%;
      padding: 6px 8px;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 20px;
      &:focus {
        background: #fff;
        border: 2px solid rgb(12, 4, 162);
        outline: none;
      }
    }
  }
  &__body {
    display: flex;
    &--main {
      width: 70%;
      box-sizing: border-box;
      padding: 10px;
    }
    &--sidebar {
      width: 30%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  &__textarea {
    width: 100%;
    height: 100px;
    resize: none;
    border-radius: 4px;
    border: 2px solid #0003;
    padding: 4px;
    transition: 300ms;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border: 2px solid #9db7e1;
    }
  }
}
.sidebar {
  &__btn {
    width: 100%;
    margin-left: 0px !important;
  }
}
</style>