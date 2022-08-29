<template>
    <div class="gradient-controls">
        <div class="gradient-type">
            <div :class="`gradient-type-item linear-gradient ${type === 'linear' ? 'active' : ''}`" @click="() => changeGradientControl({ type: 'linear' })" />
            <div :class="`gradient-type-item radial-gradient ${type === 'radial' ? 'active' : ''}`" @click="() => changeGradientControl({ type: 'radial' })" />
        </div>

        <div class="gradient-degrees-options" v-if="type === 'linear'">
            <div class="gradient-degrees" @mousedown="mouseEvents" @click="onClickGradientDegree">
                <div class="gradient-degree-center" :style="degreesStyle">
                    <div class="gradient-degree-pointer" />
                </div>
            </div>

            <div class="gradient-degree-value">
                <p>{{ degree }}&#176;</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';

    import { calculateDegree } from '@/lib/helpers'
    import { useMouseEvents } from '@/lib/hooks'

    name: 'GradientControls'

    // Props
    const props = defineProps({
        type: String,
        degree: Number,
        changeGradientControl: {
            type: Function,
            default: () => {}
        }
    })

    // Constants
    const disableClick = ref(false)
    const mouseEvents = ref(() => {})

    // Methods
    const mouseDownHandler = (event) => {
        const pointer = event.target
        const pointerBox = pointer.getBoundingClientRect()
        const centerX = pointerBox.left + parseInt(8 - window.pageXOffset, 10)
        const centerY = pointerBox.top + parseInt(8 - window.pageYOffset, 10)

        return { centerX, centerY }
    }

    const mouseMoveHandler = (event, { centerX, centerY }) => {
        disableClick.value = true

        const newDegree = calculateDegree(event.clientX, event.clientY, centerX, centerY)

        props.changeGradientControl({ degree: parseInt(newDegree, 10) })
    }

    const mouseUpHandler = (event) => {
        const targetClasses = event.target.classList

        if (targetClasses.contains('gradient-degrees') || targetClasses.contains('icon-rotate')) {
            return
        }

        disableClick.value = false
    }

    const onClickGradientDegree = () => {
        if (disableClick.value) {
            disableClick.value = false
            
            return
        }

        let gradientDegree = props.degree + 45

        if (gradientDegree >= 360) {
            gradientDegree = 0
        }

        props.changeGradientControl({ degree: parseInt(gradientDegree, 10) })
    }

    // Mounteds
    onMounted(() => {
        mouseEvents.value = useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler)
    })

    // Computeds
    const degreesStyle = computed(() => {
        return { transform: `rotate(${props.degree}deg)` }
    })
</script>