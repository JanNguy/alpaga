export function HStore() {
    return (
        <>
            <div className="min-h-[60vh] w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
                        <svg className="h-8 w-8 text-yellow-600" viewBox="0 0 24 24" fill="none">
                            <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 17.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M10.3 3.9 1.6 19.1A2 2 0 0 0 3.3 22h17.4a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-semibold tracking-wide text-neutral-100">NOT AVAILABLE</h1>
                    <p className="text-sm text-neutral-400">Cette page n’est pas disponible pour le moment.</p>
                </div>
            </div>
        </>
    )
}
