import { Text } from "@/components/ui/Text";
import { formatDate } from "@/lib/styles";

type DateLabelProps = {
    date: string;
};

export function DateLabel({ date }: DateLabelProps) {
    const d = new Date(date);
    const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
    const formatted = formatDate(d.getTime());

    return (
        <div className="sticky top-16 z-10 bg-background pt-3 pb-2 -mx-2 px-2">
            <Text variant="small" as="span" className="font-medium text-foreground uppercase tracking-wide text-xs pb-1 border-b border-border block">
                {weekday}
            </Text>
            <Text variant="small" as="span" className="text-muted-foreground text-xs mt-1 block">
                {formatted}
            </Text>
        </div>
    );
}
