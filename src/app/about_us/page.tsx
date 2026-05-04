"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const BackgroundGlowShape = ({ color, size, position }: { color: string; size: string; position: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.7, 0.4], 
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`absolute z-0 ${size} ${position} rounded-full blur-[120px] pointer-events-none mix-blend-screen`}
    style={{ backgroundColor: color }}
  />
);

export default function AboutUsPage() {
  return (
    <div className="relative w-full overflow-hidden pb-24 pt-10">
      
      <BackgroundGlowShape color="#EC5800" size="h-[600px] w-[600px]" position="left-1/2 top-[2%] -translate-x-1/2" />
      <BackgroundGlowShape color="#FFDEBA" size="h-[400px] w-[400px]" position="-left-[10%] top-[15%]" />
      <BackgroundGlowShape color="#D34205" size="h-[550px] w-[550px]" position="-right-[5%] top-[40%]" />
      <BackgroundGlowShape color="#EC5800" size="h-[450px] w-[450px]" position="-left-[15%] top-[60%]" />
      <BackgroundGlowShape color="#FFDEBA" size="h-[500px] w-[500px]" position="-right-[10%] top-[80%]" />
      <BackgroundGlowShape color="#EC5800" size="h-[600px] w-[600px]" position="left-[20%] bottom-[-5%]" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-[1000px] px-6 md:px-10"
      >
        <motion.div variants={itemVariants} className="mb-20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#EC5800]">Our Mission</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#FFDEBA] md:text-6xl font-serif drop-shadow-md">
            Redefining Smart Shopping.
          </h1>
          <div className="mx-auto mt-6 flex max-w-[600px] flex-col gap-3 text-[15px] leading-relaxed text-[#FFDEBA]/60">
            <p>DANKOSS isn't just another grocery store. We are an intelligent aggregator built to scan, compare, and optimize your entire basket across multiple retailers in milliseconds.</p>
            <p>Our goal is to eliminate the guesswork and ensure you always pay the lowest possible total price.</p>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { 
              title: "Smart Aggregation", 
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>, 
              text: "We pull real-time data from top retailers so you never have to check multiple apps again." 
            },
            { 
              title: "Basket Optimization", 
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/><path d="M12 14v8"/><path d="M8 18h8"/></svg>, 
              text: "Our algorithm automatically splits your cart to find the absolute lowest total price." 
            },
            { 
              title: "Price Tracking", 
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>, 
              text: "Set alerts for your favorite hits and buy exactly when the market dips." 
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="group flex flex-col items-start rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#EC5800]/10 text-[#EC5800] border border-[#EC5800]/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#EC5800]/20 group-hover:shadow-[0_0_20px_rgba(236,88,0,0.2)]">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#FFDEBA]">{feature.title}</h3>
              <p className="text-[13px] leading-relaxed text-[#FFDEBA]/60">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative z-10 mx-auto mt-32 max-w-[1000px] px-6 md:px-10"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-black text-[#FFDEBA] md:text-4xl font-serif">Our Philosophy</h2>
          <p className="mt-3 text-[14px] text-[#FFDEBA]/60">The principles that drive our code and our culture.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { 
              title: "Keep It Simple", 
              desc: "We strictly follow the KISS principle. Beneath the hood, our engine runs complex C++ algorithms and heavy database queries, but your checkout experience remains beautifully effortless."
            },
            { 
              title: "Empowering Talent", 
              desc: "Growth thrives on mentorship. Our core initiatives and partnership directions are propelled by dedicated interns and young visionaries who bring relentless energy to retail tech."
            },
            { 
              title: "Crystal Transparency", 
              desc: "Like looking through flawless quartz, our pricing model is unclouded. No hidden fees, no obscured markups—just solid, reliable data you can trust to make the best decisions."
            }
          ].map((val, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants} 
              className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#EC5800] to-transparent opacity-60" />
              <h3 className="text-lg font-bold text-[#FFDEBA] mb-2">{val.title}</h3>
              <p className="text-[13px] leading-relaxed text-[#FFDEBA]/50">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative z-10 mx-auto mt-32 max-w-[1100px] px-6 md:px-10"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-3xl font-black text-[#FFDEBA] md:text-4xl font-serif">Meet the Brains</h2>
          <p className="mt-3 text-[14px] text-[#FFDEBA]/60">The architects, engineers, and designers behind your savings.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Denys Freiuk", role: "Team Lead", specialty: "Data Architecture & AI" },
            { name: "Natalia Marchenko", role: "Business Analyst", specialty: "Operations & Code Review" },
            { name: "Kristina Zakcharchenko", role: "Data & AI", specialty: "Algorithms & Analytics" },
            { name: "Sofiia Haman", role: "Backend Developer", specialty: "Server Logic & API" },
            { name: "Oleksandr Myhydiuk", role: "Backend Developer", specialty: "Database & Infrastructure" },
            { name: "Sofiia Lashyna", role: "UI/UX & Frontend", specialty: "Glassmorphism & KISS Aesthetics" },
            { name: "Anzhela Teslia", role: "UI/UX & Frontend", specialty: "Components & Interactions" }
          ].map((member, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants} 
              className="group relative flex w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] max-w-[260px] flex-col items-center rounded-[32px] border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-white/10 bg-[#1a171a] p-1 transition-transform duration-300 group-hover:border-[#EC5800]/50 group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[rgba(255,222,186,0.1)] text-2xl text-[#FFDEBA]">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h4 className="text-base font-bold text-[#FFDEBA]">{member.name}</h4>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#EC5800]">{member.role}</p>
              <p className="mt-2 text-[12px] text-[#FFDEBA]/40">{member.specialty}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="relative z-10 mx-auto mt-32 max-w-[1000px] px-6 md:px-10"
      >
        <motion.div 
          variants={itemVariants} 
          className="relative flex flex-col items-center overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.5)] md:p-16"
        >
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[250px] w-[350px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#EC5800] opacity-[0.25] blur-[100px]" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-[#FFDEBA] md:text-5xl font-serif leading-tight">Stop searching. Start saving.</h2>
            <p className="mx-auto mt-6 max-w-[550px] text-[15px] leading-relaxed text-[#FFDEBA]/70">Join thousands of smart shoppers who trust DANKOSS for their daily essentials.</p>
            
            <Link 
              href="/" 
              className="group relative mt-10 mx-auto flex h-[56px] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-full bg-[#EC5800] text-[15px] font-black tracking-[0.12em] text-[#FFDEBA] shadow-[0_10px_25px_rgba(236,88,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(236,88,0,0.5)] active:scale-95"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                Build Your Smart Basket
              </span>
            </Link>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}