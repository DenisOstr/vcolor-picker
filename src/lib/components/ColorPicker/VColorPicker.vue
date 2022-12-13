<template>
    <div class="ui-color-picker">
        <Gradient :type="gradient.type" :gradientPosition="gradientPosition" :points="gradient.points" :degree="gradient.degree" :presetEnabled="presetEnabled"
            :historyEnabled="historyEnabled" :eyeDropperEnabled="eyeDropperEnabled" :isCanvas="isCanvas" :container="container" :canvas="canvas" :multipleLayers="multipleLayers"
            :onChange="onChange" :onStartChange="onStartChange" :onEndChange="onEndChange" @eyeDropperEvent="$emit('eyeDropperEvent', $event)" v-if="isGradient" />

        <Solid :red="color.red" :green="color.green" :blue="color.blue" :alpha="color.alpha" :hue="color.hue" :presetEnabled="presetEnabled"
            :historyEnabled="historyEnabled" :eyeDropperEnabled="eyeDropperEnabled" :isCanvas="isCanvas" :container="container" :canvas="canvas" :multipleLayers="multipleLayers" :saturation="color.saturation"
            :value="color.value" :onChange="onChange" :onStartChange="onStartChange" :onEndChange="onEndChange" @eyeDropperEvent="$emit('eyeDropperEvent', $event)" v-else />
    </div>
</template>

<script setup>
    import Gradient from './Gradient/Gradient.vue'
    import Solid from './Solid/Solid.vue'

    name: 'VColorPicker'

    defineProps({
        isGradient: {
            type: Boolean,
            default: false
        },

        color: {
            type: Object,
            default: () => ({
                red: 255,
                green: 0,
                blue: 0,
                alpha: 1,
                hue: 0,
                saturation: 100,
                value: 100
            })
        },

        gradient: {
            type: Object,
            default: () => ({
                type: 'linear',
                degree: 0,
                points: [
                    { left: 0, red: 0, green: 0, blue: 0, alpha: 1 },
                    { left: 100, red: 255, green: 0, blue: 0, alpha: 1 }
                ]
            })
        },

        isCanvas: Boolean,
        container: String,
        canvas: Object,
        multipleLayers: Boolean,

        gradientPosition: {
            type: String,
            default: 'bottom'
        },

        presetEnabled: {
            type: Boolean,
            default: true
        },

        historyEnabled: {
            type: Boolean,
            default: true
        },

        eyeDropperEnabled: {
            type: Boolean,
            default: true
        },

        onStartChange: {
            type: Function,
            default: () => {}
        },

        onChange: {
            type: Function,
            default: () => {}
        },

        onEndChange: {
            type: Function,
            default: () => {}
        }
    })

    defineEmits(['eyeDropperEvent'])
</script>