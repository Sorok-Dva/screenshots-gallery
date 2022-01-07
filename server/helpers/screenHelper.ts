import * as crypto from 'crypto'

// Decoding base-64 image
// Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
export const decodeBase64Image = (body: {
  base64: string,
  size: string,
}): {
  path: string,
  buffer: Buffer
} | Error => {
  const matches = body.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) || ''
 
  if (matches.length !== 3) {
    return new Error('Invalid input string')
  }
  
  const imageTypeRegularExpression = /\/(.*?)$/
  const seed = crypto.randomBytes(20)
  const uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex')
  const userUploadedFeedMessagesLocation = 'public/assets/images/upload/'
  const uniqueRandomImageName = 'img-' + uniqueSHA1String
  const imageTypeDetected = matches[1].match(imageTypeRegularExpression)
  
  if (!imageTypeDetected || imageTypeDetected.length < 1) {
    return new Error('Invalid input string')
  }
  
  return {
    path: userUploadedFeedMessagesLocation + uniqueRandomImageName + '.' + imageTypeDetected[1],
    buffer: Buffer.alloc(parseInt(body.size), matches[2], 'base64'),
  }
}
