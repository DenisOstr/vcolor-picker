# VColor Picker

This component is based on the Vue Color Gradient Picker: https://github.com/arthay/vue-color-gradient-picker

Component made using

- Vue 3 + Vite
- Composition API
- TailwindCSS

## Table of Contents
 
- [Installation](https://github.com/DenisOstr/vcolor-picker#installation)
- [Properties](https://github.com/DenisOstr/vcolor-picker#properties)
- [Examples](https://github.com/DenisOstr/vcolor-picker#examples)
- [Demo](https://github.com/DenisOstr/vcolor-picker#demo)

## Installation

To install, you can use [npm](https://npmjs.org):

```
npm install @envis/vcolor-picker
```

## Properties

### Props

| Name               | Type        | Default                                                                           | Description                             |
| -----------        | ----------- | --------------------------------------------------------------------------------- | --------------------------------------- |
| isCanvas           | Boolean     |                                                                                   | property to check canvas or html area
| container          | String      |                                                                                   | container id of html area (for taking screenshot)
| canvas             | Object      | `{}`                                                                              | html5 canvas object (`canvas` ref)
| color              | Object      | `{ red: 255, green: 0, blue: 0, alpha: 1, hue: 0, saturation: 100, value: 100 }`  | object of rgb and hsv values
| isGradient         | Boolean     | `false`                                                                           | property renders a gradient color picker
| gradient           | Object      | `{ type: 'linear', degree: 0, points: [{ left: 0, red: 0, green: 0, blue: 0, alpha: 1 }, { left: 100, red: 255, green: 0, blue: 0, alpha: 1 }] }`                                                                                                | object of colors for gradient
| presetEnabled      | Boolean     | `true`                                                                            | property enable preset colors
| historyEnabled     | Boolean     | `true`                                                                            | property enable history
| multipleLayers     | Boolean     | `false`                                                                           | property to check canvas layering (`FabricJS`)
| eyeDropperEnabled  | Boolean     | `true`                                                                            | property enable eye dropper
| onChange           | Function    | `() => {}`                                                                        | `(color) => onChange(color, 'change')`
| onStartChange      | Function    | `() => {}`                                                                        | `(color) => onChange(color, 'start')`
| onEndChange        | Function    | `() => {}`                                                                        | `(color) => onChange(color, 'end')`

### Emits

| Name               | Type        | Description                                                           |
| -----------        | ----------- | --------------------------------------------------------------------- |
| eyeDropperEvent    | Boolean     | return `true` or `false` value when eye dropper enabled or disabled

## Examples

Here is a simple examples of vcolor-picker being used in an app:

### Options API

#### Simple color picker

```vue
<template>
  <div id="app">
    <VColorPicker
      :color="color"
      :canvas="canvas"
      :presetEnabled="true"
      :historyEnabled="true"
      :eyeDropperEnabled="true"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />

    <canvas id="canv" width="600" height="400" class="absolute right-4 top-4 bg-gray-200 rounded-md" ref="canvas"></canvas>
  </div>
</template>

<script>
import { VColorPicker } from '@envis/vcolor-picker'
import '@envis/vcolor-picker/dist/style.css'

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
      },

      canvas: this.$ref.canvas
    }
  },   

  methods: {
    onChange(attrs, name) {
      this.color = { ...attrs }
    }
  }
}
</script>
```

#### Gradient color picker

```vue
<template>
  <div id="app">
    <VColorPicker
      :canvas="canvas"
      :gradient="gradient"
      :isGradient="true"
      :presetEnabled="true"
      :historyEnabled="true"
      :eyeDropperEnabled="true"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />

    <canvas id="canv" width="600" height="400" class="absolute right-4 top-4 bg-gray-200 rounded-md" ref="canvas"></canvas>
  </div>
</template>

<script>
import { VColorPicker } from '@envis/vcolor-picker'
import '@envis/vcolor-picker/dist/style.css'

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
      },
      canvas: this.$refs.canvas
    }
  },   

  methods: {
    onChange(attrs, name) {
      console.log(name)
    }
  }
}
</script>
```

#### Color picker with HTML area instead canvas

```vue
<template>
  <div id="app">
    <VColorPicker
      :color="color"
      :isCanvas="false"
      container="artboard"
      :presetEnabled="true"
      :historyEnabled="true"
      :eyeDropperEnabled="true"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />

    <div id="artboard" class="absolute right-5 top-5">
        <div class="relative bg-gray-200 w-[600px] h-[400px] rounded-md">
            <div class="absolute top-10 left-10 bg-green-400 w-32 h-32"></div>
            <div class="absolute bottom-10 right-10 bg-violet-600 w-32 h-32 rounded-full"></div>
        </div>
    </div>
  </div>
</template>

<script>
import { VColorPicker } from '@envis/vcolor-picker'
import '@envis/vcolor-picker/dist/style.css'

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
      },
    }
  },   

  methods: {
    onChange(attrs, name) {
      this.color = { ...attrs }
    }
  }
}
</script>
```

### Composition API

#### Simple color picker

```vue
<template>
  <div id="app">
    <VColorPicker
      :canvas="canvas"
      :color="color"
      :presetEnabled="true"
      :historyEnabled="true"
      :eyeDropperEnabled="true"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />

    <canvas id="canv" width="600" height="400" class="absolute right-4 top-4 bg-gray-200 rounded-md" ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VColorPicker } from '@envis/vcolor-picker'
import '@envis/vcolor-picker/dist/style.css'

name: 'App',

const color = ref({ red: 255, green: 0, blue: 0, alpha: 1 })
const canvas = ref({})

const onChange = (attrs, name) => {
  color.value = { ...attrs }
}
</script>
```

#### Gradient color picker

```vue
<template>
  <div id="app">
    <VColorPicker
      :canvas="canvas"
      :gradient="gradient"
      :isGradient="true"
      :presetEnabled="true"
      :historyEnabled="true"
      :eyeDropperEnabled="true"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />

    <canvas id="canv" width="600" height="400" class="absolute right-4 top-4 bg-gray-200 rounded-md" ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VColorPicker } from '@envis/vcolor-picker'
import '@envis/vcolor-picker/dist/style.css'

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
const canvas = ref({})

const onChange = (attrs, name) => {
  console.log(name)
}
</script>
```

#### Color picker with HTML area instead canvas

```vue
<template>
  <div id="app">
    <VColorPicker
      :isCanvas="false"
      container="artboard"
      :color="color"
      :presetEnabled="true"
      :historyEnabled="true"
      :eyeDropperEnabled="true"
      :onStartChange="color => onChange(color, 'start')"
      :onChange="color => onChange(color, 'change')"
      :onEndChange="color => onChange(color, 'end')"
    />

    <div id="artboard" class="absolute right-5 top-5">
        <div class="relative bg-gray-200 w-[600px] h-[400px] rounded-md">
            <div class="absolute top-10 left-10 bg-green-400 w-32 h-32"></div>
            <div class="absolute bottom-10 right-10 bg-violet-600 w-32 h-32 rounded-full"></div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VColorPicker } from '@envis/vcolor-picker'
import '@envis/vcolor-picker/dist/style.css'

name: 'App',

const color = ref({ red: 255, green: 0, blue: 0, alpha: 1 })

const onChange = (attrs, name) => {
  color.value = { ...attrs }
}
</script>
```

## Demo

[VColor Picker demo link](https://vcolor-picker-demo.onrender.com)

## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
