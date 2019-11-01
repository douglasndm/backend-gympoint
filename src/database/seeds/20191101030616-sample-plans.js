module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'plans',
            [
                {
                    title: 'Start',
                    duration: 1,
                    price: 129.0,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    title: 'Gold',
                    duration: 3,
                    price: 109.0,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    title: 'Diamond',
                    duration: 6,
                    price: 89.0,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],

            {}
        );
    },

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    down: queryInterface => {
        return queryInterface.bulkDelete('plans', null, {});
    },
};
