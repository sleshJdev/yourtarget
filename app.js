var roles = ['owner', 'active', 'memo', 'posting']; // optional parameter, if not specify, then all keys will return

golos.config.set('websocket', 'wss://ws.testnet.golos.io');
golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');


//P5JWR1G87zmCiVv5CAYJA9Pgtdu1vYQ4d3kTWhsP7CJ2PgwFueMg
var username = 'youtarget1';
var password = 'qwerty12345'; // master password
var keys = golos.auth.getPrivateKeys(username, password, ['posting']);
var wif = keys.posting;
console.log('getPrivateKeys', keys);
console.log('is wif', golos.auth.isWif(keys.posting));

window.onload = function () {
    var voteBtn = document.querySelector('#vote-btn');
    var postBtn = document.querySelector('#post-btn');
    voteBtn.addEventListener('click', function () {

    });
    postBtn.addEventListener('click', function () {
        var parentAuthor = '';
        var parentPermlink = 'dev';
        var author = username;
        var permlink = 'test-url';
        var title = 'test';
        var body = 'test2';
        var jsonMetadata = JSON.stringify('{tag1: 1, tag2: 2, tag3: 3}');
        golos.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function (err, result) {
            //console.log(err, result);
            if (!err) {
                console.log('comment', result);
            }
            else console.error(err);
        });
    });
};
