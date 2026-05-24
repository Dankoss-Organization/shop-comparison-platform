/**
 * @file Footer.tsx
 * @description Global footer component rendering contact info, form, and legal links.
 */

"use client";

import Image from "next/image";
import Link from "next/link"; 
import { ChainIcon, Connection } from "@/Components/UI/icon_ui";

const companyLinks = [
  { label: "About Us", href: "/about_us" },
  { label: "How it works", href: "#" },
  { label: "Partners", href: "/partnership" }
];

const supportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" }
];

const contacts = [
  {
    icon: "/phone.svg",
    alt: "Phone",
    text: "084524145547",
    href: "tel:084524145547",
    tooltip: "Call us",
  },
  {
    icon: "/email.svg",
    alt: "Email",
    text: "arshakir132@gmail.com",
    href: "mailto:arshakir132@gmail.com?subject=Питання%20з%20сайту",
    tooltip: "Send email",
  },
  {
    icon: "/location.svg",
    alt: "Location",
    text: "Kyiv, Ukraine",
    href: "https://maps.google.com/?q=Kyiv, Ukraine",
    tooltip: "Open map",
  },
];

const socials = [
  { href: "#", iconSrc: "/github.svg", alt: "GitHub" },
  { href: "#", iconSrc: "/instagram.svg", alt: "Instagram" },
  { href: "#", iconSrc: "/telegram.svg", alt: "Telegram" },
  { href: "#", iconSrc: "/linkedin.svg", alt: "LinkedIn" },
  { href: "#", iconSrc: "/whatsapp.svg", alt: "WhatsApp" },
  { href: "#", iconSrc: "/x.svg", alt: "X" },
];

export default function Footer() {
  return (
    <footer className="bg-bg-darker px-4 pb-6 pt-10 text-text-primary md:px-6 lg:px-12">
      
      <div className="relative mx-auto mb-10 w-full overflow-hidden rounded-[28px] md:rounded-[45px] shadow-[0_0_15px_rgb(var(--brand-orange)_/_0.2)] px-4 py-6 md:px-10 lg:px-[60px] lg:pb-10 lg:pt-9 bg-gradient-to-b from-bg-deep to-bg-deepest">
        <div className="pointer-events-none absolute -bottom-[40%] -left-[20%] -top-[40%] w-[40%] z-0 rounded-full" style={{ background: "radial-gradient(circle at center, rgb(var(--brand-orange)) 2%, rgb(var(--brand-orange-dark)) 25%, transparent 85%)", filter: "blur(90px)", opacity: 0.7 }} />
        <div className="pointer-events-none absolute -bottom-[40%] -right-[20%] -top-[40%] w-[40%] z-0 rounded-full" style={{ background: "radial-gradient(circle at center, rgb(var(--brand-orange)) 2%, rgb(var(--brand-orange-dark)) 25%, transparent 85%)", filter: "blur(90px)", opacity: 0.7 }} />

        <div className="relative z-10">
          <h2 className="mb-6 text-center text-2xl font-semibold uppercase tracking-[0.3em] text-text-primary md:text-[32px]">
            Contact Us
          </h2>

          <form className="mx-auto flex max-w-[850px] flex-col gap-3 md:gap-4">
            <div className="grid gap-3 md:grid-cols-2 md:gap-[30px]">
              <FooterInput type="text" placeholder="Name" />
              <FooterInput type="email" placeholder="Email address" />
            </div>

            <textarea
              placeholder="Message"
              required
              className="h-[100px] w-full resize-none rounded-[16px] border-none px-4 py-3 text-sm md:text-base text-text-primary outline-none transition placeholder:text-text-primary/70 focus:ring-2 focus:ring-brand-orange/50"
              style={{ background: "rgb(var(--bg-main) / 0.4)", boxShadow: "2px 2px 1px rgb(var(--brand-orange))", backdropFilter: "blur(1px)", WebkitBackdropFilter: "blur(1px)" }}
            />

            <div className="mt-1 flex justify-center">
              <button
                type="submit"
                className="group relative flex h-[44px] w-full max-w-[260px] items-center justify-center overflow-hidden rounded-[22px] border border-transparent text-base font-medium text-text-primary shadow-[2px_2px_1px_rgb(var(--brand-orange))] transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-orange/50 hover:shadow-[0_0_20px_rgb(var(--brand-orange)_/_0.6)] hover:text-text-main focus:border-brand-orange focus:outline-none active:scale-95"
                style={{ background: "rgb(var(--bg-main) / 0.4)", backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)" }}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Submit now</span>
                <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                  <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-text-primary/25 to-transparent" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mx-auto mb-10 grid max-w-[1400px] gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] lg:gap-[30px]">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-3 flex items-center leading-none">
            <span className="text-[32px] font-semibold text-text-primary md:text-[42px]">DANK</span>
            <Image src="/orange_logo.svg" alt="O" width={36} height={36} className="mx-[2px] md:w-[44px] md:h-[44px]" />
            <span className="text-[32px] font-semibold text-text-primary md:text-[42px]">SS</span>
          </div>
          <p className="max-w-[360px] text-base font-medium leading-6 tracking-[-0.5px] text-gray-500 dark:text-gray-400">
            Give a rich person 100$ and he will make it 10000$, give a poor person 100$ and he will make it 0$, give us 100$, please
          </p>
        </div>

        <FooterLinkColumn title="Company" links={companyLinks} />
        <FooterLinkColumn title="Support & Legal" links={supportLinks} />

        <div>
          <h3 className="mb-4 text-[22px] font-bold leading-[34px] tracking-[2px] text-brand-orange md:text-[28px]">Contacts</h3>
          <div className="flex flex-col items-start">
            {contacts.map((item, index) => (
              <div key={item.text} className="flex flex-col items-start">
                <div className="flex items-center gap-[16px] group/item">
                  <div className="relative z-10 hover:z-50">
                    <a href={item.href}>
                      <ChainIcon>
                        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-black/10 transition-all duration-300 group-hover/item:bg-brand-orange dark:bg-white/10">
                          <div className="h-[18px] w-[18px] bg-gray-500 transition-all duration-300 group-hover/item:bg-white dark:bg-gray-400" style={{ maskImage: `url(${item.icon})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskImage: `url(${item.icon})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }} />
                        </div>
                      </ChainIcon>
                    </a>
                    <span className="pointer-events-none absolute z-50 left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-bg-deep px-3 py-1 text-xs text-text-primary opacity-0 shadow-lg transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-y-1 scale-95 group-hover/item:scale-100">{item.tooltip}</span>
                  </div>
                  <span className="text-[13px] md:text-[15px] leading-5 text-gray-500 transition-colors duration-300 group-hover/item:text-text-primary dark:text-gray-400">{item.text}</span>
                </div>
                {index < contacts.length - 1 && (
                  <div className="flex w-[42px] justify-center my-[-6px] relative z-0">
                    <Connection vertical />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mb-5 max-w-[1400px] border-t border-text-primary/30" />

      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-[13px] md:text-[15px] text-gray-500 dark:text-gray-400">© 2026 DANKOSS. | terms and conditions</p>

        <div className="flex flex-wrap items-center gap-y-2">
          {socials.map((social, index) => (
            <div key={social.alt} className="flex items-center group/social">
              <a href={social.href}>
                <ChainIcon>
                  <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-black/10 transition-all duration-300 group-hover/social:bg-brand-orange dark:bg-white/10">
                    <div className="h-[22px] w-[22px] bg-gray-500 transition-all duration-300 group-hover/social:bg-white dark:bg-gray-400" style={{ maskImage: `url(${social.iconSrc})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskImage: `url(${social.iconSrc})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }} />
                  </div>
                </ChainIcon>
              </a>
              {index < socials.length - 1 ? <Connection /> : null}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function FooterInput({ type, placeholder }: { type: string; placeholder: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required
      className="h-[40px] flex-1 rounded-[16px] border-none px-4 text-sm md:text-base text-text-primary outline-none transition placeholder:text-text-primary/70 focus:ring-2 focus:ring-brand-orange/50"
      style={{
        background: "rgb(var(--bg-main) / 0.4)",
        boxShadow: "2px 2px 1px rgb(var(--brand-orange))",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    />
  );
}

export function FooterLinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-[22px] font-bold leading-[34px] tracking-[2px] text-brand-orange md:text-[28px]">{title}</h3>
      <ul className="m-0 list-none p-0">
        {links.map((item) => (
          <li key={item.label} className="mb-[8px] flex items-center gap-[10px]">
            <span className="text-[18px] leading-none text-gray-500 dark:text-gray-400">•</span>
            <Link href={item.href} className="text-[16px] md:text-[18px] font-medium leading-[30px] tracking-[-0.5px] text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-brand-orange">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}