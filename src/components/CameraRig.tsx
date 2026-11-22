import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  position: [number, number, number];
  lookAt?: [number, number, number];
}

export const CameraRig: React.FC<CameraRigProps> = ({
  position,
  lookAt = [0, 0, 0],
}) => {
  const { camera } = useThree();
  const targetVec = useRef(new THREE.Vector3(...lookAt));

  camera.position.set(position[0], position[1], position[2]);
  targetVec.current.set(lookAt[0], lookAt[1], lookAt[2]);
  camera.lookAt(targetVec.current);

  useFrame(() => {
    camera.position.set(position[0], position[1], position[2]);
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  });

  return null;
};
