// components/ProjectsSection.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
    name: 'AI Dashboard Analytics',
    description: 'Real-time analytics dashboard with ML-powered insights for business intelligence and data visualization.',
    image: '/img1.jpg',
    tools: ['React', 'TypeScript', 'Python', 'TensorFlow'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 2,
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    image: '/img2.jpg',
    tools: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    name: 'Social Media Scheduler',
    description: 'Automated social media management tool with AI-powered content suggestions and analytics.',
    image: '/img3.jpg',
    tools: ['Python', 'FastAPI', 'Redis', 'React'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 4,
    name: 'Real-Time Chat App',
    description: 'WebSocket-based chat application with end-to-end encryption and file sharing capabilities.',
    image: '/img4.jpg',
    tools: ['Socket.io', 'Express', 'MongoDB', 'Vue.js'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 5,
    name: 'Task Management System',
    description: 'Collaborative project management tool with Kanban boards, time tracking, and team analytics.',
    image: '/img5.jpg',
    tools: ['Django', 'React', 'GraphQL', 'Docker'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 6,
    name: 'Weather Prediction API',
    description: 'Machine learning-based weather prediction service with historical data analysis and API endpoints.',
    image: '/img6.jpg',
    tools: ['Python', 'TensorFlow', 'FastAPI', 'AWS'],
    githubUrl: 'https://github.com',
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
            <h3 className="text-xl font-bold text-silver-shiny group-hover:text-white transition-colors duration-300">
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
            </div>
          </div>

          {/* Tools */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/30"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Calculate the total scroll distance needed
  const cardWidth = 450 + 32; // card width + margin
  const totalScrollDistance = cardWidth * (projects.length - 1); // -1 to keep last card in view
  
  // Transform vertical scroll to horizontal movement with spring for smoothness
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -totalScrollDistance]
  );
  
  // Add spring physics for smooth scrolling
  const x = useSpring(xTransform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-900"
      style={{ height: `${100 + (projects.length * 40)}vh` }} // Slightly reduced height
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
            className="absolute top-0 left-0 h-full flex items-center pl-16"
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