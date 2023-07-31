<template>
    <div class="eye-dropper-container">
        <button id="btn-eyedropper" :class="{ 'eye-dropper-active': eyeDropperEvent }" @click="handleEyeDropper">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-color-picker" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M11 7l6 6" />
                <path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" />
            </svg>
        </button>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import * as htmlToImage from 'html-to-image'

    import { hexToRgb, rgbToHex } from '@/lib/helpers'

    const props = defineProps({
        isCanvas: Boolean,
        container: String,
        canvas: Object,
        multipleLayers: {
            type: Boolean,
            default: false
        },
        clickOutsideEnabled: {
            type: Boolean,
            default: true
        },
        updateColor: Function
    })

    const emits = defineEmits(['handleColorValue', 'handleEyeDropperEvent'])

    const eyeDropperEvent = ref(false)
    const eyeDropperPreview = ref('')
    const color = ref('')

    const handleEyeDropper = () => {
        if (!eyeDropperEvent.value) {
            eyeDropperEvent.value = true
            emits('handleEyeDropperEvent', eyeDropperEvent.value)

            if (props.isCanvas) {
                if (props.multipleLayers) {
                    props.canvas.upperCanvasEl.style.display = 'none'

                    props.canvas.lowerCanvasEl.addEventListener('mousemove', getCoords)
                    props.canvas.lowerCanvasEl.addEventListener('mouseout', canvasLeave)
                    
                    props.canvas.lowerCanvasEl.style.cursor = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAlBJREFUOBGNkk2IUlEUx+99vufXQvCjEA11YWgk7TTLZhwVLTfSRmY1QbOoTdMqad0iiGB20cpVUAt3SVHCJDJG40IXBVGLIIOB8hM/QPy+/a/xYqK38MJ99757zu9/zj3nUrLmiEajdkEQni6Xy6hKpfqB/eNCofCMrsOHQiEPgPfwtdhsNkYpJe12m0LolkpJIJFI7DkcDm+9Xv/o9/vPw+dwsVhYnE4nc7lc1G63016vx8bj8TlRSWA6nd6cz+cXAoHAGYD3sDdarVam1+vpaDRaITgjjLHTigKArkK9ifXhbDYjBoOBSZL0F261Wqzb7VKtVvtBUQCwi4N88kjD4ZAg+ioyT53DGo3mJwLs/VcD3PkyrnAwmUwks9n8YDAYuPBvxGQASL/fp8imiwJeKZVK3/4R4DAicliLIt4pFosvsH9Vq9Wu4b5GCHC4j+hb5XL5C09JWOWFTzAY3MJyAAHJ7XbfRo9fclsmk2maTKY8IhJRFAna+QTwJ27jYyUQDofj6O1bPBLJ6/Xu5vP5N3/MhMC2gxrcReTvEGio1er7eFRR2S7EYrE40nsNWPB4PLu5XO6dbIxEIjuo+COkfAyfTZ1OF4dIHyJnZR8RkZ/zH5/PdyObzR7KhmQyud3pdFYw2rVRqVSOYePTIvvwVYDyKThUT8KpVGq70WjsI/Iv+HC4zp2VhoiiEP625ZFOp683m819iLZxtlGtVuuyTWmlePcM9x9A6DNWikd0EYJtdGPz6OjoqxJ08ox3oQzYgKtcwgwi7Q5athbMhX4DL0sglf8ys78AAAAASUVORK5CYII=') 0 32, auto"
                } else {
                    props.canvas.addEventListener('mousemove', getCoords)
                    props.canvas.addEventListener('mouseout', canvasLeave)

                    props.canvas.style.cursor = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAlBJREFUOBGNkk2IUlEUx+99vufXQvCjEA11YWgk7TTLZhwVLTfSRmY1QbOoTdMqad0iiGB20cpVUAt3SVHCJDJG40IXBVGLIIOB8hM/QPy+/a/xYqK38MJ99757zu9/zj3nUrLmiEajdkEQni6Xy6hKpfqB/eNCofCMrsOHQiEPgPfwtdhsNkYpJe12m0LolkpJIJFI7DkcDm+9Xv/o9/vPw+dwsVhYnE4nc7lc1G63016vx8bj8TlRSWA6nd6cz+cXAoHAGYD3sDdarVam1+vpaDRaITgjjLHTigKArkK9ifXhbDYjBoOBSZL0F261Wqzb7VKtVvtBUQCwi4N88kjD4ZAg+ioyT53DGo3mJwLs/VcD3PkyrnAwmUwks9n8YDAYuPBvxGQASL/fp8imiwJeKZVK3/4R4DAicliLIt4pFosvsH9Vq9Wu4b5GCHC4j+hb5XL5C09JWOWFTzAY3MJyAAHJ7XbfRo9fclsmk2maTKY8IhJRFAna+QTwJ27jYyUQDofj6O1bPBLJ6/Xu5vP5N3/MhMC2gxrcReTvEGio1er7eFRR2S7EYrE40nsNWPB4PLu5XO6dbIxEIjuo+COkfAyfTZ1OF4dIHyJnZR8RkZ/zH5/PdyObzR7KhmQyud3pdFYw2rVRqVSOYePTIvvwVYDyKThUT8KpVGq70WjsI/Iv+HC4zp2VhoiiEP625ZFOp683m819iLZxtlGtVuuyTWmlePcM9x9A6DNWikd0EYJtdGPz6OjoqxJ08ox3oQzYgKtcwgwi7Q5athbMhX4DL0sglf8ys78AAAAASUVORK5CYII=') 0 32, auto"
                }

                document.body.addEventListener('mousedown', clickOutside)
                eyeDropperPreview.value = document.createElement('div')
            } else {
                if (props.container) {
                    const artboard = document.getElementById(props.container)

                    htmlToImage.toCanvas(artboard).then((canvas) => {
                        const app = document.getElementById('app')
                        
                        canvas.setAttribute('id', 'eyedropper_artboard-mirror')
                        canvas.classList = 'absolute opacity-0'
                        canvas.style.width = `${artboard.getBoundingClientRect().width}px`
                        canvas.style.height = `${artboard.getBoundingClientRect().height}px`
                        canvas.style.top = `${artboard.getBoundingClientRect().y}px`
                        canvas.style.left = `${artboard.getBoundingClientRect().x}px`

                        app.appendChild(canvas)

                        canvas.addEventListener('mousemove', getCoords)
                        canvas.style.cursor = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAlBJREFUOBGNkk2IUlEUx+99vufXQvCjEA11YWgk7TTLZhwVLTfSRmY1QbOoTdMqad0iiGB20cpVUAt3SVHCJDJG40IXBVGLIIOB8hM/QPy+/a/xYqK38MJ99757zu9/zj3nUrLmiEajdkEQni6Xy6hKpfqB/eNCofCMrsOHQiEPgPfwtdhsNkYpJe12m0LolkpJIJFI7DkcDm+9Xv/o9/vPw+dwsVhYnE4nc7lc1G63016vx8bj8TlRSWA6nd6cz+cXAoHAGYD3sDdarVam1+vpaDRaITgjjLHTigKArkK9ifXhbDYjBoOBSZL0F261Wqzb7VKtVvtBUQCwi4N88kjD4ZAg+ioyT53DGo3mJwLs/VcD3PkyrnAwmUwks9n8YDAYuPBvxGQASL/fp8imiwJeKZVK3/4R4DAicliLIt4pFosvsH9Vq9Wu4b5GCHC4j+hb5XL5C09JWOWFTzAY3MJyAAHJ7XbfRo9fclsmk2maTKY8IhJRFAna+QTwJ27jYyUQDofj6O1bPBLJ6/Xu5vP5N3/MhMC2gxrcReTvEGio1er7eFRR2S7EYrE40nsNWPB4PLu5XO6dbIxEIjuo+COkfAyfTZ1OF4dIHyJnZR8RkZ/zH5/PdyObzR7KhmQyud3pdFYw2rVRqVSOYePTIvvwVYDyKThUT8KpVGq70WjsI/Iv+HC4zp2VhoiiEP625ZFOp683m819iLZxtlGtVuuyTWmlePcM9x9A6DNWikd0EYJtdGPz6OjoqxJ08ox3oQzYgKtcwgwi7Q5athbMhX4DL0sglf8ys78AAAAASUVORK5CYII=') 0 32, auto"

                        eyeDropperPreview.value = document.createElement('div')
                    })
                }
            }
        } else {
            eyeDropperEvent.value = false
            emits('handleEyeDropperEvent', eyeDropperEvent.value)

            if (props.isCanvas) {
                if (props.multipleLayers) {
                    props.canvas.lowerCanvasEl.style.cursor = 'default'

                    props.canvas.lowerCanvasEl.removeEventListener('mousemove', getCoords)
                    props.canvas.lowerCanvasEl.removeEventListener('mousedown', getMouseClick)
                    props.canvas.lowerCanvasEl.removeEventListener('mouseout', canvasLeave)

                    props.canvas.upperCanvasEl.style.display = 'block'
                } else {
                    props.canvas.style.cursor = 'default'

                    props.canvas.removeEventListener('mousemove', getCoords)
                    props.canvas.removeEventListener('mousedown', getMouseClick)
                    props.canvas.removeEventListener('mouseout', canvasLeave)
                }

                document.body.removeEventListener('mousedown', clickOutside)
            } else {
                const artboardMirror = document.getElementById('eyedropper_artboard-mirror')
                const app = document.getElementById('app')

                app.removeChild(artboardMirror)
                document.body.removeChild(eyeDropperPreview.value)
            }
        }
    }

    const getCoords = (event) => {
        eyeDropperEvent.value = true
        emits('handleEyeDropperEvent', eyeDropperEvent.value)

        let imgData = {}

        if (props.isCanvas) {
            const canvas = props.canvas

            if (props.multipleLayers) {
                const pos = findPos(canvas.lowerCanvasEl)
                const x = event.pageX - pos.x
                const y = event.pageY - pos.y
                const ctx = canvas.lowerCanvasEl.getContext('2d')
                imgData = ctx.getImageData(x * devicePixelRatio, y * devicePixelRatio, 1, 1).data
            } else {
                const pos = findPos(canvas)
                const x = event.pageX - pos.x
                const y = event.pageY - pos.y
                const ctx = canvas.getContext('2d')
                imgData = ctx.getImageData(x * devicePixelRatio, y * devicePixelRatio, 1, 1).data
            }

            if (props.multipleLayers) {
                canvas.lowerCanvasEl.addEventListener('mousedown', getMouseClick)
            } else {
                canvas.addEventListener('mousedown', getMouseClick)
            }
        } else {
            const artboardMirror = document.getElementById('eyedropper_artboard-mirror')
            const ctx = artboardMirror.getContext('2d')

            const pos = findPos(artboardMirror)
            const x = event.pageX - pos.x
            const y = event.pageY - pos.y
            
            imgData = ctx.getImageData(x * devicePixelRatio, y * devicePixelRatio, 1, 1).data

            artboardMirror.addEventListener('mousedown', getMouseClick)
        }

        const rgbaColor = `rgba(${imgData[0]}, ${imgData[1]}, ${imgData[2]}, ${imgData[3]})`
        const colorHex = rgbToHex(imgData[0], imgData[1], imgData[2])
        color.value = `#${colorHex}`

        const eyeDropperPreviewStyle = eyeDropperPreview.value.style
        Object.assign(eyeDropperPreviewStyle, {
            position: 'absolute',
            left: event.pageX + 20 + 'px',
            top: event.pageY - 36 + 'px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid #fff',
            boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.16)',
            background: rgbaColor,
            zIndex: 95,
        })

        document.body.appendChild(eyeDropperPreview.value)
    }

    const canvasLeave = (event) => {
        if (props.isCanvas) {
            document.body.removeChild(eyeDropperPreview.value)
        }
    }

    const getMouseClick = (event) => {
        if (color.value) {
            const colorData = hexToRgb(color.value)
            props.updateColor(colorData, 'onEndChange')
            
            // emits('handleColorValue', color.value)
        }
    }

    const clickOutside = (event) => {
        if (!props.clickOutsideEnabled) {
            return
        }

        eyeDropperEvent.value = false
        emits('handleEyeDropperEvent', eyeDropperEvent.value)

        if (props.canvas) {
            if (props.multipleLayers) {
                if (event.target != props.canvas.lowerCanvasEl) {
                    props.canvas.lowerCanvasEl.style.cursor = 'default'

                    props.canvas.lowerCanvasEl.removeEventListener('mousemove', getCoords)
                    props.canvas.lowerCanvasEl.removeEventListener('mousedown', getMouseClick)
                    props.canvas.lowerCanvasEl.removeEventListener('mouseout', canvasLeave)

                    props.canvas.upperCanvasEl.style.display = 'block'

                    document.body.removeEventListener('mousedown', clickOutside)
                }
            } else {
                if (event.target != props.canvas) {
                    props.canvas.style.cursor = 'default'

                    props.canvas.removeEventListener('mousemove', getCoords)
                    props.canvas.removeEventListener('mousedown', getMouseClick)
                    props.canvas.removeEventListener('mouseout', canvasLeave)

                    document.body.removeEventListener('mousedown', clickOutside)
                }
            }
        }
    }

    const findPos = (obj) => {
        var cursorLeft = 0, cursorTop = 0

        if (obj.offsetParent) {
            do {
                cursorLeft += obj.offsetLeft
                cursorTop += obj.offsetTop
            } while (obj = obj.offsetParent)

            return { x: cursorLeft, y: cursorTop }
        }

        return undefined
    }
</script>