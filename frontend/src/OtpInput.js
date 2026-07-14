// import React, { useState, useRef, useEffect } from "react";

// function OtpInput({ length = 6, onComplete }) {
//   const [otp, setOtp] = useState(new Array(length).fill(""));
//   const inputRefs = useRef([]);

//   // Auto-focus the very first input field on page mount
//   useEffect(() => {
//     if (inputRefs.current[0]) {
//       inputRefs.current[0].focus();
//     }
//   }, []);

//   const handleChange = (element, index) => {
//     const value = element.value;
//     if (isNaN(value)) return; // Only allow numeric inputs

//     const newOtp = [...otp];
//     // Take only the last character if user types quickly
//     newOtp[index] = value.substring(value.length - 1);
//     setOtp(newOtp);

//     // Combine and send values back to parent if complete
//     const combinedOtp = newOtp.join("");
//     if (combinedOtp.length === length) {
//       onComplete(combinedOtp);
//     }

//     // Automatically shift focus to the next box
//     if (value && index < length - 1 && inputRefs.current[index + 1]) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     // Move focus back to previous box on Backspace key
//     if (
//       e.key === "Backspace" &&
//       !otp[index] &&
//       index > 0 &&
//       inputRefs.current[index - 1]
//     ) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   return (
//     <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
//       {otp.map((data, index) => (
//         <input
//           key={index}
//           type="text"
//           maxLength={1}
//           value={data}
//           ref={(el) => (inputRefs.current[index] = el)}
//           onChange={(e) => handleChange(e.target, index)}
//           onKeyDown={(e) => handleKeyDown(e, index)}
//           style={{
//             width: "45px",
//             height: "45px",
//             textAlign: "center",
//             fontSize: "1.2rem",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// export default OtpInput;