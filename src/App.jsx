// App.js or the main file where you're using BackgroundBeamsWithCollision
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Changes from "./components/Changes";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoContact from "./components/NoContact";
import BackgroundBeamsWithCollision from "./components/BackgroundBeamsWithCollision";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);
        });
      } catch (error) {
        console.error(error);
      }
    };

    getContacts();
  }, []);

  const filteredContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 transition-colors duration-500">
        <BackgroundBeamsWithCollision className="absolute inset-0 z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col min-h-screen w-full px-2 md:px-8">
          <Navbar />
          <main className="flex flex-col flex-1 w-full max-w-5xl mx-auto pt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="flex gap-2 w-full mb-8"
            >
              <div className="relative flex flex-grow items-center">
                <FiSearch className="absolute left-3 text-slate-400 dark:text-slate-500 text-xl" />
                <input
                  onChange={filteredContacts}
                  type="text"
                  placeholder="Search contacts..."
                  className="flex-grow h-12 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 text-slate-900 dark:text-white pl-10 pr-4 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all shadow-md"
                />
              </div>
              <motion.button
                onClick={onOpen}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.08 }}
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 text-white text-3xl shadow-lg px-4 py-2 hover:opacity-90 transition-all"
                aria-label="Add contact"
              >
                <AiFillPlusCircle />
              </motion.button>
            </motion.div>
            <section className="flex-1">
              {contacts.length <= 0 ? (
                <div className="flex flex-1 items-center justify-center min-h-[300px]">
                  <NoContact />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, type: 'spring', delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                  ))}
                </motion.div>
              )}
            </section>
          </main>
        </div>
      </div>
      <Changes isOpen={isOpen} onClose={onClose} />
      <Toaster position="bottom-center" toastOptions={{
        style: { background: '#222', color: '#fff', borderRadius: '12px' },
        className: 'dark:bg-neutral-800 dark:text-white',
      }} />
    </>
  );
};

export default App;
