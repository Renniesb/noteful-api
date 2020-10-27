// returns an array of notes

function makeNotesArray() {
  return [
    {
      id: 1,
      title: "Dogs",
      modified: "2019-01-03T00:00:00.000Z",
      content: "content",
      folderid: 1,
    },
    {
      id: 2,
      title: "Cats",
      modified: "2018-08-15T23:00:00.000Z",
      content: "content",
      folderid: 2,
    },
    {
      id: 3,
      title: "Pigs",
      modified: "2018-03-01T00:00:00.000Z",
      content: "content",
      folderid: 3,
    },
  ];
}

module.exports = { makeNotesArray };
