import * as THREE from 'three'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

camera.position.z = 5

const hdrLoader = new RGBELoader()
hdrLoader.load('./images/scythian_tombs_2_4k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture
})

const loader = new GLTFLoader()
loader.load(
  './images/FLOWER MIDDLE.glb',
  function (gltf) {
    const model = gltf.scene
    scene.add(model)

    model.rotation.x = 0.5 // Adjust the initial rotation if needed

    function animate() {
      requestAnimationFrame(animate)

      model.rotation.x += 0.01
      model.rotation.y += 0.01

      controls.update()
      renderer.render(scene, camera)
    }

    animate()
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  function (error) {
    console.log('An error happened')
  }
)
