import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "GitHall",
  description: "An open source alternative to GitHub  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
