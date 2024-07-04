


describe('TODO API Test Suite', () => {
   // Initialize the number of passed tests
   let totalMarks = 0; // Initialize the total marks
   let passedTests = 0;
  // Load your application or server URL before each test
  beforeEach(() => {
    cy.visit('http://localhost:8090'); // Adjust the URL accordingly
  });

  it('Should retrieve all todos', () => {
    cy.request('/todos').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf.at.least(3);
    });

    cy.on('test:after:run', (test, runnable) => {
      // Check if the test passed or failed
      if (test.state === 'failed') {
        cy.log('Test Failed');
      } else {
        cy.log('Test Passed');
        totalMarks += 1;
        passedTests++;

        console.log(`by all passed total ${totalMarks }, test case ${passedTests}`);
      }
    });
  });



  it('Should add a new todo', () => {
    const title = 'Learning Node js';
    cy.request('POST', '/addtodo', {
      title,
      isCompleted: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('title', title);
      expect(response.body).to.have.property('isCompleted', false);
      expect(response.body).to.have.property('id');
    });

    cy.on('test:after:run', (test, runnable) => {
      // Check if the test passed or failed
      if (test.state === 'failed') {
        cy.log('Test Failed');
      } else {
        cy.log('Test Passed');
        totalMarks += 2;
        passedTests++;

        console.log(`by adding passed total ${totalMarks}total test case ${passedTests}`);
      }
    });
  });



  it('Should update a todo', () => {
    const updatedTask = 'Updated Task';
    cy.request('/todos').then((response) => {
      const todoId = response.body[0].id; // Assuming there's at least one initial todo
      cy.request('PATCH', `/update/${todoId}`, {
        title: updatedTask,
        isCompleted: true,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('title', updatedTask);
        expect(response.body).to.have.property('isCompleted', true);
      });
    });

    cy.on('test:after:run', (test, runnable) => {
      // Check if the test passed or failed
      if (test.state === 'failed') {
        cy.log('Test Failed');
      } else {
        cy.log('Test Passed');
        totalMarks += 2;
        passedTests++;
        console.log(`by update passed total ${totalMarks}total test case ${passedTests}`);
      }
    });
  });



  it('Should delete a todo', () => {
    cy.request('/todos').then((response) => {
      let data=response
      const todoId = response.body[0].id; // Assuming there's at least one initial todo
      cy.request('DELETE', `/delete/${todoId}`).then((response) => {

       
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('deletedTodo');
        expect(response.body.deletedTodo).to.have.property('id', todoId);
      });
    });

    cy.on('test:after:run', (test, runnable) => {
      // Check if the test passed or failed
      if (test.state === 'failed') {
        cy.log('Test Failed');
      } else {
        cy.log('Test Passed');
        
        totalMarks += 2;
        passedTests++;
        console.log(`by delete passed total ${totalMarks}total test case ${passedTests}`);
      }
    });
  });


  it('Should filter todos by status', () => {
   
    cy.request('/findbystatus?isCompleted=true').then((response) => {
      if (response.body.length > 0) {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.every(todo => todo.isCompleted)).to.be.true;
      }
      cy.on('test:after:run', (test, runnable) => {
        // Check if the test passed or failed
        if (test.state === 'failed') {
          cy.log('Test Failed');
        } else {
          cy.log('Test Passed');
         
          totalMarks += 1;
          passedTests++;
          console.log(`by status passed total ${totalMarks} total test case ${passedTests} `);
        }
      });
    });

    cy.request('/findbystatus?isCompleted=false').then((response) => {
      if (response.body.length > 0) {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.every(todo => !todo.isCompleted)).to.be.true;
      }
      cy.on('test:after:run', (test, runnable) => {
        // Check if the test passed or failed
        if (test.state === 'failed') {
          cy.log('Test Failed');
        } else {
          cy.log('Test Passed');
         
          totalMarks += 1;
          passedTests++;
          console.log(`by status passed total ${totalMarks} total test case ${passedTests} `);
        }
      });
    });

   
  });
  
  it('Should retrieve a single todo by ID', () => {
    cy.request('/todos').then((response) => {
      const todoId = response.body[0].id; // Assuming there's at least one initial todo
      cy.request(`/todo/${todoId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', todoId);
      });
    });

    cy.on('test:after:run', (test, runnable) => {
      // Check if the test passed or failed
      if (test.state === 'failed') {
        cy.log('Test Failed');
      } else {
        cy.log('Test Passed');
        
        totalMarks += 1;
        passedTests++;
        console.log(`by id passed total ${totalMarks}total test case ${passedTests}`);
      }
    });
  });


  it('should be load page', ()=>{
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
  })
  })

  

  // after(() => {
  //   console.log(`Total Marks: ${totalMarks}`);
  //   console.log(`Number of Passed Tests: ${passedTests}`);
  // });

  after(() => {
    cy.log(`Total Marks: ${totalMarks}`);
    console.log(`Total Marks: ${totalMarks}`);
    cy.log(`Number of Passed Tests: ${passedTests}`);
    console.log(`Number of Passed Tests: ${passedTests}`);
  });

});
