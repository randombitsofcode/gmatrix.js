import { v3 } from "./v3.js"
import { v4 } from "./v4.js"

// Matrix4 operations

export class m4 {
	constructor( r = 1 ) {
		this.a = new v4( r, 0, 0, 0 );
		this.b = new v4( 0, r, 0, 0 );
		this.c = new v4( 0, 0, r, 0 );
		this.d = new v4( 0, 0, 0, r );
		this.isMatrix4 = true;
		return this;
	}

	static create() {
		return new this();
	}

	static empty() { // private
		return { isMatrix4: true, __proto__: m4.prototype };
	}

	static set( mat4 ) {
		return new this().copy( mat4 );
	}

	static translate( vec3 = { x: 0, y: 0, z: 0 } ) {
		return new this( 1 ).d.xyz = vec3;
	}

	static get zero() {
		return new this( 0 );
	}

	static get identity() {
		return new this( 1 );
	}

	static multiply( a, b ) {
		return new this().set( a ).multiply( b );
	}

	static multiplyFaster( a, b, c ) { // operating on mat4 arrays would be much faster!
		c.e0 = a.e0 * b.e0 + a.e1 * b.e4 + a.e2 * b.e8 + a.e3 * b.e12;
		c.e1 = a.e0 * b.e1 + a.e1 * b.e5 + a.e2 * b.e9 + a.e3 * b.e13;
		c.e2 = a.e0 * b.e2 + a.e1 * b.e6 + a.e2 * b.e10 + a.e3 * b.e14;
		c.e3 = a.e0 * b.e3 + a.e1 * b.e7 + a.e2 * b.e11 + a.e3 * b.e15;
		c.e4 = a.e4 * b.e0 + a.e5 * b.e4 + a.e6 * b.e8 + a.e7 * b.e12;
		c.e5 = a.e4 * b.e1 + a.e5 * b.e5 + a.e6 * b.e9 + a.e7 * b.e13;
		c.e6 = a.e4 * b.e2 + a.e5 * b.e6 + a.e6 * b.e10 + a.e7 * b.e14;
		c.e7 = a.e4 * b.e3 + a.e5 * b.e7 + a.e6 * b.e11 + a.e7 * b.e15;
		c.e8 = a.e8 * b.e0 + a.e9 * b.e4 + a.e10 * b.e8 + a.e11 * b.e12;
		c.e9 = a.e8 * b.e1 + a.e9 * b.e5 + a.e10 * b.e9 + a.e11 * b.e13;
		c.e10 = a.e8 * b.e2 + a.e9 * b.e6 + a.e10 * b.e10 + a.e11 * b.e14;
		c.e11 = a.e8 * b.e3 + a.e9 * b.e7 + a.e10 * b.e11 + a.e11 * b.e15;
		c.e12 = a.e12 * b.e0 + a.e13 * b.e4 + a.e14 * b.e8 + a.e15 * b.e12;
		c.e13 = a.e12 * b.e1 + a.e13 * b.e5 + a.e14 * b.e9 + a.e15 * b.e13;
		c.e14 = a.e12 * b.e2 + a.e13 * b.e6 + a.e14 * b.e10 + a.e15 * b.e14;
		c.e15 = a.e12 * b.e3 + a.e13 * b.e7 + a.e14 * b.e11 + a.e15 * b.e15;
		return c;
	}

	static lookat() {
		return this.empty().lookat();
	}

	static project() {
		return this.empty().project();
	}

	set x( vec4 ) { if ( vec4.isVector4 ) return this.a.copy( vec4 ); return this.a.fromArray( vec4 ) }
	set y( vec4 ) { if ( vec4.isVector4 ) return this.b.copy( vec4 ); return this.b.fromArray( vec4 ) }
	set z( vec4 ) { if ( vec4.isVector4 ) return this.c.copy( vec4 ); return this.c.fromArray( vec4 ) }
	set w( vec4 ) { if ( vec4.isVector4 ) return this.d.copy( vec4 ); return this.d.fromArray( vec4 ) }

	get x() { return this.a }
	get y() { return this.b }
	get z() { return this.c }
	get w() { return this.d }

	get e0() { return this.a.x }
	get e1() { return this.a.y }
	get e2() { return this.a.z }
	get e3() { return this.a.w }
	get e4() { return this.b.x }
	get e5() { return this.b.y }
	get e6() { return this.b.z }
	get e7() { return this.b.w }
	get e8() { return this.c.x }
	get e9() { return this.c.y }
	get e10() { return this.c.z }
	get e11() { return this.c.w }
	get e12() { return this.d.x }
	get e13() { return this.d.y }
	get e14() { return this.d.z }
	get e15() { return this.d.w }

	set e0( n ) { return this.a.x = n }
	set e1( n ) { return this.a.y = n }
	set e2( n ) { return this.a.z = n }
	set e3( n ) { return this.a.w = n }
	set e4( n ) { return this.b.x = n }
	set e5( n ) { return this.b.y = n }
	set e6( n ) { return this.b.z = n }
	set e7( n ) { return this.b.w = n }
	set e8( n ) { return this.c.x = n }
	set e9( n ) { return this.c.y = n }
	set e10( n ) { return this.c.z = n }
	set e11( n ) { return this.c.w = n }
	set e12( n ) { return this.d.x = n }
	set e13( n ) { return this.d.y = n }
	set e14( n ) { return this.d.z = n }
	set e15( n ) { return this.d.w = n }

	get string() {
		return this.a.string + "\n" + this.b.string + "\n" + this.c.string + "\n" + this.d.string;
	}

	get array() {
		return [ 	this.a.x, this.a.y, this.a.z, this.a.w,
				this.b.x, this.b.y, this.b.z, this.b.w,
				this.c.x, this.c.y, this.c.z, this.c.w,
				this.d.x, this.d.y, this.d.z, this.d.w	];
	}

	output() {
		console.log( "%c" + this.a.string + "\n%c" + this.b.string + "\n%c" + this.c.string + "\n%c" + this.d.string, "color:#ff22bb", "color:#22ff22", "color:#55ffff", "color:#dd99ff" );
	}

	do( f, a ) {
		this.a[f](a);
		this.b[f](a);
		this.c[f](a);
		this.d[f](a);
		return this;
	}

	copy( m ) {
		this.a.copy( m.x );
		this.b.copy( m.y );
		this.c.copy( m.z );
		m.w && this.d.copy( m.w );
		return this;
	}

	copyPosition( mat4 ) {
		this.d.xyz = mat4.d;
		return this;
	}

	set( mat4 ) {
		this.a.set( mat4.a );
		this.b.set( mat4.b );
		this.c.set( mat4.c );
		this.d.set( mat4.d );
		return this;
	}

	add( mat4 ) {
		this.a.add( mat4.a );
		this.b.add( mat4.b );
		this.c.add( mat4.c );
		this.d.add( mat4.d );
		return this;
	}

	sub( mat4 ) {
		this.a.sub( mat4.a );
		this.b.sub( mat4.b );
		this.c.sub( mat4.c );
		this.d.sub( mat4.d );
		return this;
	}

	equals( mat4 ) {
		return this.a.equals( mat4.a ) && this.b.equals( mat4.b ) && this.c.equals( mat4.c ) && this.d.equals( mat4.d );
	}

	scale( x = 1, y = 1, z = 1 ) {
		[ this.a.x, this.b.y, this.c.z ] = [ x, y, z ];
		return this;
	}

	transpose() {
		[ 	this.a.y, this.a.z, this.a.w,
			this.b.x, this.b.z, this.b.w,
			this.c.x, this.c.y, this.c.w,
			this.d.x, this.d.y, this.d.z
		] = [
			this.b.x, this.c.x, this.d.x,
			this.a.y, this.c.y, this.d.y,
			this.a.z, this.b.z, this.d.z,
			this.a.w, this.b.w, this.c.w
		]
		return this;
	}

	multiply( b ) {
		this.x = [ 	this.e0 * b.e0 + this.e1 * b.e4 + this.e2 * b.e8 + this.e3 * b.e12,
			 	this.e0 * b.e1 + this.e1 * b.e5 + this.e2 * b.e9 + this.e3 * b.e13,
				this.e0 * b.e2 + this.e1 * b.e6 + this.e2 * b.e10 + this.e3 * b.e14,
				this.e0 * b.e3 + this.e1 * b.e7 + this.e2 * b.e11 + this.e3 * b.e15 ];
		this.y = [	this.e4 * b.e0 + this.e5 * b.e4 + this.e6 * b.e8 + this.e7 * b.e12,
				this.e4 * b.e1 + this.e5 * b.e5 + this.e6 * b.e9 + this.e7 * b.e13,
				this.e4 * b.e2 + this.e5 * b.e6 + this.e6 * b.e10 + this.e7 * b.e14,
				this.e4 * b.e3 + this.e5 * b.e7 + this.e6 * b.e11 + this.e7 * b.e15 ];
		this.z = [	this.e8 * b.e0 + this.e9 * b.e4 + this.e10 * b.e8 + this.e11 * b.e12,
				this.e8 * b.e1 + this.e9 * b.e5 + this.e10 * b.e9 + this.e11 * b.e13,
				this.e8 * b.e2 + this.e9 * b.e6 + this.e10 * b.e10 + this.e11 * b.e14,
				this.e8 * b.e3 + this.e9 * b.e7 + this.e10 * b.e11 + this.e11 * b.e15 ];
		this.w = [	this.e12 * b.e0 + this.e13 * b.e4 + this.e14 * b.e8 + this.e15 * b.e12,
				this.e12 * b.e1 + this.e13 * b.e5 + this.e14 * b.e9 + this.e15 * b.e13,
				this.e12 * b.e2 + this.e13 * b.e6 + this.e14 * b.e10 + this.e15 * b.e14,
				this.e12 * b.e3 + this.e13 * b.e7 + this.e14 * b.e11 + this.e15 * b.e15 ];
		return this;
	}

	premultiply( mat4 ) {
		return m4.multiply( mat4, this );
	}

	multiplyScalar( s ) {
		this.do( "scale", s );
		return this;
	}

	divideScalar( s ) {
		this.do( "divideScalar", s );
		return this;
	}

	zero() {
		this.do( "zero" );
		return this;
	}

	lookat( ...params ) {
		let x = new v3(), y = new v3(), z = new v3(), zero = v3.zero, def_up = v3.up;

		return ( ( eye, center = zero, up = def_up ) => {

			z.set( eye ).sub( center ).normalize(); // -z vector
			x.set( up ).cross( z ); // +x vector
			y.set( z ).cross( x ); // camera +y vector

			this.a = new v4( x.x, x.y, x.z, 0 );
			this.b = new v4( y.x, y.y, y.z, 0 );
			this.c = new v4( z.x, z.y, z.z, 0 );
			this.d = new v4( eye.x, eye.y, eye.z, 1 );

			return this;

		} ) ( ...params )
	}

	project( fov = _half_pi_, aspect = 1, near = 1, far = 1e5 ) {

		let f = Math.tan( fov * 0.5 );
		let rInv = 1 / ( near - far );

		this.a = new v4( f * aspect, 0, 0, 0 );
		this.b = new v4( 0, 1/f, 0, 0 );
		this.c = new v4( 0, 0, ( near + far ) * rInv, -1 );
		this.d = new v4( 0, 0, near * far * rInv * 2, 0 );

		return this;
	}

	multVec4( v ) {
		return new v4( 	this.e0 * v.x + this.e4 * v.y + this.e8 * v.z + this.e12 * v.w,
		 		this.e1 * v.x + this.e5 * v.y + this.e9 * v.z + this.e13 * v.w,
				this.e2 * v.x + this.e6 * v.y + this.e10 * v.z + this.e14 * v.w,
				this.e3 * v.x + this.e7 * v.y + this.e11 * v.z + this.e15 * v.w );
	}

}
