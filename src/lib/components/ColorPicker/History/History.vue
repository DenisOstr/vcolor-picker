<template>
    <div class="ready-colors-container" v-if="historyData && historyData.length != 0">
        <p class="container-heading">History</p>
        <div class="color-boxes-container">
            <a class="color-box" :style="`background-color: ${item};`" :key="index" v-for="(item, index) in historyData" @click="selectColor(item)" />
        </div>
    </div>
</template>

<script setup>
    import { ref, watchEffect } from 'vue'

    import { hexToRgb } from '@/lib/helpers';

    const props = defineProps({
        historyData: Array,
        updateColor: Function
    })

    const selectColor = (hexCode) => {
        const color = hexToRgb(hexCode)

        if (color) {
            props.updateColor(color)
        }
    }
</script>