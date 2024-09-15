import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lama Dev Blog App",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      {/* <link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossorigin="anonymous"/> */}
{/* <Script defer src="https://www.googletagmanager.com/gtag/js?id=G-2R4K5K0HNK"></Script>
<Script async id="google-analytics">
  {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2R4K5K0HNK');
  `}
</Script> */}
{/* <Script src="https://code.responsivevoice.org/responsivevoice.js?key=xhb4DWWR"></Script> */}
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
