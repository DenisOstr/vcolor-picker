<template>
    <div class="gradient" :style="pointsStyle" @click="pointContainerClick">
        <div class="gradient-slider-container" ref="pointsContainerRef">
            <GradientPoint :key="index" v-for="(point, index) in points" :activePointIndex="activePointIndex"
                :index="index" :point="point" :width="width" :positions="positions" :changeActivePointIndex="changeActivePointIndex"
                :updateGradientLeft="updateGradientLeft" :removePoint="removePoint" />
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue'
    
    import GradientPoint from './GradientPoint.vue'

    import { generateGradientStyle, updateGradientActivePercent } from '@/lib/helpers'

    name: 'GradientPoints'

    // Props
    const props = defineProps({
        points: Array,
        activePointIndex: Number,
        changeActivePointIndex: Function,
        updateGradientLeft: Function,
        addPoint: Function,
        removePoint: Function
    })

    // Constants
    const width = ref(0)
    const positions = ref({ x: 0, y: 0 })
    const pointsContainerRef = ref(null)

    // Mounteds
    onMounted(() => {
        const pointer = pointsContainerRef

        if (pointer) {
            width.value = pointer.value.clientWidth

            const pointerPos = pointer.value.getBoundingClientRect()

            positions.value = { x: pointerPos.x, y: pointerPos.y }
        }
    })

    // Computeds
    const pointsStyle = computed(() => {
        const style = generateGradientStyle(props.points, 'linear', 90)

        return { background: style }
    })

    // Methods
    const pointContainerClick = (event) => {
        const left = updateGradientActivePercent(event.pageX - positions.value.x, width.value)

        props.addPoint(left)
    }
</script>