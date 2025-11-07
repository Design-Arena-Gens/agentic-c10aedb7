"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [tempName, setTempName] = useState('');

  const green = '#22A06B';
  const bg = '#FCFCFA';

  return (
    <div className="container" style={{ backgroundColor: bg }}>
      <main className="main">
        <motion.div
          className="greetingRow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="greetingText">Hello{name ? ',' : ','}</h1>

          <AnimatePresence initial={false} mode="popLayout">
            {!name && (
              <motion.button
                key="add-btn"
                className="addButton"
                style={{ borderColor: green, color: green }}
                onClick={() => {
                  setTempName('');
                  setIsOpen(true);
                }}
                whileHover={{ y: -1, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                aria-label="Add Name"
              >
                <span className="plusIcon">+</span>
                <span className="addText">Add Name</span>
              </motion.button>
            )}

            {name && (
              <motion.span
                key="name-chip"
                className="nameChip"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                style={{ color: green }}
              >
                {name}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <footer className="footer">
        <span className="footnote">Built with Framer Motion</span>
      </footer>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className="overlay"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <h2 className="modalTitle">Enter your name</h2>
              <input
                className="input"
                type="text"
                placeholder="Your name"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
              />
              <div className="modalActions">
                <button className="btn btnSecondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button
                  className="btn btnPrimary"
                  onClick={() => {
                    const trimmed = tempName.trim();
                    if (trimmed) setName(trimmed);
                    setIsOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
