import { signUpUser, getProfile, updateProfile } from '../persistence/userRepository.js';

async function test() {
  try {
    console.log('Signing up new user...');

    const { user, profile } = await signUpUser(
      'cabasealexiasheen@gmail.com',
      '123456',
      'Alexia',
      'Cabase',
      'Tandag City',
      'Surigao Del Sur'
    );

    console.log('User signed up:', user);
    console.log('Profile created:', profile);

    // Fetch profile
    const fetchedProfile = await getProfile(user.id);
    console.log('Fetched profile:', fetchedProfile);

    // Update profile
    const updatedProfile = await updateProfile(user.id, {
      city: 'Butuan City',
      province: 'Agusan Del Norte',
    });
    console.log('Updated profile:', updatedProfile);

  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
