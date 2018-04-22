const username = 'youtarget-4';
const accounts = {
  'youtarget-1': 'P5JH7tmkiY8iamkyifnVWTjXMSE3jdgx8rVTgxgvjUecGBxwcd2L',
  'youtarget-2': 'P5K9GhH4yXD5KwKGRUSNWWcyghPT6CtjWZFeN9CwkhULWzPqdTEB',
  'youtarget-4': 'P5KFEWjnCEPUv2BiEb8ap5uqQXoMHzNaPo3eKU6ND9gpCA7Fk15W',
};

export class GolosSettings {
  static username: string = username;
  static password: string = accounts[username];
  static appName: string = 'your-target';
  static postParentPermlink: string = 'yourtarget-post-';
  static tagParentPermlink: string = 'yourtarget-tag-';
}
