import { v4 as uuid } from "uuid";
import { uploadToCloudinary } from "./cloudinary";
import { supabase } from "./supabaseClient";

export async function createEvent(data, photos) {
  const urls = [];

  for (const f of photos) {
    const url = await uploadToCloudinary(f);
    urls.push(url);
  }

  const { data: inserted } = await supabase
    .from("events")
    .insert([{ ...data, photos: urls }])
    .select();

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
