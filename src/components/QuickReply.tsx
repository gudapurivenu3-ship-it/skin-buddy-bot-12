import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickReplyProps {
  options: string[];
  onSelect: (option: string) => void;
  className?: string;
}

export const QuickReply = ({ options, onSelect, className }: QuickReplyProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2 mb-4 animate-slide-up", className)}>
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(option)}
          className="rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};
