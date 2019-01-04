const { Address } = require('../models');

async function process() {
    try {
        // await Address.create({
        //     name: '홍길동',
        //     address: '경기도 수원시 장안구 화서동 111-234',
        //     cellphone: '010-2322-2222',
        //     phone: '031-242-2323',
        //     zipcode: '231-234',
        //     userseq: 1
        // });

        // await Address.create({
        //     name: '박현수',
        //     address: '서울 특별시 마포구  23-234',
        //     cellphone: '010-2455-2922',
        //     phone: '031-12-2903',
        //     zipcode: '100-100',
        //     userseq: 1
        // });
        console.log(await Address.findAll({}));
    } catch (e) {
        console.error(e);
    };
}

process();