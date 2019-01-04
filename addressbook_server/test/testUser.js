const { User } = require('../models');

async function process() {
    try {
        // await User.create({
        //     userId: 'peter',
        //     password: 'peter',
        //     grade: 'user'
        // });

        User.findAll({})
            .then((users) => {
                console.log(users);
            })
            .catch((e) => {
                console.error(e);
            });

    } catch (e) {
        console.error(e);
        console.log('에러 발생');
    }
}


process();

