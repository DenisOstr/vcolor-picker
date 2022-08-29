<template>
    <Input :type="type" :label="label" :value="inputValue" @input="onChangeHandler"
        :onFocus="() => inProgress = true" :onBlur="onBlur" :inProgress="inProgress" classes="rgb" />
</template>

<script setup>
    import { getCurrentInstance, ref, watchEffect } from 'vue';

    import Input from '@/lib/components/UI/Input.vue'

    name: 'RGBItem'

    // Props
    const props = defineProps({
        value: [String, Number],
        type: String,
        label: String,
        onChange: Function
    })

    // Constants
    const inputValue = ref(props.value)
    const inProgress = ref(false)

    // Methods
    const onChangeHandler = (event) => {
        const value = +event.target.value
        
        // Number.isNan(value)
        if (isNaN(value) || value.length > 3 || value < 0 || value > 255) {
            inputValue.value = props.value

            const instance = getCurrentInstance()
            instance.proxy.$forceUpdate()

            return
        }

        inputValue.value = event.target.value
        props.onChange(value)
    }

    const onBlur = () => {
        if (!inputValue.value && !inputValue.value !== 0) {
            inputValue.value = props.value
        }

        inProgress.value = false
    }

    const setValue = () => {
        if (props.value !== +inputValue.value && inputValue.value !== '') {
            inputValue.value = props.value
        }
    }

    // Watchers
    watchEffect(() => {
        if (props.value) {
            setValue()
        }
    })
</script>