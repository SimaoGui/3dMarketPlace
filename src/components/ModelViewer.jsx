import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from '../styles/ModelViewer.module.css';

const ModelViewer = ({ src }) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // Function to dispose of scene objects and free memory
  const disposeScene = (scene) => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry.dispose();
        if (object.material.isMaterial) {
          object.material.dispose();
        } else {
          // Handle multi-material objects
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
    // Check if src is provided; if not, exit early
    if (!src) {
      setLoading(false);
      setError('Nenhum modelo fornecido');
      return;
    }

    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x162a47);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Directional light for detail
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Back light for additional illumination
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-1, -1, -1).normalize();
    scene.add(backLight);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    // Orbit controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI;

    // GLTF model loader
    const loader = new GLTFLoader();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    // Load the 3D model
    loader.load(
      src,
      (gltf) => {
        const model = gltf.scene;

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.sub(center); // Center the model at origin
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.0 / maxDim;
        model.scale.set(scale, scale, scale);

        // Aplicar rotação para corrigir orientação inicial
        model.rotation.y = Math.PI/2; // Rotação de 180 graus no eixo Y

        model.position.y -= 0.6;

        scene.add(model);
        setLoading(false);
      },
      (xhr) => {
        // Update loading progress
        setProgress((xhr.loaded / xhr.total) * 100);
      },
      (error) => {
        console.error('Erro ao carregar modelo:', error);
        setError(`Erro ao carregar modelo: ${error}`);
        setLoading(false);
      }
    );

    // Append renderer to DOM
    mount.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount or src change
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
      disposeScene(scene);
    };
  }, [src]);

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