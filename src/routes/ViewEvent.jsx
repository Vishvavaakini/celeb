import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvent } from "../services/eventService.js";

export default function ViewEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getEvent(id);
      setEvent(data);
    }
    load();
  }, [id]);

  if (!event) return <div className="text-white p-8">Loading...</div>;

  return (
    
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">
        {event.eventType.toUpperCase()} for {event.mainName}
      </h1>

      <p>{event.eventDate}</p>

      <p className="my-5">{event.messageText}</p>

   <div className="flex gap-3 flex-wrap">
  {event.photos?.map((url, idx) => (
    <img
      key={idx}
      src={url}
      alt=""
      className="rounded"
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "25rem",
        objectFit: "cover",
      }}
    />
  ))}
</div>
      {/* Share Link */}
<div className="mt-10 text-center">

  <p className="text-sm mb-2">Share this link 👇</p>
  
  <input
    readOnly
    value={window.location.href}
    className="px-3 py-2 rounded bg-gray-800 text-xs w-[90%] max-w-md"
  />

  <div className="mt-3 flex gap-3 justify-center">
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="px-4 py-2 bg-emerald-600 rounded text-sm"
    >
      Copy Link
    </button>

    <button
      onClick={() => {
        const link = encodeURIComponent(window.location.href);
        window.open(`https://api.whatsapp.com/send?text=${link}`, "_blank");
      }}
      className="px-4 py-2 bg-green-600 rounded text-sm"
    >
      Share on WhatsApp
    </button>
  </div>

</div>

    </div>
  );
}
