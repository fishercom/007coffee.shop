import Layout from '../components/Layout';
import { FiCheckCircle, FiShield, FiCoffee } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function Subscriptions() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background mb-16 border-b border-white/5">
        <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <FiCoffee className="w-12 h-12 text-accent mb-6" />
          <p className="text-accent font-semibold tracking-widest uppercase mb-3">Double-O Delivery</p>
          <h1 className="text-5xl font-bold text-white mb-6">
            Never Run Out of Intel.
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-8">
            Subscribe to your favorite roasts and have them delivered directly to your safehouse. Modify, pause, or cancel your orders at any time.
          </p>
          <div className="flex space-x-4">
            <Link href="#tiers" className="luxury-button">
              View Plans
            </Link>
          </div>
        </div>
      </div>

      <div id="tiers" className="container mx-auto px-4 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Select Your Clearance Level</h2>
          <p className="text-text-secondary">Save 15% on every bag, plus free priority shipping.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Operative Tier */}
          <div className="bg-surface border border-white/5 rounded-2xl p-8 hover:shadow-glass hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Level 1: Operative</h3>
            <p className="text-text-secondary mb-6 text-sm">Perfect for the occasional drinker.</p>
            <div className="mb-6">
              <span className="text-4xl font-serif text-accent font-bold">$18</span>
              <span className="text-text-secondary"> / bag</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-sm text-text-secondary"><FiCheckCircle className="mr-3 text-accent"/> 1 Bag per month</li>
              <li className="flex items-center text-sm text-text-secondary"><FiCheckCircle className="mr-3 text-accent"/> Standard Roasts</li>
              <li className="flex items-center text-sm text-text-secondary"><FiCheckCircle className="mr-3 text-accent"/> Free local shipping</li>
            </ul>
            <button className="w-full bg-transparent border border-accent text-accent py-3 rounded hover:bg-accent hover:text-background font-bold transition-all">Select Plan</button>
          </div>

          {/* Agent Tier (Highlighted) */}
          <div className="bg-surface-hover border border-accent rounded-2xl p-8 transform md:-translate-y-4 shadow-gold relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-background text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Level 2: Special Agent</h3>
            <p className="text-text-secondary mb-6 text-sm">Our recommended daily protocol.</p>
            <div className="mb-6">
              <span className="text-4xl font-serif text-accent font-bold">$34</span>
              <span className="text-text-secondary"> / 2 bags</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-sm text-white"><FiCheckCircle className="mr-3 text-accent"/> 2 Bags per month</li>
              <li className="flex items-center text-sm text-white"><FiCheckCircle className="mr-3 text-accent"/> Access to Limited Edition Blends</li>
              <li className="flex items-center text-sm text-white"><FiCheckCircle className="mr-3 text-accent"/> Priority Next-Day Shipping</li>
              <li className="flex items-center text-sm text-white"><FiCheckCircle className="mr-3 text-accent"/> Early access to new drops</li>
            </ul>
            <button className="luxury-button w-full">Select Plan</button>
          </div>

          {/* Double-O Tier */}
          <div className="bg-surface border border-white/5 rounded-2xl p-8 hover:shadow-glass hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Level 3: Double-O</h3>
            <p className="text-text-secondary mb-6 text-sm">For the ultimate caffeine enthusiast.</p>
            <div className="mb-6">
              <span className="text-4xl font-serif text-accent font-bold">$60</span>
              <span className="text-text-secondary"> / 4 bags</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-sm text-text-secondary"><FiCheckCircle className="mr-3 text-accent"/> 4 Bags per month</li>
              <li className="flex items-center text-sm text-text-secondary"><FiCheckCircle className="mr-3 text-accent"/> All Coffee Tiers Included</li>
              <li className="flex items-center text-sm text-text-secondary"><FiCheckCircle className="mr-3 text-accent"/> VIP Priority Shipping</li>
              <li className="flex items-center text-sm text-text-secondary"><FiShield className="mr-3 text-accent"/> Dedicated Elite Support</li>
            </ul>
            <button className="w-full bg-transparent border border-accent text-accent py-3 rounded hover:bg-accent hover:text-background font-bold transition-all">Select Plan</button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
