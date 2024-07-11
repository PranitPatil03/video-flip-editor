// import { ChevronDown } from 'lucide-react'; 

// const CustomSelect = ({ value, onChange }) => {
//   const options = [
//     { value: 0.5, label: '0.5x' },
//     { value: 1, label: '1x' },
//     { value: 1.5, label: '1.5x' },
//     { value: 2, label: '2x' },
//   ];

//   return (
//     <div className="relative w-24">
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="appearance-none w-full bg-gray-800 text-white py-2 px-3 pr-8 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
//         <ChevronDown className="h-4 w-4" />
//       </div>
//     </div>
//   );
// };

// export default CustomSelect;