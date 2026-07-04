"use client";

import { useEffect, useState } from "react";

import styles from "./sticky-buy-button.module.css";

export function StickyBuyButton({
  name,
  price,
  checkoutUrl,
}: {
  name: string;
  price: number;
  checkoutUrl: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 640);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>${price}</span>
      </div>
      <a
        href={checkoutUrl}
        className="mBtn mBtnPrimary mBtnLg"
        tabIndex={visible ? undefined : -1}
      >
        Get Instant Access
      </a>
    </div>
  );
}
