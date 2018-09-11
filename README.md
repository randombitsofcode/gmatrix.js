# gmatrix.js

This is the result of some testing techniques for implementing matrix math for high-speed applications in JavaScript. I found the available libraries either used variables wastefully, leading to unneeded garbage collection calls, and I needed an efficient and minimalistic approach that would interface well with webGL, and this is the WIP result.

This is by no means the *fastest possible* implementation, because there are a lot of sacrifices being made, but due to some quirks in the implementation of JavaScript arrays (and how slow variable assignment is, in general), I believe this is the best compromise of two approaches.

Usage is somewhat standardized for all types (vec3, vec4, mat3, mat4), and two types of operations are possible.

1) Create or preserve a Float32Array.
```
let c = vec3.create();
vec3.add( a, b, c ); // result will be allocated as a Float32Array
```
Passing the result to the final parameter (c) is a compromise that saves time over object oriented results needing to reference prototype methods. This isn't a big deal for a small number of calculations but these vector calculations are meant to be calculated thousands of times a second, and each prototype reference adds up, up to 10% time loss on my setup. Passing the result by allocation is slightly slower than creating a new Array (JavaScript!), so this is why there are two patterns.

```
let a = [ 1, 2, 3 ], b = [ 4, 5, 6 ];
let c = vec3.add( a, b ); // returns result as a REGULAR non-typed array.
```

Returning the result as a plain Array is about 50% faster than a typed array, and much, much faster than allocation to a previously declared array. This means that you can save a significant number of cycles by never resorting to allocation and simply using as much memory as is needed.

This is obviously not ideal if you are doing matrix calculations in a loop, so I use the allocation method when memory needs to be preserved, and play Array returns for single calls and less important steps. This gives the best of both worlds, I hope.
