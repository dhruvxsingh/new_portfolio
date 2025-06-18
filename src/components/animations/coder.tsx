import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const Laptop = (props: JSX.IntrinsicElements['group']) => {
  const { scene } = useGLTF('/models/laptop.glb')
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/laptop.glb')