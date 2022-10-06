import { motion } from "framer-motion";

interface AnimatedPageProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const AnimatedPage = ({ children }: AnimatedPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};
