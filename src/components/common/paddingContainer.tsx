interface PaddingContainerProps {
  children: React.ReactNode;
}

export function PaddingContainer({ children }: PaddingContainerProps) {
  return (
    <div className="w-full mx-auto px-[18px] md:px-[45px] max-w-[1420px]">
      {children}
    </div>
  );
}
