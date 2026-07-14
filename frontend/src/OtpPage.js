// import React, { useState } from "react";
// import OtpInput from "./OtpInput.js";

// function OtpPage() {
//   const [step, setStep] = useState(1); // 1: Send Request, 2: Verify Code
//   const [contactInfo, setContactInfo] = useState("");
//   const [loading, setLoading] = useState(false);

//   // STEP 1: Request OTP from backend API
//   const handleRequestOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Replace with your real backend endpoint URL
//       // const response = await fetch("https://protonpulse.in", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ contact: contactInfo }),
//       // });
//       // ===========================
//       const response = await fetch("http://localhost:3001/api/send-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: "test@gmail.com",
//         }),
//       });
//       // -----------------------------------
//       if (response.ok) {
//         setStep(2); // Move to OTP input view
//       } else {
//         alert("Failed to send OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2: Send entered OTP back to backend to authorize
//   const handleVerifyOtp = async (otpCode) => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://yourdomain.com", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ contact: contactInfo, code: otpCode }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Verification Successful! Token received.");
//         // Save session tokens or redirect user here
//       } else {
//         alert(data.message || "Invalid OTP code.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "400px",
//         margin: "50px auto",
//         textAlign: "center",
//         fontFamily: "sans-serif",
//         background: "#f9f9f9",
//         borderRadius: "8px",
//         border: "1px solid #ddd",
//         padding: "10px",
//         // boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h2>Secure Portal Verification</h2>

//       {step === 1 ? (
//         <form onSubmit={handleRequestOtp}>
//           <p>Enter your email or phone to receive a login code</p>
//           <input
//             type="text"
//             placeholder="e.g., user@example.com"
//             value={contactInfo}
//             onChange={(e) => setContactInfo(e.target.value)}
//             required
//             style={{
//               width: "80%",
//               padding: "10px",
//               marginBottom: "15px",
//               borderRadius: "4px",
//               border: "1px solid #aaa",
//             }}
//           />
//           <br />
//           <button
//             type="submit"
//             disabled={loading}
//             style={{ padding: "10px 20px", cursor: "pointer" }}
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </form>
//       ) : (
//         <div>
//           <p>
//             A verification code has been sent to <strong>{contactInfo}</strong>
//           </p>
//           <OtpInput length={6} onComplete={handleVerifyOtp} />
//           {loading && <p style={{ marginTop: "15px" }}>Verifying code...</p>}
//           <button
//             onClick={() => setStep(1)}
//             style={{
//               marginTop: "20px",
//               background: "none",
//               border: "none",
//               color: "#0066cc",
//               cursor: "pointer",
//               textDecoration: "underline",
//             }}
//           >
//             Change contact info
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default OtpPage;
