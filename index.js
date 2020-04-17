const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/",  { useUnifiedTopology: true });

let driver = new webdriver.Builder().forBrowser('firefox').build();
driver.get("https://www.facebook.com/zuck");

var mark = {
    "education": "/html/body/div[1]/div[3]/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div[1]/div/div[2]/ul/li[1]/div/div/div/div/div[2]/div[1]/a",
    "job2": "/html/body/div[1]/div[3]/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div[1]/div/div[1]/ul/li[2]/div/div/div/div/div[2]/div[1]/a",
    "job1": "/html/body/div[1]/div[3]/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/div/div[1]/div[1]/div[2]/div/div/div[1]/div/div[1]/ul/li[1]/div/div/div/div/div[2]/div[1]/a",
    "name": "/html/body/div[1]/div[3]/div[1]/div/div[2]/div[2]/div[1]/div/div[1]/div[1]/div[3]/div/div[1]/div/div/h1/span[1]/a"
}

mongoClient.connect(function(err, client){
    var markUser = {};
    for (let key of Object.keys(mark)) {
        driver.findElement(By.xpath(mark[key])).getText().then(function(txt){
            markUser[key] = txt;
            console.log(key, txt);
        });
    }
      
    const db = client.db("usersdb");
    const collection = db.collection("users");
    collection.insertOne(markUser, function(err, result){
          
        if(err){ 
            return console.log(err);
        }
        console.log(result.ops);
        client.close();
    });
});

