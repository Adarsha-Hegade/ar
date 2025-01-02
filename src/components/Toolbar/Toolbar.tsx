

// import React from 'react';
// import { useFanData } from '../../hooks/useFanData';
// import { FanCard } from './FanCard';

// interface ToolbarProps {
//   isOpen: boolean;
//   currentFan: string;
// }

// export function Toolbar({ isOpen, currentFan }: ToolbarProps) {
//   const { fanData, loading, error } = useFanData();
//   const currentFanData = fanData?.find((fan) => fan.urlCode === currentFan);

//   if (loading || error || !currentFanData) return null;

//   return (
//     <div
//       className={`fixed bottom-0 left-0 right-0 transform bg-black/80 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
//         isOpen ? 'translate-y-0' : 'translate-y-full'
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4 py-6">
//         {/* Related Models Section */}
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold text-white">You Might also like...</h2>
//         </div>
//         <div className="hide-scrollbar w-100 h-100 flex gap-4 overflow-x-auto pb-4">
//           {currentFanData.related.map((fanName) => (
//             <FanCard key={fanName} fanName={fanName} />
//           ))}
//         </div>

//         {/* Variations Section */}
//         {currentFanData.variations.length > 0 && (
//           <>
//             <div className="mb-4 mt-6">
//               <h2 className="text-xl font-semibold text-white">Also Available in...</h2>
//             </div>
//             <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4">
//               {currentFanData.variations.map((variation) => {
//                 // Find the variation's fan data
//                 const variationFanData = fanData.find((fan) => fan.urlCode === variation);
//                 return (
//                   <FanCard
//                     key={variation}
//                     fanName={variationFanData ? variationFanData.fanFinish : variation}
//                   />
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }





// import React from 'react';
// import { useFanData } from '../../hooks/useFanData';
// import { FanCard } from './FanCard';

// interface ToolbarProps {
//   isOpen: boolean;
//   currentFan: string;
// }

// export function Toolbar({ isOpen, currentFan }: ToolbarProps) {
//   const { fanData, loading, error } = useFanData();
//   const currentFanData = fanData?.find((fan) => fan.urlCode === currentFan);

//   if (loading || error || !currentFanData) return null;

//   return (
//     <div
//       className={`fixed bottom-0 left-0 right-0 transform bg-black/80 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
//         isOpen ? 'translate-y-0' : 'translate-y-full'
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4 py-6">
//         {/* Related Models Section */}
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold text-white">You Might also like...</h2>
//         </div>
//         <div className="hide-scrollbar w-100 h-100 flex gap-4 overflow-x-auto pb-4">
//           {currentFanData.related.map((fanName) => (
//             <FanCard key={fanName} fanUrlCode={fanName} fanDisplayName={fanName} />
//           ))}
//         </div>

//         {/* Variations Section */}
//         {currentFanData.variations.length > 0 && (
//           <>
//             <div className="mb-4 mt-6">
//               <h2 className="text-xl font-semibold text-white">Also Available in...</h2>
//             </div>
//             <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4">
//               {currentFanData.variations.map((variation) => {
//                 // Find the variation's fan data
//                 const variationFanData = fanData.find((fan) => fan.urlCode === variation);
//                 return (
//                   <FanCard
//                     key={variation}
//                     fanUrlCode={variation}
//                     fanDisplayName={
//                       variationFanData?.fanFinish || 'Unknown Variation' // Fallback for undefined
//                     }
//                   />
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

//######################################################################################################################################

// import React from 'react';
// import { useFanData } from '../../hooks/useFanData';
// import { FanCard } from './FanCard';

// interface ToolbarProps {
//   isOpen: boolean;
//   currentFan: string;
// }

// export function Toolbar({ isOpen, currentFan }: ToolbarProps) {
//   const { fanData, loading, error } = useFanData();
//   const currentFanData = fanData?.find((fan) => fan.urlCode === currentFan);

//   if (loading || error || !currentFanData) return null;

//   return (
//     <div
//       className={`fixed bottom-0 left-0 right-0 transform bg-black/80 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
//         isOpen ? 'translate-y-0' : 'translate-y-full'
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4 py-6">
       

//         {/* Variations Section */}
//         {currentFanData.variations.length > 0 && (
//           <>
//             <div className="mb-4 mt-6">
//               <h2 className="text-xl font-semibold text-white">Also Available in...</h2>
//             </div>
//             <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4">
//               {currentFanData.variations.map((variation) => {
//                 const variationFanData = fanData.find((fan) => fan.urlCode === variation);
//                 return (
//                   <FanCard
//                     key={variation}
//                     fanUrlCode={variation}
//                     fanDisplayName={variationFanData?.fanFinish || variation}
//                   />
//                 );
//               })}
//             </div>
//           </>
//         )}
//          {/* Related Models Section */}
//          <div className="mb-4">
//           <h2 className="text-xl font-semibold text-white">You Might also like...</h2>
//         </div>
//         <div className="hide-scrollbar w-100 h-100 flex gap-4 overflow-x-auto pb-4">
//           {currentFanData.related.map((relatedUrlCode) => {
//             const relatedFan = fanData.find((fan) => fan.urlCode === relatedUrlCode);
//             return (
//               <FanCard
//                 key={relatedUrlCode}
//                 fanUrlCode={relatedUrlCode}
//                 fanDisplayName={relatedFan?.modelName || relatedUrlCode} // Use modelName if available
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useFanData } from '../../hooks/useFanData';
import { FanCard } from './FanCard';

interface ToolbarProps {
  isOpen: boolean;
  currentFan: string;
}

export function Toolbar({ isOpen, currentFan }: ToolbarProps) {
  const { fanData, loading, error } = useFanData();
  const currentFanData = fanData?.find((fan) => fan.urlCode === currentFan);

  if (loading || error || !currentFanData) return null;

  const truncateName = (name: string) => {
    // Replace en-dashes and em-dashes with a regular hyphen for consistent splitting
    const normalized = name.replace(/–|—/g, '-');
    // Split by the normalized hyphen and take the first part
    return normalized.split('-')[0].trim();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 transform bg-black/80 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Variations Section */}
        {currentFanData.variations.length > 0 && (
          <>
            <div className="mb-4 mt-6">
              <h2 className="text-xl font-semibold text-white">Also Available in...</h2>
            </div>
            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4">
              {currentFanData.variations.map((variation) => {
                const variationFanData = fanData.find((fan) => fan.urlCode === variation);
                return (
                  <FanCard
                    key={variation}
                    fanUrlCode={variation}
                    fanDisplayName={variationFanData?.fanFinish || 'Unknown Variation'}
                  />
                );
              })}
            </div>
          </>
        )}
        {/* Related Models Section */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">You Might also like...</h2>
        </div>
        <div className="hide-scrollbar w-100 h-100 flex gap-4 overflow-x-auto pb-4">
          {currentFanData.related.map((relatedUrlCode) => {
            const relatedFan = fanData.find((fan) => fan.urlCode === relatedUrlCode);
            const fanName = relatedFan?.modelName ? truncateName(relatedFan.modelName) : relatedUrlCode;
           
            return (
              <FanCard
                key={relatedUrlCode}
                fanUrlCode={relatedUrlCode}
                fanDisplayName={fanName} // Use truncated name
                
              />
             
            );
          })}
        </div>
      </div>
    </div>
  );
}
