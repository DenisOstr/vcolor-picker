# VColor Picker

This component is based on the Vue Color Gradient Picker: https://github.com/arthay/vue-color-gradient-picker

Component made using

- Vue 3 + Vite
- Composition API
- TailwindCSS

## Table of Contents
 
- [Installation](https://github.com/DenisOstr/vcolor-picker#installation)
- [Examples](https://github.com/DenisOstr/vcolor-picker#examples)
- [Demo](https://github.com/DenisOstr/vcolor-picker#demo)

## Installation

To install, you can use [npm](https://npmjs.org) or [yarn](https://yarnpkg.com):

```
$ npm install vcolor-picker
$ yarn add vcolor-picker
```

## Here is a simple examples of vcolor-picker being used in an app:

### Options API

#### Simple color picker

```vue
<template>
  <div id="app">
    <VColorPicker
      :color="color"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />
  </div>
</template>

<script>
import { VColorPicker } from 'vcolor-picker'

export default {
  name: 'App',

  components: {
    VColorPicker
  },

  data()  {
    return {
      color: {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1
      }
    }
  },   

  methods: {
    onChange(attrs, name) {
      this.color = { ...attrs }
    }
  }
}
</script>

<style src="vcolor-picker/dist/index.css" lang="css" />
```

#### Gradient color picker

```vue
<template>
  <div id="app">
    <VColorPicker
      :gradient="gradient"
      :isGradient="true"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />
  </div>
</template>

<script>
import { VColorPicker } from 'vcolor-picker'

export default {
  name: 'App',

  components: {
    VColorPicker
  },

  data()  {
    return {
      gradient: {
        type: 'linear',
        degree: 0,
        points: [
          {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1
          },
          {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1
          }
        ]      
      }
    }
  },   

  methods: {
    onChange(attrs, name) {
      console.log(name)
    }
  }
}
</script>

<style src="vcolor-picker/dist/index.css" lang="css" />
```

### Composition API

#### Simple color picker

```vue
<template>
  <div id="app">
    <VColorPicker
      :color="color"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VColorPicker } from 'vcolor-picker'

name: 'App',

const color = ref({ red: 255, green: 0, blue: 0, alpha: 1 })

const onChange = (attrs, name) => {
  color.value = { ...attrs }
}
</script>

<style src="vcolor-picker/dist/index.css" lang="css" />
```

#### Gradient color picker

```vue
<template>
  <div id="app">
    <VColorPicker
      :gradient="gradient"
      :isGradient="true"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VColorPicker } from 'vcolor-picker'

name: 'App',

const gradient = ref({
  type: 'linear',
  degree: 0,
  points: [
    {
      left: 0,
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1
    },
    {
      left: 100,
      red: 255,
      green: 0,
      blue: 0,
      alpha: 1
    }
  ]      
})

const onChange = (attrs, name) => {
  console.log(name)
}
</script>

<style src="vcolor-picker/dist/index.css" lang="css" />
```

## Demo

There is currently no demo

## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
