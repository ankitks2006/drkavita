import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-1/2">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              Healing Through <span className="text-primary-600">Care & Expertise</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl"
            >
              Experience high-quality physiotherapy tailored to your unique needs. We help you recover faster from injuries and live a pain-free life.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                to="/book" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold md:text-lg transition-colors shadow-lg flex items-center justify-center gap-2 group"
              >
                Book Appointment <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/services" 
                className="bg-white hover:bg-gray-50 text-primary-600 border border-primary-200 px-8 py-3 rounded-full font-semibold md:text-lg transition-colors flex items-center justify-center"
              >
                Our Services
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Placeholder for hero image / graphic */}
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-primary-100 rounded-bl-[150px] overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center text-primary-300 font-bold text-2xl">
             <img src="/drkavita.png" alt="" className="w-full h-full object-cover rounded-bl-[150px]" />
           </div>
        </div>
      </section>

      {/* Highlights / Quick Info */}
      <section className="bg-white py-16 mt-[-40px] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border-t-4 border-t-primary-500"
            >
              <div className="bg-primary-50 p-4 rounded-full mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
              <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border-t-4 border-t-secondary"
            >
              <div className="bg-teal-50 p-4 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-gray-600">123 Healthcare Ave</p>
              <p className="text-gray-600">Medical District, City 12345</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border-t-4 border-t-primary-500"
            >
              <div className="bg-primary-50 p-4 rounded-full mb-4">
                <Phone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-gray-600">+1 234 567 8900</p>
              <p className="text-gray-600">hello@chiranjeeviphysio.com</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Brief Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
             <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive physiotherapy and rehabilitation solutions to restore your health and mobility.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               "Orthopedic Physiotherapy",
               "Sports Injury Rehabilitation",
               "Neurological Physiotherapy",
               "Post-Surgical Rehab",
               "Pain Management",
               "Geriatric Physiotherapy"
             ].map((service, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{service}</h4>
                      <p className="text-gray-600 text-sm">Professional treatment tailored to address specific conditions and accelerate recovery.</p>
                    </div>
                  </div>
                </motion.div>
             ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/services" className="text-primary-600 font-semibold hover:text-primary-700 flex items-center justify-center gap-1">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
