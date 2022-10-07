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

    import { hexToRgb } from '@/lib/helpers';

    const props = defineProps({
        updateColor: Function
    })

    const presetColors = ref([
        '#FFFFFF', '#000000', '#64748B', '#6B7280', '#71717A', '#737373', '#78716C', '#EF4444', '#F97316',
        '#F59E0B', '#EAB308', '#84CC16', '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6',
        '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E'
    ])

    const selectColor = (hexCode) => {
        const color = hexToRgb(hexCode)

        if (color) {
            props.updateColor(color, 'onEndChange')
        }
    }
</script>