"use client"

import { cn } from "@/lib/utils"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export const TypewriterEffect = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string
        className?: string
    }[]
    className?: string
    cursorClassName?: string
}) => {
    const wordsArray = words.map((word) => ({
        ...word,
        text: word.text.split(""),
    }))

    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

    useEffect(() => {
        if (isInView) {
            animate(
                "span",
                { opacity: 1 },
                {
                    duration: 0.1,
                    delay: stagger(0.08),
                    ease: "easeInOut",
                },
            )
        }
    }, [isInView])

    return (
        <div className={cn("inline-flex items-baseline flex-wrap justify-center gap-x-2 md:gap-x-3 lg:gap-x-4", className)}>
            <motion.div ref={scope} className="inline-flex flex-wrap items-baseline gap-x-2 md:gap-x-3 lg:gap-x-4">
                {wordsArray.map((word, idx) => (
                    <div key={`word-${idx}`} className="inline-block">
                        {word.text.map((char, index) => (
                            <motion.span
                                initial={{ opacity: 0 }}
                                key={`char-${idx}-${index}`}
                                className={cn("inline-block opacity-0", word.className)}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                ))}
            </motion.div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn(
                    "inline-block rounded-sm w-[3px] h-8 md:h-10 lg:h-14 align-baseline ml-1",
                    cursorClassName || "bg-foreground",
                )}
                aria-hidden="true"
            />
        </div>
    )
}
