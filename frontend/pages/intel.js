import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiUser } from 'react-icons/fi';

export default function IntelLogs() {
  const reports = [
    {
      id: 1,
      title: 'Decoded: The Perfect V60 Extraction Strategy',
      excerpt: 'Field manuals dictate temperature is paramount. Our latest tests confirm a 93°C drop yields the cleanest profile from the Colombian reserves.',
      date: 'Oct 24, 2023',
      author: 'Q-Operative Branch',
      tag: 'Brew Guide',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 2,
      title: 'Operation Velvet: Sourcing the Ethiopian Heirloom',
      excerpt: 'The recent mission to Yirgacheffe successfully secured 5,000 lbs of exclusive micro-lots. Flavor notes include jasmine and bergamot.',
      date: 'Sep 12, 2023',
      author: 'Direct Trade Intel',
      tag: 'Field Report',
      image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 3,
      title: 'Espresso Calibration: Surviving the 9-Bar Pressure',
      excerpt: 'When under intense pressure, dial in your grind size. A millimeter adjustment means the difference between mission success and a bitter failure.',
      date: 'Aug 07, 2023',
      author: 'Head Roaster 001',
      tag: 'Tactical Advice',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 mb-16">
        <div className="text-center mb-24">
          <p className="text-accent font-semibold tracking-widest uppercase mb-4">Classified Documents</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            Intel Logs.
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Review the latest tactical briefs, field reports, and extraction strategies drafted directly from our roastery headquarters.
          </p>
        </div>

        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {reports.map((report) => (
            <div key={report.id} className="group flex flex-col md:flex-row bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-glass hover:border-accent/30 transition-all duration-300">
              
              <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                <Image 
                  src={report.image} 
                  alt={report.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 40vw" 
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-accent uppercase tracking-widest border border-accent/20 bg-accent/5 px-3 py-1 rounded-full">
                    {report.tag}
                  </span>
                  <div className="flex items-center text-text-secondary text-xs font-mono">
                    <FiClock className="mr-2" />
                    {report.date}
                  </div>
                </div>

                <Link href={`/intel/${report.id}`}>
                  <h2 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-accent transition-colors cursor-pointer">
                    {report.title}
                  </h2>
                </Link>
                
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {report.excerpt}
                </p>

                <div className="flex items-center text-sm font-bold text-white/70 tracking-wide uppercase">
                  <FiUser className="mr-3 text-accent" />
                  By: {report.author}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
