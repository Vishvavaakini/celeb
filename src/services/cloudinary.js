export async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/dfpuefhfa/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "celebrator");

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Cloudinary upload failed: ${res.status}`);
    }

    const data = await res.json();
    
    if (!data.secure_url) {
      throw new Error("No URL returned from Cloudinary");
    }
    
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}
