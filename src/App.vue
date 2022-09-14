<template>
    <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
        <VColorPicker :canvas="canvas" :multipleLayers="false" :color="color" :presetEnabled="true" :historyEnabled="true" :onStartChange="color => onChange(color, 'start')"
            :eyeDropperEnabled="true" :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" @eyeDropperEvent="eyeDropperState = $event" />

        <VColorPicker :canvas="canvas" :multipleLayers="false" :isGradient="true" :onStartChange="color => onChange(color, 'start')"
            :eyeDropperEnabled="true" :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" @eyeDropperEvent="eyeDropperState = $event" />

        <canvas id="canv" width="600" height="400" class="absolute right-4 top-4 bg-gray-200 rounded-md" ref="canvas"></canvas>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<script setup>
    import { onMounted, ref, watchEffect } from 'vue';

    import { VColorPicker } from './lib'

    // Constants
    const color = ref({ red: 255, green: 0, blue: 0, alpha: 1 })
    const canvas = ref({})
    const eyeDropperState = ref(false)
    
    // Mounteds
    onMounted(() => {
        if (canvas.value) {
            const ctx = canvas.value.getContext('2d')

            ctx.beginPath()
            ctx.fillStyle = '#ff0000'
            ctx.rect(30, 30, 100, 100)

            ctx.fill()

            ctx.beginPath()
            ctx.fillStyle = '#b668ff'
            ctx.arc(300, 200, 100, 0, Math.PI * 2, false)

            ctx.fill()
        }
    })

    // Methods
    const onChange = (attrs, name) => {
        color.value = { ...attrs }

        console.log(attrs, name)
    }
</script>