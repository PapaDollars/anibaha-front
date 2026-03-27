import React, { useState, useCallback } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholder?: string;
  className?: string;
  onError?: (error: any) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  showHoverScale?: boolean;
  customTransition?: string;
  // 🆕 NOUVEAU : Contrôler le wrapper
  wrapperClassName?: string;
  noWrapper?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc = 'https://via.placeholder.com/300x200?text=Image+non+disponible',
  placeholder,
  className = '',
  onError,
  onLoad,
  showHoverScale = false,
  customTransition = 'transition-opacity duration-300',
  wrapperClassName = 'relative overflow-hidden w-full h-full', // 🆕 Personnalisable
  noWrapper = false, // 🆕 Option pour désactiver le wrapper
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(event);
  }, [onLoad]);

  const handleError = useCallback((event: any) => {
    setIsLoading(false);
    
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else {
      setHasError(true);
    }
    
    onError?.(event);
  }, [hasError, fallbackSrc, currentSrc, onError]);

  const imageClasses = `
    ${customTransition}
    ${isLoading ? 'opacity-0' : 'opacity-100'}
    ${hasError ? 'filter grayscale' : ''}
    ${showHoverScale ? 'group-hover:scale-110 transition-transform duration-700' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // 🆕 Si noWrapper est true, retourner juste l'image avec ses overlays
  if (noWrapper) {
    return (
      <>
        {/* Placeholder en position absolue (nécessite un parent relatif) */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
            {placeholder ? (
              <span className="text-gray-500 text-sm">{placeholder}</span>
            ) : (
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            )}
          </div>
        )}
        
        <img
          src={currentSrc}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={imageClasses}
          {...props}
        />
        
        {hasError && currentSrc === fallbackSrc && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <span className="text-gray-500 text-xs text-center p-2">
              Image non disponible
            </span>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={wrapperClassName}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {placeholder ? (
            <span className="text-gray-500 text-sm">{placeholder}</span>
          ) : (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          )}
        </div>
      )}
      
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={imageClasses}
        {...props}
      />
      
      {hasError && currentSrc === fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500 text-xs text-center p-2">
            Image non disponible
          </span>
        </div>
      )}
    </div>
  );
};