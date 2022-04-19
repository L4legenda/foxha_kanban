<template>
    <div class="home">
        <h2 class="title">Название Бокса</h2>
        <p class="description">Описание Бокса</p>
        <div class="view__data">
            <el-button-group>
                <el-button type="primary">Доски</el-button>
                <el-button type="primary">Таблица</el-button>
            </el-button-group>
        </div>
        <board />

        <task-modal />  
        <marker-modal />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Task from "@/components/task/view/Task.vue";
import TaskModal from "@/components/task/view/TaskModal.vue";
import Board from "@/components/board/view/Board.vue";
import MarkerModal from "@/components/marker/view/MarkerModal.vue";


export default defineComponent({
    name: 'Home',
    data: () => ({}),
    methods: {},
    computed: {},
    async mounted() { },
    components: {
        Task,
        TaskModal,
        Board,
        MarkerModal,
    },
});
</script>
<style lang="scss">
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

.view__data {
    display: flex;
    justify-content: flex-end;
}
</style>