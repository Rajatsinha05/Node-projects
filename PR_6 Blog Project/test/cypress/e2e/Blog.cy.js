describe("Blog App ", () => {
  let idCookie;
  let roleCookie;
  let blogId;
  let totalMarks = 0;
  it("should allow a user to register - marks 0.5", () => {
    // Visiting the registration page
    cy.visit("http://localhost:8090/user/signup");

    // Fill in the registration form with valid data
    cy.get("#username").type("Tester");
    cy.get("#email").type("TestinUser@gmail.com");
    cy.get("#password").type("Testing");
    cy.get("#role").select("user");

    // Submit the form
    cy.get("#form").submit();

    // Assertions after registration
    cy.contains("Account created successfully Tester").should("be.visible");
    cy.getCookie("id").should("exist");
    cy.getCookie("role").should("exist");
    cy.getCookie("id").then((cookie) => {
      idCookie = cookie.value;
    });
    cy.getCookie("role").then((cookie) => {
      roleCookie = cookie.value;
    });
  });

  it("should handle invalid credentials - marks 0.5", () => {
    // Visiting the login page
    cy.visit("http://localhost:8090/user/login");

    // Fill in the login form with invalid credentials
    cy.get("#email").type("invaliduser@example.com");
    cy.get("#password").type("invalidpassword");
    cy.get("#form").submit();

    // Assertion for handling invalid credentials
    cy.contains("Invalid Credentials.").should("be.visible");
  });

  it("should allow a user to log in with valid credentials - marks 1", () => {
    // Visiting the login page
    cy.visit("http://localhost:8090/user/login");

    // Fill in the login form with valid credentials
    cy.get("#email").type("TestinUser@gmail.com");
    cy.get("#password").type("Testing");

    // Submit the form
    cy.get("#form").submit();

    // Assertions after login
    cy.contains("Welcome User Tester").should("be.visible");
    cy.getCookie("id").should("exist");
    cy.getCookie("role").should("exist");
    cy.getCookie("id").then((cookie) => {
      idCookie = cookie.value;
    });
    cy.getCookie("role").then((cookie) => {
      roleCookie = cookie.value;
    });
  });

  // blog

  it("should not  allow the user to create a new blog post - marks 1", () => {
    cy.setCookie("role", roleCookie);
    cy.setCookie("id", idCookie);

    cy.visit(`http://localhost:8090/blog/create`);
    cy.contains("You are not authorized to access this page.").should(
      "be.visible"
    );
  });

  it("should allow the admin to create a new blog post - marks 1", () => {
    cy.visit("http://localhost:8090/user/signup");

    // Fill in the registration form with valid data
    cy.get("#username").type("Tester");
    cy.get("#email").type("Testingadmin@gmail.com");
    cy.get("#password").type("Testing");
    cy.get("#role").select("admin");

    // Submit the form
    cy.get("#form").submit();

    // Assertions after registration
    cy.contains("Account created successfully Tester").should("be.visible");
    cy.getCookie("id").should("exist");
    cy.getCookie("role").should("exist");
    cy.getCookie("id").then((cookie) => {
      idCookie = cookie.value;
    });
    cy.getCookie("role").then((cookie) => {
      roleCookie = cookie.value;
    });

    cy.visit(`http://localhost:8090/blog/create`);
    cy.get(`#title`).type("Testing Blog");
    cy.get(`#content`).type(`testing blog for checking its working or not`);
    cy.get("#category").type("technology");
    cy.get(`#image`).type(
      "https://www.ascian.in/creatives/wp-content/uploads/blog.jpg"
    );
    cy.get(`#blogForm`).submit();

    cy.getCookie("blogId").should("exist");
    cy.getCookie("blogId").then((cookie) => {
      blogId = cookie.value;
    });
  });

  it("should successfully retrieve and validate blogs data - marks 0.5", () => {
    cy.request("GET", "http://localhost:8090/blog/blogs").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  it("should update blog by admin only - marks 0.5", () => {
    cy.setCookie("role", roleCookie);
    cy.setCookie("id", idCookie);

    // Delete the user by ID (assuming you have a separate test for registration)
    cy.request("PATCH", `http://localhost:8090/blog/edit/${blogId}`, {
      title: "updated blog title by the tester",
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("should fetch and render blogs - marks 1", () => {
    cy.setCookie("role", "user");
    cy.setCookie("id", idCookie);
    // Visit the blog page
    cy.visit("http://localhost:8090/blog/");

    // Ensure the parent box exists
    cy.get("#parent-box")
      .children() // Select all child elements
      .should("have.length.gte", 0) // Check if there are child elements
      .each(($child) => {
        // Iterate through each child element
        cy.wrap($child).find(".img").should("exist"); // Verify .img class exists
        cy.wrap($child).find(".title").should("exist"); // Verify .title class exists
      });
  });

  it("should navigate to the single blog page - marks 1", () => {
    cy.setCookie("role", roleCookie);
    cy.setCookie("id", idCookie);
    // Visit the page that lists all blogs
    cy.visit("http://localhost:8090/blog/");

    // Find the last blog entry and click on it
    // Select the last blog entry
    cy.get("#parent-box").find(".list").last().click();

    // Check if the URL has changed to the single blog page
    // cy.url().should("include", "/blog/singleBlog/");

    // Ensure the blog container exists
    cy.get("#blog").should("exist");

    // Verify the existence of elements on the single blog page
    cy.get("#img").should("exist");
    cy.get("#title").should("exist");
    cy.get("#category").should("exist");
    cy.get("#content").should("exist");
    cy.get("#like").should("exist");
    cy.get("#count").should("exist");
    cy.get("#comment").should("exist");

    // Check data on the single blog page
    cy.get("#img")
      .should("have.attr", "src")
      .and(
        "include",
        "https://www.ascian.in/creatives/wp-content/uploads/blog.jpg"
      );
    cy.get("#title").should("have.text", "updated blog title by the tester");
    cy.get("#category").should("have.text", "technology");
    cy.get("#content").should(
      "have.text",
      "testing blog for checking its working or not"
    );
  });

  it("should add a like to a blog - marks 0.5", () => {
    cy.setCookie("role", roleCookie);
    cy.setCookie("id", idCookie);
    cy.request("PATCH", `http://localhost:8090/blog/like/${blogId}`, {}).then(
      (response) => {
        expect(response.status).to.equal(200);

        expect(
          response.body.likedBy[response.body.likedBy.length - 1]
        ).to.have.property("username", "Tester");
      }
    );
  });

  it("should add comment to a blog - marks 0.5", () => {
    cy.setCookie("role", roleCookie);
    cy.setCookie("id", idCookie);
    cy.request("PATCH", `http://localhost:8090/blog/comment/${blogId}`, {
      text: "testing comment",
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(
        response.body.comments[response.body.comments.length - 1]
      ).to.have.property("text", "testing comment");
    });
  });

  it("should filter blog by category - marks 0.5 ", () => {
    const queryParams = {
      category: "technology",
    };

    // Send a GET request to filter movies
    cy.request("GET", "http://localhost:8090/blog/blogs", queryParams).then(
      (response) => {
        expect(response.status).to.equal(200);

        // Add assertions to check the filtered movies
        // For example, assuming the response is an array of movies:
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.length.greaterThan(0);

        // Check if each movie in the response matches the filter criteria
      }
    );
  });

  it("should search  blog by category author ,title and spelling error - marks 1", () => {
    const queryParams = {
      blogs: "test",
    };

    // Send a GET request to filter movies
    cy.request("GET", "http://localhost:8090/blog/search?blogs=teste").then(
      (response) => {
        expect(response.status).to.equal(200);

        // Add assertions to check the filtered movies
        // For example, assuming the response is an array of movies:
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.length.greaterThan(0);

        // Check if each movie in the response matches the filter criteria
      }
    );
  });

  it("should delete blog by admin only - marks 0.5", () => {
    cy.setCookie("role", roleCookie);
    cy.setCookie("id", idCookie);

    // Delete the user by ID (assuming you have a separate test for registration)
    cy.request("DELETE", `http://localhost:8090/blog/delete/${blogId}`).then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );
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

      let title = test.title;
      const marks = parseInt(runnable.title.match(/marks (\d+)/)[1]);

      if (
        title == "should allow a user to register - marks 0.5" ||
        title == "should handle invalid credentials - marks 0.5" ||
        title == "should delete blog by admin only - marks 0.5" ||
        title == "should filter blog by category - marks 0.5 " ||
        title == "should add a like to a blog - marks 0.5" ||
        title == "should add comment to a blog - marks 0.5" ||
        title == "should update blog by admin only - marks 0.5" ||
        title =="should successfully retrieve and validate blogs data - marks 0.5"
      ) {
        console.log(title);
        totalMarks += 0.5;
      } else {
        totalMarks += marks;
      }
    } else if (test.state === "failed") {
      // If the test failed, add 0 marks
      totalMarks += 0;
    }
  });

  after(() => {
    cy.log(`Total Marks: ${totalMarks}`);
  });
});
