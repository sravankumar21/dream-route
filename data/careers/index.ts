export interface Resource {
  title: string;
  url: string;
  type: "course" | "video" | "article" | "book" | "tool" | "practice";
  platform: string;
  free: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  whyItMatters: string;
  projects: string[];
  resources: Resource[];
  estimatedTime: string;
  prerequisites: string[];
  successCriteria: string;
  difficulty: "easy" | "medium" | "hard";
  marketDemand: "high" | "medium" | "low";
}

export interface Career {
  id: string;
  title: string;
  slug: string;
  icon: string;
  category: "technology" | "medical" | "business" | "creative" | "government" | "engineering";
  shortDescription: string;
  description: string;
  dayInLife: string;
  salaryRange: {
    entry: string;
    mid: string;
    senior: string;
    source: string;
  };
  growthOutlook: string;
  educationRequired: string;
  keyCompanies: string[];
  interviewProcess: string;
  pros: string[];
  cons: string[];
  relatedCareers: string[];
  workLifeBalance: number;
  stressLevel: number;
  creativeFreedom: number;
  jobSecurity: number;
  remoteWork: number;
  skills: Skill[];
}

export const careers: Career[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    slug: "software-engineer",
    icon: "monitor",
    category: "technology",
    shortDescription: "Build software products, apps, and systems that millions use",
    description: "Software engineers design, develop, and maintain software applications. They write code, solve complex problems, and build products that power everything from mobile apps to large-scale systems. This is one of the most in-demand careers globally with excellent pay and remote work opportunities.",
    dayInLife: "Morning: Standup meeting with team, review pull requests. Mid-morning: Design a new feature, write code for an API endpoint. Afternoon: Debug an issue reported by users, pair program with a teammate. Late afternoon: Write tests, update documentation, deploy to staging. Evening: Read tech articles, contribute to open source.",
    salaryRange: {
      entry: "4-8 LPA",
      mid: "12-25 LPA",
      senior: "30-60+ LPA",
      source: "AmbitionBox/Glassdoor 2026"
    },
    growthOutlook: "Very High. India's IT sector is projected to reach $350B by 2026. Remote work widely available. Global opportunities.",
    educationRequired: "B.Tech CS / BCA / B.Sc CS / Self-taught with strong portfolio",
    keyCompanies: ["Google", "Microsoft", "Amazon", "Flipkart", "Razorpay", "Zoho", "TCS", "Infosys", "Wipro"],
    interviewProcess: "2-4 rounds: Online assessment (DSA + aptitude) → Technical interviews (2-3 rounds, coding + system design) → HR round",
    pros: ["High salary", "Remote work options", "Global opportunities", "Creative problem solving", "Continuous learning"],
    cons: ["Rapid skill obsolescence", "Tight deadlines possible", "Screen fatigue", "On-call rotations in some roles"],
    relatedCareers: ["data-scientist", "cloud-devops-engineer", "cybersecurity-analyst", "ui-ux-designer"],
    workLifeBalance: 4,
    stressLevel: 3,
    creativeFreedom: 4,
    jobSecurity: 4,
    remoteWork: 5,
    skills: [
      {
        id: "programming-fundamentals",
        name: "Programming Fundamentals",
        level: "beginner",
        whyItMatters: "Foundation of all software development. Without this, nothing else works.",
        projects: ["Build a calculator app", "Create a to-do list application", "Build a temperature converter"],
        resources: [
          { title: "CS50: Introduction to Computer Science", url: "https://cs50.harvard.edu", type: "course", platform: "Harvard/edX", free: true },
          { title: "Python for Everybody", url: "https://www.py4e.com", type: "course", platform: "University of Michigan", free: true },
          { title: "freeCodeCamp - JavaScript Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", type: "course", platform: "freeCodeCamp", free: true },
          { title: "Programming with Mosh - Python", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can write programs to solve problems, use variables, loops, functions, and basic data structures",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "data-structures-algorithms",
        name: "Data Structures & Algorithms",
        level: "intermediate",
        whyItMatters: "Interviews test this heavily. More importantly, it teaches you to write efficient code.",
        projects: ["Implement a linked list", "Build a pathfinding visualizer", "Solve 50 LeetCode problems"],
        resources: [
          { title: "Data Structures and Algorithms Specialization", url: "https://www.coursera.org/specializations/data-structures-algorithms", type: "course", platform: "Coursera", free: true },
          { title: "NeetCode Roadmap", url: "https://neetcode.io/roadmap", type: "article", platform: "NeetCode", free: true },
          { title: "Abdul Bari Algorithms", url: "https://www.youtube.com/playlist?list=0IAPfL1eTyw", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["programming-fundamentals"],
        successCriteria: "You can solve medium LeetCode problems in under 20 minutes and explain time/space complexity",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "web-development",
        name: "Web Development (HTML/CSS/JS)",
        level: "beginner",
        whyItMatters: "Most software jobs involve web technologies. This is the entry point.",
        projects: ["Build a personal portfolio website", "Clone a popular website homepage", "Build a weather dashboard"],
        resources: [
          { title: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", type: "course", platform: "freeCodeCamp", free: true },
          { title: "The Odin Project", url: "https://www.theodinproject.com", type: "course", platform: "The Odin Project", free: true },
          { title: "Web Dev Simplified", url: "https://www.youtube.com/c/WebDevSimplified", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["programming-fundamentals"],
        successCriteria: "You can build a responsive website from a design mockup using HTML, CSS, and JavaScript",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "react-frontend",
        name: "React / Frontend Framework",
        level: "intermediate",
        whyItMatters: "React is used by 40%+ of web developers. Most frontend jobs require it.",
        projects: ["Build a movie search app with API", "Create a blog with React", "Build an expense tracker"],
        resources: [
          { title: "React Official Tutorial", url: "https://react.dev/learn", type: "article", platform: "React", free: true },
          { title: "freeCodeCamp React Course", url: "https://www.freecodecamp.org/learn/front-end-development-libraries/", type: "course", platform: "freeCodeCamp", free: true },
          { title: "Traversy Media React Crash Course", url: "https://www.youtube.com/watch?v=LDB4uaJ87e0", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: ["web-development", "programming-fundamentals"],
        successCriteria: "You can build a single-page application with routing, state management, and API integration",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "node-backend",
        name: "Node.js / Backend Development",
        level: "intermediate",
        whyItMatters: "Full-stack developers are more valuable. Backend skills let you build complete products.",
        projects: ["Build a REST API for a blog", "Create a chat application", "Build an authentication system"],
        resources: [
          { title: "Node.js and Express.js Full Course", url: "https://www.youtube.com/watch?v=Oe421EPiBEg", type: "video", platform: "YouTube", free: true },
          { title: "The Odin Project - NodeJS", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs", type: "course", platform: "The Odin Project", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: ["web-development", "programming-fundamentals"],
        successCriteria: "You can build and deploy a REST API with authentication, database integration, and error handling",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "git-version-control",
        name: "Git & Version Control",
        level: "beginner",
        whyItMatters: "Every team uses Git. You can't work professionally without it.",
        projects: ["Contribute to an open-source project", "Build a project with proper Git workflow", "Create and manage branches for features"],
        resources: [
          { title: "Git & GitHub Crash Course", url: "https://www.youtube.com/watch?v=SWYqp7iY_Tc", type: "video", platform: "YouTube", free: true },
          { title: "Learn Git Branching", url: "https://learngitbranching.js.org", type: "tool", platform: "Learn Git Branching", free: true }
        ],
        estimatedTime: "1-2 weeks",
        prerequisites: [],
        successCriteria: "You can manage branches, resolve merge conflicts, and collaborate on a team repository",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "databases",
        name: "Databases (SQL + NoSQL)",
        level: "intermediate",
        whyItMatters: "Every application stores data. Understanding databases is non-negotiable.",
        projects: ["Design a database for an e-commerce site", "Build a CRUD app with MongoDB", "Write complex SQL queries for analytics"],
        resources: [
          { title: "SQL for Beginners", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", type: "video", platform: "YouTube", free: true },
          { title: "MongoDB University", url: "https://university.mongodb.com", type: "course", platform: "MongoDB", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["programming-fundamentals"],
        successCriteria: "You can design normalized schemas, write complex queries, and choose the right database for a use case",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "testing-qa",
        name: "Testing & Quality Assurance",
        level: "intermediate",
        whyItMatters: "Code without tests is a liability. Testing skills differentiate junior from mid-level engineers.",
        projects: ["Write unit tests for an existing project", "Set up CI/CD with automated testing", "Perform integration testing on an API"],
        resources: [
          { title: "Testing JavaScript with Jest", url: "https://www.youtube.com/watch?v=7Ka2rEhfe2s", type: "video", platform: "YouTube", free: true },
          { title: "Testing Best Practices", url: "https://www.freecodecamp.org/news/testing-and-why-you-should-do-it/", type: "article", platform: "freeCodeCamp", free: true }
        ],
        estimatedTime: "3-4 weeks",
        prerequisites: ["programming-fundamentals", "web-development"],
        successCriteria: "You can write unit, integration, and end-to-end tests with good coverage",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "system-design",
        name: "System Design & Architecture",
        level: "advanced",
        whyItMatters: "Senior roles require designing scalable systems. This is what separates architects from coders.",
        projects: ["Design a URL shortener like bit.ly", "Design a chat system like WhatsApp", "Design a news feed like Twitter"],
        resources: [
          { title: "System Design Interview Course", url: "https://www.youtube.com/playlist?list=PLTCrU96G3Eic2Ygy_cKwOewbs-w_uqPFM", type: "video", platform: "YouTube", free: true },
          { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "article", platform: "GitHub", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["databases", "node-backend", "programming-fundamentals"],
        successCriteria: "You can design a scalable system with load balancing, caching, database sharding, and API design",
        difficulty: "hard",
        marketDemand: "high"
      },
      {
        id: "devops-basics",
        name: "DevOps Basics (CI/CD, Docker)",
        level: "intermediate",
        whyItMatters: "Understanding deployment pipelines makes you a more complete engineer. You ship faster and more reliably.",
        projects: ["Set up GitHub Actions for a project", "Dockerize a Node.js app", "Deploy to a cloud platform"],
        resources: [
          { title: "Docker Tutorial for Beginners", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo", type: "video", platform: "YouTube", free: true },
          { title: "GitHub Actions Tutorial", url: "https://www.youtube.com/watch?v=R8_veQiYBjI", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["programming-fundamentals"],
        successCriteria: "You can containerize an app and set up automated deployment pipelines",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    slug: "data-scientist",
    icon: "bar-chart-3",
    category: "technology",
    shortDescription: "Extract insights from data to drive business decisions",
    description: "Data scientists analyze large datasets to find patterns, build predictive models, and help organizations make data-driven decisions. They combine statistics, programming, and domain knowledge to solve real-world problems.",
    dayInLife: "Morning: Check model performance metrics from overnight runs. Mid-morning: Clean and preprocess a new dataset from the marketing team. Afternoon: Build a classification model to predict customer churn. Late afternoon: Present findings to stakeholders with visualizations. Evening: Read research papers on new ML techniques.",
    salaryRange: {
      entry: "6-12 LPA",
      mid: "15-30 LPA",
      senior: "35-70+ LPA",
      source: "AmbitionBox/Glassdoor 2026"
    },
    growthOutlook: "Very High. Data-driven decision making is now standard across all industries. AI/ML adoption accelerating.",
    educationRequired: "B.Tech/B.Sc in CS/Math/Stats or equivalent + online certifications",
    keyCompanies: ["Google", "Amazon", "Microsoft", "Flipkart", "Swiggy", "Razorpay", "MuSigma", "Fractal Analytics"],
    interviewProcess: "3-4 rounds: Statistics + SQL test → Python/ML coding → Case study + dataset analysis → HR round",
    pros: ["High salary", "Intellectually stimulating", "High demand", "Cross-industry opportunities"],
    cons: ["Messy data takes 80% of time", "Model deployment can be frustrating", "Requires continuous learning"],
    relatedCareers: ["software-engineer", "cloud-devops-engineer"],
    workLifeBalance: 4,
    stressLevel: 3,
    creativeFreedom: 4,
    jobSecurity: 5,
    remoteWork: 4,
    skills: [
      {
        id: "python-data",
        name: "Python for Data Science",
        level: "beginner",
        whyItMatters: "Python is the #1 language for data science. Pandas, NumPy, and Matplotlib are essential.",
        projects: ["Exploratory data analysis on a real dataset", "Build a data cleaning pipeline", "Create 10 different visualizations from one dataset"],
        resources: [
          { title: "Python for Data Science, AI & Development", url: "https://www.coursera.org/learn/python-for-applied-data-science-ai", type: "course", platform: "Coursera/IBM", free: true },
          { title: "Kaggle Python Course", url: "https://www.kaggle.com/learn/python", type: "course", platform: "Kaggle", free: true },
          { title: "Corey Schafer Python Tutorials", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can load, clean, analyze, and visualize data using Pandas, NumPy, and Matplotlib",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "statistics",
        name: "Statistics & Probability",
        level: "beginner",
        whyItMatters: "Data science is applied statistics. Without this, you're just running code without understanding.",
        projects: ["Analyze A/B test results", "Build a probability calculator", "Perform hypothesis testing on real data"],
        resources: [
          { title: "Statistics with Python Specialization", url: "https://www.coursera.org/specializations/statistics-with-python", type: "course", platform: "Coursera/University of Michigan", free: true },
          { title: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability", type: "course", platform: "Khan Academy", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: [],
        successCriteria: "You can explain p-values, confidence intervals, and perform hypothesis tests correctly",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "machine-learning",
        name: "Machine Learning Basics",
        level: "intermediate",
        whyItMatters: "ML is the core of modern data science. Understanding algorithms separates analysts from scientists.",
        projects: ["Build a house price predictor", "Create a sentiment analysis model", "Build a recommendation system"],
        resources: [
          { title: "Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning", type: "course", platform: "Coursera/Stanford", free: true },
          { title: "Kaggle Intro to ML", url: "https://www.kaggle.com/learn/intro-to-machine-learning", type: "course", platform: "Kaggle", free: true },
          { title: "StatQuest ML playlist", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["python-data", "statistics"],
        successCriteria: "You can train, evaluate, and tune ML models for classification and regression tasks",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "data-visualization",
        name: "Data Visualization",
        level: "beginner",
        whyItMatters: "Insights are useless if you can't communicate them. Visualizations tell the story.",
        projects: ["Build an interactive dashboard", "Create a data story from a public dataset", "Design a visualization for a news article"],
        resources: [
          { title: "Data Visualization with Python", url: "https://www.coursera.org/learn/python-for-data-visualization", type: "course", platform: "Coursera", free: true },
          { title: "Tableau Public (Free)", url: "https://public.tableau.com", type: "tool", platform: "Tableau", free: true }
        ],
        estimatedTime: "3-4 weeks",
        prerequisites: ["python-data"],
        successCriteria: "You can create interactive dashboards and tell compelling data stories",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "sql-data",
        name: "SQL for Data Analysis",
        level: "beginner",
        whyItMatters: "Data lives in databases. SQL is how you access and analyze it.",
        projects: ["Analyze e-commerce sales data", "Build a dashboard with SQL queries", "Write complex window functions"],
        resources: [
          { title: "SQL for Data Science", url: "https://www.coursera.org/learn/sql-for-data-science", type: "course", platform: "Coursera", free: true },
          { title: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "article", platform: "Mode", free: true }
        ],
        estimatedTime: "3-4 weeks",
        prerequisites: [],
        successCriteria: "You can write complex queries with joins, window functions, and subqueries",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "deep-learning",
        name: "Deep Learning",
        level: "advanced",
        whyItMatters: "Neural networks power modern AI. This is where the field is headed.",
        projects: ["Build an image classifier with CNN", "Create a text generator with RNN", "Build a sentiment analysis model with transformers"],
        resources: [
          { title: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning", type: "course", platform: "Coursera/DeepLearning.AI", free: true },
          { title: "fast.ai Practical Deep Learning", url: "https://course.fast.ai", type: "course", platform: "fast.ai", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: ["machine-learning", "python-data", "statistics"],
        successCriteria: "You can build, train, and deploy neural networks for computer vision and NLP tasks",
        difficulty: "hard",
        marketDemand: "high"
      },
      {
        id: "nlp",
        name: "Natural Language Processing",
        level: "advanced",
        whyItMatters: "Text data is everywhere. NLP skills let you build chatbots, sentiment analyzers, and language models.",
        projects: ["Build a chatbot", "Create a document summarizer", "Build a sentiment analysis API"],
        resources: [
          { title: "NLP Specialization", url: "https://www.coursera.org/specializations/natural-language-processing", type: "course", platform: "Coursera", free: true },
          { title: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course", type: "course", platform: "Hugging Face", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["deep-learning", "machine-learning"],
        successCriteria: "You can build NLP pipelines, fine-tune language models, and deploy NLP applications",
        difficulty: "hard",
        marketDemand: "high"
      },
      {
        id: "big-data",
        name: "Big Data Technologies",
        level: "advanced",
        whyItMatters: "When datasets are too large for a single machine, you need distributed computing.",
        projects: ["Process a 1GB+ dataset with PySpark", "Build a data pipeline with Airflow", "Analyze clickstream data with Spark"],
        resources: [
          { title: "Big Data Specialization", url: "https://www.coursera.org/specializations/big-data", type: "course", platform: "Coursera/UCSD", free: true },
          { title: "Apache Spark Tutorial", url: "https://www.youtube.com/watch?v=7k4yDKmO5_Q", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["python-data", "databases"],
        successCriteria: "You can process and analyze large-scale datasets using distributed computing frameworks",
        difficulty: "hard",
        marketDemand: "medium"
      }
    ]
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    slug: "ui-ux-designer",
    icon: "palette",
    category: "technology",
    shortDescription: "Design beautiful, user-friendly digital experiences",
    description: "UI/UX designers create the look, feel, and usability of websites and apps. They research user needs, create wireframes and prototypes, and ensure products are both beautiful and easy to use.",
    dayInLife: "Morning: Review user feedback from last week's feature release. Mid-morning: Conduct user interviews to understand pain points. Afternoon: Create wireframes for a new onboarding flow in Figma. Late afternoon: Prototype micro-interactions and test with users. Evening: Study design trends, update design system.",
    salaryRange: {
      entry: "4-8 LPA",
      mid: "10-20 LPA",
      senior: "25-50+ LPA",
      source: "AmbitionBox/Glassdoor 2026"
    },
    growthOutlook: "High. Every digital product needs good design. Demand growing with Indian startup ecosystem.",
    educationRequired: "Design degree / bootcamp / Self-taught with strong portfolio",
    keyCompanies: ["Google", "Microsoft", "Flipkart", "Zomato", "PhonePe", "Razorpay", "Freshworks"],
    interviewProcess: "2-4 rounds: Portfolio review → Design challenge (take-home or live) → UX discussion → Culture fit",
    pros: ["Creative work", "Direct impact on users", "Good salary", "Portfolio speaks louder than degrees"],
    cons: ["Subjective feedback", "Tight deadlines", "Can be repetitive if not challenged"],
    relatedCareers: ["software-engineer", "graphic-designer", "content-creator"],
    workLifeBalance: 4,
    stressLevel: 2,
    creativeFreedom: 5,
    jobSecurity: 4,
    remoteWork: 4,
    skills: [
      {
        id: "design-thinking",
        name: "Design Thinking & UX Research",
        level: "beginner",
        whyItMatters: "Design without research is guesswork. Understanding users is the foundation.",
        projects: ["Conduct user interviews for a local business", "Create user personas for an app", "Run a usability test and document findings"],
        resources: [
          { title: "Google UX Design Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design", type: "course", platform: "Coursera/Google", free: true },
          { title: "IDEO U Design Thinking", url: "https://www.ideo.org/tools", type: "article", platform: "IDEO", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can conduct user research, create personas, and map user journeys",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "figma",
        name: "Figma (UI Design Tool)",
        level: "beginner",
        whyItMatters: "Figma is the industry standard for UI design. Most teams use it daily.",
        projects: ["Redesign a popular app's homepage", "Create a design system from scratch", "Design a mobile app UI kit"],
        resources: [
          { title: "Figma Tutorial for Beginners", url: "https://www.youtube.com/watch?v=jwCmIBJ8Jtc", type: "video", platform: "YouTube/Figma", free: true },
          { title: "Figma Official Learning", url: "https://help.figma.com/hc/en-us/categories/900000136166-Learn", type: "article", platform: "Figma", free: true }
        ],
        estimatedTime: "3-4 weeks",
        prerequisites: [],
        successCriteria: "You can design complete UI mockups, use auto-layout, and create interactive prototypes",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "ui-design",
        name: "Visual Design Principles",
        level: "beginner",
        whyItMatters: "Color, typography, spacing — these make the difference between amateur and professional.",
        projects: ["Create a color palette for a brand", "Design 3 different layouts for the same page", "Build a typography scale system"],
        resources: [
          { title: "Design Principles Course", url: "https://www.youtube.com/playlist?list=PLILLSK9nMUhiQmGiglSraRz_eh1SPB9Zt", type: "video", platform: "YouTube", free: true },
          { title: "Refactoring UI", url: "https://www.refactoringui.com", type: "book", platform: "Refactoring UI", free: false }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can create visually polished designs with proper hierarchy, contrast, and alignment",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "prototyping",
        name: "Prototyping & Interaction Design",
        level: "intermediate",
        whyItMatters: "Static mockups aren't enough. Prototypes let you test ideas before building.",
        projects: ["Prototype a complete app flow", "Create micro-interaction animations", "Build an interactive prototype for user testing"],
        resources: [
          { title: "Figma Prototyping Tutorial", url: "https://www.youtube.com/watch?v=3q3lFaUqjbs", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "3-4 weeks",
        prerequisites: ["figma"],
        successCriteria: "You can create interactive prototypes that simulate real product behavior",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "user-research",
        name: "User Research Methods",
        level: "intermediate",
        whyItMatters: "Knowing which research method to use and when is what separates good designers from great ones.",
        projects: ["Conduct a usability study with 5 users", "Create a survey and analyze results", "Build a research repository"],
        resources: [
          { title: "User Research Course", url: "https://www.youtube.com/playlist?list=PLILLSK9nMUih01IZh21V8ZzRv3u1r2Jl4", type: "video", platform: "YouTube", free: true },
          { title: "NNGroup Research Methods", url: "https://www.nngroup.com/articles/", type: "article", platform: "NNGroup", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["design-thinking"],
        successCriteria: "You can plan and conduct various types of user research and synthesize findings into insights",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "design-systems",
        name: "Design Systems",
        level: "advanced",
        whyItMatters: "Design systems ensure consistency across products. Senior designers need to build and maintain them.",
        projects: ["Build a component library in Figma", "Document design tokens", "Create a style guide for a product"],
        resources: [
          { title: "Design Systems Course", url: "https://www.youtube.com/playlist?list=PLILLSK9nMUiiq9k3u2Wr7RlYfuJ-DmRII", type: "video", platform: "YouTube", free: true },
          { title: "Design Systems Repo", url: "https://designsystemsrepo.com", type: "article", platform: "Design Systems Repo", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: ["figma", "ui-design"],
        successCriteria: "You can build and maintain a design system with components, tokens, and documentation",
        difficulty: "hard",
        marketDemand: "medium"
      }
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    slug: "cybersecurity-analyst",
    icon: "shield",
    category: "technology",
    shortDescription: "Protect systems and data from cyber threats",
    description: "Cybersecurity analysts monitor, detect, and respond to security incidents. They protect organizations from hackers, malware, and data breaches. With cyberattacks increasing 300% since 2020, this is one of the fastest-growing tech careers.",
    dayInLife: "Morning: Review overnight security alerts and SIEM dashboards. Mid-morning: Investigate a phishing attempt reported by an employee. Afternoon: Run vulnerability scans on new deployments, write detection rules. Late afternoon: Update incident response documentation. Evening: Research new threat intelligence, practice CTF challenges.",
    salaryRange: {
      entry: "5-10 LPA",
      mid: "12-25 LPA",
      senior: "30-60+ LPA",
      source: "AmbitionBox/Glassdoor 2026"
    },
    growthOutlook: "Very High. 50,000+ unfilled SOC positions in India. Every company needs security.",
    educationRequired: "B.Tech CS / BCA / Cybersecurity certifications (CEH, CompTIA Security+)",
    keyCompanies: ["TCS", "Infosys", "Wipro", "Deloitte", "EY", "KPMG", "Quick Heal", "Lucideus"],
    interviewProcess: "3-4 rounds: Technical MCQ + practical test → Security scenario discussion → Tool demonstration → HR round",
    pros: ["Very high demand", "Good salary", "Critical work", "Never boring", "Government opportunities"],
    cons: ["High stress during incidents", "On-call responsibilities", "Rapidly evolving threats", "Certification costs"],
    relatedCareers: ["software-engineer", "cloud-devops-engineer"],
    workLifeBalance: 3,
    stressLevel: 4,
    creativeFreedom: 3,
    jobSecurity: 5,
    remoteWork: 3,
    skills: [
      {
        id: "networking-fundamentals",
        name: "Networking Fundamentals",
        level: "beginner",
        whyItMatters: "You can't secure what you don't understand. Networking is the foundation of cybersecurity.",
        projects: ["Set up a home lab with virtual machines", "Analyze network traffic with Wireshark", "Configure a firewall ruleset"],
        resources: [
          { title: "Computer Networking Full Course", url: "https://www.youtube.com/watch?v=IPvYjXqTJBs", type: "video", platform: "YouTube", free: true },
          { title: "Cisco Networking Academy", url: "https://www.netacad.com", type: "course", platform: "Cisco", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: [],
        successCriteria: "You can explain the OSI model, configure network devices, and analyze traffic",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "linux-fundamentals",
        name: "Linux & Command Line",
        level: "beginner",
        whyItMatters: "Most servers run Linux. Security tools are built for Linux. Command line is non-negotiable.",
        projects: ["Set up a Linux server", "Write bash scripts for automation", "Harden a Linux installation"],
        resources: [
          { title: "Linux Full Course", url: "https://www.youtube.com/watch?v=sWbUDq4S6Y8", type: "video", platform: "YouTube", free: true },
          { title: "OverTheWire Bandit", url: "https://overthewire.org/wargames/bandit/", type: "tool", platform: "OverTheWire", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can navigate the command line, write scripts, and manage Linux systems",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "security-tools",
        name: "Security Tools (SIEM, Nmap, Burp Suite)",
        level: "intermediate",
        whyItMatters: "These are the tools of the trade. You need hands-on experience to be effective.",
        projects: ["Set up a SIEM lab (Splunk/ELK)", "Scan a network with Nmap and document findings", "Find and report a vulnerability on a practice target"],
        resources: [
          { title: "TryHackMe (Free Rooms)", url: "https://tryhackme.com", type: "tool", platform: "TryHackMe", free: true },
          { title: "Hack The Box (Free Tier)", url: "https://www.hackthebox.com", type: "tool", platform: "Hack The Box", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["networking-fundamentals", "linux-fundamentals"],
        successCriteria: "You can use SIEM, Nmap, and Burp Suite to detect and analyze security issues",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "python-scripting",
        name: "Python for Security",
        level: "intermediate",
        whyItMatters: "Automation is key in security. Python lets you build tools, analyze malware, and automate repetitive tasks.",
        projects: ["Build a port scanner", "Create a network traffic analyzer", "Write a phishing email detector"],
        resources: [
          { title: "Python for Cybersecurity Specialization", url: "https://www.coursera.org/specializations/python-for-cybersecurity", type: "course", platform: "Coursera", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["linux-fundamentals"],
        successCriteria: "You can write Python scripts for security automation and analysis",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "cloud-devops-engineer",
    title: "Cloud/DevOps Engineer",
    slug: "cloud-devops-engineer",
    icon: "cloud",
    category: "technology",
    shortDescription: "Build and manage cloud infrastructure and deployment pipelines",
    description: "Cloud/DevOps engineers bridge development and operations. They build infrastructure, automate deployments, and ensure applications run reliably at scale. Cloud security roles have grown 3x since 2022.",
    dayInLife: "Morning: Review system health dashboards, check for any incidents overnight. Mid-morning: Set up CI/CD pipeline for a new microservice. Afternoon: Optimize cloud costs, right-size EC2 instances. Late afternoon: Containerize an application with Docker, deploy to Kubernetes. Evening: Automate infrastructure with Terraform.",
    salaryRange: {
      entry: "6-12 LPA",
      mid: "15-30 LPA",
      senior: "35-70+ LPA",
      source: "AmbitionBox/Glassdoor 2026"
    },
    growthOutlook: "Very High. Cloud adoption accelerating. 40-60% salary premium over general engineering roles.",
    educationRequired: "B.Tech CS/IT + Cloud certifications (AWS/Azure/GCP)",
    keyCompanies: ["Amazon (AWS)", "Microsoft (Azure)", "Google (GCP)", "Flipkart", "Razorpay", "PhonePe"],
    interviewProcess: "3-4 rounds: Linux + networking MCQ → Cloud scenario questions → Infrastructure as code demo → HR round",
    pros: ["Very high salary", "High demand", "Remote-friendly", "Critical role"],
    cons: ["On-call responsibilities", "High pressure during outages", "Rapidly changing tools"],
    relatedCareers: ["software-engineer", "cybersecurity-analyst"],
    workLifeBalance: 3,
    stressLevel: 4,
    creativeFreedom: 3,
    jobSecurity: 5,
    remoteWork: 5,
    skills: [
      {
        id: "linux-networking",
        name: "Linux & Networking",
        level: "beginner",
        whyItMatters: "Cloud infrastructure runs on Linux. Networking knowledge is essential for troubleshooting.",
        projects: ["Set up a Linux server on a VM", "Configure networking between two VMs", "Write shell scripts for automation"],
        resources: [
          { title: "Linux Full Course", url: "https://www.youtube.com/watch?v=sWbUDq4S6Y8", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can manage Linux systems and troubleshoot network issues",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "docker-containers",
        name: "Docker & Containers",
        level: "beginner",
        whyItMatters: "Containers are the standard for deploying applications. Every DevOps role requires Docker.",
        projects: ["Dockerize a Node.js application", "Create a multi-container app with Docker Compose", "Build a custom Docker image"],
        resources: [
          { title: "Docker Tutorial for Beginners", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo", type: "video", platform: "YouTube", free: true },
          { title: "Docker Official Tutorial", url: "https://docs.docker.com/get-started/", type: "article", platform: "Docker", free: true }
        ],
        estimatedTime: "3-4 weeks",
        prerequisites: ["linux-networking"],
        successCriteria: "You can containerize applications and manage multi-container environments",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "aws-cloud",
        name: "AWS Cloud Fundamentals",
        level: "intermediate",
        whyItMatters: "AWS has 32% cloud market share. Most DevOps roles require AWS knowledge.",
        projects: ["Deploy a static website on S3", "Set up an EC2 instance with a web server", "Create a CI/CD pipeline with CodePipeline"],
        resources: [
          { title: "AWS Cloud Practitioner", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials", type: "course", platform: "AWS", free: true },
          { title: "AWS Free Tier Hands-On", url: "https://www.youtube.com/watch?v=SOTamWNgDKc", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: ["linux-networking"],
        successCriteria: "You can deploy and manage applications on AWS with appropriate services",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "kubernetes",
        name: "Kubernetes",
        level: "intermediate",
        whyItMatters: "Kubernetes is the standard for container orchestration. Senior DevOps roles require it.",
        projects: ["Deploy a microservices app on Minikube", "Set up horizontal pod autoscaling", "Create a Kubernetes monitoring stack"],
        resources: [
          { title: "Kubernetes Tutorial for Beginners", url: "https://www.youtube.com/watch?v=X48VuDVv4do", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: ["docker-containers"],
        successCriteria: "You can deploy, manage, and scale applications on Kubernetes",
        difficulty: "hard",
        marketDemand: "high"
      },
      {
        id: "terraform-iac",
        name: "Infrastructure as Code (Terraform)",
        level: "intermediate",
        whyItMatters: "Manual infrastructure is error-prone. IaC makes infrastructure reproducible and version-controlled.",
        projects: ["Create a VPC with Terraform", "Build a reusable Terraform module", "Set up a complete environment with Terraform"],
        resources: [
          { title: "Terraform Tutorial for Beginners", url: "https://www.youtube.com/watch?v=SLB_c_ayRMo", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["aws-cloud"],
        successCriteria: "You can define and manage cloud infrastructure as code",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "product-manager",
    title: "Product Manager",
    slug: "product-manager",
    icon: "clipboard-list",
    category: "technology",
    shortDescription: "Bridge between business, design, and engineering to build the right product",
    description: "Product managers define what to build and why. They understand user needs, prioritize features, work with designers and engineers, and ensure the product delivers business value. It's one of the most impactful roles in tech.",
    dayInLife: "Morning: Review product metrics dashboards, check user feedback. Mid-morning: Prioritize features for next sprint with engineering lead. Afternoon: Conduct user research interviews, analyze competitor products. Late afternoon: Write PRD (Product Requirements Document) for new feature. Evening: Read industry blogs, attend product community meetups.",
    salaryRange: {
      entry: "8-15 LPA",
      mid: "18-35 LPA",
      senior: "40-80+ LPA",
      source: "AmbitionBox/Glassdoor 2026"
    },
    growthOutlook: "Very High. Every tech company needs PMs. Indian startups increasingly hiring for this role.",
    educationRequired: "Engineering/MBA degree or equivalent experience + product thinking",
    keyCompanies: ["Google", "Microsoft", "Amazon", "Flipkart", "Zomato", "PhonePe", "Razorpay"],
    interviewProcess: "3-5 rounds: Product sense case study → Analytical thinking → Strategy discussion → Execution plan → HR round",
    pros: ["High impact on product direction", "Cross-functional work", "High salary", "Good career growth"],
    cons: ["High responsibility without authority", "Lots of meetings", "Stressful during launches", "Ambiguity is constant"],
    relatedCareers: ["software-engineer", "ui-ux-designer", "marketing-manager"],
    workLifeBalance: 3,
    stressLevel: 4,
    creativeFreedom: 4,
    jobSecurity: 4,
    remoteWork: 3,
    skills: [
      {
        id: "product-thinking",
        name: "Product Thinking & Strategy",
        level: "beginner",
        whyItMatters: "Understanding what to build and why is the core of product management.",
        projects: ["Write a PRD for a feature you use daily", "Analyze a product's business model", "Create a product roadmap for a startup idea"],
        resources: [
          { title: "Product Management Course", url: "https://www.youtube.com/playlist?list=PL2qHrRmQ91EKEU7X99f7KsKbQJZ8hy1R5", type: "video", platform: "YouTube", free: true },
          { title: "Y Combinator Product Management", url: "https://www.ycombinator.com/library/", type: "article", platform: "Y Combinator", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can analyze products, identify user needs, and define feature requirements",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "data-analysis",
        name: "Data Analysis for PMs",
        level: "beginner",
        whyItMatters: "PMs make decisions based on data. SQL and basic analytics are essential.",
        projects: ["Analyze user funnel data with SQL", "Create a product metrics dashboard", "Run an A/B test analysis"],
        resources: [
          { title: "SQL for Product Managers", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", type: "video", platform: "YouTube", free: true },
          { title: "Product Metrics Course", url: "https://www.productschool.com/blog/product-management-101/product-metrics/", type: "article", platform: "Product School", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can write SQL queries, understand product metrics, and make data-driven decisions",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "user-research-pm",
        name: "User Research for PMs",
        level: "intermediate",
        whyItMatters: "Understanding users is what separates good PMs from great ones.",
        projects: ["Conduct 10 user interviews", "Create a user journey map", "Build a research repository"],
        resources: [
          { title: "User Research Methods", url: "https://www.nngroup.com/articles/which-ux-research-methods/", type: "article", platform: "NNGroup", free: true }
        ],
        estimatedTime: "3-4 weeks",
        prerequisites: ["product-thinking"],
        successCriteria: "You can plan and conduct user research and synthesize findings into product decisions",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "roadmapping",
        name: "Roadmapping & Prioritization",
        level: "intermediate",
        whyItMatters: "Prioritization is the most important PM skill. You can't build everything.",
        projects: ["Create a product roadmap using RICE scoring", "Prioritize features using MoSCoW method", "Build a stakeholder communication plan"],
        resources: [
          { title: "Product Roadmap Course", url: "https://www.youtube.com/watch?v=QW9M8aF1g3s", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "2-3 weeks",
        prerequisites: ["product-thinking"],
        successCriteria: "You can prioritize features using frameworks and communicate the roadmap to stakeholders",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    slug: "ai-ml-engineer",
    icon: "bot",
    category: "technology",
    shortDescription: "Build intelligent systems that learn from data",
    description: "AI/ML engineers build machine learning models and deploy them into production. They bridge the gap between data science research and production systems. This is one of the fastest-growing roles in tech.",
    dayInLife: "Morning: Check model performance in production, review overnight predictions. Mid-morning: Train a new model with updated data. Afternoon: Optimize model inference latency, deploy to production. Late afternoon: Write data pipelines, monitor model drift. Evening: Read research papers on new architectures.",
    salaryRange: {
      entry: "8-15 LPA",
      mid: "20-40 LPA",
      senior: "50-100+ LPA",
      source: "AmbitionBox/Glassdoor 2026"
    },
    growthOutlook: "Very High. AI adoption exploding across all industries. Severe talent shortage.",
    educationRequired: "B.Tech CS/EE/Math + Strong programming + ML knowledge",
    keyCompanies: ["Google", "Microsoft", "Amazon", "Flipkart", "Razorpay", "Fractal Analytics", "Samsung"],
    interviewProcess: "4-5 rounds: Coding (DSA) → ML fundamentals → System design for ML → ML case study → HR round",
    pros: ["Highest salary in tech", "Cutting-edge work", "High demand", "Intellectually stimulating"],
    cons: ["Rapidly evolving field", "Compute costs", "Model deployment challenges", "Requires strong math"],
    relatedCareers: ["data-scientist", "software-engineer"],
    workLifeBalance: 4,
    stressLevel: 3,
    creativeFreedom: 4,
    jobSecurity: 5,
    remoteWork: 4,
    skills: [
      {
        id: "ml-engineering",
        name: "ML Engineering & MLOps",
        level: "intermediate",
        whyItMatters: "Building models is easy. Deploying them to production at scale is hard. That's where ML engineers shine.",
        projects: ["Deploy a model as a REST API", "Set up ML experiment tracking", "Build an automated retraining pipeline"],
        resources: [
          { title: "MLOps Specialization", url: "https://www.coursera.org/specializations/mlops-machine-learning-operations", type: "course", platform: "Coursera/DeepLearning.AI", free: true },
          { title: "Made With ML", url: "https://madewithml.com", type: "course", platform: "Made With ML", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["machine-learning", "programming-fundamentals"],
        successCriteria: "You can deploy, monitor, and maintain ML models in production",
        difficulty: "hard",
        marketDemand: "high"
      },
      {
        id: "deep-learning-eng",
        name: "Deep Learning & Neural Networks",
        level: "advanced",
        whyItMatters: "Modern AI is built on deep learning. Understanding architectures like transformers is essential.",
        projects: ["Build an image classifier with CNN", "Create a text generator with transformers", "Build a real-time object detection system"],
        resources: [
          { title: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning", type: "course", platform: "Coursera/DeepLearning.AI", free: true },
          { title: "fast.ai Practical Deep Learning", url: "https://course.fast.ai", type: "course", platform: "fast.ai", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: ["machine-learning", "python-data", "statistics"],
        successCriteria: "You can build, train, and optimize neural networks for various tasks",
        difficulty: "hard",
        marketDemand: "high"
      },
      {
        id: "ml-system-design",
        name: "ML System Design",
        level: "advanced",
        whyItMatters: "Designing ML systems at scale requires understanding data pipelines, feature stores, and model serving.",
        projects: ["Design a recommendation system", "Design a fraud detection pipeline", "Design a real-time ML system"],
        resources: [
          { title: "ML System Design", url: "https://www.youtube.com/playlist?list=PLtcD-cJvdx0LBXM1XH4rVf6eLJQ7zZc9", type: "video", platform: "YouTube", free: true },
          { title: "Designing Machine Learning Systems", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", type: "book", platform: "O'Reilly", free: false }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["ml-engineering", "deep-learning-eng"],
        successCriteria: "You can design end-to-end ML systems that are scalable, reliable, and maintainable",
        difficulty: "hard",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "doctor-mbbs",
    title: "Doctor (MBBS)",
    slug: "doctor-mbbs",
    icon: "hospital",
    category: "medical",
    shortDescription: "Diagnose and treat patients, save lives",
    description: "Doctors diagnose illnesses, prescribe treatments, and perform surgeries. It's one of the most respected professions requiring years of dedicated study. After MBBS, you can specialize with MD/MS in various fields.",
    dayInLife: "Morning: Ward rounds — check on admitted patients, review their progress. Mid-morning: Outpatient department — see 30-40 patients, diagnose symptoms. Afternoon: Emergency cases, procedures, or surgeries. Late afternoon: Review lab reports, update treatment plans. Evening: Study latest medical research, prepare for cases.",
    salaryRange: {
      entry: "6-12 LPA (Government residency)",
      mid: "15-30 LPA",
      senior: "40-100+ LPA (Private practice/specialist)",
      source: "AmbitionBox/Medical Council 2026"
    },
    growthOutlook: "Stable and High. India needs 1 doctor per 1,000 people (currently 1:1,500). Growing healthcare sector.",
    educationRequired: "MBBS (5.5 years) + MD/MS (3 years) for specialization",
    keyCompanies: ["AIIMS", "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Government Hospitals"],
    interviewProcess: "NEET UG → MBBS → NEET PG → Specialty training → Hospital placement",
    pros: ["Highly respected", "Job security", "Save lives", "Good income", "Global opportunities"],
    cons: ["Very long education (10+ years)", "High stress", "Long working hours", "Emotional toll"],
    relatedCareers: ["nurse", "pharmacist", "psychologist"],
    workLifeBalance: 2,
    stressLevel: 5,
    creativeFreedom: 3,
    jobSecurity: 5,
    remoteWork: 1,
    skills: [
      {
        id: "biology-fundamentals",
        name: "Biology & Human Anatomy",
        level: "beginner",
        whyItMatters: "Understanding the human body is the foundation of medicine. NEET preparation starts here.",
        projects: ["Create detailed anatomical diagrams", "Build a flashcard system for anatomy", "Study organ systems systematically"],
        resources: [
          { title: "Khan Academy Biology", url: "https://www.khanacademy.org/science/biology", type: "course", platform: "Khan Academy", free: true },
          { title: "Osmosis (Medical Education)", url: "https://www.osmosis.org", type: "video", platform: "Osmosis", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: [],
        successCriteria: "You can explain all major organ systems and their functions",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "chemistry-medical",
        name: "Chemistry (Organic + Biochemistry)",
        level: "beginner",
        whyItMatters: "Pharmacology, metabolism, and drug interactions are all chemistry. Essential for NEET and practice.",
        projects: ["Master organic reactions mechanisms", "Study biochemistry pathways", "Practice NEET chemistry questions"],
        resources: [
          { title: "Khan Academy Chemistry", url: "https://www.khanacademy.org/science/chemistry", type: "course", platform: "Khan Academy", free: true },
          { title: "Physics Wallah NEET Chemistry", url: "https://www.youtube.com/c/PhysicsWallah", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: [],
        successCriteria: "You can explain organic reactions, biochemistry pathways, and pharmacology basics",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "neet-preparation",
        name: "NEET Exam Preparation",
        level: "intermediate",
        whyItMatters: "NEET is the gateway to MBBS. Strategic preparation is key — not just hard work.",
        projects: ["Solve previous year NEET papers", "Create a study schedule covering all subjects", "Take weekly mock tests and analyze weak areas"],
        resources: [
          { title: "NEET Official Website", url: "https://neet.nta.nic.in", type: "article", platform: "NTA", free: true },
          { title: "Physics Wallah NEET", url: "https://www.youtube.com/c/PhysicsWallah", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "48-72 weeks (1-1.5 years)",
        prerequisites: ["biology-fundamentals", "chemistry-medical"],
        successCriteria: "You can score 650+ in NEET mock tests consistently",
        difficulty: "hard",
        marketDemand: "high"
      },
      {
        id: "clinical-rotations",
        name: "Clinical Rotations & Patient Care",
        level: "advanced",
        whyItMatters: "Theory without practice is useless. Clinical skills are learned through hands-on experience.",
        projects: ["Complete rotations in major departments", "Practice patient history taking", "Assist in surgeries and procedures"],
        resources: [
          { title: "Osmosis Clinical Skills", url: "https://www.osmosis.org", type: "video", platform: "Osmosis", free: true }
        ],
        estimatedTime: "96+ weeks (2 years during internship)",
        prerequisites: ["neet-preparation"],
        successCriteria: "You can independently assess patients, make diagnoses, and manage common conditions",
        difficulty: "hard",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "nurse",
    title: "Nurse",
    slug: "nurse",
    icon: "stethoscope",
    category: "medical",
    shortDescription: "Provide direct patient care and support healthcare teams",
    description: "Nurses are the backbone of healthcare. They administer medications, monitor patient conditions, assist doctors, and provide emotional support to patients and families. Nursing offers global career opportunities.",
    dayInLife: "Morning: Check vitals of all assigned patients, administer morning medications. Mid-morning: Assist doctors during rounds, update patient charts. Afternoon: Perform procedures (IV, wound care), educate patients about their conditions. Evening: Handoff to night shift, document all care provided.",
    salaryRange: {
      entry: "3-6 LPA",
      mid: "6-12 LPA",
      senior: "15-30+ LPA (Abroad: 20-50+ LPA equivalent)",
      source: "Medical Council 2026"
    },
    growthOutlook: "High. Severe nursing shortage globally. Indian nurses are in demand in Middle East, UK, US, Australia.",
    educationRequired: "B.Sc Nursing (4 years) / GNM (3.5 years)",
    keyCompanies: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Manipal Hospitals", "Government Hospitals"],
    interviewProcess: "Institution selection → Nursing council registration → Hospital interview → Clinical skill demonstration",
    pros: ["Global demand", "Job security", "Fulfilling work", "Good salary abroad", "Short education period"],
    cons: ["Physically demanding", "Shift work", "Emotional stress", "Lower pay in India initially"],
    relatedCareers: ["doctor-mbbs", "pharmacist"],
    workLifeBalance: 2,
    stressLevel: 4,
    creativeFreedom: 2,
    jobSecurity: 5,
    remoteWork: 1,
    skills: [
      {
        id: "anatomy-nursing",
        name: "Human Anatomy & Physiology",
        level: "beginner",
        whyItMatters: "Nurses need to understand body systems to provide safe, effective care.",
        projects: ["Create body system flashcards", "Study drug interactions by body system", "Practice patient assessment techniques"],
        resources: [
          { title: "Khan Academy Anatomy", url: "https://www.khanacademy.org/science/health-and-medicine/human-body-systems", type: "course", platform: "Khan Academy", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: [],
        successCriteria: "You can explain body systems and their clinical significance",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "clinical-skills",
        name: "Clinical Nursing Skills",
        level: "intermediate",
        whyItMatters: "Hands-on skills are what make a nurse effective. IV insertion, wound care, patient monitoring.",
        projects: ["Practice skills on simulation mannequins", "Create a clinical skills checklist", "Shadow experienced nurses in different departments"],
        resources: [
          { title: "Nursing Skills Playlist", url: "https://www.youtube.com/playlist?list=PL4E6E5ABEE20F69C9", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "16-24 weeks",
        prerequisites: ["anatomy-nursing"],
        successCriteria: "You can independently perform all core nursing procedures safely",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "pharmacist",
    title: "Pharmacist",
    slug: "pharmacist",
    icon: "pill",
    category: "medical",
    shortDescription: "Ensure safe and effective use of medications",
    description: "Pharmacist dispense medications, counsel patients on drug usage, monitor drug interactions, and work with doctors to optimize treatment plans. They work in hospitals, community pharmacies, and pharmaceutical companies.",
    dayInLife: "Morning: Review prescriptions, check for drug interactions, prepare medications. Mid-morning: Counsel patients on medication usage, side effects, and storage. Afternoon: Manage inventory, order medicines, handle insurance claims. Evening: Stay updated on new drugs, attend pharmacy meetings.",
    salaryRange: {
      entry: "3-6 LPA",
      mid: "6-12 LPA",
      senior: "15-30+ LPA",
      source: "AmbitionBox 2026"
    },
    growthOutlook: "Stable. Growing pharmaceutical industry in India. Regulatory roles also available.",
    educationRequired: "B.Pharm (4 years) / D.Pharm (2 years) + PCI registration",
    keyCompanies: ["Cipla", "Sun Pharma", "Dr. Reddy's", "Lupin", "Aurobindo", "Apollo Pharmacy"],
    interviewProcess: "Pharmacy council registration → Hospital/Company interview → Technical assessment",
    pros: ["Stable career", "Healthcare sector growth", "Research opportunities", "Regulatory roles"],
    cons: ["Moderate pay initially", "Repetitive tasks possible", "Regulatory compliance burden"],
    relatedCareers: ["doctor-mbbs", "nurse"],
    workLifeBalance: 3,
    stressLevel: 2,
    creativeFreedom: 2,
    jobSecurity: 4,
    remoteWork: 1,
    skills: [
      {
        id: "pharmacology",
        name: "Pharmacology",
        level: "beginner",
        whyItMatters: "Understanding how drugs work is the core of pharmacy practice.",
        projects: ["Create a drug interaction reference guide", "Study drug classifications by therapeutic use", "Practice prescription analysis"],
        resources: [
          { title: "Khan Academy Pharmacology", url: "https://www.khanacademy.org/science/health-and-medicine/human-body-systems/pharmacology", type: "course", platform: "Khan Academy", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: [],
        successCriteria: "You can explain drug mechanisms, interactions, and contraindications",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "pharmaceutical-chemistry",
        name: "Pharmaceutical Chemistry",
        level: "intermediate",
        whyItMatters: "Drug formulation and development requires deep chemistry knowledge.",
        projects: ["Study drug structure-activity relationships", "Analyze drug formulation processes", "Research generic drug development"],
        resources: [
          { title: "Pharmaceutical Chemistry Courses", url: "https://www.youtube.com/results?search_query=pharmaceutical+chemistry+full+course", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: ["pharmacology"],
        successCriteria: "You can explain drug formulation, stability, and quality control",
        difficulty: "medium",
        marketDemand: "medium"
      }
    ]
  },
  {
    id: "psychologist",
    title: "Psychologist",
    slug: "psychologist",
    icon: "brain",
    category: "medical",
    shortDescription: "Help people understand their minds and overcome mental health challenges",
    description: "Psychologists study human behavior and mental processes. They conduct therapy, psychological assessments, and research. With mental health awareness growing in India, this field is seeing massive demand.",
    dayInLife: "Morning: Review case notes, prepare for today's sessions. Mid-morning: Conduct therapy sessions (CBT, counseling). Afternoon: Psychological assessments and testing. Late afternoon: Write case reports, coordinate with psychiatrists. Evening: Attend supervision, read research journals.",
    salaryRange: {
      entry: "3-6 LPA",
      mid: "8-18 LPA",
      senior: "25-50+ LPA (Private practice)",
      source: "AmbitionBox 2026"
    },
    growthOutlook: "Very High. India's mental health market growing rapidly. Corporate wellness programs creating new opportunities.",
    educationRequired: "BA Psychology → MA Psychology → M.Phil Clinical Psychology → RCI License",
    keyCompanies: ["iCall", "Vandrevala Foundation", "Fortis Mental Health", "PsychiCare", "Private Practice"],
    interviewProcess: "Academic qualification verification → Clinical experience review → Case presentation → Supervision interview",
    pros: ["Growing demand", "Meaningful work", "Private practice potential", "Flexible hours", "Corporate opportunities"],
    cons: ["Long education path", "Emotional toll", "Need supervision hours", "Stigma still exists"],
    relatedCareers: ["doctor-mbbs"],
    workLifeBalance: 4,
    stressLevel: 3,
    creativeFreedom: 4,
    jobSecurity: 4,
    remoteWork: 3,
    skills: [
      {
        id: "psychology-fundamentals",
        name: "Psychology Fundamentals",
        level: "beginner",
        whyItMatters: "Understanding human behavior, cognition, and emotion is the foundation of all psychology work.",
        projects: ["Study major psychological theories", "Analyze case studies", "Conduct a small research study"],
        resources: [
          { title: "Introduction to Psychology - Yale", url: "https://www.coursera.org/learn/introduction-psychology", type: "course", platform: "Coursera/Yale", free: true },
          { title: "Crash Course Psychology", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNGU3Nj4Q4xDx7BQLUxhWfW", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: [],
        successCriteria: "You can explain major psychological theories and research methods",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "counseling-skills",
        name: "Counseling & Therapy Techniques",
        level: "intermediate",
        whyItMatters: "Theory without practice is useless. Counseling skills are learned through practice and supervision.",
        projects: ["Practice active listening exercises", "Role-play therapy scenarios", "Study CBT techniques"],
        resources: [
          { title: "CBT Course", url: "https://www.youtube.com/playlist?list=PLlLhpYjmPgEBfCxaqfGpAVzqifmNrCtY0", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "16-24 weeks",
        prerequisites: ["psychology-fundamentals"],
        successCriteria: "You can conduct therapy sessions using evidence-based techniques",
        difficulty: "hard",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    slug: "chartered-accountant",
    icon: "trending-up",
    category: "business",
    shortDescription: "Manage finances, audits, and taxation for businesses",
    description: "Chartered Accountants handle financial planning, auditing, taxation, and business advisory. CA is one of the most respected and well-paying professions in India. The CA qualification is recognized globally.",
    dayInLife: "Morning: Review audit findings from yesterday, prepare for client meeting. Mid-morning: Conduct financial audit of a company. Afternoon: File GST returns, plan tax-saving strategies. Late afternoon: Advise client on business expansion, review financial statements. Evening: Study new tax regulations, prepare for client presentations.",
    salaryRange: {
      entry: "7-12 LPA",
      mid: "15-30 LPA",
      senior: "40-100+ LPA (Partner in firm)",
      source: "ICAI 2026"
    },
    growthOutlook: "High. Growing economy needs more CAs. GST and digital tax creating new opportunities.",
    educationRequired: "CA Foundation → CA Intermediate → 3 years articleship → CA Final",
    keyCompanies: ["Deloitte", "PwC", "EY", "KPMG", "Grant Thornton", "BDO"],
    interviewProcess: "CA qualification → Firm interview → Articleship placement → Final placement",
    pros: ["Highly respected", "Good salary", "Global opportunities", "Multiple career paths", "Entrepreneurial potential"],
    cons: ["Very difficult exams (5-8% pass rate)", "Long articleship", "High stress during exam season"],
    relatedCareers: ["banking-professional", "entrepreneur"],
    workLifeBalance: 3,
    stressLevel: 4,
    creativeFreedom: 3,
    jobSecurity: 5,
    remoteWork: 2,
    skills: [
      {
        id: "accounting-fundamentals",
        name: "Accounting & Financial Reporting",
        level: "beginner",
        whyItMatters: "The foundation of CA. You must master accounting before anything else.",
        projects: ["Prepare financial statements for a small business", "Practice journal entries and ledgers", "Analyze a company's annual report"],
        resources: [
          { title: "Accounting Fundamentals", url: "https://www.coursera.org/learn/accounting-fundamentals", type: "course", platform: "Coursera", free: true },
          { title: "ICAI Study Material", url: "https://www.icai.org", type: "article", platform: "ICAI", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: [],
        successCriteria: "You can prepare and analyze financial statements",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "taxation",
        name: "Taxation (GST + Income Tax)",
        level: "intermediate",
        whyItMatters: "Tax compliance is mandatory for every business. CAs are the experts who handle this.",
        projects: ["File a mock GST return", "Calculate income tax for different scenarios", "Plan tax savings for a fictional client"],
        resources: [
          { title: "GST Full Course", url: "https://www.youtube.com/playlist?list=PLS_h2xlajjUdGrRnnnmGBjzWCVqj9S0g", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["accounting-fundamentals"],
        successCriteria: "You can file GST returns and calculate income tax accurately",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "audit",
        name: "Auditing & Assurance",
        level: "intermediate",
        whyItMatters: "Audit is the core service CAs provide. Understanding audit procedures is essential.",
        projects: ["Conduct a mock audit of financial statements", "Prepare an audit report", "Identify audit risks in a case study"],
        resources: [
          { title: "Auditing Course", url: "https://www.icai.org/study-material/intermediate", type: "article", platform: "ICAI", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["accounting-fundamentals"],
        successCriteria: "You can conduct an audit and prepare a professional audit report",
        difficulty: "hard",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    slug: "marketing-manager",
    icon: "megaphone",
    category: "business",
    shortDescription: "Drive brand awareness, customer acquisition, and revenue growth",
    description: "Marketing managers develop strategies to promote products and services. They manage campaigns, analyze market trends, and build brand presence across digital and traditional channels.",
    dayInLife: "Morning: Review campaign performance metrics (Google Ads, social media). Mid-morning: Strategy meeting with team — plan next quarter's campaigns. Afternoon: Review content calendar, approve social media posts. Late afternoon: Analyze competitor strategies, brainstorm new campaign ideas. Evening: Read marketing case studies, attend webinars.",
    salaryRange: {
      entry: "4-8 LPA",
      mid: "10-20 LPA",
      senior: "25-50+ LPA",
      source: "AmbitionBox 2026"
    },
    growthOutlook: "High. Digital marketing growing rapidly. Every business needs marketing.",
    educationRequired: "MBA Marketing / BBA + Digital Marketing certifications",
    keyCompanies: ["Google", "Meta", "Amazon", "Flipkart", "Zomato", "Swiggy", "OYO"],
    interviewProcess: "Resume shortlist → Marketing case study → Campaign presentation → HR round",
    pros: ["Creative work", "Good salary", "Cross-industry opportunities", "Measurable impact"],
    cons: ["Budget pressure", "Fast-paced", "Subjective metrics", "Client/stakeholder management"],
    relatedCareers: ["content-creator", "product-manager", "graphic-designer"],
    workLifeBalance: 3,
    stressLevel: 3,
    creativeFreedom: 4,
    jobSecurity: 3,
    remoteWork: 3,
    skills: [
      {
        id: "digital-marketing",
        name: "Digital Marketing Fundamentals",
        level: "beginner",
        whyItMatters: "Digital marketing is where the jobs are. Understanding SEO, ads, and social media is essential.",
        projects: ["Run a small Google Ads campaign", "Create a social media content calendar", "Build a basic SEO audit report"],
        resources: [
          { title: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage", type: "course", platform: "Google", free: true },
          { title: "HubSpot Marketing Course", url: "https://academy.hubspot.com/courses", type: "course", platform: "HubSpot", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can plan and execute digital marketing campaigns across multiple channels",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "analytics",
        name: "Marketing Analytics",
        level: "intermediate",
        whyItMatters: "Data-driven marketing outperforms guesswork. Analytics skills separate good marketers from great ones.",
        projects: ["Set up Google Analytics for a website", "Create a marketing dashboard", "A/B test a landing page"],
        resources: [
          { title: "Google Analytics Certification", url: "https://skillshop.withgoogle.com/products/google-analytics", type: "course", platform: "Google", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["digital-marketing"],
        successCriteria: "You can track, measure, and optimize marketing campaigns using data",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    slug: "entrepreneur",
    icon: "rocket",
    category: "business",
    shortDescription: "Build your own business from scratch",
    description: "Entrepreneurs identify problems, create solutions, and build businesses. They wear multiple hats — product, marketing, sales, finance. It's the hardest but most rewarding career path.",
    dayInLife: "Morning: Check key metrics (revenue, user signups, support tickets). Mid-morning: Meet potential customers, validate product ideas. Afternoon: Work on product roadmap, meet with developers. Late afternoon: Pitch to investors, handle hiring. Evening: Read business books, plan next quarter's strategy.",
    salaryRange: {
      entry: "Variable (often ₹0 initially)",
      mid: "Depends on business success",
      senior: "Unlimited (if business succeeds)",
      source: "Industry reports"
    },
    growthOutlook: "India has 3rd largest startup ecosystem. Government support through Startup India. High risk, high reward.",
    educationRequired: "Any degree + Business skills + Domain expertise",
    keyCompanies: ["Your own startup", "Incubators (T-Hub, NASSCOM 10K)", "Accelerators (Y Combinator, 500 Startups)"],
    interviewProcess: "No interview — you create the opportunity. Validation comes from customers and investors.",
    pros: ["Unlimited potential", "Be your own boss", "Create impact", "Learn everything", "Build wealth"],
    cons: ["High risk of failure", "No guaranteed income", "Long hours", "Stressful", "Isolation"],
    relatedCareers: ["product-manager", "marketing-manager"],
    workLifeBalance: 1,
    stressLevel: 5,
    creativeFreedom: 5,
    jobSecurity: 1,
    remoteWork: 4,
    skills: [
      {
        id: "business-model",
        name: "Business Model Design",
        level: "beginner",
        whyItMatters: "A great idea without a business model is just a hobby. Understanding how businesses make money is essential.",
        projects: ["Create a Business Model Canvas for an idea", "Validate a business idea with 10 customer interviews", "Build a simple financial projection"],
        resources: [
          { title: "How to Build a Startup", url: "https://www.udacity.com/course/how-to-build-a-startup--ep245", type: "course", platform: "Udacity/Steve Blank", free: true },
          { title: "Y Combinator Startup School", url: "https://www.startupschool.org", type: "course", platform: "Y Combinator", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can design a viable business model and validate it with real customers",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "product-development",
        name: "Product Development & MVP",
        level: "intermediate",
        whyItMatters: "Building the right product is harder than building the product right. MVP methodology saves time and money.",
        projects: ["Build an MVP of a product idea", "Conduct user testing with 5 people", "Iterate based on feedback"],
        resources: [
          { title: "Product Management Course", url: "https://www.youtube.com/playlist?list=PL2qHrRmQ91EKEU7X99f7KsKbQJZ8hy1R5", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: ["business-model"],
        successCriteria: "You can build and launch an MVP, gather feedback, and iterate",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    slug: "graphic-designer",
    icon: "paintbrush",
    category: "creative",
    shortDescription: "Create visual content that communicates ideas and emotions",
    description: "Graphic designers create logos, branding, marketing materials, and digital content. They combine art and technology to communicate ideas visually. Freelancing opportunities are abundant.",
    dayInLife: "Morning: Review client briefs, check design feedback. Mid-morning: Work on logo concepts for a new client. Afternoon: Create social media graphics, design a brochure. Late afternoon: Revise designs based on feedback, prepare final files. Evening: Update portfolio, explore design trends on Dribbble.",
    salaryRange: {
      entry: "3-6 LPA",
      mid: "6-12 LPA",
      senior: "15-30+ LPA (or freelance: highly variable)",
      source: "AmbitionBox 2026"
    },
    growthOutlook: "High. Every business needs visual content. Social media has exploded demand for designers.",
    educationRequired: "Design degree / Diploma / Self-taught with strong portfolio",
    keyCompanies: ["Canva", "Adobe", "Design agencies", "Startups", "Freelance"],
    interviewProcess: "Portfolio review → Design test → Client interaction simulation → Culture fit",
    pros: ["Creative freedom", "Portfolio-based hiring", "Freelancing potential", "Cross-industry work"],
    cons: ["Subjective feedback", "Tight deadlines", "Revisions can be frustrating", "Tool costs"],
    relatedCareers: ["ui-ux-designer", "video-editor", "content-creator"],
    workLifeBalance: 3,
    stressLevel: 2,
    creativeFreedom: 5,
    jobSecurity: 3,
    remoteWork: 4,
    skills: [
      {
        id: "design-principles",
        name: "Design Principles (Color, Typography, Layout)",
        level: "beginner",
        whyItMatters: "These fundamentals separate amateur designs from professional ones.",
        projects: ["Create a color palette for 3 different brands", "Design 5 different layouts for the same content", "Study and recreate famous logos"],
        resources: [
          { title: "Graphic Design Specialization", url: "https://www.coursera.org/specializations/graphic-design", type: "course", platform: "Coursera/CalArts", free: true },
          { title: "Canva Design School", url: "https://www.canva.com/learn/", type: "article", platform: "Canva", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can create professional designs with proper color, typography, and layout",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "adobe-tools",
        name: "Adobe Creative Suite (Photoshop, Illustrator)",
        level: "intermediate",
        whyItMatters: "Industry standard tools. Most design jobs require proficiency in at least one Adobe tool.",
        projects: ["Design a poster for an event", "Create a brand identity package", "Edit and manipulate photos professionally"],
        resources: [
          { title: "Photoshop Tutorial for Beginners", url: "https://www.youtube.com/watch?v=IuZMnoaJMOo", type: "video", platform: "YouTube", free: true },
          { title: "Adobe Photoshop Tutorials", url: "https://helpx.adobe.com/photoshop/tutorials.html", type: "article", platform: "Adobe", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: ["design-principles"],
        successCriteria: "You can create professional designs using Adobe tools",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "video-editor",
    title: "Video Editor",
    slug: "video-editor",
    icon: "film",
    category: "creative",
    shortDescription: "Transform raw footage into compelling stories",
    description: "Video editors cut, arrange, and enhance video footage for films, YouTube, ads, and social media. With video content exploding, skilled editors are in massive demand.",
    dayInLife: "Morning: Review footage from yesterday's shoot, organize media files. Mid-morning: Rough cut of a YouTube video. Afternoon: Add transitions, color grading, sound design. Late afternoon: Review with client, make revisions. Evening: Learn new editing techniques, experiment with effects.",
    salaryRange: {
      entry: "3-6 LPA",
      mid: "8-15 LPA",
      senior: "20-40+ LPA (or freelance)",
      source: "AmbitionBox 2026"
    },
    growthOutlook: "High. Video content growing exponentially. YouTube, OTT platforms, social media all need editors.",
    educationRequired: "Film school / Online courses / Self-taught with portfolio",
    keyCompanies: ["YouTube creators", "OTT platforms (Netflix, Amazon)", "Ad agencies", "Production houses", "Freelance"],
    interviewProcess: "Portfolio/reel review → Editing test → Client project simulation → Final round",
    pros: ["Creative work", "Growing demand", "Freelancing potential", "Work with interesting content"],
    cons: ["Tight deadlines", "Long hours during projects", "Client revisions", "Equipment costs"],
    relatedCareers: ["content-creator", "graphic-designer", "ui-ux-designer"],
    workLifeBalance: 3,
    stressLevel: 3,
    creativeFreedom: 5,
    jobSecurity: 3,
    remoteWork: 4,
    skills: [
      {
        id: "editing-fundamentals",
        name: "Video Editing Fundamentals",
        level: "beginner",
        whyItMatters: "Understanding cuts, pacing, and storytelling through editing is the foundation.",
        projects: ["Edit a 5-minute vlog", "Create a travel montage", "Edit a short film from raw footage"],
        resources: [
          { title: "Video Editing with DaVinci Resolve", url: "https://www.youtube.com/watch?v=ObjectspTNM", type: "video", platform: "YouTube", free: true },
          { title: "DaVinci Resolve (Free Software)", url: "https://www.blackmagicdesign.com/products/davinciresolve", type: "tool", platform: "Blackmagic", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can edit a polished video with proper cuts, pacing, and transitions",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "color-grading",
        name: "Color Grading & Sound Design",
        level: "intermediate",
        whyItMatters: "Color and sound make the difference between amateur and professional video.",
        projects: ["Color grade a short film", "Add background music and sound effects", "Create a consistent color palette for a series"],
        resources: [
          { title: "Color Grading Tutorial", url: "https://www.youtube.com/watch?v=1JgVvHTD2CY", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["editing-fundamentals"],
        successCriteria: "You can color grade and add professional sound design to videos",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "content-creator",
    title: "Content Creator",
    slug: "content-creator",
    icon: "smartphone",
    category: "creative",
    shortDescription: "Create engaging content that educates, entertains, or inspires",
    description: "Content creators produce videos, articles, podcasts, and social media content. They build personal brands, grow audiences, and monetize through ads, sponsorships, and products.",
    dayInLife: "Morning: Check analytics from yesterday's content, respond to comments. Mid-morning: Research trending topics, plan content calendar. Afternoon: Film/edit a YouTube video or write a blog post. Late afternoon: Schedule social media posts, engage with community. Evening: Collaborate with other creators, plan collaborations.",
    salaryRange: {
      entry: "Variable (often ₹0 initially)",
      mid: "5-20 LPA (from sponsorships/ads)",
      senior: "50+ LPA (top creators)",
      source: "Industry reports"
    },
    growthOutlook: "Very High. Creator economy growing rapidly. Multiple platforms and monetization options.",
    educationRequired: "Any field + Content creation skills + Consistency",
    keyCompanies: ["YouTube", "Instagram", "LinkedIn", "Twitter", "Your own brand"],
    interviewProcess: "No traditional interview. Success measured by audience growth and engagement.",
    pros: ["Be your own boss", "Creative freedom", "Build personal brand", "Multiple income streams", "Impact millions"],
    cons: ["Unpredictable income initially", "Algorithm changes", "Burnout risk", "Public criticism", "Requires consistency"],
    relatedCareers: ["video-editor", "graphic-designer", "marketing-manager"],
    workLifeBalance: 2,
    stressLevel: 3,
    creativeFreedom: 5,
    jobSecurity: 2,
    remoteWork: 5,
    skills: [
      {
        id: "content-strategy",
        name: "Content Strategy & Planning",
        level: "beginner",
        whyItMatters: "Random content doesn't build an audience. Strategy is what separates hobbyists from professionals.",
        projects: ["Create a 30-day content calendar", "Analyze top 10 creators in a niche", "Build a content pillars framework"],
        resources: [
          { title: "Content Marketing Course", url: "https://academy.hubspot.com/courses/content-marketing", type: "course", platform: "HubSpot", free: true }
        ],
        estimatedTime: "2-3 weeks",
        prerequisites: [],
        successCriteria: "You can plan a content strategy that builds audience consistently",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "video-production",
        name: "Video Production (Shoot + Edit)",
        level: "beginner",
        whyItMatters: "Video is the dominant content format. Being able to produce it gives you a huge advantage.",
        projects: ["Create a YouTube video from start to finish", "Film a tutorial with screen recording", "Edit a short-form video for Instagram Reels"],
        resources: [
          { title: "YouTube Creator Academy", url: "https://creatoracademy.youtube.com", type: "course", platform: "YouTube", free: true },
          { title: "DaVinci Resolve Tutorial", url: "https://www.youtube.com/watch?v=ObjectspTNM", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["content-strategy"],
        successCriteria: "You can produce and edit professional-quality videos for social media",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "civil-services",
    title: "Civil Services (IAS/IPS)",
    slug: "civil-services",
    icon: "landmark",
    category: "government",
    shortDescription: "Serve the nation through public administration and governance",
    description: "Civil servants administer government policies, manage districts, and serve the public. IAS/IPS officers hold some of the most powerful and respected positions in India. The UPSC exam is highly competitive.",
    dayInLife: "Morning: Review files and applications from various departments. Mid-morning: Conduct a meeting with district officials to review development projects. Afternoon: Visit rural areas to assess implementation of government schemes. Late afternoon: Handle administrative decisions, approve proposals. Evening: Study policy documents, prepare for next day's reviews.",
    salaryRange: {
      entry: "8-12 LPA (IAS entry level)",
      mid: "15-25 LPA",
      senior: "30-50+ LPA (with perks and benefits)",
      source: "Government Pay Commission"
    },
    growthOutlook: "Stable and Prestigious. Government jobs offer job security, pension, and social status.",
    educationRequired: "Any Bachelor's degree + UPSC qualification",
    keyCompanies: ["Indian Administrative Service", "Indian Police Service", "Indian Foreign Service", "State Civil Services"],
    interviewProcess: "UPSC Prelims (MCQ) → UPSC Mains (Written) → Personality Test (Interview) → Foundation Course",
    pros: ["Prestigious", "Job security", "Pension", "Social impact", "Power to change lives"],
    cons: ["Extremely competitive (0.1% selection rate)", "Political pressures", "Bureaucratic challenges", "Transfer frequency"],
    relatedCareers: ["banking-professional", "teacher"],
    workLifeBalance: 3,
    stressLevel: 4,
    creativeFreedom: 3,
    jobSecurity: 5,
    remoteWork: 1,
    skills: [
      {
        id: "upsc-preparation",
        name: "UPSC Exam Preparation",
        level: "beginner",
        whyItMatters: "UPSC is the gateway to civil services. Strategic preparation spanning 1-2 years is required.",
        projects: ["Create a comprehensive study plan", "Write practice answers for Mains", "Take weekly mock tests for Prelims"],
        resources: [
          { title: "Unacademy UPSC", url: "https://www.youtube.com/c/UnacademyUPSC", type: "video", platform: "YouTube", free: true },
          { title: "UPSC Official Syllabus", url: "https://upsc.gov.in", type: "article", platform: "UPSC", free: true }
        ],
        estimatedTime: "48-72 weeks (1-1.5 years)",
        prerequisites: [],
        successCriteria: "You can clear Prelims consistently and write quality answers for Mains",
        difficulty: "hard",
        marketDemand: "high"
      },
      {
        id: "indian-polity",
        name: "Indian Polity & Governance",
        level: "beginner",
        whyItMatters: "Core UPSC subject. Understanding governance is essential for an administrator.",
        projects: ["Study the Indian Constitution article by article", "Analyze recent government policies", "Write essays on governance topics"],
        resources: [
          { title: "Indian Polity by Laxmikanth Summary", url: "https://www.youtube.com/playlist?list=PL0uV72KpL5oJmHhYJv0VpE3V1L1T5cC0", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: [],
        successCriteria: "You can explain the Indian Constitution, governance structure, and current policies",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "current-affairs",
        name: "Current Affairs & General Knowledge",
        level: "beginner",
        whyItMatters: "UPSC heavily tests current affairs. Daily reading is non-negotiable.",
        projects: ["Read newspaper daily and make notes", "Create a current affairs monthly digest", "Practice answer writing with current affairs"],
        resources: [
          { title: "The Hindu Newspaper", url: "https://www.thehindu.com", type: "article", platform: "The Hindu", free: true },
          { title: "Vision IAS Current Affairs", url: "https://www.visionias.in/current-affairs-news-analysis-editorials", type: "article", platform: "Vision IAS", free: true }
        ],
        estimatedTime: "Ongoing (daily habit)",
        prerequisites: [],
        successCriteria: "You can connect current events to UPSC syllabus topics and write analytical answers",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "banking-professional",
    title: "Banking Professional (IBPS/SBI)",
    slug: "banking-professional",
    icon: "building-2",
    category: "government",
    shortDescription: "Stable government career in banking and financial services",
    description: "Banking professionals work in public sector banks through IBPS/SBI exams. Roles include PO (Probationary Officer), Clerk, and Specialist Officers. Offers job security, fixed working hours, and government benefits.",
    dayInLife: "Morning: Open the branch, review daily targets. Mid-morning: Handle customer transactions, process loan applications. Afternoon: Cross-sell financial products, manage branch operations. Late afternoon: Reconcile accounts, file regulatory reports. Evening: Study for promotions, attend training sessions.",
    salaryRange: {
      entry: "4-8 LPA (PO/Clerk)",
      mid: "8-15 LPA",
      senior: "15-30+ LPA (Manager+)",
      source: "IBPS/SBI 2026"
    },
    growthOutlook: "Stable. Government banks offer job security. Digital banking creating new roles.",
    educationRequired: "Any Bachelor's degree + IBPS/SBI exam qualification",
    keyCompanies: ["SBI", "PNB", "Bank of Baroda", "Canara Bank", "Union Bank", "Indian Bank"],
    interviewProcess: "Prelims (MCQ) → Mains (MCQ + Descriptive) → Group Discussion/Interview",
    pros: ["Job security", "Fixed working hours", "Government benefits", "Pension", "Work-life balance"],
    cons: ["Moderate salary initially", "Repetitive work possible", "Limited creativity", "Slow promotions"],
    relatedCareers: ["chartered-accountant", "civil-services"],
    workLifeBalance: 4,
    stressLevel: 2,
    creativeFreedom: 2,
    jobSecurity: 5,
    remoteWork: 1,
    skills: [
      {
        id: "quantitative-aptitude",
        name: "Quantitative Aptitude",
        level: "beginner",
        whyItMatters: "Core section of IBPS/SBI exams. Speed and accuracy matter.",
        projects: ["Solve 50 math problems daily", "Practice speed calculations", "Take timed mock tests"],
        resources: [
          { title: "Quantitative Aptitude Full Course", url: "https://www.youtube.com/playlist?list=PLhB1wGkz4A9A9pE8tFv2e4v3g8v8v8v8", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: [],
        successCriteria: "You can solve 30+ questions in 45 minutes with 90%+ accuracy",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "reasoning",
        name: "Logical Reasoning",
        level: "beginner",
        whyItMatters: "Tests your ability to think logically. Important for both exam and job performance.",
        projects: ["Practice puzzle-type questions daily", "Solve seating arrangement problems", "Work through syllogism questions"],
        resources: [
          { title: "Reasoning Full Course", url: "https://www.youtube.com/playlist?list=PLhB1wGkz4A9A9pE8tFv2e4v3g8v8v8v8", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: [],
        successCriteria: "You can solve reasoning puzzles quickly and accurately in exam conditions",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "teacher",
    title: "Teaching (CTET/TET)",
    slug: "teacher",
    icon: "book-open",
    category: "government",
    shortDescription: "Shape the next generation through education",
    description: "Teachers educate students, develop curricula, and create learning environments. Government teaching jobs (through CTET/TET) offer stability and the ability to make a real difference. Private schools also offer good opportunities.",
    dayInLife: "Morning: Prepare lesson plans for today's classes. Mid-morning: Teach 2-3 classes, explain concepts, answer questions. Afternoon: Grade papers, provide feedback to students. Late afternoon: Parent-teacher meetings, school administrative work. Evening: Update teaching materials, research new teaching methods.",
    salaryRange: {
      entry: "4-8 LPA (Government school)",
      mid: "8-15 LPA",
      senior: "15-30+ LPA (Senior teacher/Principal)",
      source: "Government Pay Commission"
    },
    growthOutlook: "Stable. Permanent government job. Growing demand for quality teachers in private sector.",
    educationRequired: "B.Ed + CTET/TET qualification + Subject expertise",
    keyCompanies: ["Government Schools", "Kendriya Vidyalaya", "DPS", "Ryan International", "Private Schools"],
    interviewProcess: "CTET/TET qualification → School shortlist → Demo class → Interview",
    pros: ["Summer/winter breaks", "Job security", "Pension", "Make a difference", "Respected profession"],
    cons: ["Moderate salary", "Parental pressure", "Administrative burden", "Repetitive work possible"],
    relatedCareers: ["civil-services", "content-creator"],
    workLifeBalance: 4,
    stressLevel: 3,
    creativeFreedom: 3,
    jobSecurity: 5,
    remoteWork: 2,
    skills: [
      {
        id: "pedagogy",
        name: "Pedagogy & Teaching Methods",
        level: "beginner",
        whyItMatters: "How you teach matters as much as what you teach. Modern pedagogy improves outcomes.",
        projects: ["Design a lesson plan using modern methods", "Create interactive learning activities", "Practice classroom management techniques"],
        resources: [
          { title: "CTET Preparation", url: "https://www.youtube.com/c/UnacademyCTET", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: [],
        successCriteria: "You can design engaging lessons and manage a classroom effectively",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "subject-knowledge",
        name: "Subject Mastery (Math/Science/English)",
        level: "intermediate",
        whyItMatters: "Deep subject knowledge builds student confidence. You can't teach what you don't know.",
        projects: ["Create comprehensive notes for your subject", "Design practice problem sets", "Build a question bank for students"],
        resources: [
          { title: "NCERT Textbooks (Free)", url: "https://ncert.nic.in/textbook.php", type: "article", platform: "NCERT", free: true }
        ],
        estimatedTime: "16-24 weeks",
        prerequisites: [],
        difficulty: "medium",
        marketDemand: "high",
        successCriteria: "You can explain any topic in your subject clearly and answer student questions confidently"
      }
    ]
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    slug: "mechanical-engineer",
    icon: "settings",
    category: "engineering",
    shortDescription: "Design, build, and maintain mechanical systems",
    description: "Mechanical engineers work on designing, manufacturing, and maintaining mechanical systems — from car engines to industrial robots. It's one of the broadest engineering disciplines with diverse career opportunities.",
    dayInLife: "Morning: Review design specifications for a new component. Mid-morning: Run CAD simulations to test stress analysis. Afternoon: Visit the shop floor to oversee prototype manufacturing. Late afternoon: Collaborate with electrical engineers on an integrated system. Evening: Read industry journals, update project documentation.",
    salaryRange: {
      entry: "4-8 LPA",
      mid: "10-20 LPA",
      senior: "25-50+ LPA",
      source: "AmbitionBox 2026"
    },
    growthOutlook: "Stable. Manufacturing sector growing in India. EV and renewable energy creating new opportunities.",
    educationRequired: "B.Tech Mechanical Engineering",
    keyCompanies: ["Tata Motors", "Mahindra", "L&T", "Godrej", "BHEL", "ISRO", "DRDO"],
    interviewProcess: "Campus placement → Technical interview (CAD, mechanics) → HR round",
    pros: ["Diverse opportunities", "Core engineering", "Government jobs", "EV sector growth"],
    cons: ["Moderate salary in core sector", "Factory floor work possible", "Limited remote work"],
    relatedCareers: ["civil-engineer"],
    workLifeBalance: 3,
    stressLevel: 3,
    creativeFreedom: 4,
    jobSecurity: 4,
    remoteWork: 2,
    skills: [
      {
        id: "cad-design",
        name: "CAD Software (AutoCAD, SolidWorks)",
        level: "beginner",
        whyItMatters: "Every mechanical engineer needs to create technical drawings. CAD is the industry standard.",
        projects: ["Design a 3D model of a machine part", "Create assembly drawings", "3D print a prototype"],
        resources: [
          { title: "AutoCAD Full Course", url: "https://www.youtube.com/playlist?list=PLrRPmE9qHNrPpJjXhQpP0eKq5vX9vXvX", type: "video", platform: "YouTube", free: true },
          { title: "SolidWorks Tutorials", url: "https://www.youtube.com/c/SolidWorks", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: [],
        successCriteria: "You can create professional 2D and 3D technical drawings using CAD software",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "thermodynamics",
        name: "Thermodynamics & Heat Transfer",
        level: "intermediate",
        whyItMatters: "Core mechanical engineering concept. Essential for HVAC, automotive, and power systems.",
        projects: ["Calculate heat transfer for a system", "Design a simple heat exchanger", "Analyze engine efficiency"],
        resources: [
          { title: "Thermodynamics Full Course", url: "https://www.youtube.com/playlist?list=PLrRPmE9qHNrPpJjXhQpP0eKq5vX9vXvX", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: [],
        successCriteria: "You can solve thermodynamics problems and design basic thermal systems",
        difficulty: "hard",
        marketDemand: "medium"
      }
    ]
  },
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    slug: "civil-engineer",
    icon: "hard-hat",
    category: "engineering",
    shortDescription: "Design and build infrastructure that communities depend on",
    description: "Civil engineers design, build, and maintain infrastructure — roads, bridges, buildings, water systems. They ensure structures are safe, sustainable, and meet building codes.",
    dayInLife: "Morning: Visit construction site to inspect progress. Mid-morning: Review structural drawings, check material specifications. Afternoon: Coordinate with contractors, resolve on-site issues. Late afternoon: Update project reports, review budget allocations. Evening: Study building codes, prepare for inspections.",
    salaryRange: {
      entry: "4-8 LPA",
      mid: "10-20 LPA",
      senior: "25-50+ LPA",
      source: "AmbitionBox 2026"
    },
    growthOutlook: "High. India's infrastructure push (Smart Cities, Bharatmala) creating massive demand.",
    educationRequired: "B.Tech Civil Engineering",
    keyCompanies: ["L&T", "Tata Projects", "NCC", "Ultratech", "Government PWD", "Smart City projects"],
    interviewProcess: "Campus placement → Technical interview (structural analysis, estimation) → HR round",
    pros: ["Nation building", "Infrastructure growth", "Government jobs", "On-site variety"],
    cons: ["Field work required", "Remote locations possible", "Moderate initial salary", "Long project cycles"],
    relatedCareers: ["mechanical-engineer"],
    workLifeBalance: 3,
    stressLevel: 3,
    creativeFreedom: 4,
    jobSecurity: 4,
    remoteWork: 1,
    skills: [
      {
        id: "structural-analysis",
        name: "Structural Analysis & Design",
        level: "beginner",
        whyItMatters: "Understanding how structures bear loads is fundamental to civil engineering.",
        projects: ["Analyze a simple beam structure", "Design a small building frame", "Calculate load distribution for a bridge"],
        resources: [
          { title: "Structural Analysis Course", url: "https://www.youtube.com/playlist?list=PLrRPmE9qHNrPpJjXhQpP0eKq5vX9vXvX", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: [],
        successCriteria: "You can analyze structures and design basic building frames",
        difficulty: "hard",
        marketDemand: "high"
      },
      {
        id: "autocad-civil",
        name: "AutoCAD for Civil Engineering",
        level: "beginner",
        whyItMatters: "Technical drawings are how civil engineers communicate designs. AutoCAD is essential.",
        projects: ["Create a site plan", "Draw building floor plans", "Design a road layout"],
        resources: [
          { title: "AutoCAD Civil Engineering", url: "https://www.youtube.com/playlist?list=PLrRPmE9qHNrPpJjXhQpP0eKq5vX9vXvX", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "6-8 weeks",
        prerequisites: [],
        successCriteria: "You can create professional civil engineering drawings using AutoCAD",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "digital-photographer",
    title: "Digital Photographer",
    slug: "digital-photographer",
    icon: "camera",
    category: "creative",
    shortDescription: "Capture moments and tell stories through images",
    description: "Photographers capture images for commercial, editorial, or personal purposes. With social media and digital marketing growing, demand for professional photographers is high.",
    dayInLife: "Morning: Check equipment, review shot list for today's shoot. Mid-morning: Photo shoot (product, portrait, or event). Afternoon: Edit photos in Lightroom/Photoshop. Late afternoon: Deliver final images to client. Evening: Update portfolio, market services on social media.",
    salaryRange: {
      entry: "3-6 LPA (or freelance: variable)",
      mid: "8-15 LPA",
      senior: "20-40+ LPA (or freelance)",
      source: "Industry reports"
    },
    growthOutlook: "High. Social media, e-commerce, and content marketing driving demand.",
    educationRequired: "Photography courses / Self-taught with portfolio",
    keyCompanies: ["Stock photo agencies", "Ad agencies", "Event companies", "E-commerce", "Freelance"],
    interviewProcess: "Portfolio review → Test shoot → Client interaction → Final selection",
    pros: ["Creative freedom", "Freelancing potential", "Travel opportunities", "Build personal brand"],
    cons: ["Equipment costs", "Irregular income initially", "Physical demands", "Weather dependent"],
    relatedCareers: ["graphic-designer", "video-editor", "content-creator"],
    workLifeBalance: 3,
    stressLevel: 2,
    creativeFreedom: 5,
    jobSecurity: 3,
    remoteWork: 3,
    skills: [
      {
        id: "camera-basics",
        name: "Camera Basics & Photography Fundamentals",
        level: "beginner",
        whyItMatters: "Understanding exposure, composition, and lighting is the foundation of great photography.",
        projects: ["Shoot 100 photos in manual mode", "Create a photo series on a theme", "Master the exposure triangle"],
        resources: [
          { title: "Photography Basics", url: "https://www.youtube.com/playlist?list=PL0QrkA1Pl3HX7VFMJ_pZhQfLLl2V3g0Ce", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: [],
        successCriteria: "You can shoot in manual mode and create well-composed, properly exposed images",
        difficulty: "easy",
        marketDemand: "high"
      },
      {
        id: "photo-editing",
        name: "Photo Editing (Lightroom/Photoshop)",
        level: "intermediate",
        whyItMatters: "Editing is where good photos become great. Post-processing skills are essential.",
        projects: ["Edit a portrait session in Lightroom", "Composite a creative image in Photoshop", "Create a consistent editing style"],
        resources: [
          { title: "Lightroom Tutorial", url: "https://www.youtube.com/watch?v=ZkLk8hVjqeU", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "4-6 weeks",
        prerequisites: ["camera-basics"],
        successCriteria: "You can professionally edit photos with consistent style and quality",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "lawyer",
    title: "Lawyer",
    slug: "lawyer",
    icon: "scale",
    category: "government",
    shortDescription: "Advocate for justice and legal rights",
    description: "Lawyers advise clients on legal matters, represent them in court, and help navigate the legal system. They can specialize in criminal, corporate, family, or constitutional law.",
    dayInLife: "Morning: Review case files, prepare for court proceedings. Mid-morning: Attend court hearings, argue cases. Afternoon: Meet with clients, review legal documents. Late afternoon: Research legal precedents, draft legal opinions. Evening: Prepare for next day's cases, attend legal seminars.",
    salaryRange: {
      entry: "4-8 LPA (Associate)",
      mid: "10-25 LPA",
      senior: "30-100+ LPA (Senior Advocate/Partner)",
      source: "Bar Council 2026"
    },
    growthOutlook: "High. Growing economy needs more lawyers. Corporate law and litigation both growing.",
    educationRequired: "5-year integrated law degree (BA LLB/BBA LLB) + Bar Council enrollment",
    keyCompanies: ["Cyril Amarchand Mangaldas", "AZB & Partners", "Khaitan & Co", "Luthra & Luthra", "Government Legal Services"],
    interviewProcess: "Law degree → Bar Council exam → Law firm interview → Case study discussion",
    pros: ["Respected profession", "Intellectually stimulating", "Good income potential", "Social impact", "Diverse specializations"],
    cons: ["Long working hours", "High pressure", "Court delays", "Need strong communication"],
    relatedCareers: ["civil-services", "chartered-accountant"],
    workLifeBalance: 2,
    stressLevel: 4,
    creativeFreedom: 3,
    jobSecurity: 4,
    remoteWork: 2,
    skills: [
      {
        id: "legal-fundamentals",
        name: "Legal Fundamentals & Constitution",
        level: "beginner",
        whyItMatters: "Understanding the Indian legal system and constitution is the foundation of legal practice.",
        projects: ["Study the Indian Constitution", "Analyze landmark Supreme Court cases", "Draft a legal notice"],
        resources: [
          { title: "Indian Constitution Course", url: "https://www.youtube.com/playlist?list=PL0uV72KpL5oJmHhYJv0VpE3V1L1T5cC0", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "12-16 weeks",
        prerequisites: [],
        successCriteria: "You can explain the Indian legal system and key constitutional provisions",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "legal-research",
        name: "Legal Research & Writing",
        level: "intermediate",
        whyItMatters: "Strong research and writing skills are what separate good lawyers from great ones.",
        projects: ["Research a legal issue and write a memo", "Draft a contract", "Prepare a case brief"],
        resources: [
          { title: "Legal Research Course", url: "https://www.youtube.com/playlist?list=PL0uV72KpL5oJmHhYJv0VpE3V1L1T5cC0", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["legal-fundamentals"],
        successCriteria: "You can research legal issues thoroughly and write clear legal documents",
        difficulty: "hard",
        marketDemand: "high"
      }
    ]
  },
  {
    id: "architect",
    title: "Architect",
    slug: "architect",
    icon: "lamp",
    category: "engineering",
    shortDescription: "Design buildings and spaces that inspire and function",
    description: "Architects design buildings, homes, and public spaces. They blend creativity with engineering to create functional, safe, and beautiful structures.",
    dayInLife: "Morning: Review design briefs, sketch concepts. Mid-morning: Create 3D models in Revit/SketchUp. Afternoon: Meet with clients, present design options. Late afternoon: Review structural drawings, coordinate with engineers. Evening: Study architectural trends, update portfolio.",
    salaryRange: {
      entry: "4-8 LPA",
      mid: "10-20 LPA",
      senior: "25-60+ LPA",
      source: "AmbitionBox 2026"
    },
    growthOutlook: "High. Urbanization and smart city projects creating demand. Green building specialization growing.",
    educationRequired: "B.Arch (5 years) + Council of Architecture registration",
    keyCompanies: ["Godrej Properties", "DLF", "Larsen & Toubro", "Architectural firms", "Freelance"],
    interviewProcess: "Portfolio review → Design test → Client presentation → Culture fit",
    pros: ["Creative + Technical work", "See your designs built", "Good income", "Diverse projects"],
    cons: ["Long education (5 years)", "Project delays", "Client changes", "Site visits required"],
    relatedCareers: ["civil-engineer", "graphic-designer"],
    workLifeBalance: 3,
    stressLevel: 3,
    creativeFreedom: 5,
    jobSecurity: 4,
    remoteWork: 2,
    skills: [
      {
        id: "architectural-design",
        name: "Architectural Design & Sketching",
        level: "beginner",
        whyItMatters: "Design thinking and sketching are the architect's primary tools for ideation.",
        projects: ["Sketch 10 building concepts", "Design a small house", "Create a site plan"],
        resources: [
          { title: "Architectural Sketching", url: "https://www.youtube.com/playlist?list=PLrRPmE9qHNrPpJjXhQpP0eKq5vX9vXvX", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: [],
        successCriteria: "You can sketch building concepts and create basic architectural drawings",
        difficulty: "medium",
        marketDemand: "high"
      },
      {
        id: "bim-software",
        name: "BIM Software (Revit, SketchUp)",
        level: "intermediate",
        whyItMatters: "BIM (Building Information Modeling) is the industry standard for modern architectural practice.",
        projects: ["Create a 3D model of a residential building", "Generate construction drawings from a model", "Collaborate on a multi-discipline project"],
        resources: [
          { title: "Revit Tutorial", url: "https://www.youtube.com/playlist?list=PLrRPmE9qHNrPpJjXhQpP0eKq5vX9vXvX", type: "video", platform: "YouTube", free: true }
        ],
        estimatedTime: "8-12 weeks",
        prerequisites: ["architectural-design"],
        successCriteria: "You can create complete architectural models and generate construction documents",
        difficulty: "medium",
        marketDemand: "high"
      }
    ]
  }
];

export const careerCategories = [
  { id: "technology", name: "Technology", icon: "monitor", description: "Software, AI, cybersecurity, cloud" },
  { id: "medical", name: "Medical & Health", icon: "hospital", description: "Doctors, nursing, pharmacy, psychology" },
  { id: "business", name: "Business & Finance", icon: "trending-up", description: "CA, marketing, entrepreneurship" },
  { id: "creative", name: "Creative & Media", icon: "palette", description: "Design, video, content creation, photography" },
  { id: "government", name: "Government & Public Service", icon: "landmark", description: "IAS, banking, teaching, law" },
  { id: "engineering", name: "Engineering", icon: "settings", description: "Mechanical, civil, architecture" },
] as const;

export function getCareerBySlug(slug: string): Career | undefined {
  return careers.find((c) => c.slug === slug);
}

export function getCareersByCategory(category: string): Career[] {
  return careers.filter((c) => c.category === category);
}

export function getSkillBySlug(careerSlug: string, skillId: string): Skill | undefined {
  const career = getCareerBySlug(careerSlug);
  return career?.skills.find((s) => s.id === skillId);
}

export function searchCareers(query: string): Career[] {
  const lower = query.toLowerCase();
  return careers.filter(
    (c) =>
      c.title.toLowerCase().includes(lower) ||
      c.shortDescription.toLowerCase().includes(lower) ||
      c.category.toLowerCase().includes(lower)
  );
}
