import React from 'react';

interface InvitationFormProps {
  formData: Record<string, string>;
  onFormChange: (name: string, value: string) => void;
}

const InvitationForm: React.FC<InvitationFormProps> = ({ formData, onFormChange }) => {
  const handleImageUpload = () => {
    alert('Image upload functionality to be implemented.');
  };

  const handleLinkClick = () => {
    if (formData.link) {
      window.open(formData.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <form className="space-y-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Invitation Details</h2>
      <div>
        <label htmlFor="brideName" className="block text-sm font-medium text-gray-700">Bride's Name</label>
        <input
          type="text"
          id="brideName"
          name="brideName"
          value={formData.brideName || ''}
          onChange={(e) => onFormChange(e.target.name, e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="groomName" className="block text-sm font-medium text-gray-700">Groom's Name</label>
        <input
          type="text"
          id="groomName"
          name="groomName"
          value={formData.groomName || ''}
          onChange={(e) => onFormChange(e.target.name, e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="shlik" className="block text-sm font-medium text-gray-700">Shlik</label>
        <input
          type="text"
          id="shlik"
          name="shlik"
          value={formData.shlik || ''}
          onChange={(e) => onFormChange(e.target.name, e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image Upload Link</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl || ''}
            onChange={(e) => onFormChange(e.target.name, e.target.value)}
            placeholder="Enter image URL or upload"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleImageUpload}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Event Details</h3>
        <div>
          <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Event Title</label>
          <input
            type="text"
            id="eventTitle"
            name="eventTitle"
            value={formData.eventTitle || ''}
            onChange={(e) => onFormChange(e.target.name, e.target.value)}
            placeholder="e.g., Wedding Ceremony"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="groomDetails" className="block text-sm font-medium text-gray-700">Groom Details</label>
          <input
            type="text"
            id="groomDetails"
            name="groomDetails"
            value={formData.groomDetails || ''}
            onChange={(e) => onFormChange(e.target.name, e.target.value)}
            placeholder="Groom's full name and other details"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Event Specifics</h3>
        <div>
          <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
          <input
            type="text"
            id="day"
            name="day"
            value={formData.day || ''}
            onChange={(e) => onFormChange(e.target.name, e.target.value)}
            placeholder="e.g., Saturday"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date || ''}
            onChange={(e) => onFormChange(e.target.name, e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={(e) => onFormChange(e.target.name, e.target.value)}
            placeholder="Venue address"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700">Hours</label>
          <input
            type="text"
            id="hours"
            name="hours"
            value={formData.hours || ''}
            onChange={(e) => onFormChange(e.target.name, e.target.value)}
            placeholder="e.g., 6:00 PM onwards"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
        <div className="flex items-center space-x-2">
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link || ''}
            onChange={(e) => onFormChange(e.target.name, e.target.value)}
            placeholder="Enter a URL"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formData.link && (
            <button
              type="button"
              onClick={handleLinkClick}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Open Link
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">Clicking 'Open Link' will navigate to the URL.</p>
      </div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
  <div className="flex items-center space-x-2">
    <input
      type="text"
      id="whatsapp"
      name="whatsapp"
      value={formData.whatsapp || ''}
      onChange={(e) => onFormChange(e.target.name, e.target.value)}
      placeholder="e.g. 919876543210"
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
    />
      </div>
    </form>
  );
};

export default InvitationForm;
