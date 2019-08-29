const EntitySchema = require('typeorm').EntitySchema;

// `
// SEQ
// DOCID
// DATE
// SRC
// TITLE
// CONTENTS
// KEYWORD1
// KEYWORD2
// KEYWORD3
// KEYWORD4
// KEYWORD5
// SUMMARY
// `

module.exports = new EntitySchema({
    name: 'news_datatable',
    columns: {
        SEQ: {
            primary: true,
            type: 'int',
            generated: true
        },
        DOCID: {
            type: 'varchar'
        },
        DATE: {
            type: 'varchar'//'datetime'
        },
        SRC: {
            type: 'varchar'
        },
        TITLE: {
            type: 'text'
        },
        CONTENTS: {
            type: 'longtext'
        },
        KEYWORD1: {
            type: 'varchar'
        },
        KEYWORD2: {
            type: 'varchar',
            nullable: true
        },
        KEYWORD3: {
            type: 'varchar',
            nullable: true
        },
        KEYWORD4: {
            type: 'varchar',
            nullable: true
        },
        KEYWORD5: {
            type: 'varchar',
            nullable: true
        },
        SUMMARY: {
            type: 'longtext'
        }
    }
});