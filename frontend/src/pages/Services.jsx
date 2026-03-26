import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Beaker, Heart, Shield, Droplet, UserCheck } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      title: "Orthopedic Physiotherapy",
      description: "Treatment for musculoskeletal injuries involving bones, joints, muscles, tendons, and ligaments. Effective for back pain, neck pain, and arthritis.",
      icon: <Activity className="w-10 h-10 text-primary-500" />
    },
    {
      title: "Post-Surgery Rehabilitation",
      description: "Specialized programs to help you regain optimal mobility, strength, and function after surgeries like joint replacements or ligament repairs.",
      icon: <UserCheck className="w-10 h-10 text-primary-500" />
    },
    {
      title: "Sports Injury Treatment",
      description: "Targeted therapy to treat sports-related injuries, enhance performance, and prevent future recurrences to get you back in the game.",
      icon: <Shield className="w-10 h-10 text-primary-500" />
    },
    {
      title: "Neurological Physiotherapy",
      description: "Care for individuals with neurological disorders such as stroke, Parkinson's disease, or multiple sclerosis, focusing on improving coordination and balance.",
      icon: <Beaker className="w-10 h-10 text-primary-500" />
    },
    {
      title: "Pain Management",
      description: "Comprehensive approaches combining manual therapy, dry needling, and modalities to alleviate chronic pain and improve quality of life.",
      icon: <Heart className="w-10 h-10 text-primary-500" />
    },
    {
      title: "Massage Therapy",
      description: "Therapeutic massage techniques directed at deep muscle tissues to release tension, improve blood flow, and promote relaxation and healing.",
      icon: <Droplet className="w-10 h-10 text-primary-500" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of specialized physiotherapy services utilizing the latest techniques and equipment.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {servicesList.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-primary-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
              
              <div className="bg-primary-50 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {service.description}
              </p>
              
              <Link to="/book" className="text-primary-600 font-semibold flex items-center hover:text-primary-700">
                Book for this service <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="bg-primary-600 rounded-3xl p-12 text-center text-white shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
           <div className="relative z-10">
             <h2 className="text-3xl font-bold mb-4">Not sure which treatment you need?</h2>
             <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
               Schedule a comprehensive consultation with Dr. Kavita to get a customized treatment plan designed specifically for your condition.
             </p>
             <Link 
               to="/book" 
               className="inline-block bg-white text-primary-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors shadow-md"
             >
               Schedule Consultation
             </Link>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
