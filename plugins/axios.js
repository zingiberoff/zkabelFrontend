import https from 'https'
export default function ({ $axios, redirect }) {

  $axios.defaults.httpsAgent = new https.Agent({
    keepAlive: true,
    rejectUnauthorized: false,
  })
  $axios.defaults.headers= {
    'x-requested-with': 'XMLHttpRequest'
  }
  $axios.defaults.baseURL= 'https://www.zkabel.ru'
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

}
