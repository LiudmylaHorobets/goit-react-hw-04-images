import { useEffect } from 'react';

export function Modal({ imageURL, tags, onClose }) {
  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const onEscapeKey = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscapeKey);
    return () => {
      window.removeEventListener('keydown', onEscapeKey);
    };
  }, []);

  return (
    <div className="Overlay" onClick={onOverlayClick}>
      <div className="Modal">
        <img src={imageURL} alt={tags} />
      </div>
    </div>
  );
}
