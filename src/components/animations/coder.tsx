import { useGLTF } from '@react-three/drei'

type GroupProps = {
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  position?: [number, number, number];
}

export const Laptop = (props: GroupProps) => {
  const { scene } = useGLTF('/models/laptop.glb')
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/laptop.glb')