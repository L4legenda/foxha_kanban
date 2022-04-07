<template>
  <div class="home">
    <h2 class="title">Название Бокса</h2>
    <p class="description">Описание Бокса</p>
    <div class="board__list">
      <div class="board__item" v-for="(board, board_key) in boards" :key="board_key">
        <h3 class="board__title">
          <span contenteditable="true" class="board__title--text">{{ board?.name }}</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-icon class="edit_point"><more-filled /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided style="color: red" @click="deleteBoard(board_key)">Удалить</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </h3>
        <draggable class="draggable" :list="board.tasks" item-key="id" group="tasks">
          <template #item="{ element }">
            <div class="task" @click="openModal()">
              <div class="marker__list">
                <div class="marker__item">Hard Work</div>
              </div>
              <h3 class="task__title">{{ element.name }}</h3>
              <div class="bottom__content">
                <div class="info"></div>
                <div class="users__list"></div>
              </div>
            </div>
          </template>
        </draggable>

        <div class="board__bottom">
          <button @click="insertTask(board_key)" class="board__link">Добавить задачу</button>
        </div>
      </div>
      <div class="box__right">
        <div class="box__add" @click="insertBoard()">+ Добавить доску</div>
      </div>
    </div>

    <div class="modal--bg" @click.self="closeModal()" v-if="isModal">
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">
            <el-icon class="modal__title--icon"><management /></el-icon>
            <list-tasks  />
            <span contenteditable="true" class="modal__title--text">Task #1</span>
          </h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex'
import {MoreFilled, Management} from "@element-plus/icons-vue";
import draggable from 'vuedraggable'

export default defineComponent({
  name: 'Home',
  data: () => ({
    isModal: false,
  }),
  methods: {
    ...mapActions([
      'insertBoard',
      'insertTask',
      'deleteBoard',
    ]),
    openModal() {
      this.isModal = true;
    },
    closeModal() {
      this.isModal = false;
    }
  },
  computed: {
    ...mapGetters([
      'boards',
    ])
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
    height: calc(100vh - 140px);
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
    padding-top: 20px;
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
  }
}
.task {
  background: #ffffff;
  padding: 14px;
  border-radius: 5px;
  box-shadow: 0 0 5px #0003;
  user-select: none;

  &__title {
    margin: 10px 0;
    font-weight: 200;
    font-size: 16px;
    color: #393939;
  }
}
.marker {
  &__list {
    display: flex;
  }
  &__item {
    padding: 6px 12px;
    background: linear-gradient(to bottom, #00b4db, #0083b0);
    color: #fff;
    font-size: 11px;
    letter-spacing: 1px;
    border-radius: 4px;
    box-shadow: 0 0 4px #0008;
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
  min-height: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: auto;
  max-height: calc(100% - 120px);
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
  width: 768px;
  min-height: 750px;
  background: #f4f5f7;
  position: absolute;
  left: 50%;
  top: 75px;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 0 8px #0005;
  padding: 8px 32px;
  box-sizing: border-box;

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
      &:focus {
        background: #fff;
        border: 2px solid rgb(12, 4, 162);
        outline: none;
      }
    }
  }
}
</style>