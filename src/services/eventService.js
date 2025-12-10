import { v4 as uuid } from "uuid";
import { uploadToCloudinary } from "./cloudinary";
import { supabase } from "./supabaseClient";

export async function createEvent(data, photos) {
  try {
    // Generate unique ID
    const eventId = uuid();
    
    // Upload photos to Cloudinary
    const urls = [];
    for (const f of photos) {
      const url = await uploadToCloudinary(f);
      urls.push(url);
    }

    // ✅ CRITICAL: Map camelCase to snake_case for Supabase
    const payload = {
      id: eventId,
      main_name: data.mainName,
      from_name: data.fromName || null,
      event_date: data.eventDate,
      event_type: data.eventType,
      template_id: data.templateId,
      message_text: data.messageText || '',
      photos: urls,
      timeline: data.timeline || [],
    };

    const { data: inserted, error } = await supabase
      .from("events")
      .insert([payload])
      .select("*");

    if (error) {
      console.error("SUPABASE ERROR:", error.message);
      throw error;
    }

    return inserted[0].id;
  } catch (error) {
    console.error("Create event error:", error);
    throw error;
  }
}

export async function getEvent(id) {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Get event error:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Event not found");
    }

    // ✅ Map snake_case back to camelCase for frontend
    return {
      id: data.id,
      mainName: data.main_name,
      fromName: data.from_name,
      eventDate: data.event_date,
      eventType: data.event_type,
      templateId: data.template_id,
      messageText: data.message_text,
      photos: data.photos || [],
      timeline: data.timeline || [],
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error("Get event error:", error);
    throw error;
  }
}
