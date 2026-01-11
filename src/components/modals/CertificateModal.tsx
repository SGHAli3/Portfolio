import React, { useEffect } from 'react';

interface CertificateModalProps {
    link: string | null;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ link, onClose }) => {
    useEffect(() => {
        if (!link) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [link, onClose]);

    if (!link) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
        >
            <div
                className="bg-white rounded-lg w-[90%] max-w-3xl p-4 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white text-xl hover:text-gray-300 transition-colors z-10 md:top-2 md:right-2 md:text-black md:hover:text-gray-700"
                    aria-label="Close certificate modal"
                >
                    ✖
                </button>

                {/* Preview iframe */}
                <iframe
                    src={link}
                    className="w-full h-[500px] rounded border border-gray-200"
                    allow="fullscreen"
                    title="Certificate preview"
                ></iframe>
            </div>
        </div>
    );
};

export default CertificateModal;
