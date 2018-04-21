import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    var roles = ['owner', 'active', 'memo', 'posting']; // optional parameter, if not specify, then all keys will return

    golos.config.set('websocket', 'wss://ws.testnet.golos.io');
    golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');


//P5JWR1G87zmCiVv5CAYJA9Pgtdu1vYQ4d3kTWhsP7CJ2PgwFueMg
    var username = 'youtarget5';
    var password = 'qwerty12345'; // master password
    var keys = golos.auth.getPrivateKeys(username, password, ['posting']);
    var wif = keys.posting;
    console.log('getPrivateKeys', keys);
    console.log('is wif', golos.auth.isWif(wif));
//
//     function $(selector, collection) {
//       if (collection === true) {
//         return document.querySelectorAll(selector);
//       } else {
//         return document.querySelector(selector);
//       }
//     }
//
//     window.onload = function () {
//       var appName = 'yourtarget';
//
//       $('#search-btn').addEventListener('click', function () {
//         var searching = document.querySelector('#searching').value;
//
//         var query = {
//           select_tags: ['yourtarget', 'test'],
//           limit: 100,
//           //start_author: 'epexa',
//           //start_permlink: 'test-url'
//         };
//         golos.api.getDiscussionsByTrending(query, function (err, result) {
//           //console.log(err, result);
//           if (!err) {
//             result.forEach(function (item) {
//               console.log('getDiscussionsByTrending', item.title);
//             });
//           }
//           else console.error(err);
//         });
//       });
//
//
//       $('#vote-btn').addEventListener('click', function () {
//         //[-1000, 1000]
//         golos.broadcast.vote(wif, username, 'youtarget6', 'test-url', 10000, function (err, result) {
//           console.log(err, result);
//         });
//       });
//
//       $('#post-btn').addEventListener('click', function () {
//         var parentAuthor = '';
//         var parentPermlink = appName;
//         var author = username;
//         var permlink = appName + $('form').title.value;
//         var title = appName + $('form').picture.value;
//         var body = '<h1>' + $('form').title.value + '</h1>';
//         var jsonMetadata = JSON.stringify({
//           app: appName
//         });
//         golos.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function (err, result) {
//           //console.log(err, result);
//           if (!err) {
//             console.log('comment', result);
//           }
//           else console.error(err);
//         });
//       });
//     };
  }

  title = 'app';
}
