import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { ProgressBar } from './ProgressBar';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ProgressBar />
      
      <motion.header
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Logo />

            <nav className="hidden lg:flex items-center gap-2">
              {['Home', 'Work', 'About', 'Contact'].map((label) => (
                <NavItem
                  key={label}
                  label={label}
                  href={`#${label.toLowerCase()}`}
                  isActive={activeSection === label.toLowerCase()}
                />
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="p-2 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isOpen}
        activeSection={activeSection}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};