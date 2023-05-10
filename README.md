<h1>DataGridLM</h1>
<p>Welcome to Lemon Data-Grid! This lightweight JavaScript library allows you to effortlessly create data grids featuring search, pagination, and editable rows. With DataGridLM, you can conveniently load JSON data, define columns, and seamlessly render the grid within your HTML.
</p>
<h2>Features</h2>
<ul>
    <li>Lightweight: DataGridLM is only about 5 Kbytes in size, making it fast and easy to load.</li>
    <li>Customizable: You can define columns and user-defined actions to suit your specific use case.</li>
    <li>Reactive: Any changes to the underlying data are automatically applied to the HTML, making it easy to keep your grid up-to-date.</li>
    <li>Integration: DataGridLM can be used as a standalone library or integrated with LemonadeJS or React.</li>
</ul>
<h2>Getting Started</h2>
<p>Utilizing DataGridLM is straightforward. Just include the JavaScript file in your project and instantiate a new grid using the provided API. From there, you can effortlessly load data, define columns, and incorporate custom user actions as required.
</p>
<h3>CDN</h3>
<p>To use DataGrid via a CDN, include the following script tags in your HTML file:</p>
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/lemonadejs/dist/lemonade.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@lemonadejs/datagrid/dist/index.min.js"></script>
```   
<h3>npm Installation</h3>
<p>To install your project using npm, run the following command:</p>
```bash
npm install @lemonadejs/datagrid
```    
<h2>Usage</h2>
<p>Instantiate the data grid by providing the required parameters, including the data and columns.</p>
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
<h2>Configuration</h2>
<p>You can also add <i>pagination</i> and <i>search</i> functionalities by adding it to the options. Eg:</p>
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
<h2>Examples</h2>
<p>Here are a few examples of DataGridLM in action:</p>
<ul>
    <li><a href="https://lemonadejs.net/components/datagrid#example-1">Basic Data Grid Example</a></li>
    <li><a href="https://lemonadejs.net/components/datagrid#example-2">Example with Large Data Sets</a></li>
    <li><a href="https://lemonadejs.net/components/datagrid#example-3">Example with Data Addition and Deletion</a></li>
</ul>
<h2>Contributing</h2>
<p>DataGridLM is an open source project and contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you'd like to contribute code, please fork the repository and submit a pull request.
</p>
<h2>License</h2>
<p>DataGridLM is released under the MIT.</p>
