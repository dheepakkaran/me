import { HelmetProvider } from 'react-helmet-async';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SEO } from './components/SEO';
import { ErrorBoundary } from './components/ErrorBoundary';


export function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SEO 
          title="Dheepak karan - Creative Developer Portfolio"
          description="Portfolio of Dheepak Developer, showcasing creative development and innovative solutions"
        />
        <div className="bg-black min-h-screen">
          <main>
            <Hero />
            <About />
            {/* <Skills /> */}
            {/* <Work /> */}
            {/* <Contact /> */}
          </main>
          {/* <Footer /> */}
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}