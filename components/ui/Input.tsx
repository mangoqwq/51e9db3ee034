import { cn } from '@/lib/styles';

type InputProps = {
  label?: string;
  onChange?: (value: string) => void;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'>;

export function Input({
  label,
  onChange,
  className,
  required = false,
  type = 'text',
  ...rest
}: InputProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label className="text-sm font-medium text-muted-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        required={required}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'h-10 px-3 py-2 text-base text-foreground border border-border rounded-lg bg-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-0',
          'placeholder:text-muted-foreground transition-colors duration-150'
        )}
        {...rest}
      />
    </div>
  );
}
