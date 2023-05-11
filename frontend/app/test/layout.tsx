// "use client";
// import { Nav } from "@components/layout/Nav";
// import React from "react";
// import "../styles/globals.css";
// import dynamic from "next/dynamic";

// const NavWithoutSsr = dynamic(
//   import("@components/layout/Nav").then((m) => m.Nav),
//   { ssr: false }
// );

// const Layout = ({ children }) => {
//   return (
//     <html lang="en">
//       <body>
//         <NavWithoutSsr />
//         <section>{children}</section>
//       </body>
//     </html>
//   );
// };

// export default Layout;
