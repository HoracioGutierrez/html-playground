"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn, DraggableTagProps } from "@/lib/utils"
import { useDraggableStore } from "@/stores/DraggableStore"

const DraggableTag = ({ containerRef, item, handleDrop, delay, dragControls }: DraggableTagProps) => {

  const dragabbleRef = useRef(null)
  const dragContainerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggable, setIsDraggable] = useState(true)
  const { setElementDescription, setDescription } = useDraggableStore((state) => state)
  let timeout: any;

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeout)
    }
  }, [])


  const handleResize = () => {
    setIsDraggable(false)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      setIsDraggable(true)
    }, 500)
  }

  const handleDragStart = (e) => {
    dragControls.start(e)
    setIsDragging(true)
  }

  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    handleDrop && handleDrop(event, info, item)
  }

  const handleTap = () => {
    setElementDescription(item.tag)
    setDescription(item.description.length > 0 ? item.description : ["This element has no description"])
  }

  return (
    <motion.div
      ref={dragContainerRef}
      className="relative group"
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
        drag={isDraggable}
        ref={dragabbleRef}
        dragConstraints={containerRef}
        dragSnapToOrigin
        dragElastic={0.3}
        whileHover={{ filter: "contrast(0.8)" }}
        whileTap={{ scale: 0.9 }}
        whileDrag={{ filter: "opacity(0.5)", pointerEvents: "none" }}
        dragTransition={{ bounceStiffness: 700, bounceDamping: 35 }}
        className={cn("py-2 px-6  rounded-3xl cursor-grab active:cursor-grabbing shadow-md shadow-black/10 dark:shadow-xl dark:shadow-black text-center w-full taglike hover:animate-pulse group text-destructive-foreground hover:text-accent text-fluid-md bg-gradient-to-br from-blue-100 to-blue-400")}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTap={handleTap}
      >
        <span className="group-hover:left-2 left-4 absolute opacity-0 group-hover:opacity-100 transition-all">{"<"}</span>
        {item.tag}
        <span className="group-hover:right-1 right-4 absolute opacity-0 group-hover:opacity-100 transition-all">{"/>"}</span>
      </motion.div>
    </motion.div>
  )
}

export default DraggableTag