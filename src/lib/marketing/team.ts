export interface TeamMember {
  name: string;
  initials: string;
  title: string;
  bio: string;
  linkedin: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Sara Siddiqui",
    initials: "SS",
    title: "Founder & CEO",
    bio: "Focused on building software that helps agencies operate more efficiently.",
    linkedin: "https://www.linkedin.com/in/sana-arif-8b791b214/",
  },
  {
    name: "Alia Siddiqui",
    initials: "AS",
    title: "Co-Founder & Marketing Officer",
    bio: "Leads marketing strategy and ensures Sarion reaches the agencies that need it most.",
    linkedin: "https://www.linkedin.com/in/rifah-arif-9076a1326/",
  },
  {
    name: "Ubayy Salman",
    initials: "US",
    title: "Co-Founder & Managing Director",
    bio: "Oversees operations and keeps the business running smoothly day to day.",
    linkedin: "https://www.linkedin.com/in/ubayy-salman-61a242303/",
  },
];
