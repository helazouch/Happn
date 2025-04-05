// imageUpload.ts (Service pour l'upload d'image)

export const uploadFile = async (file: File): Promise<string> => {
    const cloudName = "djhamkno8"; // Ton Cloudinary Cloud Name
    const uploadPreset = "react_preset"; // Remplace par le nom du preset créé
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'upload");
      }
  
      const data = await response.json();
      return data.secure_url; // URL de l'image
    } catch (error) {
      console.error("Erreur:", error);
      throw error;
    }
  };
  