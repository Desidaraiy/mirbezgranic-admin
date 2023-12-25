import { mdiValveClosed } from '@mdi/js'
import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
  state: () => ({
    clients: [
      // { 
      //   id: 1, 
      //   birthday: "11.11.2011", 
      //   name: "Иван", 
      //   surname: "Иванов", 
      //   patronymic: "Иванович",
      //   country: 'Россия',
      //   email: 'example@mail.com',
      //   sex: 'Мужской',
      //   universityYearOfEntry: '2010',
      //   universityCourse: '1',
      //   universityAcademicUnit: 'А',
      //   universityUnit: 'НОВГУ',
      //   univeristyFaculty: 'Бизнес-аналитика',
      //   contactPersonName: 'Иван',
      //   contactPersonSurname: 'Иванов',
      //   contactPersonPatronymic: 'Иванович',
      //   contactPersonPhone: '123456789',
      //   contactPersonIsForMe: 'Отец',
      //   contactPersonEmail: 'example@mail.com',
      //   documentsDateOfArrival: '11.11.2011',
      //   documentsDateOfVisaExpiring: '11.11.2012',
      //   documentsDateOfPassportExpiring: '11.11.2012',
      //   hasTakenCourse: false
      // },
    ],
    currentClient: {},
    isSearchingClients: false,
    isSearchingClientsQuery: '',
    clientsFound: [],
    apiBaseUrl: 'https://api.mirbezgranic-novsu.ru',
    userName: '',
    userEmail: '',
    userPhone: '',
    userAvatar: '',
    userLogged: false,
    userToken: '',
  }),
  actions: {
    searchClientBySurname(payload) {
      this.isSearchingClients = true
      this.isSearchingClientsQuery = payload
      this.clientsFound = this.clients.filter(client => client.surname.toLowerCase().includes(payload.toLowerCase()))
    },
    setSearchingClients(payload) {
      this.isSearchingClients = payload
    },
    setSearchingClientsQuery(payload) {
      this.isSearchingClientsQuery = payload
      this.searchClientBySurname(payload);
    },
    setCurrentClient(payload) {
      this.currentClient = this.clients.find(client => client.id === parseInt(payload))
      this.fetchClientById(this.currentClient.id)
    },
    resetCurrentClient() {
      this.currentClient = {}
    },
    fetchClients() {
      fetch(this.apiBaseUrl + '/admin/get-users', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          this.clients = data.users;
        });
    },
    fetchClientById(id) {
      fetch(this.apiBaseUrl + '/admin/get-users/' + id, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          this.currentClient = data.user;
        });
    }

  }
})