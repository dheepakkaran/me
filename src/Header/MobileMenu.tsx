import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NavItem } from './NavItem';

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, activeSection, onClose }: MobileMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 z-50 lg:hidden"
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
        
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="absolute right-0 top-0 bottom-0 w-64 bg-gray-900 p-6"
        >
          <div className="flex justify-end mb-8">
            <button onClick={onClose} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex flex-col gap-4">
            {['Home', 'Work', 'About', 'Contact'].map((label) => (
              <NavItem
                key={label}
                label={label}
                href={`#${label.toLowerCase()}`}
                isActive={activeSection === label.toLowerCase()}
                onClick={onClose}
              />
            ))}
          </nav>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);