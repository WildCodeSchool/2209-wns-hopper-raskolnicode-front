export const uploadCloudinary = async (picture: any) => {
  const cloudName = "felicie";
  const uploadPreset = "starblog";

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const formData = new FormData();

  formData.append("upload_preset", uploadPreset);
  formData.append("file", picture);

  try {
    const result = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return await result.json();
  } catch (e) {
    console.error(e);
  } finally {
  }
};
