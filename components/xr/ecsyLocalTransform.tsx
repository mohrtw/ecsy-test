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

console.log('Armada', Armada)

console.log('Transform', Transform)

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
  camera3d.position.z = 5

const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 'blue'
})
const box = new THREE.Mesh(geometry, material)
box.position.z = -2

  const movingEntity = world
    .createEntity()
    .addComponent(Transform)
    .addObject3DComponent(box, scene)


  Armada.initializeActor(movingEntity, {})

  console.log('movingEntity', movingEntity)
  console.log('movingEntity._components', (movingEntity as any)._components)

  console.log('movingEntity._ComponentTypes', (movingEntity as any)._ComponentTypes)

  console.log('movingEntity._ComponentTypes.indexOf(Transform)', (movingEntity as any)._ComponentTypes.indexOf(Transform))


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
