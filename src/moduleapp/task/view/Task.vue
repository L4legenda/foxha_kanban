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
    openModal(task: TaskType) {
      this.selecTask = tasks;

      this.isModal = true;
    },
  },
  computed: {},
  mounted() {},
  components: {},
});
</script>