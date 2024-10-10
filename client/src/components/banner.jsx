import React, { useState, useEffect } from "react";
import "../styles/banner.css";
import img1 from "../assets/c.png";
import img2 from "../assets/python.jpeg";
import img3 from "../assets/fullstack.jpeg";
import img4 from "../assets/software.avif";

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 4 ? 1 : prevSlide + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? 4 : prevSlide - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 4 ? 1 : prevSlide + 1));
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const slides = [
    { image: img1, text: "C Language" },
    { image: img2, text: "Python Language" },
    { image: img3, text: "Fullstack" },
    { image: img4, text: "Software" },
  ];

  return (
    <div className="bannerBanner">
      <div className="bannerSlideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`bannerAllSlides ${
              currentSlide === index + 1 ? "bannerActive" : ""
            }`}
          >
            <div className="bannerNumbertext">
              {index + 1}/{slides.length}
            </div>
            <img src={slide.image} alt={slide.text} />
            <div className="bannerText">{slide.text}</div>
          </div>
        ))}
        <div className="bannerPrev" onClick={handlePrevClick}>
          &lt;
        </div>
        <div className="bannerNext" onClick={handleNextClick}>
          &gt;
        </div>
      </div>
      <div className="bannerDots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`bannerDot ${
              currentSlide === index + 1 ? "bannerActive" : ""
            }`}
            onClick={() => handleDotClick(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
