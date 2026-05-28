import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create floating gold particles
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() * 3 + 0.5;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#e8b916') },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * 0.5 + position.x * 0.5) * 0.3;
          pos.x += cos(uTime * 0.3 + position.z * 0.5) * 0.2;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (3.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = 0.3 + 0.7 * sin(uTime * 0.5 + position.x + position.y);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * 0.6;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create geometric wireframe shapes
    const torusGeometry = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: '#c9980a',
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI * 0.3;
    scene.add(torus);

    const torus2Geometry = new THREE.TorusGeometry(3.5, 0.015, 16, 100);
    const torus2Material = new THREE.MeshBasicMaterial({
      color: '#e8b916',
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    torus2.rotation.x = Math.PI * 0.6;
    torus2.rotation.y = Math.PI * 0.3;
    scene.add(torus2);

    // Floating diamond shape
    const diamondGeometry = new THREE.OctahedronGeometry(0.8, 0);
    const diamondMaterial = new THREE.MeshBasicMaterial({
      color: '#f0cd53',
      transparent: true,
      opacity: 0.12,
      wireframe: true,
    });
    const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
    diamond.position.set(3, 1, -2);
    scene.add(diamond);

    // Second diamond
    const diamond2 = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.MeshBasicMaterial({
        color: '#c9980a',
        transparent: true,
        opacity: 0.1,
        wireframe: true,
      })
    );
    diamond2.position.set(-3.5, -1.5, -1);
    scene.add(diamond2);

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      particlesMaterial.uniforms.uTime.value = elapsed;
      torus.rotation.z = elapsed * 0.1;
      torus2.rotation.z = -elapsed * 0.08;
      diamond.rotation.y = elapsed * 0.3;
      diamond.rotation.x = elapsed * 0.2;
      diamond2.rotation.y = -elapsed * 0.25;
      diamond2.rotation.z = elapsed * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-canvas-container" />;
}
