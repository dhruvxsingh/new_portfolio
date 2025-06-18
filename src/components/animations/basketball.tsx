import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const Basketball = (props: JSX.IntrinsicElements['group']) => {
  const { scene } = useGLTF('/models/basketball.glb')
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/basketball.glb')