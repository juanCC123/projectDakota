import "./globals.css";
import localFont from 'next/font/local'

const fontRancho = localFont({ src: '/PlayfairDisplay-Italic-VariableFont_wght.ttf' })


export const metadata = {
  title: "Dakota Next App",
  description: "Generated by Dakota Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={fontRancho.className}>{children}</body>
    </html>
  );
}
