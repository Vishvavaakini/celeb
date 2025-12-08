import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createEvent } from "../services/eventService.js";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {

  // Read query parameters from URL
  // URL example:  /create?type=birthday&template=bday1
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const eventType = query.get("type");         // birthday / anniversary
  const templateId = query.get("template");    // bday1 / anni1

const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  // ---------------------------
  //  STATE VARIABLES
  // ---------------------------

  const [mainName, setMainName] = useState("");
  const [fromName, setFromName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [messageType, setMessageType] = useState("manual");   // manual / ai
  const [messageText, setMessageText] = useState("");

  const [photos, setPhotos] = useState([]);   // File objects

  // timeline = array of steps [{title, date, description}]
  const [timeline, setTimeline] = useState([]);


  // ---------------------------
  //  HANDLE FORM SUBMIT
  // ---------------------------
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const payload = {
    mainName,
    fromName,
    eventDate,
    eventType,
    templateId,
    messageText,
    timeline,
  };

  try {
    const id = await createEvent(payload, photos);
    navigate(`/e/${id}`); // go to event page
  } catch (err) {
    console.log(err);
    alert("Error creating event");
  }

  setLoading(false);
};


  // ---------------------------
  //  FOR ADDING TIMELINE ITEM
  // ---------------------------
  const addTimelineItem = () => {
    const t = [...timeline, { title: "", date: "", description: "" }];
    setTimeline(t);
  };

  const updateTimeline = (index, key, value) => {
    const t = [...timeline];
    t[index][key] = value;
    setTimeline(t);
  };

  const removeTimeline = (index) => {
    const t = [...timeline];
    t.splice(index, 1);
    setTimeline(t);
  };


  // ----------------------------------
  //  UI layout
  // ----------------------------------
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white">
      
      <h1 className="text-2xl font-bold mb-6">
        Create {eventType} Page 
      </h1>


      <form onSubmit={handleSubmit} className="space-y-6">


        {/* NAME FIELDS */}
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            className="bg-gray-900 px-4 py-2 rounded"
            placeholder="Name (ex: Ananya)"
            value={mainName}
            onChange={(e) => setMainName(e.target.value)}
            required
          />

          <input
            className="bg-gray-900 px-4 py-2 rounded"
            placeholder="From (Optional)"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
          />
        </div>


        {/* DATE */}
        <div>
          <label className="block mb-1 text-sm">Event Date</label>
          <input
            type="date"
            className="bg-gray-900 px-4 py-2 rounded w-full"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>


        {/* MESSAGE SECTION */}
        <div>
          <label className="block mb-1 text-sm">Message</label>

          <div className="flex gap-4 mb-3">
            <button
              type="button"
              onClick={() => setMessageType("manual")}
              className={`px-3 py-1 rounded ${
                messageType === "manual" ? "bg-pink-500" : "bg-gray-900"
              }`}
            >
              Manual
            </button>

            <button
              type="button"
              onClick={() => {
                setMessageType("ai");
                // Simple temporary AI message
                setMessageText(`Happy ${eventType} ${mainName} ❤️`);
              }}
              className={`px-3 py-1 rounded ${
                messageType === "ai" ? "bg-pink-500" : "bg-gray-900"
              }`}
            >
              Generate (AI)
            </button>
          </div>

          <textarea
            className="bg-gray-900 px-4 py-2 rounded w-full h-32"
            placeholder="Write your message here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </div>



        {/* PHOTOS  */}
        <div>
          <label className="block mb-1 text-sm">Upload Photos</label>
          <input
  type="file"
  multiple
  onChange={(e) => {
    const files = Array.from(e.target.files);
    setPhotos(prev => [...prev, ...files]);
  }}
/>

        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
  {photos.map((file, index) => (
    <img
      key={index}
      src={URL.createObjectURL(file)}
      alt=""
      className="w-full h-full object-contain
 rounded-lg"
      style={{
        width: "full",
        height: "10rem",
        objectFit: "cover",
      }}
    />
  ))}
</div>



        {/* TIMELINE */}
        <div>
          <label className="block text-sm">Timeline (optional)</label>

          <button
            type="button"
            onClick={addTimelineItem}
            className="mt-2 px-3 py-1 bg-purple-500 rounded text-sm"
          >
            + Add Event
          </button>

          <div className="space-y-4 mt-4">
            {timeline.map((t, index) => (
              <div key={index} className="bg-gray-900 p-3 rounded">
                
                <input
                  className="bg-black px-2 py-1 rounded w-full mb-2"
                  placeholder="Title"
                  value={t.title}
                  onChange={(e) =>
                    updateTimeline(index, "title", e.target.value)
                  }
                />

                <input
                  type="date"
                  className="bg-black px-2 py-1 rounded w-full mb-2"
                  value={t.date}
                  onChange={(e) =>
                    updateTimeline(index, "date", e.target.value)
                  }
                />

                <textarea
                  className="bg-black px-2 py-1 rounded w-full"
                  placeholder="Short Description"
                  value={t.description}
                  onChange={(e) =>
                    updateTimeline(index, "description", e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => removeTimeline(index)}
                  className="mt-2 text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>


        {/* SUBMIT */}
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 rounded font-bold"
        >
          Submit
        </button>

      </form>
    </div>
  );
}

