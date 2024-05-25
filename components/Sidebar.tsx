"use client"
import { X } from "lucide-react";

export default function Sidebar({ className = "", handleClose }: { className?: string, handleClose?: () => void }) {
  return (
    <div className={`p-4 grow bg-[rgba(0,0,0,0.95)] xl:bg-[rgba(0,0,0,0.4)] text-white items-center justify-center flex-col ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className='text-2xl font-bold'>About this playground</h2>
        <X className="xl:hidden" onClick={handleClose} />
      </div>
      <p className='opacity-60 mb-4'>This playground was created with the intention of having a tool for beginners to better learn HTML nesting and the structure of the DOM. You can drag and drop elements to the DOM and see how they nest.</p>
      <p className='opacity-60 mb-4'>In case you try to nest an element inside another element that doesn't allow it, the playground will show you an error message. You will also get an error message if you exceed the nesting limit for that particular element.</p>
      <p className="opacity-60 mb-4">You can start by dragging the yellow badges on the right side of the screen and dropping them into the area that says <span className="italic font-thin"> "index.html"</span>.</p>
      <p className="opacity-60 mb-4">Once you have nested at least one element, a button that says <span className="italic font-thin">"generate html"</span> will appear. Clicking on it will generate the HTML code for the elements you have nested and copy it to your clipboard automatically.</p>
      <p className="opacity-60 mb-4">You can also remove elements by clicking on the <span className="italic font-thin">"x"</span> icons that appears on the top right corner of the element you want to remove.</p>
      <p className="opacity-60 mb-12">Also, you can edit the attributes of the elements by clicking on the <span className="italic font-thin">"edit"</span> icons that appears on the top right corner of the element you want to edit. A popup will appear with the attributes of the element, you can edit them and click on the <span className="italic font-thin">"save"</span> button to save the changes.</p>
      <p className="text-center text-accent opacity-60 mb-10">Enjoy! 🚀</p>
    </div>
  )
}