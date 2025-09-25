import { motion } from 'framer-motion';

function ParticleSystem({ size }: { size: number }) {
    const particleSize = Math.max(2, size * 0.02);
    const particles = Array.from({ length: Math.floor(size / 15) }, (_, i) => ({
        id: i,
        radius: size * 0.3 + (i % 3) * (size * 0.1),
        duration: 4 + (i % 4) * 2,
        delay: i * 0.2,
    }));

    return (
        <div
        className="relative rounded-3xl overflow-hidden"
        style={{ width: size, height: size }}
        >
            {particles.map((p) => (
                <motion.div
                key={p.id}
                className="absolute"
                style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: p.delay,
                }}
                >
                <div
                    className="bg-black rounded-full opacity-70"
                    style={{
                    width: particleSize,
                    height: particleSize,
                    transform: `translateX(${p.radius}px)`,
                    }}
                />
                </motion.div>
            ))}

            <div
                className="absolute rounded-full opacity-30"
                style={{
                width: particleSize * 1.5,
                height: particleSize * 1.5,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                }}
            />
        </div>
  );
}

export default ParticleSystem;
