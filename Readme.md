# Create a Fullstack App InstaMasai
## Backend
- Multiple users should be able to register on the app.
- While registering accept the following details.

```
name ==> String
email ==> String
gender ==> String
password ==> String
age ==> Number
city ==> String
```

- If the user is already present, then there should be a response that "User already exist, please login", that means there should be no two users registered with same details.

- These users can create multiple posts.
- Post will have the following details.

```
title ==> String
body ==> String
device ==> String
no_of_comments ==> Number

```


- ==> Where device is the one from which the post has been made, it can be "Laptop", "Tablet", "Mobile"

---

### Only logged in users can do any kind of **CRUD** operations.
### That means a user can see his or her posts only.

A user can update or delete his/her posts only.

A user can only create a post if he/she has logged in.

- Following Routes should be there.

/users/register ==> To register a new user.

```
 http://localhost:3000/users/register

 {

    "name":"user1",
  "email": "user1@gmail.com",
  "gender":"Female",
     "password": "user1",
     "age":25,
     "city":"akola"
}

{

    "name":"user22",
  "email": "user22@gmail.com",
  "gender":"Male",
     "password": "user22",
     "age":22,
     "city":"akola"
}
{"msg":"The new user has been registered","registeredUser":{"name":"user22","email":"user22@gmail.com","gender":"Male","password":"$2b$05$eFsytPQLs4euQVc2AptBO.p0Xzy5AW3fYr5uJp5jWZOHohlRsXyZq","age":22,"city":"akola","_id":"65a501992cfb79cd3bdc7d9a"}}

```
/users/login ==> For logging in generating a token, token should have an expiry of 7 days.
```
http://localhost:3000/users/login

{
  "email": "user1@gmail.com",
   "password": "user1"
}

```

/logout ==> For Logging out the user by blacklisting the token, add blacklisted token in the Database, schema design can be done in your own way for this.
```
http://localhost:3000/users/logout


```

/posts/add ==> To create a post, only if the user has logged in

```
http://localhost:3000/posts/add

{ "title":"Java" ,
  "body": "Learning JAVA",
  "device":"Tablet",
  "no_of_comments":10 
}


{
    "msg": "A new post has been Created",
    "post": {
        "title": "Java",
        "body": "Learning JAVA",
        "device": "Tablet",
        "no_of_comments": 10,
        "userID": "65a502032cfb79cd3bdc7d9e",
        "_id": "65a5063c04f33e9b16965675"
    }
}

```
/posts ==> This will show the posts of logged in users.

   - There should be a filter as well that can show the posts of single users (you can achieve this by handling queries)
   - Can also filter out the posts based on min and max comments passed as queries, should show posts with comments in between min and max comments
   - Only 3 posts should be visible per page (Apply Pagination)

   ```
   http://localhost:3000/posts/

   [
    {
        "_id": "65a5061a04f33e9b16965673",
        "title": "JavaScript",
        "body": "Learning JS",
        "device": "Laptop",
        "no_of_comments": 10,
        "userID": "65a502032cfb79cd3bdc7d9e"
    },
    {
        "_id": "65a5063c04f33e9b16965675",
        "title": "Java",
        "body": "Learning JAVA",
        "device": "Tablet",
        "no_of_comments": 10,
        "userID": "65a502032cfb79cd3bdc7d9e"
    },
    {
        "_id": "65a5069904f33e9b16965677",
        "title": "UI",
        "body": "Learning UI",
        "device": "Mobile",
        "no_of_comments": 30,
        "userID": "65a502032cfb79cd3bdc7d9e"
    }
]
   
   ```

/posts/top ==> This will show the post details that has maximum number of comments for the user who has logged in.

   - Only 3 posts should be visible per page (Apply Pagination)
/posts/update ==> The logged in user can update his/her posts.
/posts/delete ==> The logged in user can delete his/her posts.

```
http://localhost:3000/posts/top

[
    {
        "_id": "65a506e704f33e9b1696567b",
        "title": "VS code",
        "body": "VS for laptop",
        "device": "Laptop",
        "no_of_comments": 70,
        "userID": "65a502032cfb79cd3bdc7d9e"
    },
    {
        "_id": "65a5072604f33e9b1696567d",
        "title": "Learn Tech",
        "body": "Each and Everything from here",
        "device": "Tablet",
        "no_of_comments": 50,
        "userID": "65a502032cfb79cd3bdc7d9e"
    },
    {
        "_id": "65a506b904f33e9b16965679",
        "title": "Wordpress",
        "body": "wordpress is also good",
        "device": "Mobile",
        "no_of_comments": 30,
        "userID": "65a502032cfb79cd3bdc7d9e"
    }
]
```

Following functionalities should also be there.
1. If the device name is passed as query, then it should show only those posts from which device that post has been made.

2. For Example, device=Mobile ==> will give mobile posts only for the user who has logged in.

3. device1=Mobile & device2=Tablet ==> will give the posts made by mobile and tablet for the user who has logged in.

## Mongo Atlas should be used.

Relationship between posts and user should be managed, do it in a way that this relationship is dynamically created.

## Middleware
Authentication middleware should be there to authenticate the user, for all the restricted routes.

All the good practices while coding should be followed

Hashing the password.
JWT.
MVC.
.env for keeping crucial stuff.
Send Status codes as well.
Also all the responses should be in JSON form.
Commit after every 10 - 15 minutes.

