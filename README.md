# gmatrix.js

## Motivation

This is the result of performance testing some functions for high-speed vector and matrix math in JavaScript. I found the available libraries used variables wastefully, leading to unneeded garbage collection calls, and I needed an efficient and minimalistic approach that would interface well with webGL, and present the skinniest, simplest algorithm possible, and this is the WIP result.

The style is restrictive, but I feel it is quite an elegant solution that is light and works well in graphics and machine learning. This is *not* as fast as a GPU computer shader would be so it should only be considered an option for web-based CPU computation.

There is likely more optimization to be made, but I feel like I have found a good balance between speed and memory (at least for me!) by accessing the vector array in two patterns.

Also, modern JavaScript browsers are quirky, and the speed of Array / Float32Array allocation and declaration is less than intuitive. For that reason almost all functions feature two patterns combined with a single conditional statement.

### Allocation pattern
```
let c = vec3.create();
vec3.add( a, b, c ); // result will be allocated (passed into c) as a Float32Array
```

The functional style is obvious and this was a deliberate choice to avoid unneccessary prototype calls, which in testing were the result of a significant time loss in browsers. This isn't a big deal for a small number of calculations but these vector calculations are meant to be calculated thousands of times a second.

### Create a new Array
```
let a = [ 1, 2, 3 ], b = [ 4, 5, 6 ];
let c = vec3.add( a, b ); // returns result as a REGULAR non-typed array.
```

Returning the result as a plain Array, due to some quirky JS optimization behind the scenes, is significantly (50%+) faster than allocation, and much faster than creating a typed array. This means that you can save a significant number of cycles by never resorting to allocation and simply using as much memory as is needed.

This is not ideal if you are doing matrix calculations in a render loop, so I use the allocation method when memory needs to be preserved, and I use the second method when memory is less of a concern. This gives the best of both worlds, I hope.

## List of functions
```
vec3.create( x = 0, y = 0, z = 0 ) // returns a typed array
vec3.set( a, b ) // sets a = b
vec3.add( a, b, c? ) // adds a and b, allocates to c? according to allocation pattern (see above)
vec3.subtract( a, b, c? )
vec3.negate( a, b? )
vec3.scale( a, b, c? ) // scales a by b
vec3.mult( a, b, c? ) // component multiplication
vec3.multiply( a, b, c? ) // scalar multiplication
vec3.div( a, b, c? ) // scalar division
vec3.divide( a, b, c? ) // component division
vec3.length( a ) // returns euclidean length
vec3.lenSq( a ) // length squared
vec3.normalize( a, b? )
vec3.stabilize( a, b? ) // sigmoid function
vec3.fastSigmoid( a, b? ) // abs value sigmoid
vec3.tanh( a, b? ) // tanh of components
vec3.cross( a, b, c? ) // cross product
vec3.dot( a, b )
vec3.direction( a, b, c? )
vec3.str( a ) // returns a string
vec3.lerp( a, b, c, d? ) // linear interpolation between vector a and b of scalar c

mat3.create() // return a typed array of zeros
mat3.identity( a? ) // allocates or returns identity matrix
mat3.transpose( a, b? )
mat3.mat4( a, b? ) // mat3 -> mat4
mat3.determinant( a )

vec4.create( x = 0, y = 0, z = 0, w = 0 )
vec4.set( a, b ) // sets a = b
vec4.scalarMult( a, b, c? ) // scalar multiplication
vec4.mult( a, b, c? ) // component mulitplication
vec4.div( a, b, c? ) // divide by scalar b
vec4.divide( a, b, c? ) // component division
vec4.length( a ) // euclidean length
vec4.lenSq( a ) // length squared
vec4.normalize( a, b? )
vec4.multiply( a, b, c? ) // quaternion multiplication
vec4.str( a ) // return string
vec4.slerp( a, b, c, d = 0 )

mat4.create()
mat4.set( a, b )
mat4.identity( a? )
mat4.translate( x = 0, y = 0, z = 0, a? ) // translate matrix
mat4.scale( x = 1, y = 1, z = 1, a? ) // scale matrix
mat4.transpose( a, b? )
mat4.determinant( a )
mat4.inverse( a, b? )
mat4.multiply( a, b, c? )
mat4.mat3( a, b? ) // return mat3
mat4.str( a )
mat4.lookAt( a, c, up, d? ) // returns lookAt vector, which originates at a (eye), looks toward c (origin), and is oriented up (vec3)
mat4.projection( fov = PI/2, aspect = 1, near = 1, far = 100, d? ) // returns projection matrix from fov (radians)
```
