const { expect } = require('chai');

describe('Create a Datagrid with search', () => {
    it('and search successfully', () => {
        let dg = Datagrid(root, {
            data: [
                { name: 'Baudur', grade: 8 },
                { name: 'Alice', grade: 9.5 },
                { name: 'Carlos', grade: 6 },
                { name: 'Danny', grade: 7 },
                { name: 'Celine', grade: 8 },
                { name: 'Arthur', grade: 10 },
            ],
            columns: [
                { name: 'name', headerName: 'Name' },
                { name: 'grade', headerName: 'Grade' },
            ],
            search: true,
        })

        const tbody = dg.children[1].children[1]
        const headers = dg.children[1].children[0].children[0].children

        headers[0].click()

        expect(tbody.children[0].children[0].innerHTML).to.equal('Alice')
        expect(tbody.children[1].children[0].innerHTML).to.equal('Arthur')
        expect(tbody.children[5].children[0].innerHTML).to.equal('Danny')

        headers[0].click()

        expect(tbody.children[5].children[0].innerHTML).to.equal('Alice')
        expect(tbody.children[0].children[0].innerHTML).to.equal('Danny')
        expect(tbody.children[4].children[0].innerHTML).to.equal('Arthur')

        headers[1].click()

        expect(tbody.children[0].children[1].innerHTML).to.equal('6')
        expect(tbody.children[1].children[1].innerHTML).to.equal('7')
        expect(tbody.children[2].children[1].innerHTML).to.equal('8')

        headers[1].click()

        expect(tbody.children[0].children[1].innerHTML).to.equal('10')
        expect(tbody.children[1].children[1].innerHTML).to.equal('9.5')
        expect(tbody.children[2].children[1].innerHTML).to.equal('8')
    })

    xit('and dont break pagination', () => {
    })

    xit('and dont break search', () => {
    })

    xit('and dont break cell edit', () => {
    })
});
