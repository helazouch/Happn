import { Router, Request, Response } from 'express';
import { EventService } from '../../ServiceLayer/eventManagement/EventService';

const router = Router();

// Définition des types TypeScript
interface IEventData {
  name: string;
  organizer: string;
  description: string;
}

interface IVersionData {
  img: string;
  planning: string;
  place: string;
  date: Date;
  capacity: number;
  price?: number;
  categories?: string[];
  specificDescription: string;
}

// Route POST /events/add
router.post('/add', async (req: Request<{}, {}, {
  eventData: IEventData;
  versionData: IVersionData
}>, res: Response) => {
  try {
    // 1. Récupération des données du body
    const { eventData, versionData } = req.body;

    // 2. Validation
    if (!eventData?.name || !versionData?.img) {
      return res.status(400).json({
        success: false,
        error: "Les champs 'name' et 'img' sont obligatoires"
      });
    }

    // 3. Appel au service
    const { eventId, versionId } = await EventService.createEventWithVersion(
      eventData,
      versionData
    );

    // 4. Réponse
    return res.status(201).json({
      success: true,
      eventId,
      versionId
    });

  } catch (error) {
    console.error("[events.ts] Erreur:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur serveur"
    });
  }
});

export default router;