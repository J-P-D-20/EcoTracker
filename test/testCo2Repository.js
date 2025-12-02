import { getMinFootprint, getMaxFootprint, getMinAndMaxFootprint } from '../persistence/co2CalculationRepository.js';

// Manual test runner for min/max helpers.
// node test/testCo2Repository.js

const TEST_USER_ID = process.env.TEST_USER_ID || '0893cd3b-9998-4c6a-8842-5e7a7ebe5f45';

async function run() {
  try {
    console.log('Testing CO2 repository helpers for user:', TEST_USER_ID);

    const minOnly = await getMinFootprint(TEST_USER_ID);
    console.log('Min (single):', minOnly);

    const maxOnly = await getMaxFootprint(TEST_USER_ID);
    console.log('Max (single):', maxOnly);

    const both = await getMinAndMaxFootprint(TEST_USER_ID);
    console.log('Min & Max (both):', both);

  } catch (err) {
    console.error('Error running CO2 repo tests:', err.message);
  }
}

run();
