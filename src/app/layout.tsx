import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";
import NavbarComponent from "./components/Navbar";
export const metadata = {
  title: "K-Chatbot",
  description: "A simple ai chatbot you can talk to",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NavbarComponent />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
