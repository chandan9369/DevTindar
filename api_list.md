# Dev Tinder API

**authRouter**

-  POST /signup
-  POST / login
-  POST /logout

**profileRouter**

-  GET /profile/view
-  PATCH /profile/edit
-  PATCH /profile/password

**connectionRequestRouter**

-  POST /request/send/:status/:userId
<!-- -  POST /request/send/interested/:userId
-  POST /request/send/ignore/:userId -->

-  POST /request/review/:status/:requestId
<!-- -  POST /request/review/accepted/:requestId
-  POST /request/review/rejected/:requestId -->

**userRouter**

-  GET /user/connections
-  GET /user/request/received
-  GET /user/feed - get you the profiles of other users on plateform

**Status:** ignore, interested, accepted, rejected
