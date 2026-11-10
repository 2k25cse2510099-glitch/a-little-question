import { motion } from 'framer-motion'
export default function Envelope({ onOpen }) {
  return <motion.button className="envelope-button" onClick={onOpen} aria-label="Open the letter"
    initial={{ opacity: 0, y: 30, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, delay: .25, ease: [.2,.7,.2,1] }}>
    <span className="envelope-glow" />
    <span className="envelope">
      <span className="env-back" />
      <span className="env-letter"><span className="letter-line" /><span className="letter-line short" /><span className="letter-seal">♡</span></span>
      <span className="env-front" />
      <span className="env-flap" />
      <span className="env-stamp">A</span>
    </span>
    <span className="envelope-caption">a little something, for you</span>
  </motion.button>
}
