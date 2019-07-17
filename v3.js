export class v3 {
	constructor( x = 0, y = 0, z = 0 ) {
		this._x = x;
		this._y = y;
		this._z = z;
		Object.defineProperties( this, {
			0: {
				get() { return this._x; },
				set( n ) { return this._x = n }
			},
			1: {
				get() { return this._y; },
				set( n ) { return this._y = n }
			},
			2: {
				get() { return this._z; },
				set( n ) { return this._z = n }
			} } );
		this.isVector3 = true;
		return this;
	}

	static create( x = 0, y = 0, z = 0 ) {
		return new this( x, y, z );
	}

	static of( x, y, z ) {
		return new this( x, y, z );
	}

	static add( a, b ) {
		return new this( a.x + b.x, a.y + b.y, a.z || 0 + b.z || 0 );
	}

	static sub( a, b ) {
		return new this( a.x - b.x, a.y - b.y, a.z || 0 - b.z || 0 );
	}

	static mult( a, b ) {
		return new this( a.x * b.x, a.y * b.y, a.z || 0 * b.z || 0 )
	}

	static div( a, b ) {
		return new this( a.x / b.x, a.y / b.y, a.z || 0 / b.z || 1 );
	}

	static equals( a, b ) {
		return a.x === b.x && a.y === b.y && a.z === b.z;
	}

	static inv( a ) {
		return new this( a.z || 0, a.y, a.x );
	}

	static normalize( a ) {
		return new this( a.x, a.y, a.z ).divideScalar( a.length || 1 );
	}

	static set( v ) {
		return new this(v.x || v.a || v.r,
				v.y || v.b || v.g,
				v.z || v.c || v.b || 0 );
	}

	static distance( a, b ) {
		return Math.sqrt( ( a.x - b.x )*( a.x - b.x ) + ( a.y - b.y )*( a.y - b.y ) + ( a.z - b.z )*( a.z - b.z ) );
	}

	static distanceSquared( a, b ) {
		return ( a.x - b.x )*( a.x - b.x ) + ( a.y - b.y )*( a.y - b.y ) + ( a.z - b.z )*( a.z - b.z );
	}

	static dot( a ) {
		return a.x*a.x + a.y*a.y + squared( a.z || 0 );
	}

	static cross( a, b ) {
		return new this( a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x );
	}

	static clone( a ) {
		return new this( a.x, a.y, a.z || 0 );
	}

	static get zero() {
		return new this( 0, 0, 0 );
	}

	static get up() {
		return new this( 0, 1, 0 );
	}

	static get random() { // ( -1 < xyz < 1 )
		return new this( rand.float(2) - 1, rand.float(2) - 1, rand.float(2) - 1 );
	}

	get x() { return this._x; }
	get y() { return this._y; }
	get z() { return this._z; }

	get a() { return this._x; }
	get b() { return this._y; }
	get c() { return this_.z; }

	get r() { return this._x; }
	get g() { return this._y; }
	get b() { return this_.z; }

	set x( n ) { return this._x = n; }
	set y( n ) { return this._y = n; }
	set z( n ) { return this._z = n; }

	set a( n ) { return this._x = n; }
	set b( n ) { return this._y = n; }
	set c( n ) { return this._z = n; }

	set r( n ) { return this._x = n; }
	set g( n ) { return this._y = n; }
	set b( n ) { return this._z = n; }

	set xy( vec2 ) {
		this._x = vec2.x;
		this._y = vec2.y;
		return this;
	}

	add( v ) {
		this._x += v.x;
		this._y += v.y;
		this._z += v.z || 0;
		return this;
	}

	sub( v ) {
		this._x -= v.x;
		this._y -= v.y;
		this._z -= v.z || 0;
		return this;
	}

	mult( v ) {
		this._x *= v.x;
		this._y *= v.y;
		this._z *= v.z || 0;
		return this;
	}

	div( v ) {
		this._x /= v.x;
		this._y /= v.y;
		this._z /= v.z || 1;
		return this;
	}

	equals( v ) {
		return this._x === v.x && this._y === v.y && this._z === v.z;
	}

	set( v ) {
		this._x = v.x;
		this._y = v.y;
		this._z = v.z || 0
		return this;
	}

	inv( v ) {
		this._x = v.z || 0;
		this._y = v.y;
		this._z = v.x;
		return this;
	}

	zero() {
		this._x = 0;
		this._y = 0;
		this._z = 0;
		return this;
	}

	negate() {
		this._x = -this._x;
		this._y = -this._y;
		this._z = -this._z;
		return this;
	}

	get negative() {
		return v3.create( -this._x, -this._y, -this._z );
	}

	get length() {
		return Math.sqrt( this._x*this._x + this._y*this._y + this._z*this._z );
	}

	get dot() {
		return this._x*this._x + this._y*this._y + this._z*this._z;
	}

	scale( s ) {
		this._x *= s;
		this._y *= s;
		this._z *= s;
		return this;
	}

	divideScalar( s ) {
		this._x /= s;
		this._y /= s;
		this._z /= s;
		return this;
	}

	distanceTo( v ) {
		return Math.sqrt( square( this._x - v.x ) + square( this._y - v.y ) + square( this._z - v.z || 0 ) );
	}

	normalize() {
		return this.divideScalar( this.length || 1 );
	}

	cross( v ) {
		[ this._x, this._y, this._z ] = [ this._y * v.z - this._z * v.y, this._z * v.x - this._x * v.z, this._x * v.y - this._y * v.x ];
		return this;
	}

	limit( l = 1 ) {
		let m = this.dot;
		if ( m > l ) {
			l /= Math.sqrt( m );
			scale( l );
		}
		return this;
	}

	setLength( m ) {
		return this.divideScalar( ( this.length || 1 ) / m )
	}

	toString() {
		return `[ ${this._x} ${this._y} ${this._z} ]`;
	}

	copy( v ) {
		this._x = v.x;
		this._y = v.y;
		this._z = v.z;
		return this;
	}

	clone() {
		return v3.create().copy( this );
	}
}
