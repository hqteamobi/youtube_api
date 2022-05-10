const subCount = document.getElementById('sub-count')
const viewCount = document.getElementById('view-count')
const videoCount = document.getElementById('video-count')
const ytbName = document.querySelector('.ytb-name')
const createAt = document.getElementById('create')
const getBtn = document.getElementById('get')
const avatar = document.querySelector('.avatar img')
const API_KEY = 'AIzaSyDFmdINQSotkRjRobKgyt4FVl-cY9d2VoE'

getBtn.addEventListener('click', (e) => {
  // get id channel ytb
  let idChannel = getChannelId(url.value)
  console.log(idChannel)

  // get data from ytb with api
  let result = JSON.parse(
    httpGet(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,status,contentDetails,snippet&id=${idChannel}&key=` +
        API_KEY,
    ),
  )
  console.log(result)

  // hiển thị dữ liệu
  viewCount.textContent = formatNumber(
    result['items'][0]['statistics']['viewCount'],
  )

  videoCount.textContent = formatNumber(
    result['items'][0]['statistics']['videoCount'],
  )

  subCount.textContent = formatNumber(
    result['items'][0]['statistics']['subscriberCount'],
  )

  createAt.textContent = formatDate(
    result['items'][0]['snippet']['publishedAt'],
  )

  avatar.src = result['items'][0]['snippet']['thumbnails']['default']['url']

  ytbName.textContent = result['items'][0]['snippet']['title']

  e.preventDefault()
})

function formatDate(date) {
  return date.split('T')[0]
}

function formatNumber(input) {
  return Intl.NumberFormat('en-us').format(input)
}

function httpGet(url) {
  let xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', url, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

function getChannelId(url) {
  let stringStart = 'https://www.youtube.com/channel/'
  if (url.startsWith(stringStart)) {
    let idChannel = url.substr(stringStart.length, url.length)
    return idChannel
  } else {
    window.alert('URL này không sử dụng được')
  }
}
