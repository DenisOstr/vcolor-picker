<template>
    <div class="picking-area" ref="pickerAreaRef" :style="pickerStyle" @mousedown="mouseEvents">
        <div class="picking-area-overlay-f">
            <div class="picking-area-overlay-s">
                <div class="picker-pointer" :style="pointerStyle" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';

    import { getRgbByHue, changePicker } from '@/lib/helpers'
    import { useMouseEvents } from '@/lib/hooks'

    name: 'Picker'

    // Props
    const props = defineProps({
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        hue: Number,
        saturation: Number,
        value: Number,
        updateColor: Function
    })

    // Constants
    const width = ref(0)
    const height = ref(0)
    const mouseEvents = ref(() => {})
    const pickerAreaRef = ref(null)

    // Methods
    const mouseDownHandler = (event) => {
        const { x: elementX, y: elementY } = pickerAreaRef.value.getBoundingClientRect()
        const startX = event.pageX
        const startY = event.pageY
        const positionX = startX - elementX
        const positionY = startY - elementY

        const color = changePicker(positionX, positionY, height.value, width.value, props.hue)

        props.updateColor(color, 'onStartChange')

        return { startX, startY, positionX, positionY }
    }

    const changeObjectPosition = (event, { startX, startY, positionX, positionY }) => {
        const moveX = event.pageX - startX
        const moveY = event.pageY - startY
        positionX += moveX
        positionY += moveY

        const color = changePicker(positionX, positionY, height.value, width.value, props.hue)

        return {
            positions: { positionX, positionY, startX: event.pageX, startY: event.pageY },
            color
        }
    }

    const mouseMoveHandler = (event, { startX, startY, positionX, positionY }) => {
        const { positions, color } = changeObjectPosition(event, { startX, startY, positionX, positionY })

        props.updateColor(color, 'onChange')

        return positions
    }

    const mouseUpHandler = (event, { startX, startY, positionX, positionY }) => {
        const { positions, color } = changeObjectPosition(event, { startX, startY, positionX, positionY })

        props.updateColor(color, 'onEndChange')

        return positions
    }

    // Mounteds
    onMounted(() => {
        if (pickerAreaRef) {
            width.value = pickerAreaRef.value.clientWidth
            height.value = pickerAreaRef.value.clientHeight
        }

        mouseEvents.value = useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler)
    })

    // Computeds
    const offsetLeft = computed(() => {
        return ((props.saturation * width.value / 100) | 0) - 6
    })

    const offsetTop = computed(() => {
        return (height.value - (props.value * height.value / 100) | 0) - 6
    })

    const pointerStyle = computed(() => {
        return {
            backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
            left: `${offsetLeft.value}px`,
            top: `${offsetTop.value}px`,
        }
    })

    const pickerStyle = computed(() => {
        const { red, green, blue } = getRgbByHue(props.hue)

        return { backgroundColor: `rgb(${red}, ${green}, ${blue})` }
    })
</script>