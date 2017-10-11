module.exports =
{	'env':
	{	'es6': true
	,	'node': true
	,	'mocha': true
	}
,	'extends': 'eslint:recommended'
,	'parserOptions':
	{	'sourceType': 'module'
	}
,	'plugins': ['json']
,	'rules':
	{	'indent': ['error','tab']
	, 'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }]
	,	'no-extra-parens': [ 'error', 'all']
	,	'linebreak-style': [ 'error', 'unix']
	,	'no-template-curly-in-string': [ 'error']
	,	'complexity': ['error', 10]
	,	'dot-location': ['error', 'property']
	,	'eqeqeq': ['error', 'always']
	,	'guard-for-in': 'error'
	,	'no-caller': 'error'
	,	'no-else-return': 'error'
	,	'no-empty-pattern': 'error'
	,	'no-extend-native': 'error'
	,	'comma-style': ['error', 'first']
	,	'operator-linebreak': ['error', 'before', { 'overrides': { '=': 'after' } }]
	,	'quotes': ['error', 'single']
	,	'semi': ['error', 'never']
	,	'indent': 'off'
	,	'object-property-newline': ['error', { 'allowMultiplePropertiesPerLine': true }]
	,	'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 2 }]
	}
}
