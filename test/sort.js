const { expect } = require('chai');

describe('Create a Datagrid', () => {
    it('and sort successfully', () => {
        let dg = Datagrid(root, {
            data: [
                { name: 'Baudur', grade: 8 },
                { name: 'Alice', grade: 9.5 },
                { name: 'Carlos', grade: 6 },
                { name: 'Danny', grade: 7 },
                { name: 'Celine', grade: 8 },
                { name: 'Arthur', grade: 10 }
            ],
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'grade', title: 'Grade' }
            ],
            search: true
        });

        const tbody = dg.el.children[1].children[1];
        const headers = dg.el.children[1].children[0].children[0].children;

        headers[0].click();

        expect(tbody.children[0].children[0].innerHTML).to.equal('Alice');
        expect(tbody.children[1].children[0].innerHTML).to.equal('Arthur');
        expect(tbody.children[5].children[0].innerHTML).to.equal('Danny');

        headers[0].click();

        expect(tbody.children[5].children[0].innerHTML).to.equal('Alice');
        expect(tbody.children[0].children[0].innerHTML).to.equal('Danny');
        expect(tbody.children[4].children[0].innerHTML).to.equal('Arthur');

        headers[1].click();

        expect(tbody.children[0].children[1].innerHTML).to.equal('10');
        expect(tbody.children[1].children[1].innerHTML).to.equal('9.5');
        expect(tbody.children[2].children[1].innerHTML).to.equal('8');

        headers[1].click();

        expect(tbody.children[0].children[1].innerHTML).to.equal('6');
        expect(tbody.children[1].children[1].innerHTML).to.equal('7');
        expect(tbody.children[2].children[1].innerHTML).to.equal('8');
    });

    it('and dont break pagination', () => {
        let dg = Datagrid(root, {
            data: [
                { name: 'Baudur', grade: 8 },
                { name: 'Alice', grade: 9.5 },
                { name: 'Carlos', grade: 6 },
                { name: 'Danny', grade: 7 },
                { name: 'Celine', grade: 8 },
                { name: 'Arthur', grade: 10 }
            ],
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'grade', title: 'Grade' }
            ],
            search: true,
            pagination: 3
        });

        const tbody = dg.el.children[1].children[1];
        const headers = dg.el.children[1].children[0].children[0].children;

        headers[0].click();

        const li = dg.el.children[2].children[0].children;
        li[3].click();

        expect(dg.el.innerHTML).to.include('Danny');
        expect(dg.el.innerHTML).not.to.include('Alice');

        headers[0].click();
        li[3].click();

        expect(dg.el.innerHTML).not.to.include('Danny');
        expect(dg.el.innerHTML).to.include('Alice');
    });

    it('and dont break search', () => {
        let dg = Datagrid(root, {
            data: [
                { name: 'Baudur', grade: 8 },
                { name: 'Alice', grade: 9.5 },
                { name: 'Carlos', grade: 6 },
                { name: 'Danny', grade: 7 },
                { name: 'Celine', grade: 8 },
                { name: 'Arthur', grade: 10 }
            ],
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'grade', title: 'Grade' }
            ],
            search: true,
            pagination: 3
        });

        const tbody = dg.el.children[1].children[1];
        const headers = dg.el.children[1].children[0].children[0].children;

        headers[0].click();

        dg.input = 'a';

        expect(dg.el.innerHTML).not.to.include('Celine');
        expect(dg.el.innerHTML).to.include('Alice');

        dg.input = 'celine';

        expect(dg.el.innerHTML).not.to.include('Aline');
        expect(dg.el.innerHTML).to.include('Celine');
    });

    it('and dont break cell edit', () => {
        let dg = Datagrid(root, {
            data: [
                { name: 'Baudur', grade: 8 },
                { name: 'Alice', grade: 9.5 },
                { name: 'Carlos', grade: 6 },
                { name: 'Danny', grade: 7 },
                { name: 'Celine', grade: 8 },
                { name: 'Arthur', grade: 10 }
            ],
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'grade', title: 'Grade' }
            ],
            search: true,
            pagination: 3
        });

        const tbody = dg.el.children[1].children[1];
        const headers = dg.el.children[1].children[0].children[0].children;

        headers[0].click();
        headers[0].click();

        let cell1 = tbody.children[0].children[0];

        cell1.dispatchEvent(new Event('dblclick'));
        for (const char of ' Cooper') {
            cell1.textContent += char;
            cell1.dispatchEvent(new Event('input', { bubbles: true }));
        }
        cell1.dispatchEvent(new Event('blur'));

        expect(cell1.innerHTML).to.include('Alice Cooper');
        headers[1].click();
        expect(tbody.children[0].children[0].innerHTML).to.include('Arthur');
        headers[1].click();
        expect(tbody.children[0].children[0].innerHTML).to.include('Carlos');
    });
});
