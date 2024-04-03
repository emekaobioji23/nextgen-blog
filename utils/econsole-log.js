class econsole{
    constructor(filename,classname,methodname){
        this.filename=filename;
        this.classname=classname;
        this.methodname=methodname;
    }
     log(...message){
        if(message[0]==="entry"||message[0]==="exit"){
            const [flag,...rest]=message
            console.error(flag,this.filename+":"+this.classname+":"+this.methodname+":"+rest);
            if(flag==="exit"){
                console.log("\n")
            }
        }else{
            const [...rest]=message
            console.log(rest)
        }        
    }
    
}
module.exports=econsole;