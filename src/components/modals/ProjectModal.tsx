import React, { useEffect } from 'react';
import { experienceProjects } from '../../data/portfolioData';

interface ProjectModalProps {
    activeExpProject: number | null;
    setActiveExpProject: (id: number | null) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ activeExpProject, setActiveExpProject }) => {
    useEffect(() => {
        if (!activeExpProject) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveExpProject(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [activeExpProject, setActiveExpProject]);

    if (!activeExpProject) return null;

    const projectData = experienceProjects.find(exp => exp.id === activeExpProject);

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setActiveExpProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exp-modal-title"
        >
            <div
                className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 p-6 flex justify-between items-start z-10">
                    <div>
                        <h3 id="exp-modal-title" className="text-2xl font-light text-white mb-2">
                            {projectData?.role}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {projectData?.period}
                        </p>
                    </div>
                    <button
                        onClick={() => setActiveExpProject(null)}
                        className="text-gray-500 hover:text-white transition-colors"
                        aria-label="Close projects modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-8">
                    {projectData?.projects.map((project, idx) => (
                        <div key={idx} className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
                            {/* Project Header */}
                            <div className="mb-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="text-xl font-medium text-white">{project.name}</h4>
                                    <span className="text-xs text-gray-500 bg-zinc-900 px-3 py-1 rounded-full">
                                        Project {idx + 1}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                            </div>

                            {/* Responsibilities */}
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Key Responsibilities</p>
                                <ul className="space-y-2">
                                    {project.responsibilities.map((resp, i) => (
                                        <li key={i} className="flex items-start text-sm text-gray-400">
                                            <span className="text-blue-500 mr-2 mt-1">▹</span>
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tools Used */}
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Tools & Technologies</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tools.map((tool, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-gray-300"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-zinc-950 border-t border-zinc-800 p-6">
                    <button
                        onClick={() => setActiveExpProject(null)}
                        className="w-full px-6 py-3 border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-300 text-sm text-gray-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
