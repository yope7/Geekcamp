import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Button, Slider, Typography, Box, Container } from '@mui/material';

const Target = ({ position }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const Gun = ({ rotation }) => {
  return (
    <mesh rotation={rotation}>
      <boxGeometry args={[0.1, 0.1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

const Bullet = ({ position, velocity }) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.position.add(velocity);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

const Scene = ({ elevationAngle, azimuthAngle, shoot, bullets }) => {
  const { camera } = useThree();
  camera.position.set(0, 2, 5);

  const gunRotation = [
    -THREE.MathUtils.degToRad(elevationAngle),
    THREE.MathUtils.degToRad(azimuthAngle),
    0
  ];

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Gun rotation={gunRotation} />
      <Target position={[0, 2, -10]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#e2e2e2" />
      </mesh>
      {bullets.map((bullet, index) => (
        <Bullet key={index} position={bullet.position} velocity={bullet.velocity} />
      ))}
    </>
  );
};

export const Game1 = () => {
  const [elevationAngle, setElevationAngle] = useState(0);
  const [azimuthAngle, setAzimuthAngle] = useState(0);
  const [bullets, setBullets] = useState([]);
  const [score, setScore] = useState(0);

  const shoot = () => {
    const radElevation = THREE.MathUtils.degToRad(elevationAngle);
    const radAzimuth = THREE.MathUtils.degToRad(azimuthAngle);
    const velocity = new THREE.Vector3(
      Math.sin(radAzimuth) * Math.cos(radElevation),
      Math.sin(radElevation),
      -Math.cos(radAzimuth) * Math.cos(radElevation)
    ).multiplyScalar(0.2);

    setBullets([...bullets, { position: new THREE.Vector3(0, 0, 0), velocity }]);

    // Simple hit detection
    if (Math.abs(azimuthAngle) < 5 && Math.abs(elevationAngle - 11.5) < 5) {
      setScore(score + 10);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" >
        3D射的ゲーム
      </Typography>
      <Box sx={{ width: '100%', height: '100%', mb: 0 }}>
        <Canvas>
          <Scene
            elevationAngle={elevationAngle}
            azimuthAngle={azimuthAngle}
            shoot={shoot}
            bullets={bullets}
          />
        </Canvas>
      </Box>
      <Typography>仰角: {elevationAngle}°</Typography>
      <Slider
        value={elevationAngle}
        onChange={(_, newValue) => setElevationAngle(newValue)}
        min={-90}
        max={90}
      />
      <Typography>方位角: {azimuthAngle}°</Typography>
      <Slider
        value={azimuthAngle}
        onChange={(_, newValue) => setAzimuthAngle(newValue)}
        min={-90}
        max={90}
      />
      <Button variant="contained" onClick={shoot} fullWidth sx={{ mt: 0 }} style={{
        display: 'block',
        // align : 'center',
      }}>
        発射！
      </Button>
      <Typography variant="h6" align="center" sx={{ mt: 0 }}>
        スコア: {score}
      </Typography>
      </Container>
  );
};

