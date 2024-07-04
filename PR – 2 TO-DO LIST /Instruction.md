# TODO API

   <!-- Problem Statement  -->

# Follow the Instruction strictly
 ## total marks 10
  ### always handle error and edge case
# Run your server At Port 8090
 ## make a folder give name todo and write all code on that folder
## you have to make a array  add some Intialtodos  with status isCompleted with true or false also provide id and add minimum 3 todos as you can sher below
  ### make like this :-
 let initialTodo = [{title:HTML,isCompleted:true,id:1},{title:javascript,isCompleted:true,id:2},{title:React,isCompleted:false,id:3}]

# make a get route / send response welcome to the todo api

## 1 make get route give name /todos
   ### all Todo should be send when we hit the end point 
  ### 1 marks
 
## 2 Make a post route with name /addtodo 
  ### we should be able to add todos into the array when we hit the post route 
   ### post  data should be in this form {title :learning node js, isCompleted: false }
   ### when we are adding data into the array you have to add id also send added todo 
   ### 2 marks

## 3 make a patch route give name /update/:id
   ### send any data should be updated
   ### res send updated data 
   ### 2 marks

## 4 make Delete route give name /delete/:id
   ### delete todo and two thing firstly store in deletedTodo then send in object form res.send({deletedTodo:deletedTodo,todos:todos})
   ## Hint ;- let deletedTodo=todos.splice(index,1)[0] 
   ### 2 marks

## 5 make a get route  for sending single todo  with name /todo/:id
  ## send that todo if match in object if  not match id send error 
   ### 1 marks

 ## 6 handle filters , make a get router with query give name like /findbystatus
   ### it should accept Query Parameters with name isCompleted=true/false
   ### if isCompleted = true then send all todos with true status or get false then send all false Todos
   ### 2 marks     


<!-- Get your score -->

```js
## Testing your score
1. Navigate to the 'test' directory using `cd test`.
2. Run 'npm i' to install dependencies. if you encounter any errors during installation, you can use the following command: `./node_modules/.bin/cypress install`.
3. Run tests using either `npx cypress open` or `npx cypress run`.

# Best of Luck!

```

   

<!-- Video Link  you can watch -->
### https://drive.google.com/file/d/1yPfJKlSKMjHvOfdLR9X4JKh7qnI7Xfk7/view?usp=sharing