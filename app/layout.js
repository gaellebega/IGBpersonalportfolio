import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata = {
  title: 'Ishami Gaelle Bega — Software Developer',
  description: 'Personal portfolio of Ishami Gaelle Bega, a software developer building modern web experiences.',
  keywords: ['software developer', 'web developer', 'portfolio', 'Next.js', 'React'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Ishami Gaelle Bega — Software Developer',
    description: 'Personal portfolio of Ishami Gaelle Bega.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="noise-overlay">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
