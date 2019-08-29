const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'test_db',
    columns: {
        SEQ: {
            primary: true,
            type: 'mediumint',
            generated: true
        },
        DOCID: {
            type: 'varchar',
            unique: true,
            nullable: true,
            length:30
        },
        DATE: {
            type: 'varchar',
            length:20
        },
        SRC: {
            type: 'varchar',
            length:20
        },
        TITLE: {
            type: 'text'
        },
        CONTENTS: {
            type: 'longtext'
        },
        KEYWORD1: {
            type: 'varchar',
            nullable: true,
            length:15
        },
        KEYWORD2: {
            type: 'varchar',
            nullable: true,
            length:15
        },
        KEYWORD3: {
            type: 'varchar',
            nullable: true,
            length:15
        },
        KEYWORD4: {
            type: 'varchar',
            nullable: true,
            length:15
        },
        KEYWORD5: {
            type: 'varchar',
            nullable: true,
            length:15
        },
        SUMMARY: {
            type: 'longtext',
            nullable: true
        }
    }
});