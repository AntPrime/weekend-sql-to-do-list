const router = require('express').Router();
const pool = require('../modules/pool');

// GET 
router.get( '/', ( req, res )=>{
    console.log( '/todo GET' );
    // assemble query
    const queryText = 'SELECT * FROM todos';
    // run pool.query
    pool.query( queryText ).then( ( results )=>{
        // return results.rows
        res.send( results.rows );
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })
})

// POST
router.post( '/', ( req, res )=>{
    console.log( 'in /todo POST:', req.body );
        // assemble query
        const queryText = `INSERT into todos ( "text", "isComplete" ) VALUES ( $1, $2 );`;
        const values = [ req.body.text, req.body.isComplete ];
        // run pool.query
        pool.query( queryText, values ).then( ( results )=>{
            // return results.rows
            res.sendStatus( 201 ); // "CREATED"
        }).catch( ( err )=>{
            // handle any errors
            console.log( err );
            res.sendStatus( 400 );
        })
})

// DELETE
router.delete( '/', ( req, res )=>{
    console.log( 'in /todos DELETE:', req.body );
        // assemble query
        const queryText = `DELETE FROM todos WHERE id=$1;`;
        const values = [ req.body.id ];
        // run pool.query
        pool.query( queryText, values ).then( ( results )=>{
            res.sendStatus( 200 ); // "OK"
        }).catch( ( err )=>{
            // handle any errors
            console.log( err );
            res.sendStatus( 400 );
        })
})

// // PUT
router.put( '/', ( req, res )=>{
    console.log( '/todo PUT:', req.body );
    const queryText = `UPDATE todos SET isComplete=$1 WHERE id=$2;`;
    const values = [ req.body.newStatus, req.body.id ];
    // run pool.query
    pool.query( queryText, values ).then( ( results )=>{
        res.sendStatus( 200 ); // "OK"
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })
})


module.exports = router;
