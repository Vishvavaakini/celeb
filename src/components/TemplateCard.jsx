export default function TemplateCard({template,selected,onSelect}){
    return(
        <>
        <button 
        type="button"
        onClick={onSelect}
        className={`rounded-2xl p-4 text-left border transition
            ${
                selected ? "border-pink-500 bg-pink-500/40":
                "border-slate-700 bg-slate-900"
            }`}>

                <div className="h-24 rounded-xl bg-gradient-to-br from-purple-500/40 to-pink-500/40 mb-3"/>
                <h3 className="font-semibold text-sm">{template.name}</h3>
                <p className="text-[11px] text-slate-300 mt-1">
                    Type:{template.type}
                </p>
            </button>
        </>
    );
}