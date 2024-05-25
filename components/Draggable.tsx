import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "./ui/badge";
import { DraggableProps, cn } from "@/lib/utils";
import { memo } from "react";
import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip"


const Draggable = ({ isLast, element: { content = "draggable", canContain, limits, parents, attributes: HTMLAttributes = [], tooltip } }: DraggableProps) => {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${content}`,
    data: { current: content, canContain, limits, parents, HTMLAttributes },
  });

  const style = { transform: CSS.Translate.toString(transform) }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge className={cn(isLast && "mr-auto", "text-accent-foreground  bg-amber-300 text-sm shadow-close hover:text-white hover:bg-emerald-950 transition-[border-radius,background-color] duration-200 rounded-xl hover:rounded-sm group badge hover:animate-pulse"
          )} style={style} {...listeners} {...attributes} >
            <span ref={setNodeRef} className='block mx-auto tag relative'>
              <span className='opacity-0 invisible absolute left-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 group-hover:-left-3'>
                {"<"}
              </span>
              {content}
              <span className='opacity-0 invisible absolute right-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 group-hover:-right-4'>
                {"/>"}
              </span>
            </span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-[rgba(0,0,0,0.8)] text-white" align="center" side="top" collisionPadding={10}>
          <p>{tooltip || "Add to library"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>


  );
};
export default memo(Draggable);
