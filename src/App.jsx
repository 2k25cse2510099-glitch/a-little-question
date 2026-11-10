import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX, ArrowDown, Sparkles, Heart, RotateCcw } from 'lucide-react'
import gsap from 'gsap'
import { siteConfig as c } from './config'
import Atmosphere from './components/Atmosphere'
import Petals from './components/Petals'
import Envelope from './components/Envelope'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .8, ease: [.2,.7,.2,1] } } }

function MusicToggle() {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)
  const toggle = async () => {
    if (!c.backgroundMusic) {
      alert('To enable music, add a royalty-free audio file and set backgroundMusic in src/config.js.')
      return
    }
    if (!audio.current) audio.current = new Audio(c.backgroundMusic)
    audio.current.loop = true
    audio.current.volume = .22
    if (playing) { audio.current.pause(); setPlaying(false) }
    else { try { await audio.current.play(); setPlaying(true) } catch { setPlaying(false) } }
  }
  useEffect(() => () => audio.current?.pause(), [])
  return <button className="music-toggle" onClick={toggle} aria-pressed={playing} aria-label={playing ? 'Turn music off' : 'Turn music on'}>
    {playing ? <Volume2 size={15} /> : <VolumeX size={15} />} <span>{playing ? 'Music on' : 'Sound off'}</span>
  </button>
}

function App() {
  const [opened, setOpened] = useState(false)
  const [answer, setAnswer] = useState('')
  const [petalBurst, setPetalBurst] = useState(false)
  const letterRef = useRef(null)
  const questionRef = useRef(null)
  const name = c.herName ? `, ${c.herName}` : ''

  const openLetter = () => {
    setOpened(true)
    window.setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })
    }, 950)
  }
  const choose = (value) => {
    setAnswer(value)
    if (value === 'yes') {
      setPetalBurst(true)
      window.setTimeout(() => setPetalBurst(false), 4800)
    }
  }
  const reset = () => { setAnswer(''); setOpened(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  useEffect(() => {
    if (opened && letterRef.current) {
      gsap.fromTo(letterRef.current.querySelectorAll('.letter-paragraph'),
        { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .9, stagger: .55, delay: .25, ease: 'power2.out' })
    }
  }, [opened])

  useEffect(() => {
    if (opened) {
      const el = questionRef.current
      if (!el) return
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('question-visible')
          observer.disconnect()
        }
      }, { threshold: .25 })
      observer.observe(el)
      return () => observer.disconnect()
    }
  }, [opened])

  return <main>
    <Atmosphere />
    <div className="ambient-wash" aria-hidden="true" />
    <Petals burst={petalBurst} />
    <MusicToggle />

    <section className={`opening ${opened ? 'opening-opened' : ''}`}>
      <div className="opening-content">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2, duration: 1 }}>{c.eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: 1.1 }}>
          A little question<span className="title-period">.</span>
        </motion.h1>
        <motion.p className="opening-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8, duration: 1.1 }}>
          {c.openingLine}
        </motion.p>
        <motion.p className="opening-subline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 1 }}>{c.openingSubline}</motion.p>
        <div className="envelope-wrap">
          <Envelope onOpen={openLetter} />
        </div>
        <motion.button className="text-cta" onClick={openLetter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          Open this little surprise <span>♡</span>
        </motion.button>
        <p className="opening-footnote">TAKE A MOMENT · THERE'S NO RUSH</p>
      </div>
      <div className="scroll-hint"><span>SCROLL TO WANDER</span><ArrowDown size={13} /></div>
    </section>

    <AnimatePresence>
      {opened && <motion.div className="experience" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.3 }}>
        <section id="letter" className="letter-section section-shell">
          <motion.div className="section-kicker" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>01 <span>·</span> A NOTE FROM ME</motion.div>
          <div className="letter-layout">
            <div className="letter-side-note">
              <span className="script-word">Dear{ name },</span>
              <p>A few thoughts, gathered<br />in one little place.</p>
              <span className="side-rule" />
              <span className="side-date">WRITTEN WITH A LITTLE COURAGE</span>
            </div>
            <article className="letter-paper" ref={letterRef}>
              <div className="paper-top"><span>✳</span><span>A LITTLE LETTER</span><span>✳</span></div>
              <h2>Hey{name},</h2>
              {c.letter.map((paragraph, i) => <p className="letter-paragraph" key={i}>{paragraph}</p>)}
              <div className="letter-signoff">With a hopeful heart,</div>
              <div className="signature">{c.yourName}</div>
              <div className="paper-bottom">♡</div>
            </article>
          </div>
          <div className="continue-cue"><span>THERE'S A LITTLE MORE</span><ArrowDown size={14} /></div>
        </section>

        <section className="garden-section section-shell">
          <div className="garden-orbit orbit-one" /><div className="garden-orbit orbit-two" />
          <div className="garden-content">
            <span className="section-kicker">02 <span>·</span> A LITTLE POSSIBILITY</span>
            <Sparkles className="garden-sparkle" size={19} strokeWidth={1} />
            <p className="garden-thought">Maybe the loveliest things<br />begin with <em>simply asking.</em></p>
            <p className="garden-small">No grand promises. No perfect script.<br />Just an honest little question.</p>
            <div className="flower-mark" aria-hidden="true"><span>✿</span></div>
          </div>
        </section>

        <section className="question-section section-shell" ref={questionRef}>
          <div className="question-inner">
            <span className="section-kicker">03 <span>·</span> THE LITTLE QUESTION</span>
            <motion.p className="question-intro" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{c.questionIntro}</motion.p>
            <motion.div className="question-rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
            <h2>{c.question}</h2>
            <p className="invitation-detail">{c.invitationDetails}</p>
            {!answer ? <div className="answer-actions">
              <button className="answer-button yes-button" onClick={() => choose('yes')}>{c.yesLabel} <Heart size={16} fill="currentColor" /></button>
              <button className="answer-button maybe-button" onClick={() => choose('maybe')}>{c.maybeLabel} <span>☺</span></button>
            </div> : <AnimatePresence mode="wait">
              <motion.div key={answer} className="answer-note" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .7 }}>
                <span className="answer-flourish">{answer === 'yes' ? '✧' : '♡'}</span>
                <p>{(answer === 'yes' ? c.yesResponse : c.maybeResponse).split('\n').map((line, i) => <span key={i}>{line || <><br /></>}</span>)}</p>
                <button className="change-answer" onClick={() => setAnswer('')}>Change my answer</button>
              </motion.div>
            </AnimatePresence>}
          </div>
          <div className="question-glow" aria-hidden="true" />
        </section>

        <footer className="closing-section">
          <div className="closing-inner">
            <span className="closing-ornament">✳</span>
            <p className="closing-thanks">{c.closingThanks}</p>
            <p className="closing-message">{c.closingMessage}</p>
            <div className="closing-heart"><Heart size={17} strokeWidth={1} /></div>
            <p className="closing-signature">Made with a little courage <span>·</span> {c.yourName}</p>
            <button className="revisit-button" onClick={reset}><RotateCcw size={13} /> Revisit the beginning</button>
          </div>
        </footer>
      </motion.div>}
    </AnimatePresence>
  </main>
}

export default App
