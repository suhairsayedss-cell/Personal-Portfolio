"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { prefersReduced } from "./intro";

// Loads the 3D clay canvas on the client only. Under reduced motion it renders
// nothing (the sections keep their own static CSS shapes as a fallback).
const ClayObjects = dynamic(() => import("./ClayObjects"), { ssr: false });

export default function ClayLayer({
  kind,
  className,
}: {
  kind: "statement" | "services";
  className?: string;
}) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(!prefersReduced());
  }, []);

  if (!ok) return null;
  return <ClayObjects kind={kind} className={className} />;
}
