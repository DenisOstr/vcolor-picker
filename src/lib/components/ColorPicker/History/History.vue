<template>
    <div class="ready-colors-container" v-if="historyColors.length != 0">
        <p class="container-heading">History</p>
        <div class="color-boxes-container">
            <a class="color-box" :style="`background-color: ${item};`" :key="index" v-for="(item, index) in historyColors" @click="selectColor(item)" />
        </div>
    </div>
</template>

<script setup>
    import { ref, watchEffect } from 'vue'
    import { useStore } from 'vuex'

    import { hexToRgb } from '@/lib/helpers';

    const store = useStore()

    const props = defineProps({
        updateColor: Function
    })

    const historyColors = ref(store.state.colorHistory)

    const selectColor = (hexCode) => {
        const color = hexToRgb(hexCode)

        if (color) {
            props.updateColor(color)
        }
    }
</script>