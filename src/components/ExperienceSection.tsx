import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    company: "Propzing pvt ltd",
    position: "Software Developer Intern",
    description:
      "Integrated Supabase backend services with a React/Next.js frontend to manage real-time property listings.\nConstructed Flask REST APIs enabling property filtering by location, price, and amenities, leading to a 35% increase in user engagement.\nCollaborated with backend teams to debug and resolve API integration issues, reducing frontend error rates by 40%.",
    links: [
      { name: "GitHub", url: "https://github.com/project1", icon: "fab fa-github" },
      { name: "Website", url: "https://techcorp.com", icon: "fas fa-external-link-alt" },
    ],
  },
  {
    company: "Coyesco",
    position: "Software Developer Intern",
    description:
      "Built and deployed a WhatsApp-based food ordering bot to automate restaurant order flows. \nUtilized Meta’s WhatsApp Cloud API and Next.js to create an interactive chat-bot. \nDesigned and connected a webhook server to receive real-time messages. \nTested integrations using Postman collections and local tunneling.",
    links: [
      { name: "GitHub", url: "https://github.com/project2", icon: "fab fa-github" },
      { name: "Website", url: "https://startupxyz.com", icon: "fas fa-external-link-alt" },
    ],
  },
  {
    company: "Coming Soon",
    position: "Coming Soon",
    description:
      "Coming Soon",
    links: [
      { name: "GitHub", url: "https://github.com/project3", icon: "fab fa-github" },
      { name: "Website", url: "https://innovatelab.com", icon: "fas fa-external-link-alt" },
    ],
  },
];

const ExperienceSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const containerY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["0vh", "0vh", "0vh", "-100vh"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const cardAnimations = experiences.map((_, i) => ({
    y: useTransform(scrollYProgress, [0.3 + i * 0.15, 0.45 + i * 0.15], [0, -400]),
    opacity: useTransform(scrollYProgress, [0.3 + i * 0.15, 0.45 + i * 0.15], [1, 0]),
  }));

  return (
    <div ref={containerRef} className="h-[500vh] relative">
      <motion.div
        style={{ y: containerY }}
        className="sticky top-0 left-0 w-full h-screen z-10"
      >
        <div className="flex h-full">
          {/* Left: Title */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className="w-1/2 flex items-center justify-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-silver-shiny tracking-tight">
              Experience
            </h1>
          </motion.div>

          {/* Right: Cards */}
          <div className="w-1/2 flex items-center justify-center relative">
            <div className="relative w-full max-w-[400px] h-[32rem]">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  style={{
                    y: cardAnimations[index].y,
                    opacity: cardAnimations[index].opacity,
                    left: `${index * 50}px`,
                    zIndex: experiences.length - index,
                  }}
                  className="absolute w-full h-full bg-gray-700/40 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-200"
                >
                  {/* Icons */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="flex space-x-3">
                      {exp.links.map((item) => (
                        <motion.a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-black hover:text-blue-700 transition-all"
                          title={item.name}
                        >
                          <i className={`fa ${item.icon} text-silver-shiny`}></i>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-16 h-full flex flex-col">
                    <h3 className="text-silver-shiny  text-3xl font-bold mb-2">
                      {exp.company}
                    </h3>
                    <h4 className="text-lg font-semibold text-blue-gradient mb-4">
                      {exp.position}
                    </h4>
                    <p className="text-gray-gradient leading-relaxed flex-grow">
                      {exp.description}
                    </p>
                  </div>

                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-xl" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceSection;
