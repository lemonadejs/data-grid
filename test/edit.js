const { expect } = require('chai')

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
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }],
            pagination: 2,
        })

        const tbody = dg.el.children[1].children[1]
        const cell1 = tbody.children[0].children[0]

        cell1.dispatchEvent(new Event('dblclick'))
        for (const char of ' 11:00') {
            cell1.textContent += char
            cell1.dispatchEvent(new Event('input', { bubbles: true }))
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
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }]
        })

        const s = dg

        s.data.push({ date: '1999-10-10' })
        s.data.push({ date: '1999-09-20' })
        s.refresh('data')

        expect(dg.el.innerHTML).to.include('1999-10-10')
        expect(dg.el.innerHTML).to.include('1999-09-20')
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
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }]
        })

        const s = dg

        s.data.shift()
        s.refresh('data')

        expect(dg.el.innerHTML).not.to.include('2022-01-01')
        expect(dg.el.innerHTML).to.include('2022-01-02')

        s.data.shift()
        s.refresh('data')

        expect(dg.el.innerHTML).not.to.include('2022-01-02')
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
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }]
        })

        const s = dg

        s.setValue(0, 0, '1900-01-01')

        expect(dg.el.innerHTML).not.to.include('2022-01-01')
        expect(dg.el.innerHTML).to.include('2022-01-02')
        expect(dg.el.children[1].children[1].children[0].children[0].innerHTML).to.include('1900-01-01')

        s.setValue('date', 0, '2050-12-12')

        expect(dg.el.children[1].children[1].children[0].children[0].innerHTML).to.include('2050-12-12')
    })

    it('and set data programmatically', () => {
        let data = [
            { date: '2022-01-01' },
            { date: '2022-01-02' },
            { date: '2022-01-03' },
            { date: '2022-01-04' },
            { date: '2022-01-05' },
            { date: '2022-01-06' },
            { date: '2022-01-07' }
        ]

        let dg = Datagrid(root, {
            data: data,
            columns: [{ name: 'date', title: 'Date' }]
        })

        data.push({ date: '1550-01-02' })
        dg.refresh('data')

        expect(dg.el.innerHTML).to.include('1550-01-02')
    })

    it('and editing dont break search', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }],
            search: true
        })

        const s = dg

        s.setValue(0, 0, '1900-01-01')
        s.setValue('date', 0, '2050-12-12')

        expect(dg.el.children[1].children[1].children[0].children[0].innerHTML).to.include('2050-12-12')

        dg.input = '2022'

        expect(dg.el.innerHTML).not.to.include('2050-12-12')
        expect(dg.el.innerHTML).to.include('2022-01-02')
    })

    it('and editing dont break pagination', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }],
            pagination: 3,
            search: true
        })

        const s = dg

        s.setValue(0, 0, '1900-01-01')
        s.setValue('date', 0, '2050-12-12')

        const li = dg.el.children[2].children[0].children

        expect(dg.el.innerHTML).not.to.include('2022-01-04')

        li[2].click()

        expect(dg.el.innerHTML).to.include('2022-01-04')
    })

    it('and editing dont break sorting', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-01-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }]
        })

        const tbody = dg.el.children[1].children[1]
        const cell1 = tbody.children[0].children[0]

        cell1.dispatchEvent(new Event('dblclick'))
        for (const char of ' 11:00') {
            cell1.textContent += char
            cell1.dispatchEvent(new Event('input', { bubbles: true }))
        }
        cell1.dispatchEvent(new Event('blur'))

        const headers = dg.el.children[1].children[0].children[0].children

        headers[0].click()

        expect(tbody.children[0].children[0].innerHTML).to.equal('2022-01-01 11:00')
        expect(tbody.children[1].children[0].innerHTML).to.equal('2022-01-02')
        expect(tbody.children[6].children[0].innerHTML).to.equal('2022-01-07')

        headers[0].click()

        expect(tbody.children[0].children[0].innerHTML).to.equal('2022-01-07')
        expect(tbody.children[1].children[0].innerHTML).to.equal('2022-01-06')
        expect(tbody.children[6].children[0].innerHTML).to.equal('2022-01-01 11:00')
    })
})
