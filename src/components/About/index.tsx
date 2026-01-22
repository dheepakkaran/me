import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Terminal as TerminalIcon } from 'lucide-react';
import { Terminal } from '../Terminal/Terminal';
import { useState } from 'react';
// import { SectionTitle } from '../common/SectionTitle';

export const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* <SectionTitle>About Me</SectionTitle> */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[99%] mx-auto"
        >
          <div className="book-story text-white text-base sm:text-lg leading-relaxed sm:leading-loose px-2 sm:px-0">
            <p className="text-center font-bold mb-4">The Boy Who Listened to the Sky</p>
            <p className="text-justify mb-4">
              In a quiet village where streetlights flickered and radios spoke louder than textbooks, a little boy sat beside an old wooden window, wondering how voices from the clouds could predict the rain. That boy was me. I didn't have gadgets or Google, but I had questions — big ones. "Why does the rain come when they say it will? How do they know?" That mystery became my first spark.
            </p>
            <p className="text-justify mb-4">
              I wasn't born with privilege. My slippers were torn, my shirt too big, and my dreams too wild for the people around me. But even then, I wrote those dreams in dusty notebooks and believed, "Success is not born from comfort, but from chaos and courage." I fought through doubts, rejections, and a world where English felt like a foreign land. From being told I wasn't good enough after scoring less in higher secondary to becoming one of the top performers in my college coding platform, I made one thing clear — I may bend, but I don't break.
            </p>
            <p className="text-justify mb-4">
              College wasn't just about classes. I built electric vehicles, solved coding challenges, danced on stage, played pivot for my football team, and clicked prize-winning photographs. Every moment shaped me — not just as an engineer, but as a human. Later, I worked in the IT world, where I created a personalized policy recommendation chatbot using AI. I wasn't just writing code; I was solving real problems.
            </p>
            <p className="text-justify mb-4">
              I took a bold risk by quitting my job to pursue a master's at IIT Madras, dedicating months of focused preparation—only to fall short of the GATE cutoff, with the next chance a year away. Rather than wait in limbo, I pivoted toward the USA. Exams had long been a personal struggle, and it took two determined attempts before I finally scored a 7 in IELTS. That breakthrough unlocked offers from leading universities in the US, Australia, and Ireland. I ultimately chose Northeastern University for my MS in Electrical and Computer Engineering, concentrating in Computer Vision, Machine Learning, and Algorithms—not just for its prestige, but because it embodies resilience, growth, and the power of transforming setbacks into milestones.
            </p>
            <p className="text-justify mb-4">
              I carry with me my village, my struggles, my silent tears, and my loud hopes. Because in the end, "You're not where you come from, you're what you rise to become."
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex flex-wrap items-center justify-center gap-2 text-center mb-2">
              <span className="text-white text-sm font-semibold">
                If scripting can be easy for you, you can know a lot about me -
              </span>
              <button
                onClick={() => setShowTerminal(true)}
                className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded bg-white/10 text-white hover:bg-white/20 transition-colors shadow-sm border border-white/10"
              >
                <TerminalIcon className="w-5 h-5" /> Dheepak's OS
              </button>
            </div>
            {showTerminal && <Terminal open={showTerminal} setOpen={setShowTerminal} />}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
