import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ExperienceSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create freeze effect - container stays completely frozen during 20-80% scroll
  const containerY = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    ["0vh", "0vh", "0vh", "-100vh"]
  );

  // Experience title opacity
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Card animations - each card moves up and disappears during frozen period
  const card1Y = useTransform(scrollYProgress, [0.3, 0.45], [0, -400]);
  const card1Opacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);
  
  const card2Y = useTransform(scrollYProgress, [0.45, 0.6], [0, -400]);
  const card2Opacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);
  
  const card3Y = useTransform(scrollYProgress, [0.6, 0.75], [0, -400]);
  const card3Opacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);

  const experienceData = [
    {
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      description: "Led development of scalable web applications using React and Node.js. Implemented microservices architecture and improved system performance by 40%.",
      github: "https://github.com/project1",
      external: "https://techcorp.com"
    },
    {
      company: "StartupXYZ",
      position: "Frontend Engineer",
      description: "Built responsive user interfaces and mobile applications. Collaborated with design team to create intuitive user experiences for 100k+ users.",
      github: "https://github.com/project2",
      external: "https://startupxyz.com"
    },
    {
      company: "InnovateLab",
      position: "Software Engineer",
      description: "Developed machine learning models and data visualization tools. Worked on AI-powered features that increased user engagement by 60%.",
      github: "https://github.com/project3",
      external: "https://innovatelab.com"
    }
  ];

  const cardAnimations = [
    { y: card1Y, opacity: card1Opacity },
    { y: card2Y, opacity: card2Opacity },
    { y: card3Y, opacity: card3Opacity }
  ];

  return (
    <>
      {/* FontAwesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      
      {/* Spacer to create scroll distance */}
      <div className="h-screen bg-gray-100"></div>
      
      {/* Main Experience Section */}
      <div ref={containerRef} className="h-[500vh] relative">
        <motion.div 
          style={{ y: containerY }}
          className="sticky top-0 left-0 w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden z-10"
        >
          <div className="flex h-full">
            {/* Left Half - Experience Title */}
            <motion.div 
              style={{ opacity: titleOpacity }}
              className="w-1/2 flex items-center justify-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
                Experience
              </h1>
            </motion.div>

            {/* Right Half - Card Stack */}
            <div className="w-1/2 flex items-center justify-center relative">
              <div className="relative w-80 h-96">
                {experienceData.map((exp, index) => (
                  <motion.div
                    key={index}
                    style={{
                      y: cardAnimations[index].y,
                      opacity: cardAnimations[index].opacity,
                      left: `${index * 50}px`,
                      zIndex: experienceData.length - index,
                    }}
                    className="absolute w-full h-full bg-white rounded-xl shadow-2xl border border-gray-200"
                  >
                    {/* Card Header with Icons */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <div className="flex space-x-3">
                        <a 
                          href={exp.github}
                          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-github text-xl"></i>
                        </a>
                        <a 
                          href={exp.external}
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-external-link-alt text-xl"></i>
                        </a>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 pt-16 h-full flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {exp.company}
                      </h3>
                      <h4 className="text-lg font-semibold text-blue-600 mb-4">
                        {exp.position}
                      </h4>
                      <p className="text-gray-700 leading-relaxed flex-grow">
                        {exp.description}
                      </p>
                    </div>

                    {/* Card Decorative Elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-xl"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      {/* Spacer after section */}
      <div className="h-screen bg-gray-100"></div>
    </>
  );
};

export default ExperienceSection;