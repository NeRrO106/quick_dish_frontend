import React from "react";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-secondary)]">
      <div className="w-12 h-12 border-4 border-t-[var(--color-primary)] border-gray-200 rounded-full animate-spin mb-4"></div>

      <p className="text-center text-xl text-[var(--text-dark)]">{message}</p>
    </div>
  );
};
export default Loading;
