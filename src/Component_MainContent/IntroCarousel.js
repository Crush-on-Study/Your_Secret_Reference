import React from "react";
import Slider from "react-slick";
import "./IntroCarousel.css";

// 캐러셀 스타일을 위해 필요한 CSS 파일 추가
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const projects = [
  {
    title: "Fear and Greed Index",
    description: "The Best Technical Indicator is the Human indicator. [Using crawling]",
    image: process.env.PUBLIC_URL + "/assets/Component_MainContent_Fear_and_Greed.PNG",
  },
  {
    title: "Auto Trading in Korea Stock Market",
    description: "Kiwoom (One of the Korea investing Company) API Base. [Using Python]",
    image: process.env.PUBLIC_URL + "/assets/Component_MainContent_AutoTrade.jpg",
  },
  {
    title: "How to Make this Webpage",
    description: "My own Website Developing Process introduction is here",
    image: process.env.PUBLIC_URL + "/assets/Component_MainContent_Webpage.jpg",
  },
  {
    title: "What's Next?",
    description: "Coming Soon",
    image: process.env.PUBLIC_URL + "/assets/Component_MainContent_CS.jpg",
  }
];

const IntroCarousel = () => {
  const settings = {
    dots: true, // 하단 네비게이션 버튼
    infinite: true, // 무한 루프
    speed: 500,
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1,
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000, // 3초마다 변경
  };

  return (
    <div className="intro-carousel">
      {/* 자기소개 */}
      <div className="intro-text">
        <h2>👋 Hi, IT's Hyunbin </h2>
        <p>
            <strong>1. Daily Routine :</strong> Game🤩🎮 , Coin Trading😭📉 , Side Project🖥️
        </p>
        <p>
            <strong>2. Job Interest :</strong> IT Project Manager , Front-End Developer , HR Manager
        </p>
        <p>
            <strong>Look around a lot of things on my site!</strong>
        </p>
      </div>

      {/* 프로젝트 캐러셀 */}
      <Slider {...settings} className="carousel">
        {projects.map((project, index) => (
          <div key={index} className="carousel-item">
            <img src={project.image} alt={project.title} className="carousel-image" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default IntroCarousel;
