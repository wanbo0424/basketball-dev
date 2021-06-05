import Request from 'luch-request' 


const http = new Request({
	baseURL: 'http://127.0.0.1:7001/' 
	// baseURL: 'http://192.168.101.5/' 
	// baseURL: 'http://39.101.161.231/' //生产环境
	// baseURL: 'https://www.apusport.cn/' //生产环境
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
  return response
}, (err) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(err)
  return Promise.reject(err)
})

export default http