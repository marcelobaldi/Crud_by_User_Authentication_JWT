//Imports
import { App } from "./app";                          

//Project
var appClass = new App();                           
var app      = appClass.expressAPP;                  

//Server
app.listen(3000, () => {                                
    console.log("Server OnLine: Port 3000");         
});

