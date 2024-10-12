<template>
  <div
    ref="threeContainer"
    class="three"
  />
  <div class="sides">
    <div
      ref="sideFront"
      class="side front"
    >
      <iframe
        src="https://ai.hamm.cn"
        style="width: 400px;height: 800px;border: 2px solid rgba(255,255,255,0.3);position: absolute;left: 10px;bottom: 10px;"
      />
      <iframe
        src="https://ac.hamm.cn"
        style="width: 420px;border: none;position: absolute;right: 10px;top: 10px;"
      />
    </div>
    <div
      ref="sideBack"
      class="side back"
    >
      后面
    </div>
    <div
      ref="sideRight"
      class="side right"
    >
      右边
    </div>
    <div
      ref="sideLeft"
      class="side left"
    />
    <div
      ref="sideTop"
      class="side top"
    >
      顶部
    </div>
    <div
      ref="sideBottom"
      class="side bottom"
    >
      底部
    </div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import {
  onBeforeUnmount, onMounted, ref,
} from 'vue'

import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threeContainer = ref<HTMLDivElement | null>(null)
const sideFront = ref<HTMLDivElement | null>(null)
const sideBack = ref<HTMLDivElement | null>(null)
const sideLeft = ref<HTMLDivElement | null>(null)
const sideRight = ref<HTMLDivElement | null>(null)
const sideTop = ref<HTMLDivElement | null>(null)
const sideBottom = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: CSS3DRenderer
let controls: OrbitControls
let directionalLight: THREE.DirectionalLight

const sideWidth = 2000
const sideHeight = 1200

const updateDirectionalLight = () => {
  const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
  directionalLight.position.set(direction.x, direction.y, direction.z).normalize()
}

const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  updateDirectionalLight()
  renderer.render(scene, camera)
}

const init = async () => {
  // 场景
  scene = new THREE.Scene()

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // 白色光，强度为0.5
  scene.add(ambientLight)

  // 创建方向光
  directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
  scene.add(directionalLight)

  // 相机
  camera = new THREE.PerspectiveCamera(80)
  // camera.position.set(0, 0, 0)

  // 渲染器
  renderer = new CSS3DRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  if (threeContainer.value) {
    threeContainer.value.appendChild(renderer.domElement)
  }

  // 控制器
  controls = new OrbitControls(camera, renderer.domElement)
  // controls.screenSpacePanning = true

  // 允许无限旋转
  // controls.minPolarAngle = 0 // 最小极角（垂直旋转）
  // controls.maxPolarAngle = Math.PI // 最大极角（垂直旋转）
  // controls.enablePan = true // 允许平移
  controls.enableDamping = true // 启用阻尼效果，使旋转更加平滑
  controls.dampingFactor = 0.03 // 阻尼因子

  // 设置最大距离
  // controls.maxDistance = 20 // 最大距离为20单位
  // controls.minDistance = 1 // 最小距离为1单位

  // 默认看前面
  controls.target.set(0, 0, 1)
  controls.rotateSpeed = -0.3
  controls.zoomSpeed = 2
  controls.enableZoom = true
  const edge = 4

  // 创建六个 div
  const faces = [
    { position: [0, 0, sideWidth / 2 - edge], rotation: [0, Math.PI, 0], ref: sideFront },
    { position: [0, 0, -sideWidth / 2 + edge], rotation: [-Math.PI, -Math.PI, Math.PI], ref: sideBack },
    { position: [sideWidth / 2 - edge, 0, 0], rotation: [0, -Math.PI / 2, 0], ref: sideLeft },
    { position: [-sideWidth / 2 + edge, 0, 0], rotation: [0, Math.PI / 2, 0], ref: sideRight },
    { position: [0, sideHeight / 2 - edge, 0], rotation: [Math.PI / 2, 0, Math.PI], ref: sideTop },
    { position: [0, -sideHeight / 2 + edge, 0], rotation: [-Math.PI / 2, 0, Math.PI], ref: sideBottom },
  ]

  // eslint-disable-next-line guard-for-in
  for (const index in faces) {
    const face = faces[index]
    const object = new CSS3DObject(face.ref.value!)
    object.position.set(face.position[0], face.position[1], face.position[2])
    object.rotation.set(face.rotation[0], face.rotation[1], face.rotation[2])
    scene.add(object)
  }
  animate()
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  // 清理工作
  scene.clear()
})

</script>
<style lang="scss" scoped>
.three {
  // background-color: #000;
  background: #000 url('@/assets/img/ground.jpg') center center repeat;
  background-size: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .side {
    width: 2000px;
    height: 1200px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }

  .sides {
    .side {
      display: none !important;
    }
  }

  .top,
  .bottom {
    width: 2000px !important;
    height: 2000px !important;
    background-size: cover !important;
  }

  .bottom {
    background: #000 url('@/assets/img/ground.jpg') center center repeat;
  }

  .top {
    background: #fff url('@/assets/img/sky.jpg') center center no-repeat;
  }
}
</style>
