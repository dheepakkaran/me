import { motion } from 'framer-motion';

interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

export const NavItem = ({ label, href, isActive, onClick }: NavItemProps) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileHover={{ y: -2 }}
    className="relative px-4 py-2"
  >
    <span className={`relative z-10 ${isActive ? 'text-black' : 'text-white'}`}>
      {label}
    </span>
    
    {isActive && (
      <motion.div
        layoutId="activeSection"
        className="absolute inset-0 bg-white rounded-full"
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
      />
    )}
  </motion.a>
);