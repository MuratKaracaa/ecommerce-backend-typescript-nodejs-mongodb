import { generateKeyPairSync } from 'crypto'
import { writeFileSync, mkdirSync } from 'fs'

import { privateKeyPath, publicKeyPath, secretPath } from '../constants'

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
    },
})
mkdirSync(secretPath)
writeFileSync(privateKeyPath, privateKey)
writeFileSync(publicKeyPath, publicKey)
