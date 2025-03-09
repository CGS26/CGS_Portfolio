import React, { useState } from 'react';
import SectionHeader from './common/SectionHeader';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [notification, setNotification] = useState({
    type: '',  // 'success' or 'error'
    message: ''
  });
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 


    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs.send(
      import.meta.env.VITE_SERVICE_ID,  import.meta.env.VITE_TEMPLATE_ID,  
      templateParams,
     {

        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      }     
    )
    .then((result) => {
      console.log('Message sent:', result.text);
      setNotification({
        type: 'success',
        message: 'Thank you for your message. I will get back to you soon!'
      });
      setFormData({ name: '', email: '', message: '' });
    }, (error) => {
      console.error('Error sending message:', error.text);
      setNotification({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    }).finally(() => {
      setLoading(false); 
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      type: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-blue-800 text-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="Get In Touch" light={true} />
      

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <ContactInfo 
                icon={<PhoneIcon />} 
                label="Phone" 
                value="+91-7337225784" 
              />
              <ContactInfo 
                icon={<EmailIcon />} 
                label="Email" 
                value="gauravsushant267@gmail.com" 
              />
              <ContactInfo 
                icon={<LinkedinIcon />} 
                label="LinkedIn" 
                value="linkedin.com/in/gaurav-sushant-cherukuri" 
              />
              <ContactInfo 
                icon={<LocationIcon />} 
                label="Location" 
                value="Hyderabad, India" 
              />
            </div>
          </div>
          <div>
            
            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
          
           
            {notification.message && (
          <div
            className={`${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white p-3 rounded mb-6 flex justify-between items-center`}
          >
            <span>{notification.message}</span>
            <button
              onClick={handleCloseNotification}
              className="text-white text-xl hover:text-gray-300"
            >
              &times; {/* Cross icon (×) */}
            </button>
          </div>
        )}
          
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg text-gray-800" 
                  placeholder="Your Name" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg text-gray-800" 
                  placeholder="Your Email" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg text-gray-800" 
                  placeholder="Your Message" 
                  required
                ></textarea>
              </div>

              {loading ? (
                  <span>Sending...</span> 
                ) : (<>
<button 
                type="submit" 
                className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition duration-300"
              > Send Message
              </button>   </>            )}
              
                
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, label, value }) => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <p className="text-gray-200 text-sm">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);

export default Contact;