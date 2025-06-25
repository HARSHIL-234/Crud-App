import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Changes from "./Changes";
import useDisclose from "../hooks/useDisclose";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
};

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclose();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      toast.error("Error Deleting Contact");
    }
  };

  return (
    <>
      <motion.div
        key={contact.id}
        className="group flex items-center justify-between p-5 rounded-2xl bg-white/40 dark:bg-neutral-900/60 border border-slate-100 dark:border-neutral-800 shadow-xl backdrop-blur-md transition-colors"
        whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-neutral-800 flex items-center justify-center text-blue-600 dark:text-teal-300 text-xl font-bold shadow-md">
            {getInitials(contact.name)}
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white text-lg">{contact.name}</h2>
            <h1 className="text-sm text-slate-500 dark:text-slate-400">{contact.email}</h1>
          </div>
        </div>
        <div className="flex gap-2 text-2xl items-center">
          <motion.div
            whileHover={{ scale: 1.2, color: "#3b82f6" }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer text-slate-400 hover:text-blue-500 dark:hover:text-teal-300 transition-colors"
            title="Edit"
            onClick={onOpen}
          >
            <RiEditCircleLine />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, color: "#ef4444" }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            title="Delete"
            onClick={() => deleteContact(contact.id)}
          >
            <IoMdTrash />
          </motion.div>
        </div>
      </motion.div>
      <Changes contact={contact} isUpdate={true} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;
