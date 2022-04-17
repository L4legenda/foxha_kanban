<template>
    <div class="board__body">
        <draggable class="board__list" :list="Boards" item-key="id" group="board" @end="endBoardMove">
            <template #item="board">
                <div class="board__item">
                    <h3 class="board__title">
                        <span contenteditable="true" class="board__title--text"
                            @input="submitTitle($event, board.element.id)">{{ board.element?.name }}</span>
                        <el-dropdown>
                            <span class="el-dropdown-link" style="cursor: pointer">
                                <el-icon class="edit_point">
                                    <more-filled />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>Action</el-dropdown-item>
                                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                                    <el-dropdown-item divided style="color: red" @click="deleteBoard(board.element.id)">
                                        Удалить</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </h3>

                    <draggable class="draggable" :list="board.element.Tasks" item-key="id"
                        @end="endTaskMove($event)" group="tasks" :data-index="board.index">
                        <template #item="task">
                            <task :task="task.element" />
                        </template>
                    </draggable>


                    <div class="board__bottom">
                        <button @click="createTask({ id_board: board.element.id, index_board: board.index })"
                            class="board__link">Добавить задачу</button>
                    </div>

                </div>
            </template>
        </draggable>

        <div class="box__right">
            <div class="box__add" @click="createBoard()">+ Добавить доску</div>
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
    name: "Board",
    data: () => ({
        numberTimeout: 0,
    }),
    methods: {
        ...mapActions([
            'insertBoard',
            'insertTask',
            'deleteTask',
        ]),
        ...mapActions('Board', [
            'createBoard',
            'readBoard',
            'deleteBoard',
            'updateBoardTitle',
            'updateBoardMove',
        ]),
        ...mapActions('Task', [
            "createTask",
            'updateTaskMove',
        ]),

        submitTitle(event: Event, id_board: number) {


            clearTimeout(this.numberTimeout);
            this.numberTimeout = window.setTimeout(() => {
                const element: HTMLElement = event.target as HTMLElement;
                const value: string | null = element.textContent;
                this.updateBoardTitle({ id: id_board, name: value });
            }, 300);


        },

        endBoardMove(e: any) {
            this.updateBoardMove(e.newIndex);
        },

        endTaskMove(event: any) {
            console.log(event);
            const index_board: number = event.to.dataset.index;
            console.log(index_board);
            
            this.updateTaskMove({ indexTask: event.newIndex, indexBoard: index_board });
        }
    },
    computed: {
        ...mapGetters('Board', [
            'Boards',
        ])
    },
    mounted() {
        this.readBoard();
    },
    components: {
        draggable,
        MoreFilled,
        Management,
        Task,
    },
})
</script>
<style lang="scss">
.board {
    &__body {
        display: flex;
        gap: 40px;
        padding: 20px 40px;
        width: 100%;
        height: calc(100vh - 150px);
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
            border: 2px solid #fff;

            &:focus {
                background: #fff;
                border: 2px solid #006adb60;
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
        max-height: 76vh;
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

.draggable {
    max-height: calc(76vh - 130px);
    min-height: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-x: auto;
    padding: 20px 4px;
}
</style>