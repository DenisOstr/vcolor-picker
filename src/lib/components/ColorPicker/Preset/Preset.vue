<template>
    <div class="ready-colors-container">
        <p class="container-heading">Preset</p>
        <div class="color-boxes-container">
            <a class="color-box" :style="`background-color: ${item};`" :key="index" v-for="(item, index) in presetColors" @click="selectColor(item)" />
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

    const presetColors = ref(store.state.presetColors)

    const selectColor = (hexCode) => {
        const color = hexToRgb(hexCode)

        if (color) {
            props.updateColor(color)
        }
    }
</script>