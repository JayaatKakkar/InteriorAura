import React, { useRef, useEffect } from "react";

const ImageComparison = ({ srcBefore, srcAfter, width = 300, height = 200 }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const sliderRef = useRef(null);
  const clicked = useRef(false);
  const imgWidth = useRef(0);
  const animationRef = useRef(null);
  const directionRef = useRef(1); // 1 for right, -1 for left

  useEffect(() => {
    const img = overlayRef.current;
    const slider = sliderRef.current;
    if (!img || !slider) return;

    const initialize = () => {
      imgWidth.current = img.offsetWidth;
      const imgHeight = img.offsetHeight;

      img.style.width = imgWidth.current / 2 + "px";
      slider.style.top = imgHeight / 2 - slider.offsetHeight / 2 + "px";
      slider.style.left = imgWidth.current / 2 - slider.offsetWidth / 2 + "px";
    };

    const animateSlider = () => {
      const currentWidth = parseFloat(img.style.width);
      const newWidth = currentWidth + directionRef.current * 2;

      if (newWidth >= imgWidth.current || newWidth <= 0) {
        directionRef.current *= -1; // reverse direction
      }

      img.style.width = newWidth + "px";
      slider.style.left = newWidth - slider.offsetWidth / 2 + "px";

      animationRef.current = requestAnimationFrame(animateSlider);
    };

    const slideMove = (e) => {
      if (!clicked.current) return;
      let pos = getCursorPos(e);
      pos = Math.max(0, Math.min(pos, imgWidth.current));
      slide(pos);
    };

    const getCursorPos = (e) => {
      e = e.changedTouches ? e.changedTouches[0] : e;
      const rect = img.getBoundingClientRect();
      return e.pageX - rect.left - window.pageXOffset;
    };

    const slide = (x) => {
      img.style.width = x + "px";
      slider.style.left = x - slider.offsetWidth / 2 + "px";
    };

    const slideReady = (e) => {
      e.preventDefault();
      clicked.current = true;
      cancelAnimationFrame(animationRef.current); // Stop auto animation
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    };

    const slideFinish = () => {
      clicked.current = false;
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
      animationRef.current = requestAnimationFrame(animateSlider); // Resume animation
    };

    initialize();
    animationRef.current = requestAnimationFrame(animateSlider);

    slider.addEventListener("mousedown", slideReady);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("mouseup", slideFinish);
    window.addEventListener("touchend", slideFinish);

    return () => {
      cancelAnimationFrame(animationRef.current);
      slider.removeEventListener("mousedown", slideReady);
      slider.removeEventListener("touchstart", slideReady);
      window.removeEventListener("mouseup", slideFinish);
      window.removeEventListener("touchend", slideFinish);
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
    };
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px"}}>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: `${height}px`,
          maxWidth: `${width}px`,
          userSelect: "none",
          // border: "3px solid #B78D65", // Border around the container
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
            overflow: "hidden",
            height: "100%",
            width: "100%",

          }}
        >
          <img
            src={srcBefore}
            alt="Before"
            style={{
              display: "block",
              height: "100%",
              width: "100%",
              objectFit: "cover",

            }}
          />
        </div>

        {/* Overlay Image */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            overflow: "hidden",
            height: "100%",
            width: "50%",

          }}
        >
          <img
            src={srcAfter}
            alt="After"
            style={{
              display: "block",
              height: "100%",
              width: "100%",
              objectFit: "cover",

            }}
          />
        </div>

        {/* Slider Handle */}
        <div
          ref={sliderRef}
          style={{
            position: "absolute",
            zIndex: 10,
            cursor: "ew-resize",
            width: "40px",
            height: "40px",
            backgroundColor: "#B78D65",
            opacity: 0.7,
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ImageComparison;
