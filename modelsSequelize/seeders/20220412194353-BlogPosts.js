module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('BlogPosts',
      [
        {
          id: 1,
          title: 'talarico vai mudar o mundo',
          content: 'bla blabla blabla blabla blabla blabla blabla blabla blabla bla',
          userId: 2,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.000Z'),
        },
        {
          id: 2,
          title: 'meteu essa?',
          content: 'bla blabla blabla blabla blabla blabla blabla bla',
          userId: 1,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.000Z'),
        },
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('BlogPosts', null, {});
  },
};
