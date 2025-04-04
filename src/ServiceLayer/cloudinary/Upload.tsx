import axios from "axios";

const cloudName = "djhamkno8"; // Remplace par ton Cloud Name
const uploadPreset = "react_preset"; // Remplace par ton Upload Preset
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export const CloudinaryService = {  
  async uploadImage(file: File): Promise<string> {
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary n'est pas bien configuré !");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(UPLOAD_URL, formData);
      return response.data.secure_url; // Retourne l'URL de l'image
    } catch (error) {
      console.error("Erreur d'upload Cloudinary :", error);
      throw new Error("Échec de l'upload sur Cloudinary.");
    }
  },

  async downloadFile(fileUrl: string): Promise<File> {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob", // Permet de récupérer le fichier sous forme de Blob
      });

      // Déterminer le nom du fichier depuis l'URL
      const fileName = fileUrl.split("/").pop() || "downloaded_file";

      // Créer un objet File à partir du Blob
      return new File([response.data], fileName, { type: response.data.type });
    } catch (error) {
      console.error("Erreur de téléchargement :", error);
      throw new Error("Impossible de télécharger le fichier.");
    }
  }

};
