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
                <div class="task" @click="openModal(task.element)">
                  <div class="marker__list">
                    <el-tag>Tag 1</el-tag>
                  </div>
                  <h3 class="task__title">{{ task.element.name }}</h3>
                  <div class="bottom__content">
                    <div class="info"></div>
                    <div class="users__list"></div>
                  </div>
                </div>
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

    <el-dialog v-model="isModal">
      <div class="modal__header">
        <h3 class="modal__title">
          <el-icon class="modal__title--icon">
            <management />
          </el-icon>
          <list-tasks />
          <span
            contenteditable="true"
            class="modal__title--text"
            @input="editTitle"
          >{{ selecTask.name }}</span>
        </h3>
      </div>
      <div class="modal__body">
        <div class="modal__body--main">
          <textarea class="modal__textarea" v-model="selecTask.description"></textarea>
        </div>
        <div class="modal__body--sidebar">
          <el-button class="sidebar__btn">Метки</el-button>
          <el-button type="danger" class="sidebar__btn">Удалить</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex'
import { MoreFilled, Management } from "@element-plus/icons-vue";
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'Home',
  data: () => ({
    isModal: false,
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
    openModal(tasks: any) {
      this.selecTask = tasks;

      this.isModal = true;
    },
    closeModal() {
      this.isModal = false;
    },
    editTitle(e: any) {
      this.selecTask.name = e.target.textContent

    }
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
.task {
  background: #ffffff;
  padding: 14px;
  border-radius: 5px;
  box-shadow: 0 0 5px #0003;
  user-select: none;
  cursor: pointer;

  &__title {
    margin: 10px 0;
    font-weight: 200;
    font-size: 16px;
    color: #393939;
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