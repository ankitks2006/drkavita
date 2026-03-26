import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our Clinic</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dedicated to providing the highest quality of care and personalized treatment plans to help you achieve your health and wellness goals.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <div className="bg-primary-100 rounded-3xl h-96 w-full flex items-center justify-center text-primary-300 font-bold text-xl shadow-lg overflow-hidden">
              <img src="/drkavita1.png" alt="Clinic Image" className="w-full h-full object-cover rounded-3xl" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Mission & Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              At Chiranjeevi Physiotherapy & Rehabilitation Centre, our mission is to deliver comprehensive, compassionate, and evidence-based care. We strive to empower our patients through education, manual therapy, and customized exercise programs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our vision is to be the premier destination for physical rehabilitation in the community, recognized for our clinical excellence, innovative treatments, and patient-centered approach. We believe in treating the root cause of pain, not just the symptoms, to ensure long-lasting results and an improved quality of life.
            </p>
          </motion.div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:w-1/3"
            >
              <div className="w-64 h-64 bg-secondary/20 rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative">
                 {/* <div className="text-secondary font-bold absolute text-center">Dr. Kavita<br/>Photo</div> */}
                 <div className="text-secondary font-bold absolute text-center"><img src="/drkavita2.png" alt="" /></div> 
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:w-2/3"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Dr. Kavita</h2>
              <h3 className="text-xl text-primary-600 font-semibold mb-6">Chief Physiotherapist & Founder</h3>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Dr. Kavita is a highly skilled and experienced physiotherapist dedicated to improving her patients' physical health and overall well-being. With extensive training in advanced rehabilitation techniques, she specializes in treating complex musculoskeletal disorders and sports injuries.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900">Qualifications</h4>
                    <ul className="list-disc list-inside mt-2 text-sm">
                      <li>BPT, MPT (Orthopedics)</li>
                      <li>Certified Manual Therapist</li>
                      <li>Dry Needling Practitioner</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Experience</h4>
                    <ul className="list-disc list-inside mt-2 text-sm">
                      <li>Over 10 Years of Clinical Practice</li>
                      <li>Ex-Consultant at Major Corporate Hospitals</li>
                      <li>Treated 5,000+ happy patients</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
