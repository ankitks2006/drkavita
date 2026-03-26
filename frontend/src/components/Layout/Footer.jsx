import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white mb-4 block">
              Chiranjeevi <span className="text-secondary font-light">Physio</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Healing Through Care & Expertise. Providing professional physiotherapy and rehabilitation services for a pain-free life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-secondary transition-colors text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-secondary transition-colors text-sm">Services</Link></li>
              <li><Link to="/testimonials" className="text-gray-400 hover:text-secondary transition-colors text-sm">Testimonials</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-secondary transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/book" className="text-gray-400 hover:text-secondary transition-colors text-sm">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Physiotherapy</li>
              <li className="text-gray-400 text-sm">Rehabilitation</li>
              <li className="text-gray-400 text-sm">Sports Injury Treatment</li>
              <li className="text-gray-400 text-sm">Pain Management</li>
              <li className="text-gray-400 text-sm">Post-Surgery Recovery</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Bhavya Complex, Vaishno Dham, VD Mall, 6, Kankar Khera Rd, Meerut, Uttar Pradesh 250001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+91 8755407064</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">hello@chiranjeeviphysio.com</span>
              </li>
              <li className="flex items-start">
                <Clock size={20} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Mon - Sat: 9:00 AM - 8:00 PM<br/>Sun: Closed</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Chiranjeevi Physiotherapy & Rehabilitation Centre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
