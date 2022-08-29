<template>
    <div class="color-preview-area">
        <div class="input-group">
            <HEX :red="red" :green="green" :blue="blue" :updateColor="updateColor" />
            <RGB :red="red" :green="green" :blue="blue" :alpha="alpha" :updateColor="updateColor" />
        </div>
    </div>
</template>

<script setup>
    import HEX from './ColorFormats/HEX.vue'
    import RGB from './ColorFormats/RGB.vue'

    name: 'Preview'

    defineProps({
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        updateColor: Function
    })
</script>