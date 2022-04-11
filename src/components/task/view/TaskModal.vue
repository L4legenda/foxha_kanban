<template>
    <el-dialog v-model="is_modal">
        <div class="modal__header">
            <h3 class="modal__title">
                <el-icon class="modal__title--icon">
                    <management />
                </el-icon>
                <list-tasks />
                <span contenteditable="true" class="modal__title--text">{{ }}</span>
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