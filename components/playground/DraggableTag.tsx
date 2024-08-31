"use client"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const DraggableTag = ({ containerRef, item, handleDrop, delay }) => {

  const dragabbleRef = useRef(null)
  const dragContainerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    handleDrop && handleDrop(event, info, item)
  }

  const handleMouseDown = () => {
    console.log("mouse down")
  }

  return (
    <motion.div
      ref={dragContainerRef}
      className="relative"
      onMouseDown={handleMouseDown}
      title={item.tooltip || ""}
      transition={{ delay }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={cn(
        "absolute flex justify-center items-center border-2 bg-blue-200/50 px-4 py-2 border-black/50 border-dashed rounded-3xl h-10  opacity-0 transition-opacity pointer-events-none w-full",
        isDragging && "opacity-100 animate-pulse"
      )}>
        {item.tag}
      </div>
      <motion.div
        drag
        ref={dragabbleRef}
        dragConstraints={containerRef}
        dragSnapToOrigin
        dragElastic={0.3}
        whileHover={{ filter: "contrast(0.8)" }}
        whileTap={{ scale: 0.9 }}
        whileDrag={{ filter: "opacity(0.5)", pointerEvents: "none" }}
        dragTransition={{ bounceStiffness: 700, bounceDamping: 35 }}
        className={cn("py-2 px-6 bg-blue-200 rounded-3xl cursor-grab active:cursor-grabbing shadow-xl shadow-black text-center w-full taglike hover:animate-pulse group text-destructive-foreground hover:text-accent ")}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <span className="group-hover:-left-1 left-0 absolute opacity-0 group-hover:opacity-100 transition-all">{"<"}</span>
        {item.tag}
        <span className="group-hover:-right-1 right-0 absolute opacity-0 group-hover:opacity-100 transition-all">{"/>"}</span>
      </motion.div>
    </motion.div>
  )
}

export default DraggableTag