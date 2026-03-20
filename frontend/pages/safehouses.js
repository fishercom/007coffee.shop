import Layout from '../components/Layout';
import Image from 'next/image';
import { FiMapPin } from 'react-icons/fi';

export default function Safehouses() {
  const safehouses = [
    {
      city: 'London HQ',
      codename: 'Vauxhall Station',
      address: '85 Albert Embankment',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800'
    },
    {
      city: 'Paris',
      codename: 'Champs-Élysées Ops',
      address: '42 Avenue Montaigne',
      status: 'Restricted Access',
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800'
    },
    {
      city: 'New York',
      codename: 'Madison Drop',
      address: '768 Madison Avenue',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 mb-16">
        <div className="text-center mb-20">
          <p className="text-accent font-semibold tracking-widest uppercase mb-4">Location Grid</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            Global Safehouses.
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Designated refueling stations and barista briefings. When you need physical extraction or a handcrafted pour-over, locate your nearest active safehouse below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safehouses.map((house, idx) => (
            <div key={idx} className="bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-glass group hover:border-accent/30 transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 w-full">
                <Image 
                  src={house.image} 
                  alt={house.city} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw" 
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-700"
                  priority={true}
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-accent border border-accent/20 uppercase tracking-widest">
                  {house.status}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold font-serif text-white mb-1">{house.city}</h3>
                <p className="text-accent text-sm tracking-widest uppercase mb-4 opacity-80">{house.codename}</p>
                <div className="flex items-center text-text-secondary">
                  <FiMapPin className="text-accent mr-3" />
                  <span className="font-mono">{house.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
