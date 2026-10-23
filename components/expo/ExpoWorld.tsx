"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

export interface WorldItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  sub?: string;
  /** Verb shown on the interact button */
  enterLabel: "enter" | "view";
}

interface ExpoWorldProps {
  items: WorldItem[];
  onEnter: (id: string) => void;
  /** Short instructions shown at the top of the viewport */
  hint: string;
  className?: string;
}

type Direction = "forward" | "backward" | "left" | "right";

const EYE_HEIGHT = 1.7;
const INTERACT_RANGE = 5.5;
const MOVE_SPEED = 7.5;
const BOUND_X = 13;
const BOUND_Z_FRONT = 13;
const BOUND_Z_BACK = 6;
const LOOK_SENSITIVITY = 0.0032;
const MAX_PITCH = Math.PI / 2 - 0.05;
const SKY_COLOR = 0xbfd6ff;
const FLOOR_COLOR = 0xe4e8f0;
const ITEM_SPACING = 4.6;

function makeLabelTexture(icon: string, title: string, sub: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 224;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(17, 19, 32, 0.82)";
  ctx.beginPath();
  ctx.roundRect(8, 8, canvas.width - 16, canvas.height - 16, 26);
  ctx.fill();
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "66px system-ui, -apple-system, sans-serif";
  ctx.fillText(icon, canvas.width / 2, 92);
  ctx.font = "bold 40px system-ui, -apple-system, sans-serif";
  ctx.fillText(title, canvas.width / 2, 150);
  if (sub) {
    ctx.font = "26px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(sub, canvas.width / 2, 192);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    mesh.geometry?.dispose();
    const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
    for (const m of Array.isArray(material) ? material : material ? [material] : []) {
      (m as THREE.SpriteMaterial).map?.dispose();
      m.dispose();
    }
  });
}

const PAD_BUTTONS: { dir: Direction; icon: typeof ArrowUp; label: string; className: string }[] = [
  { dir: "forward", icon: ArrowUp, label: "Move forward", className: "col-start-2 row-start-1" },
  { dir: "left", icon: ArrowLeft, label: "Move left", className: "col-start-1 row-start-2" },
  { dir: "backward", icon: ArrowDown, label: "Move backward", className: "col-start-2 row-start-3" },
  { dir: "right", icon: ArrowRight, label: "Move right", className: "col-start-3 row-start-2" },
];

/** A first-person 3D hall: drag to look, WASD / on-screen pad to walk, tap the prompt (or press E) to enter. */
export default function ExpoWorld({ items, onEnter, hint, className }: ExpoWorldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const keys = useRef<Record<Direction, boolean>>({ forward: false, backward: false, left: false, right: false });
  const focusedId = useRef<string | null>(null);
  const onEnterRef = useRef(onEnter);
  const [prompt, setPrompt] = useState<{ id: string; label: string } | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const [error] = useState<string | null>(() => (supportsWebGL() ? null : "Your browser could not start 3D graphics (WebGL)."));

  useEffect(() => {
    onEnterRef.current = onEnter;
  }, [onEnter]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (error) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const width = () => host.clientWidth || 1;
    const height = () => host.clientHeight || 1;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SKY_COLOR);
    scene.fog = new THREE.Fog(SKY_COLOR, 14, 36);

    const camera = new THREE.PerspectiveCamera(68, width() / height(), 0.1, 200);
    const pitch = new THREE.Object3D();
    pitch.add(camera);
    const yaw = new THREE.Object3D();
    yaw.position.set(0, EYE_HEIGHT, 9);
    yaw.add(pitch);
    scene.add(yaw);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width(), height());
    renderer.shadowMap.enabled = true;
    const canvas = renderer.domElement;
    canvas.style.touchAction = "none";
    canvas.style.cursor = "grab";
    canvas.style.display = "block";
    host.prepend(canvas);

    scene.add(new THREE.HemisphereLight(0xffffff, FLOOR_COLOR, 0.9));
    const sun = new THREE.DirectionalLight(0xffffff, 1.1);
    sun.position.set(6, 10, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -20, right: 20, top: 20, bottom: -20 });
    scene.add(sun);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: FLOOR_COLOR, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(80, 40, 0xffffff, 0xffffff);
    const gridMaterial = grid.material as THREE.LineBasicMaterial;
    gridMaterial.opacity = 0.12;
    gridMaterial.transparent = true;
    scene.add(grid);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 0.3, 24), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }));
    hub.position.set(0, 0.15, 3.5);
    hub.castShadow = true;
    hub.receiveShadow = true;
    scene.add(hub);

    const interactables: THREE.Mesh[] = [];
    items.forEach((item, i) => {
      const group = new THREE.Group();
      const boxHeight = 1.6 + (i % 2) * 0.1;
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, boxHeight, 1.8),
        new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.55, metalness: 0.05 }),
      );
      box.position.y = boxHeight / 2;
      box.castShadow = true;
      box.receiveShadow = true;
      box.userData.itemId = item.id;
      group.add(box);

      const label = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: makeLabelTexture(item.icon, item.name, item.sub ?? ""), depthTest: false, transparent: true }),
      );
      label.scale.set(2.7, 1.18, 1);
      label.renderOrder = 10;
      label.position.y = boxHeight + 0.85;
      group.add(label);

      group.position.set((i - (items.length - 1) / 2) * ITEM_SPACING, 0, -6);
      scene.add(group);
      interactables.push(box);
    });

    // ---- Drag to look (mouse + touch) ----
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      yaw.rotation.y -= (e.clientX - lastX) * LOOK_SENSITIVITY;
      pitch.rotation.x = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, pitch.rotation.x - (e.clientY - lastY) * LOOK_SENSITIVITY));
      lastX = e.clientX;
      lastY = e.clientY;
      setHintVisible(false);
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    // ---- Keyboard ----
    const keyMap: Record<string, Direction> = {
      KeyW: "forward",
      ArrowUp: "forward",
      KeyS: "backward",
      ArrowDown: "backward",
      KeyA: "left",
      ArrowLeft: "left",
      KeyD: "right",
      ArrowRight: "right",
    };
    const isTyping = () => {
      const el = document.activeElement;
      return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTyping()) return;
      const dir = keyMap[e.code];
      if (dir) keys.current[dir] = true;
      else if (e.code === "KeyE" && focusedId.current) onEnterRef.current(focusedId.current);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const dir = keyMap[e.code];
      if (dir) keys.current[dir] = false;
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    // ---- Focus detection ----
    const raycaster = new THREE.Raycaster();
    raycaster.far = INTERACT_RANGE;
    const center = new THREE.Vector2(0, 0);
    const updateFocus = () => {
      raycaster.setFromCamera(center, camera);
      const hit = raycaster.intersectObjects(interactables, false)[0]?.object;
      const id = (hit?.userData.itemId as string | undefined) ?? null;
      if (id === focusedId.current) return;
      focusedId.current = id;
      const item = id ? items.find((it) => it.id === id) : undefined;
      setPrompt(item ? { id: item.id, label: `${item.enterLabel === "view" ? "View" : "Enter"} ${item.name} →` } : null);
    };

    // ---- Loop ----
    const clock = new THREE.Clock();
    const up = new THREE.Vector3(0, 1, 0);
    const forwardVec = new THREE.Vector3();
    const rightVec = new THREE.Vector3();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const moveX = Number(keys.current.right) - Number(keys.current.left);
      const moveZ = Number(keys.current.forward) - Number(keys.current.backward);
      if (moveX || moveZ) {
        forwardVec.set(0, 0, -1).applyAxisAngle(up, yaw.rotation.y);
        rightVec.set(1, 0, 0).applyAxisAngle(up, yaw.rotation.y);
        const len = Math.hypot(moveX, moveZ) || 1;
        yaw.position.addScaledVector(forwardVec, (moveZ / len) * MOVE_SPEED * delta);
        yaw.position.addScaledVector(rightVec, (moveX / len) * MOVE_SPEED * delta);
        yaw.position.x = Math.max(-BOUND_X, Math.min(BOUND_X, yaw.position.x));
        yaw.position.z = Math.max(-BOUND_Z_FRONT, Math.min(BOUND_Z_BACK, yaw.position.z));
      }
      updateFocus();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderer.setSize(width(), height());
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(host);

    const pressed = keys.current;
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      disposeScene(scene);
      renderer.dispose();
      canvas.remove();
      focusedId.current = null;
      pressed.forward = pressed.backward = pressed.left = pressed.right = false;
    };
  }, [items, error]);

  const setKey = (dir: Direction, down: boolean) => {
    keys.current[dir] = down;
  };

  return (
    <div
      ref={hostRef}
      className={`relative w-full h-[360px] md:h-[480px] rounded-2xl overflow-hidden bg-[#bfd6ff] shadow-2xl select-none ${className ?? ""}`}
      aria-label="Interactive 3D hall"
    >
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-gray-700 text-sm">{error}</div>
      ) : (
        <>
          <div className="pointer-events-none absolute top-1/2 left-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full border-2 border-white/85 mix-blend-difference" />

          {hintVisible && (
            <div className="pointer-events-none absolute top-3.5 left-1/2 -translate-x-1/2 max-w-[90%] rounded-full bg-black/60 px-3.5 py-1.5 text-center text-xs text-gray-200">
              {hint}
            </div>
          )}

          {prompt && (
            <button
              type="button"
              onClick={() => onEnterRef.current(prompt.id)}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-linear-to-r from-magenta to-[#EF7B20] px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:opacity-90"
            >
              {prompt.label}
            </button>
          )}

          <div className="absolute bottom-4 left-4 grid grid-cols-3 grid-rows-3 gap-1" role="group" aria-label="Movement controls">
            {PAD_BUTTONS.map(({ dir, icon: Icon, label, className: place }) => (
              <button
                key={dir}
                type="button"
                aria-label={label}
                onPointerDown={(e) => {
                  e.preventDefault();
                  setKey(dir, true);
                }}
                onPointerUp={() => setKey(dir, false)}
                onPointerLeave={() => setKey(dir, false)}
                onPointerCancel={() => setKey(dir, false)}
                className={`flex h-10 w-10 touch-none items-center justify-center rounded-lg bg-[#0f1220]/55 text-white select-none active:bg-magenta/85 ${place}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
