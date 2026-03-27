import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  CalendarCheck, Star, LogOut, CheckCircle, XCircle, Trash2,
  Clock, RefreshCw, Users, ThumbsUp, Activity, TrendingUp,
  Calendar, Eye, BarChart3, Shield, Mail, AlertCircle
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedAppt, setSelectedAppt] = useState(null);

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchData();
  }, []);

  useEffect(() => {
    if (tab === 'users') fetchUsers();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [apptRes, testRes, contactRes] = await Promise.all([
        axios.get(`${API}/appointments`, { headers }),
        axios.get(`${API}/testimonials/all`, { headers }),
        axios.get(`${API}/contact/all`, { headers })
      ]);
      setAppointments(apptRes.data);
      setTestimonials(testRes.data);
      setContacts(contactRes.data);
      // fetch users for admin management
      try {
        const usersRes = await axios.get(`${API}/auth/users`, { headers });
        setUsers(usersRes.data);
      } catch (e) {
        // ignore if endpoint not available or not permitted
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error('Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  // User management
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/auth/users`, { headers });
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load users');
    }
  };

  const promoteUser = async (id) => {
    try {
      await axios.put(`${API}/auth/users/${id}/role`, { role: 'admin' }, { headers });
      toast.success('User promoted to admin');
      fetchUsers();
      fetchData();
    } catch (err) { toast.error('Update failed'); }
  };

  const removeUser = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await axios.delete(`${API}/auth/users/${id}`, { headers });
      toast.success('User deleted');
      fetchUsers();
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/appointments/${id}/status`, { status }, { headers });
      toast.success(`Appointment ${status.toLowerCase()}`);
      fetchData();
    } catch { toast.error('Update failed'); }
  };

  const deleteAppointment = async (id) => {
    if (!confirm('Delete this appointment?')) return;
    try {
      await axios.delete(`${API}/appointments/${id}`, { headers });
      toast.success('Deleted');
      setSelectedAppt(null);
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  const toggleApproval = async (id, isApproved) => {
    try {
      await axios.put(`${API}/testimonials/${id}/approve`, { isApproved }, { headers });
      toast.success(isApproved ? 'Approved' : 'Unapproved');
      fetchData();
    } catch { toast.error('Update failed'); }
  };

  const deleteTestimonial = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await axios.delete(`${API}/testimonials/${id}`, { headers });
      toast.success('Deleted');
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  const markContactAsRead = async (id) => {
    try {
      await axios.put(`${API}/contact/${id}/read`, {}, { headers });
      toast.success('Marked as read');
      fetchData();
    } catch { toast.error('Update failed'); }
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this contact message?')) return;
    try {
      await axios.delete(`${API}/contact/${id}`, { headers });
      toast.success('Deleted');
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const filteredAppts = filter === 'All'
    ? appointments
    : appointments.filter(a => a.status === filter);

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'Pending').length,
    approved: appointments.filter(a => a.status === 'Approved').length,
    rejected: appointments.filter(a => a.status === 'Rejected').length,
    reviews: testimonials.length,
    approvedReviews: testimonials.filter(t => t.isApproved).length,
    messages: contacts.length,
    unreadMessages: contacts.filter(c => !c.isRead).length,
  };

  const statusConfig = {
    Pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-400' },
    Approved: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' },
    Rejected: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-400' }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">Admin Dashboard</h1>
                <p className="text-xs text-gray-400 hidden sm:block">Chiranjeevi Physiotherapy</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <button onClick={fetchData} className="p-2 sm:p-2.5 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition" title="Refresh">
                <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <button onClick={logout} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-rose-500 hover:text-rose-600 font-semibold bg-rose-50 hover:bg-rose-100 px-3 sm:px-4 py-2 rounded-xl transition">
                <LogOut size={14} className="sm:w-[16px] sm:h-[16px]" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 sm:py-8">

        {/* Stats Row */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5 mb-6 sm:mb-8">
          <motion.div whileHover={{ y: -3 }} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-400 mt-1">appointments</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Pending</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stats.pending}</p>
              <p className="text-xs text-gray-400 mt-1">awaiting review</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl from-emerald-100 to-transparent rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Approved</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stats.approved}</p>
              <p className="text-xs text-gray-400 mt-1">confirmed</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl from-violet-100 to-transparent rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-400 to-violet-600 rounded-xl flex items-center justify-center shadow-md">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Reviews</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stats.reviews}</p>
              <p className="text-xs text-gray-400 mt-1">{stats.approvedReviews} approved</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl from-rose-100 to-transparent rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Messages</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stats.messages}</p>
              <p className="text-xs text-gray-400 mt-1">{stats.unreadMessages} unread</p>
            </div>
          </motion.div>
        </div>

        {/* Mini Bar Chart */}
        {stats.total > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={18} className="text-gray-400" />
              <h3 className="font-semibold text-gray-700 text-sm">Appointment Status Overview</h3>
            </div>
            <div className="flex gap-2 h-4 rounded-full overflow-hidden bg-gray-100">
              {stats.approved > 0 && (
                <motion.div initial={{ width: 0 }} animate={{ width: `${(stats.approved / stats.total) * 100}%` }} transition={{ duration: 0.8 }}
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" title={`Approved: ${stats.approved}`}
                />
              )}
              {stats.pending > 0 && (
                <motion.div initial={{ width: 0 }} animate={{ width: `${(stats.pending / stats.total) * 100}%` }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" title={`Pending: ${stats.pending}`}
                />
              )}
              {stats.rejected > 0 && (
                <motion.div initial={{ width: 0 }} animate={{ width: `${(stats.rejected / stats.total) * 100}%` }} transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gradient-to-r from-rose-400 to-rose-500 rounded-full" title={`Rejected: ${stats.rejected}`}
                />
              )}
            </div>
            <div className="flex gap-6 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Approved ({stats.approved})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Pending ({stats.pending})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Rejected ({stats.rejected})</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4 overflow-x-auto scrollbar-hide">
          {[
            { key: 'appointments', label: 'Appointments', icon: <CalendarCheck size={14} className="sm:w-[16px] sm:h-[16px]" />, count: stats.total },
            { key: 'testimonials', label: 'Testimonials', icon: <Star size={14} className="sm:w-[16px] sm:h-[16px]" />, count: stats.reviews },
            { key: 'contacts', label: 'Messages', icon: <Mail size={14} className="sm:w-[16px] sm:h-[16px]" />, count: stats.messages },
            { key: 'users', label: 'Users', icon: <Users size={14} className="sm:w-[16px] sm:h-[16px]" />, count: users.length },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                tab === t.key
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {t.icon} 
              <span className="hidden xs:inline">{t.label}</span>
              <span className={`ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-bold ${
                tab === t.key ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
              }`}>{t.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading data...</p>
          </div>
        ) : tab === 'appointments' ? (
          <>
            {/* Filter Pills */}
            <div className="flex gap-2 mb-4 sm:mb-5 flex-wrap">
              {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold tracking-wide border transition-all ${
                    filter === f
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >{f} {f !== 'All' && `(${f === 'Pending' ? stats.pending : f === 'Approved' ? stats.approved : stats.rejected})`}</button>
              ))}
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {filteredAppts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No appointments found</p>
                </div>
              ) : filteredAppts.map((a, i) => (
                <motion.div
                  key={a._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  onClick={() => setSelectedAppt(selectedAppt?._id === a._id ? null : a)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 font-bold rounded-xl flex items-center justify-center text-sm">
                        {a.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{a.name}</div>
                        <div className="text-gray-400 text-xs">{a.phone}</div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${statusConfig[a.status]?.bg} ${statusConfig[a.status]?.text} ${statusConfig[a.status]?.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[a.status]?.dot}`}></span>
                      {a.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Service:</span>
                      <span className="font-medium text-gray-900">{a.service}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium text-gray-900">{new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-medium text-gray-900">{a.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {a.status !== 'Approved' && (
                      <button onClick={(e) => { e.stopPropagation(); updateStatus(a._id, 'Approved'); }}
                        className="flex-1 py-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition text-xs font-bold border border-emerald-200">
                        ✓ Approve
                      </button>
                    )}
                    {a.status !== 'Rejected' && (
                      <button onClick={(e) => { e.stopPropagation(); updateStatus(a._id, 'Rejected'); }}
                        className="flex-1 py-2 rounded-xl text-rose-500 hover:bg-rose-50 transition text-xs font-bold border border-rose-200">
                        ✕ Reject
                      </button>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); deleteAppointment(a._id); }}
                      className="px-3 py-2 rounded-xl text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition text-xs font-bold border border-gray-200">
                      🗑
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/70">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Schedule</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredAppts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-16">
                          <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                          <p className="text-gray-400 font-medium">No appointments found</p>
                        </td>
                      </tr>
                    ) : filteredAppts.map((a, i) => (
                      <motion.tr
                        key={a._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="hover:bg-primary-50/30 transition-colors cursor-pointer group"
                        onClick={() => setSelectedAppt(selectedAppt?._id === a._id ? null : a)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 font-bold rounded-xl flex items-center justify-center text-sm">
                              {a.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{a.name}</div>
                              <div className="text-gray-400 text-xs">{a.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-700 text-sm font-medium">{a.service}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-800 font-medium text-sm">{new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                          <div className="text-gray-400 text-xs">{a.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${statusConfig[a.status]?.bg} ${statusConfig[a.status]?.text} ${statusConfig[a.status]?.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[a.status]?.dot}`}></span>
                            {a.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                            {a.status !== 'Approved' && (
                              <button onClick={(e) => { e.stopPropagation(); updateStatus(a._id, 'Approved'); }}
                                className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition" title="Approve">
                                <CheckCircle size={18} />
                              </button>
                            )}
                            {a.status !== 'Rejected' && (
                              <button onClick={(e) => { e.stopPropagation(); updateStatus(a._id, 'Rejected'); }}
                                className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition" title="Reject">
                                <XCircle size={18} />
                              </button>
                            )}
                            <button onClick={(e) => { e.stopPropagation(); deleteAppointment(a._id); }}
                              className="p-2 rounded-xl text-gray-300 hover:bg-gray-100 hover:text-rose-500 transition" title="Delete">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Appointment Detail Drawer */}
            <AnimatePresence>
              {selectedAppt && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4 sm:mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">Appointment Details</h3>
                    <button onClick={() => setSelectedAppt(null)} className="text-gray-400 hover:text-gray-600 text-sm">Close ✕</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <p className="text-gray-400 text-xs mb-1 uppercase font-semibold">Patient Name</p>
                      <p className="font-semibold text-gray-900">{selectedAppt.name}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <p className="text-gray-400 text-xs mb-1 uppercase font-semibold">Phone</p>
                      <p className="font-semibold text-gray-900">{selectedAppt.phone}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <p className="text-gray-400 text-xs mb-1 uppercase font-semibold">Email</p>
                      <p className="font-semibold text-gray-900">{selectedAppt.email || '—'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <p className="text-gray-400 text-xs mb-1 uppercase font-semibold">Service</p>
                      <p className="font-semibold text-gray-900">{selectedAppt.service}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <p className="text-gray-400 text-xs mb-1 uppercase font-semibold">Date & Time</p>
                      <p className="font-semibold text-gray-900">{new Date(selectedAppt.date).toLocaleDateString()} at {selectedAppt.time}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <p className="text-gray-400 text-xs mb-1 uppercase font-semibold">Status</p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${statusConfig[selectedAppt.status]?.bg} ${statusConfig[selectedAppt.status]?.text} ${statusConfig[selectedAppt.status]?.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[selectedAppt.status]?.dot}`}></span>
                        {selectedAppt.status}
                      </span>
                    </div>
                    {selectedAppt.notes && (
                      <div className="bg-gray-50 rounded-xl p-3 sm:p-4 sm:col-span-2 lg:col-span-3">
                        <p className="text-gray-400 text-xs mb-1 uppercase font-semibold">Notes</p>
                        <p className="text-gray-700">{selectedAppt.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
                    {selectedAppt.status !== 'Approved' && (
                      <button onClick={() => { updateStatus(selectedAppt._id, 'Approved'); setSelectedAppt(null); }}
                        className="px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 transition shadow-md">
                        ✓ Approve
                      </button>
                    )}
                    {selectedAppt.status !== 'Rejected' && (
                      <button onClick={() => { updateStatus(selectedAppt._id, 'Rejected'); setSelectedAppt(null); }}
                        className="px-4 sm:px-5 py-2.5 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition shadow-md">
                        ✕ Reject
                      </button>
                    )}
                    <button onClick={() => { deleteAppointment(selectedAppt._id); }}
                      className="px-4 sm:px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-semibold text-sm hover:bg-gray-200 transition">
                      🗑 Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : tab === 'contacts' ? (
          /* Contacts Tab */
          <>
            <div className="flex gap-2 mb-5">
              <span className="text-xs font-semibold text-gray-400 uppercase self-center mr-2">Filter:</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                {stats.messages - stats.unreadMessages} Read
              </span>
              <span className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                {stats.unreadMessages} Unread
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {contacts.length === 0 ? (
                <div className="text-center py-16 sm:py-20">
                  <Mail className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No contact messages yet</p>
                </div>
              ) : contacts.map((msg, i) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border transition-all hover:shadow-md ${
                    msg.isRead ? 'border-gray-100' : 'border-rose-200 bg-rose-50/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 font-bold rounded-xl flex items-center justify-center text-xs sm:text-sm">
                          {msg.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{msg.name}</h4>
                          <p className="text-gray-400 text-xs sm:text-sm truncate">{msg.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-bold border ${
                        msg.isRead
                          ? 'bg-gray-50 text-gray-700 border-gray-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {msg.isRead ? '✓ Read' : '● New'}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">{msg.message}</p>

                  <div className="flex justify-between items-center text-xs text-gray-400 mb-3 sm:mb-4 border-t border-gray-50 pt-3 sm:pt-4">
                    <span className="truncate mr-2">{new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(msg.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    {!msg.isRead && (
                      <button onClick={() => markContactAsRead(msg._id)}
                        className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition bg-emerald-500 text-white hover:bg-emerald-600 shadow-md">
                        ✓ Mark as Read
                      </button>
                    )}
                    <button onClick={() => deleteContact(msg._id)}
                      className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition border border-gray-100">
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : tab === 'users' ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">User Management</h3>
              <div>
                <button onClick={fetchUsers} className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100 text-sm hover:bg-gray-100 transition">Refresh</button>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-3">
              {users.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No users found</p>
                </div>
              ) : users.map((u, i) => (
                <motion.div
                  key={u._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">{u.name || '—'}</div>
                      <div className="text-gray-400 text-sm">{u.email}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      u.role === 'admin' ? 'bg-primary-50 text-primary-700 border-primary-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {u.role}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {u.role !== 'admin' && (
                      <button onClick={() => promoteUser(u._id)} className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition">
                        Promote to Admin
                      </button>
                    )}
                    <button onClick={() => removeUser(u._id)} className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 hover:bg-rose-100 transition">
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/70">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-16">
                          <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                          <p className="text-gray-400 font-medium">No users found</p>
                        </td>
                      </tr>
                    ) : users.map((u, i) => (
                      <tr key={u._id} className="hover:bg-primary-50/30 transition-colors">
                        <td className="px-6 py-4">{u.name || '—'}</td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4">{u.role}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {u.role !== 'admin' && (
                              <button onClick={() => promoteUser(u._id)} className="px-3 py-1 rounded-xl bg-emerald-500 text-white text-xs font-bold">Promote</button>
                            )}
                            <button onClick={() => removeUser(u._id)} className="px-3 py-1 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Testimonials Tab */
          <>
            <div className="flex gap-2 mb-5">
              <span className="text-xs font-semibold text-gray-400 uppercase self-center mr-2">Filter:</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                {stats.approvedReviews} Approved
              </span>
              <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-500 text-xs font-bold border border-gray-200">
                {stats.reviews - stats.approvedReviews} Pending
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {testimonials.length === 0 ? (
                <div className="col-span-2 text-center py-16 sm:py-20">
                  <Star className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No testimonials yet</p>
                </div>
              ) : testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border transition-all hover:shadow-md ${
                    t.isApproved ? 'border-emerald-100' : 'border-amber-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-100 to-violet-200 text-violet-600 font-bold rounded-xl flex items-center justify-center text-xs sm:text-sm">
                        {t.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">{t.name}</h4>
                        <div className="flex text-yellow-400 gap-0.5 mt-0.5">
                          {[...Array(t.rating)].map((_, i) => <Star key={i} size={10} className="sm:w-[12px] sm:h-[12px]" fill="currentColor" />)}
                          {[...Array(5 - t.rating)].map((_, i) => <Star key={i} size={10} className="sm:w-[12px] sm:h-[12px] text-gray-200" />)}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-bold border ${
                      t.isApproved
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {t.isApproved ? '✓ Live' : '⏳ Pending'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm italic mb-4 sm:mb-5 leading-relaxed">"{t.message}"</p>

                  <div className="flex flex-col sm:flex-row gap-2 border-t border-gray-50 pt-3 sm:pt-4">
                    <button onClick={() => toggleApproval(t._id, !t.isApproved)}
                      className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition ${
                        t.isApproved
                          ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                          : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md'
                      }`}>
                      {t.isApproved ? 'Unapprove' : '✓ Approve'}
                    </button>
                    <button onClick={() => deleteTestimonial(t._id)}
                      className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition border border-gray-100">
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
