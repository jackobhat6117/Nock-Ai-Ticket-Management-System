// import React from "react";
// import { NextUIProvider, Container, Text, Grid, Card, Button, Spacer } from "@nextui-org/react";
// import { motion } from "framer-motion";

// const LandingPage = () => {
//   return (
//     <NextUIProvider>
//       <Container
//         css={{
//           background: "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
//           minHeight: "100vh",
//           padding: "2rem",
//           color: "white",
//         }}
//       >
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Text h1 css={{ textAlign: "center", fontWeight: "bold" }}>
//             AI-Powered Ticket Management
//           </Text>
//           <Text h4 css={{ textAlign: "center", color: "$gray200" }}>
//             Automate, Organize, and Resolve Tickets Faster with AI
//           </Text>
//         </motion.div>

//         <Spacer y={2} />

//         {/* Chat Feature Showcase */}
//         <Grid.Container gap={2} justify="center">
//           <Grid xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//             >
//               <Card css={{ p: "$6", background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
//                 <Text h4 css={{ color: "white" }}>
//                   Intelligent Chat Assistant
//                 </Text>
//                 <Text css={{ color: "$gray200" }}>
//                   Our AI-powered chat system helps you resolve tickets instantly. It learns from past interactions to provide smarter solutions.
//                 </Text>
//                 <Spacer y={1} />
//                 <Button auto css={{ background: "#6a11cb", color: "white" }}>
//                   Try the Chat Demo
//                 </Button>
//               </Card>
//             </motion.div>
//           </Grid>

//           <Grid xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//             >
//               <Card css={{ p: "$6", background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
//                 <Text h4 css={{ color: "white" }}>
//                   Automated Ticket Routing
//                 </Text>
//                 <Text css={{ color: "$gray200" }}>
//                   Our AI routes tickets to the right team or agent, reducing resolution time and improving efficiency.
//                 </Text>
//                 <Spacer y={1} />
//                 <Button auto css={{ background: "#2575fc", color: "white" }}>
//                   Learn More
//                 </Button>
//               </Card>
//             </motion.div>
//           </Grid>
//         </Grid.Container>

//         <Spacer y={3} />

//         {/* Animated Chat Bubble */}
//         <motion.div
//           style={{
//             position: "fixed",
//             bottom: "2rem",
//             right: "2rem",
//             cursor: "pointer",
//           }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <Card
//             css={{
//               width: "60px",
//               height: "60px",
//               borderRadius: "50%",
//               background: "#6a11cb",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             <Text css={{ color: "white", fontWeight: "bold" }}>💬</Text>
//           </Card>
//         </motion.div>
//       </Container>
//     </NextUIProvider>
//   );
// };

// export default LandingPage;