import React, { useState, useEffect } from 'react';

export interface FormData {
  // Step 1: Basic Information
  name: string;
  sex: 'male' | 'female' | 'other' | '';
  birthDate: string;
  
  // Step 2: Contact Information
  phoneNumber: string;
  email: string;
}

interface ValidationState {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface StepProps {
  formData: FormData;
  updateFormData?: (data: Partial<FormData>) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
  isLastStep?: boolean;
  isFirstStep?: boolean;
  validation: ValidationState;
}

// Enhanced blocking mechanism with cyber sound simulation
const playInitiationSound = () => {
  // Visual feedback for "sound" - creates a brief flash effect
  const soundFeedback = document.createElement('div');
  soundFeedback.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 255, 255, 0.1);
    pointer-events: none;
    z-index: 9999;
    animation: cyberFlash 0.3s ease-out;
  `;
  
  // Add flash animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cyberFlash {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(soundFeedback);
  
  setTimeout(() => {
    document.body.removeChild(soundFeedback);
    document.head.removeChild(style);
  }, 300);
};

// Enhanced error shake animation
const triggerErrorShake = () => {
  const container = document.querySelector('.cyber-container') as HTMLElement;
  if (container) {
    container.style.animation = 'cyberShake 0.5s ease-in-out';
    setTimeout(() => {
      container.style.animation = '';
    }, 500);
  }
};

// Add shake animation CSS dynamically
const addShakeAnimation = () => {
  if (!document.getElementById('cyber-shake-style')) {
    const style = document.createElement('style');
    style.id = 'cyber-shake-style';
    style.textContent = `
      @keyframes cyberShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);
  }
};

// Enhanced validation functions
const validateStep1 = (formData: FormData): ValidationState => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!formData.name.trim()) {
    errors.push("Neural ID required for system access");
  } else if (formData.name.trim().length < 2) {
    errors.push("Neural ID must contain at least 2 characters");
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
    warnings.push("Special characters detected in Neural ID");
  }
  
  if (!formData.sex) {
    errors.push("Bio-classification required");
  }
  
  if (!formData.birthDate) {
    errors.push("Temporal origin stamp required");
  } else {
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      errors.push("Neural interface requires minimum 18 cycles");
    } else if (age > 150) {
      warnings.push("Temporal origin stamp indicates exceptional longevity");
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

const validateStep2 = (formData: FormData): ValidationState => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!formData.phoneNumber.trim()) {
    errors.push("Quantum communication frequency required");
  } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
    errors.push("Invalid quantum frequency format");
  }
  
  if (!formData.email.trim()) {
    errors.push("Digital access vector required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push("Malformed digital access vector");
    } else if (formData.email.includes('test') || formData.email.includes('temp')) {
      warnings.push("Temporary access vector detected");
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Matrix Rain Effect Component
const MatrixRain: React.FC = () => {
  useEffect(() => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-bg';
    document.body.appendChild(matrixContainer);

    const createMatrixChar = () => {
      const char = document.createElement('div');
      char.className = 'matrix-char';
      char.textContent = chars[Math.floor(Math.random() * chars.length)];
      char.style.left = Math.random() * 100 + '%';
      char.style.animationDuration = (Math.random() * 3 + 1) + 's';
      char.style.animationDelay = Math.random() * 2 + 's';
      matrixContainer.appendChild(char);

      setTimeout(() => {
        if (matrixContainer.contains(char)) {
          matrixContainer.removeChild(char);
        }
      }, 5000);
    };

    const interval = setInterval(createMatrixChar, 100);

    return () => {
      clearInterval(interval);
      if (document.body.contains(matrixContainer)) {
        document.body.removeChild(matrixContainer);
      }
    };
  }, []);

  return null;
};

// Step 1: Basic Information with Cyberpunk Design
const BasicInformationStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  onNext,
  validation 
}) => {
  const [isHacking, setIsHacking] = useState(false);

  const handleNext = () => {
    if (validation.isValid) {
      playInitiationSound();
      setIsHacking(true);
      setTimeout(() => {
        setIsHacking(false);
        onNext?.();
      }, 1500);
    } else {
      triggerErrorShake();
    }
  };

  // Custom hook for cyber typing effect - only for display, not input
  // const typedName = useCyberTyping(formData.name, isHacking);
  // const typedSex = useCyberTyping(formData.sex, isHacking);
  // const typedBirthDate = useCyberTyping(formData.birthDate, isHacking);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 
          className="text-3xl font-bold mb-2 glitch"
          data-text="BIO-SCAN PROTOCOL"
          style={{ 
            fontFamily: 'Orbitron, monospace',
            color: 'var(--cyber-primary)',
            textShadow: '0 0 15px var(--cyber-primary)',
            letterSpacing: '2px'
          }}
        >
          BIO-SCAN PROTOCOL
        </h2>
        <p style={{ 
          fontFamily: 'Courier Prime, monospace',
          color: 'var(--cyber-secondary)',
          textShadow: '0 0 8px var(--cyber-secondary)'
        }}>
          &gt; INITIALIZING BIOMETRIC ANALYSIS_
        </p>
      </div>

      {/* Validation Errors */}
      {validation.errors.length > 0 && (
        <div className="cyber-container p-4 border-red-500 bg-red-900/20">
          <div className="text-red-400 font-mono text-sm">
            <div className="text-red-300 font-bold mb-2">⚠ SYSTEM ERRORS DETECTED:</div>
            {validation.errors.map((error, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2">▶</span>
                {error}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation Warnings */}
      {validation.warnings.length > 0 && (
        <div className="cyber-container p-4 border-yellow-500 bg-yellow-900/20">
          <div className="text-yellow-400 font-mono text-sm">
            <div className="text-yellow-300 font-bold mb-2">⚡ SYSTEM WARNINGS:</div>
            {validation.warnings.map((warning, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2">▶</span>
                {warning}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium mb-2"
            style={{ 
              fontFamily: 'Courier Prime, monospace',
              color: 'var(--cyber-primary)',
              textShadow: '0 0 5px var(--cyber-primary)',
              letterSpacing: '1px'
            }}
          >
            &gt; NEURAL ID *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData?.({ name: e.target.value })}
            className="cyber-input w-full px-4 py-3 rounded-lg"
            placeholder="Enter neural identification..."
            style={{ textTransform: 'uppercase' }}
          />
        </div>

        <div>
          <label 
            htmlFor="sex" 
            className="block text-sm font-medium mb-2"
            style={{ 
              fontFamily: 'Courier Prime, monospace',
              color: 'var(--cyber-primary)',
              textShadow: '0 0 5px var(--cyber-primary)',
              letterSpacing: '1px'
            }}
          >
            &gt; BIO-CLASSIFICATION *
          </label>
          <select
            id="sex"
            value={formData.sex}
            onChange={(e) => updateFormData?.({ sex: e.target.value as FormData['sex'] })}
            className="cyber-input w-full px-4 py-3 rounded-lg"
          >
            <option value="">SELECT BIO-TYPE...</option>
            <option value="male">MALE VARIANT</option>
            <option value="female">FEMALE VARIANT</option>
            <option value="other">ENHANCED VARIANT</option>
          </select>
        </div>

        <div>
          <label 
            htmlFor="birthDate" 
            className="block text-sm font-medium mb-2"
            style={{ 
              fontFamily: 'Courier Prime, monospace',
              color: 'var(--cyber-primary)',
              textShadow: '0 0 5px var(--cyber-primary)',
              letterSpacing: '1px'
            }}
          >
            &gt; TEMPORAL ORIGIN *
          </label>
          <div className="cyber-date-container">
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) => updateFormData?.({ birthDate: e.target.value })}
              className="cyber-input w-full px-4 py-3 rounded-lg"
              style={{ 
                paddingRight: '45px',
                color: 'var(--cyber-primary)',
                colorScheme: 'dark'
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        {isHacking ? (
          <div className="neon-btn px-8 py-3 rounded-lg font-medium">
            <span className="animate-pulse">HACKING MAINFRAME...</span>
          </div>
        ) : (
          <button
            onClick={handleNext}
            disabled={!validation.isValid}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              validation.isValid
                ? 'neon-btn hover:scale-105'
                : 'neon-btn opacity-50 cursor-not-allowed'
            }`}
          >
            INITIATE SCAN ▶
          </button>
        )}
      </div>
    </div>
  );
};

// Step 2: Contact Information
const ContactInformationStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev,
  validation 
}) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleNext = () => {
    if (validation.isValid) {
      playInitiationSound();
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        onNext?.();
      }, 2000);
    } else {
      triggerErrorShake();
    }
  };

  // Custom hook for cyber typing effect - only for display, not input
  // const typedPhoneNumber = useCyberTyping(formData.phoneNumber, isConnecting);
  // const typedEmail = useCyberTyping(formData.email, isConnecting);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 
          className="text-3xl font-bold mb-2 glitch"
          data-text="QUANTUM LINK SETUP"
          style={{ 
            fontFamily: 'Orbitron, monospace',
            color: 'var(--cyber-secondary)',
            textShadow: '0 0 15px var(--cyber-secondary)',
            letterSpacing: '2px'
          }}
        >
          QUANTUM LINK SETUP
        </h2>
        <p style={{ 
          fontFamily: 'Courier Prime, monospace',
          color: 'var(--cyber-primary)',
          textShadow: '0 0 8px var(--cyber-primary)'
        }}>
          &gt; ESTABLISHING COMMUNICATION VECTORS_
        </p>
      </div>

      {/* Validation Errors */}
      {validation.errors.length > 0 && (
        <div className="cyber-container p-4 border-red-500 bg-red-900/20">
          <div className="text-red-400 font-mono text-sm">
            <div className="text-red-300 font-bold mb-2">⚠ CONNECTION ERRORS:</div>
            {validation.errors.map((error, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2">▶</span>
                {error}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation Warnings */}
      {validation.warnings.length > 0 && (
        <div className="cyber-container p-4 border-yellow-500 bg-yellow-900/20">
          <div className="text-yellow-400 font-mono text-sm">
            <div className="text-yellow-300 font-bold mb-2">⚡ CONNECTION WARNINGS:</div>
            {validation.warnings.map((warning, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2">▶</span>
                {warning}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label 
            htmlFor="phoneNumber" 
            className="block text-sm font-medium mb-2"
            style={{ 
              fontFamily: 'Courier Prime, monospace',
              color: 'var(--cyber-secondary)',
              textShadow: '0 0 5px var(--cyber-secondary)',
              letterSpacing: '1px'
            }}
          >
            &gt; QUANTUM FREQUENCY *
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData?.({ phoneNumber: e.target.value })}
            className="cyber-input w-full px-4 py-3 rounded-lg"
            placeholder="Enter quantum communication frequency..."
          />
        </div>

        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium mb-2"
            style={{ 
              fontFamily: 'Courier Prime, monospace',
              color: 'var(--cyber-secondary)',
              textShadow: '0 0 5px var(--cyber-secondary)',
              letterSpacing: '1px'
            }}
          >
            &gt; DIGITAL ACCESS VECTOR *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => updateFormData?.({ email: e.target.value })}
            className="cyber-input w-full px-4 py-3 rounded-lg"
            placeholder="Enter digital access point..."
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="neon-btn-secondary px-6 py-3 rounded-lg font-medium hover:scale-105 transition-all duration-300"
        >
          ◀ DECRYPT
        </button>
        {isConnecting ? (
          <div className="neon-btn-secondary px-8 py-3 rounded-lg font-medium">
            <span className="animate-pulse">ESTABLISHING LINK...</span>
          </div>
        ) : (
          <button
            onClick={handleNext}
            disabled={!validation.isValid}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              validation.isValid
                ? 'neon-btn hover:scale-105'
                : 'neon-btn opacity-50 cursor-not-allowed'
            }`}
          >
            CONNECT ▶
          </button>
        )}
      </div>
    </div>
  );
};

// Step 3: Confirmation
const ConfirmationStep: React.FC<StepProps> = ({ 
  formData, 
  onPrev, 
  onSubmit 
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatGender = (sex: string) => {
    const genderMap = {
      'male': 'MALE VARIANT',
      'female': 'FEMALE VARIANT', 
      'other': 'ENHANCED VARIANT'
    };
    return genderMap[sex as keyof typeof genderMap] || sex.toUpperCase();
  };

  const handleSubmit = () => {
    playInitiationSound();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onSubmit?.();
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 
          className="text-3xl font-bold mb-2 glitch"
          data-text="DATA VERIFICATION"
          style={{ 
            fontFamily: 'Orbitron, monospace',
            color: 'var(--cyber-accent)',
            textShadow: '0 0 15px var(--cyber-accent)',
            letterSpacing: '2px'
          }}
        >
          DATA VERIFICATION
        </h2>
        <p style={{ 
          fontFamily: 'Courier Prime, monospace',
          color: 'var(--cyber-primary)',
          textShadow: '0 0 8px var(--cyber-primary)'
        }}>
          &gt; FINALIZING NEURAL INTERFACE PROTOCOL_
        </p>
      </div>

      <div className="cyber-container p-6 space-y-6 hologram">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 
              className="text-xl font-semibold mb-4"
              style={{ 
                fontFamily: 'Orbitron, monospace',
                color: 'var(--cyber-primary)',
                textShadow: '0 0 10px var(--cyber-primary)',
                letterSpacing: '1px'
              }}
            >
              ▼ BIO-PROFILE ▼
            </h3>
            <div className="space-y-3">
              <div className="border-l-2 border-cyan-400 pl-4">
                <span 
                  className="text-sm font-medium block"
                  style={{ 
                    fontFamily: 'Courier Prime, monospace',
                    color: 'var(--cyber-secondary)',
                    textShadow: '0 0 5px var(--cyber-secondary)'
                  }}
                >
                  NEURAL_ID:
                </span>
                <p 
                  className="text-lg font-mono"
                  style={{ 
                    color: 'var(--cyber-primary)',
                    textShadow: '0 0 5px var(--cyber-primary)'
                  }}
                >
                  {formData.name.toUpperCase()}
                </p>
              </div>
              <div className="border-l-2 border-cyan-400 pl-4">
                <span 
                  className="text-sm font-medium block"
                  style={{ 
                    fontFamily: 'Courier Prime, monospace',
                    color: 'var(--cyber-secondary)',
                    textShadow: '0 0 5px var(--cyber-secondary)'
                  }}
                >
                  BIO_TYPE:
                </span>
                <p 
                  className="text-lg font-mono"
                  style={{ 
                    color: 'var(--cyber-primary)',
                    textShadow: '0 0 5px var(--cyber-primary)'
                  }}
                >
                  {formatGender(formData.sex)}
                </p>
              </div>
              <div className="border-l-2 border-cyan-400 pl-4">
                <span 
                  className="text-sm font-medium block"
                  style={{ 
                    fontFamily: 'Courier Prime, monospace',
                    color: 'var(--cyber-secondary)',
                    textShadow: '0 0 5px var(--cyber-secondary)'
                  }}
                >
                  TEMPORAL_ORIGIN:
                </span>
                <p 
                  className="text-lg font-mono"
                  style={{ 
                    color: 'var(--cyber-primary)',
                    textShadow: '0 0 5px var(--cyber-primary)'
                  }}
                >
                  {formatDate(formData.birthDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 
              className="text-xl font-semibold mb-4"
              style={{ 
                fontFamily: 'Orbitron, monospace',
                color: 'var(--cyber-secondary)',
                textShadow: '0 0 10px var(--cyber-secondary)',
                letterSpacing: '1px'
              }}
            >
              ▼ COMM-VECTORS ▼
            </h3>
            <div className="space-y-3">
              <div className="border-l-2 border-pink-400 pl-4">
                <span 
                  className="text-sm font-medium block"
                  style={{ 
                    fontFamily: 'Courier Prime, monospace',
                    color: 'var(--cyber-primary)',
                    textShadow: '0 0 5px var(--cyber-primary)'
                  }}
                >
                  QUANTUM_FREQ:
                </span>
                <p 
                  className="text-lg font-mono"
                  style={{ 
                    color: 'var(--cyber-secondary)',
                    textShadow: '0 0 5px var(--cyber-secondary)'
                  }}
                >
                  {formData.phoneNumber}
                </p>
              </div>
              <div className="border-l-2 border-pink-400 pl-4">
                <span 
                  className="text-sm font-medium block"
                  style={{ 
                    fontFamily: 'Courier Prime, monospace',
                    color: 'var(--cyber-primary)',
                    textShadow: '0 0 5px var(--cyber-primary)'
                  }}
                >
                  DIGITAL_VECTOR:
                </span>
                <p 
                  className="text-lg font-mono break-all"
                  style={{ 
                    color: 'var(--cyber-secondary)',
                    textShadow: '0 0 5px var(--cyber-secondary)'
                  }}
                >
                  {formData.email.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="border-t border-cyan-400/30 pt-4">
          <div 
            className="text-center text-sm"
            style={{ 
              fontFamily: 'Courier Prime, monospace',
              color: 'var(--cyber-accent)',
              textShadow: '0 0 5px var(--cyber-accent)'
            }}
          >
            ⚡ ENCRYPTED CONNECTION ESTABLISHED ⚡<br />
            ALL DATA TRANSMISSIONS ARE QUANTUM-SECURED
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          disabled={isUploading}
          className="neon-btn-secondary px-6 py-3 rounded-lg font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50"
        >
          ◀ MODIFY
        </button>
        {isUploading ? (
          <div className="neon-btn-success px-8 py-3 rounded-lg font-medium">
            <span className="animate-pulse">UPLOADING TO MAINFRAME...</span>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="neon-btn-success px-8 py-3 rounded-lg font-medium hover:scale-105 transition-all duration-300"
          >
            UPLOAD TO MAINFRAME ▶
          </button>
        )}
      </div>
    </div>
  );
};



const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sex: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationState, setValidationState] = useState<ValidationState>({
    isValid: false,
    errors: [],
    warnings: []
  });

  // Initialize cyber animations
  useEffect(() => {
    addShakeAnimation();
  }, []);

  // Real-time validation
  useEffect(() => {
    let validation: ValidationState;
    
    switch (currentStep) {
      case 1:
        validation = validateStep1(formData);
        break;
      case 2:
        validation = validateStep2(formData);
        break;
      default:
        validation = { isValid: true, errors: [], warnings: [] };
    }
    
    setValidationState(validation);
  }, [formData, currentStep]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (validationState.isValid) {
      setCurrentStep(prev => prev + 1);
    } else {
      triggerErrorShake();
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Neural interface data uploaded:', formData);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sex: '',
      birthDate: '',
      phoneNumber: '',
      email: '',
    });
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <>
        <MatrixRain />
        <div className="max-w-2xl mx-auto cyber-container p-8 rounded-xl success-pulse success-container">
          <div className="text-center space-y-8 relative z-10">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
              style={{
                background: 'radial-gradient(circle, var(--cyber-success) 0%, transparent 70%)',
                border: '2px solid var(--cyber-success)',
                boxShadow: '0 0 30px var(--cyber-success)'
              }}
            >
              <svg 
                className="w-12 h-12" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: 'var(--cyber-success)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div>
              <h2 
                className="text-4xl font-bold mb-4 glitch"
                data-text="UPLOAD COMPLETE"
                style={{ 
                  fontFamily: 'Orbitron, monospace',
                  color: 'var(--cyber-success)',
                  textShadow: '0 0 20px var(--cyber-success)',
                  letterSpacing: '3px'
                }}
              >
                UPLOAD COMPLETE
              </h2>
              <p 
                className="text-lg mb-2"
                style={{ 
                  fontFamily: 'Courier Prime, monospace',
                  color: 'var(--cyber-primary)',
                  textShadow: '0 0 10px var(--cyber-primary)'
                }}
              >
                &gt; NEURAL INTERFACE SUCCESSFULLY ESTABLISHED
                <span className="terminal-cursor"></span>
              </p>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: 'Courier Prime, monospace',
                  color: 'var(--cyber-secondary)',
                  textShadow: '0 0 5px var(--cyber-secondary)'
                }}
              >
                WELCOME TO THE MATRIX, {formData.name.toUpperCase()}
              </p>
            </div>
            
            <div className="space-y-4">
              <div 
                className="text-xs"
                style={{ 
                  fontFamily: 'Courier Prime, monospace',
                  color: 'var(--cyber-accent)',
                  textShadow: '0 0 5px var(--cyber-accent)'
                }}
              >
                ● QUANTUM ENCRYPTION: ACTIVE<br/>
                ● NEURAL LINK STATUS: OPTIMAL<br/>
                ● SECURITY PROTOCOL: MAXIMUM<br/>
                ● MATRIX ACCESS: GRANTED
              </div>
              
              <button
                onClick={resetForm}
                className="neon-btn px-8 py-4 rounded-lg font-medium hover:scale-105 transition-all duration-300"
              >
                INITIATE NEW CONNECTION
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MatrixRain />
      <div className="max-w-3xl mx-auto cyber-container p-8 rounded-xl relative z-10">
        {/* Enhanced Progress Bar */}
        <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span 
            className="text-sm font-medium"
            style={{ 
              fontFamily: 'Courier Prime, monospace',
              color: 'var(--cyber-primary)',
              textShadow: '0 0 5px var(--cyber-primary)',
              letterSpacing: '1px'
            }}
          >
            PROTOCOL PHASE {currentStep}/3
          </span>
          <span 
            className="text-sm font-medium"
            style={{ 
              fontFamily: 'Courier Prime, monospace',
              color: 'var(--cyber-accent)',
              textShadow: '0 0 5px var(--cyber-accent)',
              letterSpacing: '1px'
            }}
          >
            {Math.round((currentStep / 3) * 100)}% COMPLETE
          </span>
        </div>
        <div className="cyber-progress w-full h-3 rounded-full">
          <div 
            className="cyber-progress-fill h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* System Status */}
      <div className="mb-6 text-center">
        <div 
          className="text-xs"
          style={{ 
            fontFamily: 'Courier Prime, monospace',
            color: validationState.isValid ? 'var(--cyber-success)' : 'var(--cyber-error)',
            textShadow: `0 0 5px ${validationState.isValid ? 'var(--cyber-success)' : 'var(--cyber-error)'}`
          }}
        >
          {validationState.isValid ? '● SYSTEM READY' : '● VALIDATION REQUIRED'}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {currentStep === 1 && (
          <BasicInformationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            isFirstStep={true}
            validation={validationState}
          />
        )}

        {currentStep === 2 && (
          <ContactInformationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            validation={validationState}
          />
        )}

        {currentStep === 3 && (
          <ConfirmationStep
            formData={formData}
            onPrev={prevStep}
            onSubmit={handleSubmit}
            isLastStep={true}
            validation={validationState}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default MultiStepForm;
