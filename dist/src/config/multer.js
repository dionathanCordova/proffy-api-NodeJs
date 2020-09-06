"use strict";
require('dotenv').config();
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var storageAmbients = {
    local: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, '..', 'public', 'uploads'));
        },
        filename: function (req, file, cb) {
            crypto.randomBytes(16, function (err, hash) {
                if (err)
                    cb(err);
                file.key = hash.toString('hex') + "-" + file.originalname;
                cb(null, file.key);
            });
        }
    }),
    s3: multerS3({
        // Uma nova instancia da aws
        s3: new aws.S3(),
        // nome do bucket que criamos
        bucket: 'proffydion',
        // configuração que informa que ao acessar o arquivo ele é lido pelo, 
        // caso contrario o arquivo é feito download.
        contentType: multerS3.AUTO_CONTENT_TYPE,
        // configuração onde todo o arquivo acessado é público e todo mundo pode ler.
        acl: 'public-read',
        key: function (req, file, cb) {
            crypto.randomBytes(16, function (err, hash) {
                if (err)
                    cb(err);
                var fileName = hash.toString('hex') + "-" + file.originalname;
                cb(null, fileName);
            });
        }
    })
};
module.exports = {
    // para onde o arquivo vai depois do upload
    dest: path.resolve(__dirname, '..', 'public', 'uploads'),
    // storage de armazenamento da imagem. s3 ou local
    storage: storageAmbients['s3'],
    // storage: storageAmbients['local'],
    // tamanho de 2 mb de limite que é permitido da imagem.
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    // extensões aceitadas
    fileFilter: function (req, file, cb) {
        var allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type.'));
        }
    }
};
