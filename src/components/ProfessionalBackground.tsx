import React from "react";

const ProfessionalBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-white">
            {/* Minimalist Dot Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Very subtle warm glow for a premium feel, barely visible */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-gray-50/50 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
};

export default ProfessionalBackground;
