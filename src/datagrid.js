if (!lemonade && 'function' == typeof require) {
    var lemonade = require('lemonadejs')
}

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Datagrid = factory();
}(this, (function () {
    let controllers = {};
    let L = lemonade;

    function Path(str) {
        str = str.split('.');
        if (str.length) {
            let o = this;
            let p = null;
            while (str.length > 1) {
                // Get the property
                p = str.shift();
                // Check if the property exists
                if (o.hasOwnProperty(p)) {
                    o = o[p];
                } else {
                    // Property does not exists
                    return undefined;
                }
            }
            // Get the property
            p = str.shift();
                // Return the value
                if (o) {
                    return o[p];
                }
        }
        // Something went wrong
        return false;
    }

    function handleClick(e) {
        // Handle the sorting with single click on header cells.
        if (e.target.tagName === 'TH' && e.target.lemon) {
            let s = e.target.lemon.self;
            if (s.name === controllers.sortingBy) {
                controllers.sortingAsc = !controllers.sortingAsc
            } else {
                controllers.sortingAsc = false
            }
            controllers.sortingBy = s.name
            s.parent.sort(controllers.sortingBy, controllers.sortingAsc)
        }

        // Handle the cell selection with single click on table body cells.
        if (e.target.tagName === 'TD' && e.target.parentNode.lemon) {
            if (controllers.selectedCell) {
                controllers.selectedCell.classList.remove('datagrid-selected')
            }

            if (controllers.selectedCell === e.target) {
                controllers.selectedCell = null
            } else {
                e.target.classList.add('datagrid-selected')
                controllers.selectedCell = e.target
            }
        }
    }

    function handleDoubleClick(e) {
        let lemon = e.target.parentNode.lemon;
        // Handle the cell edition mode with double click on table body cells.
        if (e.target.tagName === 'TD' && lemon && lemon.self.parent.editable === true) {
            controllers.onEdition = [e.target, e.target.parentNode.lemon.self, e.target.property]
            e.target.setAttribute('contentEditable', true)
            e.target.classList.add('edit-mode')
            e.target.focus()
        }
    }

    function blur(e) {
        if (e.target === controllers.selectedCell) {
            e.target.classList.remove('datagrid-selected')
            controllers.selectedCell = null
        }

        // Handle the end of edition with cell value attribution.
        if (controllers.onEdition && e.target === controllers.onEdition[0]) {
            controllers.onEdition[0].removeAttribute('contentEditable')
            e.target.classList.remove('edit-mode')
            controllers.onEdition[1].parent.setValue(
                controllers.onEdition[2],
                Array.prototype.indexOf.call(
                    controllers.onEdition[0].parentNode.parentNode.children,
                    controllers.onEdition[0].parentNode
                ),
                e.target.innerText
            )
            controllers.onEdition = [];
        }
    }

    function handleKeyboard(e) {
        if (e.key === 'Enter') {
            if (controllers.onEdition) {
                controllers.onEdition[0].blur()
            }
        }
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('dblclick', handleDoubleClick);
    document.addEventListener('blur', blur, true);
    document.addEventListener('keydown', handleKeyboard);

    const Datagrid = function () {
        let self = this

        // Make sure this is boolean
        self.search = !!self.search;

        // Make sure these are arrays
        if (! Array.isArray(self.data)) {
            self.data = []
        }
        if (! Array.isArray(self.columns)) {
            self.columns = []
        }

        // Result to be processed
        let result = self.data;

        // Dispatcher
        const Dispatch = (type, option) => {
            if (typeof(self[type]) === 'function') {
                self[type](self, option);
            }
        }

        /**
         * Set the value of a cell based on the provided coordinates.
         * @param {Number | String} x The column identificator, can be the number or the name of the column.
         * @param {Number} y The row position.
         * @param {String} value The new value that the cell will receive.
         */
        self.setValue = function (x, y, value) {
            let property = typeof x === 'number' ? self.columns[x].name : x
            self.data[y][property] = value

            // Dispatch event
            Dispatch('onupdate', { x, y, value });
        }

        self.onchange = function (prop) {
            if (prop === 'data' || prop === 'input') {
                search(self.input)
            } else if (prop === 'page') {
                page()
            }
        }

        // Apply the pagination after initialization
        self.onload = function () {
            self.page = 0;
        }

        self.sort = function(sortingBy, sortingAsc) {
            self.data = self.data.sort((a, b) => {
                let valueA = Path.call(a, sortingBy)
                let valueB = Path.call(b, sortingBy)
                if (!sortingAsc) {
                    return typeof valueA === 'string' && typeof valueB === 'string'
                        ? valueA.localeCompare(valueB)
                        : Number(valueA) - Number(valueB)
                }
                return typeof valueA === 'string' && typeof valueB === 'string'
                    ? valueB.localeCompare(valueA)
                    : Number(valueB) - Number(valueA)
            })

            self.page = self.page
        }

        const find = function (o, query) {
            for (let key in o) {
                let value = o[key]
                if (('' + value).toLowerCase().search(query.toLowerCase()) >= 0) {
                    return true
                }
            }
            return false
        }

        const search = function (str) {
            if (str) {
                // Filter the data
                result = self.data.filter(function (item) {
                    return find(item, str)
                })

                // Dispatch event
                Dispatch('onsearch');
            } else {
                result = self.data
            }
            
            // Go back to page zero
            self.page = 0;
        }

        const page = function () {
            if (! self.pagination) {
                self.result = result;
            }

            // Pagination
            let p = parseInt(self.pagination)
            let s
            let f
            // Define the range for this pagination configuration
            if (p && result.length > p) {
                s = p * self.page
                f = p * self.page + p

                if (result.length < f) {
                    f = result.length
                }
            } else {
                s = 0
                f = result.length
            }

            // Change the page
            p = []
            for (let i = s; i < f; i++) {
                p.push(result[i])
            }

            // Set the new results for the view
            self.result = p

            // Update pagination
            pagination()
        }

        const pagination = function () {
            let pages = []
            // Update pagination
            if (self.pagination > 0) {
                // Get the number of the pages based on the data
                let n = Math.ceil(result.length / self.pagination)
                if (n >= 1) {
                    let s
                    let f
                    // Controllers
                    if (self.page < 6) {
                        s = 0
                        f = n < 10 ? n : 10
                    } else if (n - self.page < 5) {
                        s = n - 9
                        f = n
                        if (s < 0) {
                            s = 0
                        }
                    } else {
                        s = parseInt(self.page) - 4
                        f = parseInt(self.page) + 5
                    }

                    // First page
                    pages.push({
                        title: Number(self.page) > 0 ? Number(self.page) - 1 : Number(self.page),
                        value: 'Previous',
                        selected: false
                    })

                    // Link to each page
                    let i
                    for (i = s; i < f; i++) {
                        pages.push({
                            title: i,
                            value: i + 1,
                            selected: self.page == i
                        })
                    }

                    // Last page
                    pages.push({
                        title: Number(self.page) < i - 1 ? Number(self.page) + 1 : Number(self.page),
                        value: 'Next',
                        selected: false
                    })
                }
            }

            self.pages = pages;
        }

        // String for the template
        let columns = '';

        // Build the columns structure
        self.columns.forEach((v, k) => {
            columns += '<td';
            if (v.render) {
                columns += ` :ready="self.parent.columns[${k}].render(this, ${k}, self.parent.data.indexOf(self), ${v.name?'self.'+v.name:'null'}, self)"`;
            }
            if (v.name) {
                columns += ` :property="'${v.name}'">{{self.${v.name}}}</td>`;
            } else {
                columns += `></td>`;
            }
        })

        return `<div class="datagrid-card">
            <div class="datagrid-search-section" search="{{self.search}}">Search:<input type='text' :bind="self.input"/></div>
            <table id="datagrid-table" class="datagrid-table">
            <thead><tr :loop="self.columns"><th style="width: {{self.width||'100px'}}; text-align: {{self.align || 'left'}}">{{self.title}}</th></tr></thead>
            <tbody :loop="self.result" data="{{self.data}}"><tr>${columns}</tr></tbody>
            </table>
            <div class="datagrid-pagination-section"><ul :loop="self.pages" page="{{self.page}}"><li onclick="self.parent.page = this.title;" title="{{self.title}}" selected="{{self.selected}}">{{self.value}}</li></ul></div>
        </div>`
    }

    return function (root, options) {
        if (typeof root == 'object') {
            L.render(Datagrid, root, options)
            return options
        } else {
            return Datagrid.call(this, root)
        }
    }
})));