import { Environment, OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { BackSide, FrontSide } from "three"
import { angleToRadians } from "../../utils/angle"
import gsap from 'gsap'

//floor textures
import ambientOcclusion from '../../assets/Concrete_Floor/Concrete_019_AmbientOcclusion.jpg'
import base from '../../assets/Concrete_Floor/Concrete_019_BaseColor.jpg'
import displacement from '../../assets/Concrete_Floor/Concrete_019_Height.png'
import normal from '../../assets/Concrete_Floor/Concrete_019_Normal.jpg'
import roughness from '../../assets/Concrete_Floor/Concrete_019_Roughness.jpg'

//models
import Car from './car'

export default function Three() {
  const [ambientOcclusionFloorTexture, baseFloorColorTexture, displacementFloorTexture, normalFloorTexture, roughnessFloorTexture] = useTexture([ambientOcclusion, base, displacement, normal, roughness])
  const orbitControlsRef = useRef(null)

  //code below used to move camera around
  useFrame((state) => {
    //use frame runs at least 60 times a second depends on refresh rate
    if(!!orbitControlsRef.current){
      const { x, y } = state.mouse //normalized coords only range from -1 to 1
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45))
      orbitControlsRef.current.setPolarAngle((y + 1.5) * angleToRadians(90 - 30))
      orbitControlsRef.current.update()
    }
    // console.log(state.mouse)
  })

  //animations
  const sphereRef = useRef(null)
  useEffect(() => {
    if(!!sphereRef.current){
      console.log(sphereRef.current)
      const timeline = gsap.timeline({paused: true})
      timeline.to(sphereRef.current.position, {x: 5, duration: 3, ease: 'power2.out'})
      timeline.to(sphereRef.current.position, {y: .7, duration: 1.5, ease: 'bounce.out'}, '<')
      timeline.play()
    }
  }, [sphereRef.current])

  // useEffect(() => {
  //   if(!!orbitControlsRef.current){
  //     console.log(orbitControlsRef.current)
  //   }
  // }, [orbitControlsRef.current])

  return (
    <>
      {/*Anything made in 3js will have default coords of [0, 0, 0] */}
      {/* Shadows need to be enabled on each object from light to sphere to floor, and also needs enabled on the component itself */}


      <PerspectiveCamera makeDefault position={[0, 35, 5]}/>
      {/*Perspective Camera adds depth, by making near things bigger and far things smaller */}
      <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} /> {/*orbit controls controls camera */}

      {/*sphere*/}
      <mesh position={[-2, 4, 0]} ref={sphereRef} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#ffffff' metalness={.6} roughness={.3}/>
      </mesh>

      <Car />

      {/*floor*/}
      <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial map={baseFloorColorTexture} normalMap={normalFloorTexture} roughnessMap={roughnessFloorTexture} aoMap={ambientOcclusionFloorTexture} displacementMap={displacementFloorTexture}/>
      </mesh>

      <ambientLight args={["#ffffff", .25]} /> 

      <spotLight args={['#ffffff', 2, 20, angleToRadians(45), .4, 1]} position={[-5, 2, 2]} castShadow />
      {/* <pointLight args={['#ffffff', 1]} position={[-2, 2, 0]} castShadow/> */}
      {/* <directionalLight args={['#ffffff', 1]} position={[-2, 2, 0]} castShadow/> */}

      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color='black' side={BackSide}/>
        </mesh>
      </Environment>
    </>
  )
}