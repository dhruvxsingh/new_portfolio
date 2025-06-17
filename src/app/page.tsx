'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
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
      {/* Animated Navbar */}
      <motion.nav 
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="fixed w-full z-50 bg-black/80 backdrop-blur-sm p-4 flex justify-center gap-8"
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
          <Droplets count={20} /> {/* Only added here */}
          
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl text-silver-shiny font-bold mb-4 relative z-10"
          >
            HI, I'M DHRUV
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-px bg-white/20 mb-8 relative z-10"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl mb-8 relative z-10"
          >
            Creative Developer & Designer
          </motion.p>
        </motion.section>

        {/* Work Section */}
        <section 
          id="work"
          className="min-h-screen bg-zinc-900 p-8 flex flex-col justify-center"
        >
          <motion.h2
            variants={sectionTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-12"
          >
            Selected Work
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3].map((project) => (
              <motion.div
                key={project}
                variants={projectCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: project * 0.1 }}
                className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl mb-2">Project {project}</h3>
                <p className="opacity-70">Description of your amazing project</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
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
              className="text-4xl md:text-6xl font-bold mb-8"
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              transition={{ type: 'spring' }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-lg opacity-80 leading-relaxed"
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