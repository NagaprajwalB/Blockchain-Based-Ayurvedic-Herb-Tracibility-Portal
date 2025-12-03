import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';

// Hero background image - using external URL
const heroBackgroundStyle = {
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const NewHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative" style={heroBackgroundStyle}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-amber-900/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Authentic Ayurvedic Herbs,<br />
            <span className="text-amber-400">Verified on Blockchain</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-xl text-gray-200">
            From geo-tagged harvest to your home – ensuring authenticity and quality through blockchain verification.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#shop-now-1" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
            >Shop now</a>
            <Link
              to="/auth?role=provider"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              Become a Provider
            </Link>
          </div>
          
          {/* Trust Badge */}
          <div className="mt-8 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <div className="bg-green-100 p-1 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <span className="ml-2 text-sm font-medium text-white">Trusted by AYUSH-certified providers</span>
          </div>
        </div>
      </div>
      
      {/* Featured Categories Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Categories
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Explore our curated selection of authentic Ayurvedic herbs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Roots & Barks Category Card */}
            <div className="group relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2024/08/06045348/ashwagandha-375x229.webp" 
                  alt="Roots & Barks" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Roots & Barks 🌿</h3>
                <p className="text-gray-200 mb-4 text-sm">Traditional roots and barks with powerful healing properties</p>
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Link 
                    to="/categories/roots-barks" 
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Leaves & Herbs Category Card */}
            <div className="group relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202506/0004/img268.jpg" 
                  alt="Leaves & Herbs" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Leaves & Herbs 🍃</h3>
                <p className="text-gray-200 mb-4 text-sm">Fresh and dried leaves with therapeutic benefits</p>
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Link 
                    to="/categories/leaves-herbs" 
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Flowers & Fruits Category Card */}
            <div className="group relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu05C1_ZA0-pX8R0SDkk3DsxYcvEXoG1Dbuw&s" 
                  alt="Flowers & Fruits" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Flowers & Fruits 🌸</h3>
                <p className="text-gray-200 mb-4 text-sm">Botanical treasures with unique medicinal properties</p>
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Link 
                    to="/categories/flowers-fruits" 
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Ready Formulations Category Card */}
            <div className="group relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8ZiPOcq-5FFEiKYDxqZB7-1uEfyfD2rQkQ&s" 
                  alt="Ready Formulations" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Ready Formulations 🌱</h3>
                <p className="text-gray-200 mb-4 text-sm">Traditional blends prepared according to ancient texts</p>
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Link 
                    to="/categories/formulations" 
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* View All Categories Button */}
          <div className="text-center">
            <Link 
              to="/categories" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              View All Categories
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Featured Products Section */}
      <div id="featured-products" className="py-16 bg-gray-50" id="shop-now-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Discover our best-selling Ayurvedic herbs and formulations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Product Card 1 */}
            <ProductCard 
              image="https://lloydspharmacy.com/cdn/shop/articles/Ashwagandha.jpg?v=1622033164"
              name="Ashwagandha Root Powder"
              provider="Himalayan Herbals"
              price="₹450.00"
              quantity="100g"
              verified={true}
            />
            
            {/* Product Card 2 */}
            <ProductCard 
              image="https://dwibhashi.co.in/cdn/shop/articles/triphala_ceb7a881-c751-4f03-88c3-69736f992be1.jpg?v=1738677803"
              name="Triphala Powder"
              provider="Kerala Ayurveda"
              price="₹350.00"
              quantity="200g"
              verified={true}
            />
            
            {/* Product Card 3 */}
            <ProductCard 
              image="https://www.greendna.in/cdn/shop/products/brahmileaves_1200x1200.jpg?v=1592237079"
              name="Brahmi Leaves"
              provider="Organic Herbs"
              price="₹280.00"
              quantity="50g"
              verified={true}
            />
            
            {/* Product Card 4 */}
            <ProductCard 
              image="https://static.toiimg.com/thumb/imgsize-23456,msid-116233011,width-600,resizemode-4/116233011.jpg"
              name="Chyawanprash"
              provider="Dabur Ayurveda"
              price="₹550.00"
              quantity="500g"
              verified={true}
            />
          </div>
          
          <div className="text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white shadow-sm text-base font-medium rounded-md transition-colors"
            >
              View All Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
       <div className="py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
               How It Works
             </h2>
             <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
               Our blockchain-powered verification process ensures authenticity at every step
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Step 1 */}
             <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center relative">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               </div>
               <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
               <h3 className="text-xl font-bold mb-3">Provider Registration</h3>
               <p className="text-gray-600">Ayurvedic herb providers register on our platform with verified credentials and AYUSH certification</p>
             </div>
             
             {/* Step 2 */}
             <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center relative">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                 </svg>
               </div>
               <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
               <h3 className="text-xl font-bold mb-3">Product Verification</h3>
               <p className="text-gray-600">Products undergo geo-tagging at collection and quality testing in certified labs before blockchain verification</p>
             </div>
             
             {/* Step 3 */}
             <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center relative">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                 </svg>
               </div>
               <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
               <h3 className="text-xl font-bold mb-3">Consumer Purchase</h3>
               <p className="text-gray-600">Consumers scan QR codes to verify product authenticity and complete secure blockchain-backed purchases</p>
             </div>
           </div>
           
           <div className="text-center mt-10">
             <Link 
               to="/how-it-works" 
               className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
             >
               Learn More
               <ArrowRight className="h-5 w-5 ml-2" />
             </Link>
           </div>
         </div>
       </div>
       
       {/* Trust Section */}
       <div className="py-16 bg-gray-50 border-t border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-10">
             <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
               Trusted Partners
             </h2>
             <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
               We collaborate with leading organizations to ensure quality and authenticity
             </p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
             {/* AYUSH Logo */}
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-32 w-full flex items-center justify-center">
               <img 
                 src="https://cdn.expresspharma.in/wp-content/uploads/2019/07/23170458/Ministry-of-AYUSH-logo-1-3.jpg" 
                 alt="AYUSH Ministry" 
                 className="max-h-20 max-w-full"
               />
             </div>
             
             {/* Lab Partner 1 */}
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-32 w-full flex items-center justify-center">
               <img 
                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDZXF429luuwmlgSWM-sBKevDQsFB41mO5xA&s" 
                 alt="Quality Testing Lab" 
                 className="max-h-20 max-w-full"
               />
             </div>
             
             {/* Lab Partner 2 */}
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-32 w-full flex items-center justify-center">
               <img 
                 src="https://www.cari.gov.in/image/CCRAS_Logo.jpg" 
                 alt="Research Institute" 
                 className="max-h-20 max-w-full"
               />
             </div>
             
             {/* Blockchain Badge */}
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-32 w-full flex items-center justify-center">
               <div className="flex flex-col items-center">
                 <Shield className="h-12 w-12 text-green-600 mb-2" />
                 <span className="text-sm font-medium text-gray-900">Blockchain Verified</span>
               </div>
             </div>
           </div>
           
           <div className="mt-12 text-center">
             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
               Every product on our platform is verified through our rigorous blockchain-based authentication process, ensuring you receive genuine Ayurvedic herbs with complete traceability.
             </p>
           </div>
         </div>
       </div>
       
       {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-300 mb-4">
                AYU is a blockchain-powered marketplace connecting authentic Ayurvedic herb providers with consumers seeking quality products with complete traceability.
              </p>
              <Link to="/about" className="text-green-400 hover:text-green-300 inline-flex items-center">
                Learn more about our mission
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
                </li>
                <li>
                  <Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link>
                </li>
                <li>
                  <Link to="/providers" className="text-gray-300 hover:text-white">Providers</Link>
                </li>
                <li>
                  <Link to="/blockchain" className="text-gray-300 hover:text-white">Blockchain Verification</Link>
                </li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-300 hover:text-white">Shipping Policy</Link>
                </li>
                <li>
                  <Link to="/refund" className="text-gray-300 hover:text-white">Refund Policy</Link>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-300">
                <p className="mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Ayurveda Way, Wellness District
                </p>
                <p className="mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </p>
                <p className="mb-4 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@ayuherbs.com
                </p>
                <Link to="/contact" className="text-green-400 hover:text-green-300">
                  Send us a message
                </Link>
              </address>
            </div>
          </div>
          
          {/* Social Media & Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AYU Herbs. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewHomePage;