import React from 'react';
import './PastedPhoto.css';
import ImageTile from '../ImageTile/ImageTile';

export default function PastedPhoto({
  src,
  alt = '',
  width,
  height,
  rotate = 0,
  hasTape = false,
  tapePosition = 'top-center',
  aspectRatio,
  className = '',
  children,
}) {
  return (
    <div
      className={`pasted-photo ${className}`}
      style={{
        '--photo-rotate': `${rotate}deg`,
      }}
    >
      {hasTape && (
        <>
          {(tapePosition === 'both' || tapePosition === 'top-left' || tapePosition === 'left') && (
            <div
              className="pasted-photo__tape pasted-photo__tape--top-left"
              aria-hidden="true"
            />
          )}
          {(tapePosition === 'both' || tapePosition === 'top-right' || tapePosition === 'right') && (
            <div
              className="pasted-photo__tape pasted-photo__tape--top-right"
              aria-hidden="true"
            />
          )}
          {tapePosition === 'top-center' && (
            <div
              className="pasted-photo__tape pasted-photo__tape--top-center"
              aria-hidden="true"
            />
          )}
        </>
      )}
      <div className="pasted-photo__inner">
        <ImageTile
          src={src}
          alt={alt}
          width={width}
          height={height}
          aspectRatio={aspectRatio}
        />
        {children}
      </div>
    </div>
  );
}
