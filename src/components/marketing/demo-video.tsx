"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DEMO_VIDEO_SRC,
  DEMO_VIDEO_EMBED_URL,
  DEMO_VIDEO_THUMBNAIL,
} from "@/lib/marketing/demo-video";
import styles from "./demo-video.module.css";

const hasVideo = Boolean(DEMO_VIDEO_EMBED_URL || DEMO_VIDEO_SRC);

export function DemoVideo() {
  const [open, setOpen] = useState(false);

  return (
    <div id="demo" className={styles.wrapper}>
      <button
        type="button"
        className={styles.thumbnail}
        onClick={() => setOpen(true)}
        disabled={!hasVideo}
        aria-label={hasVideo ? "Play the Sarion demo video" : "Demo video coming soon"}
      >
        <Image
          src={DEMO_VIDEO_THUMBNAIL}
          alt="Preview of the Sarion dashboard"
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          className={styles.thumbnailImage}
        />
        <span className={styles.playButton}>
          <Play aria-hidden="true" fill="currentColor" />
        </span>
        {!hasVideo && <span className={styles.comingSoon}>Demo coming soon</span>}
      </button>

      {hasVideo && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className={styles.dialogContent}>
            <DialogTitle className="sr-only">Sarion product demo</DialogTitle>
            {open && (
              <div className={styles.videoFrame}>
                {DEMO_VIDEO_EMBED_URL ? (
                  <iframe
                    src={DEMO_VIDEO_EMBED_URL}
                    title="Sarion product demo"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={DEMO_VIDEO_SRC!}
                    title="Sarion product demo"
                    controls
                    autoPlay
                    playsInline
                  />
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
