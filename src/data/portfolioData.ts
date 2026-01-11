export const experienceProjects = [
    {
        id: 1,
        role: "Senior QA Engineer",
        period: "Aug 2024 – Present",
        company: "Paycorp.io",
        location: "Bengaluru",
        projectTitle: "Open Finance – UAE",
        summary: [
            "Designed and executed test plans for TPP, PFM, and CFM modules under the Open Finance platform, covering functional, API, and integration testing.",
            "Validated API contracts and data flows using Postman and SQL, ensuring compliance with Open Banking standards.",
            "Collaborated with engineering and product teams to identify edge cases and ensure high-quality delivery across SIT, UAT, and production environments."
        ],
        projects: [
            {
                name: "TPP (Third Party Provider) Testing",
                description: "Comprehensive testing of Third Party Provider integrations under Open Finance UAE platform.",
                responsibilities: [
                    "Designed test cases for account information and payment initiation APIs",
                    "Validated OAuth 2.0 authentication flows and consent management",
                    "Performed API contract testing using Postman collections",
                    "Executed security testing for data encryption and PII handling"
                ],
                tools: ["Postman", "JIRA", "SQL", "Git"]
            },
            {
                name: "PFM (Personal Finance Management) QA",
                description: "End-to-end quality assurance for Personal Finance Management features.",
                responsibilities: [
                    "Tested transaction categorization and budget tracking features",
                    "Validated data aggregation from multiple financial institutions",
                    "Performed cross-browser and mobile app testing",
                    "Executed regression testing for new feature releases"
                ],
                tools: ["Playwright", "Appium", "PostgreSQL", "JIRA"]
            },
            {
                name: "CFM (Cash Flow Management) Validation",
                description: "Quality validation for Cash Flow Management and forecasting modules.",
                responsibilities: [
                    "Validated cash flow prediction algorithms and reporting",
                    "Tested integration with banking APIs for real-time balance updates",
                    "Performed data accuracy testing using SQL queries",
                    "Coordinated UAT with fintech partners"
                ],
                tools: ["SQL", "Postman", "Excel", "JIRA"]
            }
        ]
    },
    {
        id: 2,
        role: "QA Automation Engineer",
        period: "Dec 2023 – Aug 2024",
        company: "Paycorp.io",
        location: "Bengaluru",
        projectTitle: "eNACH & UPI Autopay",
        summary: [
            "Built and maintained 150+ Playwright test cases for UPI Autopay journeys, reducing manual regression time by 30–40% per release.",
            "Led QA for integrations with 8+ NBFCs, banks, and PSPs, executing API testing, data validation, and end-to-end mandate lifecycle testing.",
            "Validated end-to-end flows across LMS/core systems, APIs, reconciliation, and mandate lifecycle, catching 25+ critical production issues pre-release."
        ],
        projects: [
            {
                name: "UPI Autopay Automation Framework",
                description: "Built comprehensive automation suite for UPI Autopay mandate lifecycle testing.",
                responsibilities: [
                    "Developed 150+ Playwright test cases covering mandate creation, modification, and cancellation",
                    "Implemented API testing framework for NPCI integration validation",
                    "Created data-driven tests for multiple bank and PSP combinations",
                    "Reduced regression testing time by 30-40% per release cycle"
                ],
                tools: ["Playwright", "TypeScript", "Postman", "Git", "Jenkins"]
            },
            {
                name: "NACH-UPI LMS Integration Testing",
                description: "Led integration testing for NACH and UPI mandate solutions with client Loan Management Systems.",
                responsibilities: [
                    "Executed integration testing for 8+ NBFCs, banks, and PSPs",
                    "Validated end-to-end mandate flows from LMS to NPCI",
                    "Performed reconciliation testing between LMS and payment gateway",
                    "Identified and reported 25+ critical production issues during UAT"
                ],
                tools: ["Postman", "DBeaver", "JIRA", "SQL"]
            },
            {
                name: "Payment Gateway API Validation",
                description: "Comprehensive API testing for payment gateway integrations.",
                responsibilities: [
                    "Validated mandate registration, presentation, and status update APIs",
                    "Performed negative testing for error handling scenarios",
                    "Tested webhook notifications and callback mechanisms",
                    "Created automated API test suites in Postman"
                ],
                tools: ["Postman", "Newman", "Git", "JIRA"]
            }
        ]
    },
    {
        id: 3,
        role: "QA Implementation Engineer",
        period: "Mar 2022 – Dec 2023",
        company: "Paycorp.io",
        location: "Bengaluru",
        projectTitle: "NACH Mandates",
        summary: [
            "Executed NACH mandate and collection testing for 6+ banks, covering end-to-end mandate lifecycle and file processing across SIT/UAT/Production.",
            "Performed UAT coordination and production validation testing, resolving 40+ critical defects for NBFCs and banking clients.",
            "Validated mandate registration, presentation, and collection flows using SQL queries and API testing, ensuring data accuracy across environments."
        ],
        projects: [
            {
                name: "NACH Mandate Implementation",
                description: "Manual testing and implementation support for NACH mandate solution across multiple banks.",
                responsibilities: [
                    "Executed end-to-end testing for 6+ bank implementations",
                    "Validated NACH mandate registration, modification, and cancellation flows",
                    "Tested file-based processing (NACH input/output files)",
                    "Performed data validation using SQL queries on mandate databases"
                ],
                tools: ["SQL", "DBeaver", "Excel", "JIRA", "FileZilla"]
            },
            {
                name: "NACH Collection Testing",
                description: "Testing of NACH collection presentation and response file processing.",
                responsibilities: [
                    "Validated debit presentation file generation and processing",
                    "Tested collection success/failure scenarios across different banks",
                    "Performed reconciliation testing between mandate and collection data",
                    "Executed UAT coordination with NBFC clients"
                ],
                tools: ["SQL", "Excel", "Putty", "JIRA"]
            },
            {
                name: "Production Support & Defect Management",
                description: "Production validation and issue resolution for banking clients.",
                responsibilities: [
                    "Resolved 40+ critical production defects for NBFCs and banks",
                    "Performed root cause analysis using application logs and database queries",
                    "Coordinated with development team for hotfix deployments",
                    "Maintained test documentation and defect reports"
                ],
                tools: ["JIRA", "SQL", "Putty", "Excel"]
            }
        ]
    }
];

export const skills = [
    "Manual Testing",
    "Test Automation",
    "API Testing",
    "Mobile App Testing",
    "SQL & Database Testing",
    "Performance Testing",
    "Agile & Scrum",
    "Defect Management",
];

export const creativeSkills = [
    "User Experience (UX) Analysis",
    "Accessibility Testing",
    "Visual Regression Testing",
    "Process Optimization",
];

export const aiSkills = [
    "AI-Assisted Test Generation",
    "Prompt Engineering for QA",
    "Automated Visual Validation",
];

export const qaTools = [
    "Playwright",
    "Postman",
    "JIRA",
    "Git",
    "Appium",
    "DBeaver",
    "Putty",
    "FileZilla",
];

export const databases = [
    "PostgreSQL",
    "MSSQL",
    "Oracle",
    "MySQL",
];

export const platforms = [
    "Linux",
    "Windows",
    "Android",
    "iOS",
];

export const additionalSkills = [
    "Figma",
    "Canva",
    "Adobe Photoshop",
    "Premiere Pro",
    "VN Editor",
];

export const certifications = [
    {
        name: "Introduction to Postman API",
        link: "https://drive.google.com/file/d/1XN-zhYU8UdK5iWv0u9NHeQp8Q8RWnCVv/preview",
    },
    {
        name: "Malware Analysis",
        link: "https://drive.google.com/file/d/1W_bFat7s91p0X9nKdeEcgrmlwNjlM_hz/preview",
    },
    {
        name: "QA Automation",
        link: "https://drive.google.com/file/d/16EiP84pjVjQaRqZams97ssrJCYvDbe9u/preview",
    },
];
