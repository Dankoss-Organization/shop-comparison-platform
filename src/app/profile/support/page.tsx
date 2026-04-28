"use client";

export default function SupportPage() {
  const supportChannels = [
    { name: "Telegram Bot", desc: "Instant replies & price alerts", icon: <path d="M21.5 2L2 11.5l6.5 2.5 2 7.5 3-4.5 5 5 3-20z"/>, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Viber Support", desc: "Chat with our team", icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>, color: "text-purple-400", bg: "bg-purple-400/10" },
    { name: "Email Us", desc: "support@dankoss.ua", icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, color: "text-[#EC5800]", bg: "bg-[#EC5800]/10" },
  ];

  return (
    <div className="flex flex-col h-full gap-8 max-w-[1000px] mx-auto relative pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold text-[#FFDEBA]">Help & Support</h1>
        <p className="text-[15px] text-[#FFDEBA]/50">Need help linking your loyalty cards or tracking a price? We are here for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {supportChannels.map((channel) => (
          <button key={channel.name} className="group flex flex-col items-start gap-4 rounded-[32px] bg-[rgba(30,26,30,0.6)] border border-[#FFDEBA]/10 p-7 backdrop-blur-[10px] transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:border-[#FFDEBA]/20">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${channel.bg} ${channel.color}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">{channel.icon}</svg>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-[18px] font-bold text-[#FFDEBA] group-hover:text-white transition-colors">{channel.name}</span>
              <span className="text-[13px] text-[#FFDEBA]/50">{channel.desc}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-[32px] bg-[linear-gradient(135deg,rgba(55,50,55,0.15),rgba(30,26,30,0.15))] border border-[#FFDEBA]/5 p-8">
        <h2 className="text-[20px] font-bold text-[#FFDEBA] mb-6">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          {["How do I link my Silpo card?", "Why is the price different in the store?", "How do Smart Baskets calculate macros?"].map((q, i) => (
            <div key={i} className="flex items-center justify-between cursor-pointer border-b border-[#FFDEBA]/10 pb-4 group">
              <span className="text-[15px] text-[#FFDEBA]/80 group-hover:text-[#EC5800] transition-colors">{q}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#FFDEBA]/30 group-hover:text-[#EC5800] transition-colors"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-auto pt-10">
        <div className="flex items-center gap-4 text-[11px] font-mono text-[#FFDEBA]/20">
          <span>DANKOSS v1.0.4-beta</span>
          <span className="h-1 w-1 rounded-full bg-[#FFDEBA]/20" />
          <span className="flex items-center gap-1.5 text-[#4ADE80]"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]"></span></span> All Systems Operational</span>
          <span className="h-1 w-1 rounded-full bg-[#FFDEBA]/20" />
          <span>Session: 8f92a-kx</span>
        </div>
      </div>
    </div>
  );
}