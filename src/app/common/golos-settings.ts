const username = 'demo1111';
const accounts = {
  'youtarget-1': 'P5JH7tmkiY8iamkyifnVWTjXMSE3jdgx8rVTgxgvjUecGBxwcd2L',
  'youtarget-2': 'P5K9GhH4yXD5KwKGRUSNWWcyghPT6CtjWZFeN9CwkhULWzPqdTEB',
  'youtarget-4': 'P5KFEWjnCEPUv2BiEb8ap5uqQXoMHzNaPo3eKU6ND9gpCA7Fk15W',
  'youtarget-5': 'P5K1Ag9RJVEVJyGGLfnWnZwsuW7zmFWRj8QwzDspjPVyDujCQuZu',
  'youtarget-6': 'P5KUtinwjpWvrViEMSwiMmTMRrCwdtiTso9o8uUcmKAFqniQiDkt',
  'youtarget-8': 'P5J34frQ2kf6acr738AqDLuxNXmjDf5rLiwQKugCySCWJJYAMSJi',
  'youtarget-9': 'P5Hvv8V1KTF8JVvFvdVattiRLGvbMxCdd24iz8CThSzPqAKv3yBB',
  'youtarget-10': 'P5K3mXoTH7Eghy7eMQEzTCSS4ckF7KHNFeCWvJouH4ZtuoPzTMUv',
  'youtarget-99': 'P5JgWym9AicUDxD3HB8BdNktke3p1hqQ7PEogEikCJXAGr9Z2FTb',
  'youtarget-98': 'P5JgWym9AicUDxD3HB8BdNktke3p1hqQ7PEogEikCJXAGr9Z2FTb',
  'demo1111': 'P5JqfM33Ph6k8mh8pNJVE8TSzuPqvyC3ad7UFWbS2arC4eWLQXPd',
};

export class GolosSettings {
  static username: string = username;
  static password: string = accounts[username];
  static appName: string = 'your-target';
  static postParentPermlink: string = 'yourtarget-post--';
  static tagParentPermlink: string = 'yourtarget-tag---';
}
