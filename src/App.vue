<template>
    <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
        <VColorPicker :color="color" :onStartChange="color => onChange(color, 'start')"
            :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" />

        <VColorPicker :isGradient="true" :onStartChange="color => onChange(color, 'start')"
            :onChange="color => onChange(color, 'change')" :onEndChange="color => onChange(color, 'end')" />
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<script setup>
    import { ref } from 'vue';

    import { VColorPicker } from './lib'

    // Constants
    const color = ref({ red: 255, green: 0, blue: 0, alpha: 1 })

    // Methods
    const onChange = (attrs, name) => {
        color.value = { ...attrs }

        console.log(attrs, name)
    }
</script>