<template>
    <div class="rgb-input-group">
        <RGBItem type="number" label="R" :value="red" :onChange="value => changeValue('red', value)" />
        <RGBItem type="number" label="G" :value="green" :onChange="value => changeValue('green', value)" />
        <RGBItem type="number" label="B" :value="blue" :onChange="value => changeValue('blue', value)" />
        <RGBItem type="number" label="A" :value="parseInt(alpha * 100, 10)" :onChange="value => changeValue('alpha', value)" />
    </div>
</template>

<script setup>
    import RGBItem from './RGBItem.vue'

    import { rgbToHsv } from '@/lib/helpers'

    name: 'RGB'

    // Props
    const props = defineProps({
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        updateColor: Function
    })

    // Methods
    const changeValue = (field, value) => {
        if (field === 'alpha') {
            props.updateColor({ alpha: value / 100 })

            return
        }

        const color = rgbToHsv({ red: props.red, green: props.green, blue: props.blue, [field]: value })

        props.updateColor({ ...color, [field]: value })
    }
</script>