## Inspiration

In every modern application, data is being collected. But maintaining that data securely is of utmost importance. All the data breaches and bad password practices in place makes this issue even more critical. 
If the attacker gains access to the victim’s account then the attacker can easily do identity theft. Depending on the information stored in the account, attackers can misuse the information. For instance, they can get a user's social security number, credit card information and what not?
Inspired by the real life scenarios of account hacks of our friends, we propose the use of Zero Knowledge proof authentication protocol.
The ultimate motive of using Zero Knowledge Proof in authentication systems is to ensure the safety of user’s data.

The idea is proposed to act as an remedy for following issues in conventional and mundane login systems:
First, the data is transferred over “insecure wireless networks” which in turn introduces loopholes in both the user’s end as well as company’s end. Common attacks based on this are: password sniffing, brute force attack and MITM (Man in the middle attack).

Second, the way of storing passwords is also a point of concern. Common ways to store the password is to store the hash value. Although storing hash value rather than the actual value of password decreases the chances of password hacking, storing them as SHA-256 or MD-5 hashes will do no good. Because of the availability of softwares to crack these hashes easily.

Furthermore, the trust issue between the user and the owner of the website or system prevails. Although the owners are bound by some compliance rules to protect their user’s privacy there’s always a slight chance that either the employees or any official of the organization can access the user’s password and misuse it.


So, clearly both the transmission or exchange of any data like password or storing the password comes with the cost of our security. 

This motivates us to propose the solution.


## What it does

This system works such that no passwords are exchanged over the internet, hence eliminating the password stealing/hacking scenario.

Additionally, the password is not stored anywhere. 

The verifier and the user interact by requesting and sending proofs in accordance with zero knowledge proof protocol.


## How we built it

The tech stack used to build this system includes:

Backend- Node Js + Express
Database: Postgres on cloud sql
Hosting: 
    Front-end: Firebase hosting
    Backend: App engine

Variables used in the below explanation:

g → An integer

p → Prime number

y → Integer 

x → password 

r → random value

C → calculated using formula: g^r mod p

w → calculated using x + r mod(p-1)
 
The verification process works as follows:
User registers by entering the username and password.
Meanwhile, in the backend the values of username, g and n are stored. Since no duplicate entries are allowed, if the user doesn’t select a unique username then he will be prompted with an error. Otherwise the user will be prompted with “Registration successful” message
After passing the check for a unique username, an entry is made in the database with the values of y (calculated at front-end) and the username.
When the user requests to log in, the values of ‘g’ and ‘n’ corresponding to the username entered by the user is fetched from the database.
After that depending on the value requested by the server (either the value of ‘w’ or ‘r’), the verification is done by calculating (in the backend)

g^r mod p (when value of ‘r’ was requested)

Checking, if  C.y mod p = g^w mod p(if the value of ‘w’ was requested). This check is further done as follows:
LHS: 
C.y mod p:

=g^x. g^r mod p 

= g^(x+r) mod p→ eq-1

Now, using fermat’s little theorem we can write equation 1 as:

= g^(x+r)mod(p-1) mod p→ eq-2

Since, we know that 

w = x + r mod(p-1)

The equation 2 can be written as :

= g^w mod p → eq-3 

Therefore, LHS = RHS 

On meeting this condition the verification is successful. 

If the user passes the above checks then the user is prompted with the message : “Verification successful” otherwise the user will be prompted with an error message.


## Challenges we ran into

Figuring out mathematical expressions and their actual implementation.
Integrating front-end and backend posed a real challenge, with all the values for verification to maintain.
We used some of the services for the first time like: app engine and cloud sql. Which made it challenging for us to work out and connect cloud sql and app engine (i,e private ip and public ip).
Error handling. 
Touch to explain mathematics behind this in 3 mins


## Accomplishments that we're proud of

🎉 We are proud to have implemented this in the given amount of time 🎉.
We are proud that our project is very different.
We are proud that we were able to implement something which helps people prevent their privacy and security.
We are proud that we built something in the core Computer Science topic.
This method is also much more secure than existing methods used for password authentication. 

## What we learned
We learnt the zero knowledge proof concept
Existing Password authentication methods and Attacks possible on them
How to deploy on app engine and connect cloudSQL to app engine
Time management and collaboration



## What's next for Secrettops

Adding a time limit to the authentication system.

Providing this as SaaS or module, so that other people can just import and use this


