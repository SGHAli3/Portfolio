import React, { useEffect, useRef } from "react";

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Types
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        const rand = Math.random();
        if (rand > 0.95) {
          this.size = Math.random() * 2 + 2; 
        } else if (rand > 0.7) {
          this.size = Math.random() * 1.5 + 1; 
        } else {
          this.size = Math.random() * 1 + 0.5; 
        }

        this.speedX = (Math.random() - 0.5) * 0.05;
        this.speedY = (Math.random() - 0.5) * 0.05;

        this.baseOpacity = Math.random() * 0.5 + 0.3;
        this.opacity = this.baseOpacity;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;

        this.twinklePhase += this.twinkleSpeed;
        this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.3;
      }

      draw() {
        if (!ctx) return;
        if (this.size > 2) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity * 0.3})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    class Comet {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number;

      constructor() {
        if (Math.random() > 0.5) {
          this.x = Math.random() * width;
          this.y = -50;
        } else {
          this.x = -50;
          this.y = Math.random() * height * 0.5; 
        }
        this.length = Math.random() * 100 + 60; 
        this.speed = Math.random() * 4 + 3; 
        this.opacity = Math.random() * 0.6 + 0.4; 
        this.angle = Math.PI / 4; 
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.1, `rgba(200, 220, 255, ${this.opacity * 0.8})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      isOffScreen() {
        return this.x > width + 100 || this.y > height + 100;
      }
    }

    class Nebula {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 200 + 150; 
        this.baseOpacity = Math.random() * 0.07 + 0.05; 
        this.opacity = this.baseOpacity;
        this.pulseSpeed = Math.random() * 0.008 + 0.003; 
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.pulsePhase += this.pulseSpeed;
        this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * this.baseOpacity * 0.8;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );

        gradient.addColorStop(0, `rgba(100, 150, 255, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(150, 100, 255, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class DarkMatter {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speedX: number;
      speedY: number;
      pulseSpeed: number;
      pulsePhase: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 180 + 120; 
        this.baseOpacity = Math.random() * 0.15 + 0.1; 
        this.opacity = this.baseOpacity;
        this.speedX = (Math.random() - 0.5) * 0.1; 
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.pulseSpeed = Math.random() * 0.003 + 0.001;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;

        this.pulsePhase += this.pulseSpeed;
        this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * this.baseOpacity * 0.3;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );

        gradient.addColorStop(0, `rgba(0, 0, 0, ${this.opacity})`);
        gradient.addColorStop(0.6, `rgba(0, 0, 0, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 200; 

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const comets: Comet[] = [];
    const nebulas: Nebula[] = [];
    const darkMatter: DarkMatter[] = [];

    for (let i = 0; i < 8; i++) {
      nebulas.push(new Nebula());
    }

    for (let i = 0; i < 6; i++) {
      darkMatter.push(new DarkMatter());
    }

    const animate = () => {
      if (!ctx || !canvas) return; 

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Use current canvas dims

      nebulas.forEach((nebula) => {
        nebula.update();
        nebula.draw();
      });

      darkMatter.forEach((dm) => {
        dm.update();
        dm.draw();
      });

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      comets.forEach((comet, index) => {
        comet.update();
        comet.draw();

        if (comet.isOffScreen()) {
          comets.splice(index, 1);
        }
      });

      if (Math.random() < 0.015) { 
        comets.push(new Comet());
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default SpaceBackground;
