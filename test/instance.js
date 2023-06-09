const { expect } = require('chai');

describe('Create an instance of Datagrid', () => {
    it('and wanted columns are displayed', () => {
        let dg = Datagrid(root, {
            data: [
                {
                    date: '2022-01-01',
                    product: 'Widget A',
                    quantity: 122,
                    revenue: 5000
                },
                {
                    date: '2022-01-02',
                    product: 'Widget B',
                    quantity: 177,
                    revenue: 7500
                }
            ],
            columns: [
                { name: 'date', title: 'Date' },
                { name: 'product', title: 'Product' },
                { name: 'quantity', title: 'Quantity' },
                { name: 'revenue', title: 'Revenue' }
            ]
        });

        expect(dg.el.innerHTML).to.include('Date');
        expect(dg.el.innerHTML).to.include('Product');
        expect(dg.el.innerHTML).to.include('Quantity');
        expect(dg.el.innerHTML).to.include('Revenue');
        expect(dg.el.innerHTML).to.include('2022-01-01');
        expect(dg.el.innerHTML).to.include('2022-01-02');
        expect(dg.el.innerHTML).to.include('Widget A');
        expect(dg.el.innerHTML).to.include('Widget B');
        expect(dg.el.innerHTML).to.include('122');
        expect(dg.el.innerHTML).to.include('177');
        expect(dg.el.innerHTML).to.include('5000');
        expect(dg.el.innerHTML).to.include('7500');
    });

    it('and not wanted columns are not displayed', () => {
        let dg = Datagrid(root, {
            data: [
                {
                    date: '2022-01-01',
                    product: 'Widget A',
                    quantity: 122,
                    revenue: 5000
                },
                {
                    date: '2022-01-02',
                    product: 'Widget B',
                    quantity: 177,
                    revenue: 7500
                }
            ],
            columns: [
                { name: 'date', title: 'Date' },
                { name: 'product', title: 'Product' }
            ]
        });

        expect(dg.el.innerHTML).to.include('Date');
        expect(dg.el.innerHTML).to.include('Product');
        expect(dg.el.innerHTML).not.to.include('Quantity');
        expect(dg.el.innerHTML).not.to.include('Revenue');
        expect(dg.el.innerHTML).to.include('2022-01-01');
        expect(dg.el.innerHTML).to.include('2022-01-02');
        expect(dg.el.innerHTML).to.include('Widget A');
        expect(dg.el.innerHTML).to.include('Widget B');
        expect(dg.el.innerHTML).not.to.include('122');
        expect(dg.el.innerHTML).not.to.include('177');
        expect(dg.el.innerHTML).not.to.include('5000');
        expect(dg.el.innerHTML).not.to.include('7500');
    });

    xit('without data and see message', () => {
        let dg = Datagrid(root, {});

        expect(dg.el.innerHTML).to.include('No data available');
    });

    xit('with empty arrays', () => {
        let dg = Datagrid(root, {
            data: [],
            columns: []
        });

        expect(dg.el.innerHTML).to.include('No data available');
    });
});
