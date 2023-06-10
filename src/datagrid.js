if (!lemonade && 'function' == typeof require) var lemonade = require('lemonadejs')
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : (global.Datagrid = factory())
})(this, function () {
    let controllers = {}
    let L = lemonade

    function handleClick(e) {
        // Handle the sorting with single click on header cells.
        if (e.target.tagName == 'TH' && e.target.lemon) {
            let s = e.target.lemon.self
            if (s.name === controllers.sortingBy) {
                controllers.sortingAsc = !controllers.sortingAsc
            } else {
                controllers.sortingAsc = false
            }
            s.parent.setData(
                s.parent.data.sort((a, b) => {
                    if (!controllers.sortingAsc) {
                        return typeof a[s.name] === 'string' && typeof b[s.name] === 'string'
                            ? a[s.name].localeCompare(b[s.name])
                            : Number(a[s.name]) - Number(b[s.name])
                    }
                    return typeof a[s.name] === 'string' && typeof b[s.name] === 'string'
                        ? b[s.name].localeCompare(a[s.name])
                        : Number(b[s.name]) - Number(a[s.name])
                })
            )
            controllers.sortingBy = s.name
        }

        // Handle the cell selection with single click on table body cells.
        if (e.target.tagName == 'TD' && e.target.parentNode.lemon) {
            if (controllers.selectedCell) {
                controllers.selectedCell.classList.remove('datagrid-selected')
            }

            if (controllers.selectedCell == e.target) {
                controllers.selectedCell = null
            } else {
                e.target.classList.add('datagrid-selected')
                controllers.selectedCell = e.target
            }
        }
    }

    function handleDoubleClick(e) {
        // Handle the cell edition mode with double click on table body cells.
        if (e.target.tagName == 'TD' && e.target.parentNode.lemon) {
            controllers.onEdition = [e.target, e.target.parentNode.lemon.self, e.target.property]
            e.target.setAttribute('contentEditable', true)
            e.target.classList.add('edit-mode')
            e.target.focus()
        }
    }

    function blur(e) {
        if (e.target == controllers.selectedCell) {
            e.target.classList.remove('datagrid-selected')
            controllers.selectedCell = null
        }

        // Handle the end of edition with cell value attribution.
        if (controllers.onEdition && e.target == controllers.onEdition[0]) {
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
            controllers.onEdition = []
        }
    }

    function handleKeyboard(e) {
        if (e.key == 'Enter') {
            if (controllers.onEdition) {
                controllers.onEdition[0].blur()
            }
        }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('dblclick', handleDoubleClick)
    document.addEventListener('blur', blur, true)
    document.addEventListener('keydown', handleKeyboard)

    const Datagrid = function () {
        let self = this

        let result = (self.result = self.data)

        if (self.data === undefined || self.data === null) {
            self.data = []
        }

        if (self.columns === undefined || self.columns === null) {
            self.columns = []
        }

        /**
         * Change selected page.
         * @param {Number} pg Specify the destination page to visit. Starts from 1.
         */
        self.goto = function (pg) {
            self.page = pg
        }

        /**
         * Change the component state of data and re-render pagination.
         * @param {Array} data The new data to display in the datagrid.
         */
        self.setData = function (data) {
            result = self.result = self.data = data
            self.page = 0
            page()

            if (typeof self.onupdate == 'function') {
                self.onupdate(self.result)
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

            if (typeof self.onupdate == 'function') {
                self.onupdate(self.result, { x, y, value })
            }
        }

        // Reload the pagination and rows of the table.
        self.loadPages = function () {
            page()
        }

        self.onchange = function (prop) {
            if (prop === 'data' || prop === 'input') {
                search(self.input)

                if (typeof self.onsearch == 'function') {
                    self.onsearch(self)
                }
            } else if (prop === 'page') {
                // Change the page sending the element where the property page is associated
                page()

                if (typeof self.onchangepage == 'function') {
                    self.onchangepage(self)
                }
            }
        }

        // Apply the pagination after initialization
        self.onload = function () {
            if (self.pagination > 0) {
                self.page = 0
            }

            self.search = !!self.search
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
            // Filter the data
            result = self.result = self.data.filter(function (item) {
                return find(item, str)
            })

            // Go back to page zero
            self.page = 0
        }

        const page = function () {
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

            self.pages = pages
        }

        const Pagination = function () {
            // Pagination
            let template = `<li onclick="self.parent.page = this.title;" title="{{self.title}}" selected="{{self.selected}}">{{self.value}}</li>`
            return L.element(template, this)
        }

        let columns = ''

        // Build the columns structure
        self.columns.forEach((v) => {
            columns += `<td :property="'${v.name}'" style="max-width: ${v.width || '100px'}; min-width: ${
                v.width || '100px'
            };text-align: ${v.align || 'left'}">${v.render ? v.render() : `{{self.${v.name}}}`}</td>`
        })

        let template = `<div class="datagrid-card">
                          <div class="datagrid-search-section" search="{{self.search}}">Search:<input type='text' @bind="self.input"/></div>
                          <table id="datagrid-table" class="datagrid-table">
                            <thead>
                                <tr @loop="self.columns">
                                    <th style="max-width: ${self.width || '100px'}; min-width: ${
            self.width || '100px'
        }">
                                        {{self.title}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody @loop="self.result">
                                <tr>${columns}</tr>
                            </tbody>
                          </table>
                          <div class="datagrid-pagination-section"><ul page="{{self.page}}"><Pagination @loop="self.pages"/></ul></div>
                        </div>`

        return L.element(template, self, { Pagination: Pagination })
    }

    return function (root, options) {
        if (typeof root == 'object') {
            L.render(Datagrid, root, options)
            return options
        } else {
            return Datagrid.call(this, root)
        }
    }
})
