import Image from "next/image";
import type { TeamMember } from "@/lib/marketing/team";
import styles from "./team-card.module.css";

export function TeamCard({ name, title, bio, linkedin, image }: TeamMember) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image src={image} alt={name} fill sizes="56px" className={styles.avatarImg} />
      </div>
      <div className={styles.body}>
        <p className={styles.name}>{name}</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.bio}>{bio}</p>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedin}
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
