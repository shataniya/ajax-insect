const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const cheerio = require("cheerio")

/*
 * @objject ajax
 * @discription Send Ajax request
 * 
 */
const ajax = (function(){
    var xhr = new XMLHttpRequest()
    return {
        get:function(url){
            return new Promise((resolve,reject)=>{
                xhr.open("GET",url,true)
                xhr.send(null)
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        try{
                            resolve(JSON.parse(xhr.responseText))
                        }catch(err){
                            resolve(xhr.responseText)
                        }
                    }
                }
            })
        },
        post:function(url,data){
            return new Promise((resolve,reject)=>{
                xhr.open("POST",url,true)
                xhr.send(toString(data))
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        try{
                            resolve(JSON.parse(xhr.responseText))
                        }catch(err){
                            resolve(xhr.responseText)
                        }
                    }
                }
            })
        },
        insect:function(url){
            return new Promise((resolve,reject)=>{
                this.get(url).then(data=>{
                    var $ = cheerio.load(data)
                    try{
                        resolve($)
                    }catch(err){
                        reject(err)
                    }
                })
            })
        }
    }
})();

function toString(obj){
    if(Object.prototype.toString.call(obj) === "[object Object]"){
        var s = ""
        for(let o in obj){
            s += o + "=" + obj[o] + "&"
        }
        return s.replace(/&$/g,"")
    }else if(typeof obj === "string"){
        return obj
    }else{
        throw new Error(obj+" is not a object or string!")
    }
}

module.exports = ajax