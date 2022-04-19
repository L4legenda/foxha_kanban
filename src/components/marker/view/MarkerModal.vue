<template>
    <el-dialog v-model="modal" width="300px" title="Маркер">
        <div class="marker__list">
            <div class="marker__item" v-for="(element, key) in marker_list" :key="key" :style="generateStyle(element)">
                {{ element.name }}
            </div>

        </div>
        <el-button class="marker__btn--add-marker">Добавить маркер</el-button>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
    name: "MarkerModal",
    data: () => ({
        marker_list: [
            {
                name: "Color 1",
                color: "#61bd4f",
            },
            {
                name: "Color 2",
                color: "#cd8313",
            },
            {
                name: "Color 3",
                color: "#b04632",
            },
            {
                name: "Color 4",
                color: "#89609e",
            },
            {
                name: "Color 5",
                color: "#055a8c",
            },
            {
                name: "Color 6",
                color: "#4bbf6b",
            },
        ]
    }),
    methods: {
        ...mapActions("Marker", [
            "close_modal"
        ]),
        generateStyle(element: any) {
            return {
                backgroundColor: element.color,
            }
        }
    },
    computed: {
        ...mapGetters("Marker", [
            "is_modal"
        ]),
        modal: {
            get(){
                return this.is_modal;
            },
            set(value: boolean) {
                console.log();
                
                if(!value){
                    this.close_modal();
                }
            }
        }
    }
});
</script>
<style lang="scss" scoped>
.marker {
    &__item {
        padding: 12px 12px;
        margin: 6px 0px;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        text-shadow: 0 0 2px #000;
        letter-spacing: 0.8px;
    }

    &__btn {
        &--add-marker {
            margin-top: 12px;
            width: 100%;
        }
    }
}
</style>