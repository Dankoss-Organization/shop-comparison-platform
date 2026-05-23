"use client";

import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => 
    Math.floor(latest).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2, 
        ease: "easeOut", 
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const BackgroundGlowShape = ({ colorClass, size, position }: { colorClass: string; size: string; position: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.3, 0.15], 
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`absolute z-0 ${size} ${position} ${colorClass} rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen dark:opacity-[0.4]`}
  />
);

export default function PartnershipPage() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    workEmail: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const trackingMethods = [
    { id: "api", label: "Custom API / Webhooks" },
    { id: "erp", label: "ERP System (SAP, Oracle, etc.)" },
    { id: "csv", label: "Daily Excel / CSV Exports" },
    { id: "manual", label: "Manual Entry" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!formData.contactName.trim()) newErrors.contactName = "Contact Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = "Work Email is required";
    } else if (!emailRegex.test(formData.workEmail)) {
      newErrors.workEmail = "Please enter a valid email";
    }

    if (!selectedMethod) newErrors.selectedMethod = "Please select a tracking method";
    if (!formData.message.trim()) newErrors.message = "Please tell us about your inventory";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500); 
  };

  const baseInputClasses = "w-full rounded-[16px] px-4 sm:px-5 text-sm text-text-main outline-none transition placeholder:text-text-main/40 focus:ring-2 focus:ring-brand-orange/50 caret-brand-orange selection:bg-brand-orange/30 bg-text-main/5 dark:bg-[rgba(45,40,45,0.4)] backdrop-blur-[5px]";

  return (
    <div className="relative w-full overflow-hidden pb-16 pt-8 md:pb-20 md:pt-10">
      
      <BackgroundGlowShape colorClass="bg-brand-orange" size="h-[500px] w-[500px]" position="top-[10%] left-[10%]" />
      <BackgroundGlowShape colorClass="bg-brand-store" size="h-[300px] w-[300px]" position="top-[30%] -right-[5%]" />
      <BackgroundGlowShape colorClass="bg-brand-orangeDark" size="h-[600px] w-[600px]" position="-bottom-[10%] left-[20%]" />
      <BackgroundGlowShape colorClass="bg-brand-orange" size="h-[250px] w-[250px]" position="top-[60%] left-[60%]" />

      <div className="relative z-10 mx-auto flex flex-col md:grid max-w-[1200px] gap-10 px-4 sm:px-6 md:grid-cols-2 md:px-10 lg:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center mt-6 md:mt-0"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-orange">For Retailers</span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-text-main sm:text-4xl md:text-5xl lg:text-6xl font-serif">
            Grow your reach with DANKOSS.
          </h1>
          <p className="mt-4 sm:mt-6 text-[14px] sm:text-[15px] leading-relaxed text-text-main/60">
            Integrate your inventory with our smart aggregator. We bring highly-motivated, conversion-ready shoppers directly to your products by highlighting your best deals.
          </p>
          
          <div className="mt-8 space-y-5 sm:space-y-6">
            {[
              { title: "Direct API Integration", desc: "Seamlessly sync your catalog, pricing, and stock levels in real-time." },
              { title: "Data-Driven Insights", desc: "Gain access to analytics on how your products perform against competitors." }
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange text-xs text-white">✓</div>
                <div>
                  <h4 className="text-[15px] font-bold text-text-main">{benefit.title}</h4>
                  <p className="mt-1 text-[13px] sm:text-sm text-text-main/50">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 sm:mt-12 flex items-center gap-6 sm:gap-8 border-t border-text-main/10 pt-8 pb-6 md:pb-0">
            <div>
              <div className="text-3xl font-black text-brand-orange sm:text-4xl">
                <Counter value={10000} suffix="+" />
              </div>
              <div className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-main/50">Active Students</div>
            </div>
            <div className="h-10 w-[1px] bg-text-main/10" />
            <div>
              <div className="text-3xl font-black text-brand-orange sm:text-4xl">
                <Counter value={15} suffix="%" />
              </div>
              <div className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-main/50">Avg. Basket Savings</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col min-h-[600px] sm:min-h-[680px] rounded-[24px] sm:rounded-[32px] border border-text-main/5 bg-bg-elevated/50 dark:bg-[rgba(30,26,30,0.6)] p-6 sm:p-8 md:p-10 shadow-md dark:shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  <h3 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold text-text-main">Partner Application</h3>
                  <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit} noValidate>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-main/60">Company Name</label>
                      <input 
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Fresh Foods Ltd." 
                        className={`min-h-[44px] sm:min-h-[48px] ${baseInputClasses} ${errors.companyName ? 'border border-red-500 shadow-none' : 'border border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EC5800]'}`} 
                      />
                      {errors.companyName && <span className="text-[11px] sm:text-xs text-red-500 dark:text-red-400">{errors.companyName}</span>}
                    </div>

                    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-main/60">Contact Name</label>
                        <input 
                          type="text" 
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          placeholder="John Doe" 
                          className={`min-h-[44px] sm:min-h-[48px] ${baseInputClasses} ${errors.contactName ? 'border border-red-500 shadow-none' : 'border border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EC5800]'}`} 
                        />
                        {errors.contactName && <span className="text-[11px] sm:text-xs text-red-500 dark:text-red-400">{errors.contactName}</span>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-main/60">Work Email</label>
                        <input 
                          type="email" 
                          name="workEmail"
                          value={formData.workEmail}
                          onChange={handleChange}
                          placeholder="john@company.com" 
                          className={`min-h-[44px] sm:min-h-[48px] ${baseInputClasses} ${errors.workEmail ? 'border border-red-500 shadow-none' : 'border border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EC5800]'}`} 
                        />
                        {errors.workEmail && <span className="text-[11px] sm:text-xs text-red-500 dark:text-red-400">{errors.workEmail}</span>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-main/60">Inventory Tracking Method</label>
                      <div className="relative" ref={selectRef}>
                        <div 
                          onClick={() => setIsSelectOpen(!isSelectOpen)}
                          className={`flex min-h-[44px] sm:min-h-[48px] w-full cursor-pointer items-center justify-between rounded-[16px] px-4 sm:px-5 text-sm transition bg-text-main/5 dark:bg-[rgba(45,40,45,0.4)] backdrop-blur-[5px] ${isSelectOpen ? 'ring-2 ring-brand-orange/50' : ''} ${errors.selectedMethod ? 'border border-red-500 shadow-none' : 'border border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EC5800]'}`}
                        >
                          <span className={selectedMethod ? "text-text-main line-clamp-1" : "text-text-main/40 line-clamp-1"}>
                            {selectedMethod ? trackingMethods.find(m => m.id === selectedMethod)?.label : "Select your current system..."}
                          </span>
                          <svg 
                            className={`ml-2 h-4 w-4 shrink-0 text-text-main/70 transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>

                        <AnimatePresence>
                          {isSelectOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 5, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className="absolute left-0 right-0 top-full mt-2 z-[100] max-h-[220px] overflow-y-auto rounded-xl border border-text-main/10 bg-bg-elevated/95 dark:bg-[rgba(45,40,45,0.95)] shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-[24px]"
                            >
                              {trackingMethods.map((method) => (
                                <div 
                                  key={method.id}
                                  onClick={() => {
                                    setSelectedMethod(method.id);
                                    if(errors.selectedMethod) setErrors(prev => ({ ...prev, selectedMethod: "" }));
                                    setIsSelectOpen(false);
                                  }}
                                  className="cursor-pointer px-4 sm:px-5 py-3 text-sm text-text-main/80 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                                >
                                  {method.label}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {errors.selectedMethod && <span className="text-[11px] sm:text-xs text-red-500 dark:text-red-400">{errors.selectedMethod}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-main/60">Message</label>
                      <textarea 
                        rows={3} 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your inventory..." 
                        className={`resize-none p-4 sm:p-5 py-3.5 ${baseInputClasses} ${errors.message ? 'border border-red-500 shadow-none' : 'border border-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EC5800]'}`} 
                      />
                      {errors.message && <span className="text-[11px] sm:text-xs text-red-500 dark:text-red-400">{errors.message}</span>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="group relative mt-2 flex h-[52px] sm:h-14 w-full items-center justify-center overflow-hidden rounded-[20px] sm:rounded-[22px] border border-transparent bg-text-main/5 dark:bg-[rgba(45,40,45,0.4)] backdrop-blur-xl text-[14px] sm:text-[16px] font-bold tracking-[0.1em] text-text-main shadow-sm dark:shadow-[2px_2px_1px_#EC5800] transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-orange/50 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(236,88,0,0.6)] hover:text-brand-orange dark:hover:text-white active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0"
                    >
                      <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-text-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            SENDING...
                          </>
                        ) : (
                          "SUBMIT REQUEST"
                        )}
                      </span>
                      {!isSubmitting && (
                        <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                          <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/40 dark:via-[#FFDEBA]/25 to-transparent" />
                        </div>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-1 flex-col items-center justify-center text-center py-10"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-brand-orange/10 border border-brand-orange/30 shadow-[0_0_30px_rgba(236,88,0,0.2)]"
                  >
                    <svg className="h-8 w-8 sm:h-10 sm:w-10 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-black text-text-main font-serif">Request Sent!</h3>
                  <p className="mt-3 sm:mt-4 max-w-[280px] sm:max-w-[300px] text-[14px] sm:text-[15px] leading-relaxed text-text-main/60">
                    Thank you for applying. Our team will review your details and get back to you shortly.
                  </p>
                  
                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ companyName: "", contactName: "", workEmail: "", message: "" });
                      setSelectedMethod("");
                    }}
                    className="mt-8 text-sm font-bold tracking-widest text-brand-orange transition-colors hover:text-text-main underline decoration-brand-orange/30 underline-offset-4 hover:decoration-brand-orange/50"
                  >
                    SUBMIT ANOTHER
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </motion.div>

      </div>
    </div>
  );
}