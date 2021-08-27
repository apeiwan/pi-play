module.exports = {
  name: 'pi-play',
  oss: {
    PATH: process.env.ALI_OSS_PATH,
    REGION: process.env.ALI_OSS_REGION,
    ACCESSKEYID: process.env.ALI_OSS_ACCESSKEYID,
    BUCKET: process.env.ALI_OSS_BUCKET,
    ACCESSKEYSECRET: process.env.ALI_OSS_ACCESSKEYSECRET,
  },
  server: {
    docs: process.env.DOCS_SERVER
  }
}
