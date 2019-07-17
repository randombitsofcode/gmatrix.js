# gmatrix.js

### Usage
```
// Create new objects
let vec = new v4(), mat = new m4();

// Chain operations
console.log( m.multVec4( v ).equals( new v4() ) ); // true
```

### Create new or mutate old
```
let c = v4.sub( a, b );   // returns a new vector from the v4 class object
c.sub( d );               // actually mutates c
```

### Other notable functions
```
let m = new m4( 3 );    // passing a scalar to the m4 constructor *scales* the identity matrix by that factor
let p = new v2().copy( anotherVector );        // copy values from other vectors
let g = p.clone();                             // or clone them
let start = new v4().distanceTo( end );        // lots of useful operations, check out the source
