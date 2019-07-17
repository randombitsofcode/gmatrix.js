import { v3 } from "./v3.js"

// Vector4 / Quaternion operations

export class v4 {
	constructor( x = 0, y = 0, z = 0, w = 0 ) {
		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
		this.isVector4 = true;
		return this;
	}

	static create( x = 0, y = 0, z = 0, w = 0 ) {
		return new this( x, y, z, w );
	}

	static from( a ) {
		if ( a.isVector4 ) return new this( a.x, a.y, a.z, a.w );
		if ( a.isVector3 ) return new this( a.x, a.y, a.z, 1 );
		if ( a.isArray ) return new this( a[0], a[1], a[2], a[3] );
	}

	static add( a, b ) {
		return new this( a.x + b.x, a.y + b.y, a.z + b.z, a.w || 0 + b.w || 0 );
	}

	static sub( a, b ) {
		return new this( a.x - b.x, a.y - b.y, a.z - b.z, a.w || 0 - b.w || 0 );
	}

	static mult( a, b ) {
		return new this( a.x * b.x, a.y * b.y, a.z * b.z, a.w || 0 * b.w || 0 )
	}

	static div( a, b ) {
		return new this( a.x / b.x, a.y / b.y, a.z / b.z, a.w || 0 / b.w || 0 );
	}

	static equals( a, b ) {
		return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
	}

	static inv( a ) {
		return new this( a.w || 0, a.z, a.y, a.x );
	}

	static set( v ) {
		return new this(v.x || v.a || v.r,
				v.y || v.b || v.g,
				v.z || v.c || v.b,
				v.w || v.d || v.a || 0 );
	}

	static distance( a, b ) {
		return Math.sqrt( ( a.x - b.x )*( a.x - b.x ) + ( a.y - b.y )*( a.y - b.y ) + ( a.z - b.z )*( a.z - b.z ) + ( a.w - b.w )*( a.w - b.w ) );
	}

	static distanceSquared( a, b ) {
		return ( a.x - b.x )*( a.x - b.x ) + ( a.y - b.y )*( a.y - b.y ) + ( a.z - b.z )*( a.z - b.z ) + ( a.w - b.w )*( a.w - b.w );
	}

	static dot( a ) {
		return a.x*a.x + a.y*a.y + a.z*a.z + square( a.w || 0 );
	}

	static clone( a ) {
		return new this( a.x, a.y, a.z, a.w || 0 );
	}

	static get zero() {
		return new this( 0, 0, 0, 0 );
	}

	static get random() { // ( -1 < xyzw < 1 )
		return new this( rand.float(2) - 1, rand.float(2) - 1, rand.float(2) - 1, rand.float(2) - 1 );
	}

	get x() { return this._x; }
	get y() { return this._y; }
	get z() { return this._z; }
	get w() { return this._w; }

	get s() { return this._x; }
	get t() { return this._y; }
	get u() { return this._z; }
	get v() { return this._w; }

	get r() { return this._x; }
	get g() { return this._y; }
	get b() { return this_.z; }
	get a() { return this_.w; }

	set x( n ) { return this._x = n; }
	set y( n ) { return this._y = n; }
	set z( n ) { return this._z = n; }
	set w( n ) { return this._w = n; }

	set s( n ) { return this._x = n; }
	set t( n ) { return this._y = n; }
	set u( n ) { return this._z = n; }
	set v( n ) { return this._w = n; }

	set r( n ) { return this._x = n; }
	set g( n ) { return this._y = n; }
	set b( n ) { return this_.z = n; }
	set a( n ) { return this_.w = n; }

	set xyz( vec3 ) {
		this._x = vec3.x;
		this._y = vec3.y;
		this._z = vec3.z;
		return this;
	}

	set rgb( vec3 ) {
		this._x = vec3.r;
		this._y = vec3.g;
		this._z = vec3.b;
		return this;
	}

	set( vec4 ) {
		this._x = vec4.x;
		this._y = vec4.y;
		this._z = vec4.z;
		this._w = vec4.w;
		return this;
	}

	add( v ) {
		this._x += v.x;
		this._y += v.y;
		this._z += v.z;
		this._w += v.w || 0;
		return this;
	}

	sub( v ) {
		this._x -= v.x;
		this._y -= v.y;
		this._z -= v.z;
		this._w -= v.w || 0;
		return this;
	}

	mult( v ) {
		this._x *= v.x;
		this._y *= v.y;
		this._z *= v.z;
		this._w *= v.w || 0;
		return this;
	}

	div( v ) {
		this._x /= v.x;
		this._y /= v.y;
		this._z /= v.z;
		this._w /= v.w || 1;
		return this;
	}

	equals( v ) {
		return this._x === v.x && this._y === v.y && this._z === v.z && this._w === v.w;
	}

	set( v ) {
		this._x = v.x;
		this._y = v.y;
		this._z = v.z;
		this._w = v.w || 0
		return this;
	}

	inv( v ) {
		this._x = v.w || 0;
		this._y = v.z;
		this._z = v.y;
		this._w = v.x;
		return this;
	}

	zero() {
		this._x = 0;
		this._y = 0;
		this._z = 0;
		this._w = 0;
		return this;
	}

	negate() {
		this._x = -this._x;
		this._y = -this._y;
		this._z = -this._z;
		this._w = -this._w;
		return this;
	}

	get negative() {
		return v3.create( -this._x, -this._y, -this._z, -this._w );
	}

	get length() {
		return Math.sqrt( this._x*this._x + this._y*this._y + this._z*this._z + this._w*this._w );
	}

	get dot() {
		return this._x*this._x + this._y*this._y + this._z*this._z + this._w*this._w;
	}

	get string() {
		return `[ ${this._x} ${this._y} ${this._z} ${this._w} ]`
	}

	scale( s ) {
		this._x *= s;
		this._y *= s;
		this._z *= s;
		this._w *= s;
		return this;
	}

	divideScalar( s ) {
		this._x /= s;
		this._y /= s;
		this._z /= s;
		this._w /= s;
		return this;
	}

	distanceTo( v ) {
		return Math.sqrt( square( this._x - v.x ) + square( this._y - v.y ) + square( this._z - v.z ) + square( this._w - v.w || 0 ) );
	}

	normalize() {
		return this.divideScalar( this.length || 1 );
	}

	multiplyQuaternion( v ) {
		[ this._x, this._y, this._z, this._w ] =
			[this._x * v.w + this._y * v.z - this._z * v.y + this._w * v.x,
			-this._x * v.z + this._y * v.w + this._z * v.x + this._w * v.y,
			 this._x * v.y - this._y * v.x + this._z * v.w + this._w * v.z,
			-this._x * v.x - this._y * v.y - this._z * v.z + this._w * v.w	];
		return this;
	}

	limit( l = 1 ) {
		let m = this.dot;
		if ( m > l ) {
			l /= Math.sqrt( m );
			this.scale( l );
		}
		return this;
	}

	setLength( m ) {
		return this.divideScalar( ( this.length || 1 ) / m )
	}

	toString() {
		return `[ ${this._x} ${this._y} ${this._z} ${this._w} ]`;
	}

	copy( v ) {
		this._x = v.x;
		this._y = v.y;
		this._z = v.z;
		this._w = v.w || this._w;
		return this;
	}

	fromArray( a ) {
		this._x = a[0];
		this._y = a[1];
		this._z = a[2];
		this._w = a[3] || this._w;
		return this;
	}

	clone() {
		return v4.create().copy( this );
	}

	static slerp( qa, qb, s ) {
		let l = s;
		if ( qa.x*qb.x + qa.y*qb.y + qa.z*qb.z + qa.w*qb.w < 0 )
			l = -s;
		this._x = 1 - s * qa.x + l * qb.x;
		this._y = 1 - s * qa.y + l * qb.y;
		this._z = 1 - s * qa.z + l * qb.z;
		this._w = 1 - s * qa.w + l * qb.w;
		return this;
	}

}

export let q4 = v4;
