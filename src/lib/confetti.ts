export const confetti = (node: HTMLElement, config: ConfettiConfig) => {
	new Confetti(node, config);

	return {
		destroy() {}
	};
};

class Confetti {
	static CONFIG: ConfettiConfig;
	static CTX: CanvasRenderingContext2D | null;

	gravity = 10;
	particleCount = 75;
	particleSize = 1;
	explosionPower = 25;
	destroyTarget = true;
	fade = false;
	bursts: Burst[] = [];
	time: number;
	deltaTime: number;

	active: boolean = false;

	constructor(element: HTMLElement, config: ConfettiConfig | null) {
		Confetti.CONFIG = config ?? new ConfettiConfig();

		this.time = new Date().getTime();
		this.deltaTime = 0;
		this.setupCanvasContext();
		this.setupElement(element);
	}

	startConfetti() {
		if (!this.active) {
			this.active = true;
			window.requestAnimationFrame((ts) => this.update(ts));
		}
	}

	stopConfetti() {
		this.active = false;
	}
	setCount(count: number): void {
		if (typeof count !== 'number') {
			throw new Error("Input must be of type 'number'");
		}
		Confetti.CONFIG.particleCount = count;
	}

	setPower(power: number): void {
		if (typeof power !== 'number') {
			throw new Error("Input must be of type 'number'");
		}
		Confetti.CONFIG.explosionPower = power;
	}

	setSize(size: number): void {
		if (typeof size !== 'number') {
			throw new Error("Input must be of type 'number'");
		}
		Confetti.CONFIG.particleSize = size;
	}

	setFade(fade: boolean): void {
		if (typeof fade !== 'boolean') {
			throw new Error("Input must be of type 'boolean'");
		}
		Confetti.CONFIG.fade = fade;
	}

	setDestroyTarget(destroy: boolean): void {
		if (typeof destroy !== 'boolean') {
			throw new Error("Input must be of type 'boolean'");
		}
		Confetti.CONFIG.destroyTarget = destroy;
	}

	private resetCanvasSize(canvas: HTMLCanvasElement) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	private setupCanvasContext(): void {
		if (Confetti.CTX) return;

		const canvas = document.createElement('canvas');
		Confetti.CTX = canvas.getContext('2d');
		if (!Confetti.CTX) return;

		this.resetCanvasSize(canvas);
		this.setStyleAttributes(canvas);
		document.body.appendChild(canvas);

		window.addEventListener('resize', () => this.resetCanvasSize(canvas));
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
			const position = new Point(event.clientX, event.clientY);
			this.bursts.push(new Burst(position));
			if (Confetti.CONFIG.destroyTarget) {
				element.style.visibility = 'hidden';
			}
		});
	}

	private update(timestamp?: number): void {
		if (timestamp === undefined) {
			timestamp = new Date().getTime();
		}

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
		console.log('draw confetti');
		Confetti.CTX && Confetti.CTX.clearRect(0, 0, 2 * window.innerWidth, 2 * window.innerHeight);
		for (const burst of this.bursts) {
			burst.draw();
		}
	}
}

class Burst {
	particles: Particle[] = [];

	constructor(position: Point) {
		for (let i = 0; i < Confetti.CONFIG.particleCount; i++) {
			this.particles.push(new Particle(position));
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

	draw(): void {
		for (const particle of this.particles) {
			particle.draw();
		}
	}
}

class Particle {
	size: Point;
	position: Point;
	velocity: Point;
	rotation: number;
	rotationSpeed: number;
	hue: number;
	opacity: number;
	lifetime: number;

	constructor(position: Point) {
		this.size = new Point(
			(16 * Math.random() + 4) * Confetti.CONFIG.particleSize,
			(4 * Math.random() + 4) * Confetti.CONFIG.particleSize
		);
		this.position = new Point(position.x - this.size.x / 2, position.y - this.size.y / 2);
		this.velocity = CanvasUtil.generateVelocity();
		this.rotation = 360 * Math.random();
		this.rotationSpeed = 10 * (Math.random() - 0.5);
		this.hue = 360 * Math.random();
		this.opacity = 100;
		this.lifetime = Math.random() + 0.25;
	}

	update(time: number): void {
		this.velocity.y +=
			Confetti.CONFIG.gravity * (this.size.y / (10 * Confetti.CONFIG.particleSize)) * time;
		this.velocity.x += 25 * (Math.random() - 0.5) * time;
		this.velocity.y *= 0.98;
		this.velocity.x *= 0.98;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.rotation += this.rotationSpeed;
		if (Confetti.CONFIG.fade) {
			this.opacity -= this.lifetime;
		}
	}

	checkBounds(): boolean {
		return this.position.y - 2 * this.size.x > 2 * window.innerHeight;
	}

	draw(): void {
		CanvasUtil.drawRectangle(this.position, this.size, this.rotation, this.hue, this.opacity);
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

const CanvasUtil = {
	drawRectangle: (position: Point, size: Point, rotation: number, hue: number, opacity: number) => {
		if (!Confetti.CTX) return;

		Confetti.CTX.save();
		Confetti.CTX.beginPath();
		Confetti.CTX.translate(position.x + size.x / 2, position.y + size.y / 2);
		Confetti.CTX.rotate((rotation * Math.PI) / 180);
		Confetti.CTX.rect(-size.x / 2, -size.y / 2, size.x, size.y);
		Confetti.CTX.fillStyle = 'hsla(' + hue + 'deg, 90%, 65%, ' + opacity + '%)';
		Confetti.CTX.fill();
		Confetti.CTX.restore();
	},
	generateVelocity: () => {
		const randomX = Math.random() - 0.5;
		let randomY = Math.random() - 0.7;
		const magnitude = Math.sqrt(randomX * randomX + randomY * randomY);
		randomY /= magnitude;
		return new Point(
			randomX * (Math.random() * Confetti.CONFIG.explosionPower),
			randomY * (Math.random() * Confetti.CONFIG.explosionPower)
		);
	}
};
