// 사용 예정

// import React, { useEffect, useState } from "react";
// import "./CustomCursor.css";

// const CustomCursor = () => {
//   const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const cursor = document.createElement("div");
//     cursor.classList.add("magic-wand");
//     document.body.appendChild(cursor);

//     const updateCursor = (e) => {
//       setCursorPos({ x: e.clientX, y: e.clientY });
//       cursor.style.left = `${e.clientX}px`;
//       cursor.style.top = `${e.clientY}px`;
//     };

//     const handleClick = (e) => {
//       const firework = document.createElement("div");
//       firework.classList.add("firework");
//       firework.style.left = `${e.clientX}px`;
//       firework.style.top = `${e.clientY}px`;
//       document.body.appendChild(firework);

//       setTimeout(() => {
//         firework.remove();
//       }, 500);
//     };

//     document.addEventListener("mousemove", updateCursor);
//     document.addEventListener("mousedown", handleClick);

//     return () => {
//       document.body.removeChild(cursor);
//       document.removeEventListener("mousemove", updateCursor);
//       document.removeEventListener("mousedown", handleClick);
//     };
//   }, []);

//   return null;
// };

// export default CustomCursor;
