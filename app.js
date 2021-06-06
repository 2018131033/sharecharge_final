const express = require("express");
const app = express();

const mainRouter = require('./router/index')
const addCoinRouter = require('./router/add_coin')
const loginRouter = require('./router/login')
const signupRouter = require('./router/joinus')
const closeChargerRouter = require('./router/find_charger')
const searchChargerRouter = require('./router/inMap')
const getUserChargerRouter = require('./router/user_charger')
const paymentValidCheckRouter = require('./router/paymentValidCheck');
const checkForOwnerRouter = require('./router/checkForOwner');
const checkForRequestorRouter = require('./router/checkForRequestor');
const applyPaymentRouter = require('./router/applyPayment');

app.use('/', mainRouter);
app.use('/login',loginRouter);// /login?email=kb064315@gmail.com&token=2
app.use("/signup/:name/:email/:telephone_num/:sns_token",signupRouter); // /signup/Josejusn/b064315@gmail.com/010200797/5
app.use('/purchase_coin/:email/:amount', addCoinRouter); // /purchase_coin/kb064315@gmail.com/3000
app.use('/current/:current_lat/:current_lng',closeChargerRouter); // /current/37.49566/126.99420
app.use('/search/:max_x/:max_y/:min_x/:min_y',searchChargerRouter);// /search/127.00044/37.49938/125.98342/36.49141
app.use('/mypage/:email',getUserChargerRouter)// /mypage/kb064315@gmail.com
app.use('/paymentValidCheck/:email/:charger_key/:starting_time/:ending_time',paymentValidCheckRouter); // /paymentValidCheck/mrseungone@gmail.com/14/15/17
app.use('/checkForOwner/:charger_key',checkForOwnerRouter); //
app.use('/checkForRequestor/:email/:charger_key',checkForRequestorRouter); //
app.use('/applyPayment/:email/:charger_key/:starting_time/:ending_time',applyPaymentRouter); //

//app.use(express.static('public'));




app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});




var sequelize = require('./models').sequelize;
sequelize.sync();

// 사용자가 결제 버튼을 눌렀을 때
/*app.post("/Payment",function(req, res){
    let userKey = req.body.user_key;
    let chargerKey = req.body.chargerKey;

    let reservation_startingTime = req.body.reservation_startingTime;
    let reservation_endingTime = req.body.reservation_endingTime;
    let reservation_length = reservation_endingTime - reservation_startingTime;
    
    let curUserCoin = await 
    let CostperHour = 
    let totalCost;

    if(curUserCoin>=totalCost){
        for(i=reservation_startingTime;i<reservation_endingTime;i++){
            if()
        }
    }
});*/
/*
fs.readFile('example.txt','utf8',function(err, data){
    if(err){
        handleError(err);
    }
    else{
        processData(data);
    }
});

fs.writeFile('example.txt','Sample Text',(err)=>{
    if(err){
        handleError(err);
    }
    else{
        console.log('File written!');
    }
});
*/


/*
let data = fs.readFile('example.txt','utf8');

data.then(processData).then(()=>{
    console.log('Done file reading');
}).catch(handleError);

let products = await fs.readFile('products.json','utf8');
let data2 = JSON.parse(products);
data2['type']='TV';
await fs.writeFile('products.json',JSON.stringify(data2));
*/



const PORT = 3306;
app.listen(PORT);