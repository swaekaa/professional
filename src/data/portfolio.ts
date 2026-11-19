// ============================================================
// PORTFOLIO DATA — Single source of truth for all content
// Synchronized with live dossier at https://professional-psi-ten.vercel.app
// ============================================================

export const personal = {
  name: "Ekaansh Sawaria",
  handle: "swaekaa",
  initials: "EK",
  title: "Software Engineer · Multi-Agent RAG & Distributed Systems",
  tagline: "Final-Year Computer Science @ Manipal University Jaipur · Ex-ASE Intern @ Accenture · Available for Internships & Full-Time Roles Jan 2027",
  location: "Jaipur & Bangalore, India",
  email: "sawariaekaansh@gmail.com",
  phone: "8108700827",
  availability: "Available for Internships & Full-Time Roles · Starting January 2027",
  github: "https://github.com/swaekaa",
  githubUsername: "swaekaa",
  leetcode: "https://leetcode.com/u/meanturtle/",
  leetcodeUsername: "meanturtle",
  x: "https://x.com/swaaeka",
  xHandle: "@swaaeka",
  lastfm: "https://www.last.fm/user/moanturtle",
  lastfmUsername: "moanturtle",
  avatar: "/images/profile-x.jpg",
  xBio: "Final-year CS @ Manipal University Jaipur · Ex-ASE Intern @accenture · Building agentic AI & distributed systems",
  linkedin: "https://www.linkedin.com/in/sawaria-ekaansh/",
  resume: "/resume.pdf",
  bioHeadline: "Final-Year Computer Science @ Manipal University Jaipur",
  subHeadline: "Ex-ASE Intern @ Accenture · Open for Jan 2027 Internships & Full-Time Roles · Jaipur & Bangalore, India",
  bioParagraphs: [
    "Final-year Computer Science undergraduate at Manipal University Jaipur, specializing in multi-agent orchestration, hybrid RAG pipelines, and scalable backend systems.",
    "At Accenture, I worked as an Associate Software Engineering Intern architecting an enterprise multi-agent RAG platform, coordinating autonomous tool-using agents via LangGraph state machines and engineering hybrid BM25 and dense retrieval with cross-encoder reranking.",
    "Available for Software Engineering internships and full-time roles starting January 2027 (Jaipur, Bangalore, or Remote)."
  ],
  interests: [
    "Agentic AI & Multi-Agent Orchestration",
    "RAG & Hybrid Search Engines",
    "Scalable Backend & Microservices",
    "Deterministic Decision Systems",
    "Transformer Quantization",
    "Distributed Systems & Payment APIs",
    "Computer Vision & Explainable AI"
  ],
  stats: {
    contributions: "950+",
    repos: "40",
    streak: "23+ days",
    retrievalRelevanceGain: "+35%",
    indexingSpeedup: "-45%"
  }
};

export const githubStats = {
  username: "swaekaa",
  profileUrl: "https://github.com/swaekaa",
  totalContributions: "848",
  publicRepos: "40",
  currentStreak: "23 days",
  peakHours: "00:00 to 04:00 (Late Night Systems)",
  languages: [
    { name: "Python & ML", pct: 60, color: "#3572A5" },
    { name: "TypeScript", pct: 20, color: "#6366F1" },
    { name: "JavaScript", pct: 9, color: "#F7DF1E" },
    { name: "Java & C", pct: 6, color: "#E76F51" },
    { name: "Shell & SQL", pct: 5, color: "#10B981" }
  ],
  pinnedHighlights: [
    { name: "RExplain", desc: "AST parsing & RAG codebase explainer", lang: "FastAPI & React" },
    { name: "VisionSat", desc: "Grad-CAM explainable satellite vision", lang: "PyTorch & ResNet" },
    { name: "HackerzStreet-25", desc: "Multilingual Indian language RAG", lang: "LLaMA 3 & FastText" }
  ]
};

export const leetcodeStats = {
  username: "meanturtle",
  profileUrl: "https://leetcode.com/u/meanturtle/",
  totalSolved: 307,
  easy: 112,
  medium: 180,
  hard: 15,
  totalSubmissions: 563,
  acceptanceRate: "60.4%",
  ranking: "Top 37.8%",
  contestRating: 1527,
  streak: "23 days",
  activeDays: 134,
  languages: ["Java", "MySQL", "C++", "C"],
  topTopics: [
    { name: "Arrays & Matrices", solved: 142 },
    { name: "Strings & Parsing", solved: 74 },
    { name: "Hash Tables & Sets", solved: 59 },
    { name: "Two Pointers", solved: 42 },
    { name: "Binary Trees & DFS", solved: 41 },
    { name: "Dynamic Programming", solved: 31 },
    { name: "Binary Search", solved: 23 },
    { name: "Greedy Algorithms", solved: 21 }
  ],
  badges: ["100 Days Badge 2026", "50 Days Badge 2026", "100 Days Badge 2025", "50 Days Badge 2025"]
};

export const education = {
  institution: "Manipal University Jaipur",
  degree: "B.Tech in Computer Science",
  period: "Aug 2023 to Present",
  cgpa: "8.51 out of 10",
  location: "Jaipur, Rajasthan",
  schools: [
    {
      institution: "Manipal University Jaipur",
      degree: "B.Tech in Computer Science",
      score: "CGPA: 8.51 out of 10",
      period: "Aug 2023 to Present",
      type: "Undergraduate Degree",
      details: "Core focus: DSA, OOP, DBMS, Operating Systems, Computer Networks, Distributed Systems, System Design"
    },
    {
      institution: "Hiranandani Foundation School",
      degree: "Class XII (ICSE)",
      score: "81%",
      period: "2023",
      type: "Senior Secondary",
      details: "Physics, Chemistry, Mathematics, Computer Science"
    },
    {
      institution: "Hiranandani Foundation School",
      degree: "Class X (ICSE)",
      score: "96%",
      period: "2021",
      type: "Secondary School",
      details: "High Academic Distinction (96% aggregate)"
    }
  ],
  highlights: [
    "Core CS: DSA, OOP, DBMS, Operating Systems, Computer Networks, Distributed Systems, System Design",
    "Manipal University Jaipur · B.Tech in Computer Science: CGPA 8.51 out of 10 (Aug 2023 to Present)",
    "Hiranandani Foundation School · Class XII (ICSE): 81% (2023)",
    "Hiranandani Foundation School · Class X (ICSE): 96% (2021)"
  ]
};

export const experience = [
  {
    id: "accenture",
    company: "Accenture",
    role: "Associate Software Engineering Intern",
    location: "Bangalore, India",
    period: "May 2026 to July 2026",
    active: true,
    tagline: "Multi-Agent Enterprise RAG Platform",
    whatIBuilt: "Architected an enterprise multi-agent Retrieval-Augmented Generation (RAG) platform to resolve complex technical queries across distributed enterprise knowledge bases.",
    whatIOwned: [
      "Orchestrated multi-agent routing workflows using LangGraph state machines, coordinating specialized agents with dynamic execution tool dispatching.",
      "Engineered the hybrid retrieval pipeline combining BM25 keyword matching with dense vector embeddings and Cross-Encoder reranking (Reciprocal Rank Fusion).",
      "Enforced deterministic JSON schema validation and hallucination filters on all agent outputs before dispatching tool calls or surfacing responses."
    ],
    defensibleOutcomes: [
      "+35% domain retrieval relevance gain over dense-only baseline retrieval.",
      "-45% reduction in multi-hop query lookup latency through cached routing state.",
      "Zero sensitive client data leakage via strict schema boundaries and citation verification."
    ],
    summary:
      "Enterprise multi-agent RAG platform: LangGraph orchestration, hybrid BM25 + dense retrieval, Cross-Encoder reranking, and deterministic tool validation.",
    narrative: [
      "Architected an enterprise-scale multi-agent RAG platform in Python and FastAPI to resolve complex technical support and operational queries across distributed knowledge bases.",
      "Personally owned the LangGraph orchestration state machine, coordinating specialized agents with dynamic tool dispatching, and engineered the hybrid retrieval pipeline combining BM25 keyword matching with dense vector embeddings and Cross-Encoder reranking.",
      "Enforced deterministic schema validation and hallucination filters on all agent outputs, achieving a +35% domain retrieval relevance gain and reducing multi-hop query latency by 45% while preserving enterprise data boundaries."
    ],
    technologies: [
      "PYTHON",
      "FASTAPI",
      "LANGGRAPH",
      "MULTI AGENT SYSTEMS",
      "RAG PIPELINES",
      "BM25",
      "DENSE RETRIEVAL",
      "CROSS ENCODER",
      "QUADRANK",
      "DYNAMIC TOOL CALLING"
    ]
  }
];

export const projects = [
  {
    id: "nexora",
    number: "01",
    name: "NEXORA",
    category: "AGENTIC COMMERCE & DISTRIBUTED SYSTEMS",
    subtitle: "The Agreement Layer for AI Commerce (Razorpay AI Buildathon 2026)",
    shortDescription:
      "Infrastructure for agentic commerce separating probabilistic LLM haggling from deterministic financial settlement via Razorpay programmatic payment links.",
    featured: true,
    problem:
      "Connecting probabilistic LLMs directly to payment rails causes unpredictable financial liabilities, hallucinations, and contract violations in commercial transactions.",
    hardestDecision:
      "Separating LLM reasoning from payment authorization: Buyer and Merchant LLM agents (LangGraph & GPT-4o) negotiate terms dynamically, but authorization is strictly handed off to an immutable deterministic state machine and margin math engine before any Razorpay order API is invoked.",
    results:
      "Tested across 50+ multi-round agent haggling sessions under adversarial prompt injection with 100% adherence to merchant margin boundaries (zero below-floor discount leakage); automated Razorpay payment link generation and webhook reconciliation.",
    architecture:
      "Strict architectural separation: 'LLMs propose. Deterministic systems decide.' Buyer and Merchant agents (LangGraph and GPT-4o) negotiate in multi-round loops. Once consensus is reached, the Agreement Engine validates terms against merchant margin floors and discount caps before invoking Razorpay programmatic order creation.",
    highlights: [
      "Strict separation of LLM negotiation from deterministic payment execution",
      "Multi-round autonomous B2B haggling over price, volume, delivery SLA, and warranty",
      "Deterministic Policy Engine enforcing mathematical merchant floors and discount caps",
      "Razorpay programmatic payment settlement integration with automatic payment link generation and webhook reconciliation",
      "Cryptographically verifiable audit trails stored in PostgreSQL with SQLAlchemy ORM"
    ],
    technologies: ["PYTHON 3.11", "FASTAPI", "LANGGRAPH", "GPT-4O", "POSTGRESQL", "SQLALCHEMY", "RAZORPAY API", "REACT"],
    challenges:
      "Guaranteeing structured negotiation outputs across multi-round agent turns while preventing adversarial prompt-injection attacks from overriding merchant minimum price bounds.",
    github: "https://github.com/swaekaa/NEXORA",
    demo: "https://nexora-frontend.vercel.app",
    gif: "/images/projects/nexora_landing.gif",
    gifCaption: "Live Negotiation Arena: Multi round autonomous B2B agent haggling, real time dialogue exchange, policy validation, and Razorpay settlement"
  },
  {
    id: "rexplain",
    number: "02",
    name: "RExplain",
    category: "AI & DEVELOPER TOOLS",
    subtitle: "AI-Powered GitHub Repository Analysis Platform",
    shortDescription:
      "Full-stack GitHub repository comprehension platform that automatically explains unfamiliar codebases using static AST parsing, architecture extraction via Graphviz, and interactive RAG without cloning entire repositories.",
    featured: true,
    problem:
      "Software engineers joining large codebases face severe cognitive friction parsing unfamiliar directory hierarchies and inter-module dependencies without documented architecture diagrams.",
    hardestDecision:
      "Ingesting codebases via GitHub Tree API with static AST parsing instead of full git cloning, backed by commit SHA-keyed PostgreSQL JSONB caching to eliminate API rate throttling on large repositories.",
    results:
      "Sub-second AST parsing and architecture graph generation; pre-loaded all-MiniLM-L6-v2 vector embeddings enabling sub-second semantic retrieval without cloning; skips re-analysis on unchanged commit SHAs.",
    architecture:
      "FastAPI backend consuming the GitHub Tree API for selective repository ingestion without cloning entire repos. Results cached in PostgreSQL JSONB fields. Embedding-based semantic retrieval over docstrings (all-MiniLM-L6-v2), paired with a Graphviz rendering pipeline for visual architecture dependency graphs.",
    highlights: [
      "Sub-second codebase analysis via GitHub Tree API (avoids full git clones)",
      "Persistent PostgreSQL embedding cache skips re-analysis on unchanged commit SHAs",
      "Automatic framework detection for FastAPI, Flask, Django, React, Vue, SQLAlchemy, PostgreSQL, MongoDB",
      "Interactive dependency graphs and visual architecture diagrams rendered via Graphviz",
      "Interactive RAG assistant powered by all-MiniLM-L6-v2 embeddings and Groq LLM inference"
    ],
    technologies: ["FASTAPI", "POSTGRESQL", "SENTENCE-TRANSFORMERS", "GROQ", "GRAPHVIZ", "REACT", "TYPESCRIPT", "DOCKER"],
    challenges:
      "Eliminating GitHub API rate throttling on massive repositories by implementing tree-pruning heuristics and persistent JSONB caching.",
    github: "https://github.com/swaekaa/rexplain",
    demo: "https://rexplain.vercel.app/",
    gif: "/images/projects/rexplain_landing.gif",
    gifCaption: "Live Interface: AI repository intelligence, AST tree analysis, and interactive RAG chat"
  },
  {
    id: "visionsat",
    number: "03",
    name: "VisionSat",
    category: "COMPUTER VISION & EXPLAINABLE AI",
    subtitle: "Satellite Land-Use Classification with Grad-CAM",
    shortDescription:
      "Explainable AI platform that classifies multi-spectral Sentinel-2 satellite imagery using deep convolutional networks (ResNet-18) and generates real-time Grad-CAM spatial heatmaps to visually verify model decision focus.",
    featured: true,
    problem:
      "Deep learning models in remote sensing frequently act as opaque black boxes, risking erroneous classifications based on spurious background correlations rather than true morphological land features.",
    hardestDecision:
      "Integrating gradient-weighted class activation mapping (Grad-CAM) directly into the PyTorch ResNet-18 inference pipeline, computing spatial activation heatmaps across the final convolutional layer (conv5_x) at inference time to verify focal terrain features over sensor noise.",
    results:
      "97.24% test accuracy and 0.94 macro F1 across 27,000 EuroSAT satellite images across 10 classes; verified that spatial heatmaps isolate real physical features (highways, rivers, industrial footprints) rather than cloud artifacts.",
    architecture:
      "PyTorch ResNet-18 model trained on 27,000 EuroSAT satellite images across 10 classes. Backend inference API generates Grad-CAM spatial activation heatmaps by computing gradients flowing into final convolutional layers. React + TypeScript frontend with interactive image upload and class probability distribution.",
    highlights: [
      "97.24% test accuracy and 0.94 macro F1 across 10 land-use categories on EuroSAT Sentinel-2",
      "Grad-CAM spatial interpretability overlays showing exact model focal points on buildings, highways, and rivers",
      "Verifies model attention focuses on actual morphological terrain rather than cloud or sensor artifacts",
      "FastAPI + PyTorch inference engine with batch prediction and OpenCV image processing"
    ],
    technologies: ["PYTORCH", "RESNET-18", "GRAD-CAM", "OPENCV", "FASTAPI", "REACT", "TYPESCRIPT", "DOCKER"],
    challenges:
      "Addressing fine-grained class overlap between permanent crop and pasture land through normalized difference indices and targeted data augmentations.",
    github: "https://github.com/swaekaa/VisionSat",
    demo: "https://vision-sat.vercel.app/",
    gif: "/images/projects/visionsat_landing.gif",
    gifCaption: "Live Demo: EuroSAT Sentinel-2 satellite image classification and Grad-CAM spatial activation heatmaps"
  },
  {
    id: "klustor",
    number: "04",
    name: "KLUSTOR",
    category: "WEB GRAPHICS & CREATIVE SYSTEMS",
    subtitle: "Algorithmic Livery Studio & 3D Arcade Racing Game",
    shortDescription:
      "Web-based 3D arcade racing game where vehicle performance is algorithmically derived by analyzing pixel complexity, edge density, and color variance of the player's 2D canvas designs at 60 FPS.",
    featured: true,
    problem:
      "In traditional racing games, car livery customization is purely cosmetic and entirely disconnected from mechanical vehicle physics.",
    hardestDecision:
      "Engineering a sub-16ms off-screen HTML5 Canvas pixel-analysis pipeline that extracts edge density and RGB variance in real time and dynamically modulates Three.js vehicle physics multipliers without dropping frames.",
    results:
      "Zero GPU frame drops maintaining consistent 60 FPS during real-time livery texture re-binding and physics recomputation; authoritative Socket.IO multiplayer synchronization across 16-car race grids.",
    architecture:
      "Core mechanic: 'Edit Images to Go Faster'. Players design across 5 distinct 2D template faces in Unlayer. An off-screen HTML5 Canvas context analyzes raw pixel bytes in real-time, computing edge density, complexity, and RGB color variance into a 'Design Score' that directly scales Three.js physics multipliers (Top Speed, Acceleration, Handling). Node.js and Socket.IO backend handles multiplayer lobby synchronization and live livery drafting.",
    highlights: [
      "Sub-16ms off-screen canvas pixel ingestion and dynamic Three.js texture re-binding at 60 FPS",
      "Algorithmic Design Scoring: edge-detection complexity, unique RGB color variance, and edge density calculate performance multipliers",
      "Direct gameplay coupling: higher livery complexity mechanically increases Top Speed and Acceleration on track",
      "Socket.IO multiplayer lobby synchronization with authoritative countdown timers"
    ],
    technologies: ["REACT THREE FIBER", "THREE.JS", "UNLAYER EDITOR", "CANVAS API", "SOCKET.IO", "NODE.JS", "TYPESCRIPT"],
    challenges:
      "Achieving sub-16ms off-screen canvas pixel ingestion and dynamic Three.js texture re-binding without causing GPU frame drops during active gameplay.",
    github: "https://github.com/swaekaa/klustor",
    demo: "",
    gif: "/images/projects/klustor_game_start.gif",
    gifCaption: "Live Game Start: 3D Vice Coast Circuit start grid and arcade racing engine in Three.js"
  }
];

export const research = [
  {
    id: "llm-quant-sense",
    title: "Layer-Wise Quantization Sensitivity in LLMs",
    question: "Are all transformer layers equally sensitive to quantization, and can late layers be aggressively compressed without perplexity collapse?",
    approach:
      "Systematic layer-wise sensitivity profiling using layer masking and calibrated Gaussian noise injection as quantization distortion proxies across DistilBERT (66M) and Phi-2 (2.7B) transformer backbones to discover Pareto-optimal mixed-precision configurations.",
    models: ["Phi-2 (32 Layers, 2.7B params)", "DistilBERT-base-uncased (6 Layers, 66M params)"],
    datasets: ["WikiText-2 (Perplexity Benchmark)", "SST-2 (GLUE Benchmark Accuracy)"],
    evaluation: "Normalized Perplexity degradation, layer sensitivity ranking, and component-level (Attention vs MLP) masking on RTX 3060 12GB.",
    observations:
      "Non-monotonic sensitivity: Layer 23 is catastrophic (perplexity explodes to 3,579,120) and Layer 20 is extreme (140,746 PPL), while Layer 0 MLP is foundational (1,586 PPL if masked). In DistilBERT, quantizing Layer 5 to INT4 caused only a 0.12% accuracy drop (91.06% → 90.94%). Noise injection ranking confirms Layers 9, 10, 17, 24, 20, 2 are prime candidates for 4-bit NF4 (<0.22 normalized PPL increase), while Layers 31, 27, 26, 5, 12, 4 must remain in FP16 and INT8.",
    code: "https://github.com/swaekaa/llm_quant_sense",
    images: [
      { src: "/images/research/llm_quant_fp16.png", caption: "Fig 1. Layer wise noise sensitivity across Phi 2 layers (Log Scale)" },
      { src: "/images/research/llm_quant_rank.png", caption: "Fig 2. Layer sensitivity score ranking and Pareto allocation" },
      { src: "/images/research/llm_quant_ppl.png", caption: "Fig 3. Perplexity and throughput trade off across bit widths" },
      { src: "/images/research/llm_quant_comp.png", caption: "Fig 4. Component-level masking: Attention vs. MLP blocks (Log Scale)" }
    ]
  },
  {
    id: "shap-vs-gradcam",
    title: "SHAP vs. Grad-CAM: Medical Image Explainability Trade-Offs",
    question: "Should clinical AI systems prioritize visually intuitive gradient heatmaps (Grad-CAM) or mathematically complete pixel-level Shapley attributions (Deep SHAP) for pneumonia detection?",
    approach:
      "Comparative interpretability evaluation on a DenseNet121 convolutional network trained on 624 chest X-rays (94% accuracy, 0.98 pneumonia precision). Evaluated explanation fidelity, stability under progressive pixel removal, and clinical alignment using Sparsity, AOPC, and Probability Degradation metrics.",
    models: ["DenseNet121 (Binary Pneumonia vs Normal Classifier)"],
    datasets: ["Chest X-Ray Pneumonia Dataset (624 test images: 234 Pneumonia, 390 Normal)"],
    evaluation: "Sparsity (Top 90% attribution mass), Average Output Perturbation Coherence (AOPC), and confidence degradation curves.",
    observations:
      "Sparsity convergence: Both SHAP and Grad-CAM concentrate >90% of their attribution mass on less than 0.0005% of image pixels (5.35 × 10⁻⁶), proving the DenseNet focuses strictly on localized focal lung opacity rather than background rib and bone artifacts. SHAP achieved lower AOPC (0.0151 vs Grad-CAM 0.0221), indicating higher stability under adversarial pixel perturbations. Grad-CAM exhibits smooth monotonic confidence degradation, while SHAP shows non-monotonic dips due to negative attributions. Clinically, Grad-CAM mirrors radiologist diagnostic workflows; SHAP provides mathematical completeness required for regulatory auditing.",
    code: "https://github.com/swaekaa/SHAP_VS_GradCam",
    images: [
      { src: "/images/research/shap_aopc.png", caption: "Fig 1. AOPC output perturbation coherence comparison" },
      { src: "/images/research/shap_sparsity.png", caption: "Fig 2. Attribution sparsity curve in pneumonia X-rays" },
      { src: "/images/research/gradcam_vis.png", caption: "Fig 3. Grad-CAM visual heatmap overlay" },
      { src: "/images/research/shap_vis.png", caption: "Fig 4. Deep SHAP pixel attribution map" }
    ]
  },
  {
    id: "krpo-racing",
    title: "KRPO: Autonomous Racing Optimization & Deep Reinforcement Learning",
    question: "Can a Dueling Double Deep Q-Network (Dueling DDQN) learn optimal apex approaches, braking zones, and nitro boost timing in technical circuits without human demonstration?",
    approach:
      "Formulated autonomous racing as a continuous-observation, discrete-action Markov Decision Process (MDP) on the Vice Coast Circuit. Trained a Dueling DDQN agent with Polyak target synchronization, Huber loss, and experience replay in a custom Gymnasium environment, coupled with a Python-to-Three.js telemetry replay visualization pipeline.",
    models: ["Dueling Double Deep Q-Network (Dueling DDQN)", "Geometric Trajectory Optimizer"],
    datasets: ["Vice Coast Circuit (Gymnasium Simulation & Three.js Canvas)"],
    evaluation: "Reward convergence, apex speed retention, lap completion rate, collision telemetry, and lap time benchmarks.",
    observations:
      "Reward shaping insight: Pure speed and progress rewards led to aggressive corner-cutting and high-speed wall impacts. Balancing forward velocity with curvature anticipation penalties and boost alignment enabled the agent to learn natural racing-line apexing. Evaluation lesson: Discovered that reward improvements don't inherently mean driving policy improvements: independent telemetry validation (lap validity, collision counts, replay inspection) is essential for autonomous vehicle policies. Telemetry replay bridge: Simulation outputs JSON frames directly visualizable in Three.js, bridging numerical benchmarking with physical driving behavior.",
    code: "https://github.com/swaekaa/KRPO",
    images: [
      { src: "/images/research/krpo_training_curves.png", caption: "Fig 1. Dueling DDQN reward convergence & training curves" },
      { src: "/images/research/krpo_evaluation.png", caption: "Fig 2. Evaluation benchmark across driving policies" }
    ]
  }
];

export const xPosts = [
  {
    id: "post-krpo-eval",
    date: "Oct 29",
    handle: "@swaaeka",
    author: "Ekaansh Sawaria",
    avatar: "/images/profile-x.jpg",
    text: "My biggest takeaway from KRPO so far:\n\nA reward curve improving doesn't automatically mean the driving policy is improving.\n\nYou need independent evaluation, collision counts, lap validity, and replay inspection.",
    url: "https://x.com/swaaeka/status/2115843601829945501"
  },
  {
    id: "post-krpo-replay",
    date: "Oct 29",
    handle: "@swaaeka",
    author: "Ekaansh Sawaria",
    avatar: "/images/profile-x.jpg",
    text: "replay was designed as part of the evaluation pipeline.\n\npython simulation runs into JSON containing position, heading, wheel velocities, steering, and boost state.\n\nThree.js scene can then visualize the run.\n\nThis connects numerical benchmarks with the actual driving behavior.",
    url: "https://x.com/swaaeka/status/2115841958455464316"
  },
  {
    id: "post-krpo-reward",
    date: "Oct 29",
    handle: "@swaaeka",
    author: "Ekaansh Sawaria",
    avatar: "/images/profile-x.jpg",
    text: "hardest parts of RL racing is reward design.\n\nreward speed and progress too aggressively, the agent can learn to optimize the score rather than drive cleanly.\n\nit combines progress, velocity, boost usage, racing-line behavior, proximity, deviation, collisions, and lap completion.",
    url: "https://x.com/swaaeka/status/2115839417055379574"
  }
];

export const certifications = [
  {
    year: "2026",
    title: "Introduction to Large Language Models",
    issuer: "Simplilearn (SkillUp)",
    credential: "Verified Certificate",
    file: "/certificates/intro_to_llms.pdf"
  },
  {
    year: "2026",
    title: "Graph Theory Programming Camp",
    issuer: "AlgoUniversity (Mentored by Codeforces Master)",
    credential: "17 Advanced Graph Problems",
    file: "/certificates/algouniversity_graphs.png"
  },
  {
    year: "2025",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI & Coursera (Andrew Ng)",
    credential: "Verified Credly Specialization",
    file: "/certificates/deep_learning_specialization.pdf"
  },
  {
    year: "2025",
    title: "Design and Analysis of Algorithms (DAA)",
    issuer: "NPTEL & IIT Kharagpur (Ministry of Education)",
    credential: "Elite Academic Certification",
    file: "/certificates/nptel_daa.pdf"
  },
  {
    year: "2025",
    title: "Red Hat System Administration (RH124 & RH134)",
    issuer: "Red Hat Academy",
    credential: "Enterprise Linux Certification",
    file: "/certificates/red_hat_rh134.pdf"
  },
  {
    year: "2025",
    title: "MUJ HackX 3.0 International Hackathon",
    issuer: "Department of CSE & E-Cell MUJ",
    credential: "Hackathon Recognition",
    file: "/certificates/muj_hackx_3.jpg"
  },
  {
    year: "2024",
    title: "Database Design & Programming with SQL",
    issuer: "Oracle Academy",
    credential: "Enterprise Database Certification",
    file: "/certificates/oracle_database_sql.pdf"
  },
  {
    year: "2024",
    title: "Object Oriented Programming Using Java",
    issuer: "GeeksforGeeks (MUJ Collaboration)",
    credential: "10 Week Course Completion",
    file: "/certificates/gfg_java_oop.pdf"
  }
];

export const journey = [
  {
    year: "2019",
    event: "The First Spark · Java & Object Oriented Foundations",
    desc: "In 8th grade, I picked Java as my optional subject and fell in love with the dynamic power of code, realizing you could create whatever you imagined. I started learning object oriented programming to master syntax and understand how classes, objects, and state really work."
  },
  {
    year: "2023",
    event: "Manipal University Jaipur · Discovering Machine Learning",
    desc: "Joined Manipal University Jaipur for my B.Tech in Computer Science and pivoted into AI and Machine Learning. I studied ML and deep learning through Andrew Ng's courses, learning the core mathematics and training neural networks from first principles."
  },
  {
    year: "2024",
    event: "Deep Learning in Practice · VisionSat & Hackathons",
    desc: "Started implementing AI into working projects, building VisionSat for explainable satellite land-use classification with real-time Grad-CAM heatmaps. Participated in a bunch of hackathons: some went great, others were tough learning lessons, but each built real intuition for rapid engineering."
  },
  {
    year: "2025",
    event: "Language Models, Embeddings & RExplain",
    desc: "Gained a deep fascination for Large Language Models, semantic search, and vector embeddings beyond basic chatbots. Built RExplain to parse complex codebases with AST tree analysis and interactive RAG, moving from toy demos to structured developer tooling."
  },
  {
    year: "2026",
    event: "Accenture · Multi Agent Orchestration",
    desc: "Earned a spot at Accenture this summer as an Associate Software Engineering Intern, taking an agentic approach. Collaborated with a team of three interns to architect an enterprise multi agent RAG platform with dynamic tool execution and hybrid retrieval."
  },
  {
    year: "Present",
    event: "Looking Ahead · Excited for the Future",
    desc: "Excited for what comes next: pushing the boundaries of intelligent systems, autonomous agentic workflows, and turning emerging AI capabilities into reliable software."
  }
];

export const skills = {
  "AI & ML": [
    "AGENTIC AI",
    "LLMS",
    "RAG",
    "LANGGRAPH",
    "TRANSFORMERS",
    "PYTORCH",
    "TENSORFLOW",
    "SCIKIT-LEARN",
    "SENTENCETRANSFORMERS"
  ],
  "BACKEND": ["FASTAPI", "FLASK", "REST APIS", "MICROSERVICES", "SQLALCHEMY", "PAYMENT APIS"],
  "LANGUAGES": ["PYTHON", "JAVA", "C++", "JAVASCRIPT", "SQL"],
  "CORE CS": [
    "DSA",
    "OOP",
    "DBMS",
    "OPERATING SYSTEMS",
    "COMPUTER NETWORKS",
    "DISTRIBUTED SYSTEMS",
    "SYSTEM DESIGN"
  ],
  "DATABASES": ["POSTGRESQL", "MYSQL", "VECTOR DATABASES"],
  "DEVOPS": ["DOCKER", "GIT", "GITHUB", "CI & CD"]
};
