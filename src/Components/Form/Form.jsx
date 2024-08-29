import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import SignatureCanvas from "react-signature-canvas";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import "./style.css";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const MyForm = () => {
  // Initial form data setup
  const initialFormData = {
    email: "",
    phone: "",
    fullName: "",
    flightNumber: "",
    bookingReference: "",
    flightDate: new Date(),
    caseNumber: "",
    photoUrl: "", // Ensuring photoUrl starts as empty
    signature: "",
  };

  // State and ref declarations
  const [formData, setFormData] = useState(initialFormData);
  const fileInputRef = useRef(null);
  const sigCanvasRef = useRef(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      flightDate: date,
    });
  };

  // Handle signature change
  const handleSignature = () => {
    const signature = sigCanvasRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setFormData({
      ...formData,
      signature,
    });
  };

  // Clear the signature
  const clearSignature = () => {
    sigCanvasRef.current.clear();
    setFormData((prevData) => ({
      ...prevData,
      signature: "",
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return; // Add check to ensure a file is selected

    const storageRef = ref(storage, `tickets/${v4()}/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData((prevData) => ({
        ...prevData,
        photoUrl: downloadURL,
      }));
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://airclaims-backend.onrender.com/submit-form",
        //"http://localhost:5000/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Form submitted successfully");

      // Reset form data
      setFormData(initialFormData);

      // Clear signature canvas
      clearSignature();

      // Clear file input manually since it's an uncontrolled component
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed");
    }
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <form onSubmit={handleSubmit} className="max-w-lg mx-4 space-y-4">
        <div className="flex flex-col">
          <label className="mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Flight Number:</label>
          <input
            type="text"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Booking Reference:</label>
          <input
            type="text"
            name="bookingReference"
            value={formData.bookingReference}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Flight Date:</label>
          <DatePicker
            selected={formData.flightDate}
            onChange={handleDateChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Case Number:</label>
          <input
            type="text"
            name="caseNumber"
            value={formData.caseNumber}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Upload Photo:</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef} // Use ref for file input
            onChange={handlePhotoUpload}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Signature:</label>
          <SignatureCanvas
            ref={sigCanvasRef}
            penColor="black"
            canvasProps={{
              width: 500,
              height: 200,
              className: "border rounded mb-2",
            }}
            onEnd={handleSignature}
          />
          <button
            type="button"
            onClick={clearSignature}
            className="self-start flex items-center space-x-2 text-gray-600 hover:text-gray-900 mt-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2V6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.93 4.93L7.76 7.76"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.24 16.24L19.07 19.07"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 12H22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.93 19.07L7.76 16.24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.24 7.76L19.07 4.93"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Clear</span>
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-10 rounded-xl hover:bg-blue-500 font-bold"
        >
          Trimite
        </button>
      </form>
    </div>
  );
};

export default MyForm;
