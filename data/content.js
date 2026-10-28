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
    "Welcome to my corner of the internet! Currently, I'm bouncing between Hamilton and Toronto. Go Marauders! You can usually find me pulling an all-nighter debugging my code or soldering my circuits.",

  /* ---------- About ---------- */
  about: {
    photo: "assets/images/me.webp",
    paragraphs: [
      "I'm a Computer Engineer working at the intersection of AI, software and hardware.",
      "I would describe myself as an avid learner, and I'm excited by the new developments coming out of tech every month.",
      "Outside of work, I'm an avid traveller, a skier, and a history buff.",
    ],
    facts: [
      { label: "Born in", value: "Canada" },
      { label: "Studying", value: "Computer Engineering @ McMaster University" },
      { label: "Year", value: "2nd Year" },
      { label: "Graduating", value: "June 2029" },
      { label: "Currently", value: "Going on Side Quests" },
    ],
  },

  /* ---------- Experience (newest first) ----------
     Each role: role, org, dates, location, note (optional), points */
  experience: [
    {
      role: "Backend/Full-Stack Developer",
      org: "McMaster Engineering Society",
      dates: "Jul 2026 — Present",
      location: "Hamilton, Ontario (Remote)",
      points: [
        "Resolved technical bugs and shipped new features across 4 MES web platforms (the MES website, Hatch booking platform, club/team web portal, and Welcome Week portal), built with Next.js, TypeScript, Tailwind CSS, and MongoDB",
        "Managed, debugged, tested, and maintained the 1,174-file codebase behind a university-wide website serving thousands of McMaster Engineering students, ensuring reliability, performance, and up-to-date content",
        "Collaborated with a cross-functional development team using GitHub and Figma, following the software development life cycle through issue tracking, pull-request code reviews, testing, and deployment",
      ],
    },
    {
      role: "Sponsorship Coordinator",
      org: "Google Developer Groups McMaster University",
      dates: "Jul 2026 — Present",
      location: "Hamilton, Ontario (Hybrid)",
      points: [
        "Secured $1,100+ in funding and in-kind assets for a hackathon (Mac-a-Thon, about 1,000 applicants and 250 attendees last year) by cultivating partnerships with companies including Bell, Rogers, and Cloudinary",
        "Negotiated sponsorship packages, deliverables, and event branding directly with corporate sponsors",
        "Coordinated sponsor outreach strategy and relationship management within a 30-person team to grow event funding and resources",
        "Streamlined and automated the sponsor outreach email process with an agentic AI workflow, reaching 100+ sponsors and saving the team 10+ hours",
        "Tracked outreach to 185 sponsor leads by contact, status, and outcome to report progress and prioritize follow-ups",
      ],
    },
    {
      role: "Event Support Contractor",
      org: "Yonge + St. Clair BIA",
      dates: "Jun 2026",
      location: "Toronto, Ontario",
      note: "Midtown Kickoff Festival, June 8 to 15",
      points: [
        "Provided on-site event support over an 8-day contract, assisting with setup, teardown, and equipment logistics for tents, signage, and vendor load-in and load-out",
        "Facilitated attendee wayfinding, crowd flow, and customer service while coordinating with the Event Manager to meet real-time operational needs",
        "Monitored event spaces and reported issues to maintain site safety and cleanliness",
        "Tracked hours worked and submitted an itemized invoice to the BIA for approval and payment",
      ],
    },
    {
      role: "Project Administrator",
      org: "McMaster University",
      dates: "Sep 2025 — Apr 2026",
      location: "Hamilton, Ontario",
      points: [
        "Gathered client requirements and translated them into a technical design, coordinating a 5-person team on a 12-week timeline",
        "Developed and integrated a 458-line Python control program with a 3D-printed robotic end effector, improving grip effectiveness by 40%",
      ],
    },
    {
      role: "Private Tutor",
      org: "Self-Employed",
      dates: "Apr 2024 — Aug 2024",
      location: "Toronto, Ontario",
      points: [
        "Improved academic performance by 10 to 20% across 10+ students through 2-hour weekly sessions in high school STEM subjects, including Calculus, Physics, Advanced Functions, and Java",
        "Worked with underprivileged and at-risk youth groups, providing accessible academic support to students with limited access to tutoring",
      ],
    },
    {
      role: "Youth Group Leadership Team",
      org: "Toronto Renai Church",
      dates: "Jul 2023 — Aug 2024",
      location: "Toronto, Ontario",
      points: [
        "Oversaw and coordinated charity drives and learning initiatives for a youth group of 50+ people",
        "Led and organized major events such as barbeques, biking trips, and retreats",
        "Mentored younger members individually on personal development and goal-setting",
      ],
    },
    {
      role: "Volunteer Coordinator",
      org: "Office of Councillor Lily Cheng",
      dates: "Jun 2022 — Aug 2024",
      location: "Toronto, Ontario",
      points: [
        "Managed a team of 10 volunteers by directing event planning, volunteer training, and community outreach",
        "Organized a campaign to engage youth with municipal politics, reaching 100+ youth through social media and canvassing",
        "Implemented an e-newsletter campaign, collecting 200+ email addresses to extend community involvement",
      ],
    },
    {
      role: "Advertising Representative",
      org: "Goldentrust Development",
      dates: "Mar 2021 — Apr 2022",
      location: "Toronto, Ontario",
      points: [
        "Managed advertising campaigns for prospective clients across real estate development services",
        "Marketed renovation and development services to clients, helping secure a renovation deal valued at $30,000",
      ],
    },
  ],

  /* ---------- Projects ----------
     Each project: title, date, summary, note, points, tags,
     links: [{label, url}], image, video (all optional except title).
     video takes any YouTube link and shows a player at the top of the card.
     gallery is a list of images (in assets/images/projects/) shown below it;
     each is a path, or { src, caption, wide } — caption adds a label underneath,
     wide: true gives the image its own full-width row. */
  projects: {
    software: [
      {
        title: "DianaWebsite",
        date: "Aug 2026",
        summary: "A full-stack portfolio site showcasing architecture, art, photography, and leather work, with a built-in editor so the owner can update it without touching code.",
        video: "https://youtu.be/oZjdPwtlDGE",
        points: [
          "Paired a Next.js and TypeScript front-end with a Node.js and Express REST API on one custom server",
          "Implemented an owner-only CMS across 10 API routes, split into 5 public and 5 owner-only routes, with create, edit, delete, and upload actions protected behind a signed JWT cookie",
          "Persisted site content to a JSON store and uploaded images to disk, keeping data in place across server restarts",
          "Created drag-and-drop image uploads and in-place text editing for the owner",
          "Gave each of 4 categories its own layout, including framed artwork that adapts to image proportions and a step-through viewer for leather projects",
          "Refined layouts, custom icons, and visual styling over 3 months of iterations, and documented setup and content-editing instructions for the owner",
        ],
        tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Node.js", "Express"],
        links: [],
        image: "",
      },
      {
        title: "MediExplain",
        date: "Mar 2026",
        summary: "An AI-powered medical literacy tool that bridges language and knowledge gaps in Canadian healthcare by translating complex medical terminology into plain language across 5+ languages.",
        note: "Deployed on Vercel",
        video: "https://youtu.be/QnfCKmIoZN8",
        gallery: [
          "assets/images/projects/mediexplain-home.jpg",
          "assets/images/projects/mediexplain-medicine.jpg",
        ],
        points: [
          "Architected and built the full front-end in React, implementing 10+ interactive UI elements and a responsive UI/UX for multilingual users",
          "Configured the Node.js back-end and npm dependencies, with 300+ lines of server-side logic connecting the front-end to the Gemini API",
          "Led the Gemini API integration, engineering prompt logic that generates patient-friendly explanations of diagnoses, prescriptions, and medical documents in under 2 seconds",
        ],
        tags: ["React", "JavaScript", "Node.js", "Gemini API", "npm", "Git"],
        links: [],
        image: "",
      },
      {
        title: "ArtMentor AI",
        date: "Feb 2026",
        summary: "An AI-powered app that gives specific, targeted critiques, with both visual and written feedback, on user-submitted artwork.",
        note: "Built at Mac-a-Thon 2026 with the Creative Coders team",
        video: "https://youtu.be/X41NksmMj-Q",
        gallery: [
          "assets/images/projects/artmentor-upload.webp",
          "assets/images/projects/artmentor-feedback.jpg",
        ],
        points: [
          "Integrated native APIs, responsive UI/UX patterns, and full-stack JavaScript for cross-platform use, reducing page load time by 35% across 3+ device form factors",
          "Fulfilled UN SDG 4 project requirements with a solution focused on access to art education, extending access to 100+ underprivileged users",
        ],
        tags: ["JavaScript", "React", "Express", "Gemini API", "HTML", "CSS"],
        links: [],
        image: "",
      },
    ],
    hardware: [
      {
        title: "Low Voltage System",
        date: "Oct 2026",
        summary: "A 2-layer PCB that distributes fused 12 V power, CAN, and Gigabit Ethernet to the controllers and sensors of an autonomous vehicle.",
        gallery: [
          { src: "assets/images/projects/low-voltage-fig6-3d-front.png", caption: "3D Front View", wide: true },
          { src: "assets/images/projects/low-voltage-fig5-3d-rear.png", caption: "3D Rear View", wide: true },
          { src: "assets/images/projects/low-voltage-fig4-top-layer.png", caption: "Top Layer" },
          { src: "assets/images/projects/low-voltage-fig3-bottom-layer.png", caption: "Bottom Layer" },
          { src: "assets/images/projects/low-voltage-fig2-placement.png", caption: "Component Placement Before Routing", wide: true },
        ],
        points: [
          "Designed and routed the board in EasyEDA Pro with ground pours and a clean design rule check",
          "Sized power traces to each branch fuse rating, from 32 mil at 2 A to 110 mil at 5 A, and routed CAN and Gigabit Ethernet links across both layers",
          "Mapped the data flow of 7 devices, including a LiDAR, a PoE camera, and a motor inverter, specifying each protocol (CAN at 500 kbps, TCP/UDP over Ethernet, PWM) and its destination controller",
          "Co-developed the source schematic on a 3-person team, specifying fuses and wire gauges for 7 loads drawing 76 A worst-case from a 12 V battery behind a 100 A main fuse",
          "Iterated the schematic through 3 revisions with a colour-coded legend for power and data, labelling voltage, fuse, and wire gauge on every branch",
          "Co-developed a 14-item bill of materials totalling $4,211 CAD, identifying one part as 71% of the cost",
          "Presented the design, costs, trade-offs, and lessons learned in a formal report and 16-slide presentation",
        ],
        tags: ["EasyEDA Pro", "PCB Layout", "Schematic Capture", "CAN Bus", "Ethernet", "Cost Analysis"],
        links: [],
        image: "",
      },
    ],
  },

  /* ---------- Stack (grouped skills and tools) ---------- */
  stack: [
    { group: "Programming Languages", items: ["Python", "Java", "C", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"] },
    { group: "Frameworks & Libraries", items: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "NumPy", "Arduino"] },
    { group: "Databases & Cloud", items: ["MongoDB", "Google Cloud Platform", "Microsoft Azure", "AWS"] },
    { group: "AI & Data", items: ["LLM Integration (Gemini API)", "Prompt Engineering", "Agentic AI Workflows", "Data Analysis"] },
    { group: "Hardware & Embedded", items: ["PCB Design", "Schematic Capture", "CAN Bus", "Ethernet (TCP/UDP)", "PWM", "Raspberry Pi", "FPGA (DE10-Lite)"] },
    { group: "Design & Lab Tools", items: ["EasyEDA Pro", "Quartus", "Analog Discovery 3", "WaveForms", "Autodesk Inventor", "PrusaSlicer", "3D Printing", "Figma", "Canva"] },
    { group: "Developer Tools", items: ["Git", "GitHub", "npm", "Linux", "IntelliJ", "Eclipse", "Cursor", "REST APIs", "JWT Authentication"] },
    { group: "UI/UX Design", items: ["UI/UX Design", "Responsive Design", "Prototyping", "Design Documentation"] },
    { group: "Core Concepts", items: ["Data Structures & Algorithms", "Performance Optimization", "Enterprise Network Infrastructure & Firewall", "Internet Fundamentals", "AI Agent Fundamentals"] },
    { group: "Business & Analysis", items: ["Cost Analysis", "Reporting", "Requirements Gathering", "Process Automation", "Stakeholder Communication", "Software Development Life Cycle"] },
    { group: "Office & Productivity", items: ["Microsoft Word", "Excel", "PowerPoint", "Outlook", "SharePoint", "Google Workspace"] },
    { group: "Languages Spoken", items: ["English", "Mandarin"] },
  ],

  /* ---------- Certificates ----------
     Each: name, issuer, date, url, image (all optional except name).
     Put certificate images in assets/images/certificates/. */
  certificates: [
    { name: "Generative AI: Working with Large Language Models", issuer: "LinkedIn", date: "", url: "", image: "assets/images/certificates/generative-ai-linkedin.jpg" },
    { name: "Agentic AI: Build Your First Agentic AI System", issuer: "LinkedIn", date: "", url: "", image: "assets/images/certificates/agentic-ai-linkedin.jpg" },
    { name: "General Certification", issuer: "McMaster Thode Makerspace", date: "", url: "" },
    { name: "FIT Certificate for Software Design and Development", issuer: "Information and Communications Technology Council (ICTC)", date: "", url: "" },
  ],

  /* ---------- Awards (same fields as certificates) ---------- */
  awards: [
    { name: "Faculty of Engineering Award of Excellence Entrance Scholarship ($3,000)", issuer: "McMaster University", date: "", url: "" },
    { name: "Ontario Scholar", issuer: "TDSB", date: "", url: "" },
    { name: "Certificates of Distinction, Waterloo Math", issuer: "University of Waterloo", date: "", url: "" },
    { name: "Letter of Appreciation", issuer: "Office of Councillor Lily Cheng", date: "", url: "" },
  ],

  /* ---------- Contact ---------- */
  contact: {
    blurb: "The best way to reach me is by email. I'm also on the platforms below.",
    links: [
      { label: "Email", value: "joshuas2407@gmail.com", url: "mailto:joshuas2407@gmail.com" },
      { label: "LinkedIn", value: "linkedin.com/in/joshua-si-10a46b380", url: "https://www.linkedin.com/in/joshua-si-10a46b380" },
      { label: "GitHub", value: "github.com/joshuas2407-lgtm", url: "https://github.com/joshuas2407-lgtm" },
    ],
  },

  /* ---------- Resume ----------
     Drop your PDF in assets/resume/ and put its path here, e.g.
     file: "assets/resume/resume.pdf". Leave "" to show a placeholder. */
  resume: {
    file: "assets/resume/Joshua_Si_Resume.pdf",
    updated: "",
  },
};
