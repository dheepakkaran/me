import { motion } from 'framer-motion';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  delay: number;
}

export const NavLink = ({ href, children, delay }: NavLinkProps) => (
  <motion.a
    href={href}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="relative text-white hover:text-gray-300 transition-colors group"
  >
    {children}
    <motion.span 
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
      whileHover={{ width: '100%' }}
    />
  </motion.a>
);