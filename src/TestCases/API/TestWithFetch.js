import { createItem, readItem, updateItem, deleteItem } from '../api'; // Import the API functions

describe('API Tests', () => {
  // Test data
  const sampleItem = {
    id: 'sampleItemId',
    name: 'Sample Item',
    description: 'This is a sample item',
    price: 9.99,
  };

  describe('Create Operation', () => {
    test('Create Item Success', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        status: 201,
        json: jest.fn().mockResolvedValue(sampleItem),
      });

      // Call the API function to create an item
      const createdItem = await createItem(sampleItem);

      // Check if the fetch function was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleItem),
      });

      // Check if the created item matches the expected data
      expect(createdItem).toEqual(sampleItem);
    });

    test('Create Item Missing Data', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: jest.fn().mockResolvedValue({
          error: 'Missing required fields',
        }),
      });

      // Call the API function to create an item with missing data
      const response = await createItem({});

      // Check if the fetch function was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      // Check if the response status code and error message are as expected
      expect(response.status).toEqual(400);
      expect(response.json()).resolves.toEqual({ error: 'Missing required fields' });
    });
  });

  describe('Read Operation', () => {
    test('Read Item Success', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        json: jest.fn().mockResolvedValue(sampleItem),
      });

      // Call the API function to read an item by ID
      const fetchedItem = await readItem(sampleItem.id);

      // Check if the fetch function was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith(`http://localhost:8000/api/items/${sampleItem.id}`, {
        method: 'GET',
      });

      // Check if the fetched item matches the expected data
      expect(fetchedItem).toEqual(sampleItem);
    });

    test('Read Item Not Found', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        status: 404,
        json: jest.fn().mockResolvedValue({
          error: 'Item not found',
        }),
      });

      // Call the API function to read a non-existent item
      const response = await readItem('nonExistentItemId');

      // Check if the fetch function was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/items/nonExistentItemId', {
        method: 'GET',
      });

      // Check if the response status code and error message are as expected
      expect(response.status).toEqual(404);
      expect(response.json()).resolves.toEqual({ error: 'Item not found' });
    });
  });

  describe('Update Operation', () => {
    test('Update Item Success', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        json: jest.fn().mockResolvedValue(sampleItem),
      });

      // Call the API function to update an item
      const updatedItem = await updateItem(sampleItem.id, sampleItem);

      // Check if the fetch function was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith(`http://localhost:8000/api/items/${sampleItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleItem),
      });

      // Check if the updated item matches the expected data
      expect(updatedItem).toEqual(sampleItem);
    });

    test('Update Item Not Found', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        status: 404,
        json: jest.fn().mockResolvedValue({
          error: 'Item not found',
        }),
      });

      // Call the API function to update a non-existent item
      const response = await updateItem('nonExistentItemId', sampleItem);

      // Check if the fetch function was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/items/nonExistentItemId', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleItem),
      });

      // Check if the response status code and error message are as expected
      expect(response.status).toEqual(404);
      expect(response.json()).resolves.toEqual({ error: 'Item not found' });
    });
  });

  describe('Delete Operation', () => {
    test('Delete Item Success', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        status: 204,
      });

      // Call the API function to delete an item
      const response = await deleteItem(sampleItem.id);

      // Check if the fetch function was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith(`http://localhost:8000/api/items/${sampleItem.id}`, {
        method: 'DELETE',
      });

      // Check if the response status code is as expected
      expect(response.status).toEqual(204);
    });

    test('Delete Item Not Found', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        status: 404,
        json: jest.fn().mockResolvedValue({
          error: 'Item not found',
        }),
      });

      // Call the API function to delete a non-existent item
      const response = await deleteItem('nonExistentItemId');

      // Check if the fetch function was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/items/nonExistentItemId', {
        method: 'DELETE',
      });

      // Check if the response status code and error message are as expected
      expect(response.status).toEqual(404);
      expect(response.json()).resolves.toEqual({ error: 'Item not found' });
    });
  });
});
