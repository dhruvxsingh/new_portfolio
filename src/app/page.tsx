'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectSection';
import Contact from '@/components/Contact'
import { OrbitControls } from '@react-three/drei'
import { useState, useEffect } from 'react';
import { Basketball } from '@/components/animations/basketball'
import { Laptop } from '@/components/animations/coder'
import LoadingWrapper from '@/components/LoadingWrapper';
const Droplets = dynamic(
  () => import('@/components/animations/Droplets'),
  { ssr: false }
);

// Animation variants
const navItem = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};


const projectCard = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <LoadingWrapper>
        {() => (

      <div className="scroll-container">
        <motion.nav 
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="fixed w-full z-50 bg-black/80 text-silver-shiny backdrop-blur-sm p-4 flex justify-center gap-2 sm:gap-4 md:gap-8 text-sm sm:text-base"
        >
          <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: isScrolled ? 1 : 0,
      y: isScrolled ? 0 : 20
    }}
    transition={{ duration: 0.3 }}
    className="absolute left-4 text-2xl font-bold text-silver-shiny hidden sm:block"
  >
    DHRUV
  </motion.div>
          {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'tech-stack', label: 'Tech Stack' },
              { id: 'experience', label: 'Experience' },
              { id: 'project', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <motion.a
                key={item.id}
                variants={navItem}
                href={`#${item.id}`}
                className="hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
        </motion.nav>

        <main className="min-h-screen bg-black pt-16 ">
          {/* Hero Section with Droplets */}
          <motion.section
            id="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-screen flex flex-col justify-center items-center px-2 py-8 sm:px-4 sm:py-12 md:px-8 relative overflow-hidden"
          >
            <Droplets count={20} />
            
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-8xl text-silver-shiny font-bold mb-2 relative z-10 text-center"
            >
              HI, I&apos;M DHRUV
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-px bg-white/20 mb-1 relative z-10"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.7 }}
              className="text-lg sm:text-xl md:text-2xl text-silver-shiny mb-8 relative z-10"
            >
              Tech & Sports Enthusiast
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex justify-center gap-8 sm:gap-12 md:gap-20 mt-8 sm:mt-12 md:mt-16 relative z-10 text-2xl sm:text-3xl"
            >
              {[
                { name: 'GitHub', url: 'https://github.com/dhruvxsingh/', icon: 'fab fa-github' },
                { name: 'LeetCode', url: 'https://leetcode.com/u/dhruvxsingh', icon: 'fas fa-code' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dhruv-kumar-singh-031363289/', icon: 'fab fa-linkedin-in' },
                { name: 'Gmail', url: 'mailto:dhruv.competent@gmail.com', icon: 'fas fa-envelope' },
                { name: 'GFG', url: 'https://www.geeksforgeeks.org/user/dhruvxsingh/', icon: 'fas fa-laptop-code' }
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-silver-shiny hover:text-white transition-all"
                  title={item.name}
                >
                  <i className={`fa ${item.icon}`}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.section>

          <section id="about" className="min-h-screen bg-black p-4 sm:p-6 md:p-8 flex flex-col ">
        <motion.h2 
                className="text-4xl text-silver-shiny md:text-6xl font-bold mb-14 text-center"
                initial={{ x: -100 }}
                whileInView={{ x: 0 }}
                transition={{ type: 'spring' }}
              >
                About Me
              </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 items-start"> {/* Changed to items-start */}
    {/* Basketball - First Column */}
    <motion.div className="flex flex-col items-center">
      <p className="text-silver-shiny text-base sm:text-lg md:text-xl mt-4">Rotate(3D)</p>
      <div className="w-full h-[200px] sm:h-[250px] md:h-[300px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Environment preset="studio" background blur={0.2} />
          <Basketball scale={0.8} rotation={[0, Math.PI/1.6, 0]} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <p className="text-silver-shiny text-base sm:text-lg md:text-xl mt-4">Baller at Day</p>
    </motion.div>

    {/* Center Text - Second Column */}
    <div className="flex flex-col justify-center h-auto md:h-[300px]"> {/* Added fixed height */}
      <motion.p className="text-sm sm:text-base md:text-lg bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                transition={{ delay: 0.3 }}
                >
        I&apos;m a B.Tech graduate from IIT and national-level basketball player who brings the same precision and competitive drive to software development. My expertise spans full-stack development and machine learning, creating solutions that perform under pressure. From architecting scalable web applications to training intelligent models, I combine technical excellence with the strategic thinking and teamwork learned on the basketball court. I code in JavaScript, Python, React, and Node.js, always delivering solutions that are both functional and exceptional.
      </motion.p>
    </div>

    {/* Laptop - Third Column */}
    <motion.div className="flex flex-col items-center">
      <p className="text-silver-shiny text-base sm:text-lg md:text-xl mt-4">Rotate(3D)</p>
      <div className="w-full h-[200px] sm:h-[250px] md:h-[300px]">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Environment preset="studio" background blur={0.2} />
          <Laptop scale={0.8} rotation={[0.5, -0.5, 0]} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <p className="text-silver-shiny text-base sm:text-lg md:text-xl mt-4">Coder at Night</p>
    </motion.div>
  </div>
      </section>

          {/* Tech Stack Section */}
  <section id="tech-stack" className="min-h-screen bg-black p-4 sm:p-6 md:p-8 flex flex-col">
    <motion.h2 
      className="text-4xl text-silver-shiny md:text-6xl font-bold mb-14 text-center"
      initial={{ x: -100 }}
      whileInView={{ x: 0 }}
      transition={{ type: 'spring' }}
    >
      Tech Stack
    </motion.h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
      {[
        { name: 'Next.js', icon: 'fab fa-react' },
        { name: 'TypeScript', icon: 'fas fa-code' },
        { name: 'Three.js', icon: 'fas fa-cube' },
        { name: 'Flutter', icon: 'fab fa-mobile' },
        { name: 'Firebase', icon: 'fas fa-fire' },
        { name: 'Supabase', icon: 'fas fa-database' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'C++', icon: 'fas fa-file-code' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'HTML', icon: 'fab fa-html5' },
        { name: 'CSS', icon: 'fab fa-css3-alt' },
        { name: 'Tailwind', icon: 'fas fa-paint-brush' },
        { name: 'MySQL', icon: 'fas fa-database' },
        { name: 'PostgreSQL', icon: 'fas fa-database' },
        { name: 'Postman', icon: 'fas fa-cloud' },
        { name: 'C', icon: 'fas fa-file-code' },
        { name: 'Node.js', icon: 'fab fa-node-js' },
        { name: 'FastAPI', icon: 'fas fa-bolt' },
        { name: 'Flask', icon: 'fas fa-flask' },
        { name: 'RESTful API', icon: 'fas fa-network-wired' },
        { name: 'React', icon: 'fab fa-react' },
      ].map((tech, index) => (
        <motion.div
          key={tech.name}
          variants={projectCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="bg-gray-900/50 hover:bg-gray-800/80 border border-gray-700 rounded-lg p-4 aspect-square flex flex-col items-center justify-center gap-2 transition-all"
          whileHover={{ y: -5, scale: 1.05 }}
        >
          <i className={`${tech.icon} text-silver-shiny text-2xl sm:text-3xl md:text-4xl`}></i>
          <span className="text-silver-shiny text-xs sm:text-sm md:text-base text-center">{tech.name}</span>
        </motion.div>
      ))}
    </div>
  </section>
  <ExperienceSection />
  <ProjectsSection/>
  <Contact/>
        </main>
      </div>
      )}
    </LoadingWrapper>
  );
}