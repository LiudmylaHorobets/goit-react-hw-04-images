import { useEffect, useCallback } from 'react';

export function Modal({ imageURL, tags, onClose }) {
  const onOverlayClick = useCallback(
    e => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    },
    [onClose]
  );

  const onEscapeKey = useCallback(
    event => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', onEscapeKey);
    return () => {
      window.removeEventListener('keydown', onEscapeKey);
    };
  }, [onEscapeKey]);

  return (
    <div className="Overlay" onClick={onOverlayClick}>
      <div className="Modal">
        <img src={imageURL} alt={tags} />
      </div>
    </div>
  );
}
