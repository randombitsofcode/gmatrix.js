# gmatrix.js

This is the result of performance testing some functions for high-speed vector and matrix math in JavaScript. I found the available libraries either used variables wastefully, leading to unneeded garbage collection calls, and I needed an efficient and minimalistic approach that would interface well with webGL, and this is the WIP result.

The style is very restrictive and I apologize but it's the only way I could balance concerns, and I feel it is quite an elegant solution that will appeal to JS developers looking for minimal footprint and efficient matrix calculations in graphics and machine learning. This is *not* as fast as a GPU computer shader would be so it should only be considered an option for web-based CPU computation.

## Method

This is a WIP and there is likely more optimization to be made, but my primary concern with existing matrix math libraries is that they are quite wasteful with variable allocation, resulting in heavy garbage collection, and this needs to be balanced with bare-bones calculation in order to correctly balance memory usage with CPU cycles.

Also, modern JavaScript browsers are quirky, and the speed of Array / Float32Array allocation and declaration is less than intuitive. For that reason almost all functions feature two patterns combined with a single conditional statement.

### Allocation pattern
```
let c = vec3.create();
vec3.add( a, b, c ); // result will be allocated as a Float32Array
```

The functional style is obvious and this was a deliberate choice to avoid unneccessary prototype calls, which in testing were the result of a 5-10% time loss on my computer. This isn't a big deal for a small number of calculations but these vector calculations are meant to be calculated thousands of times a second, and each reference adds up. Passing the result by allocation is slightly slower than creating a new Array (JavaScript!), so this is why there are two patterns.

### Create a new Array
```
let a = [ 1, 2, 3 ], b = [ 4, 5, 6 ];
let c = vec3.add( a, b ); // returns result as a REGULAR non-typed array.
```

Returning the result as a plain Array, due to some quirky JS optimization behind the scenes, is significantly (50%+) faster than allocation, and much faster than creating a typed array. This means that you can save a significant number of cycles by never resorting to allocation and simply using as much memory as is needed.

This is not ideal if you are doing matrix calculations in a loop, so I use the allocation method when memory needs to be preserved, and I use the second method when memory is less of a concern. This gives the best of both worlds, I hope.
