describe("Book Store API", () => {
  let bookIds = []; // Declare an array to store the book IDs
let totalMarks=0
  beforeEach(() => {
    cy.visit("http://localhost:8090"); // Update with your API endpoint
  });

  it("should retrieve all books - marks 1", () => {
    cy.request("GET", "/books").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("should retrieve a single book by ID - marks 1", () => {
    cy.request("POST", "/books/addbooks", {
      title: "Single Book",
      author: "Author",
      category: "Non-Fiction",
      publicationYear: 2021,
      price: 15,
      quantity: 10,
      description: "A single book",
      imageUrl: "single.jpg",
    }).then((response) => {
      const bookId = response.body._id;
      cy.request("GET", `/books/book/${bookId}`).then((singleBookResponse) => {
        expect(singleBookResponse.status).to.eq(200);
        const book = singleBookResponse.body;
        expect(book.title).to.eq("Single Book");
        expect(book.author).to.eq("Author");
        expect(book.category).to.eq("Non-Fiction");
        expect(book.publicationYear).to.eq(2021);
        expect(book.price).to.eq(15);
        expect(book.quantity).to.eq(10);
      });
    });
  });

  it("should delete a book - marks 1", () => {
    cy.request("POST", "/books/addbooks", {
      title: "Delete Me",
      author: "Author",
      category: "Fiction",
      publicationYear: 2023,
      price: 25,
      quantity: 5,
      description: "To be deleted",
      imageUrl: "delete.jpg",
    }).then((response) => {
      const bookId = response.body._id;
      // console.log(bookId);
      // cy.wait(4000);
      cy.request("DELETE", `/books/delete/${bookId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);

        // Combine assertions into one using should
       
    });

  });

})

  it("should add a new book - marks 1", () => {
    const newBook = {
      title: "Sample Book",
      author: "John Doe",
      category: "Fiction",
      publicationYear: 2023,
      price: 20,
      quantity: 10,
      description: "A great book",
      imageUrl: "sample.jpg",
    };

    cy.request("POST", "/books/addbooks", newBook)
      .then((response) => {
        expect(response.status).to.eq(200);
        const book = response.body;
        expect(book.title).to.eq("Sample Book");
        expect(book.author).to.eq("John Doe");
        expect(book.price).to.eq(20);

        // Store the book ID for cleanup
        bookIds.push(book._id);
      });
  });

  it("should update a book - marks 1", () => {
    cy.request("POST", "/books/addbooks", {
      title: "Update Me",
      author: "Author",
      category: "Fiction",
      publicationYear: 2022,
      price: 30,
      quantity: 8,
      description: "To be updated",
      imageUrl: "update.jpg",
    }).then((response) => {
      const bookId = response.body._id;
      cy.request("PATCH", `/books/update/${bookId}`, {
        title: "Updated Book",
        price: 25,
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);

        cy.request(`/books/book/${bookId}`).then((getBookResponse) => {
          const updatedBook = getBookResponse.body;
          expect(updatedBook.title).to.eq("Updated Book");
          expect(updatedBook.price).to.eq(25);
        });
      });
    });
  });

  it("should handle middleware for missing data - marks 1", () => {
    cy.request({
      method: "POST",
      url: "/books/addbooks",
      failOnStatusCode: false,
      body: {
        // Missing required fields here, adjust as needed
      
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
      // expect(response.body).to.equal({"message":"All fields are required"});
    });

  });

  it("should filter books by author name - marks 1", () => {
    cy.request("POST", "/books/addbooks", {
      title: "Author Book 1",
      author: "Author1",
      category: "Fiction",
      publicationYear: 2022,
      price: 15,
      quantity: 5,
      description: "Book by Author1",
      imageUrl: "author1.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });

    cy.request("POST", "/books/addbooks", {
      title: "Author Book 2",
      author: "Author2",
      category: "Non-Fiction",
      publicationYear: 2021,
      price: 30,
      quantity: 8,
      description: "Book by Author2",
      imageUrl: "author2.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });

    cy.request("POST", "/books/addbooks", {
      title: "Author Book 3",
      author: "Author1",
      category: "Fiction",
      publicationYear: 2023,
      price: 25,
      quantity: 12,
      description: "Book by Author1",
      imageUrl: "author1.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });

    cy.request("GET", "/books/filter?author=Author1", {
   
    }).then((filterResponse) => {
      expect(filterResponse.status).to.eq(200);
      const filteredBooks = filterResponse.body;
      expect(filteredBooks).to.be.an("array").with.lengthOf.at.least(1);
      console.log(filteredBooks);
      filteredBooks.forEach((book) => {
        expect(book.author).to.eq("Author1");
      });
    });
  });





  it("should filter books by category - marks 1", () => {
    cy.request("POST", "/books/addbooks", {
      title: "Category Book 1",
      author: "Author1",
      category: "Fiction",
      publicationYear: 2022,
      price: 15,
      quantity: 5,
      description: "Fiction Book",
      imageUrl: "fiction.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });

    cy.request("POST", "/books/addbooks", {
      title: "Category Book 2",
      author: "Author2",
      category: "Non-Fiction",
      publicationYear: 2021,
      price: 30,
      quantity: 8,
      description: "Non-Fiction Book",
      imageUrl: "nonfiction.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });

    cy.request("POST", "/books/addbooks", {
      title: "Category Book 3",
      author: "Author3",
      category: "Fiction",
      publicationYear: 2023,
      price: 25,
      quantity: 12,
      description: "Fiction Book",
      imageUrl: "fiction.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });

    cy.request("GET", "/books/filter?category=Fiction", {
      
    }).then((filterResponse) => {
      expect(filterResponse.status).to.eq(200);
      const filteredBooks = filterResponse.body;
      expect(filteredBooks).to.be.an("array").with.lengthOf.at.least(1);
      filteredBooks.forEach((book) => {
        expect(book.category).to.eq("Fiction");
      });
    });
  });

  it("should filter books by sorting criterion - marks 1", () => {
    cy.request("POST", "/books/addbooks", {
      title: "Price Book 1",
      author: "Author1",
      category: "Fiction",
      publicationYear: 2022,
      price: 15,
      quantity: 5,
      description: "Lowest Price Book",
      imageUrl: "lowprice.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });

    cy.request("POST", "/books/addbooks", {
      title: "Price Book 2",
      author: "Author2",
      category: "Non-Fiction",
      publicationYear: 2021,
      price: 30,
      quantity: 8,
      description: "Highest Price Book",
      imageUrl: "highprice.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });

    cy.request("POST", "/books/addbooks", {
      title: "Price Book 3",
      author: "Author3",
      category: "Fiction",
      publicationYear: 2023,
      price: 25,
      quantity: 12,
      description: "Medium Price Book",
      imageUrl: "mediumprice.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });

    cy.request("GET", "/books/filter?sort=lth", {}).then((filterResponse) => {
      // Check if the response status is 200
      expect(filterResponse.status).to.eq(200);
    
      // Extract the sorted books from the response
      const sortedBooks = filterResponse.body;
    
      // Ensure that sortedBooks is an array with at least one element
      expect(sortedBooks).to.be.an("array").with.lengthOf.at.least(1);
    
      let previousPrice = -1;
    
      // Loop through each book in the sorted list
      sortedBooks.forEach((book) => {
        // Check if the current book's price is greater than or equal to the previous price
        expect(book.price).to.be.at.least(previousPrice);
    
        // Update the previousPrice to the current book's price for the next iteration
        previousPrice = book.price;
      });
    });
    
  })

  it("should combine filters for querying books - marks 1 ", () => {
    cy.request("POST", "/books/addbooks", {
      title: "Combined Book 1",
      author: "Author1",
      category: "Fiction",
      publicationYear: 2022,
      price: 15,
      quantity: 5,
      description: "Combined Book",
      imageUrl: "combined.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });
  
    cy.request("POST", "/books/addbooks", {
      title: "Combined Book 2",
      author: "Author2",
      category: "Non-Fiction",
      publicationYear: 2021,
      price: 30,
      quantity: 8,
      description: "Combined Book",
      imageUrl: "combined.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });
  
    cy.request("POST", "/books/addbooks", {
      title: "Combined Book 3",
      author: "Author1",
      category: "Fiction",
      publicationYear: 2023,
      price: 25,
      quantity: 12,
      description: "Combined Book",
      imageUrl: "combined.jpg",
    }).then((response) => {
      bookIds.push(response.body._id);
    });
  
    // Use query parameters directly in the URL
    cy.request("/books/filter?author=Author1&category=Fiction&price=lth")
  .then((filterResponse) => {
    expect(filterResponse.status).to.eq(200); // Check if the response status is 200
    const sortedBooks = filterResponse.body;
    expect(sortedBooks).to.have.length.of.at.least(1); // Ensure there is at least one book

    let previousPrice = -1;

    sortedBooks.forEach((book) => {
      expect(book.price).to.be.at.least(previousPrice); // Check if the current price is greater than or equal to the previous
      expect(book.author).to.eq("Author1"); // Check if the author is "Author1"
      expect(book.category).to.eq("Fiction"); // Check if the category is "Fiction"
      previousPrice = book.price;
    });
  });

  });
  
  Cypress.on("test:after:run", (test, runnable) => {
    if (test.state === "passed") {
      // If the test passed, add its marks
      const marks = parseInt(runnable.title.match(/marks (\d+)/)[1]);
      totalMarks += marks;
    } else if (test.state === "failed") {
      // If the test failed, add 0 marks
      totalMarks += 0;
    }
  });



  it("page should load marks 0", () => {
    cy.request("/").then((response) => {
      expect(response.status).to.eq(200);
    });
  })

  after(() => {
    
    cy.log(`Total Marks: ${totalMarks}`);
  });

  // Clean up by deleting all the test books from the database
   after(()=> {
      bookIds.forEach((bookId) => {
        cy.request("DELETE", `/books/delete/${bookId}`)
          .then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(200);
          });
      });
  });




  
});
