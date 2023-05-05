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

        let tbody = dg.el.children[1].children[1]

        dg.input = '01-01'

        expect(tbody.innerHTML).to.include('2022-01-01')
        expect(tbody.innerHTML).not.to.include('2022-01-02')
        expect(tbody.innerHTML).not.to.include('2022-01-05')

        dg.input = ''

        expect(tbody.innerHTML).to.include('2022-01-01')
        expect(tbody.innerHTML).to.include('2022-01-02')
        expect(tbody.innerHTML).to.include('2022-01-05')
        
        dg.input = '2022-02'
        
        expect(tbody.innerHTML).not.to.include('2022-01-01')
        expect(tbody.innerHTML).to.include('2022-02-07')
        expect(tbody.innerHTML).to.include('2022-02-06')
    })

    it('and dont break pagination', () => {
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
            pagination: 5,
        })


        dg.input = '01-01'
        dg.input = '2022'

        const li = dg.el.children[2].children[0].children

        li[2].click()       

        expect(dg.el.innerHTML).not.to.include('2022-01-01')
        expect(dg.el.innerHTML).to.include('2022-02-06')
        expect(dg.el.innerHTML).to.include('2022-02-07')
    })
    
    it('and dont break data editing', () => {
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
            pagination: 5,
        })


        dg.input = '01-01'
        dg.input = '2022'

        const tbody = dg.el.children[1].children[1]
        const cell1 = tbody.children[0].children[0]

        cell1.dispatchEvent(new Event('dblclick')) 
        for (const char of ' 11:00') {
            cell1.textContent += char
            cell1.dispatchEvent(new Event('input', {bubbles: true}))
        }
        cell1.dispatchEvent(new Event('blur'))

        expect(cell1.innerHTML).to.include('2022-01-01 11:00')
    })
    
    it('and dont break sorting', () => {
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


        dg.input = '01-01'
        dg.input = '2022'

        const tbody = dg.el.children[1].children[1]
        const headers = dg.el.children[1].children[0].children[0].children

        headers[0].click()

        expect(tbody.children[0].children[0].innerHTML).to.equal('2022-01-01')
        expect(tbody.children[1].children[0].innerHTML).to.equal('2022-01-02')
        expect(tbody.children[6].children[0].innerHTML).to.equal('2022-02-07')

        headers[0].click()

        expect(tbody.children[0].children[0].innerHTML).to.equal('2022-02-07')
        expect(tbody.children[1].children[0].innerHTML).to.equal('2022-02-06')
        expect(tbody.children[6].children[0].innerHTML).to.equal('2022-01-01')
    })
});
