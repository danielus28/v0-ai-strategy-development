export function AethosLogo({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
            {/* Círculo externo - Estándares/Sistema */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
            {/* Círculo interno - Gobernanza/Supervisión */}
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Centro sólido - El humano */}
            <circle cx="50" cy="50" r="13" fill="#C9A227" />
        </svg>
    )
}
