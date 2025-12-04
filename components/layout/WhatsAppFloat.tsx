'use client';

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "motion/react";

const WHATSAPP_NUMBER = "5531975321410";
const WHATSAPP_MESSAGE = encodeURIComponent("Olá! Vim pelo site e gostaria de tirar uma dúvida.");

export function WhatsAppFloat() {
    return (
        <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-green-500 text-white font-medium shadow-lg shadow-green-500/30 transition-all hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Conversar no WhatsApp"
        >
            <FaWhatsapp className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">Fale comigo</span>
        </motion.a>
    );
}
