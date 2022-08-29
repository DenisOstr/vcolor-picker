<template>
    <Input label="hex" :value="hexValue" @input="changeHex" :onFocus="() => inProgress = true" :onBlur="() => inProgress = false"
        :inProgress="inProgress" classes="hex" />
</template>

<script setup>
    import { computed, ref, watchEffect, getCurrentInstance } from 'vue';

    import Input from '@/lib/components/UI/Input.vue'

    import { rgbToHex, hexToRgb } from '@/lib/helpers'

    name: 'HEX'

    // Props
    const props = defineProps({
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        updateColor: Function
    })

    // Constants
    const inProgress = ref(false)
    const hexValue = ref(rgbToHex(props.red, props.green, props.blue))

    // Computeds
    const hex = computed(() => {
        return rgbToHex(props.red, props.green, props.blue)
    })

    // Methods
    const setHex = () => {
        if (inProgress.value) {
            return
        }

        hexValue.value = hex.value
    }

    const changeHex = (event) => {
        const color = hexToRgb(event.target.value)

        if (color) {
            hexValue.value = event.target.value
            props.updateColor(color)
        }
    }

    // Watchers
    watchEffect(() => {
        if (inProgress.value || props.red || props.green || props.blue) {
            setHex()
        }
    })
</script>