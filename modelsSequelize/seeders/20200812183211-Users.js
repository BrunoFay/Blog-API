module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        displayName: 'casimiro miguel',
        email: 'casimito@gmail.com',
        password: 'vasco123',
        image: 'https://akns-images.eonline.com/eol_images/Entire_Site/2022013/rs_600x600-220113135111-130122-600x600-Casimiro-Instagram.jpg?fit=around%7C1200:1200&output-quality=90&crop=1200:1200;center,top',
      },
      {
        id: 2,
        displayName: 'douglas(ninja) viegas',
        email: 'nuncaMexa@gmail.com',
        password: 'talaricoVaiMudarOMundo',
        image: 'https://pbs.twimg.com/media/D914TTMXoAIcONd.jpg:large',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
