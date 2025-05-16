import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export const Logo = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center gap-2 text-xl font-bold"
  >
    <motion.div
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.3 }}
      className="p-2 rounded-xl bg-white/10"
    >
      <Code2 className="w-6 h-6" />
    </motion.div>
    <span>Portfolio</span>
  </motion.div>
);