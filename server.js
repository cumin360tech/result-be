import mongodb from 'mongodb';
let MongoClient = mongodb.MongoClient;
import express from 'express';
const uri = "mongodb+srv://admin:result2022@results2022oct.ygamb21.mongodb.net/test";
//const uri = "mongodb+srv://gowthami123:gowthami@cluster0.7vwrl4g.mongodb.net/?retryWrites=true&w=majority";
import xlsxFile from 'read-excel-file/node';

const client = new MongoClient(uri, {});

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded());

client.connect(err => {
    if (err) {
        console.log(err)
    }
    console.log("CONNECTED TO DB")
})

const db = client.db('test');
client.close();

app.post('/publishResult', async (req, res) => {
    let result = '';
    const schema = {
        'REGISTER_NO': {
            prop: 'REGISTER_NO',
            type: String
        },
        'STUDEN_ NAME': {
            prop: 'STUDEN_ NAME',
            type: String
        },
        'SCHOOL_NAME': {
            prop: 'SCHOOL_NAME',
            type: String
        },
        'FIRST_LANG_ENGLISH': {
            prop: 'FIRST_LANG_ENGLISH',
            type: String
        },
        'SECOND_LANG_KAN': {
            prop: 'SECOND_LANG_KAN',
            type: String
        },
        'THIRD_LANG_HINDI': {
            prop: 'THIRD_LANG_HINDI',
            type: String
        },
        'THIRD_LANG_URDU': {
            prop: 'THIRD_LANG_URDU',
            type: String
        },
        'SCIENCE': {
            prop: 'SCIENCE',
            type: String
        },
        'MATHEMATICS': {
            prop: 'MATHEMATICS',
            type: String
        },
        'SOCIAL_SCIENCE': {
            prop: 'SOCIAL_SCIENCE',
            type: String
        },
        'TOTAL': {
            prop: 'TOTAL',
            type: String
        },
        'PERCENTAGE': {
            prop: 'PERCENTAGE',
            type: String
        },
        'RESULT': {
            prop: 'RESULT',
            type: String
        }
    };

    xlsxFile('./result.xlsx', { schema }).then((rows) => {
        //const result = await db.collection('food').insertOne({...rows}])
        console.log([...rows.rows])
        result = db.collection('result').insertMany([...rows.rows])
    })
    //const result1 = ''//await db.collection('food').insertMany([{...req.body},{...req.body},{...req.body}])
    res.send({
        'status': 200,
        'message': 'Redult addded successfully',
        'resultWeGot': result
    })
});

app.delete('/result', async (req, res) => {
    const resultCollection = db.collection('result');
    const result = await resultCollection.deleteMany({})
    if (result.acknowledged) {
        res.send({
            'status': 200,
            'message': 'All RESULT item deleted successfully',
            'result': result
        });
    } else {
        res.send({
            'status': 500,
            'message': 'MULTIPLE DELETE OPERATION FAILED',
            'result': result
        });
    }

});

app.get('/result', async (req, res) => {
    const result = await db.collection('result').find({ 'REGISTER_NO': req.query.reg_no}).toArray();
    console.log(result)

    try {
        if(result.length == 1){
            res.send({
                'status': 200,
                'data': result[0]
            })
        }
        if(result.length > 1){
            res.send({
                'status': 500,
                'data': [],
                'message':'Student with duplicated register no exists'
            })
        }
        if(result.length == 0){
            res.send({
                'status': 404,
                'data': [],
                'message':'No result found'
            })
        }
    } catch (e) {
        res.send({
            'status': 500,
            'data': 'failed'
        })
    }
    
});

// CALL A SERVER AND LISTEN
app.listen(PORT, function (err) {
    if (err) console.error(err)
    console.log("Server is running in port", PORT)
});

// Dark Green : 0,45,43
// linear-gradient(90deg, #00968f, #00fff4)

// f8485e
