export const useUpload = () => {
  const uploadFile = async (file, folder) => {
    const reader = new FileReader();

    const base64 = await new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ file: base64, folder }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return data; // { url, public_id }
  };

  return { uploadFile };
};
