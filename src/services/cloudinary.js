export async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/dfpuefhfa/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "celebrator");

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
}
