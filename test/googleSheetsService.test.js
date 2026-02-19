const test = require('node:test');
const assert = require('node:assert/strict');
const { mapRowToObject } = require('../src/services/googleSheetsService');

test('mapRowToObject maps headers to selected row', () => {
  const values = [
    ['first_name', 'company', 'role'],
    ['Ava', 'Contoso', 'Designer'],
    ['Ben', 'Fabrikam', 'Engineer']
  ];

  const row = mapRowToObject(values, 1);
  assert.deepEqual(row, {
    first_name: 'Ben',
    company: 'Fabrikam',
    role: 'Engineer'
  });
});

test('mapRowToObject throws when data row missing', () => {
  assert.throws(() => mapRowToObject([['name']], 0), /at least a header row and one data row/);
});
