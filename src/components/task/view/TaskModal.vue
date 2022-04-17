<template>
    <el-dialog v-model="modal">
        <div class="modal__header">
            <h3 class="modal__title">
                <el-icon class="modal__title--icon">
                    <management />
                </el-icon>
                <list-tasks />
                <input type="text"  @input="submitTitle($event, selected_task?.id)" class="modal__title--text" :value="selected_task?.name">
            </h3>
        </div>
        <div class="modal__body">
            <div class="modal__body--main">
                <textarea class="modal__textarea"
                    @input="submitContent($event, selected_task?.id)" :value="selected_task?.content"></textarea>
            </div>
            <div class="modal__body--sidebar">
                <el-button class="sidebar__btn">Метки</el-button>
                <el-popconfirm title="Уверены что хотите удалить задачу ?" @confirm="deleteTask(selected_task?.id)">
                    <template #reference>
                        <el-button type="danger" class="sidebar__btn">Удалить</el-button>
                    </template>
                </el-popconfirm>
                
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
    name: "TaskModal",
    data: () => ({
        numberTimeout: 0,
    }),
    methods: {
        ...mapActions("Task", [
            "select_task",
            "open_modal",
            "close_modal",
            "updateTaskTitle",
            "updateTaskContent",
            "deleteTask",
        ]),

        submitTitle(event: Event, id_task: number) {
            clearTimeout(this.numberTimeout);
            this.numberTimeout = window.setTimeout(() => {
                const element: HTMLInputElement = event.target as HTMLInputElement;
                const value: string | null = element.value;
                this.updateTaskTitle({ id: id_task, name: value });
            }, 300);
        },

        submitContent(event: Event, id_task: number) {
            clearTimeout(this.numberTimeout);
            this.numberTimeout = window.setTimeout(() => {
                const element: HTMLInputElement = event.target as HTMLInputElement;
                const value: string = element.value;
                this.updateTaskContent({ id: id_task, name: value });
            }, 300);
        },
    },
    computed: {
        ...mapGetters("Task", [
            "is_modal",
            'selected_task',
        ]),
        modal: {
            get() {
                return this.is_modal;
            },
            set(value: boolean) {
                value ? this.open_modal() : this.close_modal();
            }
        }
    },
    mounted() { },
    components: {},
});
</script>
<style lang="scss">
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
            border: 2px solid #fff;

            &:focus {
                background: #fff;
                border: 2px solid #006adb60;
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