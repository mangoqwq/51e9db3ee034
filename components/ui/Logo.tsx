import Image from 'next/image';
import { cn } from '@/lib/styles';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 40,
};

export function Logo({ size = 'md', className }: LogoProps) {
  const px = sizeMap[size];
  return (
    <Image
      src="/htn.png"
      alt="Hack the North"
      width={px}
      height={px}
      className={cn('rounded-md', className)}
    />
  );
}
