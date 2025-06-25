import React from 'react'
import { motion } from 'framer-motion'

const NoContact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="flex flex-col items-center p-10 rounded-2xl bg-white/40 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800 shadow-xl backdrop-blur-md"
    >
      <img src="Hands Contact.png" alt="No contacts" className="w-20 h-20 object-contain mb-3 animate-bounce" />
      <h1 className="text-slate-900 dark:text-white font-bold text-lg mb-1">No contacts found</h1>
      <p className="text-slate-500 dark:text-slate-400 text-base">Add your first contact to get started! 🚀</p>
    </motion.div>
  )
}

export default NoContact;