// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/items'; // Replace with your actual API URL

export const createItem = async (itemData) => {
  try {
    const response = await axios.post(BASE_URL, itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const readItem = async (itemId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${itemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (itemId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${itemId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    await axios.delete(`${BASE_URL}/${itemId}`);
  } catch (error) {
    throw error;
  }
};


// __tests__/api.test.js
import { createItem, readItem, updateItem, deleteItem } from '../api';

describe('API Tests', () => {
  // Assuming you have set up a test server to handle API requests and responses
  const testItemId = 'testItemId'; // Replace with a valid test item ID

  test('Create Item Success', async () => {
    const itemData = {
      name: 'Test Item',
      description: 'This is a test item',
      price: 9.99,
    };

    const createdItem = await createItem(itemData);
    expect(createdItem).toMatchObject(itemData);
  });

  test('Create Item Missing Data', async () => {
    const incompleteItemData = {
      // Missing required fields like 'name', 'description', or 'price'
    };

    try {
      await createItem(incompleteItemData);
    } catch (error) {
      expect(error.response.status).toBe(400);
      // Verify that the response contains an appropriate error message
      expect(error.response.data.message).toBe('Missing required fields.');
    }
  });

  test('Read Item Success', async () => {
    const itemData = {
      name: 'Test Item',
      description: 'This is a test item',
      price: 9.99,
    };

    // Assuming you have set up the test item in the server's database
    const readItemResult = await readItem(testItemId);
    expect(readItemResult).toMatchObject(itemData);
  });

  test('Read Item Not Found', async () => {
    const nonExistingItemId = 'nonExistingItemId';

    try {
      await readItem(nonExistingItemId);
    } catch (error) {
      expect(error.response.status).toBe(404);
      // Verify that the response contains an appropriate error message
      expect(error.response.data.message).toBe('Item not found.');
    }
  });

  test('Update Item Success', async () => {
    const updatedItemData = {
      name: 'Updated Item',
      description: 'This is an updated item',
      price: 19.99,
    };

    // Assuming you have set up the test item in the server's database
    const updatedItem = await updateItem(testItemId, updatedItemData);
    expect(updatedItem).toMatchObject(updatedItemData);
  });

  test('Update Item Not Found', async () => {
    const nonExistingItemId = 'nonExistingItemId';
    const updatedItemData = {
      name: 'Updated Item',
      description: 'This is an updated item',
      price: 19.99,
    };

    try {
      await updateItem(nonExistingItemId, updatedItemData);
    } catch (error) {
      expect(error.response.status).toBe(404);
      // Verify that the response contains an appropriate error message
      expect(error.response.data.message).toBe('Item not found.');
    }
  });

  test('Delete Item Success', async () => {
    // Assuming you have set up the test item in the server's database
    await deleteItem(testItemId);

    // Verifying that the delete operation completes without throwing an error
    expect(true).toBe(true);
  });

  test('Delete Item Not Found', async () => {
    const nonExistingItemId = 'nonExistingItemId';

    try {
      await deleteItem(nonExistingItemId);
    } catch (error) {
      expect(error.response.status).toBe(404);
      // Verify that the response contains an appropriate error message
      expect(error.response.data.message).toBe('Item not found.');
    }
  });
});
