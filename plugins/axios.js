export default function ({ $axios, app, error: nuxtError }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    console.log('error', error.response)
    if (process.client) {
      // 处理客户端请求错误
      console.log(app)
      if (error.response) {
        window.$nuxt.$root.$message.error(
          error.response.data?.error_msg || error.response.statusText
        )
      }
    }
    // nuxtError({
    //   statusCode: error.response.status,
    //   message: error.message,
    // })
    // return Promise.resolve(error)
  })
}
