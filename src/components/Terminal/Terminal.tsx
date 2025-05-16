import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, ChevronRight } from 'lucide-react';

interface Command {
  input: string;
  output: string;
}

interface TerminalProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const Terminal = ({ open, setOpen }: TerminalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === 'boolean' && typeof setOpen === 'function';
  const isOpen = isControlled ? open : internalOpen;
  const handleSetOpen = isControlled ? setOpen! : setInternalOpen;

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [inputHtml, setInputHtml] = useState<{ [key: number]: boolean }>({});
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const files = [
    'about.txt',
    'skills.txt',
    'contact.txt',
    'projects/',
    'socials.txt',
    'resume.txt',
  ];

  const projectsList = [
    {
      title: 'PLC-Based Water Cooling System for Power Generators',
      description: 'Control system prototype for efficient heat removal and power stability',
      tags: ['PLC', 'Ladder Logic', 'LOGO Soft'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Stock Revenue Insights',
      description: 'Stock and revenue analysis of Tesla and GameStop using Python',
      tags: ['Python', 'BeautifulSoup', 'yfinance'],
      github: 'https://github.com/dheepakkaran/dheepakkaran',
      demo: '#'
    },
    {
      title: 'Subscription Microservices',
      description: 'Subscription microservice with AWS and optimization',
      tags: ['Spring Boot', 'Java', 'AWS'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Demo Project',
      description: 'This is a sample project for demonstration purposes.',
      tags: ['Demo', 'Placeholder'],
      github: '#',
      demo: '#'
    }
  ];

  function slugify(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  useEffect(() => {
    if (isOpen && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim();
    let output = '';
    let isHtml = false;

    // Add to command history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);

    switch (command) {
      case 'help':
        output = `Available commands:\n  whoami            - About me, education, work\n  cat skills.txt    - My technical skills\n  cat socials.txt   - My social links\n  ls projects       - List projects\n  cat projects/<project>.txt - Show project details\n  cat resume.txt    - Download my resume\n  clear             - Clear the terminal\n  exit              - Close the terminal\n\nType 'allcmds' to see all available commands.`;
        break;
      case 'allcmds':
        output = `All Commands:\n  whoami            - About me, education, work\n  cat skills.txt    - My technical skills\n  cat socials.txt   - My social links\n  ls                - List files and folders\n  ls -l             - List files (detailed)\n  pwd               - Print working directory\n  date              - Show current date and time\n  echo <text>       - Print text\n  man <command>     - Show help for a command\n  uname -a          - Show system info\n  ls projects       - List projects\n  cat projects/<project>.txt - Show project details\n  cat resume.txt    - Download my resume\n  clear             - Clear the terminal\n  exit              - Close the terminal\n  fortune           - Get a random quote\n  cowsay <text>     - Cow says your text\n  motd              - Message of the day\n  uptime            - Show how long Dheepak's OS has been running\n  random            - Get a random number`;
        break;
      case 'fortune':
        const fortunes = [
          "Curiosity didn't kill me, it built me.",
          "Hunger beats talent when talent sleeps.",
          "A closed door only means there's another one waiting.",
          "Success is not born from comfort, but from chaos and courage.",
          "You're not where you come from, you're what you rise to become."
        ];
        output = fortunes[Math.floor(Math.random() * fortunes.length)];
        break;
      case 'motd':
        output = "Welcome to Dheepak's OS! Every setback is a setup for a comeback.";
        break;
      case 'uptime':
        output = `Uptime: ${Math.floor((Date.now() - window.performance.timing.navigationStart) / 1000)} seconds`;
        break;
      case 'random':
        output = `Random number: ${Math.floor(Math.random() * 100000)}`;
        break;
      case 'exit':
        handleSetOpen(false);
        return;
      case 'ls':
        output = files.join('  ');
        break;
      case 'ls -l':
        output = `-rw-r--r-- 1 dheepak users  1.2K about.txt\n-rw-r--r-- 1 dheepak users  2.1K skills.txt\n-rw-r--r-- 1 dheepak users  0.7K contact.txt\ndrwxr-xr-x 2 dheepak users  4.0K projects\n-rw-r--r-- 1 dheepak users  0.5K socials.txt\n-rw-r--r-- 1 dheepak users  0.9K resume.txt`;
        break;
      case 'pwd':
        output = '/home/dheepak';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'uname -a':
        output = 'Linux dheepak-os 6.4.0-portfolio #1 SMP PREEMPT x86_64 GNU/Linux';
        break;
      case 'whoami':
        output = `Name: Dheepak Karan\n\nEducation:\n- MS in Electrical and Computer Engineering, Northeastern University (Concentration: Computer Vision, Machine Learning, Algorithms)\n- BE in Electrical and Electronics Engineering\n\nWork Experience:\n- Java Developer at Guardian India (MNC)\n- AI/ML Projects: Policy recommendation chatbot, scalable microservices, real-time support systems\n\nCertifications:\n- IBM AI Engineering Professional Certificate\n- Other relevant certifications\n\nExpertise:\n- Machine Learning, Deep Learning, Computer Vision\n- Backend Development (Spring Boot, FastAPI, Flask)\n- Data Engineering, Cloud Integrations\n- Problem Solving, Coding Competitions\n`;
        break;
      case 'cat skills.txt':
        output = `Development & Programming Tools\n- VS Code\n- Jupyter Notebook\n- Google Colab\n- Git (GitHub, Bitbucket)\n- Anaconda (optional for managing Python environments)\n\nBackend & Frameworks\n- Spring Boot\n- Spring Security\n- Flask (for ML model deployment)\n- FastAPI (for scalable ML APIs)\n\nMachine Learning & Deep Learning Libraries\n- Scikit-learn\n- XGBoost / LightGBM\n- TensorFlow\n- Keras\n- PyTorch\n- Hugging Face Transformers\n\nComputer Vision & Image Processing\n- OpenCV\n- Pillow\n- YOLOv5 / YOLOv8 (for object detection)\n\nData Handling & Visualization\n- NumPy\n- Pandas\n- Matplotlib\n- Seaborn\n- Plotly\n\nNLP Tools\n- Spacy\n- NLTK\n- Hugging Face Datasets & Transformers\n\nML Experimentation & Tracking\n- MLflow\n- Weights & Biases (W&B)\n- DVC (Data Version Control)\n- TensorBoard\n\nData Annotation & Labeling\n- Label Studio\n- CVAT (Computer Vision Annotation Tool)\n\nCloud & Deployment\n- AWS S3 / SQS / SageMaker\n- Docker\n- Jenkins\n- Heroku (for quick app hosting)\n- Streamlit / Gradio (for ML model demos and dashboards)\n`;
        break;
      case 'cat contact.txt':
        output = "Email: dheepakkaranes@gmail.com";
        break;
      case 'cat socials.txt':
        output = `<a href="https://www.linkedin.com/in/dheepak-karan-es/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/dheepakkaran" target="_blank" rel="noopener noreferrer">GitHub</a> | <a href="https://x.com/dheepakkaran" target="_blank" rel="noopener noreferrer">X (Twitter)</a> | <a href="https://www.reddit.com/user/dheepakkaran" target="_blank" rel="noopener noreferrer">Reddit</a> | <a href="https://leetcode.com/u/___ka__ran___/" target="_blank" rel="noopener noreferrer">LeetCode</a> | <a href="https://www.hackerrank.com/dheepakkaranes" target="_blank" rel="noopener noreferrer">HackerRank</a> | <a href="https://medium.com/@dheepakkaranes" target="_blank" rel="noopener noreferrer">Medium</a> | <a href="https://bio.link/dheepakkaran" target="_blank" rel="noopener noreferrer">Other</a>`;
        isHtml = true;
        break;
      case 'cat resume.txt':
        output = `<a href="https://drive.google.com/file/d/1O1GRMiAm8GmQ1OU3_3X0DuD4H6fl3erp/view?usp=sharing" target="_blank" rel="noopener noreferrer">Click here to download my resume (Google Drive)</a>`;
        isHtml = true;
        break;
      case 'ls projects':
        output = projectsList.map((p, i) => `${i + 1}. ${slugify(p.title)}.txt`).join('  ');
        break;
      default:
        // cowsay <text>
        if (command.startsWith('cowsay ')) {
          const text = command.slice(7);
          output = `  ${'_'.repeat(text.length + 2)}\n< ${text} >\n  ${'-'.repeat(text.length + 2)}\n        \   ^__^\n         \  (oo)\_______\n            (__)\       )\/\n                ||----w |\n                ||     ||`;
        } else if (command.startsWith('echo ')) {
          output = command.slice(5);
        } else if (command.startsWith('man ')) {
          const manCmd = command.slice(4).trim();
          switch (manCmd) {
            case 'ls':
              output = 'ls - list directory contents';
              break;
            case 'ls -l':
              output = 'ls -l - list directory contents in long format';
              break;
            case 'cat':
              output = 'cat - concatenate and display file content';
              break;
            case 'whoami':
              output = 'whoami - print effective username';
              break;
            case 'pwd':
              output = 'pwd - print name of current/working directory';
              break;
            case 'date':
              output = 'date - print or set the system date and time';
              break;
            case 'uname':
              output = 'uname -a - print system information';
              break;
            case 'clear':
              output = 'clear - clear the terminal screen';
              break;
            case 'exit':
              output = 'exit - close the terminal';
              break;
            default:
              output = `No manual entry for ${manCmd}`;
          }
        } else {
          // cat projects/1.txt or cat projects/slug.txt
          const projectMatch = command.match(/^cat projects\/(.+)\.txt$/);
          if (projectMatch) {
            const key = projectMatch[1];
            let project = null;
            if (/^\d+$/.test(key)) {
              const idx = parseInt(key, 10) - 1;
              if (idx >= 0 && idx < projectsList.length) project = projectsList[idx];
            } else {
              project = projectsList.find(p => slugify(p.title) === key.replace(/\.txt$/, ''));
            }
            if (project) {
              output = `Title: ${project.title}\nDescription: ${project.description}\nTags: ${project.tags.join(', ')}`;
              if (project.github && project.github !== '#') {
                output += `\nGitHub: ${project.github}`;
              }
              if (project.demo && project.demo !== '#') {
                output += `\nDemo: ${project.demo}`;
              }
            } else {
              output = `Project not found. Use 'ls projects' to see available projects.`;
            }
          } else {
        output = `Command not found: ${command}. Type 'help' for available commands.`;
          }
        }
    }

    setHistory([...history, { input: cmd, output }]);
    if (isHtml) {
      setInputHtml((prev) => ({ ...prev, [history.length]: true }));
    }
    setInput('');
  };

  // Handle up/down arrow for command history
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      setHistoryIndex((prev) => {
        const idx = prev === null ? commandHistory.length - 1 : prev - 1;
        if (idx >= 0 && idx < commandHistory.length) {
          setInput(commandHistory[idx]);
          return idx;
        }
        return prev;
      });
    } else if (e.key === 'ArrowDown') {
      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const idx = prev + 1;
        if (idx < commandHistory.length) {
          setInput(commandHistory[idx]);
          return idx;
        } else {
          setInput('');
          return null;
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
    }
  };

  return (
    <>
      {!isControlled && (
      <motion.button
          onClick={() => handleSetOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Open Terminal"
      >
        <TerminalIcon className="w-5 h-5" />
      </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="w-full max-w-2xl bg-black/90 rounded-xl border border-white/10 shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-sm font-medium">Terminal</h3>
                <button
                  onClick={() => handleSetOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                ref={terminalRef}
                className="p-4 h-96 overflow-y-auto font-mono text-sm"
              >
                <div className="mb-4">
                  Welcome to me! Type 'help' for available commands.
                </div>

                {history.map((cmd, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <ChevronRight className="w-4 h-4" />
                      <span>{cmd.input}</span>
                    </div>
                    {inputHtml[i] ? (
                      <div className="mt-1 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: cmd.output }} />
                    ) : (
                    <div className="mt-1 whitespace-pre-wrap">{cmd.output}</div>
                    )}
                  </div>
                ))}

                <form onSubmit={handleSubmit} className="flex items-center gap-2 text-green-400">
                  <ChevronRight className="w-4 h-4" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                    autoFocus
                    onKeyDown={handleInputKeyDown}
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};