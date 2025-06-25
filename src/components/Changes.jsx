import { Formik, Field, Form, ErrorMessage } from "formik";
import Modal from "./Modal";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiCheckCircle } from "react-icons/fi";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Changes = ({ isOpen, onClose, isUpdate, contact }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const addContact = async (contact) => {
    setLoading(true);
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
      toast.success("Contact added successfully");
    } catch (error) {
      toast.error("Error adding contact");
    } finally {
      setLoading(false);
    }
  };
  const updateContact = async (contact, id) => {
    setLoading(true);
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
      toast.success("Contact Updated successfully");
    } catch (error) {
      toast.error("Error Updating contact");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AnimatePresence>
        {success ? (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[250px]"
          >
            <FiCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
            <div className="text-xl font-semibold text-green-600 dark:text-green-400">Success!</div>
          </motion.div>
        ) : (
          <Formik
            validationSchema={ContactSchema}
            initialValues={
              isUpdate
                ? { name: contact.name, email: contact.email }
                : { name: "", email: "" }
            }
            onSubmit={(values) => {
              isUpdate ? updateContact(values, contact.id) : addContact(values);
            }}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form className="flex flex-col gap-6 p-2">
                <div className="flex flex-col gap-4">
                  {/* Name Field */}
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-blue-400 pointer-events-none" />
                    <Field
                      name="name"
                      autoComplete="off"
                      className={`peer h-12 w-full pl-12 pr-4 rounded-xl bg-white/60 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all shadow-md placeholder-transparent focus:placeholder:text-slate-400 ${errors.name && touched.name ? 'border-red-400' : ''}`}
                      placeholder="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-12 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-90 peer-focus:bg-white/80 dark:peer-focus:bg-neutral-900/80 px-1 bg-transparent"
                    >
                      Name
                    </label>
                    <AnimatePresence>
                      {errors.name && touched.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-red-500 text-xs mt-1 ml-2"
                        >
                          {errors.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Email Field */}
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-blue-400 pointer-events-none" />
                    <Field
                      type="email"
                      name="email"
                      autoComplete="off"
                      className={`peer h-12 w-full pl-12 pr-4 rounded-xl bg-white/60 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all shadow-md placeholder-transparent focus:placeholder:text-slate-400 ${errors.email && touched.email ? 'border-red-400' : ''}`}
                      placeholder="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-12 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-90 peer-focus:bg-white/80 dark:peer-focus:bg-neutral-900/80 px-1 bg-transparent"
                    >
                      Email
                    </label>
                    <AnimatePresence>
                      {errors.email && touched.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-red-500 text-xs mt-1 ml-2"
                        >
                          {errors.email}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  className="relative flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 text-white h-12 rounded-xl font-semibold hover:opacity-90 transition-opacity mt-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700"
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                      {isUpdate ? "Updating..." : "Adding..."}
                    </span>
                  ) : (
                    <span>{isUpdate ? "Update" : "Add"} Contact</span>
                  )}
                </motion.button>
              </Form>
            )}
          </Formik>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default Changes;
