<template>
    <el-dialog v-model="modal" width="300px" title="Добавить маркер">
        <el-form label-position="top" :model="form">
            <el-form-item label="Название">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Цвет">
                <div class="color__list">
                    <div class="color__item" :class="{ active: form.color == marker_color.color }"
                        v-for="(marker_color, key) in color_list" :key="key" :style="generateStyle(marker_color)"
                        @click="clickColor(marker_color)">
                    </div>
                </div>
            </el-form-item>
        </el-form>

        <el-button class="marker__btn--add-marker" @click="_createMarker()">Добавить маркер</el-button>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from 'vuex'
import { MarkerColor } from "../model/types";

export default defineComponent({
    name: "MarkerCreateModal",
    data: () => ({
        form: {
            name: "",
            color: "",

        }
    }),
    methods: {
        ...mapActions("Marker", [
            "close_modal_create",
            "readMarkerColor",
            "createMarker",
        ]),
        generateStyle(marker_color: MarkerColor) {
            return {
                backgroundColor: marker_color.color,
            }
        },
        clickColor(marker_color: MarkerColor) {
            this.form.color = marker_color.color;
        },
        _createMarker() {
            this.createMarker(this.form);
            this.close_modal_create();
        }
    },
    computed: {
        ...mapGetters("Marker", [
            "is_modal_create",
            "color_list",
        ]),
        modal: {
            get() {
                return this.is_modal_create;
            },
            set(value: boolean) {

                if (!value) {
                    this.close_modal_create();
                }
            }
        }
    },
    created() {
        this.readMarkerColor();
    },
    updated() {
        this.form.name = "";
        this.form.color = "";
    }
});
</script>
<style lang="scss" scoped>
.color {
    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    &__item {
        padding: 16px 24px;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        text-shadow: 0 0 2px #000;
        box-sizing: border-box;

        &.active {
            border: 2px solid #00000060;
            padding: 14px 22px;
            box-shadow: 0 0 4px #00000080;
        }
    }

    &__btn {
        &--add-marker {
            margin-top: 12px;
            width: 100%;
        }
    }
}
</style>