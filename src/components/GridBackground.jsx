import React, { useEffect, useRef } from 'react';

const GridBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const x = e.clientX;
                const y = e.clientY;
                containerRef.current.style.setProperty('--x', `${x}px`);
                containerRef.current.style.setProperty('--y', `${y}px`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="grid-bg"
            style={{
                '--x': '50%',
                '--y': '50%',
            }}
        />
    );
};

export default GridBackground;
