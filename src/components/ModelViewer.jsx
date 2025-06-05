import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from '../styles/ModelViewer.module.css';

const ModelViewer = ({ src, rotationY = 0, rotationX = 0, scale = 1 }) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const modelRef = useRef(null);
  const initialScaleRef = useRef(1);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  // Function to dispose of scene objects and free memory
  const disposeScene = (scene) => {
    if (!scene) return;
    
    scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry.dispose();
        if (object.material.isMaterial) {
          object.material.dispose();
        } else {
          for (const material of object.material) {
            material.dispose();
          }
        }
      }
      if (object.isLight) {
        object.dispose();
      }
    });
  };

  useEffect(() => {
    if (!src) {
      setLoading(false);
      setError('Nenhum modelo fornecido');
      return;
    }

    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x162a47);
    sceneRef.current = scene;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-1, -1, -1).normalize();
    scene.add(backLight);

    // Camera setup - position slightly elevated for better frontal view
    const camera = new THREE.PerspectiveCamera(
      50, // Slightly narrower field of view
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 3); // Slightly elevated
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    // Orbit controls with more restricted movement
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI * 0.8; // Limit how much users can look from below
    controlsRef.current = controls;

    // Model loading
    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        initialScaleRef.current = 1.5 / maxDim;
        
        // Apply initial transformations
        model.scale.setScalar(initialScaleRef.current * scale);
        model.rotation.set(rotationX, Math.PI/2, 0);
        
        scene.add(model);
        setLoading(false);
      },
      (xhr) => {
        setProgress((xhr.loaded / xhr.total) * 100);
      },
      (error) => {
        console.error('Erro ao carregar modelo:', error);
        setError(`Erro ao carregar modelo: ${error}`);
        setLoading(false);
      }
    );

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    mount.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      controls.dispose();
      renderer.dispose();
      disposeScene(scene);
      modelRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
    };
  }, [src]);

  // Handle rotation and scale changes
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.set(rotationX, rotationY, 0);
      modelRef.current.scale.setScalar(initialScaleRef.current * scale);
      
      // Reset camera position when view changes
      if (cameraRef.current) {
        cameraRef.current.position.set(0, 0.5, 3);
        cameraRef.current.lookAt(0, 0, 0);
      }
      
      // Reset controls target
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  }, [rotationX, rotationY, scale]);

  return (
    <div className={styles.viewerContainer} ref={mountRef}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>Carregando modelo 3D... {Math.round(progress)}%</p>
        </div>
      )}
      {error && (
        <div className={styles.errorOverlay}>
          <p>{error}</p>
          <p className={styles.fallbackText}>Visualização 2D disponível abaixo</p>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;