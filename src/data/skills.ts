export type SkillGroup = { category: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "Security",
    skills: [
      "Threat Modeling",
      "Incident Response",
      "Network Security",
      "Penetration Testing",
      "Zero Trust Architecture",
      "SIEM & Log Analysis",
    ],
  },
  {
    category: "Systems & Infra",
    skills: [
      "Linux Administration",
      "Homelab / Self-Hosting",
      "Docker & Containers",
      "Networking (VLANs, Firewalls)",
      "Proxmox / Virtualization",
      "Backup & Disaster Recovery",
    ],
  },
  {
    category: "Development",
    skills: ["TypeScript", "Python", "Astro & React", "Bash Scripting", "CI/CD"],
  },
  {
    category: "Islamic Studies",
    skills: ["Aqeedah", "Fiqh", "Tazkiyah", "Arabic (in progress)"],
  },
];
