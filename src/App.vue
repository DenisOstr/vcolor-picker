<template>
    <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
        <VColorPicker :isCanvas="false" container="artboard" :multipleLayers="false" :color="color" :presetEnabled="true" :historyEnabled="true" :onStartChange="color => onChange(color, 'start')"
            :eyeDropperEnabled="true" :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" @eyeDropperEvent="eyeDropperState = $event" />

        <VColorPicker :isCanvas="false" container="artboard" :multipleLayers="false" :isGradient="true" :onStartChange="color => onChange(color, 'start')"
            :eyeDropperEnabled="true" :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" @eyeDropperEvent="eyeDropperState = $event" />

        <!-- <canvas id="canv" width="600" height="400" class="absolute right-4 top-4 bg-gray-200 rounded-md" ref="canvas"></canvas> -->
        <div id="artboard" class="absolute right-5 top-5">
            <div class="relative bg-gray-200 w-[600px] h-[400px] rounded-md">
                <div class="absolute top-10 left-10 bg-green-400 w-32 h-32"></div>
                <div class="absolute bottom-10 right-10 bg-violet-600 w-32 h-32 rounded-full"></div>
            </div>
        </div>
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
    // onMounted(() => {
    //     if (canvas.value) {
    //         const ctx = canvas.value.getContext('2d')

    //         ctx.beginPath()
    //         ctx.fillStyle = '#ff0000'
    //         ctx.rect(30, 30, 100, 100)

    //         ctx.fill()

    //         ctx.beginPath()
    //         ctx.fillStyle = '#b668ff'
    //         ctx.arc(300, 200, 100, 0, Math.PI * 2, false)

    //         ctx.fill()
    //     }
    // })

    // Methods
    const onChange = (attrs, name) => {
        color.value = { ...attrs }

        console.log(attrs, name)
    }
</script>