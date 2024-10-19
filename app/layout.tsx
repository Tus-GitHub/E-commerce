import './globals.css';
import Navbar from './components/navbar';

export const metadata = {
  title: 'E-commerce',
  description: 'Your e-commerce store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
