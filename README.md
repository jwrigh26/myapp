Things to work on:

// Study CS 101 via khan Acadamey and make a section for notes here
// Study Math and make pages for math
// Make React 18 Frontend Sandbox or something
// Same for React 19
// Make a whiteboarding section

// Come up with a cool front page:
// Maybe display the icons of all the things I use

JS, TS, Node, React, HTML, CSS, Java, Rust

// Resume section
// Cooking section
// Proffesional Blog

React Router now renders it's own RouterProvider!
New entry point is root.tsx

Rset POP

gnome-extensions disable pop-shell@system76.com
gnome-extensions enable pop-shell@system76.com

{
"include": [
"src/**/*.ts",
"vite.config.ts",
".react-router/types/**/*"
],
"compilerOptions": {
"lib": ["DOM", "DOM.Iterable", "ES2022"],
"types": ["node", "vite/client"],
"target": "es2022",
"module": "esnext",
"moduleResolution": "bundler",
"jsx": "react-jsx",
"rootDirs": [".", "./.react-router/types"],
"baseUrl": ".",
"paths": {
"assets/_": ["src/assets/_"],
"components/_": ["src/components/_"],
"context/_": ["src/context/_"],
"data/_": ["src/data/_"],
"features/_": ["src/features/_"],
"hooks/_": ["src/hooks/_"],
"layouts/_": ["src/layouts/_"],
"lib/_": ["src/lib/_"],
"pages/_": ["src/pages/_"],
"router/_": ["src/router/_"],
"services/_": ["src/services/_"],
"src/_": ["src/_"],
"styles/_": ["src/styles/_"],
"utils/_": ["src/utils/_"]
},
"esModuleInterop": true,
"forceConsistentCasingInFileNames": true,
"isolatedModules": true,
"noEmit": true,
"resolveJsonModule": true,
"skipLibCheck": true,
"strict": true,
"typeRoots": ["./node_modules/@types", "./src/types"]
}
}

27eadd43cd32f0d61e0404b9a144094d1ebd63a5
