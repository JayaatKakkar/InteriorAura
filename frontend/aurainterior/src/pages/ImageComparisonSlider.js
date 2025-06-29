import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";


// 🔁 Reusable Component for each slider
const ImageComparison = ({ beforeSrc, afterSrc }) => {
  const overlayRef = useRef(null);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const lineRef = useRef(null); // ← New: reference for the vertical line

  useEffect(() => {
    const img = overlayRef.current;
    const slider = sliderRef.current;
    const container = containerRef.current;
    const line = lineRef.current;

    let clicked = false;

    const initSlider = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;

      img.style.width = w / 2 + "px";
      slider.style.top = h / 2 - slider.offsetHeight / 2 + "px";
      slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
      if (line) {
        line.style.left = w / 2 + "px";
      }
    };

    const getCursorPos = (e) => {
      e = e.changedTouches ? e.changedTouches[0] : e;
      const a = container.getBoundingClientRect();
      let x = e.pageX - a.left - window.pageXOffset;
      return x;
    };

    const slide = (x) => {
      const w = container.offsetWidth;
      if (x < 0) x = 0;
      if (x > w) x = w;
      img.style.width = x + "px";
      slider.style.left = x - slider.offsetWidth / 2 + "px";
      if (line) {
        line.style.left = x + "px";
      }
    };

    const slideMove = (e) => {
      if (!clicked) return;
      slide(getCursorPos(e));
    };

    const slideReady = (e) => {
      e.preventDefault();
      clicked = true;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    };

    const slideFinish = () => {
      clicked = false;
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
    };

    initSlider();

    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    return () => {
      slider.removeEventListener("mousedown", slideReady);
      window.removeEventListener("mouseup", slideFinish);
      slider.removeEventListener("touchstart", slideReady);
      window.removeEventListener("touchend", slideFinish);
    };
  }, []);

  return (
    <div
      className="img-comp-container"
      ref={containerRef}
      style={{
        position: "relative",
        width: "1000px",
        height: "600px",
        overflow: "hidden",
        margin: "0 auto",
        backgroundColor: "#f7f7f7",
      }}
    >
      <div
        className="img-comp-img"
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <img
          src={beforeSrc}
          alt="Before"
          style={{
            width: "1000px",
            height: "600px",
            display: "block",
            // border: "5px solid #f1e1d2",
            // borderRadius: "8px",
          }}
        />
      </div>
      <div
        className="img-comp-img img-comp-overlay"
        ref={overlayRef}
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <img
          src={afterSrc}
          alt="After"
          style={{
            width: "1000px",
            height: "600px",
            display: "block",
            // border: "5px solid #f1e1d2",
            // borderRadius: "8px",
          }}
        />
      </div>

      {/* Vertical comparison line */}
      <div
        className="img-comp-divider"
        ref={lineRef}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: "#ffffff",
          zIndex: 8,
          pointerEvents: "none",
        }}
      />

<div
  className="img-comp-slider"
  ref={sliderRef}
  style={{
    position: "absolute",
    zIndex: 9,
    cursor: "ew-resize",
    width: "60px",
    height: "60px",
    backgroundColor: "#B78D65",
    opacity: 0.85,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "22px",
    fontWeight: "bold",
    gap: "6px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  }}
>
  <span>&#8592;</span>
  <span>|</span>
  <span>&#8594;</span>

        <div
          style={{
            width: "2px",
            height: "30px",
            backgroundColor: "white",
          }}
        ></div>
      </div>
    </div>
  );
};

const ImageComparisonSlider = () => {
  const [activeTab, setActiveTab] = useState("Bedroom");

  const [tabs] = useState([
    {
      name: "Bedroom",
      beforeSrc: "img/room2.jpg",
      afterSrc: "img/room1.jpg",
      icon: "fas fa-bed",
    },
    {
      name: "Living Room",
      beforeSrc: "img/livingroom2.jpg",
      afterSrc: "img/livingroom1.jpg",
      icon: "fas fa-couch",
    },
    {
      name: "Dining Room",
      beforeSrc: "img/dining2.jpg",
      afterSrc: "img/dining1.jpg",
      icon: "fas fa-utensils",
    },
  ]);

  return (
    <div
      className="container-xxl project py-5"
      style={{ backgroundColor: "#f1e1d2" }}
    >
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 600 }}>
          <h1
            className="section-title"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "24px",
              fontWeight: "heavy",
            }}
          >
            What’s the best that could happen?
          </h1>
          <h4
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "36px",
              color: "#555",
            }}
          >
            Explore real client before & afters.
          </h4>
        </div>

        {/* Tabs */}
        <div
          className="tab"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: "10px 0",
            borderRadius: "10px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={activeTab === tab.name ? "active" : ""}
              onClick={() => setActiveTab(tab.name)}
              style={{
                backgroundColor: activeTab === tab.name ? "#B78D65" : "#f1e1d2",
                padding: "16px 20px",
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "30px",
                margin: "0 12px",
                color: activeTab === tab.name ? "white" : "black",
              }}
            >
              <i className={tab.icon} style={{ marginRight: "8px" }}></i>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className="tabcontent"
          style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
        >
          {tabs
            .filter((tab) => tab.name === activeTab)
            .map((tab) => (
              <div key={tab.name}>
                <ImageComparison beforeSrc={tab.beforeSrc} afterSrc={tab.afterSrc} />
              </div>
            ))}
        </div>
      </div><br/><br/><br/>


      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
   <Link to="/getstarted">
       <button
      style={{
        padding: "16px 32px",
        fontSize: "20px",
        borderRadius: "30px",
        backgroundColor: "#B78D65",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontFamily: "Playfair Display, serif",
        fontWeight: "800"
      }}
    >
      GET STARTED
    </button></Link>

</div>

    </div>
  );
};

export default ImageComparisonSlider;
