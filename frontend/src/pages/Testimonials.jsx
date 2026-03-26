import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', rating: 5, message: '' });
  const [hoverRating, setHoverRating] = useState(0);

  // Fallback reviews shown when the API has no approved testimonials yet
  const fallbackReviews = [
    {
      _id: 'fb1',
      name: "Rahul Sharma",
      rating: 5,
      message: "Dr. Kavita is incredible! The severe back pain I suffered from for years is completely gone after just two months of dedicated therapy. Highly recommended clinic.",
      createdAt: "2025-10-12T00:00:00.000Z"
    },
    {
      _id: 'fb2',
      name: "Priya Patel",
      rating: 5,
      message: "Excellent service. The clinic is very clean, and the advanced equipment they use really speeds up recovery. The staff is polite and professional.",
      createdAt: "2025-11-05T00:00:00.000Z"
    },
    {
      _id: 'fb3',
      name: "Amit Kumar",
      rating: 5,
      message: "I went here for post-surgery rehab for my knee. The personalized attention and constant encouragement helped me get back on my feet faster than my ortho expected.",
      createdAt: "2026-01-20T00:00:00.000Z"
    },
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${API}/testimonials`);
      setReviews(data.length > 0 ? data : fallbackReviews);
    } catch {
      setReviews(fallbackReviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error('Please fill in your name and review.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/testimonials`, form);
      setSubmitted(true);
      toast.success('Thank you! Your review has been submitted.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: '', rating: 5, message: '' });
    setSubmitted(false);
    setShowForm(false);
  };

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Patient Stories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our patients have to say about their recovery journey with Chiranjeevi Physiotherapy.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div 
              key={review._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-200" />
              
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-gray-700 italic mb-6 relative z-10 leading-relaxed">
                "{review.message}"
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="font-semibold text-gray-900">{review.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-primary-50 rounded-3xl p-10 text-center border border-primary-100">
           <h3 className="text-2xl font-bold text-gray-900 mb-4">Leave a Review</h3>
           <p className="text-gray-600 max-w-2xl mx-auto mb-8">
             Your feedback helps us improve and helps others find the right care. Share your experience with us!
           </p>
           <button 
             onClick={() => { setShowForm(true); setSubmitted(false); }}
             className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition shadow-md hover:shadow-lg"
           >
             Write a Testimonial
           </button>
        </div>

      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) resetForm(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative"
            >
              {/* Close button */}
              <button 
                onClick={resetForm}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>

              {submitted ? (
                /* Success State */
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Your review has been submitted successfully. It will appear on the page once approved by our team.
                  </p>
                  <button
                    onClick={resetForm}
                    className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-700 transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* Review Form */
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Write a Review</h3>
                  <p className="text-gray-500 text-sm mb-6">Share your experience with our clinic</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 focus:bg-white transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Star Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setForm({ ...form, rating: star })}
                            className="transition-transform hover:scale-125 focus:outline-none"
                          >
                            <Star
                              size={32}
                              className={`transition-colors ${
                                star <= (hoverRating || form.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-3 text-sm text-gray-500 self-center font-medium">
                          {form.rating}/5
                        </span>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Review</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        rows="4"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 focus:bg-white transition-all outline-none resize-none"
                        placeholder="Tell us about your experience at our clinic…"
                      ></textarea>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-semibold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
                    >
                      {loading ? 'Submitting…' : <><Send size={18} /> Submit Review</>}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;
