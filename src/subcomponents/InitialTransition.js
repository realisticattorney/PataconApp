const content = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 2.8 },
  },
};

const app = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const products = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export default function IndexPage() {
  return (
    <motion.section exit={{ opacity: 0 }}>
      <InitialTransition />

      <motion.div
        initial="initial"
        animate="animate"
        variants={app}
        className="space-y-12"
      >
        <motion.h1 variants={title} className="text-6xl font-black text-center">
          Welcome to tailstore!
        </motion.h1>

        <motion.section
          variants={products}
          className="text-gray-700 body-font"
        ></motion.section>
      </motion.div>
    </motion.section>
  );
}
