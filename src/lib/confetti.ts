export const confetti = (node: HTMLElement, config: ConfettiConfig) => {
	new Confetti(node, config);

	return {
		destroy() {}
	};
};

class Confetti {
	ctx: CanvasRenderingContext2D | null = null;
	config: ConfettiConfig = new ConfettiConfig();

	gravity = 10;
	particleCount = 75;
	particleSize = 1;
	explosionPower = 25;
	destroyTarget = true;
	fade = false;
	bursts: Burst[] = [];
	time: number;
	deltaTime: number;

	constructor(element: HTMLElement, config: ConfettiConfig) {
		this.config = { ...this.config, ...config };
		this.time = new Date().getTime();
		this.deltaTime = 0;
		this.setupCanvasContext();
		this.setupElement(element);
		window.requestAnimationFrame(() => this.update());
	}

	setCount(count: number): void {
		this.config.particleCount = count;
	}

	setPower(power: number): void {
		this.config.explosionPower = power;
	}

	setSize(size: number): void {
		this.config.particleSize = size;
	}

	setFade(fade: boolean): void {
		this.config.fade = fade;
	}

	setDestroyTarget(destroy: boolean): void {
		this.config.destroyTarget = destroy;
	}

	private resetCanvas(canvas: HTMLCanvasElement): void {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	private setupCanvasContext(): void {
		if (this.ctx) return;

		const canvas = document.createElement('canvas');
		this.ctx = canvas.getContext('2d');
		if (!this.ctx) return;

		this.resetCanvas(canvas);
		this.setStyleAttributes(canvas);

		document.body.appendChild(canvas);

		window.addEventListener('resize', () => this.resetCanvas(canvas));
	}

	private spawnburst(position: Point): void {
		this.bursts.push(new Burst(position, this.config));
	}

	private setStyleAttributes(element: HTMLElement): void {
		element.style.position = 'fixed';
		element.style.top = '0';
		element.style.left = '0';
		element.style.width = 'calc(100%)';
		element.style.height = 'calc(100%)';
		element.style.margin = '0';
		element.style.padding = '0';
		element.style.zIndex = '999999999';
		element.style.pointerEvents = 'none';
	}

	private setupElement(element: HTMLElement): void {
		element.addEventListener('click', (event) => {
			this.spawnburst(new Point(event.clientX, event.clientY));

			if (this.config.destroyTarget) {
				element.style.visibility = 'hidden';
			}
		});
	}

	private update(timestamp: number = 0): void {
		this.deltaTime = (timestamp - this.time) / 1000;
		this.time = timestamp;

		for (let i = this.bursts.length - 1; i >= 0; i--) {
			this.bursts[i].update(this.deltaTime);
			if (this.bursts[i].particles.length === 0) {
				this.bursts.splice(i, 1);
			}
		}

		this.draw();
		window.requestAnimationFrame((ts) => this.update(ts));
	}

	private draw(): void {
		if (!this.ctx) return;

		this.clearScreen();
		for (const burst of this.bursts) {
			burst.draw(this.ctx);
		}
	}

	clearScreen() {
		if (!this.ctx) return;
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	}
}

class Burst {
	particles: Particle[] = [];

	constructor(position: Point, config: ConfettiConfig) {
		for (let i = 0; i < config.particleCount; i++) {
			this.particles.push(new Particle(position, config));
		}
	}

	update(time: number): void {
		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].update(time);
			if (this.particles[i].checkBounds()) {
				this.particles.splice(i, 1);
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		for (const particle of this.particles) {
			particle.draw(ctx);
		}
	}
}

class Particle {
	config!: ConfettiConfig;

	size: Point;
	position: Point;
	velocity: Point;
	rotation: number;
	rotationSpeed: number;
	hue: number;
	opacity: number;
	lifetime: number;

	constructor(position: Point, config: ConfettiConfig) {
		this.config = config;

		this.size = new Point(
			(16 * Math.random() + 4) * config.particleSize,
			(4 * Math.random() + 4) * config.particleSize
		);
		this.position = new Point(position.x - this.size.x / 2, position.y - this.size.y / 2);
		this.velocity = this.generateVelocity();
		this.rotation = 360 * Math.random();
		this.rotationSpeed = 10 * (Math.random() - 0.5);
		this.hue = 360 * Math.random();
		this.opacity = 100;
		this.lifetime = Math.random() + 0.25;
	}

	update(time: number): void {
		this.velocity.y += this.config.gravity * (this.size.y / (10 * this.config.particleSize)) * time;
		this.velocity.x += 25 * (Math.random() - 0.5) * time;
		this.velocity.y *= 0.98;
		this.velocity.x *= 0.98;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.rotation += this.rotationSpeed;

		if (this.config.fade) {
			this.opacity -= this.lifetime;
		}
	}

	checkBounds(): boolean {
		return this.position.y - this.size.x > window.innerHeight;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.drawRectangle(this.position, this.size, this.rotation, this.hue, this.opacity, ctx);
	}

	drawRectangle(
		position: Point,
		size: Point,
		rotation: number,
		hue: number,
		opacity: number,
		ctx: CanvasRenderingContext2D
	) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(position.x + size.x / 2, position.y + size.y / 2);
		ctx.rotate((rotation * Math.PI) / 180);
		ctx.rect(-size.x / 2, -size.y / 2, size.x, size.y);
		ctx.fillStyle = 'hsla(' + hue + 'deg, 90%, 65%, ' + opacity + '%)';
		ctx.fill();
		ctx.restore();
	}

	generateVelocity() {
		const randomX = Math.random() - 0.5;
		let randomY = Math.random() - 0.7;
		const magnitude = Math.sqrt(randomX * randomX + randomY * randomY);
		randomY /= magnitude;
		return new Point(
			randomX * (Math.random() * this.config.explosionPower),
			randomY * (Math.random() * this.config.explosionPower)
		);
	}
}

class Point {
	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}
}

class ConfettiConfig {
	gravity: number = 10;
	particleCount: number = 75;
	particleSize: number = 1;
	explosionPower: number = 25;
	destroyTarget: boolean = true;
	fade: boolean = false;
}
