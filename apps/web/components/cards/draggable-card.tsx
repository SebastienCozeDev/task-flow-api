"use client";

import { useDraggable } from "@dnd-kit/react";

type DraggableCardProps = {
  id: string;
  children: React.ReactNode;
};

export default function DraggableCard(props: DraggableCardProps) {
  const { ref, isDragging } = useDraggable({
    id: String(props.id),
  });

  return (
    <div
      ref={ref}
      className={isDragging ? "opacity-50 cursor-grabbing" : "cursor-grab"}
    >
      {props.children}
    </div>
  );
}