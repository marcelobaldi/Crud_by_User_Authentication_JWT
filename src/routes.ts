//Imports
import { Router          } from "express";    
import { UserController  } from "./app/controllers/UserController";
import { LoginController } from "./app/controllers/LoginController";
import { authMiddleware  } from "./app/middlewares/authMiddleware";

//Objects
const routes: Router = Router();        

//Routes: Login 
routes.post('/login',                       new LoginController().login  );     //No Authenticate!
routes.post('/logout', authMiddleware,      new LoginController().logout );

//Routes: User
routes.post('/user',                        new UserController().create   );    //No Authenticate!
routes.put('/user/:id',     authMiddleware, new UserController().update   );
routes.delete('/user/:id',  authMiddleware, new UserController().delete   );
routes.get('/user/list',    authMiddleware, new UserController().findAll  );
routes.get('/user/:id',     authMiddleware, new UserController().findById );

//Routes: Export
export { routes }

