export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "course" | "video" | "article" | "tool" | "book" | "practice";
  platform: string;
  free: boolean;
  skillIds: string[];
}

export const resources: ResourceItem[] = [
  {
    id: "cs50",
    title: "CS50: Introduction to Computer Science",
    description: "Harvard's legendary intro to CS. Covers C, Python, SQL, web development. The gold standard for beginners.",
    url: "https://cs50.harvard.edu",
    type: "course",
    platform: "Harvard/edX",
    free: true,
    skillIds: ["programming-fundamentals", "web-development"]
  },
  {
    id: "freecodecamp",
    title: "freeCodeCamp Full Curriculum",
    description: "Complete web development curriculum with projects and certifications. HTML, CSS, JavaScript, React, Node.js.",
    url: "https://www.freecodecamp.org/learn",
    type: "course",
    platform: "freeCodeCamp",
    free: true,
    skillIds: ["web-development", "react-frontend", "node-backend", "programming-fundamentals"]
  },
  {
    id: "the-odin-project",
    title: "The Odin Project",
    description: "Full-stack web development curriculum. Project-based learning with HTML, CSS, JavaScript, Ruby on Rails.",
    url: "https://www.theodinproject.com",
    type: "course",
    platform: "The Odin Project",
    free: true,
    skillIds: ["web-development", "react-frontend", "node-backend"]
  },
  {
    id: "khan-academy",
    title: "Khan Academy",
    description: "Free courses on math, science, computing, economics. Perfect for building foundations.",
    url: "https://www.khanacademy.org",
    type: "course",
    platform: "Khan Academy",
    free: true,
    skillIds: ["statistics", "biology-fundamentals", "chemistry-medical"]
  },
  {
    id: "coursera-free",
    title: "Coursera Free Courses",
    description: "University courses from Stanford, Michigan, Google. Audit for free, pay only for certificates.",
    url: "https://www.coursera.org/courses?query=free",
    type: "course",
    platform: "Coursera",
    free: true,
    skillIds: ["machine-learning", "python-data", "statistics", "data-visualization"]
  },
  {
    id: "youtube-corey",
    title: "Corey Schafer YouTube",
    description: "Best Python tutorials on YouTube. Clear, comprehensive, and beginner-friendly.",
    url: "https://www.youtube.com/c/Coreyms",
    type: "video",
    platform: "YouTube",
    free: true,
    skillIds: ["python-data", "programming-fundamentals"]
  },
  {
    id: "youtube-traversy",
    title: "Traversy Media YouTube",
    description: "Web development tutorials. Crash courses on React, Node.js, and modern frameworks.",
    url: "https://www.youtube.com/c/TraversyMedia",
    type: "video",
    platform: "YouTube",
    free: true,
    skillIds: ["web-development", "react-frontend", "node-backend"]
  },
  {
    id: "neetcode",
    title: "NeetCode Roadmap",
    description: "Structured DSA problem-solving roadmap. Best for coding interview preparation.",
    url: "https://neetcode.io/roadmap",
    type: "practice",
    platform: "NeetCode",
    free: true,
    skillIds: ["data-structures-algorithms"]
  },
  {
    id: "tryhackme",
    title: "TryHackMe",
    description: "Learn cybersecurity through hands-on labs. Guided paths from beginner to advanced.",
    url: "https://tryhackme.com",
    type: "practice",
    platform: "TryHackMe",
    free: true,
    skillIds: ["security-tools", "linux-fundamentals", "networking-fundamentals"]
  },
  {
    id: "google-digital-garage",
    title: "Google Digital Garage",
    description: "Free digital marketing course from Google. Covers SEO, SEM, social media, analytics.",
    url: "https://learndigital.withgoogle.com/digitalgarage",
    type: "course",
    platform: "Google",
    free: true,
    skillIds: ["digital-marketing"]
  },
  {
    id: "hubspot-academy",
    title: "HubSpot Academy",
    description: "Free marketing, sales, and service courses. Industry-recognized certifications.",
    url: "https://academy.hubspot.com/courses",
    type: "course",
    platform: "HubSpot",
    free: true,
    skillIds: ["digital-marketing", "analytics"]
  },
  {
    id: "canva-design-school",
    title: "Canva Design School",
    description: "Free design tutorials. Learn graphic design basics, color theory, typography.",
    url: "https://www.canva.com/learn/",
    type: "course",
    platform: "Canva",
    free: true,
    skillIds: ["design-principles", "adobe-tools"]
  },
  {
    id: "figma-tutorials",
    title: "Figma Official Tutorials",
    description: "Learn Figma from the creators. UI design, prototyping, design systems.",
    url: "https://help.figma.com/hc/en-us/categories/900000136166-Learn",
    type: "article",
    platform: "Figma",
    free: true,
    skillIds: ["figma", "prototyping", "ui-design"]
  },
  {
    id: "aws-free",
    title: "AWS Cloud Practitioner Essentials",
    description: "Free cloud computing course from Amazon. Understand AWS services and cloud basics.",
    url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials",
    type: "course",
    platform: "AWS",
    free: true,
    skillIds: ["aws-cloud"]
  },
  {
    id: "docker-getting-started",
    title: "Docker Getting Started",
    description: "Official Docker tutorial. Build, share, and run containers.",
    url: "https://docs.docker.com/get-started/",
    type: "article",
    platform: "Docker",
    free: true,
    skillIds: ["docker-containers"]
  },
  {
    id: "git-branching",
    title: "Learn Git Branching",
    description: "Interactive Git tutorial. Learn branching, merging, rebasing visually.",
    url: "https://learngitbranching.js.org",
    type: "tool",
    platform: "Learn Git Branching",
    free: true,
    skillIds: ["git-version-control"]
  },
  {
    id: "osmosis",
    title: "Osmosis Medical Education",
    description: "Medical education videos. Anatomy, physiology, pharmacology explained visually.",
    url: "https://www.osmosis.org",
    type: "video",
    platform: "Osmosis",
    free: true,
    skillIds: ["biology-fundamentals", "anatomy-nursing", "pharmacology"]
  },
  {
    id: "ncert-textbooks",
    title: "NCERT Textbooks (Free)",
    description: "Official Indian school textbooks. Free PDFs for all subjects and classes.",
    url: "https://ncert.nic.in/textbook.php",
    type: "article",
    platform: "NCERT",
    free: true,
    skillIds: ["upsc-preparation", "subject-knowledge"]
  },
  {
    id: "startup-school",
    title: "Y Combinator Startup School",
    description: "Free course from the world's top startup accelerator. Learn how to build a startup.",
    url: "https://www.startupschool.org",
    type: "course",
    platform: "Y Combinator",
    free: true,
    skillIds: ["business-model", "product-development"]
  },
  {
    id: "daresolve-free",
    title: "DaVinci Resolve (Free Video Editor)",
    description: "Professional video editing software used in Hollywood. Free version is incredibly powerful.",
    url: "https://www.blackmagicdesign.com/products/davinciresolve",
    type: "tool",
    platform: "Blackmagic",
    free: true,
    skillIds: ["editing-fundamentals", "color-grading"]
  },
  {
    id: "kaggle-learn",
    title: "Kaggle Learn",
    description: "Hands-on micro-courses on Python, ML, SQL, and data visualization. Learn by doing with real datasets.",
    url: "https://www.kaggle.com/learn",
    type: "course",
    platform: "Kaggle",
    free: true,
    skillIds: ["python-data", "machine-learning", "sql-data", "data-visualization"]
  },
  {
    id: "github-learning-lab",
    title: "GitHub Skills",
    description: "Interactive courses that teach Git and GitHub by having you complete real tasks on GitHub.",
    url: "https://skills.github.com",
    type: "course",
    platform: "GitHub",
    free: true,
    skillIds: ["git-version-control"]
  },
  {
    id: "mit-ocw",
    title: "MIT OpenCourseWare",
    description: "Free course materials from MIT. Algorithms, linear algebra, probability — the CS/math foundation.",
    url: "https://ocw.mit.edu",
    type: "course",
    platform: "MIT",
    free: true,
    skillIds: ["data-structures-algorithms", "statistics", "machine-learning"]
  },
  {
    id: "stanford-online",
    title: "Stanford Online (free courses)",
    description: "Free courses from Stanford. Machine learning, algorithms, databases — taught by world-class faculty.",
    url: "https://online.stanford.edu/free-courses",
    type: "course",
    platform: "Stanford",
    free: true,
    skillIds: ["machine-learning", "data-structures-algorithms", "databases"]
  },
  {
    id: "nptel",
    title: "IIT NPTEL",
    description: "Free courses from IIT professors. Computer science, engineering, and management subjects.",
    url: "https://nptel.ac.in",
    type: "course",
    platform: "NPTEL/IIT",
    free: true,
    skillIds: ["data-structures-algorithms", "thermodynamics", "structural-analysis", "cad-design"]
  },
  {
    id: "google-career-certs",
    title: "Google Career Certificates (Coursera)",
    description: "Professional certificates in Data Analytics, IT Support, Project Management, UX Design, Cybersecurity.",
    url: "https://www.coursera.org/professional-certificates/google",
    type: "course",
    platform: "Google/Coursera",
    free: true,
    skillIds: ["data-visualization", "digital-marketing", "design-thinking", "security-tools"]
  },
  {
    id: "microsoft-learn",
    title: "Microsoft Learn",
    description: "Free interactive learning paths for Azure, Power Platform, Microsoft 365, and more.",
    url: "https://learn.microsoft.com",
    type: "course",
    platform: "Microsoft",
    free: true,
    skillIds: ["aws-cloud", "docker-containers", "kubernetes"]
  },
  {
    id: "aws-training",
    title: "AWS Skill Builder",
    description: "Free digital training from AWS. Cloud fundamentals, hands-on labs, and exam prep.",
    url: "https://explore.skillbuilder.aws",
    type: "course",
    platform: "AWS",
    free: true,
    skillIds: ["aws-cloud"]
  },
  {
    id: "docker-training",
    title: "Docker Official Training",
    description: "Free self-paced courses from Docker. Containers, Compose, and Docker Hub.",
    url: "https://www.docker.com/training/",
    type: "course",
    platform: "Docker",
    free: true,
    skillIds: ["docker-containers"]
  },
  {
    id: "kubernetes-training",
    title: "Kubernetes Official Tutorials",
    description: "Free tutorials from the Kubernetes project. Get started, interactive tutorials, and best practices.",
    url: "https://kubernetes.io/docs/tutorials/",
    type: "article",
    platform: "Kubernetes",
    free: true,
    skillIds: ["kubernetes"]
  },
  {
    id: "figma-community",
    title: "Figma Community",
    description: "Free UI kits, templates, and design resources from the Figma community. Learn by studying others' work.",
    url: "https://www.figma.com/community",
    type: "practice",
    platform: "Figma",
    free: true,
    skillIds: ["figma", "ui-design", "prototyping"]
  },
  {
    id: "canva-design-school",
    title: "Canva Design School Tutorials",
    description: "Step-by-step tutorials on branding, social media design, and visual communication.",
    url: "https://www.canva.com/designschool/",
    type: "course",
    platform: "Canva",
    free: true,
    skillIds: ["design-principles", "adobe-tools"]
  },
  {
    id: "blender-tutorials",
    title: "Blender Guru (YouTube)",
    description: "Best free 3D modeling and animation tutorials. Start with the famous Donut series.",
    url: "https://www.youtube.com/@BlenderGuruOfficial",
    type: "video",
    platform: "YouTube",
    free: true,
    skillIds: ["editing-fundamentals", "color-grading"]
  },
  {
    id: "unity-learn",
    title: "Unity Learn",
    description: "Free courses on game development with Unity. From beginner to advanced.",
    url: "https://learn.unity.com",
    type: "course",
    platform: "Unity",
    free: true,
    skillIds: ["programming-fundamentals", "design-principles"]
  },
  {
    id: "freecodecamp-youtube",
    title: "freeCodeCamp YouTube Channel",
    description: "Full-length programming courses on YouTube. Python, JavaScript, machine learning, and more.",
    url: "https://www.youtube.com/@freecodecamp",
    type: "video",
    platform: "YouTube",
    free: true,
    skillIds: ["python-data", "machine-learning", "web-development", "data-visualization"]
  }
];

export function getResourcesForSkill(skillId: string): ResourceItem[] {
  return resources.filter((r) => r.skillIds.includes(skillId));
}

export function getResourcesByType(type: ResourceItem["type"]): ResourceItem[] {
  return resources.filter((r) => r.type === type);
}
