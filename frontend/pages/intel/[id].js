import Layout from '../../components/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiClock, FiUser, FiArrowLeft, FiShield } from 'react-icons/fi';
import Link from 'next/link';

// Dummy Database (Matches the /intel list)
const intelDatabase = {
  "1": {
    title: 'Decoded: The Perfect V60 Extraction Strategy',
    content: `
      ### MISSION BRIEFING
      Field manuals dictate temperature is paramount. Our latest tests confirm a 93°C drop yields the cleanest profile from the Colombian reserves.
      
      ### THE PROTOCOL
      When operating in the field without sophisticated espresso machinery, the V60 drip is your most reliable asset. However, a single degree drop in thermal mass can compromise the mission, introducing sour or highly acidic undertones to your blend.
      
      1. **Target Heat:** Ensure a rolling boil, then down-regulate precisely to 93°C.
      2. **The Bloom:** We deploy exactly 60g of water for 45 seconds to extract trapped CO2 gases, eliminating the camouflage hiding your true extraction notes.
      3. **Yield:** A perfect 1:15 ratio is required. Do not deviate.
      
      ### CONCLUSION
      Maintain focus. Adjust your grind dial microscopically until the brew falls within 3.00 minutes precisely.
    `,
    date: 'Oct 24, 2023',
    author: 'Q-Operative Branch',
    tag: 'Brew Guide',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=2000'
  },
  "2": {
    title: 'Operation Velvet: Sourcing the Ethiopian Heirloom',
    content: `
      ### AFTER-ACTION REPORT
      The recent mission to Yirgacheffe successfully secured 5,000 lbs of exclusive micro-lots. Flavor notes include jasmine and bergamot.
      
      ### DEPLOYMENT IN YIRGACHEFFE
      At 2,100 meters above sea level, tracing the perfect heirloom arabica varietal required heavy negotiation and a deep cover within local farming communities. Our agents identified a specific ridge that receives the optimal morning sun while maintaining cold nighttime temperatures, creating a dense bean structurally designed for light roasting.
      
      We successfully intercepted the entire lot before the commercial buyers arrived. 
      
      Expect notes of stone fruit, vibrant Earl Grey tea, and a velvety finish that masks the caffeine punch perfectly.
    `,
    date: 'Sep 12, 2023',
    author: 'Direct Trade Intel',
    tag: 'Field Report',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=2000'
  },
  "3": {
    title: 'Espresso Calibration: Surviving the 9-Bar Pressure',
    content: `
      ### TACTICAL ASSESSMENT
      When under intense pressure, dial in your grind size. A millimeter adjustment means the difference between mission success and a bitter failure.
      
      ### 9 BARS OF RESISTANCE
      Operating a commercial or high-end domestic espresso machine generates exactly 9 bars of atmospheric pressure against the coffee puck. If your grind is too fine, the puck chokes. Too coarse, and the extraction takes seconds, leaving you with a compromised, highly acidic shot capable of burning a hole right through your briefing files.
      
      Adjust to the exact humidity of your environment. An agent must calibrate their grinder every single morning. Trust no one, not even your presets from yesterday.
    `,
    date: 'Aug 07, 2023',
    author: 'Head Roaster 001',
    tag: 'Tactical Advice',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=2000'
  }
};

export default function IntelLogDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Render loading state while router hydrates
  if (!id) return <Layout><div className="flex h-screen items-center justify-center text-accent"><FiShield className="animate-spin text-4xl" /></div></Layout>;

  const log = intelDatabase[id];

  // 404 handler
  if (!log) return (
    <Layout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-accent text-3xl font-bold font-mono">CLASSIFIED</h1>
        <p className="text-white mt-4">You do not have clearance to view this document.</p>
        <Link href="/intel" className="luxury-button mt-8 inline-block">Return to Base</Link>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="relative overflow-hidden bg-background mb-16 pb-12 border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
          <Image
            src={log.image}
            alt={log.title}
            fill sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-8 flex flex-col items-center text-center max-w-4xl">
          <span className="text-xs font-bold text-background uppercase tracking-widest border border-accent bg-accent px-4 py-1 flex rounded-full mb-6">
            {log.tag}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {log.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-text-secondary text-sm font-mono tracking-wide">
            <span className="flex items-center"><FiClock className="mr-2 text-accent" /> {log.date}</span>
            <span className="flex items-center"><FiUser className="mr-2 text-accent" /> {log.author}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-32 max-w-3xl">
        <Link href="/intel" className="inline-flex items-center text-text-secondary hover:text-accent font-mono text-sm mb-12 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Logs
        </Link>
        
        <div className="prose prose-invert prose-yellow max-w-none text-text-secondary leading-loose text-lg font-serif">
          {/* A simple markdown-like renderer for the content chunks */}
          {log.content.split('\\n').map((paragraph, idx) => {
            if (paragraph.trim().startsWith('###')) {
              return <h3 key={idx} className="text-2xl font-bold font-serif text-white mt-10 mb-4 tracking-tight border-b border-white/5 pb-2">{paragraph.replace('###', '').trim()}</h3>;
            } else if (paragraph.trim().length > 0) {
              return <p key={idx} className="mb-6">{paragraph.trim()}</p>;
            }
            return null;
          })}
        </div>
      </div>
    </Layout>
  );
}
