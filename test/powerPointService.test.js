const test = require('node:test');
const assert = require('node:assert/strict');
const { replacePlaceholdersInText } = require('../src/services/powerPointService');

test('replacePlaceholdersInText replaces known placeholders', () => {
  const xml = '<a:t>Hello {{first_name}} from {{company}}</a:t>';
  const result = replacePlaceholdersInText(xml, {
    first_name: 'Ava',
    company: 'Contoso'
  });

  assert.equal(result, '<a:t>Hello Ava from Contoso</a:t>');
});

test('replacePlaceholdersInText leaves unknown placeholders unchanged', () => {
  const xml = '<a:t>Hello {{missing}}</a:t>';
  const result = replacePlaceholdersInText(xml, {});

  assert.equal(result, '<a:t>Hello {{missing}}</a:t>');
});
