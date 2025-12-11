import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => [
        '📋 AVAILABLE COMMANDS',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '📁 File System:',
        '  ls            - List directory contents',
        '  cat <file>    - Display file contents',
        '  cd <dir>      - Change directory',
        '  pwd           - Show current directory',
        '',
        '👤 Personal Info:',
        '  whoami        - Display user information',
        '  skills        - Display technical skills',
        '  projects      - Show project list',
        '  experience    - Display work experience',
        '  contact       - Show contact information',
        '',
        '🖥️  System:',
        '  neofetch      - Display system information',
        '  banner        - Show welcome banner',
        '  date          - Current date and time',
        '  uptime        - System uptime',
        '  weather       - Weather in Hyderabad',
        '',
        '🎮 Fun:',
        '  fortune       - Random inspirational quote',
        '  matrix        - Enter the matrix...',
        '',
        '🔧 Utilities:',
        '  clear         - Clear terminal',
        '  help          - Show this help message',
        '  exit          - Close terminal',
        '',
        '💡 Tip: Use ↑/↓ arrow keys for command history'
      ]
    },
    whoami: {
      description: 'Display user information',
      execute: () => [
        'Cherukuri Gaurav Sushant',
        'Software Engineer | Data Scientist | AI/ML Specialist',
        'B.Tech in Data Science & AI | Deep Learning Certified'
      ]
    },
    ls: {
      description: 'List directory contents',
      execute: () => {
        if (currentPath === '~') {
          return [
            'total 8',
            'drwxr-xr-x  2 gaurav gaurav 4096 Dec 11 2024 projects/',
            'drwxr-xr-x  2 gaurav gaurav 4096 Dec 11 2024 documents/',
            '-rw-r--r--  1 gaurav gaurav  256 Dec 11 2024 skills.txt',
            '-rw-r--r--  1 gaurav gaurav  512 Dec 11 2024 experience.txt',
            '-rw-r--r--  1 gaurav gaurav  128 Dec 11 2024 contact.txt',
            '-rw-r--r--  1 gaurav gaurav  64  Dec 11 2024 about.txt'
          ];
        } else if (currentPath === '~/projects') {
          return [
            'total 16',
            'drwxr-xr-x  2 gaurav gaurav 4096 Dec 11 2024 QuickLeave/',
            'drwxr-xr-x  2 gaurav gaurav 4096 Dec 11 2024 Docuspace/',
            'drwxr-xr-x  2 gaurav gaurav 4096 Dec 11 2024 IDS-System/',
            'drwxr-xr-x  2 gaurav gaurav 4096 Dec 11 2024 Seminar-Planner/',
            'drwxr-xr-x  2 gaurav gaurav 4096 Dec 11 2024 Notty-Notes/'
          ];
        }
        return ['Directory not found'];
      }
    },
    pwd: {
      description: 'Show current directory',
      execute: () => [`/home/gaurav${currentPath.replace('~', '')}`]
    },
    cd: {
      description: 'Change directory',
      execute: (args) => {
        if (!args[0] || args[0] === '~') {
          setCurrentPath('~');
          return ['Changed to home directory'];
        } else if (args[0] === 'projects') {
          setCurrentPath('~/projects');
          return ['Changed to projects directory'];
        } else if (args[0] === '..') {
          if (currentPath === '~/projects') {
            setCurrentPath('~');
            return ['Changed to parent directory'];
          }
          return ['Already at root directory'];
        }
        return [`cd: ${args[0]}: No such file or directory`];
      }
    },
    cat: {
      description: 'Display file contents',
      execute: (args) => {
        const file = args[0];
        const files = {
          'skills.txt': [
            '# Technical Skills',
            '',
            '## Programming Languages:',
            '• Java, Python, JavaScript',
            '• HTML, CSS, SQL, Solidity',
            '',
            '## Frameworks & Libraries:',
            '• React.js, Next.js, Angular',
            '• Node.js, Express.js, Django, Flask',
            '',
            '## Databases & Cloud:',
            '• MySQL, MongoDB, MSSQL',
            '• Azure, AWS, Docker, Kubernetes',
            '',
            '## AI/ML Technologies:',
            '• TensorFlow, PyTorch, Scikit-learn',
            '• Deep Learning, Machine Learning',
            '• Apache Kafka, PySpark, Apache Flink'
          ],
          'experience.txt': [
            '# Work Experience',
            '',
            '## Trainee Intern @ Xyenta (Aug 2024 - Present)',
            '• Managed MSSQL Servers and performed SCD Transformations',
            '• Designed & implemented ETL Processes',
            '• Utilized Apache Flink for parallel data processing',
            '',
            '## Research Intern @ Precog@IIITD (Feb 2024 - Jul 2024)',
            '• Led NLP and AI Ethics research projects',
            '• Created analytical dashboard for Indian Elections',
            '• Conducted research on crowdfunding success factors',
            '',
            '## Infosec Intern @ Newmark (Jun 2023 - Aug 2023)',
            '• Automated Sentinel using Playbooks',
            '• Implemented SIEM automation for threat detection',
            '• Developed real-time alerting systems'
          ],
          'contact.txt': [
            '# Contact Information',
            '',
            'Email: gauravsushant267@gmail.com',
            'Phone: +91-7337225784',
            'LinkedIn: linkedin.com/in/gaurav-sushant-cherukuri',
            'GitHub: github.com/CGS267',
            'Location: Hyderabad, India'
          ],
          'about.txt': [
            '# About Me',
            '',
            'Innovative Software Engineer with expertise in SDLC.',
            'Specialized in Full Stack Development, AI/ML, and Cloud Solutions.',
            'Passionate about solving complex problems with technology.'
          ]
        };
        
        if (!file) {
          return ['cat: missing file operand'];
        }
        
        return files[file] || [`cat: ${file}: No such file or directory`];
      }
    },
    skills: {
      description: 'Display technical skills',
      execute: () => [
        '╔══════════════════════════════════════╗',
        '║            SKILL MATRIX              ║',
        '╠══════════════════════════════════════╣',
        '║ Python         ████████████ 95%     ║',
        '║ JavaScript     ███████████  88%     ║',
        '║ React.js       ████████████ 92%     ║',
        '║ Node.js        ██████████   85%     ║',
        '║ Machine Learning ████████████ 90%   ║',
        '║ Deep Learning  ███████████  88%     ║',
        '║ Azure/AWS      ██████████   82%     ║',
        '║ Docker         ████████     80%     ║',
        '╚══════════════════════════════════════╝'
      ]
    },
    projects: {
      description: 'Show project list',
      execute: () => [
        '📁 PROJECT PORTFOLIO',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '🚀 QuickLeave (Oct 2024 - Nov 2024)',
        '   ├─ Next.js, TypeScript, Firebase',
        '   └─ Leave management system',
        '',
        '🤖 Docuspace (Aug 2024 - Sep 2024)',
        '   ├─ Next.js, Flask, Ollama, LLM',
        '   └─ AI-powered document converter',
        '',
        '🛡️  IDS System (Jan 2024 - Feb 2024)',
        '   ├─ Python, PyTorch, Deep Learning',
        '   └─ Dual CNN intrusion detection',
        '',
        '📝 Notty Notes (May 2024 - Jun 2024)',
        '   ├─ FastAPI, SQLite, React',
        '   └─ Minimal note-taking app',
        '',
        '🎓 Seminar Planner (Jan 2023 - Mar 2024)',
        '   ├─ MERN Stack',
        '   └─ Faculty scheduling system'
      ]
    },
    experience: {
      description: 'Display work experience',
      execute: () => [
        '💼 WORK EXPERIENCE TIMELINE',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '🏢 Xyenta - Trainee Intern',
        '   📅 Aug 2024 - Present | 📍 Hyderabad',
        '   • MSSQL Server management & ETL processes',
        '   • Azure Data Factory pipeline development',
        '   • Apache Flink data processing',
        '',
        '🔬 Precog@IIITD - Research Intern',
        '   📅 Feb 2024 - Jul 2024 | 📍 Hyderabad',
        '   • NLP & AI Ethics research',
        '   • Election analytics dashboard',
        '   • Crowdfunding success analysis',
        '',
        '🔒 Newmark - Infosec Intern',
        '   📅 Jun 2023 - Aug 2023 | 📍 Hyderabad',
        '   • Security automation with Sentinel',
        '   • SIEM implementation & threat hunting',
        '   • Real-time incident response systems'
      ]
    },
    contact: {
      description: 'Show contact information',
      execute: () => [
        '📞 CONTACT INFORMATION',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '📧 Email:    gauravsushant267@gmail.com',
        '📱 Phone:    +91-7337225784',
        '💼 LinkedIn: linkedin.com/in/gaurav-sushant-cherukuri',
        '🐙 GitHub:   github.com/CGS267',
        '📍 Location: Hyderabad, India',
        '',
        '💡 Feel free to reach out for collaborations!'
      ]
    },
    neofetch: {
      description: 'Display system information',
      execute: () => [
        '                   -`                    gaurav@portfolio',
        '                  .o+`                   ─────────────────',
        '                 `ooo/                   OS: Gaurav OS 2024.12',
        '                `+oooo:                  Host: Portfolio System',
        '               `+oooooo:                 Kernel: Brain v25.0',
        '               -+oooooo+:                Uptime: 25 years',
        '             `/:-:++oooo+:               Packages: ∞ skills',
        '            `/++++/+++++++:              Shell: zsh 5.9',
        '           `/++++++++++++++:             Resolution: 1920x1080',
        '          `/+++ooooooooooooo/`           DE: Custom Desktop',
        '         ./ooosssso++osssssso+`          WM: WindowManager',
        '        .oossssso-````/ossssss+`         Theme: Dark Professional',
        '       -osssssso.      :ssssssso.        Icons: Lucide React',
        '      :osssssss/        osssso+++.       Terminal: Custom Terminal',
        '     /ossssssss/        +ssssooo/-       CPU: Intel i7 (Simulated)',
        '   `/ossssso+/:-        -:/+osssso+-     GPU: Integrated Graphics',
        '  `+sso+:-`                 `.-/+oso:    Memory: 16GB (Available)',
        ' `++:.                           `-/+/   ',
        ' .`                                 `/   '
      ]
    },
    banner: {
      description: 'Display welcome banner',
      execute: () => [
        '╔══════════════════════════════════════════════════════════════╗',
        '║   ____                              ____  _   _              ║',
        '║  / ___| __ _ _   _ _ __ __ ___   __ / ___|| | | |             ║',
        '║ | |  _ / _` | | | | \'__/ _` \\ \\ / / \\___ \\| | | |             ║',
        '║ | |_| | (_| | |_| | | | (_| |\\ V /   ___) | |_| |             ║',
        '║  \\____|\\__,_|\\__,_|_|  \\__,_| \\_/   |____/ \\___/              ║',
        '║                                                              ║',
        '║              Software Engineer & Data Scientist              ║',
        '║                    Portfolio Terminal v2.0                  ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
        '🚀 Welcome to my interactive portfolio terminal!',
        '💡 Type "help" to see available commands',
        '🎯 Explore my skills, projects, and experience',
        ''
      ]
    },
    fortune: {
      description: 'Display a random quote',
      execute: () => {
        const quotes = [
          '"The best way to predict the future is to invent it." - Alan Kay',
          '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
          '"First, solve the problem. Then, write the code." - John Johnson',
          '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
          '"In order to be irreplaceable, one must always be different." - Coco Chanel',
          '"The only way to do great work is to love what you do." - Steve Jobs',
          '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
          '"Stay hungry, stay foolish." - Steve Jobs'
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return ['', randomQuote, ''];
      }
    },
    date: {
      description: 'Display current date and time',
      execute: () => [new Date().toString()]
    },
    uptime: {
      description: 'Show system uptime',
      execute: () => ['System uptime: 25 years, 0 days, 24 hours, 7 minutes']
    },
    weather: {
      description: 'Check weather in Hyderabad',
      execute: () => [
        '🌤️  Weather in Hyderabad, India',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🌡️  Temperature: 28°C',
        '💧 Humidity: 65%',
        '💨 Wind: 12 km/h',
        '☁️  Conditions: Partly Cloudy',
        '',
        'Perfect weather for coding! ☕'
      ]
    },
    matrix: {
      description: 'Enter the matrix...',
      execute: () => {
        // This will trigger the matrix effect
        return [
          '01001000 01100101 01101100 01101100 01101111',
          '01010111 01101111 01110010 01101100 01100100',
          '',
          '🔴 You take the red pill...',
          '💊 The story ends, you wake up in your bed',
          '   and believe whatever you want to believe.',
          '',
          '🔵 You take the blue pill...',
          '💊 The story continues, you stay in Wonderland',
          '   and I show you how deep the rabbit hole goes.',
          '',
          '🐰 Welcome to the real world, Neo.',
          '   There is no spoon. 🥄',
          '',
          '> Connection to the Matrix established...',
          '> Loading portfolio data...',
          '> Reality.exe has stopped working.',
          ''
        ];
      }
    },
    sudo: {
      description: 'Superuser access (just kidding)',
      execute: (args) => {
        if (args.length === 0) {
          return ['sudo: a command is required'];
        }
        return [
          `sudo: ${args.join(' ')}: command not found`,
          '',
          '🚫 Nice try! But this is a portfolio, not a real system.',
          '😄 You don\'t need sudo powers to explore my skills!',
          '💡 Try "skills" or "projects" instead.'
        ];
      }
    },
    hack: {
      description: 'Attempt to hack the system',
      execute: () => [
        '🔒 SECURITY BREACH DETECTED!',
        '🚨 Initiating countermeasures...',
        '⚡ Tracing IP address...',
        '📍 Location: Your chair',
        '🎯 Target identified: Curious visitor',
        '',
        '😂 Just kidding! This is a portfolio website.',
        '🛡️  But I do know cybersecurity - check out my experience!',
        '💼 I worked as an Infosec Intern at Newmark.',
        '',
        '🔐 Real security tip: Never run unknown commands!'
      ]
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        setHistory([]);
        return [];
      }
    },
    exit: {
      description: 'Close terminal',
      execute: () => ['Terminal session ended. Window will close...']
    }
  };

  useEffect(() => {
    // Welcome message with animation
    const welcomeMessages = [
      { type: 'output', content: ['╔══════════════════════════════════════════════════════════════╗'] },
      { type: 'output', content: ['║   ____                              ____  _   _              ║'] },
      { type: 'output', content: ['║  / ___| __ _ _   _ _ __ __ ___   __ / ___|| | | |             ║'] },
      { type: 'output', content: ['║ | |  _ / _` | | | | \'__/ _` \\ \\ / / \\___ \\| | | |             ║'] },
      { type: 'output', content: ['║ | |_| | (_| | |_| | | | (_| |\\ V /   ___) | |_| |             ║'] },
      { type: 'output', content: ['║  \\____|\\__,_|\\__,_|_|  \\__,_| \\_/   |____/ \\___/              ║'] },
      { type: 'output', content: ['║                                                              ║'] },
      { type: 'output', content: ['║              Software Engineer & Data Scientist              ║'] },
      { type: 'output', content: ['║                    Portfolio Terminal v2.0                  ║'] },
      { type: 'output', content: ['╚══════════════════════════════════════════════════════════════╝'] },
      { type: 'output', content: [''] },
      { type: 'output', content: ['🚀 Welcome to my interactive portfolio terminal!'] },
      { type: 'output', content: ['💡 Type "help" to see available commands'] },
      { type: 'output', content: ['🎯 Try "neofetch", "skills", or "projects" to get started'] },
      { type: 'output', content: [''] }
    ];
    
    setHistory(welcomeMessages);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = async (cmd) => {
    const [command, ...args] = cmd.trim().split(' ');
    
    if (!command) return [];

    if (commands[command]) {
      if (command === 'matrix') {
        // Special matrix effect
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsTyping(false);
        return ['01001000 01100101 01101100 01101100 01101111', 'Follow the white rabbit...'];
      }
      return commands[command].execute(args);
    } else {
      return [`Command not found: ${command}. Type "help" for available commands.`];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history];
    newHistory.push({ 
      type: 'input', 
      content: [`gaurav@portfolio:${currentPath}$ ${input}`] 
    });

    const output = await executeCommand(input);
    if (output.length > 0) {
      newHistory.push({ type: 'output', content: output });
    }

    setHistory(newHistory);
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 to-black text-green-400 font-mono text-sm overflow-hidden flex flex-col relative">
      {/* Terminal Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff00' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></div>
        </div>
        <span className="text-gray-300 text-xs font-semibold">Terminal - gaurav@portfolio</span>
        <div className="w-12"></div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800 relative z-10"
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence>
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`mb-2 ${entry.type === 'input' ? 'text-white' : 'text-green-400'}`}
            >
              {entry.content.map((line, lineIndex) => (
                <div key={lineIndex} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-blue-400 mr-2">
            gaurav@portfolio:{currentPath}$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white caret-green-400"
            autoFocus
            spellCheck={false}
          />
          <span className="animate-pulse text-green-400">_</span>
        </form>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 mt-2"
          >
            <span className="animate-pulse">Processing...</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Terminal;