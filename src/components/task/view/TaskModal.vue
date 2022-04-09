<template>
    <el-dialog v-model="is_modal">
        <div class="modal__header">
            <h3 class="modal__title">
                <el-icon class="modal__title--icon">
                    <management />
                </el-icon>
                <list-tasks />
                <span
                    contenteditable="true"
                    class="modal__title--text"
                >{{ }}</span>
            </h3>
        </div>
        <div class="modal__body">
            <div class="modal__body--main">
                <textarea class="modal__textarea"></textarea>
            </div>
            <div class="modal__body--sidebar">
                <el-button class="sidebar__btn">Метки</el-button>
                <el-button type="danger" class="sidebar__btn">Удалить</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: "TaskModal",
  props: {},
  data: () => ({}),
  methods: {
    ...mapActions("Task", [
      "select_task",
      "open_modal",
    ]),
  },
  computed: {
      ...mapGetters("Task", [
          "is_modal",
      ])
  },
  mounted() {},
  components: {},
});
</script>