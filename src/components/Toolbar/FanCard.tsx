



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Fan } from 'lucide-react';

// interface FanCardProps {
//   fanName: string;
// }

// export function FanCard({ fanName }: FanCardProps) {
//   const [imageError, setImageError] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const handleImageLoad = () => {
//     setLoading(false);
//   };

//   const handleImageError = () => {
//     setLoading(false);
//     setImageError(true);
//   };

//   return (
//     <Link
//       to={`/${fanName}`}
//       className="group flex flex-col items-center rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10"
//     >
//       <div className="relative w-40 h-40 overflow-hidden rounded-lg bg-gray-800">
//         {loading && !imageError && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
//           </div>
//         )}
//         {imageError ? (
//           <div className="flex h-full items-center justify-center">
//             <Fan className="h-12 w-12 text-white/50" />
//           </div>
//         ) : (
//           <img
//             src={`/images/${fanName}.png`}
//             alt={fanName}
//             className={`h-auto w-auto object-cover p-3 transition-all duration-300 ${
//               loading ? 'opacity-0' : 'opacity-100'
//             } group-hover:scale-110`}
//             onLoad={handleImageLoad}
//             onError={handleImageError}
//           />
//         )}
//       </div>
//       <p className="mt-2 text-center text-sm font-medium capitalize text-white">
//         {fanName.replace(/-/g, ' ')}
//       </p>
//     </Link>
//   );
// }







// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Fan } from 'lucide-react';

// interface FanCardProps {
//   fanUrlCode: string; // URL-friendly code
//   fanDisplayName: string; // Human-readable name
// }

// export function FanCard({ fanUrlCode, fanDisplayName }: FanCardProps) {
//   const [imageError, setImageError] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const handleImageLoad = () => {
//     setLoading(false);
//   };

//   const handleImageError = () => {
//     setLoading(false);
//     setImageError(true);
//   };

//   return (
//     <Link
//       to={`/${fanUrlCode}`}
//       className="group flex flex-col items-center rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10"
//     >
//       <div className="relative w-40 h-40 overflow-hidden rounded-lg bg-gray-800">
//         {loading && !imageError && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
//           </div>
//         )}
//         {imageError ? (
//           <div className="flex h-full items-center justify-center">
//             <Fan className="h-12 w-12 text-white/50" />
//           </div>
//         ) : (
//           <img
//             src={`/images/${fanUrlCode}.png`} // Correctly references the urlCode
//             alt={fanDisplayName || 'Fan'} // Fallback for undefined display name
//             className={`h-auto w-auto object-cover p-3 transition-all duration-300 ${
//               loading ? 'opacity-0' : 'opacity-100'
//             } group-hover:scale-110`}
//             onLoad={handleImageLoad}
//             onError={handleImageError}
//           />
//         )}
//       </div>
//       <p className="mt-2 text-center text-sm font-medium capitalize text-white">
//         {(fanDisplayName || 'Unknown').replace(/-/g, ' ')} {/* Safe fallback */}
//       </p>
//     </Link>
//   );
// }




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Fan } from 'lucide-react';

interface FanCardProps {
  fanUrlCode: string; // URL-friendly code
  fanDisplayName: string; // Human-readable name
}

export function FanCard({ fanUrlCode, fanDisplayName }: FanCardProps) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setImageError(true);
  };
 // Helper function to truncate fan names
 const truncateName = (name: string) => {
  // Split the name by the first hyphen and return the part before it
  const truncated = name.split(' - ')[0];
  return truncated.trim();
};

  return (
    <Link
      to={`/${fanUrlCode}`}
      className="group flex flex-col items-center rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10"
    >
      <div className="relative w-40 h-40 overflow-hidden rounded-lg bg-gray-800">
        {loading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
        {imageError ? (
          <div className="flex h-full items-center justify-center">
            <Fan className="h-12 w-12 text-white/50" />
          </div>
        ) : (
          <img
            src={`/images/thumbs/${fanUrlCode}.png`}
            alt={fanDisplayName || 'Fan'}
            className={`h-auto w-auto object-cover p-3 transition-all duration-300 ${
              loading ? 'opacity-0' : 'opacity-100'
            } group-hover:scale-110`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      <p className="mt-2 text-center text-sm font-medium capitalize text-white">
        {truncateName(fanDisplayName || 'Unknown')}
      </p>
    </Link>
  );
 
}
