import '@react-three/fiber'
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
// types/three.d.ts
// / <reference types="@react-three/fiber" />
// / <reference types="@react-three/drei" />
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any
      orbitControls: any
      sphereGeometry: any
      meshStandardMaterial: any
      ambientLight: any
      pointLight: any
      group: any
    }
  }
}