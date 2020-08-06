/* eslint-disable no-case-declarations */
import React, { useEffect } from 'react'

import { ECSYThreeWorld } from 'ecsy-three'

import {
  initialize
} from 'ecsy-three/src/extras'
import {
  GLTFLoader,
  Parent,
  Position,
  Rotation,
  Scale,
  Transform,
  //   Scene,
  SkyBox,
  Visible,
  //   WebGLRenderer
  Camera
} from 'ecsy-three/src/extras/components'
import { GLTFLoaderSystem } from 'ecsy-three/src/extras/systems/GLTFLoaderSystem'

import * as THREE from 'three'

import * as Armada from 'xr3ngine/armada'

// import * as dat from 'dat.gui'

// const gui = new dat.GUI()
// let cameraData = {
//   guiTest: 4
// }
// var cameraFolder = gui.addFolder( 'camera' );
// // cameraFolder.add(originalRotation, 'value')
// cameraFolder.add(cameraData, 'guiTest')

interface Props {
}


async function init (): Promise<any> {
  let lastTime = 0
  let world = new ECSYThreeWorld()
  world.registerComponent(Position)
    .registerComponent(Transform)
    .registerComponent(SkyBox)
    .registerComponent(Parent)
    .registerComponent(GLTFLoader)
    .registerComponent(Rotation)
    .registerComponent(Scale)
    .registerComponent(Visible)
  world.registerSystem(GLTFLoaderSystem)
  world = Armada.initializeInputSystems(world)

  const data = initialize(world)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scene, camera, renderer } = data.entities
  const camera3d = camera.getObject3D()
  camera.addComponent(Transform)
  const cameraTransform = camera.getMutableComponent(Transform)
  // camera3d.position.z = 5
  // cameraTransform.position.z = 5

  // let cameraPositionFolder = cameraFolder.addFolder('position')
  // cameraPositionFolder.add(cameraTransform.position, 'x', -100, 100)
  // cameraPositionFolder.add(cameraTransform.position, 'y', -100, 100)
  // cameraPositionFolder.add(cameraTransform.position, 'z', -100, 100)

  // let cameraRotationFolder = cameraFolder.addFolder('rotation')
  // cameraRotationFolder.add(cameraTransform.rotation, 'x', 0, 2 * Math.PI)
  // cameraRotationFolder.add(cameraTransform.rotation, 'y', 0, 2 * Math.PI)
  // cameraRotationFolder.add(cameraTransform.rotation, 'z', 0, 2 * Math.PI)


// return an array of x,y,z coordinates
// for the 9 cells of a 3d table

// for each y, add each xz cell
// for each x, add each z

const boxPositions = []

function calculateColorPercentage(index, length, start) {
  // index = length -1 -> 100%
  // index = 0 -> 0%
  // index = 1, length 3, start 0, -> 50%
  if (index == start) return 0
  let result = 100*(index / (length - 1))
  console.log(result)
  console.log(Math.round(result))
  return Math.round(result)
}

function padPercentage(number) {
  return number + '%'
}

interface rgbColor {
  r: number
  g: number
  b: number
}
function rgbPercentageString(color: rgbColor): string {
  let stringArray = ['rgb(']
  stringArray.push(padPercentage(color.r))
  stringArray.push(', ')
  stringArray.push(padPercentage(color.g))
  stringArray.push(', ')
  stringArray.push(padPercentage(color.b))
  stringArray.push(')')
  return stringArray.join('')
}

console.log(rgbPercentageString({r: 50, g: 25, b: 100}))

for (let y=-1; y<=1; y++) {
  let color = { r: calculateColorPercentage(y, 3, -1) }
  for (let x=-1; x<=1; x++) {
    color.g = calculateColorPercentage(x, 3, -1) 
    for (let z=-1; z<=1; z++) {
      color.b = calculateColorPercentage(z, 3, -1)
      const boxColor = Object.assign({}, color)
      boxPositions.push({ x, y, z, color: boxColor })
    }
  }
}

boxPositions.splice(13, 1)

console.log('boxPositions', boxPositions)
// const boxPositions.indexOf({x: 0, y: 0, z: 0})
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'pink'
]

const scale = 5

boxPositions.forEach((position, index) => {
  // console.log('color', color)
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    // color: colors[index % colors.length]
    color: rgbPercentageString(boxPositions[index].color)
  })
  const box = new THREE.Mesh(geometry, material)

    const boxEntity = world
      .createEntity()
      .addComponent(Transform)
      .addObject3DComponent(box, scene)
    
    const boxTransform = boxEntity.getMutableComponent(Transform)
    boxTransform.position.x = boxPositions[index].x * scale
    boxTransform.position.y = boxPositions[index].y * scale
    boxTransform.position.z = boxPositions[index].z * scale
})

  const geoFloor = new THREE.PlaneBufferGeometry(50, 50)
  const matFloor = new THREE.MeshBasicMaterial({
    color: 'cyan',
    side: THREE.DoubleSide
  })
  const floorMesh = new THREE.Mesh(geoFloor, matFloor)

    const floorEntity = world
      .createEntity()
      .addComponent(Transform)
      .addObject3DComponent(floorMesh, scene)

    const floorTransform = floorEntity.getMutableComponent(Transform)
    floorTransform.rotation.x = Math.PI / 2
    floorTransform.position.y = -1.6
    // boxTransform.position.z = boxPositions[index].z * scale
    


  const geoSky = new THREE.SphereBufferGeometry(100)
  const matSky = new THREE.MeshBasicMaterial({
    color: 'white',
    side: THREE.DoubleSide
  })
  const skyMesh = new THREE.Mesh(geoSky, matSky)

    const skyEntity = world
      .createEntity()
      .addComponent(Transform)
      .addObject3DComponent(skyMesh, scene)
    


  Armada.initializeActor(camera, {})

  // console.log(world)
  const time = performance.now()
  const delta = time - lastTime
  world.execute(delta, time)
  lastTime = time
}

const IndexComponent: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    // const { projectId } = props
    init().catch((e) => { console.log(e) })
  }, [])

  return (<div/>)
}

const IndexComponentWrapper: React.FC<Props> = (props: any) => {
  return <IndexComponent {...props} />
}

export default IndexComponentWrapper
