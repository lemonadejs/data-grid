const { expect } = require('chai');

describe('Create a Datagrid with search', () => {
    it('and search successfully', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-02-06' },
                { date: '2022-02-07' },
            ],
            columns: [
                { name: 'date', headerName: 'Date' },
            ],
            search: true,
        })

        let tbody = dg.children[1].children[1]

        dg.lemon.self.input = '01-01'

        expect(tbody.innerHTML).to.include('2022-01-01')
        expect(tbody.innerHTML).not.to.include('2022-01-02')
        expect(tbody.innerHTML).not.to.include('2022-01-05')

        dg.lemon.self.input = ''

        expect(tbody.innerHTML).to.include('2022-01-01')
        expect(tbody.innerHTML).to.include('2022-01-02')
        expect(tbody.innerHTML).to.include('2022-01-05')
        
        dg.lemon.self.input = '2022-02'
        
        expect(tbody.innerHTML).not.to.include('2022-01-01')
        expect(tbody.innerHTML).to.include('2022-02-07')
        expect(tbody.innerHTML).to.include('2022-02-06')
    })

    xit('and dont break pagination', () => {

    })
    
    xit('and dont break data editing', () => {

    })
});
