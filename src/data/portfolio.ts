// ============================================================
// PORTFOLIO DATA — Single source of truth for all content
// ============================================================

export const personal = {
  name: "Ekaansh Sawaria",
  handle: "ekaansh",
  initials: "EK",
  title: "Software Engineer · AI Engineer",
  location: "India",
  email: "ekaanshsawaria@gmail.com",
  github: "https://github.com/swaekaa",
  githubUsername: "swaekaa",
  leetcode: "https://leetcode.com/u/swaekaa/",
  leetcodeUsername: "swaekaa",
  linkedin: "https://www.linkedin.com/in/ekaansh-sawaria/",
  resume: "/resume.pdf",
  bioHeadline: "Building intelligent systems, one experiment at a time.",
  bioParagraphs: [
    "I'm a Computer Science undergraduate at Manipal University Jaipur, working at the convergence of backend systems, applied AI, machine learning, and intelligent agents.",
    "Currently an Associate Software Engineer Intern at Accenture, where I lead a team of three interns architecting an enterprise-grade multi-agent RAG platform processing 10,000+ documents with hybrid retrieval and cross-encoder reranking.",
    "Outside work, I explore reinforcement learning in real-time simulations, sensor transformer architectures for noisy multimodal environments, and layer-wise sensitivity in quantized transformer inference."
  ],
  stats: {
    contributions: "2,480+",
    repos: "24",
    retrievalRelevanceGain: "+35%",
    indexingSpeedup: "-45%"
  }
};

export const leetcodeStats = {
  username: "swaekaa",
  profileUrl: "https://leetcode.com/u/swaekaa/",
  totalSolved: 382,
  easy: 142,
  medium: 198,
  hard: 42,
  acceptanceRate: "68.4%",
  ranking: "Top 6.8%",
  contestRating: 1740,
  streak: "84 days",
  languages: ["Python", "C++", "Java", "SQL"],
  topTopics: ["Dynamic Programming", "Graphs & Trees", "Binary Search", "Sliding Window"]
};

export const education = {
  institution: "Manipal University Jaipur",
  degree: "Bachelor of Technology — Computer Science",
  period: "2023 – 2027",
  cgpa: "8.51 / 10",
  highlights: [
    "Core focus: Distributed Systems, Operating Systems, Machine Learning, Neural Networks",
    "Academic Merit: 8.51 CGPA across foundational and advanced CS curriculum"
  ]
};

export const experience = [
  {
    id: "accenture",
    company: "Accenture",
    role: "Associate Software Engineer Intern",
    location: "Bengaluru, India",
    period: "May 2026 – Present",
    active: true,
    summary:
      "Enterprise-scale multi-agent RAG platform: system architecture, agent orchestration, document intelligence, and retrieval optimization.",
    contributions: [
      "Led a team of three interns in architecting an enterprise multi-agent RAG platform from ground up.",
      "Developed an agentic framework using Grok Build 0.1 with six dynamically callable execution tools.",
      "Engineered high-throughput retrieval pipelines handling 10,000+ technical documents.",
      "Implemented hybrid retrieval combining sparse BM25 and dense embedding vector search.",
      "Integrated Cross-Encoder reranking and QuadRank scoring to boost retrieval precision.",
      "Developed PageIndexer for automated multi-domain document partitioning and indexing.",
      "Designed and deployed 4+ production REST APIs serving the orchestration layer.",
      "Achieved a verified 35% improvement in retrieval relevance over baseline search.",
      "Optimized document indexing pipelines to reduce re-indexing time by 45%."
    ],
    technologies: [
      "PYTHON",
      "FASTAPI",
      "RAG",
      "BM25",
      "DENSE RETRIEVAL",
      "CROSS-ENCODER",
      "AGENTIC AI",
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
    shortDescription:
      "AI-powered GitHub repository analysis platform that ingests repository trees, identifies architectural frameworks, and generates contextual explanations with automated Graphviz visualizations.",
    image: "/images/projects/rexplain.png",
    featured: true,
    problem:
      "Software engineers joining large codebases face severe cognitive friction parsing unfamiliar directory hierarchies and inter-module dependencies without documented architecture diagrams.",
    motivation:
      "To build an automated tool that extracts conceptual architectures directly from repository tree structure and source tokens, caching results for instant subsequent exploration.",
    architecture:
      "FastAPI backend consuming the GitHub Tree API for selective repository ingestion without cloning entire repos. Results cached in PostgreSQL JSONB fields. Embedding-based semantic retrieval over docstrings, paired with a Graphviz rendering pipeline for visual architecture dependency graphs.",
    highlights: [
      "Selective repository ingestion via GitHub Tree API",
      "FastAPI modular service layer with async dispatch",
      "PostgreSQL JSONB schema for AST and analysis caching",
      "Embedding-based semantic query interface",
      "Automated Graphviz dependency and architecture graph generation"
    ],
    technologies: ["PYTHON", "FASTAPI", "REACT", "POSTGRESQL", "GRAPHVIZ", "EMBEDDINGS"],
    challenges:
      "Eliminating GitHub API rate throttling on massive repositories by implementing tree-pruning heuristics and persistent JSONB caching.",
    github: "https://github.com/swaekaa/rexplain",
    demo: null
  },
  {
    id: "krpo",
    number: "02",
    name: "KRPO",
    category: "REINFORCEMENT LEARNING",
    shortDescription:
      "Reinforcement-learning-based autonomous racing-line optimization system integrated into the KLUSTOR Three.js real-time physics environment, training Deep Q-Networks on dynamic track geometries.",
    image: null,
    featured: true,
    problem:
      "Analytical race-line computation fails to adapt dynamically to discrete vehicle handling limits, speed falloffs in tight hairpins, and variable track friction.",
    motivation:
      "To explore how reward shaping and DQN parameterizations converge toward human-optimal racing lines in interactive browser-based 3D physics simulations.",
    architecture:
      "PyTorch Deep Q-Network agent interfacing with a Three.js / CANNON.js physics loop via WebSocket telemetry. Checkpoint evaluation pipeline logging lap times, track cross-track errors, and slip angles across multiple training runs.",
    highlights: [
      "Deep Q-Network (DQN) policy learning from continuous telemetry",
      "Custom reward function penalizing wall contact and reward-weighting apex velocity",
      "Multiple checkpoint evaluation runs comparing epsilon-decay schedules",
      "Real-time Three.js simulation visualization and telemetry streaming"
    ],
    technologies: ["PYTHON", "PYTORCH", "DQN", "THREE.JS", "REINFORCEMENT LEARNING"],
    challenges:
      "Mitigating degenerate agent behaviors (circling in place) through multi-component reward shaping incorporating track progress velocity and curvature anticipation.",
    github: "https://github.com/swaekaa/krpo",
    demo: null
  },
  {
    id: "visionsat",
    number: "03",
    name: "VisionSat",
    category: "COMPUTER VISION",
    shortDescription:
      "Satellite land-use classification system analyzing multi-spectral Sentinel-2 imagery with a fine-tuned ResNet CNN, featuring Grad-CAM and Grad-CAM++ spatial interpretability overlays.",
    image: "/images/projects/visionsat.png",
    featured: true,
    problem:
      "Environmental monitoring and municipal zoning require fast, explainable geographical categorization across multi-spectral satellite tiles.",
    motivation:
      "To build a high-accuracy classification pipeline on EuroSAT Sentinel-2 data while providing visual explanations via layer activations to verify model attention.",
    architecture:
      "PyTorch ResNet-18 model trained on 27,000 EuroSAT satellite images across 10 classes. Backend inference API with Grad-CAM activation heatmap generation. React/TypeScript web interface for interactive geotiff/image analysis.",
    highlights: [
      "97.24% test accuracy across 10 land-use categories",
      "0.94 macro F1 score across all classes",
      "Grad-CAM and Grad-CAM++ visual attention explanations",
      "Flask / PyTorch inference engine with batch prediction"
    ],
    technologies: ["PYTORCH", "RESNET", "EUROSAT", "GRAD-CAM", "REACT", "FLASK"],
    challenges:
      "Addressing class overlap between permanent crop and pasture land through normalized difference indices and targeted data augmentations.",
    github: "https://github.com/swaekaa/visionsat",
    demo: null
  },
  {
    id: "arst",
    number: "04",
    name: "ARST",
    category: "RESEARCH / TRANSFORMERS",
    shortDescription:
      "Adaptive Reliability Sensor Transformer — a multimodal architecture for human activity recognition that conditions cross-attention mechanisms on dynamically computed sensor reliability scores.",
    image: null,
    featured: false,
    problem:
      "Standard sensor fusion architectures break down when individual modalities (IMU drift, thermal occlusions, ToF distance noise) drop out or emit corrupted measurements.",
    motivation:
      "To design a transformer encoder where self-attention heads weight modalities based on statistical measurement confidence rather than static assumptions.",
    architecture:
      "Custom PyTorch transformer architecture with reliability estimation blocks feeding into multi-head cross-attention. Comparative baselines evaluated across MLP, CNN, and LSTM architectures under simulated sensor dropout.",
    highlights: [
      "Reliability-conditioned attention weighting across IMU, Thermal, and ToF modalities",
      "Empirical robustness evaluation against simulated sensor dropouts and noise spikes",
      "Comparative benchmark suite evaluating parameter efficiency against LSTM and CNN baselines"
    ],
    technologies: ["PYTORCH", "TRANSFORMERS", "MULTIMODAL FUSION", "IMU", "TIME-OF-FLIGHT"],
    challenges:
      "Formulating an unsupervised measurement reliability score that operates without ground-truth confidence labels during inference.",
    github: "https://github.com/swaekaa/ARST",
    demo: null
  },
  {
    id: "nexora",
    number: "05",
    name: "NEXORA",
    category: "AGENTIC SYSTEMS",
    shortDescription:
      "Autonomous B2B commerce platform with AI buyer and merchant agents that negotiate pricing and contract terms under strict deterministic financial policy constraints.",
    image: null,
    featured: false,
    problem:
      "LLM-driven negotiation is vulnerable to hallucinated discounts, prompt injection, and invalid contract execution when agent decisions are left unconstrained.",
    motivation:
      "To engineer an architecture with a strict boundary between probabilistic LLM negotiation dialogue and a deterministic rule engine governing transaction settlement.",
    architecture:
      "FastAPI with asynchronous SQLAlchemy and PostgreSQL. LangChain and LangGraph manage multi-turn agent deliberation. A deterministic state machine verifies budget limits, credit validation, and automated payment escrow.",
    highlights: [
      "Strict separation of probabilistic reasoning and deterministic transaction logic",
      "LangGraph cyclic negotiation state machine with timeout policies",
      "Asynchronous SQLAlchemy database engine handling concurrent negotiation threads",
      "Deterministic policy guardrails enforcing minimum margin thresholds"
    ],
    technologies: ["PYTHON", "FASTAPI", "LANGGRAPH", "POSTGRESQL", "SQLALCHEMY", "ASYNCIO"],
    challenges:
      "Preventing LLM negotiation agents from conceding past floor pricing when exposed to adversarial buyer prompting.",
    github: "https://github.com/swaekaa/nexora",
    demo: null
  },
  {
    id: "llm-quant",
    number: "06",
    name: "LLM Quantization Study",
    category: "MODEL OPTIMIZATION",
    shortDescription:
      "Empirical investigation into layer-wise quantization sensitivity in transformer language models, using Gaussian noise injection to identify optimal mixed-precision assignments.",
    image: "/images/projects/llm_quant_fp16.png",
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
      "Identification of disproportionately critical attention projection layers in transformer backbones"
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
    title: "Layer Sensitivity in Transformer Quantization",
    question: "Which transformer components are most sensitive to quantization, and how does mixed-precision assignment affect inference quality?",
    approach:
      "Injected Gaussian noise into isolated layer weights to observe perplexity degradation on WikiText-2. Compared NF4 vs FP4 quantization and quantified which layers preserve overall model coherence when retained at FP16.",
    models: ["DistilBERT-base-uncased", "Phi family"],
    datasets: ["WikiText-2 (Perplexity Evaluation)"],
    evaluation: "Perplexity delta under controlled weight noise injection; layer-wise sensitivity score curves.",
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

export const writing = [
  {
    id: "w1",
    date: "2026",
    title: "Designing Production RAG: Beyond Naive Chunking and Vector Search",
    tag: "SYSTEMS",
    status: "NOTE",
    readingTime: "6 min read",
    summary:
      "Why naive cosine distance over dense vector embeddings fails in production document retrieval, and how hybrid sparse-dense indexing paired with Cross-Encoder reranking bridges the relevance gap."
  },
  {
    id: "w2",
    date: "2026",
    title: "Layer-Wise Noise Injection as a Quantization Sensitivity Proxy",
    tag: "EXPERIMENT",
    status: "NOTE",
    readingTime: "8 min read",
    summary:
      "How injecting controlled Gaussian noise into individual transformer layer tensors allows fast identification of quantization-sensitive weights without expensive post-quantization retraining."
  },
  {
    id: "w3",
    date: "2025",
    title: "Separating Probabilistic Agents from Deterministic Policy in B2B Commerce",
    tag: "ARCHITECTURE",
    status: "NOTE",
    readingTime: "5 min read",
    summary:
      "Architectural patterns for isolating LLM-based negotiation from transaction settlement, preventing hallucinated pricing and enforcing invariant margin boundaries."
  },
  {
    id: "w4",
    date: "2025",
    title: "Reward Shaping Pitfalls in Continuous RL Autonomous Driving",
    tag: "RL",
    status: "DRAFT",
    readingTime: "7 min read",
    summary:
      "Observations from training DQN agents in browser-based 3D physics environments: why speed-dominated reward functions produce erratic wall collisions and how curvature anticipation stabilizes convergence."
  }
];

export const community = [
  {
    year: "2026",
    title: "AI & Open Source Engineering",
    role: "Contributor & Builder",
    description: "Active contributor to open source developer tools, FastAPI RAG ecosystems, and reproducible benchmark evaluations."
  },
  {
    year: "2025",
    title: "Manipal University Jaipur Technical Community",
    role: "Technical Lead & Peer Mentor",
    description: "Organized engineering workshops on PyTorch model training, REST API architecture, and modern TypeScript frontend practices."
  },
  {
    year: "2024",
    title: "Hackathon Competitions & Engineering Sprints",
    role: "Full Stack / AI Lead",
    description: "Built and pitched end-to-end applied AI systems within 36-hour sprint constraints, focusing on latency minimization and clean system architecture."
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
    desc: "Led 3-intern team architecting multi-agent RAG system, implementing QuadRank and PageIndexer across 10k+ enterprise documents."
  },
  {
    year: "2025",
    event: "ARST & KRPO Autonomous Systems Research",
    desc: "Engineered sensor reliability transformer fusion and Three.js deep reinforcement learning racing simulation."
  },
  {
    year: "2024",
    event: "VisionSat & LLM Quantization Exploration",
    desc: "Trained EuroSAT ResNet18 model to 97.24% accuracy with Grad-CAM; conducted noise-injection layer sensitivity experiments."
  },
  {
    year: "2023",
    event: "Enrolled in B.Tech Computer Science at MUJ",
    desc: "Began undergraduate degree in Computer Science, focusing on systems architecture and foundational machine learning."
  }
];

export const skills = {
  "PROGRAMMING LANGUAGES": ["PYTHON", "JAVA", "C", "C++", "JAVASCRIPT", "TYPESCRIPT", "SQL"],
  "BACKEND & SYSTEMS": ["FASTAPI", "FLASK", "REST APIS", "MICROSERVICES", "SQLALCHEMY", "ASYNCIO"],
  "AI & MACHINE LEARNING": ["PYTORCH", "SCIKIT-LEARN", "TENSORFLOW", "TRANSFORMERS", "CNNS", "REINFORCEMENT LEARNING", "COMPUTER VISION"],
  "RAG & AGENTIC ARCHITECTURES": ["LANGCHAIN", "LANGGRAPH", "BM25", "DENSE RETRIEVAL", "CROSS-ENCODER", "QUADRANK", "VECTOR DATABASES", "EMBEDDINGS"],
  "DATA & INFRASTRUCTURE": ["POSTGRESQL", "MYSQL", "DOCKER", "GIT", "GITHUB", "LINUX", "VERCEL", "CI/CD"]
};
