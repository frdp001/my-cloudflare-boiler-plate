import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocumentCardProps {
  title: string;
  description: string;
  image: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title, description, image }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden flex flex-col"
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    <div className="p-4 bg-zinc-50 border-b border-zinc-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
      {/* Mock Document Thumbnail */}
      <div className="w-full h-full bg-white border border-zinc-200 shadow-sm p-4 flex flex-col gap-2 relative">
        <div className="flex justify-between items-start">
          <div className="w-12 h-3 bg-[#d40511] rounded-sm opacity-80" />
          <div className="w-16 h-2 bg-zinc-200 rounded-sm" />
        </div>
        <div className="w-full h-px bg-zinc-100 my-1" />
        <div className="space-y-2">
          <div className="w-3/4 h-2 bg-zinc-100 rounded-sm" />
          <div className="w-1/2 h-2 bg-zinc-100 rounded-sm" />
        </div>
        <div className="mt-4 space-y-1">
          <div className="w-full h-1 bg-zinc-50 rounded-sm" />
          <div className="w-full h-1 bg-zinc-50 rounded-sm" />
          <div className="w-full h-1 bg-zinc-50 rounded-sm" />
        </div>
        <div className="absolute bottom-4 right-4 opacity-10">
          <FileText size={48} />
        </div>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-zinc-900 mb-1">{title}</h3>
      <p className="text-sm text-zinc-500 mb-6">{description}</p>
      <Link 
        to="/login"
        className="mt-auto w-full py-2.5 bg-[#d40511] hover:bg-[#b0040e] text-white font-bold rounded transition-colors flex items-center justify-center gap-2"
      >
        Download
      </Link>
    </div>
  </motion.div>
);

export const HomePage: React.FC = () => {
  const documents = [
    {
      title: "Proforma Invoice",
      description: "Commercial invoice document",
      image: ""
    },
    {
      title: "Packing List",
      description: "Detailed packing information",
      image: ""
    },
    {
      title: "Bill of Lading",
      description: "Shipping contract document",
      image: ""
    },
    {
      title: "Customs Clearance",
      description: "Customs documentation",
      image: ""
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* DHL Header */}
      <div className="w-full bg-[#ffcc00] h-16 flex items-center px-4 md:px-8 border-b-4 border-[#d40511]">
        <div className="flex items-center gap-1">
          <div className="flex flex-col">
            <span className="text-4xl font-black italic tracking-tighter text-[#d40511] leading-none">DHL</span>
            <div className="flex gap-1 mt-0.5">
              <div className="h-1 w-8 bg-[#d40511]" />
              <div className="h-1 w-4 bg-[#d40511]" />
              <div className="h-1 w-2 bg-[#d40511]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-zinc-800 mb-2">Your Documents</h1>
          <p className="text-zinc-600">Click download to access your shipment documents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documents.map((doc, index) => (
            <DocumentCard 
              key={index} 
              title={doc.title} 
              description={doc.description} 
              image={doc.image} 
            />
          ))}
        </div>

        <div className="mt-16 p-6 bg-zinc-50 border border-zinc-200 rounded-lg flex items-start gap-4">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-full">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-1">Secure Document Access</h4>
            <p className="text-sm text-zinc-600 leading-relaxed">
              All documents are encrypted and verified for your security. If you encounter any issues accessing your files, please contact our support team with your tracking number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
