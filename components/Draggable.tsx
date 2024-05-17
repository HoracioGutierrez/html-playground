import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type DraggableProps = {
  content: string;
  canContain: string[];
  limits?: any;
  handleDragOver?: (
    event: any,
    id: string,
    canContain: string[],
    limits: any
  ) => void;
  setCanBeDropped?: any;
  parents?: any[];
  isLast?: boolean;
};

const Draggable = ({
  content = "draggable",
  canContain,
  limits,
  handleDragOver,
  parents,
  setCanBeDropped,
  isLast
}: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, over, isDragging } =
    useDraggable({
      id: `draggable-${content}`,
      data: { current: content, canContain, limits, parents },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const onDragOver = () => {
    if (!parents?.includes(over?.data.current?.tag)) {
      setCanBeDropped(false);
      return;
    }

    if (!handleDragOver) {
      setCanBeDropped(false);
      return;
    }

    handleDragOver(over, content, canContain, limits);
  };

  if (isDragging) onDragOver();

  return (
    <Badge  className={cn(isLast && "mr-auto","text-accent bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-sm font-normal shadow-close hover:bg-emerald-950 hover:bg-none transition-[background] duration-300 min-w-12")} style={style} {...listeners} {...attributes}>
      <span ref={setNodeRef} className="block mx-auto">{content}</span>
    </Badge>
  );
};
export default Draggable;
