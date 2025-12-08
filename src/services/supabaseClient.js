import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rxgyyqrkwnofukxvychu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4Z3l5cXJrd25vZnVreHZ5Y2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTI4OTQsImV4cCI6MjA4MDc4ODg5NH0.O4Zd8CzyCP4N2_Gnwf_3StF1FkSR0ChPcFv1qnCVeOc"
);
