import { generateKeyPairSync } from 'crypto'
import { writeFileSync } from 'fs'

import { privateKeyPath, publicKeyPath } from '../constants'

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

writeFileSync(privateKeyPath, privateKey)
writeFileSync(publicKeyPath, publicKey)
