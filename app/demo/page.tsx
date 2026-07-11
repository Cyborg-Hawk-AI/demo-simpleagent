"use client";

import { ToastProvider } from "@/components/ui/Toast";
import DemoApp from "@/components/demo/DemoApp";

export default function DemoPage() {
  return (
    <ToastProvider>
      <DemoApp />
    </ToastProvider>
  );
}
