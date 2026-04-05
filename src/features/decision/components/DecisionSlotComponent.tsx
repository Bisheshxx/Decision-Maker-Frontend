"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "motion/react";
import { Button } from "@/components/ui/button";
import { DecisionItem } from "../types/decision.types";

interface IProps {
  options: Pick<DecisionItem, "id" | "title">[]; //DecisionItems
  visibleItems: number;
  speed: number;
  fallbackHeight?: number;
}

export default function DecisionSlotComponent({
  options,
  visibleItems,
  speed,
  fallbackHeight = 40,
}: IProps) {
  const CENTER_OFFSET = Math.floor(visibleItems / 2);
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [centerOption, setCenterOption] = useState<Pick<
    DecisionItem,
    "id" | "title"
  > | null>(options.length ? options[CENTER_OFFSET % options.length] : null);
  const [itemHeight, setItemHeight] = useState(fallbackHeight);
  const sampleItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sampleItemRef.current) return;
    const updateHeight = () => {
      const measured = sampleItemRef.current?.getBoundingClientRect().height;
      if (measured && measured > 0) {
        const normalized = Math.round(measured);
        setItemHeight((prev) => (prev === normalized ? prev : normalized));
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(sampleItemRef.current);

    return () => observer.disconnect();
  }, []);

  const startSpin = async () => {
    if (isSpinning || !options.length) return;
    setIsSpinning(true);

    const winnerIndex = Math.floor(Math.random() * options.length);
    const iterations = 10;
    const finalY = -(
      (iterations * options.length + winnerIndex - CENTER_OFFSET) *
      itemHeight
    );
    await controls.set({ y: 0 });
    await controls.start({
      y: finalY,
      transition: {
        duration: speed,
        ease: [0.15, 0, 0.2, 1],
      },
    });
    setIsSpinning(false);
  };

  const displayedCenterOption =
    centerOption ??
    (options.length ? options[CENTER_OFFSET % options.length] : null);

  const getWrappedIndex = (index: number, length: number) =>
    ((index % length) + length) % length;

  return (
    <div className="flex flex-col items-center gap-4 p-6 mt-4 w-full ">
      <div
        className="relative overflow-hidden w-full"
        style={{ height: itemHeight * visibleItems }}
      >
        <motion.div
          animate={controls}
          className="flex flex-col items-center"
          onUpdate={(latest) => {
            if (!options.length) return;
            const y =
              typeof latest.y === "number" ? latest.y : Number(latest.y);
            if (!Number.isFinite(y)) return;

            const index = getWrappedIndex(
              Math.round(-y / itemHeight) + CENTER_OFFSET,
              options.length,
            );
            const nextOption = options[index];
            setCenterOption((prev) =>
              prev === nextOption ? prev : nextOption,
            );
          }}
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <React.Fragment key={i}>
              {options.map((option, j) => (
                <div
                  key={`${i}-${j}`}
                  ref={i === 0 && j === 0 ? sampleItemRef : undefined}
                  className="flex items-center justify-center text-zinc-400 font-medium md:text-[16px] text-xs capitalize"
                  style={{ height: itemHeight }}
                >
                  {option.title}
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>

        <div className="absolute inset-0 pointer-events-none flex flex-col">
          <div className="flex-1" />
          <div
            style={{ height: itemHeight }}
            className="w-full flex items-center justify-center border-y border-border bg-primary text-zinc-50  dark:text-zinc-900 font-semibold rounded-xl md:text-[16px] text-xs capitalize"
          >
            {displayedCenterOption?.title ?? "No options"}
          </div>
          <div className="flex-1" />
        </div>
      </div>

      <Button
        onClick={startSpin}
        disabled={isSpinning}
        className="w-16 h-16 md:w-28 md:h-28 font-semi-bold uppercase tracking-tight rounded-full absolute md:right-20 right-10 md:text-lg text-[10px]"
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </Button>
    </div>
  );
}
