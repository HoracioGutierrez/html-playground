import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "./ui/badge";
import { DraggableProps, cn } from "@/lib/utils";
import { memo, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"


const Draggable = ({ isLast, element: { content = "draggable", canContain, limits, parents, attributes: HTMLAttributes = [], tooltip } }: DraggableProps) => {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${content}`,
    data: { current: content, canContain, limits, parents, HTMLAttributes },
  });

  const style = { transform: CSS.Translate.toString(transform) }

  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <Badge className={cn(isLast && "mr-auto", "text-accent-foreground  bg-amber-300 text-sm shadow-close hover:text-white hover:bg-emerald-950 transition-[border-radius,background-color] duration-200 rounded-xl hover:rounded-sm group badge hover:animate-pulse"
    )} style={style} {...listeners} {...attributes} title={tooltip || "Add to library"}>
      <span ref={setNodeRef} className='block relative mx-auto tag'>
        <span className='group-hover:visible group-hover:-left-3 left-0 absolute opacity-0 group-hover:opacity-100 transition-all duration-300 invisible'>
          {"<"}
        </span>
        {content}
        <span className='group-hover:visible group-hover:-right-4 right-0 absolute opacity-0 group-hover:opacity-100 transition-all duration-300 invisible'>
          {"/>"}
        </span>
      </span>
    </Badge>
  )
  };
export default memo(Draggable);
