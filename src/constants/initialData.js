// Resume default data and presets

export const BLANK_RESUME_DATA = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    photoUrl: ""
  },
  summary: "",
  education: [],
  projects: [],
  experience: [],
  skills: [],
  certifications: [],
  customization: {
    template: "swiss",
    accentColor: "#2563eb",
    fontFamily: "geist",
    fontSize: "medium",
    spacingDensity: "balanced"
  }
};

export const SAMPLE_STUDENT_DATA = {
  personalInfo: {
    fullName: "Aryan Sharma",
    jobTitle: "1st Year BSc.IT Student & Web Developer",
    email: "aryan.sharma.dev@gmail.com",
    phone: "+91 98201 45892",
    location: "Mumbai, India",
    website: "https://aryansharma.dev",
    github: "github.com/aryansharma-dev",
    linkedin: "linkedin.com/in/aryan-sharma-it",
    photoUrl: ""
  },
  summary: "Enthusiastic 1st Year BSc.IT student with solid foundations in C++, JavaScript, React, and MySQL. Passionate about responsive web design, problem solving, and building practical software tools. Seeking a frontend or software development internship to apply academic learnings and contribute to real-world projects.",
  education: [
    {
      id: "edu-1",
      institution: "St. Xavier's College (Autonomous), Mumbai",
      degree: "Bachelor of Science in Information Technology (B.Sc. IT)",
      fieldOfStudy: "Information Technology",
      startDate: "2024",
      endDate: "2027",
      honors: "First Year · Current SGPA: 8.9 / 10",
      coursework: "Imperative Programming (C++), Web Programming (HTML5/CSS3/JS), Database Management Systems (MySQL), Discrete Mathematics, Computer Organization"
    },
    {
      id: "edu-2",
      institution: "Bhavan's College, Mumbai",
      degree: "Higher Secondary Certificate (HSC - 12th)",
      fieldOfStudy: "Science with Information Technology",
      startDate: "2022",
      endDate: "2024",
      honors: "Scored 88.5% with Distinction in IT",
      coursework: "Physics, Chemistry, Mathematics, Information Technology"
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "CampusConnect - Student Notes & Notice Portal",
      role: "Lead Developer",
      liveUrl: "https://campusconnect-demo.vercel.app",
      githubUrl: "github.com/aryansharma-dev/campus-connect",
      bullets: [
        "Built a responsive college resource portal where 150+ classmates can download semester lecture notes and view upcoming assignment deadlines.",
        "Created an intuitive search and subject filter allowing students to find semester question papers in under 3 seconds.",
        "Designed mobile-friendly layouts with Tailwind CSS, ensuring clean rendering across Android and iOS smartphones."
      ],
      technologies: ["React", "JavaScript", "Tailwind CSS", "Vite", "LocalStorage"]
    },
    {
      id: "proj-2",
      name: "WeatherNow - Live Forecast Dashboard",
      role: "Solo Creator",
      liveUrl: "https://weathernow-live.vercel.app",
      githubUrl: "github.com/aryansharma-dev/weathernow",
      bullets: [
        "Developed a clean single-page weather dashboard consuming the OpenWeatherMap REST API to display temperature, humidity, and 5-day forecasts.",
        "Added location autocomplete, Celsius/Fahrenheit toggle, and offline error handling.",
        "Implemented a smooth dark mode theme honoring system preferences."
      ],
      technologies: ["JavaScript (ES6)", "Fetch API", "HTML5", "CSS3"]
    },
    {
      id: "proj-3",
      name: "BookNest - Console Library Manager",
      role: "Academic Mini-Project",
      liveUrl: "",
      githubUrl: "github.com/aryansharma-dev/booknest-cpp",
      bullets: [
        "Programmed a modular library management system in C++ using Object-Oriented Programming (OOP) concepts like classes, inheritance, and file streams.",
        "Enabled issuing, returning, and tracking book inventory across 500+ records with zero memory leaks."
      ],
      technologies: ["C++", "File Handling", "OOP Concepts", "Data Structures"]
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "WebSparks Tech",
      role: "Web Development Intern",
      location: "Remote / Mumbai",
      startDate: "May 2024",
      endDate: "July 2024",
      isCurrent: false,
      bullets: [
        "Assisted in developing and testing 4 responsive client landing pages using HTML, CSS, JavaScript, and Bootstrap.",
        "Refactored navigation headers and contact forms, improving mobile usability scores on Google Lighthouse from 74 to 96.",
        "Collaborated with senior developers through Git version control, pull requests, and weekly sprint reviews."
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Git", "GitHub"]
    },
    {
      id: "exp-2",
      company: "College IT Association & Tech Fest",
      role: "Technical Team Member",
      location: "Mumbai",
      startDate: "Aug 2024",
      endDate: "Present",
      isCurrent: true,
      bullets: [
        "Co-designed the registration webpage for the annual college tech fest, handling registrations for 300+ students from 12 colleges.",
        "Helped conduct hands-on laboratory workshops on Web Development Fundamentals and Git for junior students."
      ],
      techStack: ["Event Management", "HTML/CSS", "Google Forms", "Student Coordination"]
    }
  ],
  skills: [
    {
      id: "skill-1",
      categoryName: "Programming Languages",
      items: ["C++", "JavaScript (ES6+)", "Python (Basics)", "C"]
    },
    {
      id: "skill-2",
      categoryName: "Web Technologies",
      items: ["HTML5", "CSS3", "React", "Tailwind CSS", "Bootstrap", "REST APIs"]
    },
    {
      id: "skill-3",
      categoryName: "Databases & Tools",
      items: ["MySQL", "SQLite", "Git", "GitHub", "VS Code", "Vite", "Figma Basics"]
    },
    {
      id: "skill-4",
      categoryName: "Core Concepts",
      items: ["Data Structures", "Object-Oriented Programming (OOP)", "Responsive Web Design", "Debugging"]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Responsive Web Design Certification",
      issuer: "freeCodeCamp",
      issueDate: "2024",
      url: "freecodecamp.org/certification/aryan-sharma"
    },
    {
      id: "cert-2",
      name: "Programming in C++ Fundamentals",
      issuer: "Spoken Tutorial (IIT Bombay)",
      issueDate: "2024",
      url: "spoken-tutorial.org"
    },
    {
      id: "cert-3",
      name: "SQL & Relational Databases Basics",
      issuer: "Coursera",
      issueDate: "2024",
      url: "coursera.org"
    }
  ],
  customization: {
    template: "swiss",
    accentColor: "#2563eb", // Electric Cobalt
    fontFamily: "geist",
    spacingDensity: "balanced",
    paperSize: "a4",
    sectionOrder: ["summary", "education", "skills", "projects", "experience", "certifications"]
  }
};

export const INITIAL_RESUME_DATA = BLANK_RESUME_DATA;

export const ACCENT_PRESETS = [
  { name: "Electric Cobalt", value: "#2563eb", bgClass: "bg-blue-600" },
  { name: "Forest Emerald", value: "#059669", bgClass: "bg-emerald-600" },
  { name: "Titanium Slate", value: "#475569", bgClass: "bg-slate-600" },
  { name: "Crimson Rust", value: "#dc2626", bgClass: "bg-red-600" },
  { name: "Deep Indigo", value: "#4f46e5", bgClass: "bg-indigo-600" },
  { name: "Warm Amber", value: "#d97706", bgClass: "bg-amber-600" },
];

export const FONT_PRESETS = [
  { id: "geist", name: "Geist & Geist Mono", subtitle: "Clean & Modern", fontClass: "font-sans" },
  { id: "jakarta", name: "Plus Jakarta Sans", subtitle: "Readable & Fresh", fontClass: "font-['Plus_Jakarta_Sans',sans-serif]" },
  { id: "outfit", name: "Outfit & Sans", subtitle: "Modern Geometric", fontClass: "font-['Outfit',sans-serif]" },
  { id: "cormorant", name: "Cormorant Garamond", subtitle: "Classic Academic Serif", fontClass: "font-['Cormorant_Garamond',serif]" },
];

export const ROLE_PRESETS = [
  {
    title: "1st Year BSc.IT Student (Sample)",
    summary: "Ideal for college students highlighting academic coursework, C++, Python, web projects, and college tech fest activities.",
    data: SAMPLE_STUDENT_DATA
  },
  {
    title: "Junior Web Developer Fresher",
    summary: "Focused on frontend skills, React, JavaScript, responsive UI projects, and internship experience.",
    data: {
      ...SAMPLE_STUDENT_DATA,
      personalInfo: {
        ...SAMPLE_STUDENT_DATA.personalInfo,
        fullName: "Pooja Kulkarni",
        jobTitle: "Junior Frontend Developer (Fresher)",
        email: "pooja.kulkarni.dev@gmail.com"
      },
      summary: "Aspiring Frontend Developer and BSc.IT student with hands-on practice building clean, component-based user interfaces in React and Tailwind CSS. Eager to contribute to frontend development teams and build user-friendly web products.",
      projects: [
        {
          id: "proj-p1",
          name: "TaskTrack - Kanban Productivity App",
          role: "Solo Developer",
          liveUrl: "https://tasktrack-demo.netlify.app",
          githubUrl: "github.com/poojak/tasktrack",
          bullets: [
            "Created an interactive drag-and-drop task board with React state management and local storage persistence.",
            "Designed accessible modals, priority tags, and category filters for organizing daily college and work tasks."
          ],
          technologies: ["React", "Tailwind CSS", "JavaScript", "HTML5"]
        },
        {
          id: "proj-p2",
          name: "Portfolio Website & Blog",
          role: "Developer & Designer",
          liveUrl: "https://poojakulkarni.dev",
          githubUrl: "github.com/poojak/portfolio",
          bullets: [
            "Designed and coded a fast personal portfolio website scoring 98+ on Google Lighthouse performance.",
            "Included a tech blog section explaining beginner JavaScript and data structure concepts."
          ],
          technologies: ["Vite", "React", "CSS Modules", "GitHub Pages"]
        }
      ]
    }
  },
  {
    title: "IT Support & Database Trainee",
    summary: "Tailored for IT roles focusing on MySQL queries, hardware/networking basics, troubleshooting, and Python automation.",
    data: {
      ...SAMPLE_STUDENT_DATA,
      personalInfo: {
        ...SAMPLE_STUDENT_DATA.personalInfo,
        fullName: "Rahul Nair",
        jobTitle: "IT Trainee & Database Enthusiast",
        email: "rahul.nair.it@gmail.com"
      },
      summary: "First Year BSc.IT student with keen interest in Database Management Systems (SQL), networking fundamentals, and Python scripting. Strong troubleshooting ability and eager to assist IT operations and software support teams.",
      skills: [
        {
          id: "skill-r1",
          categoryName: "Databases & Querying",
          items: ["MySQL", "SQL Queries", "Database Normalization (1NF, 2NF, 3NF)", "ER Diagrams"]
        },
        {
          id: "skill-r2",
          categoryName: "Operating Systems & Networking",
          items: ["Windows Server Basics", "Linux Terminal Commands", "TCP/IP Fundamentals", "Hardware Troubleshooting"]
        },
        {
          id: "skill-r3",
          categoryName: "Scripting & Programming",
          items: ["Python", "C++", "Bash Scripting Basics", "Git"]
        }
      ]
    }
  }
];

export const POWER_VERBS = [
  "Developed", "Built", "Created", "Implemented", "Designed", "Programmed",
  "Organized", "Optimized", "Assisted", "Configured", "Collaborated", "Maintained",
  "Tested", "Coordinated", "Refactored", "Solved", "Automated", "Documented"
];
