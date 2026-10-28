/* =====================================================================
   SITE CONTENT
   ---------------------------------------------------------------------
   This is the only file you need to edit to update the website.
   Add, remove or reorder items in any list below and refresh the page.
   Every field is optional unless noted — leave it out or set it to ""
   and that part simply won't show.
   ===================================================================== */

window.SITE = {
  /* ---------- Basics ---------- */
  name: "Joshua Si",
  tagline: "Engineer · Builder · Tinkerer",
  intro:
    "Welcome to my corner of the internet. I design and build things across hardware and software. Swipe, use the arrow keys, or pick a page from the bar above to look around.",

  /* ---------- About ---------- */
  about: {
    photo: "assets/images/me.webp",
    paragraphs: [
      "Hello, viewer! I'm a Computer Engineer working at the intersection of AI, software and hardware.",
      "I would describe myself as an avid learner, and I'm excited by the new developments coming out of tech every month.",
      "Outside of work, I'm an avid traveller, a skier, and a history buff.",
    ],
    facts: [
      { label: "Born in", value: "Canada" },
      { label: "Builds", value: "Software & Hardware" },
      { label: "Currently", value: "Going on Side Quests" },
    ],
  },

  /* ---------- Experience (newest first) ---------- */
  experience: [
    {
      role: "Job Title",
      org: "Company Name",
      dates: "2025 — Present",
      location: "City, Country",
      points: [
        "What you did and the impact it had.",
        "Another accomplishment, ideally with a number in it.",
      ],
    },
    {
      role: "Previous Role",
      org: "Another Organization",
      dates: "2024 — 2025",
      location: "Remote",
      points: ["Describe your responsibilities here."],
    },
  ],

  /* ---------- Projects ----------
     Each project: title, summary, tags, links: [{label, url}], image (optional) */
  projects: {
    software: [
      {
        title: "Software Project One",
        summary: "A short description of what it does and why you built it.",
        tags: ["Python", "React"],
        links: [{ label: "GitHub", url: "https://github.com/" }],
        image: "",
      },
      {
        title: "Software Project Two",
        summary: "Another project. Swap this text for the real thing.",
        tags: ["TypeScript", "Node.js"],
        links: [],
        image: "",
      },
    ],
    hardware: [
      {
        title: "Hardware Project One",
        summary: "A board, robot, or gadget you designed. Mention the key parts.",
        tags: ["PCB Design", "STM32"],
        links: [],
        image: "",
      },
      {
        title: "Hardware Project Two",
        summary: "Another build — sensors, CAD, firmware, whatever it involved.",
        tags: ["Arduino", "3D Printing"],
        links: [],
        image: "",
      },
    ],
  },

  /* ---------- Stack (grouped tech you use) ---------- */
  stack: [
    { group: "Languages", items: ["Python", "C / C++", "JavaScript", "TypeScript"] },
    { group: "Frameworks", items: ["React", "Node.js", "Flask"] },
    { group: "Hardware & EDA", items: ["KiCad", "Arduino", "Raspberry Pi", "Oscilloscopes"] },
    { group: "Tools", items: ["Git", "Linux", "Docker", "VS Code"] },
  ],

  /* ---------- Certificates ---------- */
  certificates: [
    {
      name: "Certificate Name",
      issuer: "Issuing Organization",
      date: "2025",
      url: "", // link to credential (optional)
    },
    {
      name: "Another Certificate",
      issuer: "Issuer",
      date: "2024",
      url: "",
    },
  ],

  /* ---------- Contact ---------- */
  contact: {
    blurb: "The best way to reach me is by email. I'm also on the platforms below.",
    links: [
      { label: "Email", value: "you@example.com", url: "mailto:you@example.com" },
      { label: "LinkedIn", value: "linkedin.com/in/yourname", url: "https://www.linkedin.com/" },
      { label: "GitHub", value: "github.com/yourname", url: "https://github.com/" },
    ],
  },

  /* ---------- Resume ----------
     Drop your PDF in assets/resume/ and put its path here, e.g.
     file: "assets/resume/resume.pdf". Leave "" to show a placeholder. */
  resume: {
    file: "",
    updated: "",
  },
};
