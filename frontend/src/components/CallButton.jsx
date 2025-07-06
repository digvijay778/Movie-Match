
import React, { useState } from 'react';
import { VideoIcon } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Enhanced CallButton component with comprehensive improvements
 * Includes error handling, loading states, accessibility, and customization
 */
function CallButton({ 
  handleVideoCall, 
  disabled = false,
  loading = false,
  className = "",
  ariaLabel = "Start video call",
  position = "top-right",
  onError = null,
  size = "sm"
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (disabled || loading || isProcessing) return;

    try {
      setIsProcessing(true);
      setError(null);

      // Call the video call handler with proper error handling
      await handleVideoCall();
    } catch (err) {
      const errorMessage = err.message || 'Failed to start video call';
      setError(errorMessage);

      // Call error callback if provided
      if (onError) {
        onError(err);
      }

      console.error('Video call error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Dynamic positioning classes
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0'
  };

  // Dynamic size classes
  const sizeClasses = {
    'sm': 'btn-sm',
    'md': 'btn-md',
    'lg': 'btn-lg'
  };

  const isDisabled = disabled || loading || isProcessing;

  return (
    <div className={`p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute ${positionClasses[position]}`}>
      <div className="relative">
        <button 
          onClick={handleClick}
          disabled={isDisabled}
          className={`btn btn-success ${sizeClasses[size]} text-white transition-all duration-200 ${
            isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:btn-success-focus'
          } ${className}`}
          aria-label={ariaLabel}
          aria-busy={isProcessing}
          title={error || ariaLabel}
        >
          {isProcessing ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <VideoIcon className="size-6" />
          )}
        </button>

        {/* Error tooltip */}
        {error && (
          <div 
            className="absolute top-full right-0 mt-2 px-3 py-2 bg-red-500 text-white text-sm rounded shadow-lg z-10"
            role="alert"
            aria-live="polite"
          >
            {error}
            <button 
              onClick={() => setError(null)}
              className="ml-2 text-red-200 hover:text-white"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// PropTypes validation
CallButton.propTypes = {
  handleVideoCall: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  position: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
  onError: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default CallButton;
