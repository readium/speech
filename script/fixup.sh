cat >build/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >build/mjs/package.json <<!EOF
{
    "main": "src/index.js",
    "type": "module"
}
!EOF