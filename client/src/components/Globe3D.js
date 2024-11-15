"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ThreeGlobe from 'three-globe';

// Import your data
import countries from '../../public/globeData/custom.geo.json';
import arcData from '../../public/globeData/arcData.json';

function Globe3D() {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null); // Prevent duplicate renderer creation on re-renders

  useEffect(() => {
    if (!canvasRef.current || rendererRef.current) return; // Prevent duplicate renderers

    // Dimensions
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    scene.fog = new THREE.Fog(0x53ef3, 400, 2000);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    camera.position.set(0, 0, 300);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Store renderer reference to prevent duplicates

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.3);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(-800, 2000, 400);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x7982f6, 1);
    directionalLight2.position.set(-200, 500, 200);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0x8566cc, 0.5);
    directionalLight3.position.set(200, -500, -200);
    scene.add(directionalLight3);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    // Globe
    const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.5);

    // Adding arcs and rings to the globe
    setTimeout(() => {
      globe.arcsData(arcData.arcs)
        .arcColor((e) => e.arcColor)
        .arcAltitude((e) => e.arcAlt)
        .arcStroke((e) => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(1000)
        .arcsTransitionDuration(1000)
        .arcDashInitialGap((e) => e.order * 1);

      const ringData = arcData.arcs.flatMap((arc) => [
        { lat: arc.startLat, lng: arc.startLng, color: arc.arcColor },
        { lat: arc.endLat, lng: arc.endLng, color: arc.arcColor },
      ]);

      globe.ringsData(ringData)
        .ringColor((e) => () => e.color)
        .ringMaxRadius(5)
        .ringPropagationSpeed(3)
        .ringRepeatPeriod(1000);
    }, 0);

    globe.rotateY(-Math.PI * (5 / 9));
    globe.rotateZ(-Math.PI / 6);

    // Globe material settings
    const globeMaterial = globe.globeMaterial();
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;
    scene.add(globe);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = canvasRef.current.clientWidth;
      const newHeight = canvasRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      rendererRef.current = null; // Reset reference on cleanup
    };
  }, []); // Empty dependency array ensures this runs only once after mount

  return <div ref={canvasRef} className="w-full h-full" />;
}

export default Globe3D;
