import React, { useEffect, useRef } from 'react';

interface CyberBackgroundCanvasProps {
  recruiterMode?: boolean;
}

export const CyberBackgroundCanvas: React.FC<CyberBackgroundCanvasProps> = ({ recruiterMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isMobile = width < 768;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = width < 768;
    };

    window.addEventListener('resize', handleResize);

    // Particles/Nodes on circuit paths
    // On mobile or recruiter mode, use dramatically fewer pulses to prevent visual distraction
    const pulseCount = recruiterMode ? 4 : isMobile ? 6 : 18;
    const pulses: { x: number; y: number; speed: number; dir: 'H' | 'V'; length: number; maxLen: number }[] = [];
    for (let i = 0; i < pulseCount; i++) {
      pulses.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: (recruiterMode ? 0.6 : isMobile ? 0.8 : 1.2) + Math.random(),
        dir: Math.random() > 0.5 ? 'H' : 'V',
        length: 0,
        maxLen: (isMobile ? 50 : 80) + Math.random() * (isMobile ? 50 : 100)
      });
    }

    let angle = 0;

    // Draw 3D Wireframe Icosahedron Projection (Only on desktop and non-recruiter mode)
    const drawIcosahedron = (cx: number, cy: number, radius: number, rotX: number, rotY: number) => {
      if (isMobile || recruiterMode) return; // Clean mobile and corporate view: no overlapping wireframes
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.28)';
      ctx.lineWidth = 1;

      // Golden ratio phi
      const phi = (1 + Math.sqrt(5)) / 2;
      const vertices = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
      ];

      // Rotate and project 3D to 2D
      const projected = vertices.map(([vx, vy, vz]) => {
        const x1 = vx * Math.cos(rotY) + vz * Math.sin(rotY);
        const y1 = vy;
        const z1 = -vx * Math.sin(rotY) + vz * Math.cos(rotY);

        const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

        const scale = 200 / (200 + z2 * radius * 0.5);
        return {
          x: cx + x1 * radius * scale,
          y: cy + y2 * radius * scale
        };
      });

      // Draw edges
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = vertices[i][0] - vertices[j][0];
          const dy = vertices[i][1] - vertices[j][1];
          const dz = vertices[i][2] - vertices[j][2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 5) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (recruiterMode) {
        // Corporate Executive deep slate navy gradient
        grad.addColorStop(0, '#090d16');
        grad.addColorStop(0.5, '#0e1524');
        grad.addColorStop(1, '#080c14');
      } else {
        // Sci-Fi Dark Cyber aesthetic
        grad.addColorStop(0, '#060b12');
        grad.addColorStop(0.5, '#0b1420');
        grad.addColorStop(1, '#050a10');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      angle += recruiterMode ? 0.003 : 0.006;

      // Draw Grid / Circuit Traces
      const gridOpacity = recruiterMode ? 0.04 : isMobile ? 0.06 : 0.1;
      ctx.strokeStyle = `rgba(6, 182, 212, ${gridOpacity})`;
      ctx.lineWidth = 1;

      const gridStep = isMobile ? 80 : 60;
      for (let x = gridStep; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal circuit traces (only desktop or subtle on mobile)
      if (!recruiterMode) {
        ctx.strokeStyle = isMobile ? 'rgba(6, 182, 212, 0.12)' : 'rgba(6, 182, 212, 0.22)';
        ctx.lineWidth = isMobile ? 1 : 1.5;
        const circuitY = isMobile ? [height * 0.35, height * 0.7] : [height * 0.2, height * 0.4, height * 0.6, height * 0.8];
        circuitY.forEach((y, idx) => {
          ctx.beginPath();
          ctx.moveTo(width * 0.15, y);
          ctx.lineTo(width * 0.3 + (idx % 2 === 0 ? 30 : -20), y);
          ctx.lineTo(width * 0.4, y + (idx % 2 === 0 ? 20 : -20));
          ctx.lineTo(width * 0.55, y + (idx % 2 === 0 ? 20 : -20));
          ctx.stroke();
        });
      }

      // Animate circuit pulses
      pulses.forEach(p => {
        ctx.strokeStyle = recruiterMode 
          ? 'rgba(56, 189, 248, 0.4)' 
          : isMobile 
            ? 'rgba(0, 242, 254, 0.5)' 
            : 'rgba(0, 242, 254, 0.75)';
        ctx.lineWidth = isMobile || recruiterMode ? 1.5 : 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);

        if (p.dir === 'H') {
          ctx.lineTo(p.x + p.length, p.y);
          p.x += p.speed;
        } else {
          ctx.lineTo(p.x, p.y + p.length);
          p.y += p.speed;
        }
        ctx.stroke();

        p.length += p.speed;
        if (p.length > p.maxLen) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.length = 0;
          p.dir = Math.random() > 0.5 ? 'H' : 'V';
        }
      });

      // Rotating 3D wireframe shapes ONLY on desktop non-recruiter mode
      if (!isMobile && !recruiterMode) {
        drawIcosahedron(width * 0.12, height * 0.3, 45, angle, angle * 1.2);
        drawIcosahedron(width * 0.22, height * 0.7, 32, -angle * 0.8, angle);
        drawIcosahedron(width * 0.88, height * 0.25, 42, angle * 0.5, -angle * 1.4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [recruiterMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
