import React, { useEffect, useRef, useState, useCallback } from "react";

interface GridPatternProps {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: string;
    squares?: Array<[x: number, y: number]>;
    className?: string;
    [key: string]: unknown;
}

const GridPattern = ({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    strokeDasharray = "0",
    squares,
    className,
    ...props
}: GridPatternProps) => {
    const canvasRef = useRef < HTMLCanvasElement | null > (null);
    const containerRef = useRef < HTMLDivElement | null > (null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const updateCanvasSize = useCallback(() => {
        const container = containerRef.current;
        if (container) {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            setCanvasSize({ width: newWidth, height: newHeight });
        }
    }, []);

    const drawGrid = useCallback(
        (ctx: CanvasRenderingContext2D, width: number, height: number) => {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
            ctx.lineWidth = 1;

            // Draw grid lines
            for (let xPos = 0; xPos < width; xPos += width) {
                ctx.beginPath();
                ctx.moveTo(xPos, 0);
                ctx.lineTo(xPos, height);
                ctx.stroke();
            }

            for (let yPos = 0; yPos < height; yPos += height) {
                ctx.beginPath();
                ctx.moveTo(0, yPos);
                ctx.lineTo(width, yPos);
                ctx.stroke();
            }

            if (squares) {
                squares.forEach(([squareX, squareY]) => {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                    ctx.fillRect(squareX * width, squareY * height, width - 1, height - 1);
                });
            }
        },
        [squares, width, height]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;

        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        updateCanvasSize();

        const resizeObserver = new ResizeObserver(updateCanvasSize);
        resizeObserver.observe(container);

        const animate = () => {
            drawGrid(ctx, canvas.width, canvas.height);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            resizeObserver.disconnect();
        };
    }, [updateCanvasSize, drawGrid]);

    return (
        <div ref={containerRef} className={`relative w-full h-full ${className}`} {...props}>
            <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0"
                style={{
                    width: canvasSize.width,
                    height: canvasSize.height,
                }}
            />
        </div>
    );
};

export default GridPattern;
