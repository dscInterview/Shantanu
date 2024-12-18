import { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";

const ContactPage = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [responseBox, setResponseBox] = useState("");

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/detect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResponseBox(data);
      console.log(data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-[#ffffff]">
      <div className="relative flex items-center justify-center w-72 h-72 bg-[#191919] border-2 border-dashed border-gray-500 rounded-lg cursor-pointer shadow-lg">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0"
          onChange={handleImageChange}
        />
        <AiOutlineFileImage className="text-white text-4xl" />
        {image && (
          <img
            src={image}
            alt="Uploaded"
            className="absolute inset-0 object-cover w-full h-full rounded-lg"
          />
        )}
      </div>
      <p className="mt-4 text-white text-lg">Click to upload an image</p>
      <button
        onClick={handleSubmit}
        className="px-6 py-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Submit
      </button>
      {responseBox && (
        <div className="mt-4 p-4 bg-[#191919] text-white rounded-lg shadow-md w-72">
          {responseBox} detected!
        </div>
      )}
    </div>
  );
};

export default ContactPage;
