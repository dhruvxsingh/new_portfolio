import { useGLTF } from '@react-three/drei'
import React from 'react'

type GroupProps = {
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  position?: [number, number, number];
}

export const Basketball = (props: GroupProps) => {
  const { scene } = useGLTF('/models/basketball.glb')
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/basketball.glb')