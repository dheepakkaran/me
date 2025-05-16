import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
  >
    <Sun className="w-5 h-5 hidden dark:block" />
    <Moon className="w-5 h-5 block dark:hidden" />
  </motion.button>
);