import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import AppShell from './AppShell';
export const metadata: Metadata = {
  title: 'Dadi Industries | Ghar Ka Swaad, Authentic Indian Achaar & Pickles',
  description:
    'Discover Dadi Industries — traditional Indian achaar, pickles, chutneys and masalas inspired by the authentic flavours of Indian homes. Ghar Ka Swaad, Har Nivaale Mein.',
  openGraph: {
    title: 'Dadi Industries | Ghar Ka Swaad, Authentic Indian Achaar & Pickles',
    description:
      'Discover Dadi Industries — traditional Indian achaar, pickles, chutneys and masalas inspired by authentic Indian recipes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/fav.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Marcellus&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF7F0] text-[#14241B] font-sans antialiased selection:bg-[#1A5638] selection:text-[#FAF7F0]">
        <AppShell children={children} />
      </body>
    </html>
  );
}
