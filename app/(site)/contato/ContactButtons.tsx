'use client';

import { FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { buttonClasses } from "@/components/ui/Button";

interface ContactButtonsProps {
    email: string;
    whatsapp: string;
}

export function ContactButtons({ email, whatsapp }: ContactButtonsProps) {
    return (
        <>
            <a
                className={buttonClasses({ variant: "primary", size: "md" })}
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
            >
                <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                WhatsApp
            </a>
            <a
                className={buttonClasses({ variant: "secondary", size: "md" })}
                href={`mailto:${email}`}
            >
                <FiMail className="h-5 w-5" aria-hidden="true" />
                {email}
            </a>
        </>
    );
}
