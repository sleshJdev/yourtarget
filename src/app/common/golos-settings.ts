const username = 'youtarget-8';
const accounts = {
  'youtarget-1': 'P5JH7tmkiY8iamkyifnVWTjXMSE3jdgx8rVTgxgvjUecGBxwcd2L',
  'youtarget-2': 'P5K9GhH4yXD5KwKGRUSNWWcyghPT6CtjWZFeN9CwkhULWzPqdTEB',
  'youtarget-4': 'P5KFEWjnCEPUv2BiEb8ap5uqQXoMHzNaPo3eKU6ND9gpCA7Fk15W',
  'youtarget-5': 'P5K1Ag9RJVEVJyGGLfnWnZwsuW7zmFWRj8QwzDspjPVyDujCQuZu',
  'youtarget-6': 'P5KUtinwjpWvrViEMSwiMmTMRrCwdtiTso9o8uUcmKAFqniQiDkt',
  'youtarget-8': 'P5J34frQ2kf6acr738AqDLuxNXmjDf5rLiwQKugCySCWJJYAMSJi',
};

export class GolosSettings {
  static username: string = username;
  static password: string = accounts[username];
  static appName: string = 'your-target';
  static postParentPermlink: string = 'yourtarget-post-';
  static tagParentPermlink: string = 'yourtarget-tag-';
}
