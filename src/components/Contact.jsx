import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Send, User, MessageSquare } from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import OSWindow from './common/OSWindow';
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
    <section id="contact" className="py-20 bg-slate-900/70 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Mail Client - Contact.exe" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info Window */}
          <OSWindow 
            title="Address Book - Contacts" 
            windowIcon={<User size={16} className="text-blue-400" />}
            className="h-fit"
          >
            <div className="p-6">
              <div className="space-y-4">
                <ContactInfo 
                  icon={<Phone size={20} className="text-green-400" />} 
                  label="Phone" 
                  value="+91-7337225784" 
                />
                <ContactInfo 
                  icon={<Mail size={20} className="text-blue-400" />} 
                  label="Email" 
                  value="gauravsushant267@gmail.com" 
                />
                <ContactInfo 
                  icon={<Linkedin size={20} className="text-blue-500" />} 
                  label="LinkedIn" 
                  value="linkedin.com/in/gaurav-sushant-cherukuri" 
                />
                <ContactInfo 
                  icon={<MapPin size={20} className="text-red-400" />} 
                  label="Location" 
                  value="Hyderabad, India" 
                />
              </div>
            </div>
          </OSWindow>

          {/* Email Compose Window */}
          <OSWindow 
            title="Compose Message - Mail" 
            windowIcon={<MessageSquare size={16} className="text-purple-400" />}
            className="h-fit"
          >
            <div className="p-6">
              {/* Notification */}
              {notification.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${
                    notification.type === 'success' 
                      ? 'bg-green-600/20 border-green-500 text-green-400' 
                      : 'bg-red-600/20 border-red-500 text-red-400'
                  } border rounded p-3 mb-4 flex justify-between items-center font-mono text-sm`}
                >
                  <span>{notification.message}</span>
                  <button
                    onClick={handleCloseNotification}
                    className="hover:opacity-70 text-lg"
                  >
                    ×
                  </button>
                </motion.div>
              )}

              {/* Email Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-slate-300 mb-1">From:</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 font-mono text-sm focus:border-blue-500 focus:outline-none" 
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-slate-300 mb-1">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 font-mono text-sm focus:border-blue-500 focus:outline-none" 
                    placeholder="your.email@domain.com" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-slate-300 mb-1">Message:</label>
                  <textarea 
                    id="message" 
                    rows="6" 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 font-mono text-sm focus:border-blue-500 focus:outline-none resize-none" 
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>

                <motion.button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white px-4 py-2 rounded font-mono text-sm transition duration-300 w-full"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </OSWindow>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, label, value }) => {
  return (
    <motion.div 
      className="flex items-center p-3 bg-slate-700/30 rounded border border-slate-600/30 hover:bg-slate-700/50 transition-all"
      whileHover={{ scale: 1.02 }}
    >
      <div className="w-10 h-10 bg-slate-600 rounded flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm font-mono">{label}</p>
        <p className="text-slate-200 font-mono text-sm">{value}</p>
      </div>
    </motion.div>
  );
};



export default Contact;