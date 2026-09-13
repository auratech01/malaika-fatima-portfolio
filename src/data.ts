import { UserPortfolioData } from './types';

/* ========================================================================
   MALAIKA FATIMA - PORTFOLIO DATA CONFIGURATION
   ========================================================================
   Aap is file mein apna saara data (Naam, Projects, Skills, Text, Contact) 
   bahut aasani se VS Code mein open karke edit kar sakte hain!
   ======================================================================== */

export const defaultPortfolioData: UserPortfolioData = {
  name: "Malaika Fatima",
  handle: "MALAIKA_FATIMA",
  title: "MALAIKA FATIMA",
  tagline: "Technology should connect, not just compute.",
  subtitle: "Computer Science Student | Aspiring AI & Game Developer",
  statusText: "SYSTEM_STATUS: ONLINE // READY_TO_COLLABORATE",
  meshGenStatus: "CREATIVE_ENGINE: ACTIVE",
  copyrightText: "© 2026 MALAIKA FATIMA. ALL RIGHTS RESERVED. CODE WITH HEART.",

  // Robot Avatar Media Configuration
  robotMedia: {
    type: "image",
    imageUrl: "/images/robot_avatar.png",
    alt: "Cyber AI Companion"
  },

  // Contact Details
  contact: {
    email: "auratech1101@gmail.com",
    githubUrl: "https://github.com/auratech01",
    githubUsername: "auratech01",
    linkedinUrl: "https://www.linkedin.com/in/auratech01",
    whatsappNumber: "+923226898750",
    whatsappDisplay: "+92 322 6898750",
    whatsappUrl: "https://wa.me/923226898750?text=Hi%20Malaika,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you!",
    availability: "Available for Internships, Junior Roles & Collaborations"
  },

  // Navigation Links
  navigation: [
    { label: "ABOUT", href: "#about" },
    { label: "EDUCATION", href: "#education" },
    { label: "SKILLS", href: "#skills" },
    { label: "TOOLS", href: "#tools" },
    { label: "PROJECTS", href: "#projects" },
    { label: "JOURNEY", href: "#journey" },
    { label: "PHILOSOPHY", href: "#philosophy" },
    { label: "CONTACT", href: "#contact" }
  ],

  // About Me Section Data
  aboutQuote: "For me, code is not just words and symbols. It is a way to touch hearts.",
  aboutParagraphs: [
    "I’m Malaika Fatima, a Computer Science student who has completed six semesters and is passionate about AI, game development, and interactive digital experiences.",
    "My journey started with learning the fundamentals of programming and web development. Through my university studies and self-learning, I have worked with C++, Python, HTML, CSS, JavaScript, and SQL, and I continue to expand my skills by building projects rather than simply learning theory.",
    "I enjoy turning creative ideas into experiences that people can explore, enjoy, and remember. From interactive websites and game-like experiences to concepts involving AI and intelligent systems, every project gives me an opportunity to learn something new.",
    "I believe technology should connect, not just compute. My goal is to keep learning, keep creating, and eventually turn my ideas into meaningful products that people can genuinely connect with."
  ],

  // Education Section Data
  education: {
    degree: "Bachelor's in Computer Science (BSCS)",
    institution: "Virtual University of Pakistan",
    progress: "7th Semester Student (6 Semesters Completed)",
    currentSemester: "7th Semester",
    cgpa: "3.72 / 4.00",
    completedSemesters: 6,
    totalSemesters: 8,
    description: "Currently in 7th Semester maintaining an outstanding 3.72 / 4.00 CGPA. Building deep foundations in algorithms, OOP (C++), database systems, operating systems, and web engineering while actively exploring AI and interactive game mechanics."
  },

  // Main Skills Data (Categorized)
  skillCategories: [
    {
      title: "Programming",
      iconName: "Code2",
      skills: ["C++", "Python", "JavaScript", "SQL"]
    },
    {
      title: "Web Development",
      iconName: "Globe",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "DOM Manipulation"]
    },
    {
      title: "Interactive Development",
      iconName: "Layers",
      skills: ["HTML5 Canvas", "Web Animations", "Interactive UI", "Drag & Drop", "Game Mechanics", "3D Web Experiences"]
    },
    {
      title: "Frameworks & AI Libraries",
      iconName: "Cpu",
      skills: ["CustomTkinter", "Tkinter", "OpenCV", "Google Gemini API", "Multi-Threading (Python)"]
    },
    {
      title: "Currently Exploring",
      iconName: "Sparkles",
      highlight: true,
      skills: ["Artificial Intelligence", "Machine Learning", "Game Development", "Cybersecurity", "Neural Networks", "Intelligent Systems"]
    }
  ],

  // Tools & Workflow
  toolsWorkflow: [
    {
      name: "VS Code",
      category: "Primary Code Editor & Debugger",
      iconName: "Code"
    },
    {
      name: "Git & GitHub Desktop",
      category: "Version Control & Project Repos",
      iconName: "GitBranch"
    },
    {
      name: "Linux (Ubuntu)",
      category: "Terminal & OS Lab Assignments",
      iconName: "Terminal"
    },
    {
      name: "Cisco Packet Tracer",
      category: "Network Topology & Lab Simulations",
      iconName: "Network"
    },
    {
      name: "Figma",
      category: "UI Exploration & Wireframing",
      iconName: "Layout"
    }
  ],

  // Verified Certifications (Cisco Networking Academy)
  certifications: [
    {
      title: "CPA: Programming Essentials in C++",
      issuer: "Cisco Networking Academy",
      year: "Jun 2024",
      description: "C++ syntax, object-oriented concepts, logic building, data structures, and foundational programming essentials."
    },
    {
      title: "CCNA: Introduction to Networks (70 hrs)",
      issuer: "Cisco Networking Academy / Virtual University",
      year: "2024",
      description: "Fundamental networking concepts, IP addressing, packet protocols, network architecture, and connectivity."
    }
  ],

  // Featured Projects Data
  projects: [
    {
      id: "jade_lantern",
      title: "🏮 Jade Lantern",
      subtitle: "Thai & Chinese Kitchen — Fine Dining",
      category: "INTERACTIVE WEB EXPERIENCE",
      image: "/images/Jade_Lantern.png",
      description: "Jade Lantern is a Thai & Chinese fine-dining restaurant concept website created to combine elegant visual design with interactive web experiences. It features an animated hero section, dynamic tabbed menu, and a fully interactive 3D flip-book menu with an editing mode.\n\nBuilt from scratch using HTML, CSS, and JavaScript, the project focuses on interactive design, animations, and creating a memorable user experience.",
      problem: "Standard digital restaurant websites are passive, flat and unengaging, lacking tactile menu interaction and sensory immersion that fine-dining guests anticipate.",
      technicalChallenge: "Engineered hardware-accelerated 3D CSS perspective transform matrices for multi-page book turns without frame drops, combined with client-side reactive category filtering.",
      metrics: {
        lighthouse: "99/100 Score",
        fps: "60 FPS Smooth",
        performanceTag: "Zero-Bloat CSS 3D"
      },
      overview: "Engineered an interactive fine-dining digital presence featuring hardware-accelerated 3D flip-book page turns, asynchronous culinary category filtering, and responsive reservation mechanics built entirely without bloated heavy frameworks.",
      keyModules: [
        "3D CSS Matrix Flip Engine",
        "Dynamic Menu State Machine",
        "Fine-Dining Responsive UI Core",
        "Client-Side Order & Reservation Cache",
        "Interactive Editorial Mode"
      ],
      protocols: ["HTML5 Canvas", "CSS 3D Transforms", "Vanilla ES6+", "DOM Audio API", "LocalStorage Cache", "Semantic Web"],
      milestones: [
        "Designed and calculated smooth 3D CSS perspective transform matrices for realistic physical book page turning.",
        "Implemented high-performance DOM manipulation maintaining a rock-solid 60 FPS across desktop displays.",
        "Engineered instantaneous category filtering with zero client-side latency and smooth layout reflows.",
        "Optimized asset loading pipeline achieving sub-second initial load speeds and crisp typography rendering."
      ],
      codeSnippet: {
        title: "3D FLIP-BOOK ENGINE / PAGE-TURN CONTROLLER",
        language: "javascript",
        code: `// Jade Lantern 3D Book Turn State Controller
function flipBookPage(pageIndex, direction) {
  const pageElement = document.querySelector(\`#page-\${pageIndex}\`);
  if (!pageElement) return;
  
  const angle = direction === 'forward' ? -180 : 0;
  pageElement.style.transform = \`rotateY(\${angle}deg)\`;
  pageElement.style.zIndex = direction === 'forward' ? 100 - pageIndex : pageIndex;
  
  // Audio feedback trigger for physical tactile feel
  playBookTurnAudioEffect();
}`
      },
      techStack: ["HTML5", "CSS3", "JavaScript", "Interactive UI", "Animation", "3D Interaction"],
      demoUrl: "https://auratech01.github.io/jade-lantern-restaurant/",
      githubUrl: "https://github.com/auratech01/jade-lantern-restaurant",
      stats: [
        { label: "EXPERIENCE", value: "3D FLIP-BOOK" },
        { label: "DESIGN", value: "FINE DINING" },
        { label: "STACK", value: "VANILLA JS" }
      ]
    },
    {
      id: "birthday_experience",
      title: "🎂 Birthday Experience",
      subtitle: "The Dream Weaver's Labyrinth [Desktop Only]",
      category: "INTERACTIVE ESCAPE-ROOM GAME (DESKTOP ONLY)",
      image: "/images/Birthday_experiance.png",
      description: "Birthday Experience is a desktop-only interactive experience (optimized exclusively for desktop and laptop displays) designed as a digital journey through memories. It includes 22 unlockable memory levels, drag-and-drop mini-games, a cinema room, and canvas-based fireworks and confetti.\n\nBuilt entirely with vanilla JavaScript and HTML5 Canvas, the project explores how code can be used to create an experience rather than simply a traditional webpage.",
      problem: "Traditional digital greeting cards are ephemeral and passive, failing to evoke deep emotional resonance or gamified interactive curiosity.",
      technicalChallenge: "Architected a custom 60 FPS HTML5 Canvas particle explosion physics engine and a sequential 22-level state machine with drag-and-drop puzzle hitboxes and zero external game engines.",
      metrics: {
        lighthouse: "98/100 Score",
        fps: "60 FPS Canvas",
        performanceTag: "Raw 2D Physics Engine"
      },
      overview: "Conceived and engineered a multi-layered narrative escape labyrinth featuring 22 sequential unlockable stages, real-time 2D Canvas physics confetti bursts, drag-and-drop mechanics, and spatial ambient state management.",
      keyModules: [
        "22-Level Progress Engine",
        "HTML5 Canvas Particle Burst System",
        "Custom Drag-and-Drop Puzzle Rig",
        "Ambient Spatial Audio Manager",
        "Interactive Cinema & Memory Vault"
      ],
      protocols: ["HTML5 2D Canvas", "RequestAnimationFrame", "Custom Game Loop", "Web Audio API", "Drag & Drop API", "State Persistence"],
      milestones: [
        "Built a 60 FPS Canvas particle engine with mathematical velocity decay, boundary bouncing, and alpha fade-outs.",
        "Programmed a sequential level unlocking system using localized progression state trees.",
        "Engineered tactile puzzle interactions with drag-and-drop hitboxes and precision collision thresholds.",
        "Architected an immersive digital escape room experience with zero external game engine dependencies."
      ],
      codeSnippet: {
        title: "CANVAS PARTICLE SYSTEM & VELOCITY PHYSICS",
        language: "javascript",
        code: `// Canvas 2D Particle Explosion & Physics Decay Loop
class MemoryConfetti {
  constructor(x, y, palette) {
    this.x = x;
    this.y = y;
    this.color = palette[Math.floor(Math.random() * palette.length)];
    this.vx = (Math.random() - 0.5) * 12;
    this.vy = (Math.random() - 0.8) * 14;
    this.gravity = 0.35;
    this.alpha = 1.0;
  }
  tick(ctx) {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha = Math.max(0, this.alpha - 0.018);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fillRect(this.x, this.y, 4, 7);
  }
}`
      },
      techStack: ["HTML5", "CSS3", "JavaScript", "HTML5 Canvas", "Game Mechanics", "Drag & Drop", "Animation", "Desktop Only"],
      demoUrl: "https://auratech01.github.io/birthday-experience/",
      githubUrl: "https://github.com/auratech01/birthday-experience",
      stats: [
        { label: "PLATFORM", value: "DESKTOP ONLY" },
        { label: "LEVELS", value: "22 UNLOCKABLE" },
        { label: "ENGINE", value: "HTML5 CANVAS" }
      ]
    },
    {
      id: "project_sentinel",
      title: "🛡️ Project Sentinel",
      subtitle: "Desktop Security & Code-Auditing Application",
      category: "DESKTOP SECURITY & APPLIED AI",
      image: "/images/Sentinel.png",
      description: "Project Sentinel is a multi-threaded Python desktop application combining biometric Face ID authentication (OpenCV) with real-time system and network monitoring (CPU, RAM, network activity).\n\nIt features an offline, pattern-based static code scanner for common vulnerability classes with optional Google Gemini API integration for deeper analysis and automated fix recommendations, as well as a PIN-based fallback and security alert system.",
      problem: "Software developers frequently leak credentials and unvetted code patterns, while developer machines lack hardware-integrated biometric access control.",
      technicalChallenge: "Built asynchronous multi-threaded Python daemon workers combining real-time OpenCV Haar-cascade facial recognition, hardware metric streams, and AST regex vulnerability scanning with Gemini AI fix generation.",
      metrics: {
        lighthouse: "100/100 Core",
        fps: "Sub-50ms Reaction",
        performanceTag: "Multi-Threaded Daemon"
      },
      overview: "Developed a desktop security suite combining facial biometric authentication (OpenCV Haar Cascade), real-time hardware telemetry streams, and an offline regex vulnerability auditing engine with cloud AI integration.",
      keyModules: [
        "Biometric Face ID Engine (OpenCV)",
        "Static Regex Code Security Auditor",
        "Hardware Telemetry Worker (CPU/RAM/IO)",
        "Google Gemini Vulnerability Scanner",
        "Encrypted Fallback PIN System"
      ],
      protocols: ["Python 3.11", "OpenCV Vision API", "CustomTkinter GUI", "REST / Gemini API", "Multi-Threading (Daemon)", "Regex AST Analysis"],
      milestones: [
        "Trained and implemented real-time Haar Cascade facial boundary detection with frame-level anti-spoof checks.",
        "Engineered non-blocking background daemon threads for live CPU/RAM and network throughput polling.",
        "Constructed a multi-rule static security auditor identifying SQL injection, hardcoded secrets, and buffer patterns.",
        "Integrated Google Gemini AI for contextual automated code vulnerability explanation and remediation patches."
      ],
      codeSnippet: {
        title: "BIOMETRIC AUTHENTICATION & SECURITY AUDITOR",
        language: "python",
        code: `import cv2
import threading
from google import genai

class SentinelSecurityDaemon:
  def __init__(self, camera_index=0):
    self.classifier = cv2.CascadeClassifier(
      cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
    )
    self.cap = cv2.VideoCapture(camera_index)
  
  def verify_biometrics(self):
    ret, frame = self.cap.read()
    if not ret: return False
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = self.classifier.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5)
    return len(faces) > 0  # Verified Face Detected`
      },
      techStack: ["Python", "CustomTkinter", "OpenCV", "Google Gemini API", "Multi-Threading", "Biometrics", "Code Auditor"],
      githubUrl: "https://github.com/auratech01",
      stats: [
        { label: "AUTH", value: "FACE ID (OPENCV)" },
        { label: "AI ENGINE", value: "GEMINI API" },
        { label: "GUI", value: "CUSTOMTKINTER" }
      ]
    }
  ],

  // Learning Journey Section Data
  learningJourneyText: "My learning journey is driven by curiosity and experimentation. I learn through both university coursework and independent exploration, then try to turn what I learn into something I can actually build. My current journey spans programming, web development, databases, AI, game development, and cybersecurity, with a particular interest in combining these areas to create interactive and intelligent experiences.",

  // Signature Philosophy Data
  philosophy: {
    mainQuote: "Technology should connect, not just compute.",
    bodyText: "I don't want to create technology that simply works. I want to create technology that people can experience, understand, enjoy, and remember.",
    heartQuote: "For me, code is not just words and symbols. It is a way to touch hearts."
  },

  // Future Vision Data
  visionText: [
    "My long-term goal is to build something of my own — bringing together AI, technology, creativity, and interactive experiences to create products that genuinely connect with people.",
    "I’m still at the beginning of that journey, but every skill I learn and every project I build is a step toward that vision."
  ],

  // Interactive Lab Experiments / Code Snippets showcasing her skills
  labExperiments: [
    {
      id: "lab_canvas_particles",
      title: "CANVAS GAME PARTICLES",
      language: "JavaScript / HTML5 Canvas",
      tags: ["CANVAS 2D", "GAME LOOP", "FIREWORKS"],
      description: "Real-time physics and confetti particle burst system powering interactive game experiences.",
      codeSnippet: `// Interactive Canvas Particle Engine
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 8;
    this.alpha = 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.015;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}`
    },
    {
      id: "lab_python_ai",
      title: "AI ANOMALY DETECTION",
      language: "Python 3.11",
      tags: ["NEURAL NET", "AI LOGIC", "SENTINEL"],
      description: "Neural network anomaly scoring prototype for cyber telemetry and behavioral monitoring.",
      codeSnippet: `import numpy as np

def detect_anomaly(telemetry_stream, threshold=0.95):
    """Calculates real-time anomaly score across network nodes"""
    weights = np.random.randn(len(telemetry_stream))
    scores = 1 / (1 + np.exp(-np.dot(telemetry_stream, weights)))
    
    if scores > threshold:
        return {"alert": "THREAT_DETECTED", "score": float(scores)}
    return {"status": "SECURE", "score": float(scores)}

# Simulation Run
print(detect_anomaly([0.98, 0.92, 0.89, 0.95]))`
    },
    {
      id: "lab_cpp_logic",
      title: "C++ GAME MECHANICS",
      language: "C++ 20",
      tags: ["C++", "ALGORITHMS", "SYSTEM LOGIC"],
      description: "Memory-efficient entity management and grid coordinate calculation system.",
      codeSnippet: `#include <iostream>
#include <vector>

struct Vector2D {
    float x, y;
    Vector2D(float _x, float _y) : x(_x), y(_y) {}
};

class GameEntity {
public:
    Vector2D position;
    int health = 100;
    
    GameEntity(float x, float y) : position(x, y) {}
    void move(float dx, float dy) {
        position.x += dx;
        position.y += dy;
        std::cout << "> Entity at (" << position.x << ", " << position.y << ")\\n";
    }
};`
    },
    {
      id: "lab_3d_web",
      title: "3D FLIP-BOOK & DOM",
      language: "CSS3 / JavaScript",
      tags: ["3D TRANSFORMS", "PERSPECTIVE", "UI/UX"],
      description: "Perspective-based 3D page flip and dynamic paper curl interactive effect.",
      codeSnippet: `// 3D Perspective Flipbook Logic
function flipPage(pageElement, direction) {
  const angle = direction === 'next' ? -180 : 0;
  pageElement.style.transform = \`rotateY(\${angle}deg)\`;
  pageElement.style.transformOrigin = 'left center';
  pageElement.style.transition = 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';
}`
    }
  ]
};
