import { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass glass-hover rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
