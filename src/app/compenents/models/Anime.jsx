"use client";

import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Anime(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/3d+character+model.glb");
  const { actions } = useAnimations(animations, group);
  alert("Loaded GLB with animations:", { actions, animations });
  useEffect(() => {
    // If your GLB already has an animation, it will play
    const firstAction = actions ? Object.values(actions)[0] : null;
    if (firstAction) {
      firstAction.reset().fadeIn(0.4).play();
    }

    return () => {
      if (actions) Object.values(actions).forEach((action) => action?.stop());
    };
  }, [actions]);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;

    const baseY = props.position?.[1] ?? 0;
    const baseX = props.rotation?.[0] ?? 0;
    const baseYRot = props.rotation?.[1] ?? 0;
    const baseZ = props.rotation?.[2] ?? 0;

    // no auto rotate
    group.current.rotation.y = baseYRot;

    // gentle agree / nod motion
    const nod = Math.max(0, Math.sin(t * 1.8)) * 0.12;
    const settle = Math.sin(t * 0.9) * 0.015;

    group.current.rotation.x = baseX + nod + settle;
    group.current.rotation.z = baseZ;

    // small breathing float
    group.current.position.y = baseY + Math.sin(t * 1.4) * 0.04;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models//3d+character+model.glb");