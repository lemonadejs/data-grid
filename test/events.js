const { expect } = require('chai');

describe('Create a Datagrid and trigger event', () => {
    it('onupdate', () => {
        let stateOutside = 'before onupdate';
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-02-06' },
                { date: '2022-02-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }],
            search: true,
            onupdate: function () {
                stateOutside = 'after onupdate';
            }
        });

        dg.setValue(0, 0, 'Something');
        expect(stateOutside).to.equal('after onupdate');
    });
});
