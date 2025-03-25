import { useState } from "react";
import { EventService } from "../../ServiceLayer/eventManagement/EventService";
// import { Timestamp } from "firebase/firestore";

export default function TestAddEvent() {
  const [formData, setFormData] = useState({
    eventName: "",
    organizer: "",
    description: "",
    versionName: "v1",
    versionDescription: "",
    date: new Date().toISOString().split("T")[0], // Default to today
    place: "",
    price: "0",
    capacity: "100",
  });

  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    eventId?: string;
    versionId?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    try {
      const { eventId, versionId } = await EventService.createEventWithVersion(
        {
          name: formData.eventName,
          organizer: formData.organizer,
          description: formData.description,
        },
        {
          nom_version: formData.versionName,
          description_specifique: formData.versionDescription,
          date: new Date(formData.date),
          place: formData.place,
          price: parseFloat(formData.price),
          planning: "Default plan",
          img: "",
          capacity_max: parseInt(formData.capacity),
          plan_mediatique: "Standard plan",
          nbparticipants: 0, // Add default value
        }
      );

      setResult({
        success: true,
        message: "Event created successfully!",
        eventId,
        versionId,
      });

      // Reset form
      setFormData({
        eventName: "",
        organizer: "",
        description: "",
        versionName: "v1",
        versionDescription: "",
        date: new Date().toISOString().split("T")[0],
        place: "",
        price: "0",
        capacity: "100",
      });
    } catch (error) {
      setResult({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create event",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Test Event Creation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Fields */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Event Information</h3>
          <div>
            <label className="block text-sm font-medium">Event Name*</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Organizer*</label>
            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
        </div>

        {/* Version Fields */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Version Details</h3>
          <div>
            <label className="block text-sm font-medium">Version Name*</label>
            <input
              type="text"
              name="versionName"
              value={formData.versionName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Version Description
            </label>
            <textarea
              name="versionDescription"
              value={formData.versionDescription}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date*</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Place*</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Capacity*</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Create Event
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 p-4 rounded ${
            result.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {result.message}
          {result.success && (
            <div className="mt-2 text-sm">
              <p>Event ID: {result.eventId}</p>
              <p>Version ID: {result.versionId}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
