var roles = ['owner', 'active', 'memo', 'posting']; // optional parameter, if not specify, then all keys will return

golos.config.set('websocket', 'wss://ws.testnet.golos.io');
golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');

var username = 'youtarget';
var password = 'qwerty12345'; // master password
var keys = golos.auth.getPrivateKeys(username, password, 'posting');
var wif = keys.posting;
console.log('getPrivateKeys', keys);
console.log('is wif', golos.auth.isWif(keys.posting));

/**
 * comment() add a post
 * @param {Base58} wif - private posting key
 * @param {String} parentAuthor - for add a post, empty field
 * @param {String} parentPermlink - main tag
 * @param {String} author - author of the post
 * @param {String} permlink - url-address of the post
 * @param {String} title - header of the post
 * @param {String} body - text of the post
 * @param {String} jsonMetadata - meta-data of the post (images etc.)
 */
var parentAuthor = '';
var parentPermlink = 'dev';
var author = 'epexa';
var permlink = 'test-url';
var title = 'test';
var body = 'test2';
var jsonMetadata = '{}';
golos.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
    //console.log(err, result);
    if (!err) {
        console.log('comment', result);
    }
    else console.error(err);
});
