import { AttributePopupProps, cn } from "@/lib/utils"
import AttributesForm from "./AttributesForm"

function AttributePopup({ attributes, handleAttributeSubmit, open, setOpen }: AttributePopupProps) {
  return (
    <div className={cn("fixed w-full h-[100dvh] top-0 left-0 pointer-events-none opacity-0 transition-all duration-300 grid place-content-center", open && "pointer-events-auto opacity-100 ")}>
      <div className="absolute bg-[rgba(0,0,0,0.4)] blur-lg w-full h-full" onClick={() => setOpen(false)}></div>
      <div className="relative z-10 bg-emerald-600 drop-shadow-2xl shadow-2xl p-4 rounded-sm text-white">
        <h2 className='mb-6 font-bold text-xl'>Atributos</h2>
        {attributes && Object.keys(attributes).length > 0 && (
          <AttributesForm attributes={attributes} handleAttributeSubmit={handleAttributeSubmit} setOpen={setOpen} />
        )}
      </div>
    </div>
  )
}
export default AttributePopup