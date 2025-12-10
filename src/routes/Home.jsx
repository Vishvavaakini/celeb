import TemplateCard from "../components/TemplateCard.jsx";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const TEMPLATES = [
  { id: "bday1", type: "birthday", name: "Confetti Birthday" },
  { id: "bday2", type: "birthday", name: "Minimal Birthday" },
  { id: "anni1", type: "anniversary", name: "Romantic Glow" },
  { id: "generic1", type: "generic", name: "Classic Celebration" },
];

export default function Home() {
  const [selectedType, setSelectedType] = useState("birthday");
  const [selectedTemplate, setSelectedTemplate] = useState("bday1");

  const navigate = useNavigate();
  const filteredTemplates = TEMPLATES.filter(
    (t) => t.type === selectedType
  );

  const handleContinue = () => {
    navigate(`/create?type=${selectedType}&template=${selectedTemplate}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-center">
        Create a Celebration Page ✨
      </h1>
      <p className="text-center text-sm text-slate-300 mb-8">
        Choose an event type, pick a template, fill details and share the link.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["birthday", "anniversary", "generic"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setSelectedType(type);
              const firstOfType = TEMPLATES.find((t) => t.type === type);
              if (firstOfType) setSelectedTemplate(firstOfType.id);
            }}
            className={`px-4 py-2 rounded-full text-sm border ${
              selectedType === type
                ? "bg-pink-500 border-pink-400"
                : "bg-slate-900 border-slate-700"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {filteredTemplates.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            selected={selectedTemplate === t.id}
            onSelect={() => setSelectedTemplate(t.id)}
          />
        ))}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleContinue}
          className="px-6 py-3 rounded-full bg-emerald-500 font-semibold text-sm"
        >
          Continue ➜
        </button>
      </div>
    </div>
  );
}