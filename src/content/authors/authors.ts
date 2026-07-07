import type { Author } from "@/lib/blog/types";

/**
 * Author registry, keyed by id. Reuses the same real founders listed on
 * /about (src/lib/marketing/team.ts) so blog bylines match the team page —
 * no invented personas.
 */
export const AUTHORS: Author[] = [
  {
    id: "sara-siddiqui",
    name: "Sara Siddiqui",
    role: "Founder & CEO, Sarion",
    bio: "Builds Sarion after years spent watching agencies duct-tape their operations together from spreadsheets and inboxes.",
    avatar: "SS",
  },
  {
    id: "alia-siddiqui",
    name: "Alia Siddiqui",
    role: "Co-Founder & Marketing Officer, Sarion",
    bio: "Writes about agency growth and client management from conversations with Sarion's own customers.",
    avatar: "AS",
  },
  {
    id: "ubayy-salman",
    name: "Ubayy Salman",
    role: "Co-Founder & Managing Director, Sarion",
    bio: "Focuses on the operational side of running an agency — systems, process, and delivery.",
    avatar: "US",
  },
];

export function getAuthorById(id: string): Author | undefined {
  return AUTHORS.find((a) => a.id === id);
}
