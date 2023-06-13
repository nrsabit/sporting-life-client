import React from "react";
import { motion } from "framer-motion";

const EnjoyLife = () => {
  return (
    <motion.div
      initial={{ y: 100, scale: 0.9 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className="bg-[url('https://i.ibb.co/7n0S5vV/camp-nou.webp')] max-w-7xl mx-auto p-8 mt-16   md:p-16 bg-[#213644] bg-blend-overlay rounded bg-center bg-fixed bg-cover md:flex gap-6"
    >
      <div className="md:w-1/3 flex justify-center items-center">
        <h2 className="text-4xl font-bold md:text-7xl text-[#c6ab7c]">
          Enjoy the life with <span className="text-white">Sports</span>
        </h2>
      </div>
      <div className="md:w-2/3 text-[#dfd8c9]">
        <h3 className="text-center font-bold text-2xl text-[#c6ab7c] mb-4">
          Benefits of Sports
        </h3>
        <p className="mb-2 font-semibold">
          Physical Fitness: Sports contribute to overall physical fitness and
          well-being. Regular participation in sports helps improve
          cardiovascular health, build strength and endurance, enhance
          flexibility, and maintain a healthy weight. It promotes a healthy
          lifestyle by encouraging regular exercise and physical activity.
        </p>
        <p className="mb-2 font-semibold">
          Mental Health: Sports have significant benefits for mental health.
          Physical activity during sports releases endorphins, which are natural
          mood boosters. It reduces symptoms of stress, anxiety, and depression,
          and improves overall mental well-being. Sports also help in developing
          discipline, focus, and mental resilience.
        </p>
        <p className="mb-2 font-semibold">
          Skill Development: Sports provide opportunities to develop and enhance
          various skills. Different sports require specific physical abilities,
          coordination, agility, and strategic thinking. Participating in sports
          helps develop motor skills, hand-eye coordination, teamwork,
          leadership, decision-making abilities, and problem-solving skills.
        </p>
      </div>
    </motion.div>
  );
};

export default EnjoyLife;
