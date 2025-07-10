import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    // ✅ Check WebGL Support
    const isWebGLSupported = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!window.WebGLRenderingContext && (
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        );
      } catch (e) {
        return false;
      }
    };

    // ✅ Only apply Vanta effect if WebGL is available
    if (isWebGLSupported()) {
      if (!vantaEffect) {
        setVantaEffect(
          NET({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff3f3f,
            backgroundColor: 0x000000,
            points: 8,
            maxDistance: 30,
            spacing: 30,
          })
        );
      }
    } else {
      console.warn("⚠️ WebGL not supported. Skipping Vanta background.");
    }

    // ✅ Cleanup on unmount
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundColor: '#000000',
      }}
    ></div>
  );
};

export default VantaBackground;
