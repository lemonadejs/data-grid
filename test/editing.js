const { expect } = require('chai');

describe('Create a Datagrid', () => {
    it('and edit cells', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' },
            ],
            columns: [
                { name: 'date', headerName: 'Date' },
            ],
            pagination: 2,
        })
        

        const tbody = dg.children[1].children[1]
        const cell1 = tbody.children[0].children[0]

        cell1.dispatchEvent(new Event('dblclick')) 
        for (const char of ' 11:00') {
            cell1.textContent += char
            cell1.dispatchEvent(new Event('input', {bubbles: true}))
        }
        cell1.dispatchEvent(new Event('blur'))

        expect(cell1.innerHTML).to.include('2022-01-01 11:00')
    })
    
    it('and add row programmatically', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' },
            ],
            columns: [
                { name: 'date', headerName: 'Date' },
            ],
        })

        const s = dg.lemon.self

        s.insertRow({ date: '1999-10-10' })
        s.insertRow({ date: '1999-09-20' })

        expect(dg.innerHTML).to.include('1999-10-10')
        expect(dg.innerHTML).to.include('1999-09-20')
    })
    
    it('and remove row programmatically', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' },
            ],
            columns: [
                { name: 'date', headerName: 'Date' },
            ],
        })

        const s = dg.lemon.self

        s.removeRow()

        expect(dg.innerHTML).not.to.include('2022-01-01')
        expect(dg.innerHTML).to.include('2022-01-02')

        s.removeRow()
        
        expect(dg.innerHTML).not.to.include('2022-01-02')

        s.removeRow(1)

        expect(dg.innerHTML).not.to.include('2022-01-04')
        expect(dg.innerHTML).to.include('2022-01-03')
    })
    
    it('and set cell value programmatically', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' },
            ],
            columns: [
                { name: 'date', headerName: 'Date' },
            ],
        })

        const s = dg.lemon.self

        s.setValue(0, 0, '1900-01-01')

        expect(dg.innerHTML).not.to.include('2022-01-01')
        expect(dg.innerHTML).to.include('2022-01-02')
        expect(dg.children[1].children[1].children[0].children[0].innerHTML).to.include('1900-01-01')

        s.setValue('date', 0, '2050-12-12')

        expect(dg.children[1].children[1].children[0].children[0].innerHTML).to.include('2050-12-12')
    })

    it('and set data programmatically', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' },
            ],
            columns: [
                { name: 'date', headerName: 'Date' },
            ],
        })

        const newData = [
            { date: '1550-01-01' },
            { date: '1550-01-02' },
        ]
        const s = dg.lemon.self

        s.setData(newData)

        expect(dg.innerHTML).not.to.include('2022-01-01')
        expect(dg.innerHTML).to.include('1550-01-02')
    })

    xit('and editing dont break search', () => {
        
    })
    
    xit('and editing dont break pagination', () => {
        
    })
});
