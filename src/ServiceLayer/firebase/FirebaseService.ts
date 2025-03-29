import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export class FirebaseService {
  /**
   * Upload un fichier sur Firebase Storage et retourne son URL.
   * @param file - Le fichier à uploader.
   * @param folder - Le dossier où stocker le fichier (ex: "images" ou "plannings").
   * @returns URL du fichier uploadé.
   */
  static async uploadFile(file: File, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("Aucun fichier sélectionné.");
        return;
      }

      const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optionnel : Suivi de la progression
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload en cours: ${progress}%`);
        },
        (error) => {
          reject(`Erreur lors de l'upload : ${error.message}`);
        },
        async () => {
          // ✅ Récupérer l'URL du fichier après l'upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }
}
