// This is a placeholder file for the AnimationWrapper component.
// It will provide animated transitions for UI elements using Framer Motion.
import { motion } from 'framer-motion';

export default function AnimationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
