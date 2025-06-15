'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locomotiveScroll: any;

    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        if (scrollRef.current) {
          locomotiveScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 0.8,
            smartphone: { smooth: true },
            tablet: { smooth: true }
          });
        }
      } catch (error) {
        console.error('Scroll init error:', error);
      }
    };

    initScroll();

    return () => {
      locomotiveScroll?.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      <main className="min-h-screen bg-black text-white">
        
        {/* Hero Section */}
        <motion.section
          data-scroll-section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-screen flex flex-col justify-center items-center p-8"
        >
          <motion.h1
            data-scroll
            data-scroll-speed="0.3"
            className="text-6xl md:text-8xl font-bold mb-4"
          >
            HI, I'M [YOUR NAME]
          </motion.h1>
          <motion.p
            data-scroll
            data-scroll-speed="0.2"
            className="text-xl md:text-2xl opacity-80 mb-8"
          >
            Creative Developer & Designer
          </motion.p>
          <motion.div
            data-scroll
            data-scroll-speed="0.1"
            className="h-px w-1/2 bg-white/20"
          />
        </motion.section>

        {/* Work Section */}
        <section 
          data-scroll-section 
          className="min-h-screen bg-zinc-900 p-8 flex flex-col justify-center"
        >
          <motion.h2
            data-scroll
            data-scroll-speed="0.5"
            className="text-4xl md:text-6xl font-bold mb-12"
          >
            Selected Work
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3].map((project) => (
              <motion.div
                key={project}
                data-scroll
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: project * 0.1 }}
                className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-2xl mb-2">Project {project}</h3>
                <p className="opacity-70">Description of your amazing project</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section
          data-scroll-section
          className="min-h-screen bg-black p-8 flex flex-col justify-center"
        >
          <motion.div
            data-scroll
            data-scroll-speed="0.4"
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">About Me</h2>
            <p className="text-lg opacity-80 leading-relaxed">
              Your professional introduction goes here. Highlight your skills, 
              experience, and what makes you unique as a designer/developer.
            </p>
          </motion.div>
        </section>

      </main>
    </div>
  );
}