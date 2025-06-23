// components/ProjectsSection.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  tools: string[];
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Job Board',
    description: ' Engineered end-to-end recruitment platform using React/FastAPI/PostgreSQL, processing 1,500+ applications with 99.8% uptime. Implemented NLP-based ATS scoring algorithm (TF-IDF + cosine similarity), achieving 85% accuracy in resume-JD matching. Automated resume screening process, decreasing manual review time by 75% and increasing hiring efficiency by 40%. Streamlined recruiter workflow with dynamic dashboards, enabling 3x faster candidate shortlisting',
    image: '/img1.jpg',
    tools: ['React', 'FastApi', 'PostgreSql', 'NLP', 'Supabase'],
    githubUrl: 'https://github.com/dhruvxsingh/ai_resume_screener',
    liveUrl: 'https://example.com',
  },
  {
    id: 2,
    name: 'Web Scraper and PDF Parser',
    description: 'Developed an automated pipeline using Scrapy for web scraping, PyMuPDF (fitz) for structured PDFs, and Molmo and Google Flash for image-based PDF parsing.',
    image: '/img2.jpg',
    tools: ['Vite', 'Flask', 'Supabase', 'Typescript'],
    githubUrl: 'https://github.com/dhruvxsingh/intern',
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    name: 'Whatsapp Food Ordering System',
    description: 'Developed WhatsApp Cloud API-based food ordering bot using Meta Developer platform',
    image: '/img3.jpg',
    tools: ['NextJs', 'Typescript', 'Meta Developer', 'Postman'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 4,
    name: 'This Portfolio',
    description: 'Crafted responsive portfolio website using Next.js 14, TypeScript, and Tailwind CSS, animations with FramerMotion and integrated EmailJs for form handling',
    image: '/img4.jpg',
    tools: ['Nextjs', 'TailwindCss', 'FramerMotion', 'EmailJs', 'Animation'],
    githubUrl: 'https://github.com/dhruvxsingh/new_portfolio',
    liveUrl: 'https://example.com',
  },
  {
    id: 5,
    name: 'IITJ Utility App',
    description: 'Engineered cross-platform application using Flutter and Integrated Firebase for backend services.',
    image: '/img5.jpg',
    tools: ['Flutter', 'Firebase'],
    githubUrl: 'https://github.com/dhruvxsingh/IITJ_Utility_App',
    liveUrl: 'https://example.com',
  },
  {
    id: 6,
    name: 'Facial Expression Recognition',
    description: 'Built a CNN-based facial expression model integrated with OpenCV with real-time webcam emotion detection',
    image: '/img6.jpg',
    tools: ['Python', 'TensorFlow', 'OpenCV', 'Kaggle'],
    githubUrl: 'https://github.com/dhruvxsingh/facial-expression-model',
    liveUrl: 'https://example.com',
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="flex-shrink-0 w-[calc(100vw-128px)] max-w-[450px] h-[500px] mr-8">
      <div className="h-full bg-gray-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-gray-600/50 group">
        {/* Image Section - 45% */}
        <div className="relative h-[45%] w-full overflow-hidden bg-gradient-to-br from-gray-700/50 to-gray-800/50">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-500 ease-out"
          />
        </div>

        {/* Content Section - 55% */}
        <div className="h-[55%] p-6 flex flex-col">
          {/* Title and Links Row */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-blue-gradient group-hover: transition-colors duration-300">
              {project.name}
            </h3>
            <div className="flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-silver-shiny transition-colors duration-200"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-silver-shiny transition-colors duration-200"
                aria-label="Live Demo"
              >
                <i className="fas fa-external-link-alt text-lg"></i>
              </a>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-xl" />
            </div>
          </div>

          {/* Tools */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-gray-700/50 text-silver-shiny rounded-full border border-gray-600/30"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-gradient text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Custom easing function for smooth scrolling
const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Calculate the total scroll distance needed
  const cardWidth = 450 + 32; // card width + margin
  const totalScrollDistance = cardWidth * (projects.length - 1); // -1 to keep last card in view
  
  // Transform vertical scroll to horizontal movement with custom easing
  const x = useTransform(
    scrollYProgress,
    (value) => {
      const easedValue = easeInOutQuad(value);
      return -totalScrollDistance * easedValue;
    }
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${100 + (projects.length * 40)}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Heading */}
        <div className="flex-shrink-0 pt-20 pb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-silver-shiny">
            Projects
          </h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex-1 relative">
          <motion.div
            style={{ x }}
            className="absolute top-0 left-0 h-full flex items-center pl-16 will-change-transform"
          >
            {/* Project Cards */}
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;