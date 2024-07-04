# Book Store Api

### Total Marks: 10

## Run server at PORT 8090

### Ensure strict adherence to instructions.

<!-- overview -->

## you have to make api for book store Api for making this api you have to use node express mongo db with crud operation and filter

## Initial Setup

1. Create a folder named "book store" and place all your code within this folder.

<!-- db  connection -->

## Database Connection

## make make mongodb data base connection using online Atlas link

<!-- Make Schema -->

## you have to make schema

```js
({
  title: String,
  author: String,
  category: String,
  publicationYear: Number,
  price: Number,
  quantity: Number,
  description: String,
  imageUrl: String,
}, { timestamps: true })
 ;


<!-- make end points -->

## make get route '/' send "welcome to the book store"
## make get route '/books/book/:id' find book by id and send that book in object form if data not found send 404 error
    // make delete route first
## make delete route "/books/delete/:id" delete a book from the database send in response all books after removing that book
## make get route "/books" send in response all books

## make post route "/books/addbooks" add books to the database send response  new created books in object

## make patch route "/books/update/:id" update book by id and send all books


```

<!-- middleware -->

```js

## you have to make middleware while posting data into data base check any data is missing if any missed return status 400 and {message: 'All fields are required'}


```

<!-- filters and search -->

```js

## you have to make filters
# make get route  give name `/books/filter` :

1. This route accepts query parameters: `author`, `category`, `title`, and `price`.

2. It filters books based on the provided parameters. For example:
   - If `author` is provided, it filters by author.
   - If `category` is provided, it filters by category.
   - If `title` is provided, it performs a case-insensitive title search.

3. It can also sort the results based on the `price` parameter.
   - If `price` is "lth," it sorts the books from low to high price.
   - If `price` is "htl," it sorts the books from high to low price.

4. This route allows you to combine multiple parameters for more specific searches. If all parameters are provided, it matches all conditions simultaneously.

```

<!-- bonus  -->

## try to build pagination

```js
## Testing your score
1. Navigate to the 'test' directory using `cd test`.
2. Run 'npm i' to install dependencies. if you encounter any errors during installation, you can use the following command: `./node_modules/.bin/cypress install`.
3. Run tests using either `npx cypress open` or `npx cypress run`.

# Best of Luck!

```
