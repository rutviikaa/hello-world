const Pool = require('pg').Pool
const pool = new Pool({
  user: 'superadmin',
  host: 'localhost',
  database: 'UserDb',
  password: '123456',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "Users" ORDER BY "UserId" ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM "Users" WHERE "UserId" = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createUser = (request, response) => {
    const { username, mobilenumber, emailId, createddate, updateddate } = request.body
  
    pool.query('INSERT INTO "Users" ("UserName", "MobileNumber", "EmailId", "CreatedDateTime", "UpdatedDateTime") VALUES ($1, $2, $3, $4, $5)', [username, mobilenumber,emailId, createddate, updateddate], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { username, mobilenumber, emailId, updateddate } = request.body
  
    pool.query(
      'UPDATE "Users" SET "UserName" = $1, "MobileNumber" = $2, "EmailId" = $3, "UpdatedDateTime" = $4  WHERE "UserId" = $5',
      [username, mobilenumber, emailId, updateddate,id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM Users WHERE UserId = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }