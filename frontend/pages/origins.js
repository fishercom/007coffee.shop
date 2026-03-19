import Layout from '../components/Layout';
import Image from 'next/image';

export default function Origins() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background mb-16 border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=80&w=2070&auto=format&fit=crop"
            alt="Coffee Origins Map"
            fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 flex flex-col items-start">
          <p className="text-accent font-semibold tracking-widest uppercase mb-3">Geographic Briefing</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            The Bean's <span className="text-accent">Origin</span>.
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-8 leading-relaxed">
            Every cup has a history. Our elite beans are sourced under heavy surveillance from high-altitude estates globally, ensuring only top-tier profiles make it into your cup. Review the intel below.
          </p>
        </div>
      </div>

      {/* Intelligence Cards */}
      <div className="container mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="bg-surface rounded-2xl overflow-hidden shadow-glass border border-white/5 group">
            <div className="h-64 relative">
              <Image 
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=2000&auto=format&fit=crop" 
                alt="Ethiopian Highlands" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-serif font-bold text-white mb-3">Dossier: Ethiopia Yirgacheffe</h3>
              <p className="text-text-secondary mb-4 leading-relaxed">
                Known as the birthplace of coffee, these highlands provide beans with bright, tea-like complexities and profound floral aromas. Our operatives have secured exclusive rights to micro-lots that consistently cup above 88 points.
              </p>
              <div className="flex gap-4">
                <span className="bg-white/5 text-xs text-white px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">Citrus</span>
                <span className="bg-white/5 text-xs text-white px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">Jasmine</span>
                <span className="bg-white/5 text-xs text-white px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">Light Body</span>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl overflow-hidden shadow-glass border border-white/5 group">
            <div className="h-64 relative">
              <Image 
                src="https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=2071&auto=format&fit=crop" 
                alt="Colombian Andes" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-serif font-bold text-white mb-3">Dossier: Colombian Supremo</h3>
              <p className="text-text-secondary mb-4 leading-relaxed">
                An absolute classic in the field. Colombian beans offer unparalleled balance. Grown under the shade canopy of the Andes, this roast is the reliable choice for steady operations requiring low acidity and deep chocolate notes.
              </p>
              <div className="flex gap-4">
                <span className="bg-white/5 text-xs text-white px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">Dark Chocolate</span>
                <span className="bg-white/5 text-xs text-white px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">Walnut</span>
                <span className="bg-white/5 text-xs text-white px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">Medium Body</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
