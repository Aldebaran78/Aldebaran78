const utils = require('../utils')
const Bill = require('../Bill')

describe('Check Input', () => {

    /* it('inputAndCheck', () => {
        //type 1
        expect(utils.inputAndCheck(['1','2'],'>')).toBe('1');
        //type n
        expect(utils.inputAndCheck(['1','2'],'>')).toBe('1');
    }) */

    it('check', () => {
        expect(utils.check(['1','3','x'], 'x')).toBe('x');
        expect(utils.check(['1','3','x'], '1')).toBe('1');
        expect(utils.check(['1','3','x'], '2')).toBeFalsy();
    })
});

describe('Print', () => {

    it('printList', () => {
        expect(utils.printList(['next', 'other', 'never'])[0]).toEqual(['1', '2', '3']);
        expect(utils.printList(['next', 'other', 'never'])[1]).toBe('1) next\n2) other\n3) never\n');
        expect(utils.printList(['next', 'other', 'never'])).toHaveLength(2);
    })

    it('separator', () => {
        expect(utils.separator(10)).toBe('==========');
    })

    it('ticketTitle', () => {
        expect(utils.ticketTitle(20)).toBe('\n                      TICKET #20\n');
    })

    it('printInline', () => {
        expect(utils.printInline([['next', 'other', 'never']])).toBe('================\nnext,other,never\n================\n');
    })

    it('showCompletedTicket', () => {
        const ticket = [new Bill.Bill(5,['Bari','Milano'],['Ambetto', 'Terno']), new Bill.Bill(10,['Firenze'],['Ambetto', 'Terno', 'Cinquina'])]
        expect(utils.showCompletedTicket(ticket)).toBe('Ticket #1 : 5 numbers played on the Bari,Milano wheel with Ambetto,Terno\nTicket #2 : 10 numbers played on the Firenze wheel with Ambetto,Terno,Cinquina\n');
    })

    it('centerWord', () => {
        expect(utils.centerWord(20, 'collisione')).toBe('     collisione     ');
        expect(utils.centerWord(20, 'collision')).toBe('     collision      ');
    })

    it('printFakeExtraction', () => {
        const table = utils.printFakeExtraction();
        const tableArr = table.split('\n');

        expect(table).toHaveLength(1230);
        expect(tableArr).toHaveLength(24);
        expect(tableArr[0]).toBe('');
        expect(tableArr[1]).toBe('               FAKE EXTRACTIONS');
        expect(tableArr[23]).toBe('');

        tableArr.forEach((el, index) => {
            if (index % 2 === 0 && index !== 0) expect(el).toBe('+============+==============================+====================+');
            if (index % 2 !== 0 && index > 1 && index < 22) {
                expect(el[0]).toBe('|');
                expect(el[13]).toBe('|');
                expect(el[44]).toBe('|');
                const citiesName = el.split('|')[1].trim();
                expect(Bill.cities.includes(citiesName)).toBeTruthy()
            }
        })

    })
});

describe('Menage choice', () => {

    it('arrayNumber', () => {
        expect(utils.arrayNumber(1,10)).toEqual(['1','2','3','4','5','6','7','8','9','10']);
        expect(utils.arrayNumber(5,8)).toEqual(['5','6','7','8']);
    })

    it('menageWheel', () => {
        function test (numbersPlayed, whellOrType, num, selected, cities) {
            return [numbersPlayed, whellOrType, num, selected, cities]
        }
        expect(utils.menageWheel('4',5,'wheel',1,[],[...Bill.cities],test)).toEqual([5,'wheel',1,['Genova'],['Bari','Cagliari','Firenze','Milano','Napoli','Palermo','Roma','Torino','Venezia']]);
        expect(utils.menageWheel('11',3,'wheel',1,[],[...Bill.cities],test)).toEqual(['Tutte']);
        expect(utils.menageWheel('n',3,'wheel',1,[],[...Bill.cities],test)).toEqual([3,'wheel',1,[],['Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia','Tutte']]);
        expect(utils.menageWheel('n',3,'wheel',1,['Milano'],[...Bill.cities],test)).toEqual(['Milano']);
    })

    it('menageType', () => {
        function test (numbersPlayed, whellOrType, num, selected, cities, type) {
            return [numbersPlayed, whellOrType, num, selected, cities, type]
        }
        expect(utils.menageType('4',5,'type',1,[],['Test'],[...Bill.types],test)).toEqual([5,'type',1,['Terno'],['Test'],['Estratto','Ambetto','Ambo','Quaterna','Cinquina']]);
        expect(utils.menageType('n',3,'type',1,[],['Test'],[...Bill.types],test)).toEqual([3,'type',1,[],['Test'],['Estratto','Ambetto','Ambo','Terno','Quaterna','Cinquina']]);
        expect(utils.menageType('n',3,'type',1,['Terno'],['Test'],[...Bill.types],test)).toEqual(['Terno']);

    })
});

describe('Fake Extraction', () => {

    it('genNumber', () => {
        const number = utils.genNumber();
        const numberSet = [...new Set(number)];

        expect(number).toHaveLength(5);
        expect(numberSet).toHaveLength(5);

        number.forEach(el => {
            expect(typeof el).toBe('number');
            expect(el > 0 && el < 91).toBeTruthy();
        })
    })

    it('numberExtraction', () => {
        const extraction = utils.numberExtraction();

        expect(extraction).toHaveLength(10);

        extraction.forEach(wheelNumber => {
            expect(wheelNumber).toHaveLength(5);
            expect(Array.isArray(wheelNumber)).toBeTruthy();

            const wheelSet = [...new Set(wheelNumber)];
            expect(wheelSet).toHaveLength(5);

            wheelNumber.forEach(num => {
                expect(typeof num).toBe('number');
                expect(num > 0 && num < 91).toBeTruthy();
            })
        })
    })
})