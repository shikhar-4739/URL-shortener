import React from 'react';
import { motion } from 'framer-motion';

const paperVariants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: [0, 100, 200, 300, 400, 500],
    opacity: [1, 1, 1, 1, 1, 0],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};

const PaperShower = ({ count = 20 }) => {
  const papers = Array.from({ length: count });

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      {papers.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-4 h-4 bg-white rounded-full"
          style={{ left: `${Math.random() * 100}%` }}
          variants={paperVariants}
          initial="initial"
          animate="animate"
        />
      ))}
    </div>
  );
};

export default PaperShower;