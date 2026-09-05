export type Accent = 'amber' | 'indigo' | 'green'

export type StackGroup = {
  group: string
  tools: string[]
  justification: string
}

export type FeatureDetail = {
  name: string
  priority: 'P0 (Core MVP)' | 'P1 (Advanced Distinction)'
  description: string
  deliverable: string
}

export type RoadmapPhase = {
  phase: string
  title: string
  duration: string
  detail: string
  deliverables: string[]
  vivaMilestone: string
}

export type PracticalImprovement = {
  area: 'Scalability' | 'Security & Privacy' | 'Edge Case Resilience' | 'Academic Rigor'
  suggestion: string
  implementationTip: string
}

export type VivaQuestion = {
  question: string
  expectedAnswer: string
  defenseTip: string
}

export type Idea = {
  slug: string
  title: string
  tagline: string
  category: string
  domain: string
  accent: Accent
  match: number
  matchReason: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedWeeks: number
  targetOutcome: string
  requiredSkills: string[]
  interests: string[]
  overview: string
  problemContext: string
  stack: StackGroup[]
  featuresDetailed: FeatureDetail[]
  roadmap: RoadmapPhase[]
  improvementsDetailed: PracticalImprovement[]
  vivaQuestions: VivaQuestion[]
  features: string[]
  improvements: string[]
}

export const ideas: Idea[] = [
  {
    slug: 'attendai',
    title: 'AttendAI',
    tagline: 'Defensible on-device face recognition with anti-spoofing and offline sync for classrooms.',
    category: 'Computer Vision & Edge AI',
    domain: 'Artificial intelligence',
    accent: 'indigo',
    match: 96,
    matchReason: 'Direct match for Python + OpenCV + React skills with an emphasis on low-latency Edge AI.',
    difficulty: 'Intermediate',
    estimatedWeeks: 12,
    targetOutcome: 'Working Prototype + College Deployment Ready',
    requiredSkills: ['Python', 'AI & data', 'Web development'],
    interests: ['Artificial intelligence', 'Hardware & devices'],
    overview:
      'AttendAI automates academic attendance via edge camera feeds. It features real-time 3D facial landmark tracking, anti-spoofing liveness checks, and encrypted on-device embeddings, guaranteeing zero biometric leakages while surviving campus Wi-Fi outages.',
    problemContext:
      'Traditional roll calls consume 10-15% of instructional time. Existing biometric fingerprint scanners create physical bottlenecks and contagion risks, while cloud-based facial recognition fails student privacy compliance and requires continuous high-bandwidth internet.',
    stack: [
      {
        group: 'Frontend & Dashboard',
        tools: ['Next.js 16', 'Tailwind CSS v4', 'Lucide React'],
        justification: 'Provides high-speed SSR for attendance dashboards, real-time live video preview canvas, and student roster exports.',
      },
      {
        group: 'Edge Vision Service',
        tools: ['FastAPI', 'OpenCV', 'InsightFace', 'ONNX Runtime'],
        justification: 'Runs local facial feature extraction under 40ms without sending raw video streams to external third-party clouds.',
      },
      {
        group: 'Biometric Anti-Spoofing',
        tools: ['MiniFASNet', 'PyTorch Mobile'],
        justification: 'Prevents 2D printed photograph and mobile screen replay attacks during roll calls.',
      },
      {
        group: 'Persistence & Sync',
        tools: ['SQLite (Edge Cache)', 'PostgreSQL', 'Prisma ORM'],
        justification: 'Enables dual-mode offline-first buffering so classrooms operate continuously during Wi-Fi drops and sync automatically.',
      },
    ],
    featuresDetailed: [
      {
        name: 'Anti-Spoofing Liveness Verification',
        priority: 'P0 (Core MVP)',
        description: 'Detects eye blink frequency, micro-texture reflections, and head poses to reject printed photo attacks.',
        deliverable: 'Tested OpenCV + ONNX anti-spoofing pipeline passing with >98% accuracy on test images.',
      },
      {
        name: 'Real-Time Edge Face Recognition',
        priority: 'P0 (Core MVP)',
        description: 'Matches 512-dimensional facial embeddings against the registered student roster in under 50ms per frame.',
        deliverable: 'FastAPI streaming endpoint processing webcam input with sub-second roster lookup.',
      },
      {
        name: 'Faculty Master Attendance Dashboard',
        priority: 'P0 (Core MVP)',
        description: 'Classroom portal showing live headcounts, missing students, and single-click CSV/Excel export for college records.',
        deliverable: 'Role-protected Next.js portal with attendance percentage filters and semester charts.',
      },
      {
        name: 'Automated Parent/Guardian SMS Alert Engine',
        priority: 'P1 (Advanced Distinction)',
        description: 'Dispatches instant automated alerts whenever a student is marked absent consecutively for 3 days.',
        deliverable: 'Background Celery/Redis queue sending webhook notifications without lagging the live camera feed.',
      },
      {
        name: 'Multi-Camera Classroom Fusion',
        priority: 'P1 (Advanced Distinction)',
        description: 'Synthesizes feeds from two opposite camera angles to avoid occlusion in large lecture halls.',
        deliverable: 'Bounding box tracking across multi-RTSP camera feeds with deduplicated timestamp logs.',
      },
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'Biometric Pipeline & Dataset Prep',
        duration: 'Weeks 1 - 3',
        detail: 'Setup synthetic face embedding dataset, test OpenCV Haar/MTCNN cascades, and benchmark ONNX runtime on local hardware.',
        deliverables: ['Face alignment script', 'ONNX inference script <50ms', 'Database schema for student embeddings'],
        vivaMilestone: 'Synopsis & Architecture Review: Demonstrate face detection accuracy on sample batch photos.',
      },
      {
        phase: 'Phase 2',
        title: 'Anti-Spoofing & Recognition Core',
        duration: 'Weeks 4 - 6',
        detail: 'Implement MiniFASNet liveness detection, build FastAPI streaming endpoints, and implement Euclidean/Cosine similarity matching.',
        deliverables: ['Anti-spoofing validation tests', 'Cosine similarity search engine', 'Edge SQLite sync daemon'],
        vivaMilestone: 'Internal Assessment: Prove anti-spoofing works against smartphone screens and paper printouts.',
      },
      {
        phase: 'Phase 3',
        title: 'Interactive Faculty Portal & Exports',
        duration: 'Weeks 7 - 9',
        detail: 'Build Next.js web application, real-time live attendance ticker via WebSockets, and university accreditation export templates.',
        deliverables: ['Responsive faculty dashboard', 'Instant CSV/XLSX export', 'Student attendance history charts'],
        vivaMilestone: 'Mid-Term Viva: Full end-to-end demo from webcam detection to dashboard log.',
      },
      {
        phase: 'Phase 4',
        title: 'Hardening, Benchmarks & Viva Defense',
        duration: 'Weeks 10 - 12',
        detail: 'Conduct confusion matrix benchmarking, simulate Wi-Fi network dropouts, harden JWT authentication, and prepare viva documentation.',
        deliverables: ['Performance benchmark report (FPS, F1-Score)', 'Offline resilience test suite', 'Project Report & Presentation Deck'],
        vivaMilestone: 'Final Viva Examination: Defend system latency, privacy compliance, and edge vs cloud trade-offs.',
      },
    ],
    improvementsDetailed: [
      {
        area: 'Security & Privacy',
        suggestion: 'Store one-way hashed biometric vectors rather than reconstructable facial embeddings.',
        implementationTip: 'Apply random projection locality-sensitive hashing (LSH) to feature vectors before database write.',
      },
      {
        area: 'Edge Case Resilience',
        suggestion: 'Handle extreme classroom lighting, shadows, and students wearing spectacles or face coverings.',
        implementationTip: 'Augment the enrollment dataset with contrast jitter, histogram equalization, and masked face samples.',
      },
      {
        area: 'Scalability',
        suggestion: 'Use FAISS (Facebook AI Similarity Search) index if scaling to university rosters exceeding 10,000 students.',
        implementationTip: 'Switch from linear cosine search to FAISS IndexFlatIP for O(log N) vector retrieval.',
      },
      {
        area: 'Academic Rigor',
        suggestion: 'Calculate Precision, Recall, and ROC-AUC curves across diverse demographic test groups to demonstrate fair AI.',
        implementationTip: 'Include a dedicated benchmark section in Chapter 4 of the university thesis report.',
      },
    ],
    vivaQuestions: [
      {
        question: 'Why did you choose Edge processing over Cloud AI APIs like AWS Rekognition or Azure Face?',
        expectedAnswer: 'Edge inference eliminates recurring API costs, ensures compliance with student biometric data privacy (data never leaves the local subnet), and functions reliably even during campus network outages.',
        defenseTip: 'Emphasize GDPR/biometric privacy regulations and zero reliance on high-bandwidth uplinks.',
      },
      {
        question: 'How do you prevent a student from holding up a photo or video of their friend?',
        expectedAnswer: 'Our pipeline includes MiniFASNet anti-spoofing which inspects specular reflections, moiré patterns, and 3D depth landmarks before computing cosine similarity.',
        defenseTip: 'Offer to run a live demonstration holding up your smartphone photo against the webcam.',
      },
      {
        question: 'What is the time complexity of matching a face in a class of 100 students?',
        expectedAnswer: 'Vector extraction is O(1) through the neural network. Matching is O(N * D) where N is students and D is 512 embedding dimensions, taking under 2 milliseconds for 100 students.',
        defenseTip: 'Mention that for university-scale (>5,000 students), you architected the system to support FAISS vector indexing.',
      },
    ],
    features: [
      'Anti-Spoofing Liveness Verification with 3D landmark tracking',
      'Sub-50ms On-Device Face Recognition engine',
      'Faculty Master Dashboard with live headcounts and roster filtering',
      'Automated parent absence notification dispatch',
      'One-click NAAC/NBA university accreditation export format',
    ],
    improvements: [
      'Add LSH hashing to ensure biometric templates cannot be reversed into original images',
      'Support multi-RTSP camera stream synchronization across opposite classroom corners',
      'Implement offline SQLite queue buffering for campus network disruptions',
    ],
  },
  {
    slug: 'medilens',
    title: 'MediLens AI',
    tagline: 'Multimodal clinical report interpreter with drug-drug interaction warnings and layman explanations.',
    category: 'Healthcare & NLP',
    domain: 'Artificial intelligence',
    accent: 'amber',
    match: 93,
    matchReason: 'Matches interests in Healthcare AI and skills in Python, Next.js, and LLM orchestration.',
    difficulty: 'Intermediate',
    estimatedWeeks: 10,
    targetOutcome: 'Working Prototype + Research Paper Submission',
    requiredSkills: ['AI & data', 'Web development', 'Python'],
    interests: ['Artificial intelligence', 'People & community'],
    overview:
      'MediLens AI bridges the communication divide between clinical lab diagnostics and patients. It extracts structured medical entities from scanned blood tests and pathology reports using OCR + Gemini Multimodal, identifies contraindications, and delivers an interactive patient consultation portal.',
    problemContext:
      'Over 60% of patients cannot interpret their own blood tests or discharge summaries, resulting in medication adherence errors and emergency readmissions. Existing search engines produce alarmist conclusions without grounding in patient-specific metrics.',
    stack: [
      {
        group: 'Frontend & Consultation UI',
        tools: ['Next.js 16', 'Tailwind CSS v4', 'Recharts'],
        justification: 'Renders dynamic biometric reference range charts (e.g. HbA1c, Lipid profile) with responsive patient-friendly explanations.',
      },
      {
        group: 'Document Ingestion & OCR',
        tools: ['Tesseract OCR', 'pdf2image', 'PyMuPDF'],
        justification: 'Extracts tabular and handwritten clinical report text from scanned mobile camera uploads.',
      },
      {
        group: 'Medical AI & Reasoning',
        tools: ['Google Gemini 1.5 Flash', 'LangChain', 'OpenFDA API'],
        justification: 'Powers clinical entity extraction and queries official FDA databases to flag known drug-drug contraindications.',
      },
      {
        group: 'Data Storage & Audit',
        tools: ['PostgreSQL', 'Supabase Auth', 'AES-256 Encryption'],
        justification: 'Maintains HIPAA-conscious data at rest with complete audit trails for uploaded medical records.',
      },
    ],
    featuresDetailed: [
      {
        name: 'Scanned Lab Report Ingestion (PDF/Image)',
        priority: 'P0 (Core MVP)',
        description: 'Upload phone photos or PDFs of lab tests with automatic orientation correction and OCR extraction.',
        deliverable: 'Multi-format upload pipeline handling JPG, PNG, and PDF medical records.',
      },
      {
        name: 'Biomarker Extraction & Normal Range Visualizer',
        priority: 'P0 (Core MVP)',
        description: 'Extracts values (Hemoglobin, Platelets, Creatinine) and maps them on color-coded standard clinical ranges.',
        deliverable: 'Visual gauge component indicating Low, Normal, High, and Critical thresholds.',
      },
      {
        name: 'Drug-Drug Interaction Checker',
        priority: 'P0 (Core MVP)',
        description: 'Cross-references active prescriptions against FDA open databases for adverse interaction warnings.',
        deliverable: 'Safety matrix badge flagging Mild, Moderate, or Severe pharmacological contraindications.',
      },
      {
        name: 'Multilingual Audio Explanation Generator',
        priority: 'P1 (Advanced Distinction)',
        description: 'Generates simplified voice notes explaining the lab results in regional languages for non-English speaking patients.',
        deliverable: 'Text-to-speech synthesized patient summaries in Hindi, Spanish, and regional dialects.',
      },
      {
        name: 'Doctor Q&A Tele-Consult Brief Exporter',
        priority: 'P1 (Advanced Distinction)',
        description: 'Creates a concise, 1-page clinical summary highlighting anomalous metrics for the patient to present during their doctor visit.',
        deliverable: 'Downloadable PDF consultation brief optimized for doctor review in under 60 seconds.',
      },
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'Clinical OCR & Entity Pipeline',
        duration: 'Weeks 1 - 2',
        detail: 'Build document pre-processing, contrast enhancement, and test OCR extraction on sample CBC and Lipid panel reports.',
        deliverables: ['Preprocessing script', 'Structured JSON parser for biomarkers', 'Test dataset of 25 lab reports'],
        vivaMilestone: 'Project Synopsis: Demonstrate accurate extraction of values from scanned hospital reports.',
      },
      {
        phase: 'Phase 2',
        title: 'AI Medical Reasoning & OpenFDA Integration',
        duration: 'Weeks 3 - 5',
        detail: 'Configure Gemini API prompt templates with medical safety system instructions and connect OpenFDA REST endpoints.',
        deliverables: ['Drug interaction verification engine', 'Confidence scoring module', 'Safety disclaimer banners'],
        vivaMilestone: 'Internal Review: Prove zero hallucination for normal/abnormal biomarker thresholds.',
      },
      {
        phase: 'Phase 3',
        title: 'Interactive Patient Dashboard',
        duration: 'Weeks 6 - 8',
        detail: 'Develop patient UI with interactive visual sliders, explanation cards, medication reminders, and export utilities.',
        deliverables: ['Next.js responsive portal', 'Interactive Recharts dashboard', 'Audio narration player'],
        vivaMilestone: 'Mid-Term Evaluation: Patient journey test from report upload to clear clinical breakdown.',
      },
      {
        phase: 'Phase 4',
        title: 'Security Hardening, Validation & Thesis',
        duration: 'Weeks 9 - 10',
        detail: 'Enforce AES-256 record encryption, run clinical validation tests with medical students, and complete thesis documentation.',
        deliverables: ['Clinical accuracy evaluation report', 'Automated security scan', 'Final presentation slides'],
        vivaMilestone: 'Final Viva Defense: Defend clinical safety boundaries, liability disclaimers, and data protection.',
      },
    ],
    improvementsDetailed: [
      {
        area: 'Security & Privacy',
        suggestion: 'Implement zero-knowledge client-side decryption so medical text is never stored in plain text.',
        implementationTip: 'Use Web Crypto API to derive encryption keys from user passwords before transmitting to database.',
      },
      {
        area: 'Academic Rigor',
        suggestion: 'Benchmark entity extraction F1-score against established datasets like MIMIC-III and PubMed-BERT.',
        implementationTip: 'Compare Gemini zero-shot extraction against standard BioBERT baseline in your results chapter.',
      },
      {
        area: 'Edge Case Resilience',
        suggestion: 'Handle poor camera lighting, wrinkled paper, and handwritten doctor notes.',
        implementationTip: 'Integrate adaptive thresholding and deskewing via OpenCV before feeding images to OCR engines.',
      },
      {
        area: 'Scalability',
        suggestion: 'Cache verified FDA drug-drug interaction pairs in Redis to prevent repeated external API latency.',
        implementationTip: 'Set a 30-day TTL cache for static pharmacological combination keys in Redis.',
      },
    ],
    vivaQuestions: [
      {
        question: 'How do you guard against AI hallucination when interpreting medical results?',
        expectedAnswer: 'We enforce a deterministic JSON schema and require strict grounding: the AI is barred from diagnosing and is restricted to explaining verified reference ranges and quoting FDA contraindications.',
        defenseTip: 'Highlight the prominent clinical disclaimer and show how values are verified against deterministic rule sets.',
      },
      {
        question: 'Why did you use Gemini over a local model for medical text processing?',
        expectedAnswer: 'Gemini 1.5 Flash provides 1M+ token context windows capable of digesting multi-page discharge summaries along with multimodal vision capabilities for charts and tables, at sub-second response speeds.',
        defenseTip: 'Mention that for offline deployments, the architecture is decoupled to support open-source BioMistral.',
      },
      {
        question: 'How does your application address patient data privacy regulations (HIPAA/GDPR)?',
        expectedAnswer: 'All uploaded lab files are automatically stripped of identifiable personal metadata (PII redaction) before AI processing, and stored files are encrypted at rest with AES-256.',
        defenseTip: 'Show your PII sanitization pipeline step in your architecture diagram.',
      },
    ],
    features: [
      'Multi-Format Lab Report Ingestion (PDF, JPEG, PNG)',
      'Visual Biomarker Reference Range Breakdown (Low/Normal/High)',
      'OpenFDA Drug-Drug Interaction Warning Engine',
      'Multilingual Simplified Voice Explanation Generator',
      'One-Click Clinical Teleconsultation Brief PDF Exporter',
    ],
    improvements: [
      'Add client-side PII de-identification before transmitting documents',
      'Cache OpenFDA drug interaction pairs in Redis to reduce latency',
      'Benchmark entity extraction F1-score against BioBERT baselines',
    ],
  },
  {
    slug: 'zerotrace',
    title: 'ZeroTrace',
    tagline: 'Tamper-proof academic credential verification using Zero-Knowledge proofs and decentralized ledgers.',
    category: 'Cybersecurity & Web3',
    domain: 'Artificial intelligence',
    accent: 'green',
    match: 91,
    matchReason: 'Ideal for students seeking high academic distinction in Cryptography, Security, and Distributed Systems.',
    difficulty: 'Advanced',
    estimatedWeeks: 12,
    targetOutcome: 'Defensible Capstone + Best Project Award Contender',
    requiredSkills: ['Web development', 'Web3 / Security', 'Just getting started'],
    interests: ['Artificial intelligence', 'Protecting the planet'],
    overview:
      'ZeroTrace eliminates resume fraud and fake degree certificates. Using Zero-Knowledge proofs (zk-SNARKs), students can prove to employers that their GPA is above 3.5 or that they graduated with honors without revealing their entire academic transcript or sensitive personal details.',
    problemContext:
      'Over 28% of evaluated employment applications contain falsified degrees or exaggerated GPAs. Current university verification takes 2-4 weeks, costs heavy administrative fees, and forces students to disclose their full private grades.',
    stack: [
      {
        group: 'Frontend & Verifier Portal',
        tools: ['Next.js 16', 'Tailwind CSS v4', 'SnarkJS'],
        justification: 'Generates client-side zero-knowledge proofs in the browser in <3 seconds without exposing raw grades to any server.',
      },
      {
        group: 'ZK Circuits & Cryptography',
        tools: ['Circom 2.1', 'zk-SNARKs (Groth16)', 'Merkle Trees'],
        justification: 'Compiles mathematical circuits that verify numerical grade thresholds without disclosing the specific scores.',
      },
      {
        group: 'Smart Contract Layer',
        tools: ['Solidity', 'Hardhat / Foundry', 'Polygon Testnet'],
        justification: 'Stores immutable university cryptographic public keys and roots with near-zero gas costs.',
      },
      {
        group: 'University Admin Issuer',
        tools: ['TypeScript', 'Ethers.js', 'PostgreSQL'],
        justification: 'Allows authorized university registrar staff to batch-issue cryptographically signed student credentials.',
      },
    ],
    featuresDetailed: [
      {
        name: 'University Registrar Batch Credential Issuer',
        priority: 'P0 (Core MVP)',
        description: 'University admin panel to sign and commit academic records to a cryptographic Merkle tree.',
        deliverable: 'Ethers.js signing utility with automated Merkle root registration on the smart contract.',
      },
      {
        name: 'Client-Side ZK-Proof Generator',
        priority: 'P0 (Core MVP)',
        description: 'Student wallet allowing students to generate mathematical proofs (e.g. "GPA >= 8.5/10") with zero data leakage.',
        deliverable: 'SnarkJS browser module generating valid Groth16 cryptographic proof in under 4 seconds.',
      },
      {
        name: 'Instant Recruiter QR Verifier',
        priority: 'P0 (Core MVP)',
        description: 'Public verification page where employers paste a proof hash or scan a QR code to confirm authenticity instantly.',
        deliverable: 'Sub-second verifier contract call validating proof integrity without registration.',
      },
      {
        name: 'Selective Disclosure Consent Manager',
        priority: 'P1 (Advanced Distinction)',
        description: 'Allows students to revoke proof visibility or grant time-limited verification access to specific corporate recruiters.',
        deliverable: 'Cryptographic time-lock authorization mechanism.',
      },
      {
        name: 'Legacy University Legacy Database Connector',
        priority: 'P1 (Advanced Distinction)',
        description: 'Automated CSV/SQL pipeline syncing existing ERP university records into cryptographic commitments.',
        deliverable: 'Configurable ETL script for popular university ERPs like ERPNext/SAP.',
      },
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'Cryptographic Circuit Design',
        duration: 'Weeks 1 - 3',
        detail: 'Write Circom circuits for GPA threshold inequalities and Merkle tree inclusion; compile R1CS constraints.',
        deliverables: ['Circom circuit files', 'Trusted setup Ceremony verification', 'Wasm prover artifact'],
        vivaMilestone: 'Synopsis Defense: Present circuit constraint count and mathematical proof validity.',
      },
      {
        phase: 'Phase 2',
        title: 'Smart Contracts & Testnet Deployment',
        duration: 'Weeks 4 - 6',
        detail: 'Deploy Groth16 Solidity verifier contract to Polygon Amoy testnet; write Hardhat automated test suites.',
        deliverables: ['Deployed verifier contract', '100% passing test coverage suite', 'Gas consumption benchmarks'],
        vivaMilestone: 'Internal Assessment: Live transaction verifying on Polygon block explorer.',
      },
      {
        phase: 'Phase 3',
        title: 'Student Credential Wallet & Verifier UI',
        duration: 'Weeks 7 - 9',
        detail: 'Develop Next.js frontend with embedded SnarkJS prover, drag-and-drop QR scanner, and verifiable credential downloads.',
        deliverables: ['Complete web application', 'Recruiter 1-click verification portal', 'Student dashboard'],
        vivaMilestone: 'Mid-Term Viva: End-to-end demonstration from admin issuance to recruiter verification.',
      },
      {
        phase: 'Phase 4',
        title: 'Gas Optimization & Security Audit',
        duration: 'Weeks 10 - 12',
        detail: 'Optimize Merkle tree depths for gas efficiency, test replay attack resilience, and prepare final academic thesis.',
        deliverables: ['Formal security audit report', 'Gas optimization table', 'Final Viva Defense Report'],
        vivaMilestone: 'Final Viva Defense: Defend zk-SNARK mathematics, trusted setup assumptions, and gas scalability.',
      },
    ],
    improvementsDetailed: [
      {
        area: 'Security & Privacy',
        suggestion: 'Prevent double-spending/replay attacks where one student reuses another student’s generated proof.',
        implementationTip: 'Bind the recipient employer’s public key or a timestamp nonce as a public input to the Circom circuit.',
      },
      {
        area: 'Scalability',
        suggestion: 'Batch verify multiple student credential proofs in a single transaction to reduce on-chain gas costs by 80%.',
        implementationTip: 'Implement recursive SNARKs or SnarkPack aggregation over Groth16 proofs.',
      },
      {
        area: 'Academic Rigor',
        suggestion: 'Provide formal cryptographic analysis of soundness, completeness, and zero-knowledge in Chapter 3.',
        implementationTip: 'Include formal mathematical equations demonstrating that probability of false verification is negligible.',
      },
      {
        area: 'Edge Case Resilience',
        suggestion: 'Support offline verification using digital signatures when an internet connection to the blockchain is unavailable.',
        implementationTip: 'Embed verifiable W3C Decentralized Identifiers (DIDs) inside offline verifiable credentials.',
      },
    ],
    vivaQuestions: [
      {
        question: 'What is the difference between a zero-knowledge proof and standard digital signature verification?',
        expectedAnswer: 'A digital signature reveals the signed data to verify authenticity. A Zero-Knowledge proof proves a statement about the data (e.g. GPA > 8.0) is true mathematically without revealing the underlying data itself.',
        defenseTip: 'Use a clear visual analogy such as Alibaba’s Cave or a Where’s Waldo proof.',
      },
      {
        question: 'Why did you use Groth16 over Plonk or Halo2 for your zk-SNARK scheme?',
        expectedAnswer: 'Groth16 produces the smallest proof size (128 bytes) and has the fastest on-chain verification time and lowest gas cost in Solidity, which is critical for scalable university verification.',
        defenseTip: 'Acknowledge the trusted setup trade-off and explain how a Powers of Tau ceremony mitigates it.',
      },
      {
        question: 'What prevents a malicious user from passing an expired or revoked degree proof?',
        expectedAnswer: 'Our smart contract maintains a cryptographic accumulator (revocation Merkle tree) updated by the university registrar; verifier circuits check non-membership in the revocation set.',
        defenseTip: 'Point to the revocation check logic in your smart contract code during the demo.',
      },
    ],
    features: [
      'University Registrar Batch Credential Signing and Merkle Root Commitment',
      'Client-Side Browser zk-SNARK Proof Generation (<3s via SnarkJS)',
      'Zero-Gas Recruiter Web Verifier with QR Code Reader',
      'Selective Disclosure: Prove GPA thresholds without exposing grades',
      'W3C-compliant Verifiable Credential Export Format',
    ],
    improvements: [
      'Bind recruiter public key into circuit to eliminate proof replay attacks',
      'Implement recursive proof batching to slash verification gas overhead',
      'Add cryptographic revocation registry for canceled credentials',
    ],
  },
  {
    slug: 'voltgrid',
    title: 'VoltGrid AI',
    tagline: 'Microgrid renewable energy forecasting and automated battery dispatch optimizer.',
    category: 'IoT & ClimateTech',
    domain: 'Hardware & devices',
    accent: 'green',
    match: 89,
    matchReason: 'Great combination of IoT sensor pipelines, Time-Series ML, and green sustainability impact.',
    difficulty: 'Intermediate',
    estimatedWeeks: 10,
    targetOutcome: 'Hardware Prototype + Software Dashboard',
    requiredSkills: ['AI & data', 'Web development', 'Python'],
    interests: ['Hardware & devices', 'Protecting the planet'],
    overview:
      'VoltGrid combines solar generation telemetry with weather forecasting models to schedule smart battery charging and curtail peak-tariff electricity costs in university campuses and residential microgrids.',
    problemContext:
      'Unpredictable solar and wind generation results in up to 35% renewable curtailment or heavy grid peak penalties. Small microgrids lack autonomous dispatch software capable of predicting demand spikes hours ahead.',
    stack: [
      {
        group: 'Telemetry & Hardware Sim',
        tools: ['ESP32 / Raspberry Pi', 'MQTT Protocol', 'Node-RED'],
        justification: 'Streams solar panel voltage, current, and battery state-of-charge over low-bandwidth IoT protocols.',
      },
      {
        group: 'Forecasting & Scheduling ML',
        tools: ['Python', 'XGBoost', 'Prophet', 'SciPy Optimize'],
        justification: 'Generates 24-hour lookahead generation curves and solves linear programming optimization for battery discharge.',
      },
      {
        group: 'Time-Series Engine',
        tools: ['TimescaleDB / InfluxDB', 'Grafana (Simulated)'],
        justification: 'Stores high-frequency sensor readings with automated time-bucketing and retention policies.',
      },
      {
        group: 'Operator Dashboard',
        tools: ['Next.js 16', 'Tailwind CSS v4', 'Recharts'],
        justification: 'Visualizes real-time power flow animations (Solar -> Battery -> Campus Grid) and savings metrics.',
      },
    ],
    featuresDetailed: [
      {
        name: 'Real-Time MQTT Sensor Telemetry Stream',
        priority: 'P0 (Core MVP)',
        description: 'Streams voltage, current, and solar irradiance readings every 5 seconds into a time-series database.',
        deliverable: 'MQTT broker pipeline feeding live telemetry into TimescaleDB.',
      },
      {
        name: '24-Hour Solar Production Forecaster',
        priority: 'P0 (Core MVP)',
        description: 'Combines open weather forecasts with historical generation data to predict next-day kWh yield.',
        deliverable: 'Trained model delivering <8% Mean Absolute Percentage Error (MAPE).',
      },
      {
        name: 'Optimal Battery Dispatch Scheduler',
        priority: 'P0 (Core MVP)',
        description: 'Calculates when to store solar power vs when to inject into the campus grid to minimize peak tariff charges.',
        deliverable: 'Automated dispatch algorithm with simulated cost savings tracker.',
      },
      {
        name: 'Grid Anomaly & Overcurrent Alert Daemon',
        priority: 'P1 (Advanced Distinction)',
        description: 'Detects unusual voltage fluctuations or battery overheating and dispatches instant kill-switch commands.',
        deliverable: 'Automated emergency trip logic with WebSocket dashboard alert toast.',
      },
      {
        name: 'Carbon Offset & Green Energy Credit Counter',
        priority: 'P1 (Advanced Distinction)',
        description: 'Calculates kilograms of CO2 prevented in real time for university environmental sustainability audits.',
        deliverable: 'Exportable green audit report compliant with campus ESG guidelines.',
      },
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'IoT Telemetry Pipeline & Simulation',
        duration: 'Weeks 1 - 2',
        detail: 'Build hardware sensor prototype or simulated IoT telemetry generator streaming MQTT packets to TimescaleDB.',
        deliverables: ['MQTT ingestion service', 'Sensor simulation script', 'Time-series database schema'],
        vivaMilestone: 'Synopsis Approval: Demonstrate live sensor streaming to database with zero packet drops.',
      },
      {
        phase: 'Phase 2',
        title: 'Predictive Modeling & Optimization Core',
        duration: 'Weeks 3 - 5',
        detail: 'Train XGBoost/Prophet models on solar irradiance datasets and build SciPy linear programming dispatch optimizer.',
        deliverables: ['24-hour forecasting script', 'Cost optimization algorithm', 'Model accuracy benchmark charts'],
        vivaMilestone: 'Internal Review: Show forecast accuracy against ground truth weather data.',
      },
      {
        phase: 'Phase 3',
        title: 'Microgrid Control Dashboard',
        duration: 'Weeks 6 - 8',
        detail: 'Build Next.js operations portal featuring live power flow diagrams, financial savings calculator, and manual override.',
        deliverables: ['Animated energy flow canvas', 'Battery health metrics widget', 'Tariff cost reduction summary'],
        vivaMilestone: 'Mid-Term Viva: Full automated dispatch simulation under varying tariff rates.',
      },
      {
        phase: 'Phase 4',
        title: 'Fault Testing, Stress Analysis & Defense',
        duration: 'Weeks 9 - 10',
        detail: 'Simulate sensor dropouts and extreme weather shocks; compile engineering report with comprehensive ROI charts.',
        deliverables: ['Resilience test documentation', 'ROI & Payback period analysis', 'Final Thesis Report'],
        vivaMilestone: 'Final Viva Defense: Defend dispatch optimization logic, battery lifecycle degradation model, and hardware scale.',
      },
    ],
    improvementsDetailed: [
      {
        area: 'Edge Case Resilience',
        suggestion: 'Incorporate battery state-of-health (SoH) and thermal degradation into the dispatch objective function.',
        implementationTip: 'Penalize high C-rate rapid charging cycles in the SciPy cost function to prolong battery chemistry life.',
      },
      {
        area: 'Scalability',
        suggestion: 'Support multi-node microgrid peer-to-peer energy trading between adjacent campus buildings.',
        implementationTip: 'Expose REST API endpoints for building energy management systems (BEMS) to bid for excess solar capacity.',
      },
      {
        area: 'Security & Privacy',
        suggestion: 'Enforce mutual TLS (mTLS) authentication on all edge MQTT sensor nodes to prevent malicious grid command injection.',
        implementationTip: 'Provision X.509 device certificates for every microgrid node before authorization.',
      },
      {
        area: 'Academic Rigor',
        suggestion: 'Benchmark against traditional rule-based hysteresis dispatch (charge when sun shines, discharge when dark).',
        implementationTip: 'Include a comparative cost table proving your AI approach reduces campus power bills by an additional 18-22%.',
      },
    ],
    vivaQuestions: [
      {
        question: 'How does your model account for sudden sudden cloud cover affecting solar generation?',
        expectedAnswer: 'The system uses an ensemble approach: a 24-hour lookahead model sets the baseline schedule, while an adaptive 5-minute rolling kalman filter adjusts battery ramp rates dynamically when real-time irradiance diverges.',
        defenseTip: 'Explain the difference between day-ahead scheduling and real-time frequency regulation.',
      },
      {
        question: 'Why not simply use traditional rule-based charging instead of machine learning?',
        expectedAnswer: 'Rule-based charging fills the battery early in the morning and misses high-tariff afternoon peak shaving, whereas our optimizer calculates time-of-use rates to maximize economic savings.',
        defenseTip: 'Show your tariff cost comparison graph in your results slides.',
      },
      {
        question: 'What happens if the IoT sensors lose network connectivity?',
        expectedAnswer: 'Edge ESP32 nodes fall back to a safe pre-computed schedule stored in flash memory, preventing battery overcharging or grid back-feeding.',
        defenseTip: 'Demonstrate that fail-safe behavior is a core engineering priority in your hardware design.',
      },
    ],
    features: [
      'Live MQTT Telemetry Stream for Solar and Battery Metrics',
      '24-Hour Solar Production Forecaster using XGBoost/Prophet',
      'Linear Programming Battery Dispatch Optimizer for Peak Tariffs',
      'Interactive Power Flow Animated Canvas',
      'Real-Time Carbon Offset & ESG Sustainability Metrics',
    ],
    improvements: [
      'Incorporate battery thermal degradation penalties into dispatch optimizer',
      'Enforce mTLS device certificate authentication on IoT edge nodes',
      'Benchmark economic ROI against traditional hysteresis controllers',
    ],
  },
  {
    slug: 'codementor-ai',
    title: 'CodeMentor AI',
    tagline: 'Autonomous AST-aware code reviewer and security vulnerability patcher for student repositories.',
    category: 'DevTools & AI Agents',
    domain: 'Artificial intelligence',
    accent: 'indigo',
    match: 95,
    matchReason: 'Direct alignment with Web Development, AI, and Software Engineering quality gates.',
    difficulty: 'Intermediate',
    estimatedWeeks: 10,
    targetOutcome: 'SaaS Platform + Open Source Developer Tool',
    requiredSkills: ['Web development', 'AI & data', 'Python'],
    interests: ['Artificial intelligence', 'Learning something new'],
    overview:
      'CodeMentor AI serves as a 24/7 automated teaching assistant for computer science students. It inspects GitHub pull requests, parses Abstract Syntax Trees (AST) to pinpoint logic bugs and OWASP Top 10 vulnerabilities, and writes automated fix suggestions that teach principles rather than just giving away code.',
    problemContext:
      'University teaching assistants spend hundreds of hours grading repetitive syntax errors and unformatted code, while students receive feedback weeks after homework submission when learning momentum has already vanished.',
    stack: [
      {
        group: 'Frontend & Code Inspector',
        tools: ['Next.js 16', 'Tailwind CSS v4', 'Monaco Editor'],
        justification: 'Provides a familiar VS Code-like diff viewer with inline AI annotations and interactive fix approvals.',
      },
      {
        group: 'AST & Static Analysis',
        tools: ['Tree-sitter', 'Babel Parser', 'Python ast'],
        justification: 'Extracts syntax trees and code symbols deterministically before prompting the AI, preventing hallucinated line numbers.',
      },
      {
        group: 'AI Reasoning & Tutoring Engine',
        tools: ['Google Gemini 1.5 Flash', 'LangChain', 'Structured Output'],
        justification: 'Generates Socratic tutoring feedback that explains the root vulnerability and provides reproducible test cases.',
      },
      {
        group: 'Sandbox & Automation',
        tools: ['Docker', 'GitHub Webhooks API', 'Redis Queue'],
        justification: 'Executes student code patches inside an ephemeral, isolated container to verify that fixes pass unit tests.',
      },
    ],
    featuresDetailed: [
      {
        name: 'GitHub Repository & Pull Request Webhook Bot',
        priority: 'P0 (Core MVP)',
        description: 'Listens for student commit webhooks and posts inline review comments on GitHub pull requests.',
        deliverable: 'GitHub App integration with automated commit status check pass/fail badge.',
      },
      {
        name: 'AST-Grounded Bug & OWASP Vulnerability Detector',
        priority: 'P0 (Core MVP)',
        description: 'Identifies SQL injection, unhandled promise rejections, memory leaks, and infinite loops via AST inspection.',
        deliverable: 'Deterministic vulnerability scanner outputting exact line ranges and CWE vulnerability identifiers.',
      },
      {
        name: 'Socratic Code Explanation & Learning Coach',
        priority: 'P0 (Core MVP)',
        description: 'Instead of just outputting corrected code, explains *why* the anti-pattern is hazardous and how memory behaves.',
        deliverable: 'Interactive chat drawer allowing students to ask follow-up questions about specific functions.',
      },
      {
        name: 'Isolated Docker Code Sandbox Test Runner',
        priority: 'P1 (Advanced Distinction)',
        description: 'Executes student code before and after suggested patches in a secure isolated Docker container to verify test suites.',
        deliverable: 'Automated test runner returning execution logs and memory/time complexity profiles.',
      },
      {
        name: 'Instructor Plagiarism & AI-Code Attribution Detector',
        priority: 'P1 (Advanced Distinction)',
        description: 'Analyzes commit frequency, keystroke cadence, and structural AST token similarity to flag uncredited copied code.',
        deliverable: 'Faculty dashboard ranking submission similarity across the entire cohort.',
      },
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'AST Parser & Static Analysis Core',
        duration: 'Weeks 1 - 3',
        detail: 'Build Tree-sitter AST extraction pipeline for Python and JavaScript, isolating function scopes and variable declarations.',
        deliverables: ['Tree-sitter parsing script', 'Vulnerability rule definitions', 'Benchmarking script on test repos'],
        vivaMilestone: 'Synopsis Approval: Demonstrate accurate AST node extraction on messy student code samples.',
      },
      {
        phase: 'Phase 2',
        title: 'Gemini Socratic Review Pipeline',
        duration: 'Weeks 4 - 6',
        detail: 'Prompt engineer Gemini with AST context, build structured output schema for line comments, and integrate GitHub Webhooks.',
        deliverables: ['Structured review generator', 'GitHub App webhook listener', 'PR comment automated poster'],
        vivaMilestone: 'Internal Assessment: Live PR review posted to a test GitHub repository in under 5 seconds.',
      },
      {
        phase: 'Phase 3',
        title: 'Interactive Web Portal & Sandbox Runner',
        duration: 'Weeks 7 - 9',
        detail: 'Develop Next.js web application with Monaco diff viewer, Docker code execution runner, and student feedback dashboard.',
        deliverables: ['Interactive code diff UI', 'Docker test sandbox', 'Student mastery progress graph'],
        vivaMilestone: 'Mid-Term Viva: Full live demonstration showing an insecure code snippet detected, explained, and verified.',
      },
      {
        phase: 'Phase 4',
        title: 'Cohort Analytics, Benchmarking & Viva Prep',
        duration: 'Weeks 10 - 12',
        detail: 'Run precision/recall evaluation on known CWE security vulnerability benchmark datasets and prepare final thesis.',
        deliverables: ['CWE vulnerability detection benchmark report', 'Complete academic project thesis', 'Final viva presentation'],
        vivaMilestone: 'Final Viva Defense: Defend AST + LLM hybrid architecture vs purely statistical or purely rule-based linters.',
      },
    ],
    improvementsDetailed: [
      {
        area: 'Security & Privacy',
        suggestion: 'Strictly isolate the Docker execution sandbox with network disabled (bridge none) and restricted memory limits.',
        implementationTip: 'Run container with `--network none --memory 256m --pids-limit 64 --read-only` to prevent fork bombs or escapes.',
      },
      {
        area: 'Academic Rigor',
        suggestion: 'Benchmark against SonarQube, ESLint, and Semgrep to demonstrate superior explanatory capability.',
        implementationTip: 'Create a comparative matrix showing that while static linters flag bugs, CodeMentor explains pedagogical principles.',
      },
      {
        area: 'Scalability',
        suggestion: 'Buffer high-concurrency submission spikes using Celery/RabbitMQ during midnight homework submission deadlines.',
        implementationTip: 'Use a message queue to prevent API rate limits when an entire class of 200 students pushes commits simultaneously.',
      },
      {
        area: 'Edge Case Resilience',
        suggestion: 'Handle multi-file circular imports and custom internal libraries without failing code analysis.',
        implementationTip: 'Construct a file dependency graph (DAG) before extracting AST symbols.',
      },
    ],
    vivaQuestions: [
      {
        question: 'Why combine Abstract Syntax Trees (AST) with an LLM rather than passing raw code to the LLM directly?',
        expectedAnswer: 'Raw code passed to LLMs frequently produces hallucinated line numbers and misses deep structural dependencies. AST parsing grounds the AI in deterministic syntax boundaries and reduces token costs by 65%.',
        defenseTip: 'Walk the examiners through an example of your AST node extraction before the LLM prompt step.',
      },
      {
        question: 'How do you secure your server when executing untrusted student code to verify test suites?',
        expectedAnswer: 'Code is executed in ephemeral, rootless Docker containers with network access disabled, hard CPU/memory limits, read-only file systems, and a strict 5-second timeout.',
        defenseTip: 'Emphasize your container security flags (`--network none`, `--memory 256m`, `--pids-limit`).',
      },
      {
        question: 'How does your tool ensure students actually learn rather than simply copy-pasting the AI suggestions?',
        expectedAnswer: 'CodeMentor operates on the Socratic method: it highlights anti-patterns, explains memory/algorithmic implications, and gives hints with guided questions, unlocking complete code solutions only after attempts.',
        defenseTip: 'Show an example of a Socratic review comment vs a generic chat assistant output.',
      },
    ],
    features: [
      'GitHub Pull Request Webhook Bot with Automated Line Reviews',
      'AST-Grounded OWASP Top 10 Vulnerability & Anti-Pattern Scanner',
      'Socratic Pedagogy Engine: Teaches principles rather than spoonfeeding code',
      'Isolated Docker Sandbox Test Runner with Execution Metrics',
      'Monaco Editor Side-by-Side Visual Diff Inspector',
    ],
    improvements: [
      'Isolate code execution sandbox with rootless Docker and zero network access',
      'Build cohort AST dependency graphs to detect structural code plagiarism',
      'Buffer simultaneous submission spikes using Redis worker queues',
    ],
  },
]

export function getIdea(slug: string): Idea | undefined {
  return ideas.find((i) => i.slug === slug)
}
