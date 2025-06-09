import './App.css';
import MultiStepForm from './components/MultiStepForm';

const App = () => {
  return (
    <>
      {/* Cyberpunk Background */}
      <div className="cyber-background"></div>
      <div className="scan-lines"></div>
      
      <div className="min-h-screen py-8 px-4 cyber-grid relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 
              className="text-6xl font-bold mb-4 glitch terminal-text" 
              data-text="NEURAL INTERFACE"
              style={{ 
                fontFamily: 'Orbitron, monospace',
                color: 'var(--cyber-primary)',
                textShadow: '0 0 20px var(--cyber-primary)',
                letterSpacing: '3px'
              }}
            >
              NEURAL INTERFACE
            </h1>
            <p 
              className="text-xl"
              style={{ 
                fontFamily: 'Courier Prime, monospace',
                color: 'var(--cyber-secondary)',
                textShadow: '0 0 10px var(--cyber-secondary)',
                letterSpacing: '1px'
              }}
            >
              &gt; SYSTEM REGISTRATION PROTOCOL INITIATED_
            </p>
            <div className="mt-4 text-sm" style={{ color: 'var(--cyber-accent)', opacity: 0.8 }}>
              ▲ SECURE CONNECTION ESTABLISHED ▲
            </div>
          </div>
          <MultiStepForm />
        </div>
      </div>
    </>
  );
};

export default App;
