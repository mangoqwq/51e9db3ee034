'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/styles';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: DialogSize;
  title?: string;
  className?: string;
};

const sizeStyles: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function Dialog({ isOpen, onClose, children, size = 'md', title, className }: DialogProps) {
  return (
    <RadixDialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/40 z-40 data-[state=open]:animate-[fade-in_150ms_ease-out] data-[state=closed]:animate-[fade-out_100ms_ease-in]" />
        <RadixDialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'bg-surface rounded-xl border border-border shadow-lg w-[calc(100%_-_2rem)]',
            'max-h-[calc(100vh_-_4rem)] flex flex-col',
            'data-[state=open]:animate-[dialog-in_150ms_ease-out] data-[state=closed]:animate-[dialog-out_100ms_ease-in]',
            sizeStyles[size],
            className
          )}
          aria-describedby={undefined}
        >
          {title && <RadixDialog.Title className="sr-only">{title}</RadixDialog.Title>}
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

type DialogHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={cn('p-6 pb-4', className)}>{children}</div>;
}

type DialogBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogBody({ children, className }: DialogBodyProps) {
  return <div className={cn('px-6 pb-6 overflow-y-auto flex-1 min-h-0', className)}>{children}</div>;
}

type DialogFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn('px-6 pb-6 pt-4 flex gap-3', className)}>
      {children}
    </div>
  );
}
