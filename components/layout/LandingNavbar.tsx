'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const WHATSAPP_LINK =
    'https://wa.me/553190726984?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os%20jur%C3%ADdicos.';

const navLinks = [
    { href: '#hero', label: 'Início' },
    { href: '#areas', label: 'Áreas de Atuação' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#processo', label: 'Como Funciona' },
    { href: '#faq', label: 'Dúvidas' },
    { href: '#contato', label: 'Contato' },
];

export function LandingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Detect active section
            const sections = navLinks.map((link) => link.href.replace('#', ''));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={cn(
                    'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-white/95 shadow-lg shadow-stone-200/50 backdrop-blur-md'
                        : 'bg-surface'
                )}
            >
                <div className="container px-6">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="group flex items-center gap-3"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('#hero');
                            }}
                        >
                            <div className="relative h-12 w-12 overflow-hidden rounded-xl shadow-lg transition-transform group-hover:scale-105">
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo Dr. Rafael Vieira"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <p className="font-display text-lg font-semibold text-stone-900 transition-colors group-hover:text-accent">
                                    Dr. Rafael Vieira
                                </p>
                                <p className="text-xs font-medium uppercase tracking-widest text-stone-500">
                                    Advocacia
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center gap-1 lg:flex">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => scrollToSection(link.href)}
                                    className={cn(
                                        'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                                        activeSection === link.href.replace('#', '')
                                            ? 'text-accent'
                                            : 'text-stone-600 hover:text-stone-900'
                                    )}
                                >
                                    {link.label}
                                    {activeSection === link.href.replace('#', '') && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="hidden items-center gap-3 md:flex">
                            <motion.a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-600/25"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaWhatsapp className="h-4 w-4" />
                                WhatsApp
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition-colors hover:border-accent hover:text-accent lg:hidden"
                            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="h-5 w-5" />
                            ) : (
                                <FiMenu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed bottom-0 right-0 top-0 z-50 w-80 bg-white p-6 shadow-2xl lg:hidden"
                        >
                            <div className="flex items-center justify-between border-b border-stone-100 pb-6">
                                <div>
                                    <p className="font-display text-lg font-semibold text-stone-900">
                                        Dr. Rafael Vieira
                                    </p>
                                    <p className="text-xs font-medium uppercase tracking-widest text-stone-500">
                                        Advocacia
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100"
                                >
                                    <FiX className="h-5 w-5" />
                                </button>
                            </div>

                            <nav className="mt-6 space-y-1">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.href}
                                        onClick={() => scrollToSection(link.href)}
                                        className={cn(
                                            'flex w-full items-center rounded-lg px-4 py-3 text-left font-medium transition-colors',
                                            activeSection === link.href.replace('#', '')
                                                ? 'bg-accent/10 text-accent'
                                                : 'text-stone-600 hover:bg-stone-50'
                                        )}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-8 space-y-3">
                                <motion.a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 font-semibold text-white"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaWhatsapp className="h-5 w-5" />
                                    Chamar no WhatsApp
                                </motion.a>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-center text-xs text-stone-400">
                                    OAB/MG 246.280
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
