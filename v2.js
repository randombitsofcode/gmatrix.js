export class v2 {
	constructor( x = 0, y = 0 ) {
		this._x = x;
		this._y = y;
		this.isVector2 = true;
		return this;
	}

	static create( x = 0, y = 0 ) {
		return new this( x, y );
	}

	static of( x, y ) {
		return new this( x, y );
	}

	static add( a, b ) {
		return new this( a.x + b.x, a.y + b.y );
	}

	static sub( a, b ) {
		return new this( a.x - b.x, a.y - b.y );
	}

	static mult( a, b ) {
		return new this( a.x * b.x, a.y * b.y )
	}

	static div( a, b ) {
		return new this( a.x / b.x, a.y / b.y );
	}

	static equals( a, b ) {
		return a.x === b.x && a.y === b.y;
	}

	static distance( a, b ) {
		return Math.sqrt( ( a.x - b.x ) * ( a.x - b.x ) + ( a.y - b.y ) * ( a.y - b.y ) );
	}

	static distanceSquared( a, b ) {
		return ( a.x - b.x ) * ( a.x - b.x ) + ( a.y - b.y ) * ( a.y - b.y );
	}

	static cross( a, b ) {
		return a.x * b.y - a.y * b.x;
	}

	static inv( a ) {
		return new this( a.y, a.x );
	}

	static set( a ) {
		return new this( a.x, a.y );
	}

	static clone( a ) {
		return new this( a.x, a.y );
	}

	static get zero() {
		return new this( 0, 0 );
	}

	get x() { return this._x }
	get y() { return this._y }

	set x( n ) { return this._x = n }
	set y( n ) { return this._y = n }

	get re() { return this._x }
	get im() { return this._y }

	set re( n ) { return this._x = n }
	set im( n ) { return this._y = n }

	get length() {
		return Math.sqrt( this._x*this._x + this._y*this._y );
	}

	get dot() {
		return this._x*this._x + this._y*this._y;
	}

	get negative() {
		return new this( -this._x, -this._y );
	}

	add( v ) {
		this._x += v.x;
		this._y += v.y;
		return this;
	}

	sub( v ) {
		this._x -= v.x;
		this._y -= v.y;
		return this;
	}

	mult( v ) {
		this._x *= v.x;
		this._y *= v.y;
		return this;
	}

	div( v ) {
		this._x /= v.x;
		this._y /= v.y;
		return this;
	}

	equals( v ) {
		return a.x === b.x && a.y === b.y;
	}

	set( v ) {
		this._x = v.x;
		this._y = v.y;
		return this;
	}

	negate() {
		this._x = -this._x;
		this._y = -this._y;
		return this;
	}

	inv( v ) {
		this._x = v.y;
		this._y = v.x;
		return this;
	}

	zero() {
		this._x = 0;
		this._y = 0;
		return this;
	}

	divideScalar( s ) {
		this._x /= s;
		this._y /= s;
		return this;
	}

	normalize() {
		return divideScalar( this.length || 1 );
	}

	scale( s ) {
		this._x *= s;
		this._y *= s;
		return this;
	}

	limit( l = 1 ) {
		let m = this.dot;
		if ( m > (l*l) ) {
			l /= Math.sqrt( m );
			this.scale( l );
		}
		return this;
	}

	atan2() {
		return Math.atan2( this._x, this._y );
	}

	setLength( m ) {
		return this.divideScalar( ( this.length || 1 ) / m )
	}

	toString() {
		return `[ ${this._x} ${this._y} ]`;
	}

	copy( a ) {
		this._x = a.x;
		this._y = a.y;
	}

	clone() {
		return v2.create( this._x, this._y )
	}
}
