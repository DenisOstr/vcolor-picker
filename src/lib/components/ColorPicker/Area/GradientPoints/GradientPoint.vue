<template>
    <div :class="`picker-pointer${activeClassName}`" :style="pointStyle" @mousedown="mouseEvents" @dblclick="() => removePoint(index)" @click.stop>
        <span :class="`child-point${activeClassName}`" />
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';

    import { updateGradientActivePercent } from '@/lib/helpers'
    import { useMouseEvents } from '@/lib/hooks'

    name: 'GradientPoint'

    // Props
    const props = defineProps({
        point: Object,
        activePointIndex: Number,
        index: Number,
        width: Number,
        positions: Object,
        changeActivePointIndex: Function,
        updateGradientLeft: Function,
        removePoint: Function
    })

    // Constants
    const mouseEvents = ref(() => {})

    // Methods
    const mouseDownHandler = (event) => {
        props.changeActivePointIndex(props.index)

        const startX = event.pageX
        const startY = event.pageY
        const offsetX = startX - props.positions.x

        props.updateGradientLeft(props.point.left, props.index, 'onStartChange')

        return { startX, startY, offsetX }
    }

    const changeObjectPosition = (event, { startX, offsetX }) => {
        const moveX = event.pageX - startX
        offsetX += moveX

        const left = updateGradientActivePercent(offsetX, props.width)

        return {
            positions: { offsetX, startX: event.pageX },
            left
        }
    }

    const mouseMoveHandler = (event, { startX, offsetX }) => {
        const { positions, left } = changeObjectPosition(event, { startX, offsetX })

        props.updateGradientLeft(left, props.index, 'onChange')

        return positions
    }

    const mouseUpHandler = (event, { startX, offsetX }) => {
        const { positions, left } = changeObjectPosition(event, { startX, offsetX })

        props.updateGradientLeft(left, props.index, 'onEndChange')

        return positions
    }

    // Mounteds
    onMounted(() => {
        mouseEvents.value = useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler)
    })

    // Computeds
    const activeClassName = computed(() => {
        return props.activePointIndex === props.index ? ' active' : ''
    })

    const pointStyle = computed(() => {
        return { left: `${(props.point.left * (props.width / 100)) - 6}px` }
    })
</script>