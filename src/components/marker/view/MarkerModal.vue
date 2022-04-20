<template>
    <el-dialog v-model="modal" width="300px" title="Маркер">
        <div class="marker__list">
            <div class="marker__item" v-for="(element, key) in markers" :key="key" :style="generateStyle(element)" >
                {{ element.name }}
            </div>

        </div>
        <el-button class="marker__btn--add-marker" @click="open_modal_create()">Добавить маркер</el-button>
    </el-dialog>
    <marker-create-modal/>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from 'vuex'
import MarkerCreateModal from "./MarkerCreateModal.vue"

export default defineComponent({
    name: "MarkerModal",
    data: () => ({
    }),
    methods: {
        ...mapActions("Marker", [
            "close_modal",
            'open_modal_create',
            'readMarker',
        ]),
        generateStyle(element: any) {
            return {
                backgroundColor: element.color,
            }
        }
    },
    computed: {
        ...mapGetters("Marker", [
            "is_modal",
            "markers",
        ]),
        modal: {
            get(){
                return this.is_modal;
            },
            set(value: boolean) {                
                if(!value){
                    this.close_modal();
                }
            }
        }
    },
    components: {
        MarkerCreateModal,
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