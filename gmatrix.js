// @ https://github.com/randombitsofcode

MatrixArray = Float32Array || WebGLFloatArray || Array;

let vec3 = Object( null );
vec3.create = function( x = 0, y = 0, z = 0 ) {
	return new MatrixArray( [ x, y, z ] );
};

vec3.set = function( a, b ) {
	a[0] = b[0];
	a[1] = b[1];
	a[2] = b[2];
	return a;
};

vec3.add = function( a, b, c = null ) {
	if ( c ) {
		c[0] = a[0] + b[0];
		c[1] = a[1] + b[1];
		c[2] = a[2] + b[2];
		return c;
	}
	return [ a[0] + b[0], a[1] + b[1], a[2] + b[2] ];
};

vec3.subtract = function( a, b, c ) {
	if ( c ) {
		c[0] = a[0] - b[0];
		c[1] = a[1] - b[1];
		c[2] = a[2] - b[2];
		return c;
	}
	return [ a[0] - b[0], a[1] - b[1], a[2] - b[2] ];
};

vec3.negate = function( a, b ) {
	if ( b ) {
		b[0] = -a[0];
		b[1] = -a[1];
		b[2] = -a[2];
		return b;
	}
	return [ -a[0], -a[1], -a[2] ];
};

vec3.scale = function( a, b, c ) {
	if ( c ) {
		c[0] = a[0] * b;
		c[1] = a[1] * b;
		c[2] = a[2] * b;
		return c;
	}
	return [ a[0] * b, a[1] * b, a[2] * b ];
};

vec3.mult = function( a, b, c = null ) { // componentwise
	if ( c ) {
		c[0] = a[0] * b[0];
		c[1] = a[1] * b[1];
		c[2] = a[2] * b[2];
		return c;
	}
	return [ a[0] * b[0], a[1] * b[1], a[2] * b[2] ];
};

vec3.multiply = function( a, b, c = null ) { // scalar
	if ( c ) {
		c[0] = a[0] * b;
		c[1] = a[1] * b;
		c[2] = a[2] * b;
		return c;
	}
	return [ a[0] * b, a[1] * b, a[2] * b ];
};

vec3.div = function( a, b, c = null ) { // scalar
	if ( c ) {
		c = vec3.multiply( a, 1/b );
		return c;
	}
	return vec3.multiply( a, 1/b );
};

vec3.divide = function( a, b, c ) { // componentwise
	if ( c ) {
		c[0] = a[0] / b[0];
		c[1] = a[1] / b[1];
		c[2] = a[2] / b[2];
		return c;
	}
	return [ a[0] / b[0], a[1] / b[1], a[2] / b[2] ];
};

vec3.length = function( a ) {
	return Math.sqrt( a[0]*a[0] + a[1]*a[1] + a[2]*a[2] );
};

vec3.normalize = function( a, b ) {
	if ( b ) {
		vec3.divide( a, vec3.length( a ), b );
		return b;
	}
	return vec3.div( a, vec3.length( a ) );
};

vec3.destabilize = function( a, b ) { // only works for values close to 1
	b || ( b = a );
	b = vec3.mult( a, 1.5 - 0.5 * ( a[0]*a[0] + a[1]*a[1] + a[2]*a[2] ), b );
	return b;
};

vec3.stabilize = function( a, b ) {
	if ( b ) {
		b[0] = 1 /( 1 + Math.exp(-a[0]) );
		b[1] = 1 /( 1 + Math.exp(-a[1]) );
		b[2] = 1 /( 1 + Math.exp(-a[2]) );
		return b;
	}
	return [ 1 /( 1 + Math.exp(-a[0]) ), 1 /( 1 + Math.exp(-a[1]) ), 1 /( 1 + Math.exp(-a[2]) ) ];
};

vec3.fastSigmoid = function( a, b ) {
	if ( b ) {
		b[0] = x / ( 1 + abs( a[0] ) );
		b[1] = x / ( 1 + abs( a[1] ) );
		b[2] = x / ( 1 + abs( a[2] ) );
		return b;
	}
	return [ x / ( 1 + abs( a[0] ) ), x / ( 1 + abs( a[0] ) ), x / ( 1 + abs( a[0] ) ) ];
};

let tanh = Math.tanh;
vec3.tanh = function( a, b ) {
	if ( b ) {
		b[0] = tanh( a[0] );
		b[1] = tanh( a[1] );
		b[2] = tanh( a[2] );
		return b;
	}
	return [ tanh( a[0] ), tanh( a[1] ), tanh( a[2] ) ];
};

vec3.cross = function( a, b, c ) {
	if ( c ) {
		c[0] = a[1] * b[2] - a[2] * b[1];
		c[1] = a[2] * b[0] - a[0] * b[2];
		c[2] = a[0] * b[1] - a[1] * b[0];
		return c;
	}
	return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
};

vec3.dot = function( a, b ) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

vec3.direction = function( a, b, c = null ) {
	c || ( c = a );
	c[0] = a[0] - b[0];
	c[1] = a[1] - b[1];
	c[2] = a[2] - b[2];
	let m = Math.sqrt( c[0]*c[0] + c[1]*c[1] + c[2]*c[2] );
	if ( !m ) {
		c[0] = 0;	c[1] = 0;	c[2] = 0;
		return c;
	}
	m = 1/m;
	c[0] *= m;
	c[1] *= m;
	c[2] *= m;
	return c;
};

vec3.str = function( a, i = 0 ) {
	return "[" + a[i] + "," + a[i+1] + "," + a[i+2] + "]";
};

vec3.lerp = function( a, b, c, d ) {
	d || ( d = a );
	d[0] = a[0] + c * ( b[0] - a[0] );
	d[1] = a[1] + c * ( b[1] - a[1] );
	d[2] = a[2] + c * ( b[2] - a[2] );
	return d;
};

let mat3 = Object( null );
mat3.create = function( a = null ) {
	a = new MatrixArray( 9 );
	return a;
};

mat3.set = function( a, b ) {
	b[0] = a[0];	b[1] = a[1];	b[2] = a[2];
	b[3] = a[3];	b[4] = a[4];	b[5] = a[5];
	b[6] = a[6];	b[7] = a[7];	b[8] = a[8];
	return b;
};

mat3.identity = function( a ) {
	if ( a ) {
		a[0] = 1;	a[1] = 0;	a[2] = 0;
		a[3] = 0;	a[4] = 1;	a[5] = 0;
		a[6] = 0;	a[7] = 0;	a[8] = 1;
		return a;
	}
	return [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
}

mat3.transpose = function( a, b ) {
	if ( b ) {
		b[0] = a[0];	b[1] = a[3];	b[2] = a[6];
		b[3] = a[1];	b[4] = a[4];	b[5] = a[7];
		b[6] = a[2];	b[7] = a[5];	b[8] = a[8];
		return b;
	}
	return [ a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8] ];
};

mat3.mat4 = function( a, b ) {
	if ( b ) {
		b[0] = a[0];	b[1] = a[1];	b[2] = a[2];	b[3] = 0;
		b[4] = a[3];	b[5] = a[4];	b[6] = a[5];	b[7] = 0;
		b[8] = a[6];	b[9] = a[7];	b[10] = a[8];	b[11] = 0;
		b[12] = 0;	b[13] = 0;	b[14] = 0;	b[15] = 1;
		return b;
	}
	return [	a[0],	a[1],	a[2],	0,
			a[3],	a[4],	a[5],	0,
			a[6],	a[7],	a[8],	0,
			0,	0,	0,	1
	];
};

mat3.str = function( a ) {
	return 	vec3.str( a, 0 ) + ", " +
		vec3.str( a, 3 ) + ", " +
		vec3.str( a, 6 );
};

mat3.determinant = function( a ) {
	return a[0] * ( a[4] * a[8] - a[5] * a[7] ) -
		a[1] * ( a[3] * a[8] - a[5] * a[6] ) +
		a[2] * ( a[3] * a[7] - a[4] * a[6] );
};

let quat4 = vec4 = Object( null );
vec4.create = function( x = 0, y = 0, z = 0, w = 0 ) {
	return new MatrixArray( [ x, y, z, w ] );
};

vec4.set = function( a, b ) {
	a[0] = b[0];
	a[1] = b[1];
	a[2] = b[2];
	a[3] = b[3];
	return a;
};

vec4.scalarMult = function( a, b, c ) { // scalar
	if ( c ) {
		c[0] = a[0] * b;
		c[1] = a[1] * b;
		c[2] = a[2] * b;
		c[3] = a[3] * b;
		return c;
	}
	return [ a[0] * b, a[1] * b, a[2] * b, a[3] * b ];
}

vec4.mult = function( a, b, c ) { // componentwise multiplication
	if ( c ) {
		c[0] = a[0] * b[0];
		c[1] = a[1] * b[1];
		c[2] = a[2] * b[2];
		c[3] = a[3] * b[3];
		return c;
	}
	return [ a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3] ];
};

vec4.div = function( a, b, c ) { // scalar
	if ( c ) {
		vec4.multiply( a, 1/b, c );
		return c;
	}
	return vec4.multiply( a, 1/b );
};

vec4.divide = function( a, b, c ) { // componentwise
	if ( c ) {
		c[0] = a[0] / b[0];
		c[1] = a[1] / b[1];
		c[2] = a[2] / b[2];
		c[3] = a[3] / b[3];
		return c;
	}
	return 	[	a[0] / b[0],
			a[1] / b[1],
			a[2] / b[2],
			a[3] / b[3]
	];
};

vec4.length = function( a ) {
	return Math.sqrt( a[0]*a[0] + a[1]*a[1] + a[2]*a[2] + a[3]*a[3] );
};

vec4.negate = function( a, b = null ) {
	if ( b ) {
		b[0] = -a[0];
		b[1] = -a[1];
		b[2] = -a[2];
		b[3] = -a[3];
		return b;
	}
	return [ -a[0], -a[1], -a[2], -a[3] ];
};

vec4.normalize = function( a, b ) {
	if ( b ) {
		vec4.divide( a, vec4.length( a ), b );
		return b;
	}
	return vec4.divide( a, vec4.length( a ) );
};

vec4.forceW = function( a, b ) {
	if ( b ) {
		b[3] = -Math.sqrt( Math.abs( 1 - a[0]*a[0] - a[1]*a[1] - a[2]*a[2] ) );
		return b;
	}
	return -Math.sqrt( Math.abs( 1 - a[0]*a[0] - a[1]*a[1] - a[2]*a[2] ) );
};

vec4.multiply = function( a, b, c ) {
	if ( c ) {
		c[0] = a[0] * b[3] + a[3] * b[0] + a[1] * b[2] - a[2] * b[1];
		c[1] = a[1] * b[3] + a[3] * b[1] + a[2] * b[0] - a[0] * b[2];
		c[2] = a[2] * b[3] + a[3] * b[2] + a[0] * b[1] - a[1] * b[0];
		c[3] = a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2];
		return c;
	}
	return [
		a[0] * b[3] + a[3] * b[0] + a[1] * b[2] - a[2] * b[1],
		a[1] * b[3] + a[3] * b[1] + a[2] * b[0] - a[0] * b[2],
		a[2] * b[3] + a[3] * b[2] + a[0] * b[1] - a[1] * b[0],
		a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]
	];
};

vec4.str = function( a, i = 0 ) {
	return "[" + a[i] + "," + a[i+1] + "," + a[i+2] + "," + a[i+3] + "]";
};

vec3.lenSq = function( a ) {
	return a[0]*a[0] + a[1]*a[1] + a[2]*a[2];
};

vec4.lenSq = function( a ) {
	return a[0]*a[0] + a[1]*a[1] + a[2]*a[2] + a[3]*a[3];
};

vec4.slerp = function( a, b, c, d = 0 ) {
	let e = c;
	//if ( a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*b[3] < 0 )
	//	e = -c;
	if ( d ) {
		d[0] = 1 - c * a[0] + e * b[0];
		d[1] = 1 - c * a[1] + e * b[1];
		d[2] = 1 - c * a[2] + e * b[2];
		d[3] = 1 - c * a[3] + e * b[3];
		return d;
	}
	return [ 	1 - c * a[0] + e * b[0],
			1 - c * a[1] + e * b[1],
			1 - c * a[2] + e * b[2],
			1 - c * a[3] + e * b[3]
	];
};

let mat4 = Object( null );
mat4.create = function() {
	return new MatrixArray( 16 );
};

mat4.set = function( b, a ) {
	b[0] = a[0];	b[1] = a[1];	b[2] = a[2];	b[3] = a[3];
	b[4] = a[4];	b[5] = a[5];	b[6] = a[6];	b[7] = a[7];
	b[8] = a[8];	b[9] = a[9];	b[10] = a[10];	b[11] = a[11];
	b[12] = a[12];	b[13] = a[13];	b[14] = a[14];	b[15] = a[15];
	return b;
};

mat4.identity = function( a ) {
	if ( a ) {
		a[0] = 1;	a[1] = 0;	a[2] = 0;	a[3] = 0;
		a[4] = 0;	a[5] = 1;	a[6] = 0;	a[7] = 0;
		a[8] = 0;	a[9] = 0;	a[10] = 1;	a[11] = 0;
		a[12] = 0;	a[13] = 0;	a[14] = 0;	a[15] = 1;
		return a;
	}
	return [ 	1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
	];
};

mat4.translate = function( x = 0, y = 0, z = 0, a ) {
	if ( a ) {
		a[0] = 1;	a[1] = 0;	a[2] = 0;	a[3] = x;
		a[4] = 0;	a[5] = 1;	a[6] = 0;	a[7] = y;
		a[8] = 0;	a[9] = 0;	a[10] = 1;	a[11] = z;
		a[12] = 0;	a[13] = 0;	a[14] = 0;	a[15] = 1;
		return a;
	}
	return [ 	1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1
	];
};

mat4.scale = function( x = 1, y = 1, z = 1, a ) {
	if ( a ) {
		a[0] = x;	a[1] = 0;	a[2] = 0;	a[3] = 0;
		a[4] = 0;	a[5] = y;	a[6] = 0;	a[7] = 0;
		a[8] = 0;	a[9] = 0;	a[10] = z;	a[11] = 0;
		a[12] = 0;	a[13] = 0;	a[14] = 0;	a[15] = 1;
		return a;
	}
	return [ 	x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1
	];
}

mat4.transpose = function( a, b ) {
	if( b ) {
		b[0] = a[0];
		b[5] = a[5];
		b[10] = a[10];
		b[15] = a[15];
		b[1] = a[4];
		b[4] = a[1];
		b[2] = a[8];
		b[8] = a[2];
		b[3] = a[12];
		b[12] = a[3];
		b[6] = a[9];
		b[9] = a[6];
		b[7] = a[13];
		b[13] = a[7];
		b[11] = a[14];
		b[14] = a[11];
		return b;
	}
	return [ a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15] ];
};

mat4.determinant = function( a ) {
	return a[12] * a[9] * a[6] * a[3] -
		a[8] * a[13] * a[6] * a[3] -
		a[12] * a[5] * a[10] * a[3] +
		a[4] * a[13] * a[10] * a[3] +
		a[8] * a[5] * a[14] * a[3] -
		a[4] * a[9] * a[14] * a[3] -
		a[12] * a[9] * a[2] * a[7] +
		a[8] * a[13] * a[2] * a[7] +
		a[12] * a[1] * a[10] * a[7] -
		a[0] * a[13] * a[10] * a[7] -
		a[8] * a[1] * a[14] * a[7] +
		a[0] * a[9] * a[14] * a[7] +
		a[12] * a[5] * a[2] * a[11] -
		a[4] * a[13] * a[2] * a[11] -
		a[12] * a[1] * a[6] * a[11] +
		a[0] * a[13] * a[6] * a[11] +
		a[4] * a[1] * a[14] * a[11] -
		a[0] * a[5] * a[14] * a[11] -
		a[8] * a[5] * a[2] * a[15] +
		a[4] * a[9] * a[2] * a[15] +
		a[8] * a[1] * a[6] * a[15] -
		a[0] * a[9] * a[6] * a[15] -
		a[4] * a[1] * a[10] * a[15] +
		a[0] * a[5] * a[10] * a[15];
};

mat4.inverse = function( a, b = null ) {
	b || ( b = mat4.create() );

	b[0] = a[5] * a[10] * a[15] - a[5] * a[14] * a[11] - a[6] * a[9] * a[15] + a[6] * a[13] * a[11] + a[7] * a[9] * a[14] - a[7] * a[13] * a[10];
	b[1] = -a[1] * a[10] * a[15] + a[1] * a[14] * a[11] + a[2] * a[9] * a[15] - a[2] * a[13] * a[11] - a[3] * a[9] * a[14] + a[3] * a[13] * a[10];
	b[2] = a[1] * a[6] * a[15] - a[1] * a[14] * a[7] - a[2] * a[5] * a[15] + a[2] * a[13] * a[7] + a[3] * a[5] * a[14] - a[3] * a[13] * a[6];
	b[3] = -a[1] * a[6] * a[11] + a[1] * a[10] * a[7] + a[2] * a[5] * a[11] - a[2] * a[9] * a[7] - a[3] * a[5] * a[10] + a[3] * a[9] * a[6];

	b[4] = -a[4] * a[10] * a[15] + a[4] * a[14] * a[11] + a[6] * a[8] * a[15] - a[6] * a[12] * a[11] - a[7] * a[8] * a[14] + a[7] * a[12] * a[10];
	b[5] = a[0] * a[10] * a[15] - a[0] * a[14] * a[11] - a[2] * a[8] * a[15] + a[2] * a[12] * a[11] + a[3] * a[8] * a[14] - a[3] * a[12] * a[10];
	b[6] = -a[0] * a[6] * a[15] + a[0] * a[14] * a[7] + a[2] * a[4] * a[15] - a[2] * a[12] * a[7] - a[3] * a[4] * a[14] + a[3] * a[12] * a[6];
	b[7] = a[0] * a[6] * a[11] - a[0] * a[10] * a[7] - a[2] * a[4] * a[11] + a[2] * a[8] * a[7] + a[3] * a[4] * a[10] - a[3] * a[8] * a[6];

	b[8] = a[4] * a[9] * a[15] - a[4] * a[13] * a[11] - a[5] * a[8] * a[15] + a[5] * a[12] * a[11] + a[7] * a[8] * a[13] - a[7] * a[12] * a[9];
	b[9] = -a[0] * a[9] * a[15] + a[0] * a[13] * a[11] + a[1] * a[8] * a[15] - a[1] * a[12] * a[11] - a[3] * a[8] * a[13] + a[3] * a[12] * a[9];
	b[10] = a[0] * a[5] * a[15] - a[0] * a[13] * a[7] - a[1] * a[4] * a[15] + a[1] * a[12] * a[7] + a[3] * a[4] * a[13] - a[3] * a[12] * a[5];
	b[11] = -a[0] * a[5] * a[11] + a[0] * a[9] * a[7] + a[1] * a[4] * a[11] - a[1] * a[8] * a[7] - a[3] * a[4] * a[9] + a[3] * a[8] * a[5];

	b[12] = -a[4] * a[9] * a[14] + a[4] * a[13] * a[10] + a[5] * a[8] * a[14] - a[5] * a[12] * a[10] - a[6] * a[8] * a[13] + a[6] * a[12] * a[9];
	b[13] = a[0] * a[9] * a[14] - a[0] * a[13] * a[10] - a[1] * a[8] * a[14] + a[1] * a[12] * a[10] + a[2] * a[8] * a[13] - a[2] * a[12] * a[9];
	b[14] = -a[0] * a[5] * a[14] + a[0] * a[13] * a[6] + a[1] * a[4] * a[14] - a[1] * a[12] * a[6] - a[2] * a[4] * a[13] + a[2] * a[12] * a[5];
	b[15] = a[0] * a[5] * a[10] - a[0] * a[9] * a[6] - a[1] * a[4] * a[10] + a[1] * a[8] * a[6] + a[2] * a[4] * a[9] - a[2] * a[8] * a[5];

	let d = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];

	if ( !d ) return null;
	d = 1/d;

        for ( let i = 0; i < 16; i++ )
		b[i] *= d;

        return b;
};

mat4.multiply = function( a, b, c ) {
	if ( c ) {
		c[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
		c[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
		c[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
		c[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

		c[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
		c[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
		c[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
		c[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

		c[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
		c[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
		c[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
		c[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

		c[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
		c[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
		c[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
		c[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];
		return c;
	}
	return [	a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
			a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
			a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
			a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],
			a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
			a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
			a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
			a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],
			a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
			a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
			a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
			a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],
			a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
			a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
			a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
			a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]
	];

};

mat4.mat3 = function( a, b ) {
	if ( b ) {
		b[0] = a[0];	b[1] = a[1];	b[2] = a[2];
		b[3] = a[4];	b[4] = a[5];	b[5] = a[6];
		b[6] = a[8];	b[7] = a[9];	b[8] = a[10];
		return b;
	}
	return [ a[0], a[1], a[2], a[4], a[5], a[6], a[8], a[9], a[10] ];
};

mat4.str = function( a ) {
	return 	vec4.str( a, 0 ) + ", " +
		vec4.str( a, 4 ) + ", " +
		vec4.str( a, 8 ) + ", " +
		vec4.str( a, 12 );
};

mat4.lookAt = function( a /* eye */, c /* center */, up, d ) {

	let z = vec3.normalize( vec3.subtract( a, c ) );
	let x = vec3.cross( up, z );
	let y = vec3.cross( z, x );

	if ( d ) {
		d[0] = x[0];	d[1] = x[1];	d[2] = x[2];	d[3] = 0;
		d[4] = y[0];	d[5] = y[1];	d[6] = y[2];	d[7] = 0;
		d[8] = z[0];	d[9] = z[1];	d[10] = z[2];	d[11] = 0;
		d[12] = -a[0];	d[13] = -a[1];	d[14] = -a[2];	d[15] = 1;
		return d;
	}
	return [ 	x[0],	x[1],	x[2],	0,
			y[0],	y[1],	y[2],	0,
			z[0],	z[1],	z[2],	0,
			-a[0],	-a[1],	-a[2],	1
	];
};

mat4.projection = function( fov /* radians */ = Math.PI / 2, aspect = 1, near = 1, far = 100, d ) {
	let f = Math.tan( fov * 0.5 );
	let rInv = 1 / ( near - far );
	if ( d ) {
		d[0] = f * aspect;	d[1] = 0;	d[2] = 0;			d[3] = 0;
		d[4] = 0;		d[5] = 1 / f;	d[6] = 0;			d[7] = 0;
		d[8] = 0;		d[9] = 0;	d[10] = ( near + far ) * rInv;	d[11] = -1;
		d[12] = 0;		d[13] = 0;	d[14] = near * far * rInv * 2;	d[15] = 0;
		return d;
	}
	return [ 	f * aspect,	0,		0,			 0,
			0,		1 / f,		0,			 0,
			0,		0,		( near + far ) * rInv,	-1,
			0,		0,		near * far * rInv * 2,	 0
	];
}
