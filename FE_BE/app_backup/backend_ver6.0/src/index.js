const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const url = require('url');
const querystring = require('querystring');
const mysql = require('mysql');
const _ = require('lodash');

const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

//const DB_NAME = 'test_db';
const DB_NAME = 'news_data';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 4000);

// for getting all id list and keyword counting data
app.get('/metaData', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;

    // console.log(from);
    // console.log(to);

    const where = `date(DATE) between '${from}' and '${to}' ORDER BY DATE DESC`;
    const query = `SELECT SEQ, KEYWORD1, KEYWORD2, KEYWORD3, KEYWORD4, KEYWORD5 FROM ${DB_NAME} where ${where}`;

    connection.query(query, (err, rows) => {

        if (err) throw err;

        let ids = [];
        let keywordsArray = [];
        let keywords = [];
        let i, j, rowsLength = rows.length;

        for (i = 0; i < rowsLength; i++) {

            const row = rows[i];

            for (j = 1; j < 6; j++) {
                if (!row['KEYWORD' + j]) continue;
                keywordsArray.push(row['KEYWORD' + j])
            }
            ids.push(row.SEQ);
        }

        // console.time('groupBy')
        keywordsArray = _.groupBy(keywordsArray);
        //console.timeEnd('groupBy')

        for (let keyword in keywordsArray) {
            keywords.push({
                text: keyword,
                value: keywordsArray[keyword].length
            });
        }

        res.send({ ids, keywords });
    });
});

// returning id list which searched by keyword
app.get('/articlesByKeyword', (req, res) => {
    const keyword = req.query.keyword;
    const from = req.query.from;
    const to = req.query.to;

    // console.log(keyword);
    // console.log(from);
    // console.log(to);
    const where = `(KEYWORD1 = '${keyword}' OR KEYWORD2 = '${keyword}' OR KEYWORD3 = '${keyword}' OR KEYWORD4 = '${keyword}' OR KEYWORD5 = '${keyword}')  and (date(DATE) between '${from}' and '${to}') ORDER BY DATE DESC`;
    const query = `SELECT SEQ FROM ${DB_NAME} WHERE ${where}`;

    connection.query(query, (err, rows) => {
        const ids = [];

        rows.forEach((row) => {
            ids.push(row.SEQ);
        });

        res.send({ ids });
    });
});

// for showing article list(summary)
app.get('/articlesByIds', (req, res) => {
    const ids = req.query.ids.split(',');
    const where = ids.map((id) => { return `SEQ = ${id}` }).join(' OR ');

    console.log(where);
    const query = `SELECT SEQ, DOCID, DATE, SRC, TITLE, KEYWORD1, KEYWORD2, KEYWORD3, KEYWORD4, KEYWORD5, SUMMARY FROM ${DB_NAME} WHERE ${where}  ORDER BY DATE DESC`;

    connection.query(query, (err, rows) => {
        res.send({ articles: rows });
    });
});

// for showing modal
app.get('/articleById', (req, res) => {
    const id = req.query.id;

    const query = `SELECT SEQ, DOCID, DATE, SRC, TITLE, CONTENTS, KEYWORD1, KEYWORD2, KEYWORD3, KEYWORD4, KEYWORD5 FROM ${DB_NAME} WHERE SEQ = ${id}  ORDER BY DATE DESC`;

    connection.query(query, (err, rows) => {
        res.send({ article: rows[0] });
    });
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});