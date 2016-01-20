echo "> Start transpiling ES2015"
echo ""
./node_modules/.bin/babel --presets es2015,react --plugins "transform-runtime" lib --out-dir ./dist
echo ""
echo "> Complete transpiling ES2015"
