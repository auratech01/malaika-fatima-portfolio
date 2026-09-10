import React, { useEffect, useRef } from 'react';

export const CyberBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles/Nodes on circuit paths
    const pulses: { x: number; y: number; speed: number; dir: 'H' | 'V'; length: number; maxLen: number }[] = [];
    for (let i = 0; i < 20; i++) {
      pulses.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1 + Math.random() * 2,
        dir: Math.random() > 0.5 ? 'H' : 'V',
        length: 0,
        maxLen: 80 + Math.random() * 120
      });
    }

    let angle = 0;

    // Draw 3D Wireframe Icosahedron Projection
    const drawIcosahedron = (cx: number, cy: number, radius: number, rotX: number, rotY: number) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
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
        // Rotate Y
        let x1 = vx * Math.cos(rotY) + vz * Math.sin(rotY);
        let y1 = vy;
        let z1 = -vx * Math.sin(rotY) + vz * Math.cos(rotY);

        // Rotate X
        let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

        const scale = 200 / (200 + z2 * radius * 0.5);
        return {
          x: cx + x1 * radius * scale,
          y: cy + y2 * radius * scale
        };
      });

      // Draw edges between close vertices
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

      // Dark sci-fi gradient background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#060b12');
      grad.addColorStop(0.5, '#0b1420');
      grad.addColorStop(1, '#050a10');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      angle += 0.008;

      // Draw Circuit Board Traces
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1.5;

      const gridStep = 60;
      for (let x = gridStep; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // PCB Circuit Lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 2;
      const circuitY = [height * 0.2, height * 0.4, height * 0.6, height * 0.8];
      circuitY.forEach((y, idx) => {
        ctx.beginPath();
        ctx.moveTo(width * 0.2, y);
        ctx.lineTo(width * 0.35 + (idx % 2 === 0 ? 40 : -30), y);
        ctx.lineTo(width * 0.45, y + (idx % 2 === 0 ? 30 : -30));
        ctx.lineTo(width * 0.6, y + (idx % 2 === 0 ? 30 : -30));
        ctx.stroke();

        // Circuit Node dots
        ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.beginPath();
        ctx.arc(width * 0.6, y + (idx % 2 === 0 ? 30 : -30), 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animate Cyan Circuit Pulses
      pulses.forEach(p => {
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
        ctx.lineWidth = 2;
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

      // Draw Rotating 3D Icosahedrons (Left side & Right side as in Image 1)
      drawIcosahedron(width * 0.15, height * 0.3, 50, angle, angle * 1.2);
      drawIcosahedron(width * 0.25, height * 0.65, 35, -angle * 0.8, angle);
      drawIcosahedron(width * 0.85, height * 0.25, 45, angle * 0.5, -angle * 1.5);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
