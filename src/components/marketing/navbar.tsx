"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { appUrl } from "@/config/urls";
import { NAV_LINKS } from "@/lib/marketing/navigation";
import { ThemeToggle } from "./theme-toggle";
import styles from "./navbar.module.css";

/** Marketing navigation has no authentication runtime dependency. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.navbar}>
      <div className="mContainer">
        <div className={styles.topRow}>
          <Link href="/" className={styles.brand} onClick={() => setOpen(false)} aria-label="Sarion home">
            <Image src="/light-theme-logo-SARION.png" alt="Sarion" width={244} height={80} priority className={`${styles.logo} ${styles.logoLight}`} />
            <Image src="/dark-theme-logo-SARION.png" alt="Sarion" width={211} height={80} priority className={`${styles.logo} ${styles.logoDark}`} />
          </Link>
          <div className={styles.actions}>
            <ThemeToggle />
            <Link href={appUrl("/login")} className={`mBtn mBtnGhost ${styles.login}`}>Login</Link>
            <Link href={appUrl("/signup")} className="mBtn mBtnPrimary">Start Free</Link>
          </div>
          <button type="button" className={styles.menuButton} aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className={styles.center}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={styles.link} data-active={active || undefined} aria-current={active ? "page" : undefined}>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {open && (
        <div className={styles.mobile}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.mobileLink} data-active={pathname === link.href || undefined} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileRow}><span className={styles.mobileLink}>Theme</span><ThemeToggle /></div>
          <div className={styles.mobileActions}>
            <Link href={appUrl("/login")} className="mBtn mBtnSecondary" onClick={() => setOpen(false)}>Login</Link>
            <Link href={appUrl("/signup")} className="mBtn mBtnPrimary" onClick={() => setOpen(false)}>Start Free</Link>
          </div>
        </div>
      )}
    </header>
  );
}
