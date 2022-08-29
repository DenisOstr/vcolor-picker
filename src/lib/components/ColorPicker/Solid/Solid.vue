<template>
    <Area :red="colorRed" :green="colorGreen" :blue="colorBlue" :alpha="colorAlpha" :hue="colorHue"
        :saturation="colorSaturation" :value="colorValue" :updateColor="updateColor" :isGradient="false" />
    <Preview :red="colorRed" :green="colorGreen" :blue="colorBlue" :alpha="colorAlpha" :updateColor="updateColor" />
</template>

<script setup>
    import { computed, onMounted, watch, ref } from 'vue'

    import Area from '../Area/Area.vue'
    import Preview from '../Preview/Preview.vue'

    import { rgbToHsv, getRightValue, generateSolidStyle } from '@/lib/helpers'

    name: 'Solid'

    // Props
    const props = defineProps({
        red: {
            type: Number,
            default: 255
        },

        green: {
            type: Number,
            default: 0
        },

        blue: {
            type: Number,
            default: 0
        },

        alpha: {
            type: Number,
            default: 1
        },

        hue: Number,
        saturation: Number,
        value: Number,
        onStartChange: Function,
        onChange: Function,
        onEndChange: Function
    })

    // Constants
    const colorRed = ref(props.red)
    const colorGreen = ref(props.green)
    const colorBlue = ref(props.blue)
    const colorAlpha = ref(props.alpha)
    const colorHue = ref(0)
    const colorSaturation = ref(100)
    const colorValue = ref(100)
    const actions = ref({
        onStartChange: props.onStartChange,
        onChange: props.onChange,
        onEndChange: props.onEndChange
    })

    // Mounteds
    onMounted(() => {
        const { hue, saturation, value } = rgbToHsv({ red: colorRed.value, green: colorGreen.value, blue: colorBlue.value })

        colorHue.value = hue
        colorSaturation.value = saturation
        colorValue.value = value
    })

    // Computeds
    const hsv = computed(() => {
        if (props.hue === undefined || props.saturation === undefined || props.value === undefined) {
            return rgbToHsv({ red: props.red, green: props.green, blue: props.blue })
        }

        return { hue: props.hue, saturation: props.saturation, value: props.value }
    })

    const color = computed(() => {
        return { red: props.red, green: props.green, blue: props.blue, alpha: props.alpha }
    })

    // Watchers
    watch(hsv, ({ hue, saturation, value }) => {
        colorHue.value = hue
        colorSaturation.value = saturation
        colorValue.value = value
    })

    watch(color, ({ red, green, blue, alpha }) => {
        colorRed.value = red
        colorGreen.value = green
        colorBlue.value = blue
        colorAlpha.value = alpha
    })

    // Methods
    const updateColor = ({ red, green, blue, alpha, hue, saturation, value }, actionName = 'onChange') => {
        red = getRightValue(red, colorRed.value)
        green = getRightValue(green, colorGreen.value)
        blue = getRightValue(blue, colorBlue.value)
        alpha = getRightValue(alpha, colorAlpha.value)
        hue = getRightValue(hue, colorHue.value)
        saturation = getRightValue(saturation, colorSaturation.value)
        value = getRightValue(value, colorValue.value)

        colorRed.value = red
        colorGreen.value = green
        colorBlue.value = blue
        colorAlpha.value = alpha
        colorHue.value = hue
        colorSaturation.value = saturation
        colorValue.value = value

        const action = actions.value[actionName]

        action && action({ red, green, blue, alpha, hue, saturation, value, style: generateSolidStyle(red, green, blue, alpha) })
    }
</script>