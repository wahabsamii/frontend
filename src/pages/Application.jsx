import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function Application() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const navigateTo = useNavigate();
  // const { id } = useParams();
  const id = "67d6a2afaa3163b780aaf82a"
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setResume(file);
    } else {
      console.log("No file selected");
    }
  };
  

  const handleApplication = async (e) => {
    e.preventDefault();
  
    if (!resume) {
      console.log("No file selected!");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
  
  
    try {
      await axios.post("https://jobnova-backend.vercel.app/api/application/post", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert('Application Submited');
      setName('');
      setEmail('');
      setAddress('');
      setResume('');
      setCoverLetter('');
      setPhone('');
    } catch (error) {
      console.log("Upload Error:", error);
    }
  };
  const theme = useSelector((state) => state.theme.theme);
  

  return (
    <div className={`min-h-screen ${
      theme === 'light' ? 'bg-white' : 'bg-gray-900'
    } flex items-center justify-center p-6`}>
      <div className={` ${
      theme === 'light' ? 'bg-white' : 'bg-black'
    } shadow-lg rounded-lg p-8 max-w-2xl w-full`}>
        <h2 className={`text-3xl font-semibold ${
      theme === 'light' ? 'text-black' : 'text-white'
    } text-center mb-6`}>Apply for this Job</h2>
        
        <form onSubmit={handleApplication} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Your Name" value={name} 
              onChange={(e) => setName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="email" placeholder="Your Email" value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input 
            type="number" placeholder="Your Phone Number" value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />

          <input 
            type="text" placeholder="Your Address" value={address} 
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />

          <textarea 
            placeholder="Cover Letter..." value={coverLetter} 
            onChange={(e) => setCoverLetter(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>

          <div>
            <label className={`block text-lg font-medium ${
      theme === 'light' ? 'text-gray-900' : 'text-white'
    } text-gray-700 mb-2`}>Upload Resume</label>
            <input 
              type="file" accept=".pdf, .jpg, .png" 
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            Send Application
          </button>
        </form>
      </div>
    </div>
  );
}
