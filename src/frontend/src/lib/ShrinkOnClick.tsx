
import React, { useEffect } from 'react';

const ShrinkOnClick: React.FC = () => {
  useEffect(() => {
    const handleShrink = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains('shrink-on-click')) {
        // Check if the button is already scaled down, if so, reset it
        if (target.style.transform === 'scale(0.95)') {
          target.style.transform = 'scale(1)';
        } else {
          // Otherwise, apply the shrink effect
          target.style.transition = 'transform 0.2s ease';
          target.style.transform = 'scale(0.95)';
        }
      }
    };

    // Add event listener to the document to handle clicks on any element with the class
    document.addEventListener('click', handleShrink);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('click', handleShrink);
    };
  }, []);

  return null; // This component doesn't render anything but sets up the behavior
};

export default ShrinkOnClick;

