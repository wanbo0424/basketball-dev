import Request from 'luch-request' 


const http = new Request({
	baseURL: 'http://10.100.14.167:7001/'
});

http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	
  config.header = {
    ...config.header,
  }
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})

http.interceptors.response.use((response) => { 
  console.log(response)
  return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(response)
  return Promise.reject(response)
})

export default http