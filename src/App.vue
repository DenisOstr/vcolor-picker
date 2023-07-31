<template>
    <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
        <VColorPicker :isCanvas="true" :canvas="canvas" :multipleLayers="true" :color="color" :presetEnabled="true" :historyEnabled="true" :onStartChange="color => onChange(color, 'start')"
            :eyeDropperEnabled="true" :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" @eyeDropperEvent="eyeDropperState = $event" />

        <VColorPicker :isCanvas="false" container="artboard" :multipleLayers="false" :isGradient="true" :onStartChange="color => onChange(color, 'start')"
            :eyeDropperEnabled="true" :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" @eyeDropperEvent="eyeDropperState = $event" />

        <!-- <canvas id="canv" width="600" height="400" class="absolute right-4 top-4 bg-gray-200 rounded-md" ref="canvasRef"></canvas> -->
        
        <div class="w-full flex justify-end p-2">
            <canvas id="canv" class="bg-gray-200 rounded-md" ref="canvasRef"></canvas>
        </div>
        
        <!-- <div class="absolute right-5 top-5">
            <div id="artboard">
                <div class=" bg-gray-200 w-[600px] h-[400px] rounded-md">
                    <p>Heading text</p>
                    <svg viewBox="0 0 100 100" style="width: 100px; height: 100px; z-index: 100; opacity: 1; transform: translate(50px, 50px); fill: rgb(0, 0, 0); stroke: none; stroke-width: 0;"><path d="M0,0 h100 a0,0 0 0 1 0,0 v100 a0,0 0 0 1 -0,0 h-100 a0,0 0 0 1 -0,-0 v-100 a0,0 0 0 1 0,-0 z"></path></svg>
                </div>
            </div>
        </div> -->
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
    const eyeDropperState = ref(false)
    const canvasRef = ref({})
    const canvas = ref()

    onMounted(() => {
        canvas.value = new fabric.Canvas(canvasRef.value, {
            width: 500,
            height: 500,
            background: '#777'
        })
    })

    // Methods
    const onChange = (attrs, name) => {
        color.value = { ...attrs }

        console.log(attrs, name)
    }
</script>