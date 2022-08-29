<template>
    <div class="alpha" @mousedown="mouseEvents">
        <div class="gradient" :style="style"></div>
        <div class="alpha-area">
            <div class="alpha-mask" ref="alphaMaskRef">
                <div class="picker-pointer" :style="pointerStyle" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';

    import { getAlpha } from '@/lib/helpers'
    import { useMouseEvents } from '@/lib/hooks'

    name: 'Alpha'

    // Props
    const props = defineProps({
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        updateColor: Function
    })

    // Constants
    const width = ref(0)
    const mouseEvents = ref(() => {})
    const alphaMaskRef = ref(null)

    // Methods
    const mouseDownHandler = (event) => {
        const elementX = event.currentTarget.getBoundingClientRect().x
        const startX = event.pageX
        const positionX = startX - elementX

        props.updateColor({ alpha: getAlpha(positionX, width.value) }, 'onStartChange')

        return { startX, positionX }
    }

    const changeObjectPosition = (event, { startX, positionX }) => {
        const moveX = event.pageX - startX
        positionX += moveX

        const alpha = getAlpha(positionX, width.value)

        return {
            positions: { positionX, startX: event.pageX },
            alpha
        }
    }

    const mouseMoveHandler = (event, { startX, positionX }) => {
        const { positions, alpha } = changeObjectPosition(event, { startX, positionX })

        props.updateColor({ alpha }, 'onChange')

        return positions
    }

    const mouseUpHandler = (event, { startX, positionX }) => {
        const { positions, alpha } = changeObjectPosition(event, { startX, positionX })

        props.updateColor({ alpha }, 'onEndChange')

        return positions
    }

    // Mounteds
    onMounted(() => {
        if (alphaMaskRef) {
            width.value = alphaMaskRef.value.clientWidth
        }

        mouseEvents.value = useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler)
    })

    // Computeds
    const offsetLeft = computed(() => {
        return ((props.alpha * width.value) | 0) - 6
    })

    const pointerStyle = computed(() => {
        return { left: `${offsetLeft.value}px` }
    })

    const style = computed(() => {
        return { background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${props.red}, ${props.green}, ${props.blue}))` }
    })
</script>