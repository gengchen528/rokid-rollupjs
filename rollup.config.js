import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import {minify} from 'uglify-es'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false

const production = !process.env.ROLLUP_WATCH;
const inputs = ['rfs.js'];
const plugins = [
	resolve(), // tells Rollup how to find date-fns in node_modules
	commonjs({
		ignore: ['child_process', 'constants', 'stream', 'util', 'assert', 'path', 'os', 'fs']
	}), // converts date-fns to ES modules
	production && uglify({}, minify) // minify, but only in production
];

export default (() => {
	return inputs.map(item => {
		return {
			input: 'src/' + item,
			output: {
				file: 'dist/' + item,
				format: 'cjs', // immediately-invoked function expression — suitable for <script> tags
				sourcemap: false
			},
			plugins
		}
	})
})();
