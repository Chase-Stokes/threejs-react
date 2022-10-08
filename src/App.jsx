import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Three from './component/three'
import './App.css'


// whats passed into suspense fallback will be displayed if page requires loading
function App() {
  return (
    <Canvas id='three-canvas-container'>
      <Suspense fallback={null}> 
        <Three />
      </Suspense>
    </Canvas>
  )
}

export default App
