import { useState, useEffect, useRef } from "react";
import "./EventSlider.css";
import { Version } from "../../../DataLayer/models/Version";

interface EventSliderProps {
  versions: Version[]; // Changed from `events` to `versions`
  autoSlideInterval?: number;
}

const EventSlider = ({
  versions = [], // Default to an empty array if undefined
  autoSlideInterval = 3500,
}: EventSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (versions.length <= 1) return;

    timerRef.current = setInterval(() => {
      goToNext();
    }, autoSlideInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versions.length, currentIndex, autoSlideInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? versions.length - 1 : prev - 1));
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === versions.length - 1 ? 0 : prev + 1));
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

  if (versions.length === 0) {
    return <div className="slider-empty">No versions to display</div>;
  }

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <div
          className="slider-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {versions.map((version) => (
            <div key={version.id_version} className="slide">
              <img
                src={version.img || "/LunarHack.jpg"}
                alt={version.versionName}
                className="slide-image"
              />
              <div className="slide-overlay">
                <h3 className="slide-title">{version.versionName}</h3>
                <p className="slide-date">
                  {version.date instanceof Date
                    ? version.date.toLocaleDateString()
                    : new Date(
                        version.date.seconds * 1000
                      ).toLocaleDateString()}
                </p>
                <p className="slide-description">
                  {version.specificDescription}
                </p>
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
        {versions.map((_, idx) => (
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
