import '@react-three/fiber'
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
// types/three.d.ts
/// <reference types="@react-three/fiber" />
/// <reference types="@react-three/drei" />
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
declare module 'three-stdlib' {
  interface GLTF {
    nodes: {
      laptop?: THREE.Mesh;
      screen?: THREE.Mesh;
      basketball?: THREE.Mesh;
      // Add other models here as needed
    };
    materials: {
      aluminium?: THREE.MeshStandardMaterial;
      screen?: THREE.MeshStandardMaterial;
      basketball_mat?: THREE.MeshStandardMaterial;
      // Add other materials here as needed
    };
  }
}