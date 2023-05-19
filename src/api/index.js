import axios from 'axios'

const headers = {
  'Content-Type': 'application/json'
}

const userHeaders = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem('userTkn')
}

const userPDFHeaders = {
  'Content-Type': 'application/pdf',
  'Authorization': localStorage.getItem('userTkn'),
  'Accept': 'application/pdf'
}

const userXLSHeaders = {
  'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'Authorization': localStorage.getItem('userTkn'),
  'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}

const multipartsUserHeader = {
  'Content-Type': 'multipart/form-data',
  'Authorization': localStorage.getItem('userTkn')
}

const API_URL = 'http://localhost:9000/api/'

const compl = ['auth/', 'users/']

// Usuario
export function login (userData) {
  return axios.post(`${API_URL}${compl[0]}signin`, userData, {
    headers: headers
  })
}
export function postUser (userData) {
  return axios.post(`${API_URL}${compl[0]}signup`, userData, {
    headers: userHeaders
  })
}

export function updateUser(data) {
  return axios.put(`${API_URL}${compl[1]}updateUser`,data, {
    headers: userHeaders
  })
}

export function getAllUsers () {
  return axios.get(`${API_URL}${compl[1]}allUsers`, {
    headers: userHeaders
  })
}

export function getStadistics () {
  return axios.get(`${API_URL}getStadistics`, {
    headers: userHeaders
  })
}

export function getAllRoles () {
  return axios.get(`${API_URL}${compl[1]}allRoles`, {
    headers: userHeaders
  })
}

export function getAllConversationalFlows () {
  return axios.get(`${API_URL}conversationalFlows`, {
    headers: userHeaders
  })
}

export function createConversationalFlow (dataConversationalFlow) {
  return axios.post(`${API_URL}conversationalFlows`, dataConversationalFlow, {
    headers: userHeaders
  })
}

export function getAllConversationalFlowsMessages(id) {
  return axios.get(`${API_URL}conversationalFlowsMessages?id=`+id, {
    headers: userHeaders
  })
}

export function createConversationalFlowMessage(data) {
  return axios.post(`${API_URL}conversationalFlowsMessages`,data, {
    headers: userHeaders
  })
}

export function updateConversationalFlowMessage(data) {
  return axios.put(`${API_URL}conversationalFlowsMessages`,data, {
    headers: userHeaders
  })
}
