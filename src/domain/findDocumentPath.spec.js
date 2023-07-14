import { findDocumentPath } from './findDocumentPath';

test('문서의 경로를 찾는 findDocumentPath 함수 테스트', () => {
  const documents = [
    {
      id: 1,
      title: 'a',
      documents: [
        {
          id: 2,
          title: 'b',
          documents: [
            {
              id: 3,
              title: 'c',
              documents: [],
            },
          ],
        },
      ],
    },
  ];

  expect(findDocumentPath(documents, 3)).toEqual([
    { id: 1, title: 'a' },
    { id: 2, title: 'b' },
    { id: 3, title: 'c' },
  ]);
  expect(findDocumentPath(documents, 4)).toEqual(null);
  expect(findDocumentPath(documents, 1)).toEqual([{ id: 1, title: 'a' }]);
});
