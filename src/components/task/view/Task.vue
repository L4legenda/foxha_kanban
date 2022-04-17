<template>
  <div class="task" @click="openModal(task)">
    <div class="marker__list">
      <el-tag>Tag 1</el-tag>
    </div>
    <h3 class="task__title">{{ task.name }}</h3>
    <div class="bottom__content">
      <div class="info"></div>
      <div class="users__list"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapActions } from 'vuex'
import { TaskType } from "../model/types";

export default defineComponent({
  name: "Task",
  props: {
      task: {
        type: Object as PropType<TaskType>,
        required: true
      },
  },
  data: () => ({}),
  methods: {
    ...mapActions("Task", [
      "select_task",
      "open_modal",
    ]),
    async openModal(task: TaskType) {
      await this.select_task({ id_task: task.id });
      this.open_modal();
    },
  },
  computed: {},
  mounted() {},
  components: {},
});
</script>
<style lang="scss" scoped>
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
</style>