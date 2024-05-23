import { AttributePopupProps, cn } from "@/lib/utils"
import AttributesForm from "./AttributesForm"

function AttributePopup({ attributes, handleAttributeSubmit, open, setOpen }: AttributePopupProps) {
  return (
    <div className={cn("fixed w-full h-[100dvh] top-0 left-0 pointer-events-none opacity-0 transition-all duration-300 grid place-content-center", open && "pointer-events-auto opacity-100 ")}>
      <div className="w-full h-full bg-[rgba(0,0,0,0.4)] absolute blur-lg" onClick={() => setOpen(false)}></div>
      <div className="relative z-10 bg-emerald-600 text-white p-4 rounded-sm shadow-2xl drop-shadow-2xl">
        <h2 className='font-bold text-xl mb-6'>Atributos</h2>
        {attributes && Object.keys(attributes).length > 0 && (
          <AttributesForm attributes={attributes} handleAttributeSubmit={handleAttributeSubmit} setOpen={setOpen} />
        )}
      </div>
    </div>
  )
}
export default AttributePopup