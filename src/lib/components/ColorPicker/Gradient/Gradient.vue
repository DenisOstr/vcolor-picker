<template>
    <GradientControls :type="gradientType" :degree="gradientDegree" :changeGradientControl="changeGradientControl" />

    <Area :red="colorRed" :green="colorGreen" :blue="colorBlue" :alpha="colorAlpha" :hue="colorHue" :saturation="colorSaturation"
        :value="colorValue" :updateColor="updateColor" :isGradient="true" :type="gradientType" :degree="gradientDegree"
        :points="gradientPoints" :activePointIndex="activePointIndex" :changeGradientControl="changeGradientControl"
        :changeActivePointIndex="changeActivePointIndex" :updateGradientLeft="updateGradientLeft" :addPoint="addPoint" :removePoint="removePoint" />

    <Preview :red="colorRed" :green="colorGreen" :blue="colorBlue" :alpha="colorAlpha" :updateColor="updateColor" />

    <div class="ready-colors" v-if="presetEnabled || historyEnabled">
        <Preset :updateColor="updateColor" v-if="presetEnabled" />
        <History :historyData="history" :updateColor="updateColor" v-if="historyEnabled" />
    </div>
</template>

<script setup>
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    import GradientControls from './GradientControls.vue'
    import Preview from '../Preview/Preview.vue'
    import Area from '../Area/Area.vue'
    import Preset from '../Preset/Preset.vue'
    import History from '../History/History.vue'

    import { getRightValue, rgbToHsv, rgbToHex, generateGradientStyle } from '@/lib/helpers'

    name: 'Gradient'

    // Props
    const props = defineProps({
        type: {
            type: String,
            default: 'linear'
        },

        degree: {
            type: Number,
            default: 0
        },

        points: {
            type: Array,
            default: () => {
                return [
                    { left: 0, red: 0, green: 0, blue: 0, alpha: 1 },
                    { left: 100, red: 255, green: 0, blue: 0, alpha: 1 },
                ];
            }
        },

        presetEnabled: Boolean,
        historyEnabled: Boolean,

        onStartChange: Function,
        onChange: Function,
        onEndChange: Function
    })

    // Constants
    const activePointIndex = ref(0)
    const gradientPoints = ref(props.points)
    const activePoint = ref(props.points[0])
    const colorRed = ref(props.points[0].red)
    const colorGreen = ref(props.points[0].green)
    const colorBlue = ref(props.points[0].blue)
    const colorAlpha = ref(props.points[0].alpha)
    const colorHue = ref(0)
    const colorSaturation = ref(100)
    const colorValue = ref(100)
    const gradientType = ref(props.type)
    const gradientDegree = ref(props.degree)
    const actions = ref({
        onStartChange: props.onStartChange,
        onChange: props.onChange,
        onEndChange: props.onEndChange
    })

    const history = ref([])

    // Methods
    const removePoint = (index = activePointIndex.value) => {
        if (gradientPoints.value.length <= 2) {
            return;
        }

        gradientPoints.value.splice(index, 1);


        if (index > 0) {
            activePointIndex.value = index - 1;
        }

        props.onChange && props.onChange({
            points: gradientPoints.value,
            type: gradientType.value,
            degree: gradientDegree.value,
            style: generateGradientStyle(gradientPoints.value, gradientType.value, gradientDegree.value),
        });
    }

    const keyUpHandler = (event) => {
        if ((event.keyCode === 46 || event.keyCode === 8)) {
            removePoint(activePointIndex.value);
        }
    }

    const changeActivePointIndex = (index) => {
        activePointIndex.value = index;

        activePoint.value = gradientPoints.value[index];

        const { red, green, blue, alpha } = activePoint.value;

        colorRed.value = red;
        colorGreen.value = green;
        colorBlue.value = blue;
        colorAlpha.value = alpha;

        const { hue, saturation, value } = rgbToHsv({ red, green, blue });

        colorHue.value = hue;
        colorSaturation.value = saturation;
        colorValue.value = value;
    }

    const changeGradientControl = ({ type, degree }) => {
        type = getRightValue(type, gradientType.value);
        degree = getRightValue(degree, gradientDegree.value);

        gradientType.value = type;
        gradientDegree.value = degree;

        props.onChange({
            points: gradientPoints.value,
            type: gradientType.value,
            degree: gradientDegree.value,
            style: generateGradientStyle(gradientPoints.value, gradientType.value, gradientDegree.value),
        })
    }

    const updateColor = ({ red, green, blue, alpha, hue, saturation, value }, actionName = 'onChange') => {
        red = getRightValue(red, colorRed.value);
        green = getRightValue(green, colorGreen.value);
        blue = getRightValue(blue, colorBlue.value);
        alpha = getRightValue(alpha, colorAlpha.value);
        hue = getRightValue(hue, colorHue.value);
        saturation = getRightValue(saturation, colorSaturation.value);
        value = getRightValue(value, colorValue.value);

        const localGradientPoints = gradientPoints.value.slice();

        localGradientPoints[activePointIndex.value] = {
            ...localGradientPoints[activePointIndex.value],
            red,
            green,
            blue,
            alpha,
        };

        colorRed.value = red;
        colorGreen.value = green;
        colorBlue.value = blue;
        colorAlpha.value = alpha;
        colorHue.value = hue;
        colorSaturation.value = saturation;
        colorValue.value = value;
        gradientPoints.value = localGradientPoints;

        if (actionName == 'onEndChange') {
            const hexColor = rgbToHex(red, green, blue)
            const colorHistory = JSON.parse(localStorage.colorHistory)

            if (colorHistory.length >= 8) {
                colorHistory.pop()
                colorHistory.unshift(`#${hexColor}`)
                localStorage.setItem('colorHistory', JSON.stringify(colorHistory))
            } else {
                colorHistory.unshift(`#${hexColor}`)
                localStorage.setItem('colorHistory', JSON.stringify(colorHistory))
            }

            history.value = colorHistory
        }

        const action = actions.value[actionName];

        action && action({
            points: localGradientPoints,
            type: gradientType.value,
            degree: gradientDegree.value,
            style: generateGradientStyle(localGradientPoints, gradientType.value, gradientDegree.value),
        });
    }

    const updateGradientLeft = (left, index, actionName = 'onChange') => {
        gradientPoints.value[index].left = left;

        const action = actions.value[actionName];

        action && action({
            points: gradientPoints.value,
            type: gradientType.value,
            degree: gradientDegree.value,
            style: generateGradientStyle(gradientPoints.value, gradientType.value, gradientDegree.value),
        });
    }

    const addPoint = (left) => {
        console.log(left)
        gradientPoints.value.push({
            ...gradientPoints.value[activePointIndex.value],
            left,
        });

        activePointIndex.value = gradientPoints.value.length - 1;

        props.onChange && props.onChange({
            points: gradientPoints.value,
            type: gradientType.value,
            degree: gradientDegree.value,
            style: generateGradientStyle(gradientPoints.value, gradientType.value, gradientDegree.value),
        });
    }

    // Mounted and unmounted
    onMounted(() => {
        const { hue, saturation, value } = rgbToHsv({ red: colorRed.value, green: colorGreen.value, blue: colorBlue.value })

        colorHue.value = hue
        colorSaturation.value = saturation
        colorValue.value = value

        if (!localStorage.colorHistory) {
            localStorage.setItem('colorHistory', JSON.stringify([]))
        } else {
            history.value = JSON.parse(localStorage.colorHistory)
        }

        document.addEventListener('keyup', keyUpHandler)
    })

    onBeforeUnmount(() => {
        document.addEventListener('keyup', keyUpHandler)
    })
</script>