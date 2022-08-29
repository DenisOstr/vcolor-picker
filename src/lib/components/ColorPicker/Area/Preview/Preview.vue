<template>
    <div class="preview-area">
        <div class="preview-box" :style="style" />
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    import { generateSolidStyle, generateGradientStyle } from '@/lib/helpers';

    name: 'AreaPreview'

    // Props
    const props = defineProps({
        isGradient: Boolean,
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        points: Array,
        gradientDegree: Number,
        gradientType: String
    })

    // Computeds
    const style = computed(() => {
        if (props.isGradient) {
            const style = generateGradientStyle(props.points, props.gradientType, props.gradientDegree)

            return { background: style }
        }

        const style = generateSolidStyle(props.red, props.green, props.blue, props.alpha)

        return { backgroundColor: style }
    })
</script>