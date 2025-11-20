export default function Footer() {
  return (
    <footer className="bg-primary mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-white text-sm font-sans">
                &copy; {new Date().getFullYear()} The Gilded Emporium. All rights reserved.
            </p>
        </div>
    </footer>
  );
}
