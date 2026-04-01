// "use client";

// export default function SectionBadge({ children, icon: Icon, className = "" }) {
//   return (
//     <div className={`flex items-center gap-3 ${className}`}>
//       {Icon && (
//         <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
//           <Icon className="text-sm" />
//         </span>
//       )}

//       <span className="uppercase tracking-[0.3em] text-xs font-semibold text-primary">
//         {children}
//       </span>
//     </div>
//   );
// }

"use client";

export default function SectionBadge({ children, icon: Icon, className = "" }) {
  return (
    <div
      className={`
      inline-flex items-center gap-3 px-4 py-2 rounded-full
      bg-primary/5 text-primary
      border border-primary/20
      transition-all duration-300
      ${className}
      `}
    >
      {Icon && (
        <span
          className="
          flex items-center justify-center
          w-9 h-9 rounded-full
          bg-primary/10
          text-primary
          ring-1 ring-primary/20
          transition-all duration-300
          group-hover:bg-primary/20
          "
        >
          <Icon className="text-[15px]" />
        </span>
      )}

      <span
        className="
        uppercase tracking-[0.28em]
        text-[11px] font-semibold
        text-primary
        "
      >
        {children}
      </span>
    </div>
  );
}
