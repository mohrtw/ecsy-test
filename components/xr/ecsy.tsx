/* eslint-disable no-case-declarations */
import React, { useEffect } from 'react'
// import { Component, System, TagComponent } from 'ecsy'
// import { connect } from 'react-redux'

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

// import ArmadaDefault from 'xr3ngine/armada'

console.log('Armada', Armada)

console.log('Transform', Transform)




interface Props {
}

// const mapStateToProps = (state: any): Partial<Props> => {
//   return {
//   }
// }

// const mapDispatchToProps = (): Partial<Props> => ({
// })

async function init (): Promise<any> { // auth: any,
  let lastTime = 0
  let world = new ECSYThreeWorld()
  world.registerComponent(Position)
    // .registerComponent(Transform)
    .registerComponent(SkyBox)
    .registerComponent(Parent)
    .registerComponent(GLTFLoader)
    .registerComponent(Rotation)
    .registerComponent(Scale)
    .registerComponent(Visible)
    // .registerComponent(Collidable)
    // .registerComponent(Image)
    // .registerComponent(Walkable)
    // .registerComponent(Input)
    // .registerComponent(State)
    // .registerComponent(Actor)
    // .registerComponent(Subscription)
  world.registerSystem(GLTFLoaderSystem)
  // .registerSystem(CameraSystem)
  // .registerSystem(ImageSystem)
  // .registerSystem(InputSystem)
  // .registerSystem(StateSystem)
  world = Armada.initializeInputSystems(world)

  const data = initialize(world)
  // world = Armada.initializeInputSystems(world)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scene, camera, renderer } = data.entities
  const camera3d = camera.getObject3D()
  camera3d.position.z = 5
  // document.onkeydown = (e) => {
  //   const camera3dObjectComponent = camera.getMutableComponent(Object3DComponent).value
  //   switch (e.keyCode) {
  //     case 37:
  //       camera3dObjectComponent.position.x -= 0.5
  //       break
  //     case 38:
  //       camera3dObjectComponent.position.z -= 0.5
  //       break
  //     case 39:
  //       (camera3dObjectComponent.position.x as number) += 0.5
  //       break
  //     case 40:
  //       (camera3dObjectComponent.position.z as number) += 0.5
  //       break
  //   }
  // }

// const texture = new THREE.TextureLoader().load('/textures/crate.gif')
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  // map: texture
  color: 'blue'
})
const box = new THREE.Mesh(geometry, material)
box.position.z = -2

  const movingEntity = world
    .createEntity()
    // .addComponent(Transform)
    // .addComponent(Input)
    // .addComponent(State)
    // .addComponent(Actor)
    // .addComponent(Subscription)
    .addObject3DComponent(box, scene)


  Armada.initializeActor(movingEntity, {})

  console.log('movingEntity', movingEntity)
  console.log('movingEntity._components', (movingEntity as any)._components)

  console.log('movingEntity._ComponentTypes', (movingEntity as any)._ComponentTypes)

  console.log('movingEntity._ComponentTypes.indexOf(Transform)', (movingEntity as any)._ComponentTypes.indexOf(Transform))

    // Armada.initializeActor(movingEntity, {})

//
    // (movingEntity.getMutableComponent(Input) as any).map = DefaultInputMap

  const cameraComp = camera.getMutableComponent(Camera)
  cameraComp.far = 100000000000

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

// export default connect(mapStateToProps, mapDispatchToProps)(IndexComponentWrapper)
