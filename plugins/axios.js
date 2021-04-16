export default function ({ $axios, error: nuxtError }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    console.log('error', error)
    // nuxtError({
    //   statusCode: error.response.status,
    //   message: error.message,
    // })
    // return Promise.resolve(error)
  })
}
