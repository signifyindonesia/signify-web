import { motion } from "framer-motion";

const MotionDiv = motion.create("div");

export default function PageWrapper({ children }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </MotionDiv>
  );
}
