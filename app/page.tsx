"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import style from "./page.module.css";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { ScrollControls, useScroll, useGLTF } from "@react-three/drei";
import Image from "next/image";
import background from "@/public/background.jpg";

const Model = () => {
  const MeshRef = useRef<THREE.Mesh>(null);

  const { scene } = useGLTF("/coffee.glb");

  const scroll = useScroll();

  useFrame(() => {
    if (MeshRef.current) {
      // MeshRef.current.rotation.x -= 0.01;
      // MeshRef.current.rotation.y += 0.01;
      // MeshRef.current.rotation.z += 0.01;
      MeshRef.current.rotation.x = 1.6 - scroll.offset * Math.PI / 2.6
      MeshRef.current.rotation.y = 1 + scroll.offset * Math.PI * 1.1
      // MeshRef.current.rotation.z = 1 + scroll.offset * Math.PI * 2
    }
  });

  useEffect(() => {
    if (MeshRef.current) {
      MeshRef.current.rotation.x = 1.6;
      MeshRef.current.rotation.y = 1;
    }
  }, [MeshRef]);

  return (
    <>
      <mesh>
        {/* <group position={[0, -1.5, 0]}> */}
          <primitive object={scene} scale={0.04} ref={MeshRef} />
          <meshStandardMaterial color={"red"} />
        {/* </group> */}
      </mesh>
    </>
  );
};

export default function Home() {
  return (
    <div className={style.Body}>
      <div className={style.ImageContainer}>
        <div className={style.ImageWrapper}>
          <Image alt="" src={background} className={style.Image} />
        </div>
      </div>
      <div className={style.Title}>Good morning</div>
      <div className={style.CanvasParent}>
        <Canvas className={style.Canvas}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <ScrollControls pages={2}>
            <Model />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
