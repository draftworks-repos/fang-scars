import React, { useState } from 'react';
import './ImageTile.css';

export default function ImageTile({
  src,
  alt = '',
  width,
  height,
  priority = false,
  className = '',
  aspectRatio,
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`image-tile ${className}`}
      style={aspectRatio ? { '--tile-aspect': aspectRatio } : undefined}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setHasError(true)}
          className="image-tile__img photo"
        />
      ) : (
        <div className="image-tile__fallback" aria-label={alt}>
          <div className="image-tile__badge">FANG SCARS</div>
          <span className="image-tile__alt-text">{alt || 'Tattoo Artwork'}</span>
        </div>
      )}
    </div>
  );
}
