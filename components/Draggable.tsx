import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "./ui/badge";
import { DraggableProps, cn } from "@/lib/utils";


const Draggable = ({ handleDragOver, setCanBeDropped, isLast, setErrorMessage,
  element: { content = "draggable", canContain, limits, parents, attributes: HTMLAttributes = [] },
}: DraggableProps) => {

  const { attributes, listeners, setNodeRef, transform, over, isDragging } = useDraggable({
    id: `draggable-${content}`,
    data: { current: content, canContain, limits, parents, HTMLAttributes },
  });

  const style = { transform: CSS.Translate.toString(transform) }

  const onDragOver = () => {
    if (!parents?.includes(over?.data.current?.tag)) {
      if (over?.data.current?.tag === "dom") {
        setErrorMessage(
          `El ${over?.data.current?.tag.toUpperCase()} no puede contener <${content}>.`
        );
      } else {
        setErrorMessage(
          ` La etiqueta <${over?.data.current?.tag}> no es una etiqueta padre válida y no puede contener <${content}>.`
        );
      }

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
  );
};
export default Draggable;
