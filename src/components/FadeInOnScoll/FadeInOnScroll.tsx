import { useEffect, useRef, useState } from 'react';
import styles from './FadeInOnScroll.module.scss';

const FadeInOnScroll = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.4,
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.fadeInSection} ${isVisible ? styles.visible : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
