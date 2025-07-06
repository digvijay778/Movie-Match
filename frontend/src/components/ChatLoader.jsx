
import React, { useEffect, useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Enhanced ChatLoader component with accessibility and customization
 * Includes timeout handling, announcements, and progress indication
 */
function ChatLoader({ 
  message = "Connecting to chat...",
  timeout = 30000, // 30 seconds
  onTimeout = null,
  size = "large",
  showProgress = false,
  className = ""
}) {
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set up timeout timer
    const timeoutTimer = setTimeout(() => {
      setTimeoutReached(true);
      if (onTimeout) {
        onTimeout();
      }
    }, timeout);

    // Set up progress simulation if enabled
    let progressTimer;
    if (showProgress) {
      progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev; // Cap at 90% until actually connected
          return prev + Math.random() * 10;
        });
      }, 500);
    }

    return () => {
      clearTimeout(timeoutTimer);
      if (progressTimer) {
        clearInterval(progressTimer);
      }
    };
  }, [timeout, onTimeout, showProgress]);

  // Size mappings
  const sizeClasses = {
    small: "size-6",
    medium: "size-8", 
    large: "size-10",
    xlarge: "size-12"
  };

  if (timeoutReached) {
    return (
      <div className={`h-screen flex flex-col items-center justify-center p-4 ${className}`}>
        <div className="text-red-500 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-lg font-mono mb-4">Connection timeout</p>
          <p className="text-sm text-gray-600 mb-4">
            Unable to connect to chat service. Please check your connection and try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
            aria-label="Retry connection"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`h-screen flex flex-col items-center justify-center p-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="text-center">
        <LoaderIcon 
          className={`animate-spin ${sizeClasses[size]} text-primary mb-4`}
          aria-hidden="true"
        />
        <p className="text-center text-lg font-mono mb-4" id="loading-message">
          {message}
        </p>

        {showProgress && (
          <div className="w-64 bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-describedby="loading-message"
            />
          </div>
        )}

        <div className="text-sm text-gray-500">
          This may take a few moments...
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
ChatLoader.propTypes = {
  message: PropTypes.string,
  timeout: PropTypes.number,
  onTimeout: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  showProgress: PropTypes.bool,
  className: PropTypes.string
};

export default ChatLoader;
