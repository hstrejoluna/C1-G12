import { gql } from "@apollo/client"

export const querySearchAppointmentsPacient = gql`
  query findAppointmentPacient($idPatient: Int) {
    allappointforpatient(idPatient: $idPatient) {
      id
      Patient {
        name
        surname
      }
      Doctor {
        name
        surname
      }
      Date
      Time
    }
  }
`

export const querySearchAppointmentsDoctor = gql`
  query findAppointmentDoctor($idDoctor: Int) {
    allappointfordoctor(idDoctor: $idDoctor) {
      id
      Patient {
        name
        surname
      }
      Doctor {
        name
        surname
      }
      Date
      Time
    }
  }
`

export const querySearchUser = gql`
  query findUser($idUser: Int) {
    searchuser(idUser: $idUser) {
      firstName
      lastName
      isPatient
      isDoctor
    }
  }
`

export const queryAllPatients = gql`
  {
    allpatients {
      name
      surname
      user {
        id
        isPatient
        isDoctor
        isSysadmin
      }
    }
  }
`

export const queryAllAppointments = gql`
  {
    allappointments {
      id
      Patient {
        name
        surname
      }
      Doctor {
        name
        surname
      }
      Date
      Time
    }
  }
`

export const queryAllDoctors = gql`
  {
    alldoctors {
      user {
        id
        isActive
        isPatient
        isDoctor
        isSysadmin
      }
      name
      surname
      speciality
      turn
    }
  }
`
// export const queryLogin = gql`
//   {
//     auth_token {
//       email
//       password
//     }
//   }
// `

export const queryLogin = gql`
  mutation login($password: String!, $email: String) {
    tokenAuth(password: $password, email: $email) {
      user {
        pk
        firstName
        lastName
        isDoctor
        isPatient
        isSysadmin
      }
      token
    }
  }
`

export const queryCreatePatient = gql`
  mutation createPacient(
    $name: String
    $surname: String
    $password1: String
    $password2: String
    $email: String
    $dni: String
    $age: Date
    $gender: String
    $phone: String
    $social: String
    $plan: String
  ) {
    createpatient(
      name: $name
      surname: $surname
      password1: $password1
      password2: $password2
      email: $email
      dni: $dni
      age: $age
      gender: $gender
      phone: $phone
      social: $social
      plan: $plan
    ) {
      user {
        id
        firstName
        lastName
        isPatient
        isDoctor
        isSysadmin
      }
    }
  }
`

export const queryCreateAppointment = gql`
  mutation createAppointment(
    $Date: Date
    $Time: Time
    $idDoctor: Int
    $idPatient: Int
  ) {
    createappointment(
      Date: $Date
      Time: $Time
      idDoctor: $idDoctor
      idPatient: $idPatient
    ) {
      appointment {
        id
      }
    }
  }
`
