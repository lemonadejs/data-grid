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
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }],
            pagination: 2
        });

        const li = dg.el.children[2].children[0].children;

        expect(li.length).to.equal(6);
        expect(dg.el.innerHTML).to.include('2022-01-02');
        expect(dg.el.innerHTML).not.to.include('2022-01-03');
        expect(dg.el.innerHTML).not.to.include('2022-01-06');

        li[2].click();

        expect(dg.el.innerHTML).not.to.include('2022-01-02');
        expect(dg.el.innerHTML).to.include('2022-01-03');
        expect(dg.el.innerHTML).not.to.include('2022-01-06');

        li[3].click();

        expect(dg.el.innerHTML).not.to.include('2022-01-02');
        expect(dg.el.innerHTML).not.to.include('2022-01-03');
        expect(dg.el.innerHTML).to.include('2022-01-06');

        li[0].click();

        expect(dg.el.innerHTML).not.to.include('2022-01-02');
        expect(dg.el.innerHTML).to.include('2022-01-03');
        expect(dg.el.innerHTML).not.to.include('2022-01-06');

        li[li.length - 1].click();

        expect(dg.el.innerHTML).not.to.include('2022-01-02');
        expect(dg.el.innerHTML).not.to.include('2022-01-03');
        expect(dg.el.innerHTML).to.include('2022-01-06');
    });

    it('and <<, >> buttons dont go out of index', () => {
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
            pagination: 2
        });

        const li = dg.el.children[2].children[0].children;

        expect(li.length).to.equal(6);
        expect(dg.el.innerHTML).to.include('2022-01-02');
        expect(dg.el.innerHTML).not.to.include('2022-01-03');
        expect(dg.el.innerHTML).not.to.include('2022-01-06');

        li[0].click();

        expect(dg.el.innerHTML).to.include('2022-01-02');
        expect(dg.el.innerHTML).not.to.include('2022-01-03');
        expect(dg.el.innerHTML).not.to.include('2022-01-06');
    });

    it('and dont break search', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-02-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }],
            pagination: 2
        });

        const li = dg.el.children[2].children[0].children;

        li[3].click();

        expect(dg.el.innerHTML).not.to.include('2022-02-03');

        dg.input = '2022-02';

        expect(dg.el.innerHTML).to.include('2022-02-03');
        expect(dg.el.innerHTML).not.to.include('2022-01');
    });

    it('and changing page doesnt break data editing', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-02-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }],
            pagination: 2
        });

        const li = dg.el.children[2].children[0].children;

        li[3].click();

        const tbody = dg.el.children[1].children[1];
        const cell1 = tbody.children[0].children[0];

        cell1.dispatchEvent(new Event('dblclick'));
        for (const char of ' 11:00') {
            cell1.textContent += char;
            cell1.dispatchEvent(new Event('input', { bubbles: true }));
        }
        cell1.dispatchEvent(new Event('blur'));

        expect(cell1.innerHTML).to.include('2022-01-05 11:00');
    });

    it('and changing page doesnt break sorting', () => {
        let dg = Datagrid(root, {
            data: [
                { date: '2022-01-01' },
                { date: '2022-01-02' },
                { date: '2022-02-03' },
                { date: '2022-01-04' },
                { date: '2022-01-05' },
                { date: '2022-01-06' },
                { date: '2022-01-07' }
            ],
            columns: [{ name: 'date', title: 'Date' }],
            pagination: 3
        });

        const li = dg.el.children[2].children[0].children;

        li[3].click();

        const tbody = dg.el.children[1].children[1];
        const headers = dg.el.children[1].children[0].children[0].children;

        headers[0].click();

        expect(tbody.children[0].children[0].innerHTML).to.equal('2022-01-01');
        expect(tbody.children[1].children[0].innerHTML).to.equal('2022-01-02');
        expect(tbody.children[2].children[0].innerHTML).to.equal('2022-01-04');

        headers[0].click();

        expect(tbody.children[0].children[0].innerHTML).to.equal('2022-02-03');
        expect(tbody.children[1].children[0].innerHTML).to.equal('2022-01-07');
        expect(tbody.children[2].children[0].innerHTML).to.equal('2022-01-06');
    });
});
