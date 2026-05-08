"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import Image from "next/image";

const BackgroundGlowShape = ({ color, size, position }: { color: string; size: string; position: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.7, 0.4],
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`absolute z-0 ${size} ${position} rounded-full blur-[120px] pointer-events-none mix-blend-screen`}
    style={{ backgroundColor: color }}
  />
);

const CrazyOrangeSVG = ({ x, y, angle, id }: { x: number; y: number; angle: number; id: number }) => (
  <svg
    key={id}
    viewBox="0 0 61 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none absolute h-[60px] w-[60px] drop-shadow-xl"
    style={{
      left: x - 30,
      top: y - 36,
      transform: `rotate(${angle}rad)`,
    }}
  >
    <g filter="url(#filter0_d_404)">
      <circle cx="28.6267" cy="36.9091" r="25.1365" fill="url(#paint0_radial_404)" />
      <path d="M26.9971 11.7726C35.9626 16.155 41.0641 27.4416 38.6748 39.0089C36.1373 51.2935 26.0467 59.5597 15.4785 58.5167C14.1095 57.6119 12.8345 56.5769 11.667 55.4327C21.4826 55.8835 30.6724 48.0654 33.0371 36.6173C35.0725 26.7634 31.4515 17.1217 24.6016 12.1251C25.3877 11.971 26.1868 11.8528 26.9971 11.7726Z" fill="#1F181F" />
      <path fillRule="evenodd" clipRule="evenodd" d="M39.8795 41.8535C40.985 38.5283 44.2007 36.6646 47.0614 37.6911C49.9221 38.7177 51.3452 42.2459 50.2398 45.5711C49.1343 48.8962 45.9185 50.7591 43.0578 49.7326C40.1975 48.7058 38.7743 45.1785 39.8795 41.8535ZM46.1745 40.715C44.7983 40.2212 43.2511 41.1172 42.7193 42.7169C42.1876 44.3163 42.8723 46.0133 44.2481 46.5074C45.6243 47.0012 47.1715 46.105 47.7033 44.5055C48.2351 42.9059 47.5505 41.2089 46.1745 40.715Z" fill="#1F181F" />
      <path fillRule="evenodd" clipRule="evenodd" d="M41.2229 15.1365C47.6907 18.2446 52.3525 24.8413 52.9365 32.9651C53.3284 38.4184 51.813 43.6371 48.988 47.8773C49.2388 46.8825 49.3384 45.6239 49.231 44.2687C49.1054 42.6842 48.7199 41.276 48.2066 40.2913C50.0518 37.1214 51.009 33.3611 50.728 29.4489C50.261 22.9514 46.5016 17.6857 41.3008 15.2537C41.2753 15.2147 41.2485 15.1753 41.2229 15.1365Z" fill="#1F181F" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.992 28.3592C20.0056 24.5194 23.4891 22.1948 26.7727 23.1672C30.0562 24.1398 31.8968 28.0411 30.8834 31.8811C29.87 35.721 26.3863 38.0454 23.1027 37.0731C19.8189 36.1007 17.9786 32.1993 18.992 28.3592ZM25.9839 26.6508C24.4043 26.1831 22.7286 27.3012 22.241 29.1483C21.7535 30.9956 22.6389 32.8728 24.2186 33.3406C25.7981 33.808 27.4739 32.6893 27.9614 30.8421C28.4486 28.9951 27.5633 27.1187 25.9839 26.6508Z" fill="#1F181F" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.6407 21.3838C21.39 20.7253 24.9791 21.6293 27.9806 23.7037C27.7729 24.1472 27.6867 24.6546 27.7597 25.1772C27.7851 25.359 27.8277 25.5344 27.8871 25.7007C26.8273 25.6868 25.7519 25.7508 24.6682 25.9024C23.2026 26.1073 21.7945 26.459 20.4575 26.9379C18.9785 26.5754 17.426 26.5264 15.8568 26.8407C8.78917 28.2567 4.17072 34.9441 5.39938 43.7064C5.76705 46.3278 6.61819 48.8796 7.81818 51.1314C7.84961 51.2358 7.88287 51.3396 7.916 51.4431C6.52777 49.2244 5.45797 46.6291 4.82285 43.7298C2.75662 33.1033 9.07131 23.1008 17.6407 21.3838Z" fill="#1F181F" />
      <path d="M28.3079 0.392901C29.6442 0.510806 30.843 1.04562 31.7895 1.85674C28.9147 2.17225 26.5664 4.47872 26.3025 7.46968C26.1348 9.37278 26.847 11.1506 28.1018 12.4017C25.1429 11.7156 23.0644 8.93942 23.3387 5.827C23.5756 3.1405 25.4944 1.00689 27.9657 0.371545C28.0792 0.375349 28.1934 0.382807 28.3079 0.392901Z" fill="url(#paint1_linear_404)" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.0758 7.04105C15.0478 5.79515 17.7905 5.37507 20.562 6.10871C21.413 6.33399 22.2074 6.6531 22.9318 7.04589C23.151 8.93863 24.1637 10.6377 25.6739 11.7431C24.1462 11.6782 22.5807 11.4483 21.0112 11.0328C17.9562 10.2241 15.2594 8.82151 13.0758 7.04105Z" fill="url(#paint2_linear_404)" />
    </g>
    <defs>
      <filter id="filter0_d_404" x="0" y="0.371582" width="60.2295" height="70.674" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="2" dy="5" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_404" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_404" result="shape" />
      </filter>
      <radialGradient id="paint0_radial_404" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.5609 14.3271) rotate(67.825) scale(58.2055)">
        <stop stopColor="#EC5800" />
        <stop offset="0.586538" stopColor="#E55500" />
        <stop offset="0.903846" stopColor="#2D282D" />
      </radialGradient>
      <linearGradient id="paint1_linear_404" x1="28.5604" y1="4.4112" x2="26.8192" y2="12.2886" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EC5800" />
        <stop offset="1" stopColor="#1F181F" />
      </linearGradient>
      <linearGradient id="paint2_linear_404" x1="19.568" y1="5.82686" x2="25.8166" y2="12.1742" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EC5800" />
        <stop offset="1" stopColor="#863200" />
      </linearGradient>
    </defs>
  </svg>
);

const BasketItem = ({ x, y }: { x: number; y: number }) => (
  <div
    className="pointer-events-none absolute"
    style={{ 
      width: 480,
      height: 360, 
      left: x - 240, 
      top: y - 220, 
    }} 
  >
    <Image 
      src="/basket.svg" 
      alt="Basket" 
      fill 
      className="object-contain drop-shadow-[0_0_15px_rgba(236,88,0,0.5)]" 
      priority 
    />
  </div>
);

export default function NotFound() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const wonRef = useRef(false);

  const [orangePositions, setOrangePositions] = useState<{ x: number; y: number; angle: number; id: number }[]>([]);
  const [basketPos, setBasketPos] = useState({ x: 0, y: 0 });
  const [caughtCount, setCaughtCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8 },
    });
    engineRef.current = engine;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    const wallThickness = 60;
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true, render: { visible: false } }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } }),
    ];

    const basketWidth = 260; 
    const basketHeight = 150; 
    const basketX = width / 2;
    const basketY = height - 70; 
    const basketWallThickness = 20;

    setBasketPos({ x: basketX, y: basketY });

    const basketParts = [
      Matter.Bodies.rectangle(basketX, basketY + basketHeight / 2 - basketWallThickness / 2, basketWidth, basketWallThickness, { isStatic: true, render: { visible: false }, label: "basket" }),
      Matter.Bodies.rectangle(basketX - basketWidth / 2 + basketWallThickness / 2, basketY, basketWallThickness, basketHeight, { isStatic: true, render: { visible: false } }),
      Matter.Bodies.rectangle(basketX + basketWidth / 2 - basketWallThickness / 2, basketY, basketWallThickness, basketHeight, { isStatic: true, render: { visible: false } }),
    ];

    const orangeRadius = 28;
    const oranges: Matter.Body[] = [];
    const orangeCount = 7;

    for (let i = 0; i < orangeCount; i++) {
      const orange = Matter.Bodies.circle(
        100 + Math.random() * (width - 200),
        -100 - Math.random() * 400, 
        orangeRadius,
        {
          restitution: 0.6,
          friction: 0.3,
          frictionAir: 0.01,
          render: { visible: false }, 
          label: `orange-${i}`,
        }
      );
      oranges.push(orange);
    }

    Matter.Composite.add(engine.world, [...walls, ...basketParts, ...oranges]);

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    mouseConstraintRef.current = mouseConstraint;
    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    const caughtOranges = new Set<string>();

    Matter.Events.on(engine, "afterUpdate", () => {
      setOrangePositions(oranges.map((orange, i) => ({
        x: orange.position.x, y: orange.position.y, angle: orange.angle, id: i,
      })));

      oranges.forEach((orange) => {
        const inBasket =
          orange.position.x > basketX - basketWidth / 2 &&
          orange.position.x < basketX + basketWidth / 2 &&
          orange.position.y > basketY - basketHeight / 2 &&
          Math.abs(orange.velocity.y) < 1.5;

        if (inBasket && !caughtOranges.has(orange.label)) {
          caughtOranges.add(orange.label);
          setCaughtCount((prev) => {
            const newCount = prev + 1;
            
            if (newCount === orangeCount && !wonRef.current) {
              wonRef.current = true;
              setShowConfetti(true);
              setTimeout(() => {
                setShowConfetti(false);
              }, 3500); 
            }
            return newCount;
          });
        }
      });
    });

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: newHeight + wallThickness / 2 });
      Matter.Body.setPosition(walls[2], { x: newWidth + wallThickness / 2, y: newHeight / 2 });
      
      setBasketPos({ x: newWidth / 2, y: newHeight - 70 });
      Matter.Body.setPosition(basketParts[0], { x: newWidth / 2, y: newHeight - 70 + basketHeight / 2 - basketWallThickness / 2 });
      Matter.Body.setPosition(basketParts[1], { x: newWidth / 2 - basketWidth / 2 + basketWallThickness / 2, y: newHeight - 70 });
      Matter.Body.setPosition(basketParts[2], { x: newWidth / 2 + basketWidth / 2 - basketWallThickness / 2, y: newHeight - 70 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-[#1A171A] via-[#151215] to-[#100E10]">
      <BackgroundGlowShape color="#EC5800" size="h-[400px] w-[400px]" position="left-[10%] top-[10%]" />
      <BackgroundGlowShape color="#FFDEBA" size="h-[300px] w-[300px]" position="right-[10%] bottom-[20%]" />

      <div ref={sceneRef} className="absolute inset-0 z-10" />

      <div className="pointer-events-none absolute inset-0 z-15">
         <BasketItem x={basketPos.x} y={basketPos.y} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-20">
        {orangePositions.map((pos) => (
          <CrazyOrangeSVG key={pos.id} {...pos} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ delay: 0.5 }}
        className="absolute left-1/2 top-6 z-30 flex whitespace-nowrap items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl"
      >
        <span className="text-sm font-medium text-text-primary/60">Caught: </span>
        <span className="text-lg font-black text-[#EC5800]">{caughtCount}</span>
        <span className="text-sm text-text-primary/40"> / 7</span>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center pb-[15vh]">
        <div className="relative flex w-[calc(100%-2rem)] max-w-[500px] flex-col items-center">
          
          <AnimatePresence>
            {showConfetti && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: -10, scale: 0.95, x: "-50%" }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-full mb-6 left-1/2 flex whitespace-nowrap flex-col items-center justify-center rounded-[24px] border border-[#EC5800]/30 bg-bg-deep/90 px-8 py-5 text-center shadow-[0_20px_50px_rgba(236,88,0,0.2)] backdrop-blur-xl"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#EC5800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 h-8 w-8">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <h3 className="text-xl font-black text-[#EC5800]">Nice catch!</h3>
                <p className="mt-1 text-xs text-text-primary/70">You've collected all the oranges.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex w-full flex-col items-center rounded-[32px] border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.5)] md:p-10"
          >
            <h1 className="text-[60px] font-black leading-none tracking-tighter text-[#EC5800] md:text-[80px]">404</h1>
            <h2 className="mt-2 font-serif text-xl font-bold text-text-primary md:text-2xl">Oops, spilled the basket!</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-primary/60">
              Drag the oranges into the basket below, or head back home.
            </p>
            <Link
              href="/"
              className="group relative mt-8 flex h-[52px] w-full max-w-[200px] items-center justify-center overflow-hidden rounded-full bg-[#EC5800] text-sm font-black tracking-[0.1em] text-text-primary shadow-[0_10px_25px_rgba(236,88,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(236,88,0,0.5)] active:scale-95"
            >
              Return Home
            </Link>
          </motion.div>
          
        </div>
      </div>

    </div>
  );
}