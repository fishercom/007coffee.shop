import Layout from '../components/Layout';
import Image from 'next/image';
import { FiTarget, FiShield, FiCrosshair } from 'react-icons/fi';

export default function Agency() {
  return (
    <Layout>
      <div className="relative overflow-hidden bg-background mb-16 border-b border-white/5 pb-24">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000"
            alt="MI6 Coffee Roasting HQ"
            fill sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-32 flex flex-col items-center text-center">
          <p className="text-accent font-semibold tracking-widest uppercase mb-4">Command Center</p>
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6 tracking-tight">
            The Agency.
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl mb-10 leading-relaxed">
            Founded in the shadows, 007 Coffee is an elite collective of master roasters, Q-graders, and supply-chain operatives. Our mission is simple: intercept the world's most exclusive coffee lots before they reach the public market, and deliver them directly to our network of agents.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-surface border border-white/5 p-10 rounded-2xl hover:border-accent/40 transition-colors shadow-glass group">
            <FiTarget className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-4">Precision Extraction</h3>
            <p className="text-text-secondary leading-relaxed">
              Every bean is algorithmically profiled and precision-roasted to maximize origin characteristics. We leave nothing to chance.
            </p>
          </div>
          
          <div className="bg-surface border border-accent/30 p-10 rounded-2xl shadow-gold group">
            <FiShield className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-4">The Guarantee</h3>
            <p className="text-white leading-relaxed">
              Total operational security. If a roast does not meet your exacting standards, our operatives will dispatch a replacement lot immediately—no questions asked.
            </p>
          </div>
          
          <div className="bg-surface border border-white/5 p-10 rounded-2xl hover:border-accent/40 transition-colors shadow-glass group">
            <FiCrosshair className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-4">Tactical Sourcing</h3>
            <p className="text-text-secondary leading-relaxed">
              We deploy field agents to high-altitude farms globally, ensuring direct-trade ethics and zero compromises on raw material quality.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
