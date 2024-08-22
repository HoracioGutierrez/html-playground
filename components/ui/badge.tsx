import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Draggable } from "react-beautiful-dnd"

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 border focus:ring-2 focus:ring-ring focus:ring-white font-semibold text-xs focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)


export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  containerRef?: any;
}

function Badge({ className, variant, containerRef, id, ...props }: BadgeProps) {
  return (
    <Draggable draggableId={id} index={0}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          /* style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )} */
        >
          {props.children}
        </div>
      )}
    </Draggable>
  )
}

export { Badge, badgeVariants }
