import { v4 as uuid } from "uuid";
import { uploadToCloudinary } from "./cloudinary";
import { supabase } from "./supabaseClient";

 export async function createEvent(data, photos) {

  // MUST define urls, before you push into it
  const urls = [];

  for (const f of photos) {
    const url = await uploadToCloudinary(f);
    urls.push(url);
  }

  const payload = {
    ...data,
    photos: urls,   // here urls exists ✔
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
}


export async function getEvent(id) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}
