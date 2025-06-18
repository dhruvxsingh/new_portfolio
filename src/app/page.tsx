'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Outlines } from '@react-three/drei'
import { Basketball } from '@/components/animations/basketball'
import { Laptop } from '@/components/animations/coder'
const Droplets = dynamic(
  () => import('@/components/animations/Droplets'),
  { ssr: false }
);

// Animation variants
const navItem = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

const sectionTitle = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const projectCard = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export default function Portfolio() {
  return (
    <div className="scroll-container">
      <motion.nav 
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="fixed w-full z-50 bg-black/80 text-silver-shiny backdrop-blur-sm p-4 flex justify-center gap-8"
      >
        {['home', 'work', 'about'].map((item) => (
          <motion.a
            key={item}
            variants={navItem}
            href={`#${item}`}
            className="hover:text-gray-300 transition-colors capitalize"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
      </motion.nav>

      <main className="min-h-screen bg-black pt-16">
        {/* Hero Section with Droplets */}
        <motion.section
          id="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden"
        >
          <Droplets count={20} />
          
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl text-silver-shiny font-bold mb-2 relative z-10"
          >
            HI, I'M DHRUV
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
            className="text-xl text-silver-shiny md:text-2xl mb-8 relative z-10"
          >
            Tech & Sports Enthusiast
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center gap-20 mt-16 relative z-10 text-3xl"
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

        <section id="about" className="min-h-screen bg-black p-8 flex flex-col justify-center">
      <motion.h2 className="text-6xl font-bold text-center text-white mb-20">
        About Me
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center h-[60vh]">
        {/* Basketball */}
        <motion.div className="h-full flex flex-col items-center">
          <div className="w-full h-[300px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Basketball scale={0.8} /> {/* Adjust scale as needed */}
              <OrbitControls enableZoom={false} />
              <Outlines 
                visible
                thickness={0.01}
                color="white"
              />
            </Canvas>
          </div>
          <p className="text-white text-xl mt-4">Baller at Day</p>
        </motion.div>

        {/* Center Text */}
        <div className="text-center p-8">
          <p className="text-white/80 text-lg leading-relaxed">
            Your about text here...
          </p>
        </div>

        {/* Laptop */}
        <motion.div className="h-full flex flex-col items-center">
          <div className="w-full h-[300px]">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Laptop scale={1.2} rotation-y={Math.PI / 8} />
              <OrbitControls enableZoom={false} />
              <Outlines 
                visible
                thickness={0.01}
                color="white"
              />
            </Canvas>
          </div>
          <p className="text-white text-xl mt-4">Coder at Night</p>
        </motion.div>
      </div>
    </section>

        <section
          id="about"
          className="min-h-screen bg-black p-8 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              className="text-4xl text-silver-shiny md:text-6xl font-bold mb-8"
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              transition={{ type: 'spring' }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-lg text-silver-shiny opacity-80 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              transition={{ delay: 0.3 }}
            >
              Your professional introduction goes here. Highlight your skills, 
              experience, and what makes you unique as a designer/developer.
            </motion.p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}