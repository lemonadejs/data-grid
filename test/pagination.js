const { expect } = require('chai');

describe('Create a Datagrid with pagination', () => {
    it('and travel through pages via dom', () => {
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
        

        const li = dg.children[2].children[0].children

        expect(li.length).to.equal(6)
        expect(dg.innerHTML).to.include('2022-01-02')
        expect(dg.innerHTML).not.to.include('2022-01-03')
        expect(dg.innerHTML).not.to.include('2022-01-06')

        li[2].click()
        
        expect(dg.innerHTML).not.to.include('2022-01-02')
        expect(dg.innerHTML).to.include('2022-01-03')
        expect(dg.innerHTML).not.to.include('2022-01-06')

        li[3].click()

        expect(dg.innerHTML).not.to.include('2022-01-02')
        expect(dg.innerHTML).not.to.include('2022-01-03')
        expect(dg.innerHTML).to.include('2022-01-06')

        li[0].click()

        expect(dg.innerHTML).not.to.include('2022-01-02')
        expect(dg.innerHTML).to.include('2022-01-03')
        expect(dg.innerHTML).not.to.include('2022-01-06')

        li[li.length - 1].click()

        expect(dg.innerHTML).not.to.include('2022-01-02')
        expect(dg.innerHTML).not.to.include('2022-01-03')
        expect(dg.innerHTML).to.include('2022-01-06')
    })

    
    it('and travel through pages via goto', () => {
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
        

        const li = dg.children[2].children[0].children

        expect(li.length).to.equal(6)
        expect(dg.innerHTML).to.include('2022-01-02')
        expect(dg.innerHTML).not.to.include('2022-01-03')
        expect(dg.innerHTML).not.to.include('2022-01-06')
        
        dg.lemon.self.goto(1)

        expect(dg.innerHTML).not.to.include('2022-01-02')
        expect(dg.innerHTML).to.include('2022-01-03')
        expect(dg.innerHTML).not.to.include('2022-01-06')

        dg.lemon.self.goto(2)

        expect(dg.innerHTML).not.to.include('2022-01-02')
        expect(dg.innerHTML).not.to.include('2022-01-03')
        expect(dg.innerHTML).to.include('2022-01-06')
    })
    
    it('and <<, >> buttons dont go out of index', () => {
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
        

        const li = dg.children[2].children[0].children

        expect(li.length).to.equal(6)
        expect(dg.innerHTML).to.include('2022-01-02')
        expect(dg.innerHTML).not.to.include('2022-01-03')
        expect(dg.innerHTML).not.to.include('2022-01-06')
        
        li[0].click()

        expect(dg.innerHTML).to.include('2022-01-02')
        expect(dg.innerHTML).not.to.include('2022-01-03')
        expect(dg.innerHTML).not.to.include('2022-01-06')

        dg.lemon.self.goto(3)

        expect(dg.innerHTML).not.to.include('2022-01-02')
        expect(dg.innerHTML).not.to.include('2022-01-03')
        expect(dg.innerHTML).not.to.include('2022-01-06')
        expect(dg.innerHTML).to.include('2022-01-07')
        
        li[li.length - 1].click()

        expect(dg.innerHTML).not.to.include('2022-01-02')
        expect(dg.innerHTML).not.to.include('2022-01-03')
        expect(dg.innerHTML).not.to.include('2022-01-06')
        expect(dg.innerHTML).to.include('2022-01-07')
    })

    
    xit('and dont break search', () => {
        
    })
    
    xit('and dont break data editing', () => {
        
    })
});
