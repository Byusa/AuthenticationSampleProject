# AuthenticationSampleProject
## Adding Authentication To ReactApps
1. Module Content 
    1. How Authentication works. In React Apps
    2. Implementing user Authentication 
    3. Adding Auth Persistence & Auto-Logout
2. What, how and why? 
        1. What is authentication?
            1. Authentication is needed if content should be protected (not accessible by everyone) 
        2. How does it work?
            1. Two-step Process:
                1. Get access / permission
                2. Send request to protected resource
            2. Getting permission
                1. Client —request(with user credentials)—>Server
                2. Server grants or denied
                3. Server-side sessions or Authentication Tokens
                    1. Server-side sessions 
                        1. (Store unique identifier on server, send some identifier to client),
                        2. (client sends identifier along with requests to protected resources. NB: 
                    2. Authentication Tokens 
                        1. Create (but not store) “permission” token on server, send token to client
                        2. Client sends token along with requests to protected resources NB: (token only known by the server) for single page application  for decoupled frontend and backend
3. Starting Setup & First Steps
4. Adding User Signup
    1. Firebase
        1. Create Project
        2. Build -> Authentication -> Get Started
        3. Choose a signIn method -> enable it
5. 
