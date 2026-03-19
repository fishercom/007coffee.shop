export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-text-secondary text-sm font-sans tracking-wide">
                &copy; {new Date().getFullYear()} 007 COFFEE. For Your Eyes Only. All rights reserved.
            </p>
        </div>
    </footer>
  );
}
