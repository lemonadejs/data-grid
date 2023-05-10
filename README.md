# DataGridLM

Welcome to Lemon Data-Grid! This lightweight JavaScript library allows you to effortlessly create data grids featuring search, pagination, and editable rows. With DataGridLM, you can conveniently load JSON data, define columns, and seamlessly render the grid within your HTML.

## Features

- Lightweight: DataGridLM is only about 5 Kbytes in size, making it fast and easy to load.
- Customizable: You can define columns and user-defined actions to suit your specific use case.
- Reactive: Any changes to the underlying data are automatically applied to the HTML, making it easy to keep your grid up-to-date.
- Integration: DataGridLM can be used as a standalone library or integrated with LemonadeJS or React.

## Getting Started

Utilizing DataGridLM is straightforward. Just include the JavaScript file in your project and instantiate a new grid using the provided API. From there, you can effortlessly load data, define columns, and incorporate custom user actions as required.

### CDN

To use DataGrid via a CDN, include the following script tags in your HTML file:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/lemonadejs/dist/lemonade.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@lemonadejs/datagrid/dist/index.min.js"></script>
```   
### npm Installation

To install your project using npm, run the following command:
```bash
npm install @lemonadejs/datagrid
```    
## Usage

Instantiate the data grid by providing the required parameters, including the data and columns.
```html
<div id='root'></div>
<script>
    const root = getElementById('root')
    Datagrid(root, {
        data: [
            { id: 1, person: 'Maria', age: 28 },
            { id: 2, person: 'Carlos', age: 33 }
        ],
        columns: [
            { name: 'person', headerName: 'Name' },
            { name: 'age', headerName: 'Age' },
        ],
    })
</script>
```
## Configuration

You can also add ***pagination*** and ***search*** functionalities by adding it to the options. Eg:
```javascript
Datagrid(root, {
        data: [
            { id: 1, person: 'Maria', age: 28 },
            { id: 2, person: 'Carlos', age: 33 }
        ],
        columns: [
            { name: 'person', headerName: 'Name' },
            { name: 'age', headerName: 'Age' },
        ],
        pagination: 5, // Each page will contain this quantity of items.
        search: true,
    })
```
## Examples

Here are a few examples of DataGridLM in action:

- [Basic Data Grid Example](https://lemonadejs.net/components/datagrid#example-1)
- [Example with Large Data Sets](https://lemonadejs.net/components/datagrid#example-2)
- [Example with Data Addition and Deletion](https://lemonadejs.net/components/datagrid#example-3)

## Contributing

DataGridLM is an open source project and contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you'd like to contribute code, please fork the repository and submit a pull request.

## License

DataGridLM is released under the MIT.
