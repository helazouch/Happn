import { useState, useEffect, useRef } from "react";
import "./EventSlider.css";

interface EventSlide {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
}

interface EventSliderProps {
  events: EventSlide[];
  autoSlideInterval?: number;
}

const EventSlider = ({
  events,
  autoSlideInterval = 3500,
}: EventSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (events.length <= 1) return;

    timerRef.current = setInterval(() => {
      goToNext();
    }, autoSlideInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [events.length, currentIndex, autoSlideInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    resetTimer();
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goToNext, autoSlideInterval);
  };

  if (events.length === 0) {
    return <div className="slider-empty">No events to display</div>;
  }

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <div
          className="slider-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {events.map((event) => (
            <div key={event.id} className="slide">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="slide-image"
              />
              <div className="slide-overlay">
                <h3 className="slide-title">{event.title}</h3>
                <p className="slide-date">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="slider-arrow left-arrow" onClick={goToPrevious}>
        ❮
      </button>
      <button className="slider-arrow right-arrow" onClick={goToNext}>
        ❯
      </button>

      <div className="dots-container">
        {events.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventSlider;
