import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative w-full">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
