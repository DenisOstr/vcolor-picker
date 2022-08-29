<template>
    <div class="hue" @mousedown="mouseEvents">
        <div class="hue-area" ref="hueRef">
            <div class="picker-pointer" :style="pointerStyle" />
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';

    import { getHue } from '@/lib/helpers'
    import { useMouseEvents } from '@/lib/hooks'

    name: 'Hue'

    // Props
    const props = defineProps({
        hue: Number,
        saturation: Number,
        value: Number,
        updateColor: Function
    })

    // Constants
    const width = ref(0)
    const mouseEvents = ref(() => {})
    const hueRef = ref(null)

    // Methods
    const mouseDownHandler = (event) => {
        const elementX = event.currentTarget.getBoundingClientRect().x
        const startX = event.pageX
        const positionX = startX - elementX

        const color = getHue(positionX, width.value, props.saturation, props.value)

        props.updateColor(color, 'onStartChange')

        return { startX, positionX }
    }

    const changeObjectPosition = (event, { startX, positionX }) => {
        const moveX = event.pageX - startX
        positionX += moveX

        const offsetX = positionX > width.value ? width.value : positionX <= 0 ? 0 : positionX
        const color = getHue(offsetX, width.value, props.saturation, props.value)

        return {
            positions: { positionX, startX: event.pageX },
            color
        }
    }

    const mouseMoveHandler = (event, { startX, positionX }) => {
        const { positions, color } = changeObjectPosition(event, { startX, positionX })

        props.updateColor(color, 'onChange')

        return positions
    }

    const mouseUpHandler = (event, { startX, positionX }) => {
        const { positions, color } = changeObjectPosition(event, { startX, positionX })

        props.updateColor(color, 'onEndChange')

        return positions
    }

    // Mounteds
    onMounted(() => {
        if (hueRef) {
            width.value = hueRef.value.clientWidth
        }

        mouseEvents.value = useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler)
    })

    // Computeds
    const offsetLeft = computed(() => {
        return ((props.hue * width.value / 360) | 0) - 6
    })

    const pointerStyle = computed(() => {
        return { left: `${offsetLeft.value}px` }
    })
</script>