const bench = require( '@stdlib/bench-harness' );
const corpus = require( '@stdlib/datasets-spam-assassin' )();
const { encodingForModel: encodingForModelJS } = require( 'js-tiktoken' );
const { encoding_for_model } = require( '@dqbd/tiktoken' );

const opts = {
    iterations: 1000
};

bench( 'js-tiktoken', opts, function benchmark( b ) {
    const encoder = encodingForModelJS( 'gpt-3.5-turbo' );
    let data;
    b.tic();
	for ( let i = 0; i < b.iterations; i++ ) {
        const { text } = corpus[ i % corpus.length ];
        data = encoder.encode( text );
        if ( !data.length ) {
            b.fail( 'should return an array' );
        }
	}
	b.toc();
	if ( !Array.isArray( data ) ) {
        b.fail( 'should return an array' );
    }
	b.pass( 'benchmark finished' );
	b.end();
});

bench( '@dqbd/tiktoken', opts, function benchmark( b ) {
    const encoder = encoding_for_model( 'gpt-3.5-turbo' );
    let data;
    b.tic();
    for ( let i = 0; i < b.iterations; i++ ) {
        const { text } = corpus[ i % corpus.length ];
        data = encoder.encode( text );
        if ( !data.length ) {
            b.fail( 'should return an array' );
        }
    }
    b.toc();
    if ( !data instanceof Uint32Array ) {
        b.fail( 'should return a Uint32Array' );
    }
    b.pass( 'benchmark finished' );
    b.end();
});
    