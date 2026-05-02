"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function AboutUsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-20 pt-10">
      <div className="pointer-events-none absolute -left-[10%] top-[10%] z-0 h-[500px] w-[500px] rounded-full bg-[#FFDEBA] opacity-[0.03] blur-[120px]" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-[1000px] px-6 md:px-10"
      >
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#EC5800]">Our Mission</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#FFDEBA] md:text-6xl font-serif drop-shadow-md">
            Redefining Smart Shopping.
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-[15px] leading-relaxed text-[#FFDEBA]/60">
            DANKOSS isn't just another grocery store. We are an intelligent aggregator designed to scan, compare, and optimize your entire basket across multiple retailers in milliseconds.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Smart Aggregation", icon: "🌐", text: "We pull real-time data from top retailers so you never have to check multiple apps again." },
            { title: "Basket Optimization", icon: "⚡", text: "Our algorithm automatically splits your cart to find the absolute lowest total price." },
            { title: "Price Tracking", icon: "📉", text: "Set alerts for your favorite hits and buy exactly when the market dips." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="group flex flex-col items-start rounded-[24px] border border-[#ffffff10] bg-[rgba(45,40,45,0.4)] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-[rgba(55,50,55,0.6)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#EC5800]/10 text-2xl border border-[#EC5800]/20 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#FFDEBA]">{feature.title}</h3>
              <p className="text-[13px] leading-relaxed text-[#FFDEBA]/60">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-20 overflow-hidden rounded-[32px] border border-[#EC5800]/20 bg-gradient-to-br from-[#EC5800]/10 to-transparent p-10 text-center backdrop-blur-md md:p-16">
          <h2 className="text-3xl font-black text-white md:text-4xl">Stop searching. Start saving.</h2>
          <p className="mx-auto mt-4 max-w-[500px] text-sm text-[#FFDEBA]/70">Join thousands of smart shoppers who trust DANKOSS for their daily essentials.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}