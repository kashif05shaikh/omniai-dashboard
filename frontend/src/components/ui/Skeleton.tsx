import { motion } from "framer-motion";

export const Skeleton = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`bg-white/5 rounded-md overflow-hidden relative ${className}`}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
  >
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]" />
  </motion.div>
);
