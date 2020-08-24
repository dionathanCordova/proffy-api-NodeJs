require('dotenv').config();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageAmbients = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,  path.resolve(__dirname, '..', 'public', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            })
        }
    }),

    s3 : multerS3({
        // Uma nova instancia da aws
        s3: new aws.S3(),

        // nome do bucket que criamos
        bucket: 'proffydion', 

        // configuração que informa que ao acessar o arquivo ele é lido pelo, 
        // caso contrario o arquivo é feito download.
        contentType: multerS3.AUTO_CONTENT_TYPE,
        
        // configuração onde todo o arquivo acessado é público e todo mundo pode ler.
        acl: 'public-read', 

        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
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
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }else {
            cb(new Error('Invalid file type.'));
        }
    }
};