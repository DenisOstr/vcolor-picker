<template>
    <div :class="`input-field ${classes}`">
        <div class="input-container">
            <input :class="`${type}-input input`" :value="value" @input="$emit('input', $event)" @focus="onFocus" @blur="onBlur">
        </div>

        <div class="label">{{ label }}</div>
    </div>
</template>

<script setup>
    defineProps({
        value: {
            type: [String, Number],
            default: ''
        },

        label: {
            type: String,
            default: ''
        },

        type: {
            type: String,
            default: 'text'
        },

        classes: {
            type: String,
            default: ''
        },

        onFocus: {
            type: Function,
            default: () => {}
        },

        onBlur: {
            type: Function,
            default: () => {}
        }
    })

    defineEmits(['input'])
</script>

<style>
.input-field {
    @apply flex flex-col flex-shrink-0 items-center;
    @apply relative overflow-hidden;
}

.input-field .input-container {
    @apply relative;
    @apply w-full;
    @apply rounded;
}

.input-field.hex .label {
    @apply absolute left-0 top-0;
    @apply bg-gray-300;
    @apply w-10 py-[7px];
    @apply flex items-center justify-center;
    @apply text-xs uppercase;
    @apply rounded-l;
}

.input-field.rgb .label {
    @apply text-xs;
}

.input-field .input-container .input {
    @apply w-full py-1;
    @apply bg-gray-100;
    @apply border border-gray-300 rounded;
    @apply outline-none;
    @apply text-sm;
}

.input-field.hex .input-container .input {
    @apply pl-12;
}

.input-field.rgb .input-container .input {
    @apply px-1;
    @apply text-center;
}

</style>