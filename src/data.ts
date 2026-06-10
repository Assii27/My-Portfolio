import { Project, Skill, TimelineItem } from './types';

export const PROFILE = {
  name: "ASIF MANER",
  title: "Building High-Performance CMS Archi|",
  domainSpecialty: "Handling Millions of Transactions Securely. Specialized in high-availability backend architectures.",
  tagline: "5+ Years Experience | Spring Boot | Microservices | Kafka",
  email: "dev.asifmaner@gmail.com",
  phone: "+91 8483943566",
  city: "Pune",
  location: "Pune, India",
  github: "https://github.com/Assii27/My-Portfolio/", 
  linkedin: "https://linkedin.com/in/asifmaner", 
  bioParagraphs: [
    "I build fast and reliable payment systems that handle transactions smoothly.",
    "With 5+ years of experience, I develop high-performance backend systems for banking and fintech. I specialize in Java, Spring Boot, and Microservices, focusing on speed, scalability, and real-time transaction processing."
  ],
  coreExpertise: [
    "Payment Systems Expert",
    "Low Latency Systems",
    "High Availability APIs",
    "CMS Architecture"
  ],
  domainFocus: [
    "Card Management (CMS)",
    "Transaction Switching",
    "Banking Workflows",
    "Settlement Systems"
  ],
  declaration: "I hereby declare that the above information is true and correct to the best of my knowledge and belief.",
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Transactions/Day", value: "1M+" },
    { label: "System Uptime", value: "99.9%" },
    { label: "APIs Delivered", value: "50+" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Payment Switch System",
    description: "Built robust backend modules for transaction processing, integrating CMS, prepaid card load networks, and complex settlement systems for real-time financial operations.",
    longDescription: "Developed and enhanced Java-based backend modules for Switch System (REN Product) in the Payment Domain, working on prepaid card issuing lifecycles, transaction routing, and contributing to High Availability solutions.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=850&auto=format&fit=crop",
    tags: ["Java", "Spring Boot", "Kafka", "Payments"],
    category: "fullstack",
    githubUrl: "https://github.com/asifmaner",
    liveUrl: "#",
    features: [
      "10K+ Transactions/Day",
      "30% Latency Reduction",
      "99.9% Success Rate",
      "Architecture: Microservices • Event-Driven",
      "Robust state transaction routing logic"
    ]
  },
  {
    id: "project-2",
    title: "Banking Admin Application",
    description: "Developed comprehensive registration modules and secure logging features for a banking administration platform, focusing on data integrity and security.",
    longDescription: "Engineered secure user registration modules supporting individual and corporate clients. Includes adaptive dynamic menu control setups, granular access control matrices, and strict transaction logging systems to ensure an unalterable history of administrative activities.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=850&auto=format&fit=crop",
    tags: ["Java", "Hibernate", "MySQL", "Banking"],
    category: "fullstack",
    githubUrl: "https://github.com/asifmaner",
    liveUrl: "#",
    features: [
      "40% Faster Onboarding",
      "Secure Audit Logs",
      "Role-based Access",
      "Architecture: Microservices • Event-Driven",
      "Dynamic menu configurations"
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: "Java", category: "languages", level: 96, description: "Multithreading, OOP, streams, lambdas, memory optimization" },
  { name: "Spring Boot", category: "frontend", level: 95, description: "Microservice bootstrapper, auto-config, dependency injection models" },
  { name: "Hibernate", category: "frontend", level: 92, description: "ORM maps, entity mappings, query tuning, transaction logic" },
  { name: "Kafka", category: "backend", level: 90, description: "Producer/consumer loops, partitioned event queues, streaming logs" },
  { name: "MySQL", category: "languages", level: 90, description: "Query optimization, indexes routing, transaction controls" },
  { name: "Microservices", category: "backend", level: 94, description: "Decoupled domain routing, service discovery, config maps" },
  { name: "REST API", category: "frontend", level: 95, description: "Highly compliant HTTP endpoints, status mapping, payload reduction" },
  { name: "Git", category: "cloud-tools", level: 92, description: "Clean feature branching, merge policies, visual diff checking" },
  { name: "IntelliJ", category: "cloud-tools", level: 95, description: "Enterprise debug extensions, memory trackers, profiling" },
  { name: "Jira", category: "cloud-tools", level: 90, description: "Sprint boards management, target estimates, task telemetry" }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "exp-1",
    year: "March 2024 — Nov 2025",
    title: "Software Developer-Java",
    subtitle: "Euronet Services Pvt Ltd, Pune",
    description: "Developed and enhanced Java-based backend modules for Switch System (REN Product) in the Payment Domain. Worked on Card Management System (CMS) modules including Prepaid Card issuing lifecycles, load/reload configurations, card issuance, transaction processing, and statement report generation.",
    highlights: [
      "Architected secure Prepaid Card features, including card reload triggers, state validation, activation systems, and transaction fee logic.",
      "Involved in payment processing flows ensuring smooth real-time transaction operations.",
      "Performed data transformation using XML/XSL/JSON and handled data mapping for fintech and banking formats.",
      "Participated in debugging, RCA (Root Cause Analysis), defect fixing and issue resolution in UAT and Production environments.",
      "Worked on issuer transactions authorization routing and end-of-day settlement.",
      "Prepared Low-Level Design (LLD) with class diagrams and contributed to technical documentation."
    ],
    type: "work"
  },
  {
    id: "exp-2",
    year: "Sept 2020 — Jan 2024",
    title: "Software Developer",
    subtitle: "SPCL Infotech",
    description: "Developed and maintained Java-based backend modules for Banking Admin Application used by banks to manage and update customer information.",
    highlights: [
      "Built customer and corporate registration modules and supported complete registration workflows.",
      "Designed and developed menu/submenu management features for service configuration and dynamic UI control.",
      "Implemented secure transaction logging to record and monitor all banking activities.",
      "Designed and implemented business logic using Java, Spring Boot, Hibernate and OOP principles to ensure system reliability and scalability.",
      "Managed MySQL database operations including query optimization, stored procedures and data handling.",
      "Debugged, analysed defects and performed RCA to improve system performance and stability."
    ],
    type: "work"
  }
];
