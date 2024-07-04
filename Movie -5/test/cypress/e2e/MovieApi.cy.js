describe("Movie", () => {

let totalMarks=0
  let userid;

  it("should register a new user - marks 0.5", () => {
    // Register a new user
    cy.request("POST", "http://localhost:8090/user/signup", {
      username: "newuser",
      password: "password123",
      email: "newuser@example.com",
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("username", "newuser");
      userid = response.body._id;
    });
  });

  it("should log in a user - marks 1", () => {
    // Log in as the newly registered user
    cy.request("POST", "http://localhost:8090/user/login", {
      username: "newuser",
      password: "password123",
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "Logged in successfully");
    });
  });

  it("should handle invalid login credentials - marks 1", () => {
    // Attempt to log in with invalid credentials
    cy.request({
      method: "POST",
      url: "http://localhost:8090/user/login",
      failOnStatusCode: false,
      body: {
        username: "invaliduser",
        password: "wrongpassword",
      },
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property("error", "Invalid username or password");
    });
  });

  it("should delete a user - marks 1", () => {
    // Delete the user by ID (assuming you have a separate test for registration)
    cy.request("DELETE", `http://localhost:8090/user/delete/${userid}`).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "User deleted successfully");
    });
  });

  let movieId;

  it("should create a new movie - marks 1", () => {
    // Define the movie data to send in the request
    const movieData = {
      title: "Movie Title",
      addedBy: "Admin",
      releaseDate: "2023-10-17",
      category:"my cat"
    };

    // Send a POST request to create a new movie
    cy.request("POST", "http://localhost:8090/movie/create", movieData).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("title", "Movie Title");
      expect(response.body).to.have.property("addedBy", "Admin");
      movieId = response.body._id;
    });
  });

  it("should update a movie - marks 1", () => {
    const updateData = {
      title: "Updated Movie Title",
    };

    // Send a PATCH request to update the movie
    cy.request("PATCH", `http://localhost:8090/movie/update/${movieId}`, updateData).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("title", "Updated Movie Title");
      // Add more assertions as needed
    });
  });

  it("should add a rating to a movie (0 to 10) - marks 1", () => {
    // Define the rating data
    const ratingData = {
      rating: 8,
    };

    // Send a POST request to add a rating to the movie
    cy.request("PATCH", `http://localhost:8090/movie/rating/${movieId}`, ratingData).then((response) => {
      expect(response.status).to.equal(200);
      // Add more assertions as needed
      expect(response.body.ratings[response.body.ratings.length-1]).to.have.property("value",8)
    });
  });

  it("should add a comment to a movie - marks 1", () => {
    // Define the comment data
    const commentData = {
      text: "Great movie!",
    };

    // Send a POST request to add a comment to the movie
    cy.request("PATCH", `http://localhost:8090/movie/comment/${movieId}`, commentData).then((response) => {
      expect(response.status).to.equal(200);
      // Add more assertions as needed
      expect(response.body.comments[response.body.comments.length-1]).to.have.property("text","Great movie!")
    });
  });

  

  it("should filter movies - marks 1", () => {
    // Define query parameters for filtering
    const queryParams = {
      addedBy: "Admin",
    };
  
    // Send a GET request to filter movies
    cy.request("GET", "http://localhost:8090/movie/filter", queryParams).then((response) => {
      expect(response.status).to.equal(200);
  
      // Add assertions to check the filtered movies
      // For example, assuming the response is an array of movies:
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.greaterThan(0);
  
      // Check if each movie in the response matches the filter criteria
    
    });
  });
  it("should delete a movie - marks 0.5", () => {
    // Send a DELETE request to delete the movie by ID
    cy.request("DELETE", `http://localhost:8090/movie/delete/${movieId}`).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "Movie deleted");
      // Add more assertions as needed
    });
  });

  

    it("displays a list of movies - marks 2", () => {
      // Visit the /movies route
      cy.visit("http://localhost:8090/movie/movies");
  
      // Check if the page title is correct
    
  
      // Check if at least one movie is displayed
      cy.get("div").should("exist");
  
      // Check if each movie item has the expected elements (img, p, span, etc.)
      cy.get("div").each((movie) => {
        cy.get(movie)
          .find("img.img")
          .should("exist");
  
        cy.get(movie)
          .find("p.title")
          .should("exist");
  
        cy.get(movie)
          .find("span.author")
          .should("exist");
  
        cy.get(movie)
          .find("span.date")
          .should("exist");
      });
    });

  

  it("should get a welcome message from the movie API - marks 0", () => {
    cy.request("GET", "http://localhost:8090/").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.equal("Welcome to the movie API");
    });

  });
  Cypress.on("test:after:run", (test, runnable) => {
    if (test.state === "passed") {
      // If the test passed, add its marks
      const marks = parseInt(runnable.title.match(/marks (\d+)/)[1]);
      console.log(marks)
      totalMarks += marks;
    } else if (test.state === "failed") {
      // If the test failed, add 0 marks
      totalMarks += 0;
    }
  });

  after(() => {
    
    cy.log(`Total Marks: ${totalMarks}`);
  });
  

});
