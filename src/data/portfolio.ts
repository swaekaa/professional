// ============================================================
// PORTFOLIO DATA — Single source of truth for all content
// Synchronized with live dossier at https://ekaansh-sawaria.vercel.app
// ============================================================

export const personal = {
  name: "Ekaansh Sawaria",
  handle: "swaekaa",
  initials: "EK",
  title: "Software Engineer · Applied AI",
  tagline: "Building intelligent systems that read, reason and retrieve.",
  location: "Bangalore, India",
  email: "sawariaekaansh@gmail.com",
  github: "https://github.com/swaekaa",
  githubUsername: "swaekaa",
  leetcode: "https://leetcode.com/u/meanturtle/",
  leetcodeUsername: "meanturtle",
  x: "https://x.com/swaekaa",
  xHandle: "@swaekaa",
  linkedin: "https://www.linkedin.com/in/ekaansh-sawaria/",
  resume: "/resume.pdf",
  bioHeadline: "Building intelligent systems that read, reason and retrieve.",
  bioParagraphs: [
    "I am a Computer Science undergraduate at Manipal University Jaipur and software / AI engineer. I spend most of my time somewhere between research papers and production code, teaching machines to read documents, see images, and reason over knowledge.",
    "Currently an Associate Software Engineer Intern at Accenture in Bangalore, architecting enterprise multi-agent RAG pipelines across 10,000+ documents with hybrid BM25 + dense retrieval, PageIndexer for structure-aware parsing, and cross-encoder reranking.",
    "I gravitate towards problems that are half research, half engineering: the ones where the paper stops and the production pipeline has to start."
  ],
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full-stack Development",
    "LLMs / RAG Systems",
    "Computer Vision",
    "Research",
    "Experimental Products"
  ],
  stats: {
    contributions: "2,480+",
    repos: "24+",
    streak: "84+ days",
    retrievalRelevanceGain: "+35%",
    indexingSpeedup: "-45%"
  }
};

export const githubStats = {
  username: "swaekaa",
  profileUrl: "https://github.com/swaekaa",
  totalContributions: "2,480+",
  publicRepos: "24+",
  currentStreak: "84 days",
  peakHours: "00:00 – 04:00 (Late Night Systems)",
  languages: [
    { name: "Python", pct: 62, color: "#3572A5" },
    { name: "TypeScript", pct: 22, color: "#3178C6" },
    { name: "C++ / Java", pct: 10, color: "#F34B7D" },
    { name: "SQL & Shell", pct: 6, color: "#E34C26" }
  ],
  pinnedHighlights: [
    { name: "RExplain", desc: "AST parsing & RAG codebase explainer", lang: "FastAPI / React" },
    { name: "VisionSat", desc: "Grad-CAM explainable satellite vision", lang: "PyTorch / ResNet" },
    { name: "HackerzStreet-25", desc: "Multilingual Indian language RAG", lang: "LLaMA 3 / FastText" }
  ]
};

export const leetcodeStats = {
  username: "meanturtle",
  profileUrl: "https://leetcode.com/u/meanturtle/",
  totalSolved: 382,
  easy: 142,
  medium: 198,
  hard: 42,
  acceptanceRate: "68.4%",
  ranking: "Top 6.8%",
  contestRating: 1740,
  streak: "84 days",
  languages: ["Python", "C++", "Java", "SQL"],
  topTopics: [
    { name: "Dynamic Programming", solved: 68 },
    { name: "Graphs & Trees", solved: 74 },
    { name: "Binary Search", solved: 42 },
    { name: "Sliding Window & Two Pointers", solved: 55 },
    { name: "Greedy & Backtracking", solved: 48 },
    { name: "Math & Bit Manipulation", solved: 35 }
  ],
  badges: ["50 Days 2024", "100 Days Streak", "Top 6.8% Global"]
};

export const education = {
  institution: "Manipal University Jaipur",
  degree: "Bachelor of Technology — Computer Science & Engineering",
  period: "2022 – 2026",
  cgpa: "8.51 / 10",
  location: "Jaipur, Rajasthan",
  highlights: [
    "Core focus: Artificial Intelligence, Distributed Systems, Operating Systems, Neural Networks, Database Internals",
    "Academic Merit: CGPA 8.51 across foundational and advanced CS curriculum",
    "Senior Secondary - Class XII (CBSE): 81% (2022)",
    "Secondary - Class X (CBSE): 96% (2020)"
  ]
};

export const experience = [
  {
    id: "accenture",
    company: "Accenture",
    role: "Associate Software Engineer Intern",
    location: "Bangalore, India",
    period: "2026 – Present",
    active: true,
    summary:
      "Enterprise-scale multi-agent RAG platform: system architecture, agent orchestration, document intelligence, and high-throughput retrieval optimization across 10,000+ files.",
    contributions: [
      "Built production RAG pipelines for enterprise document processing across 10,000+ multi-format files.",
      "Engineered PageIndexer for structure-aware document parsing, partitioning, and hierarchical indexing.",
      "Implemented hybrid retrieval combining sparse BM25 keyword matching with dense embedding vector search.",
      "Layered Cross-Encoder reranking and QuadRank scoring to eliminate semantic drift and boost retrieval relevance by +35%.",
      "Designed and deployed multi-agent LLM systems exposed through high-concurrency FastAPI REST APIs.",
      "Optimized document indexing pipelines with persistent embedding caching, cutting re-indexing latency by 45%."
    ],
    technologies: [
      "PYTHON",
      "FASTAPI",
      "RAG PIPELINES",
      "BM25",
      "DENSE RETRIEVAL",
      "CROSS-ENCODER",
      "MULTI-AGENT",
      "POSTGRESQL",
      "REST APIS"
    ]
  }
];

export const projects = [
  {
    id: "rexplain",
    number: "01",
    name: "RExplain",
    category: "AI / DEVELOPER TOOLS",
    subtitle: "AI-Powered GitHub Repository Analysis Platform",
    shortDescription:
      "Full-stack GitHub repository comprehension platform that automatically explains unfamiliar codebases using static AST parsing, architecture extraction, and interactive RAG without cloning entire repositories.",
    featured: true,
    problem:
      "Software engineers joining large codebases face severe cognitive friction parsing unfamiliar directory hierarchies and inter-module dependencies without documented architecture diagrams.",
    motivation:
      "To build an automated tool that extracts conceptual architectures directly from repository tree structure and source tokens, caching results for instant subsequent exploration.",
    architecture:
      "FastAPI backend consuming the GitHub Tree API for selective repository ingestion without cloning entire repos. Results cached in PostgreSQL JSONB fields. Embedding-based semantic retrieval over docstrings, paired with a Graphviz rendering pipeline for visual architecture dependency graphs.",
    highlights: [
      "Sub-second codebase analysis via GitHub Tree API (avoids full git clones)",
      "Persistent PostgreSQL embedding cache skips re-analysis on unchanged commit SHAs",
      "Automatic framework detection for FastAPI, Flask, Django, React, Vue, SQLAlchemy, PostgreSQL, MongoDB",
      "Interactive dependency graphs and visual architecture diagrams rendered via Graphviz",
      "Interactive RAG assistant powered by all-MiniLM-L6-v2 embeddings and Groq LLM inference",
      "SentenceTransformer model pre-loaded into memory once at backend startup for sub-second responses"
    ],
    technologies: ["FASTAPI", "POSTGRESQL", "SENTENCE-TRANSFORMERS", "GROQ", "GRAPHVIZ", "REACT", "TYPESCRIPT", "TAILWINDCSS"],
    challenges:
      "Eliminating GitHub API rate throttling on massive repositories by implementing tree-pruning heuristics and persistent JSONB caching.",
    github: "https://github.com/swaekaa/rexplain",
    demo: "https://rexplain.vercel.app/"
  },
  {
    id: "visionsat",
    number: "02",
    name: "VisionSat",
    category: "EXPLAINABLE AI / COMPUTER VISION",
    subtitle: "Satellite Land-Use Classification with Grad-CAM",
    shortDescription:
      "Explainable AI web application that classifies multi-spectral Sentinel-2 satellite imagery using deep convolutional networks (ResNet-18) and generates Grad-CAM heatmaps to visually verify model attention.",
    featured: true,
    problem:
      "Deep learning models in remote sensing frequently act as opaque black boxes, risking erroneous classifications based on spurious background correlations rather than true morphological land features.",
    motivation:
      "To bridge the gap between high-accuracy deep learning models and human interpretability by exposing spatial activation heatmaps for environmental monitoring and urban zoning.",
    architecture:
      "PyTorch ResNet-18 model trained on 27,000 EuroSAT satellite images across 10 classes. Backend inference API generates Grad-CAM spatial activation heatmaps by computing gradients flowing into final convolutional layers. React + TypeScript frontend with interactive image upload.",
    highlights: [
      "97.24% test accuracy and 0.94 macro F1 across 10 land-use categories on EuroSAT Sentinel-2",
      "Grad-CAM and Grad-CAM++ spatial interpretability overlays showing exact model focal points",
      "Verifies model attention focuses on actual buildings, highways, and rivers rather than background noise",
      "FastAPI + PyTorch inference engine with batch prediction and OpenCV image processing",
      "Containerized deployment with Docker and responsive React/TypeScript interface"
    ],
    technologies: ["PYTORCH", "RESNET-18", "GRAD-CAM", "OPENCV", "FASTAPI", "REACT", "TYPESCRIPT", "DOCKER"],
    challenges:
      "Addressing fine-grained class overlap between permanent crop and pasture land through normalized difference indices and targeted data augmentations.",
    github: "https://github.com/swaekaa/VisionSat",
    demo: "https://vision-sat.vercel.app/"
  },
  {
    id: "hackerzstreet25",
    number: "03",
    name: "Multilingual Health RAG",
    category: "MULTILINGUAL AI / RAG",
    subtitle: "Cloud-Agnostic Healthcare & Insurance Documentation RAG",
    shortDescription:
      "Fully open-source, cloud-agnostic multilingual RAG system designed for dense health and insurance documentation, supporting 9 regional Indian languages with both text and voice-driven interactions.",
    featured: true,
    problem:
      "Millions of non-English speakers face prohibitive language barriers navigating complex health insurance policies, claim filing guidelines, and medical documents.",
    motivation:
      "To build an accessible, cost-effective, and privacy-preserving RAG assistant supporting regional Indian languages without relying on proprietary cloud APIs.",
    architecture:
      "Microservices architecture: FastText dense word embedding service for multilingual parsing, ChromaDB local vector storage, open-weight LLaMA 3 inference via Ollama, and on-the-fly bidirectional translation pipeline.",
    highlights: [
      "Robust native support for 9 regional Indian languages, democratizing access to health documentation",
      "Multimodal input pipeline with voice-to-text integration via Web Speech API and text queries",
      "Intelligent PDF document parsing, structure-aware chunking, and FastText embedding generation",
      "Local vector similarity search using ChromaDB for zero-cloud data sovereignty",
      "Deep RAG inference using open-weight LLaMA 3 via Ollama for cost-effective deployment",
      "Real-time language detection and translation interfacing vernacular queries with English source policies"
    ],
    technologies: ["FASTAPI", "FASTTEXT", "LLAMA 3", "CHROMADB", "OLLAMA", "REACT", "WEB SPEECH API"],
    challenges:
      "Maintaining semantic precision when translating technical insurance terminology across low-resource Indian languages without context degradation.",
    github: "https://github.com/swaekaa/HackerzStreet-25",
    demo: "https://drive.google.com/drive/folders/10kBcKm-Aj0kcGC5THhuLprZ6pzduNnxA?usp=share_link"
  },
  {
    id: "sustainbridge",
    number: "04",
    name: "SustainBridge",
    category: "FULL-STACK / SUSTAINABILITY",
    subtitle: "Platform Bridging Technology and Sustainability",
    shortDescription:
      "A collaborative platform bridging technology and sustainability for eco-friendly consumer initiatives, community recycling coordination, and carbon footprint tracking.",
    featured: false,
    problem:
      "Lack of centralized, accessible platforms for communities to organize local sustainability efforts and track verifiable environmental impact.",
    motivation:
      "To empower grassroots green initiatives through interactive web tools, educational workflows, and transparent sustainability tracking.",
    architecture:
      "Next.js full-stack platform with TailwindCSS UI and Firebase realtime document database, supporting authenticated user actions, event coordination, and live impact statistics.",
    highlights: [
      "Real-time eco-impact metric tracking and community leaderboard",
      "Responsive Next.js application with TailwindCSS and mobile-first layout",
      "Firebase backend with asynchronous reactive updates and event-driven architecture"
    ],
    technologies: ["NEXT.JS", "TAILWINDCSS", "FIREBASE", "REACT", "TYPESCRIPT"],
    challenges:
      "Designing responsive real-time data synchronization across distributed community members with minimal network latency.",
    github: "https://github.com/swaekaa/SustainBridge",
    demo: null
  },
  {
    id: "krpo",
    number: "05",
    name: "KRPO",
    category: "REINFORCEMENT LEARNING",
    subtitle: "Autonomous Racing-Line Optimization via DQN",
    shortDescription:
      "Reinforcement-learning-based autonomous racing-line optimization system integrated into the KLUSTOR Three.js real-time physics environment, training Deep Q-Networks on dynamic track geometries.",
    featured: false,
    problem:
      "Analytical race-line computation fails to adapt dynamically to discrete vehicle handling limits, speed falloffs in tight hairpins, and variable track friction.",
    motivation:
      "To explore how reward shaping and DQN parameterizations converge toward human-optimal racing lines in interactive browser-based 3D physics simulations.",
    architecture:
      "PyTorch Deep Q-Network agent interfacing with a Three.js / CANNON.js physics loop via WebSocket telemetry. Checkpoint evaluation pipeline logging lap times, track cross-track errors, and slip angles across multiple training runs.",
    highlights: [
      "Deep Q-Network (DQN) policy learning from continuous telemetry in browser physics",
      "Custom reward function penalizing wall contact and reward-weighting apex velocity",
      "Curvature anticipation penalty enabling agent to brake before corner turn-in",
      "Converged to within 4.2% of human optimal lap times over 1,200 training episodes"
    ],
    technologies: ["PYTHON", "PYTORCH", "DQN", "THREE.JS", "CANNON.JS", "REINFORCEMENT LEARNING"],
    challenges:
      "Mitigating degenerate agent behaviors (circling in place) through multi-component reward shaping incorporating track progress velocity and curvature anticipation.",
    github: "https://github.com/swaekaa/krpo",
    demo: null
  },
  {
    id: "llm-quant",
    number: "06",
    name: "Sensitivity-Aware Quantization",
    category: "MODEL OPTIMIZATION / RESEARCH",
    subtitle: "Mixed-Precision INT4 / INT6 / INT8 Transformer Profiling",
    shortDescription:
      "Empirical investigation into layer-wise quantization sensitivity across transformer backbones using calibrated Gaussian noise injection to discover Pareto-optimal mixed precision.",
    featured: false,
    problem:
      "Uniform INT4 / FP4 quantization causes disproportionate degradation in certain sensitive attention projection and embedding layers.",
    motivation:
      "To measure layer sensitivity systematically without prohibitive retraining costs, discovering Pareto-optimal mixed-precision configurations.",
    architecture:
      "PyTorch and Hugging Face Transformers testbench. Gaussian noise injection proxying quantization distortion across DistilBERT and Phi architectures. WikiText-2 perplexity benchmarking across NF4, FP4, and mixed-precision layer schemes.",
    highlights: [
      "Layer-wise sensitivity ranking using calibrated noise injection proxies",
      "Perplexity comparison of NF4 vs FP4 representations at equivalent bit budgets",
      "Preserving just 20% of sensitive weights in FP16 maintained 94% of full-precision perplexity under NF4 quantization"
    ],
    technologies: ["PYTORCH", "TRANSFORMERS", "BITSANDBYTES", "DISTILBERT", "PERPLEXITY"],
    challenges:
      "Normalizing noise variance across layers with differing activation scale distributions to avoid biased sensitivity scoring.",
    github: "https://github.com/swaekaa/llm-quant",
    demo: null
  }
];

export const research = [
  {
    id: "transformer-quant",
    title: "Sensitivity-Aware Quantization of LLMs",
    question: "Which transformer components are most sensitive to quantization, and how does mixed-precision assignment preserve accuracy?",
    approach:
      "Layer-wise sensitivity profiling to assign mixed INT4 / INT6 / INT8 precision across transformer blocks — compressing models aggressively while preserving downstream accuracy on DistilBERT and Phi-2 architectures.",
    models: ["DistilBERT-base-uncased", "Phi-2"],
    datasets: ["WikiText-2 (Perplexity Evaluation)"],
    evaluation: "Layer-wise sensitivity score curves and perplexity deltas under calibrated weight noise injection.",
    observations:
      "Early attention projection matrices and final output embeddings exhibited 3.4x greater sensitivity to noise than intermediate feed-forward layers. Preserving just 20% of sensitive weights in FP16 maintained 94% of full-precision perplexity under NF4 quantization.",
    code: "https://github.com/swaekaa/llm-quant"
  },
  {
    id: "rl-racing",
    title: "Racing-Line Optimization via Deep Reinforcement Learning",
    question: "Can a discrete-action Deep Q-Network learn optimal racing lines in real-time browser physics without explicit trajectory guidance?",
    approach:
      "Designed a custom reward function combining forward track velocity, cross-track error, and apex proximity. Evaluated checkpointed policies over 1,200 training episodes against human baseline telemetry in Three.js.",
    models: ["Deep Q-Network (DQN) with target network & replay buffer"],
    datasets: ["KLUSTOR Three.js physics environment"],
    evaluation: "Lap completion rate, minimum apex speed, lap time convergence curves.",
    observations:
      "Pure speed rewards induced high-speed wall collisions on entry. Adding a smooth curvature anticipation penalty allowed the agent to brake before corner turn-in, reaching within 4.2% of human optimal lap times.",
    code: "https://github.com/swaekaa/krpo"
  },
  {
    id: "sensor-fusion",
    title: "Reliability-Aware Multimodal Sensor Fusion",
    question: "Can transformer attention mechanisms be conditioned on real-time sensor measurement reliability to mitigate noise in activity recognition?",
    approach:
      "Engineered an Adaptive Reliability Sensor Transformer (ARST) that estimates modality noise variance and scales cross-attention query-key scores accordingly. Tested against MLP, CNN, and LSTM architectures under 10%–50% simulated sensor dropout.",
    models: ["ARST (Transformer)", "MLP Baseline", "1D CNN", "BiLSTM"],
    datasets: ["Multimodal sensor dataset (IMU, Thermal, ToF)"],
    evaluation: "Classification accuracy and F1 score across increasing sensor dropout ratios.",
    observations:
      "While baseline LSTM models degraded by over 38% accuracy under 30% sensor dropout, ARST maintained within 6.1% of clean-channel accuracy by dynamically attenuating corrupted modalities in self-attention.",
    code: "https://github.com/swaekaa/ARST"
  }
];

export const xPosts = [
  {
    id: "x-rag",
    date: "May 2026",
    handle: "@swaekaa",
    author: "Ekaansh",
    text: "Why naive cosine distance over dense vector embeddings fails in production document retrieval:\n\nWhen documents share semantic domain vocabulary across 10,000+ enterprise files, dense vectors collapse into overlapping clusters. The fix isn't bigger chunk sizes.\n\nIt's hybrid retrieval (BM25 sparse + dense embeddings) layered with Cross-Encoder reranking and QuadRank scoring. We saw a +35% relevance jump immediately.",
    metrics: { replies: 14, retweets: 38, likes: 142, views: "8.4K" },
    tags: ["#RAG", "#MachineLearning", "#Systems", "#FastAPI"],
    url: "https://x.com/swaekaa"
  },
  {
    id: "x-ast",
    date: "Apr 2026",
    handle: "@swaekaa",
    author: "Ekaansh",
    text: "Building RExplain taught me one big lesson about codebase AI:\n\nStop doing full git clones on the backend.\n\nFetching the repo tree structure via the GitHub Tree API and selectively parsing ASTs + config files allows sub-second architectural mapping. Pair that with a persistent PostgreSQL embedding cache by commit SHA, and repeated visits are instantaneous.",
    metrics: { replies: 9, retweets: 24, likes: 96, views: "5.1K" },
    tags: ["#Python", "#FastAPI", "#DevTools", "#PostgreSQL"],
    url: "https://x.com/swaekaa"
  },
  {
    id: "x-gradcam",
    date: "Mar 2026",
    handle: "@swaekaa",
    author: "Ekaansh",
    text: "If you're training deep convolutional networks on satellite imagery without explainability, you're flying blind.\n\nIn VisionSat, Grad-CAM visual heatmaps proved whether ResNet-18 was looking at actual building foundations and highway contours or just spurious background contrast. When explainability confirms true feature activations, model trust goes through the roof.",
    metrics: { replies: 18, retweets: 29, likes: 118, views: "6.7K" },
    tags: ["#ComputerVision", "#PyTorch", "#GradCAM", "#AI"],
    url: "https://x.com/swaekaa"
  },
  {
    id: "x-quant",
    date: "Feb 2026",
    handle: "@swaekaa",
    author: "Ekaansh",
    text: "Not all transformer layers are created equal under quantization.\n\nBy injecting calibrated Gaussian noise as a sensitivity proxy, we showed early attention projections are ~3.4x more fragile than intermediate FFN layers. Keep just 20% critical weights in FP16, and INT4 perplexity remains rock solid while saving 67% memory.",
    metrics: { replies: 22, retweets: 45, likes: 164, views: "9.2K" },
    tags: ["#LLMs", "#DeepLearning", "#Quantization", "#Research"],
    url: "https://x.com/swaekaa"
  }
];

export const certifications = [
  {
    year: "2025",
    title: "Deep Learning & Neural Network Architectures",
    issuer: "Specialized Coursework",
    credential: "Verified Academic Distinction"
  },
  {
    year: "2024",
    title: "Applied Machine Learning & Statistical Methods",
    issuer: "NPTEL / Academic Honors",
    credential: "Top 5% Percentile"
  },
  {
    year: "2023",
    title: "Data Structures & Algorithmic Problem Solving",
    issuer: "Manipal University Jaipur",
    credential: "Grade: S / Outstanding"
  }
];

export const journey = [
  {
    year: "2026",
    event: "Accenture — Associate Software Engineer Intern",
    desc: "Architecting enterprise multi-agent RAG system, implementing PageIndexer and QuadRank across 10k+ enterprise documents in Bangalore."
  },
  {
    year: "2025",
    event: "Sensitivity-Aware Quantization & KRPO",
    desc: "Layer-wise sensitivity profiling for LLM quantization and Three.js deep reinforcement learning racing simulation."
  },
  {
    year: "2024",
    event: "VisionSat & Multilingual Health RAG",
    desc: "EuroSAT ResNet-18 model with Grad-CAM heatmaps (97.24% acc); engineered 9-language voice-driven health RAG for HackerzStreet."
  },
  {
    year: "2022",
    event: "B.Tech in Computer Science & Engineering",
    desc: "Joined Manipal University Jaipur, focusing on machine learning, systems architecture, and algorithmic problem solving."
  }
];

export const skills = {
  "PROGRAMMING LANGUAGES": ["PYTHON", "JAVA", "C", "C++", "JAVASCRIPT", "TYPESCRIPT", "SQL"],
  "AI & MACHINE LEARNING": ["PYTORCH", "SCIKIT-LEARN", "TRANSFORMERS", "GRAD-CAM", "SHAP", "REINFORCEMENT LEARNING", "COMPUTER VISION"],
  "RAG & AGENTIC SYSTEMS": ["FASTAPI", "LANGCHAIN", "LANGGRAPH", "BM25", "DENSE RETRIEVAL", "CROSS-ENCODER", "QUADRANK", "CHROMADB", "EMBEDDINGS"],
  "BACKEND & DATA": ["POSTGRESQL", "SQLALIGN", "DOCKER", "REST APIS", "ASYNCIO", "REDIS"],
  "FRONTEND & TOOLS": ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWINDCSS", "GIT", "GITHUB", "VITE", "LINUX"]
};
