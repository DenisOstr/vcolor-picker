<template>
    <div class="picker-area">
        <GradientPoints :type="type" :degree="degree" :points="points" :activePointIndex="activePointIndex"
            :changeActivePointIndex="changeActivePointIndex" :updateGradientLeft="updateGradientLeft" :addPoint="addPoint"
            :removePoint="removePoint" v-if="isGradient && gradientPosition == 'top'" />

        <Picker :red="red" :green="green" :blue="blue" :hue="hue" :saturation="saturation" :value="value" :updateColor="updateColor" />

        <GradientPoints :type="type" :degree="degree" :points="points" :activePointIndex="activePointIndex"
            :changeActivePointIndex="changeActivePointIndex" :updateGradientLeft="updateGradientLeft" :addPoint="addPoint"
            :removePoint="removePoint" v-if="isGradient && gradientPosition == 'bottom'" />

        <div class="preview">
            <Preview :red="red" :green="green" :blue="blue" :alpha="alpha" :isGradient="isGradient"
                :points="points" :gradientDegree="degree" :gradientType="type" />

            <div class="color-hue-alpha">
                <Hue :hue="hue" :saturation="saturation" :value="value" :updateColor="updateColor" />
                <Alpha :alpha="alpha" :red="red" :green="green" :blue="blue" :updateColor="updateColor" />
            </div>

            <EyeDropper :canvas="canvas" :multipleLayers="multipleLayers" :updateColor="updateColor" @handleEyeDropperEvent="$emit('eyeDropperEvent', $event)" v-if="eyeDropperEnabled" />
        </div>
    </div>
</template>

<script setup>
    import Picker from './Picker/Picker.vue'
    import Preview from './Preview/Preview.vue'
    import Hue from './Hue/Hue.vue'
    import Alpha from './Alpha/Alpha.vue'
    import GradientPoints from './GradientPoints/GradientPoints.vue'
    import EyeDropper from './EyeDropper/EyeDropper.vue'

    name: 'Area'

    // Props
    defineProps({
        isGradient: Boolean,
        gradientPosition: String,
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        hue: Number,
        saturation: Number,
        value: Number,
        points: Array,
        degree: Number,
        type: String,
        activePointIndex: Number,
        eyeDropperEnabled: Boolean,
        canvas: Object,
        multipleLayers: Boolean,
        updateColor: Function,
        changeGradientControl: Function,
        changeActivePointIndex: Function,
        updateGradientLeft: Function,
        addPoint: Function,
        removePoint: Function
    })

    defineEmits(['eyeDropperEvent'])
</script>