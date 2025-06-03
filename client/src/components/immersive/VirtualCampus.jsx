import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const VirtualCampus = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue background
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 5, 15);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    
    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
    
    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3a7e4f, // Grass green 
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Create buildings
    const createBuilding = (x, z, width, height, depth, color, name) => {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshStandardMaterial({ color });
      const building = new THREE.Mesh(geometry, material);
      building.position.set(x, height/2, z);
      building.castShadow = true;
      building.receiveShadow = true;
      building.userData.name = name;
      scene.add(building);
      return building;
    };
    
    // Add different buildings for different learning areas
    const codingBuilding = createBuilding(-10, -5, 8, 10, 8, 0x6096ba, 'Coding');
    const designBuilding = createBuilding(10, -5, 8, 6, 8, 0xe36414, 'Design');
    const aiBuilding = createBuilding(0, 10, 12, 8, 8, 0x9a348e, 'AI');
    const blockchainBuilding = createBuilding(-15, 10, 10, 7, 10, 0xadc5d9, 'Blockchain');
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  
  return (
    <div>
      <div 
        ref={mountRef} 
        style={{ width: '100%', height: '100vh' }}
      />
      <div className="absolute top-5 left-5 text-white bg-black bg-opacity-50 p-2 rounded">
        <h2 className="text-xl font-bold">Virtual Campus</h2>
        <p>Use mouse to navigate between buildings</p>
      </div>
    </div>
  );
};

export default VirtualCampus; 