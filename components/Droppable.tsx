import { DroppableProps } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { Edit, X } from "lucide-react";
import { toast } from "./ui/use-toast";


function Droppable({ handleRemoveElement, setAttributes, setPathToElement, setOpen,
  element: { id, display, children: items, background, backgroundHover, pathToElement, tag, attributes, currentAttributes }
}: DroppableProps) {

  const droppableId = "droppable-" + id;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId, data: { id, pathToElement, tag } });

  const handleRemove = () => {
    handleRemoveElement(pathToElement);
  };

  const handleClick = () => {
    const stateAttributes = currentAttributes || attributes.reduce((acc: any, attribute: any) => {
      acc[attribute] = "";
      return acc;
    }, {});
    if (Object.keys(stateAttributes).length > 0) {
      setAttributes(stateAttributes);
      setPathToElement(pathToElement);
      setOpen(true);
    } else {
      toast({
        title: "Error",
        description: "This element doesn't have any attributes to set",
        variant: "destructive",
      })
    }
  };

  const getCurrentAttributes = () => {
    let attributes = "";
    for (const key in currentAttributes) {
      if (currentAttributes[key] !== "") {
        attributes += `${key}="${currentAttributes[key]}" `;
      }
    }
    return attributes || undefined;
  };

  return (
    <div ref={setNodeRef} id={droppableId} className='flex flex-col gap-2 drop-shadow-xl shadow-md p-4 rounded-md' style={{
      background: isOver ? backgroundHover : background,
      border: isOver ? `2px dashed rgba(255,255,255,0.6)` : "none",
    }}>
      <div className='flex justify-between items-center'>
        <p className='font-bold text-white'>
          {display === "DOM" && "index.html"}
          {display !== "DOM" && `<${display}`}
          {getCurrentAttributes() && (
            <>
              &nbsp; &nbsp;
              <span className='font-light text-[rgba(255,255,255,0.5)]'>{getCurrentAttributes()}</span>
            </>
          )}
          {display !== "DOM" && `>`}
        </p>
        {display !== "DOM" && (
          <div className='flex items-center gap-2 text-white'>
            <button popovertarget='form' popoveraction='show' onClick={handleClick}>
              <Edit width={20} height={20} />
            </button>
            <button onClick={handleRemove}>
              <X width={20} height={20} />
            </button>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        {items.length > 0 &&
          items.map((item: any, i: number) => {
            return (
              <Droppable
                key={i}
                handleRemoveElement={handleRemoveElement}
                setAttributes={setAttributes}
                setPathToElement={setPathToElement}
                element={item}
                setOpen={setOpen}
              />
            );
          })}
      </div>
      {display !== "DOM" && (
        <p className='font-bold text-white'>{`<\\${display}>`}</p>
      )}
    </div>
  );
}
export default Droppable;
