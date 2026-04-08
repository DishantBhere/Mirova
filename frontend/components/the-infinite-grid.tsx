"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

export default function InfiniteGrid() {
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5;
  const speedY = 0.5;

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + speedX) % 40);
    gridOffsetY.set((gridOffsetY.get() + speedY) % 40);
  });

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
    </div>
  );
}

const GridPattern = ({
  offsetX,
  offsetY,
}: {
  offsetX: any;
  offsetY: any;
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0"
    >
      <defs>
        <motion.pattern
          id="grid-pattern-unique" // IMPORTANT: unique id
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#24003D"
            strokeOpacity="0.5S"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#grid-pattern-unique)"
      />
    </svg>
  );
};