// src/ServicesLayer/notification/NotificationService.ts
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class NotificationService {
  static showSuccess(message: string) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  static showError(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  static showConfirmation(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.confirm(message)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}