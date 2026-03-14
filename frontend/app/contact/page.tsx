"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#073B3A] py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/assets/img/all-images/hero/hero-img1.png" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Get In <span className="text-[#D4ED31]">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Have questions about a property or need expert advice? Our team is here to help you every step of the way.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 -mt-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Phone, 
                title: 'Call Us', 
                content: '(+91) 234 345 4574', 
                subContent: 'Mon-Sat: 9am - 7pm',
                color: 'bg-blue-50 text-blue-600'
              },
              { 
                icon: Mail, 
                title: 'Email Us', 
                content: '99Homes@gmail.com', 
                subContent: '24/7 Online Support',
                color: 'bg-green-50 text-green-600'
              },
              { 
                icon: MapPin, 
                title: 'Visit Us', 
                content: 'Vasai West, Mumbai', 
                subContent: 'Maharashtra, India',
                color: 'bg-orange-50 text-orange-600'
              },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:border-[#D4ED31] transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#073B3A] mb-2">{item.title}</h3>
                <p className="text-lg font-semibold text-gray-800">{item.content}</p>
                <p className="text-gray-500">{item.subContent}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[#D4ED31] font-bold uppercase tracking-widest text-sm flex items-center">
                  <span className="w-8 h-[2px] bg-[#D4ED31] mr-3" /> Contact Us
                </span>
                <h2 className="text-4xl font-bold text-[#073B3A]">Send Us A Message</h2>
                <p className="text-gray-600 text-lg">
                  Fill out the form below and one of our experts will get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#073B3A] uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] focus:border-[#D4ED31] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#073B3A] uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] focus:border-[#D4ED31] outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#073B3A] uppercase tracking-wider">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Property Inquiry"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] focus:border-[#D4ED31] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#073B3A] uppercase tracking-wider">Your Message</label>
                  <textarea 
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] focus:border-[#D4ED31] outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button className="bg-[#073B3A] text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center group hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all transform active:scale-95 shadow-xl">
                  Send Message
                  <Send className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>

            {/* Map & Office Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="bg-gray-50 p-8 rounded-3xl space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#073B3A]">Our Office Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <MessageSquare className="w-6 h-6 text-[#D4ED31]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#073B3A]">Chat with us</p>
                        <p className="text-gray-500">Live chat available</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <Clock className="w-6 h-6 text-[#D4ED31]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#073B3A]">Office Hours</p>
                        <p className="text-gray-500">9am - 6pm (Mon-Sat)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden h-80 shadow-inner">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15053.488661642193!2d72.8277271!3d19.3907044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9569d64380b%3A0x6bba3bc132b85e00!2sVasai-Virar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711234567890!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                  />
                </div>

                <div className="p-6 bg-white rounded-2xl border border-gray-100">
                  <p className="text-gray-600 leading-relaxed font-medium">
                    We are centrally located in Vasai West, making it easy for you to visit us and discuss your property needs in person.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
