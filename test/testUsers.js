import { getAllUsers, getUserByEmail, addUser, updateUserLocation } from '../persistence/userRepository.js';

async function test() {
  try {
    // Add a new user
    const newUser = await addUser('JoJO', 'rabit', 'jojo@gmail.com', '123456', 'Tandag City', 'Surigao Del Sur');
    console.log('Added user:', newUser);

    // Fetch all users
    const users = await getAllUsers();
    console.log('All users:', users);

    // Fetch user by email
    const userByEmail = await getUserByEmail('cabasealexiasheen@gmail.com');
    console.log('User by email:', userByEmail);

    // Update user location
    const updatedUser = await updateUserLocation(newUser.id, 'Butuan City', 'Agusan Del Norte');
    console.log('Updated user location:', updatedUser);

  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();