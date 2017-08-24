import axios from 'axios'
import { commonParams, hostUrl } from 'api/config'

export function GetMessageTypeList (params) {
  const url = hostUrl + 'Message.json?action=GetMessageTypeList'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return Promise.resolve(res.data)
  })
}
