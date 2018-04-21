import {GolosSettings} from "../common/golos-settings";

export default class Post {
  parentAuthor: string = '';
  parentPermlink: string = GolosSettings.postParentPermlink;
  author: string = GolosSettings.username;
  permlink: string;
  title: string;
  body: any;
  jsonMetadata: any;
}
