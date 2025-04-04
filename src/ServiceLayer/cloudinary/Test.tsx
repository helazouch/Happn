// App.tsx
import React, { useState } from "react";
import { uploadImage } from "./imageUpload";

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const url = await uploadImage(file);
      setImageUrl(url);
      console.log("Image uploadée avec succès:", url);
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
    }
  };

  return (
    <div>
      <h1>Uploader une image sur Cloudinary</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Télécharger
      </button>

      {imageUrl && (
        <div>
          <p>Image téléchargée :</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default App;
