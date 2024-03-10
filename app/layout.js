import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "PropertyPulse",
  description: "Find The Perfect Rental Property",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
