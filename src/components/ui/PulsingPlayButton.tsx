"use client";

import { motion } from "framer-motion";

export const PulsingPlayButton = () => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute z-10"
    >
      <svg width="125" height="125" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.4" d="M62.5001 114.583C91.2649 114.583 114.583 91.2648 114.583 62.5C114.583 33.7351 91.2649 10.4166 62.5001 10.4166C33.7352 10.4166 10.4167 33.7351 10.4167 62.5C10.4167 91.2648 33.7352 114.583 62.5001 114.583Z" fill="#E7343A"/>
        <path d="M47.3958 62.5V54.7917C47.3958 44.8438 54.427 40.8333 63.0208 45.7813L69.6874 49.6354L76.3541 53.4896C84.9478 58.4375 84.9478 66.5625 76.3541 71.5104L69.6874 75.3646L63.0208 79.2188C54.427 84.1667 47.3958 80.1042 47.3958 70.2083V62.5Z" fill="#E7343A"/>
      </svg>
    </motion.div>
  );
};
