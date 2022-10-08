// import { angleToRadius } from '../../utils/angle'

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";

export default function Three() {

  const orbitControlsRef = useRef(null)
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

  useEffect(() => {
    if(!!orbitControlsRef.current){
      console.log(orbitControlsRef.current)
    }
  }, [orbitControlsRef.current])

  return (
    <>
      {/*Anything made in 3js will have default coords of [0, 0, 0] */}


      <PerspectiveCamera makeDefault position={[0, 1, 5]}/>
      {/*Perspective Camera adds depth, by making near things bigger and far things smaller */}
      <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} /> {/*orbit controls controls camera */}

      {/*sphere*/}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#ffffff' />
      </mesh>

      {/*floor*/}
      <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color='#1ea3d8' />
      </mesh>

      <ambientLight args={["#ffffff", .25]} /> {/*color of light then intensity*/}


      <spotLight args={['#ffffff', 1.5, 10, angleToRadians(45), .4, 1]} position={[-4, 3, 0]} castShadow />
      {/* <pointLight args={['#ffffff', 1]} position={[-2, 2, 0]} /> */}
      {/* <directionalLight args={['#ffffff', 1]} position={[-2, 2, 0]} /> */}
    </>
  )
}