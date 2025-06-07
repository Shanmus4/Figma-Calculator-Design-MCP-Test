// script.js: Calculator logic and interactivity

const output = document.getElementById('calc-output');
const history = document.getElementById('calc-history');
const buttons = document.querySelectorAll('button[data-action]');
const modeToggle = document.getElementById('mode-toggle');
const body = document.getElementById('body');
const toggleBall = document.getElementById('toggle-ball');
const calculatorContainer = document.getElementById('calculator-container');
const backgroundEffectCircle = document.getElementById('background-effect-circle');
const toggleContent = document.getElementById('toggle-content');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

let current = '0';
let prev = '';
let operator = '';
let justEvaluated = false;
const MAX_DIGITS = 22; // For internal calculation precision

function formatNumberForDisplay(numStr) {
  const num = parseFloat(numStr);

  if (isNaN(num)) {
    return numStr; // Return as is if not a valid number (e.g., "Error")
  }

  // Define a reasonable maximum display length for the string itself
  const maxCharsForDisplay = 18; // Adjusted for more forgiving display

  // Helper function to format to scientific notation to fit display
  const toScientific = (val, maxLen) => {
    // Get the length of the exponent part (e.g., "e+22" or "e-10")
    const expPart = val.toExponential(0).substring(val.toExponential(0).indexOf('e'));
    const expLength = expPart.length;

    // Calculate available space for mantissa (1 digit before dot + fractionDigits)
    // maxLen = 1 (leading digit) + 1 (for '.') + fractionDigits + expLength
    const fractionDigits = Math.max(0, maxLen - 1 - 1 - expLength);
    return val.toExponential(fractionDigits);
  };

  // Priority 1: If number is extremely large/small, force scientific notation
  // These thresholds are chosen to ensure numbers that would naturally be scientific are displayed as such.
  if (Math.abs(num) >= 1e12 || (Math.abs(num) > 0 && Math.abs(num) < 1e-6)) { // Adjusted thresholds
    return toScientific(num, maxCharsForDisplay);
  }

  // Priority 2: Try toLocaleString with commas. If it becomes too long, use scientific.
  // We need to limit maximumFractionDigits for toLocaleString to prevent excessively long decimals.
  // Calculate maxFractionDigits based on remaining space if integer part and potential sign/decimal are considered.
  const integerPartLength = Math.floor(Math.abs(num)).toString().length;
  const currentSignAndDotLength = (num < 0 ? 1 : 0) + (num % 1 !== 0 ? 1 : 0); // For '-' and '.'
  // Subtract one more for potential comma if integer part > 3 digits
  const commaSpace = integerPartLength > 3 ? Math.floor((integerPartLength - 1) / 3) : 0;
  
  const allowedFractionDigits = Math.max(0,
    maxCharsForDisplay - integerPartLength - currentSignAndDotLength - commaSpace
  );
  
  let formattedNum = num.toLocaleString('en-US', { maximumFractionDigits: Math.min(allowedFractionDigits, MAX_DIGITS) });

  if (formattedNum.length > maxCharsForDisplay) {
    return toScientific(num, maxCharsForDisplay);
  }

  // If nothing else, return the locale-formatted number
  return formattedNum;
}

function updateDisplay() {
  // Dynamic font sizing for output
  output.classList.remove('text-7xl', 'text-6xl', 'text-5xl', 'text-4xl', 'text-3xl', 'text-2xl', 'text-xl', 'text-lg'); // Clear all previous font size classes
  
  const displayedOutput = formatNumberForDisplay(current);
  // Use the actual length of the displayed string for font sizing.
  const outputLength = displayedOutput.length;

  console.log(`Current: ${current}, Displayed Output: ${displayedOutput}, Output Length: ${outputLength}`);

  // Adjusted thresholds for maxCharsForDisplay = 18 (more forgiving)
  if (outputLength <= 10) {
    output.classList.add('text-7xl');
  } else if (outputLength <= 14) {
    output.classList.add('text-5xl');
  } else if (outputLength <= 18) {
    output.classList.add('text-4xl');
  } else {
    output.classList.add('text-lg'); // For numbers >18 characters
  }

  output.textContent = displayedOutput;
  history.textContent = prev ? `${prev} ${operator}` : '';
}

function clearAll() {
  current = '0';
  prev = '';
  operator = '';
  justEvaluated = false;
  output.classList.remove('animate-zoom');
  history.classList.remove('animate-up');
  updateDisplay();
}

function inputNumber(num) {
  if (justEvaluated) {
    current = num;
    justEvaluated = false;
    output.classList.remove('animate-zoom'); // Stop zoom after new input starts
    history.classList.remove('animate-up'); // Ensure history animation is off
  } else {
    // Check if adding the new digit would exceed the MAX_DIGITS limit
    const currentSignificantDigits = current.replace(/[-.]/g, '').length;
    if (currentSignificantDigits >= MAX_DIGITS && num !== '.') {
      return; // Prevent adding more digits if limit reached and it's not a dot
    }

    if (current === '0' && num !== '.') {
      current = num;
    } else if (num === '.' && current.includes('.')) {
      return;
    } else {
      current += num;
    }
  }
  updateDisplay();
}

function inputOperator(op) {
  if (operator && !justEvaluated) {
    evaluate();
  }
  prev = current;
  operator = op;
  current = '0';
  justEvaluated = false; // Reset justEvaluated when a new operation starts
  output.classList.remove('animate-zoom'); // Clear output animation when operator is pressed
  history.classList.remove('animate-up'); // Clear previous history animation

  // Force reflow/re-render for history animation
  void history.offsetWidth;
  history.classList.add('animate-up'); // Add history animation when operator is pressed
  updateDisplay();
}

function evaluate() {
  let result = 0;
  const a = parseFloat(prev.replace(/,/g, ''));
  const b = parseFloat(current.replace(/,/g, ''));
  switch (operator) {
    case '+': result = a + b; break;
    case '–': result = a - b; break;
    case '×': result = a * b; break;
    case '÷': result = b !== 0 ? a / b : 'Error'; break;
    default: result = b;
  }

  current = result.toString();
  prev = '';
  operator = '';
  justEvaluated = true;

  // Clear any existing flicker or result animation
  output.classList.remove('animate-result', 'animate-flicker');
  history.classList.remove('animate-up');

  // When evaluate is called directly (e.g., from inputOperator),
  // it just updates the display. The animation for '=' is handled separately.
  updateDisplay();
}

function percent() {
  current = (parseFloat(current) / 100).toString();
  justEvaluated = true;

  // Clear any existing flicker or result animation
  output.classList.remove('animate-result', 'animate-flicker');
  history.classList.remove('animate-up');

  // Force reflow/re-render for output animation before adding class
  void output.offsetWidth;
  output.classList.add('animate-result'); // Add slide-in animation for percent
  updateDisplay();
}

function plusMinus() {
  if (current !== '0') {
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
    justEvaluated = true;

    // Clear any existing flicker or result animation
    output.classList.remove('animate-result', 'animate-flicker');
    history.classList.remove('animate-up');

    // Force reflow/re-render for output animation before adding class
    void output.offsetWidth;
    output.classList.add('animate-result'); // Add slide-in animation for plusMinus
    updateDisplay();
  }
}

function backspace() {
  if (current.length > 1) {
    current = current.slice(0, -1);
  } else {
    current = '0';
  }
  output.classList.remove('animate-result', 'animate-flicker'); // Clear all potential animations
  history.classList.remove('animate-up');
  updateDisplay();
}

buttons.forEach(btn => {
  btn.addEventListener('click', e => {
    const action = btn.getAttribute('data-action');
    if (!isNaN(action) || action === 'dot') { // Handle number and dot input
      inputNumber(action);
    } else {
      switch (action) {
        case 'clear': clearAll(); break;
        case 'add': inputOperator('+'); break;
        case 'subtract': inputOperator('–'); break;
        case 'multiply': inputOperator('×'); break;
        case 'divide': inputOperator('÷'); break;
        case 'equals':
          evaluate();
          // Matrix animation for equals button only
          const finalDisplayedOutput = formatNumberForDisplay(current);
          const finalOutputLength = finalDisplayedOutput.length;

          output.classList.remove('animate-result', 'animate-flicker');
          history.classList.remove('animate-up');

          let flickerCount = 0;
          const maxFlicker = 10; 
          const flickerInterval = 30; 

          output.classList.add('animate-flicker');

          const flickerEffect = setInterval(() => {
            if (flickerCount < maxFlicker) {
              output.textContent = Array.from({ length: finalOutputLength }, 
                () => Math.floor(Math.random() * 10)
              ).join('');
              flickerCount++;
            } else {
              clearInterval(flickerEffect);
              output.classList.remove('animate-flicker');
              void output.offsetWidth;
              output.classList.add('animate-result'); 
              output.textContent = finalDisplayedOutput; // Set final result after flicker
            }
          }, flickerInterval);
          break;
        case 'percent': percent(); break;
        case 'plus-minus': plusMinus(); break;
        case 'backspace': backspace(); break;
      }
    }
  });
});

modeToggle.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    backgroundEffectCircle.style.transform = 'scale(0)'; // Shrink background circle
    // Dark mode state
    toggleBall.style.left = '6px';
    moonIcon.style.left = '42px'; // Moon on right side
    moonIcon.style.opacity = '1';
    sunIcon.style.left = '-30px';
    sunIcon.style.opacity = '0.4';

  } else {
    body.classList.add('light-mode');
    backgroundEffectCircle.style.transform = 'scale(1000)'; // Expand background circle significantly
    // Light mode state
    toggleBall.style.left = '42px';
    moonIcon.style.left = '78px'; // Moon off-screen right
    moonIcon.style.opacity = '0.4';
    sunIcon.style.left = '6px'; // Sun on left side
    sunIcon.style.opacity = '1';
  }
});

function setInitialToggleState() {
  // Set initial state for dark mode
  toggleBall.style.left = '6px';
  moonIcon.style.left = '42px';
  moonIcon.style.opacity = '1';
  sunIcon.style.left = '-30px';
  sunIcon.style.opacity = '0.4';
  body.classList.remove('light-mode');
  backgroundEffectCircle.style.transform = 'scale(0)';
}

// Initialize toggle state on page load
setInitialToggleState();

updateDisplay(); 