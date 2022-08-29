<template>
    <div class="picker-area">
        <Picker :red="red" :green="green" :blue="blue" :hue="hue" :saturation="saturation" :value="value" :updateColor="updateColor" />

        <GradientPoints :type="type" :degree="degree" :points="points" :activePointIndex="activePointIndex"
            :changeActivePointIndex="changeActivePointIndex" :updateGradientLeft="updateGradientLeft" :addPoint="addPoint"
            :removePoint="removePoint" v-if="isGradient" />

        <div class="preview">
            <Preview :red="red" :green="green" :blue="blue" :alpha="alpha" :isGradient="isGradient"
                :points="points" :gradientDegree="degree" :gradientType="type" />

            <div class="color-hue-alpha">
                <Hue :hue="hue" :saturation="saturation" :value="value" :updateColor="updateColor" />
                <Alpha :alpha="alpha" :red="red" :green="green" :blue="blue" :updateColor="updateColor" />
            </div>

            <!-- <button class="bg-gray-200 w-10 h-10 flex justify-center items-center rounded">
                <img src="assets/images/eye-dropper.svg" alt="" class="w-6 h-6">
            </button> -->
        </div>
    </div>
</template>

<script setup>
    import Picker from './Picker/Picker.vue'
    import Preview from './Preview/Preview.vue'
    import Hue from './Hue/Hue.vue'
    import Alpha from './Alpha/Alpha.vue'
    import GradientPoints from './GradientPoints/GradientPoints.vue'

    name: 'Area'

    // Props
    defineProps({
        isGradient: Boolean,
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        hue: Number,
        saturation: Number,
        value: Number,
        updateColor: Function,
        points: Array,
        degree: Number,
        type: String,
        activePointIndex: Number,
        changeGradientControl: Function,
        changeActivePointIndex: Function,
        updateGradientLeft: Function,
        addPoint: Function,
        removePoint: Function
    })
</script>