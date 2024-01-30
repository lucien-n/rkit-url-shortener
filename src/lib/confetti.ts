export const confetti = (node: HTMLElement, config: ConfettiConfig) => {
	new Confetti(node, config);

	return {};
};

export class Confetti {
	ctx: CanvasRenderingContext2D | null = null;
	config: ConfettiConfig = new ConfettiConfig();

	private bursts: Burst[] = [];
	private previousTime: number = 0;
	private emitter: HTMLElement | null = null;

	constructor(emitter: HTMLElement, config: ConfettiConfig) {
		this.config = { ...this.config, ...config };

		this.setupCanvasContext();
		this.setupEmitter(emitter);

		window.requestAnimationFrame(() => this.update());
	}

	setCount(count: number) {
		this.config.count = count;
	}

	setPower(power: number) {
		this.config.power = power;
	}

	setSize(size: number) {
		this.config.size = size;
	}

	setFade(fade: boolean) {
		this.config.fade = fade;
	}

	trigger(x: number, y: number) {
		this.spawnBurst(new Position(x, y));

		if (this.emitter && this.config.destroyEmitter) {
			this.emitter.style.visibility = 'hidden';
		}
	}

	private resizeCanvas(canvas: HTMLCanvasElement) {
		canvas.style.position = 'fixed';
		canvas.style.top = '0';
		canvas.style.left = '0';
		canvas.style.width = 'calc(100%)';
		canvas.style.height = 'calc(100%)';
		canvas.style.margin = '0';
		canvas.style.padding = '0';
		canvas.style.zIndex = '999999999';
		canvas.style.pointerEvents = 'none';
	}

	private styleCanvas(canvas: HTMLCanvasElement) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	private setupCanvasContext() {
		if (this.ctx) return;

		const canvas = document.createElement('canvas');
		this.ctx = canvas.getContext('2d');
		if (!this.ctx) return;

		this.resizeCanvas(canvas);
		this.styleCanvas(canvas);

		document.body.appendChild(canvas);

		window.addEventListener('resize', () => this.resizeCanvas(canvas));
	}

	private setupEmitter(emitter: HTMLElement) {
		if (!emitter) return;
		emitter.addEventListener('click', (event) => this.trigger(event.clientX, event.clientY));
	}

	private clearScreen() {
		if (!this.ctx) return;
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	}

	private spawnBurst(position: Position) {
		this.bursts.push(new Burst(position, this.config));
	}

	private update(now: number = 0) {
		const deltaTime = (now - this.previousTime) / 1000;
		this.previousTime = now;

		for (let i = this.bursts.length - 1; i >= 0; i--) {
			this.bursts[i].update(deltaTime);
			if (this.bursts[i].particles.length === 0) {
				this.bursts.splice(i, 1);
			}
		}

		this.draw();
		window.requestAnimationFrame((ts) => this.update(ts));
	}

	private draw() {
		if (!this.ctx) return;

		this.clearScreen();
		for (const burst of this.bursts) {
			burst.draw(this.ctx);
		}
	}
}

class Burst {
	particles: Particle[] = [];

	constructor(position: Position, config: ConfettiConfig) {
		for (let i = 0; i < config.count; i++) {
			this.particles.push(new Particle(position, config));
		}
	}

	update(time: number) {
		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].update(time);
			if (this.particles[i].checkBounds()) {
				this.particles.splice(i, 1);
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		for (const particle of this.particles) {
			particle.draw(ctx);
		}
	}
}

class Particle {
	config!: ConfettiConfig;

	size: Position;
	position: Position;
	velocity: Position;
	rotation: number;
	rotationSpeed: number;
	hue: number;
	opacity: number;
	lifetime: number;

	constructor(position: Position, config: ConfettiConfig) {
		this.config = config;

		this.size = new Position(
			(16 * Math.random() + 4) * config.size,
			(4 * Math.random() + 4) * config.size
		);
		this.position = new Position(position.x - this.size.x / 2, position.y - this.size.y / 2);
		this.velocity = this.generateVelocity();
		this.rotation = 360 * Math.random();
		this.rotationSpeed = 10 * (Math.random() - 0.5);
		this.hue = 360 * Math.random();
		this.opacity = 100;
		this.lifetime = Math.random() + 0.25;
	}

	update(time: number) {
		this.velocity.y += this.config.gravity * (this.size.y / (10 * this.config.size)) * time;
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

	draw(ctx: CanvasRenderingContext2D) {
		this.drawRectangle(this.position, this.size, this.rotation, this.hue, this.opacity, ctx);
	}

	drawRectangle(
		position: Position,
		size: Position,
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
		return new Position(
			randomX * (Math.random() * this.config.power),
			randomY * (Math.random() * this.config.power)
		);
	}
}

class Position {
	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}
}

class ConfettiConfig {
	gravity: number = 10;
	count: number = 75;
	size: number = 1;
	power: number = 25;
	destroyEmitter: boolean = true;
	fade: boolean = false;
}
